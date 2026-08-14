---
layout: post
title: "PostgreSQL의 UPDATE는 생각보다 비쌌다 — 단일 INSERT로 갈아탄 이야기"
tags: [POSTGRESQL, SQL 튜닝, UPDATE 성능, MVCC, DEAD TUPLE, TABLE BLOAT, AUTOVACUUM, TOAST, WAL]
category: ["DB"]
---

#### 한 줄 요약

> 외부 API 연동 로그를 `INSERT` 후 `UPDATE`로 채우던 패턴을 **단일 `INSERT`** 로 바꿨다.
> PostgreSQL에서 `UPDATE`는 사실상 새 튜플을 만드는 일이라, 쿼리·트랜잭션·튜플 생성·WAL 쓰기량이 각각 **약 50%씩** 줄었다.

## 들어가며 — 로그 한 건에 INSERT와 UPDATE가 한 번씩

회사에서 운영 중인 외부 API 연동 로그 테이블을 들여다보다가 패턴 하나가 눈에 들어왔다. **INSERT 한 번, UPDATE 한 번, 같은 행에.**

코드를 따라가 보니 흐름은 이랬다.

1. 외부 API 호출 직전 → 요청 바디만 채워서 `INSERT`
2. HTTP 호출
3. 응답 받자마자 → 응답 바디·결과코드 채워서 `UPDATE`

사실 이 패턴 자체는 전혀 이상하지 않다. Oracle이나 MySQL이라면 "그냥 두 번 쓴 거지" 정도로 넘길 수 있는, 흔하디 흔한 모양이다. 문제는 우리가 쓰는 DB가 **PostgreSQL** 이라는 점이었다.

PostgreSQL이 `UPDATE`를 어떻게 처리하는지 알고 나니 이 패턴이 다르게 보이기 시작했다. 같은 행을 두 번 만지는 건, **MVCC 입장에선 거의 행을 두 개 만드는 일**이었으니까.

이번 글은 "왜 UPDATE를 빼고 단일 INSERT로 바꾸는 게 이득이었는지" 그 과정을 정리한 글이다.

---

## 목차

- [기존 구조: INSERT 후 UPDATE](#기존-구조-insert-후-update)
- [PostgreSQL의 UPDATE는 사실상 INSERT다](#postgresql의-update는-사실상-insert다)
- [TOAST와 WAL — 큰 컬럼 UPDATE의 진짜 비용](#toast와-wal--큰-컬럼-update의-진짜-비용)
- [REQUIRES_NEW가 두 번이라는 의미](#requires_new가-두-번이라는-의미)
- [그래서 단일 INSERT로 바꿨다](#그래서-단일-insert로-바꿨다)
- [정리 — UPDATE는 무료가 아니다](#정리--update는-무료가-아니다)

---

## 기존 구조: INSERT 후 UPDATE

코드는 대충 이런 모양이었다.

```java
// 1. API 호출 전: 요청 바디만 채워서 먼저 한 행 박아둔다
DetailLog log = tifLogManager.createDetailLog(...);  // INSERT

try {
    Object res = httpCall();
    tifLogManager.success(log, res);                    // UPDATE
    return res;
} catch (Exception e) {
    tifLogManager.fail(log, e);                         // UPDATE
    throw e;
}
```

의도는 분명하다. **"호출 시도까지는 했다"는 흔적을 먼저 남겨두자**는 것. 프로세스가 중간에 죽어도 요청 바디라도 남아있으면 디버깅에 유리하니까.

좋은 의도다. 그런데 PostgreSQL 위에선 이 패턴이 꽤 무겁다.

---

## PostgreSQL의 UPDATE는 사실상 INSERT다

처음 알게 됐을 때 살짝 충격이었던 사실. **PostgreSQL의 UPDATE는 새 튜플을 만들고 구 튜플을 "죽었다"고 표시하는 작업이다.**

MySQL InnoDB에 익숙하다면 "UPDATE는 그 자리 값을 바꾸는 것"이라는 직관이 있을 텐데, PostgreSQL의 MVCC(Multi-Version Concurrency Control)는 다르게 동작한다.

```text
UPDATE 전:
  [행 v1: rqmt=요청, res=NULL]   ← live tuple

UPDATE 후:
  [행 v1: rqmt=요청, res=NULL]   ← dead tuple (xmax 표기됨)
  [행 v2: rqmt=요청, res=응답]   ← 새 live tuple
```

같은 PK인데 **물리적으론 튜플 두 개**가 생긴다. 구 튜플은 나중에 `VACUUM`이 와서 치워줘야 비로소 공간이 회수된다.

즉 INSERT + UPDATE 패턴은:

- 논리적으론 "행 1개 기록"
- 물리적으론 **"튜플 2개 생성"**

그리고 이 차이는 그냥 디스크 낭비로 끝나지 않는다. **테이블 bloat**(부풀어 오름)가 가속되고, autovacuum이 점점 바빠진다. 인덱스에도 죽은 포인터가 쌓이고, 쿼리 플래너의 통계도 점점 부정확해진다.

마치 책상에 새 메모지를 한 장 적을 때마다 옆에 사용한 메모지를 한 장씩 쌓아두는 셈이다. 청소부(VACUUM)가 부지런히 와서 치워야 하지만, 메모지를 두 배로 만들어내면 청소부도 두 배로 바빠진다.

---

## TOAST와 WAL — 큰 컬럼 UPDATE의 진짜 비용

여기서 한 가지가 더 있다. **응답 바디 컬럼의 크기**.

이 로그 테이블의 `res_ifdoc_cnts` 컬럼은 응답 JSON 전체를 그대로 담고 있었다. 작게는 수 KB, 크게는 수십 KB.

PostgreSQL에선 한 행이 8KB 페이지를 넘기지 못하기 때문에, 큰 컬럼은 **TOAST**(The Oversized-Attribute Storage Technique)라는 별도 영역에 자동으로 분리 저장된다.

문제는 이거다. **`UPDATE`로 큰 컬럼을 채우면 TOAST 영역에도 새 튜플이 생긴다.**

흐름을 그려보면:

```text
INSERT:  본 테이블에 [요청만 있는 튜플 v1] 작성, TOAST는 작거나 없음
            ↓
UPDATE:  본 테이블에 [요청+응답 튜플 v2] 새로 작성
         + TOAST에 응답 JSON 새 튜플 작성
         + 본 테이블의 v1을 dead로 표기
```

거기에 한 가지 더. **WAL(Write-Ahead Log)** 도 같이 부풀어 오른다.

PostgreSQL은 모든 변경을 WAL에 먼저 기록한다. 복제 서버는 이 WAL을 받아 자신을 동기화한다. 그런데 UPDATE는 변경된 행 전체를 기록하는 경향이 있다(특히 TOAST가 함께 바뀐 경우엔 그 양이 더 커진다). 결과적으로:

- 디스크 I/O 증가
- 복제 서버로 가는 네트워크 트래픽 증가
- 복제 지연(replication lag) 가능성 증가

대용량 컬럼에 대고 INSERT → UPDATE를 반복하는 건, PostgreSQL 입장에선 별로 친절한 손님이 아니다.

---

## REQUIRES_NEW가 두 번이라는 의미

PostgreSQL 관점은 여기까지고, 애플리케이션 관점에서도 한 가지가 거슬렸다.

로그를 남기는 매니저는 모든 메서드가 `@Transactional(propagation = REQUIRES_NEW)` 였다.

```java
@Transactional(propagation = Propagation.REQUIRES_NEW)
public DetailLog createDetailLog(...) { ... }

@Transactional(propagation = Propagation.REQUIRES_NEW)
public void updateDetailLog(...) { ... }
```

비즈니스 트랜잭션이 롤백돼도 로그는 남아야 하니까, 이 자체는 합리적인 선택이다. 그런데 INSERT용 1개 + UPDATE용 1개 = **API 호출 1회당 별도 트랜잭션 2개**가 떨어진다.

`REQUIRES_NEW`가 호출되면:

1. 부모 트랜잭션을 잠시 **suspend**
2. 커넥션 풀에서 **새 커넥션을 빌려옴**
3. 새 트랜잭션 시작 → 쿼리 → commit
4. 커넥션 반납 → 부모 트랜잭션 재개

API 한 번에 이걸 두 번씩 한다. 주문 수십 건을 수집하면 커넥션 풀에서 빌려오고 갚는 사이클이 수십~수백 번씩 일어났다. 풀 크기가 넉넉하지 않은 환경에선 다른 요청들과 풀을 두고 경합하기 시작한다.

---

## 그래서 단일 INSERT로 바꿨다

방향은 단순했다.

```text
[변경 전]
  INSERT (요청만)  →  HTTP 호출  →  UPDATE (응답 채움)

[변경 후]
  HTTP 호출  →  INSERT (요청 + 응답 + 결과 한 번에)
```

코드 모양은 이렇게 바뀐다.

```java
DetailLog log = prepareDetailLog(...);   // 메모리 객체만 준비
DetailLogResult result = DetailLogResult.S;

try {
    Object res = httpCall();
    log.setResIfdocCnts(serialize(res));
    return res;
} catch (Exception e) {
    result = DetailLogResult.E;
    log.setResIfdocCnts(extractError(e));
    throw e;
} finally {
    log.setLnkSuccsCd(result);
    try {
        tifLogManager.insertDetailLog(log);   // 정상·예외 모두 1회 INSERT
    } catch (Exception logEx) {
        // 로그 실패가 본 비즈니스 흐름을 막진 않게
        log.warn("detail log insert 실패", logEx);
    }
}
```

핵심은 **`finally` 블록**이다. Java의 `try/finally`는 정상 반환이든 예외든 어느 쪽이든 실행됨이 언어 차원에서 보장된다. 즉 INSERT는 1회 반드시 실행된다. "호출 시도 흔적을 미리 남겨두는 안전장치"라는 기존 패턴의 의도도, 사실상 동일하게 보존된다.

그렇다면 "프로세스가 HTTP 호출 중에 강제로 죽으면?"

이건 기존 패턴도 마찬가지다. INSERT만 끝낸 채 UPDATE 전에 죽으면 "요청만 있는 반쪽 로그"가 남는데, 어차피 분석엔 한계가 있다. 비정상 종료 케이스는 **애플리케이션 로그(Logstash 등)** 가 커버해주면 된다고 판단했다.

### 이 변경 하나로 얻는 것

단순한 변경 같지만 효과는 꽤 또렷하다.

| 항목                             | 변경 전             | 변경 후  | 감소       |
| -------------------------------- | ------------------- | -------- | ---------- |
| API 1회당 DB 쿼리                | INSERT 1 + UPDATE 1 | INSERT 1 | **50%**    |
| API 1회당 트랜잭션(REQUIRES_NEW) | 2                   | 1        | **50%**    |
| 커넥션 획득/반납 사이클          | 2                   | 1        | **50%**    |
| 로그 1건당 튜플 생성 수          | 2 (live 1 + dead 1) | 1        | **50%**    |
| WAL 쓰기량 (응답 본문 기준)      | 100%                | 약 50%   | **약 50%** |

특히 **WAL 쓰기량 감소**가 체감이 컸다. 응답 본문이 큰 연동일수록 차이가 크다.

### 곁가지로 따라온 것들

- **코드가 단순해졌다.** before/after 두 군데 흩어져 있던 로직이 한곳에 모이면서, "요청은 남았는데 응답이 안 남은 반쪽 로그" 같은 어색한 상태가 구조적으로 사라졌다.
- **테이블 bloat 증가율이 둔해졌다.** dead tuple이 절반이 되면 autovacuum도 그만큼 한가해진다.
- **`isSaveLog=false` 처리도 정리됐다.** 본문만 비우는 게 아니라 그 트랜잭션 자체를 거를 수 있게 됐다.

---

## 정리 — UPDATE는 무료가 아니다

PostgreSQL을 데이터 저장소로 쓰면서 가장 인상 깊게 배운 한 가지를 꼽자면 **"UPDATE는 무료가 아니다"** 다. MVCC 위에서 UPDATE는 사실상 새 튜플을 만드는 일이고, 큰 컬럼이 끼면 TOAST와 WAL까지 같이 부풀어 오른다.

이번 사례의 교훈은 단순하다.

- **PostgreSQL에서 같은 행을 두 번 쓰는 패턴이 보이면 한 번 의심해보자.** 다른 DB에선 자연스러운 모양도 PG 위에선 튜플 두 개를 만드는 일이 된다. "어차피 두 번 다 쓸 거면 한 번에 쓸 순 없는가?"
- **큰 컬럼은 처음부터 채워서 INSERT하는 게 낫다.** UPDATE로 채우는 순간 TOAST 새 튜플 + WAL 폭증이 따라온다.
- **`REQUIRES_NEW`는 비싸다.** 로그 보존을 위한 합리적 선택이지만, 횟수를 줄일 수 있다면 그만큼 커넥션 풀에 여유가 생긴다.

PostgreSQL은 똑똑하지만 만능은 아니다. 우리가 쓰는 패턴이 그 엔진의 결을 거스르고 있는지 가끔 들여다보는 것만으로도 꽤 많은 비용을 아낄 수 있다.

피드백은 언제나 환영입니다. 😊

---

## 참고

- [PostgreSQL Documentation — MVCC](https://www.postgresql.org/docs/current/mvcc-intro.html){:target="\_blank"}
- [PostgreSQL Documentation — TOAST](https://www.postgresql.org/docs/current/storage-toast.html){:target="\_blank"}
- [PostgreSQL Documentation — Reliability and the Write-Ahead Log](https://www.postgresql.org/docs/current/wal-intro.html){:target="\_blank"}
- [PostgreSQL Documentation — Routine Vacuuming](https://www.postgresql.org/docs/current/routine-vacuuming.html){:target="\_blank"}
