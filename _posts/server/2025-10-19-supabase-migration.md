---
layout: post
title: "카페24 가상서버에서 Supabase Free Plan으로 이전한 이야기"
tags: [DATABASE, MIGRATION, SUPABASE, CAFE24, SERVER]
category: ["SERVER"]
---

월 11,000원의 카페24 가상서버호스팅에서 Supabase Free Plan으로 이전하면서 비용도 절감하고 데이터 동기화 문제도 해결했던 경험을 공유합니다.

---

## 카페24 가상서버 사용 환경

저는 카페24의 **비즈니스형** 상품을 월 11,000원에 이용하고 있었습니다.

**제공 사양:**

- RAM: 2GB
- SSD: 40GB
- 월 트래픽: 500GB

**기술 스택:**

- Node.js + NestJS
- Prisma ORM
- MySQL 데이터베이스
- REST API 서버

---

## 겪었던 문제들

### 1. 데이터 동기화 지연 문제 (Read-after-Write Inconsistency)

가장 큰 문제는 **Write 작업 직후 Read 시 일관성 문제**였습니다. React Query를 사용해서 POST 요청 성공 후 캐시를 무효화하고 최신 데이터를 다시 가져오는 패턴을 구현했는데, 연속적으로 요청을 보낼 때 업데이트가 반영되지 않은 이전 데이터가 반환되는 현상이 발생했습니다.

```javascript
// 예시: 이런 패턴에서 문제 발생
const mutation = useMutation({
  mutationFn: createPost,
  onSuccess: () => {
    queryClient.invalidateQueries(["posts"]);
    // invalidate 후 즉시 refetch가 발생하지만
    // MySQL의 write가 완료되기 전에 read가 실행되는 경우 발생
  },
});
```

**원인을 분석해보니:**

1. **MySQL의 트랜잭션 격리 수준 이슈**: MySQL InnoDB의 기본 격리 수준은 REPEATABLE READ인데, 트랜잭션 시작 시점의 스냅샷을 읽다보니 Write 직후 새로운 Read 요청이 커밋 전에 발생하면 이전 데이터를 읽게 됩니다.

2. **Connection Pool의 커넥션 재사용**: Prisma의 connection pool에서 서로 다른 커넥션이 할당될 경우, 한 커넥션에서 COMMIT된 데이터가 다른 커넥션에 즉시 보이지 않을 수 있었습니다.

3. **비동기 처리의 Race Condition**:

   ```
   T1: POST /api/posts (write)
   T2: POST success callback → invalidateQueries
   T3: GET /api/posts (read) - T1의 commit이 완료되지 않은 상태
   ```

4. **캐시 무효화 타이밍**: React Query의 `invalidateQueries`는 비동기로 처리되는데, MySQL write의 완료를 보장하지 않고 즉시 refetch를 트리거합니다.

**해결하려고 시도해봤던 방법들:**

- `await queryClient.invalidateQueries()` 사용 - 부분적으로 개선되긴 했음
- Optimistic Update 패턴 적용 - UX는 좋아졌지만 근본적인 해결은 아니었음
- 트랜잭션 격리 수준 변경 검토 - 성능 저하가 우려됨

### 2. 가상서버의 리소스 오버커밋(Overcommit) 문제

카페24 가상서버는 **가상화 기술(KVM 등)을 통해 물리 서버 자원을 분할**하는 구조입니다. 하이퍼바이저가 실제 물리 자원보다 많은 양의 가상 자원을 할당하는 오버커밋 방식을 사용하다보니 다음과 같은 문제가 있었습니다.

**오버커밋의 영향:**

- **CPU Steal Time 증가**: 다른 VM이 CPU를 과도하게 사용하면 내 VM이 CPU 시간을 할당받지 못하고 대기하는 시간이 늘어납니다.
- **메모리 스와핑**: 물리 메모리가 부족할 때 하이퍼바이저 레벨에서 메모리 스와핑이 발생하면 성능이 급격히 떨어집니다.
- **I/O 대역폭 경쟁**: 여러 VM이 동일한 물리 스토리지를 공유하다보니 다른 VM의 I/O가 많으면 디스크 응답 시간이 길어집니다.

카페24도 가상서버가 "물리적 자원을 나누어 제공"한다고 명시하고 있으며, 웹호스팅보다 성능 저하가 발생할 수 있다고 안내하고 있습니다.

### 3. 관리 부담

- 서버 보안 관리
- OS 및 소프트웨어 업데이트
- 데이터베이스 백업
- 모니터링 및 로그 관리

소규모 서비스를 운영하면서 이런 걸 다 직접 관리하는 게 부담스러웠습니다.

### 4. 고정 비용

사용자가 많지 않은 초기 단계인데도 매월 11,000원의 고정 비용이 나가는게 아까웠습니다.

---

## 대안 탐색: Supabase 발견

### Supabase란?

Supabase는 오픈소스 기반의 **Firebase 대안**으로 PostgreSQL을 기반으로 한 BaaS(Backend-as-a-Service) 플랫폼입니다.

**주요 기능:**

- PostgreSQL 데이터베이스
- 자동 생성되는 REST API
- 실시간 데이터 구독 (Realtime)
- 인증 (Authentication)
- 스토리지 (Storage)
- Edge Functions
- 관리자 대시보드

### Supabase Free Plan

Free Plan의 상세한 사양과 제약사항은 <a href="https://supabase.com/pricing" target="_blank">Supabase Pricing 페이지</a>에서 확인할 수 있습니다.

주요 제공 사양:

- 500MB 데이터베이스 용량
- 1GB 파일 스토리지
- 월 10GB Egress
- 50,000 MAU
- 최대 2개 프로젝트

**주의할 점:**

- 1주일 동안 활동이 없으면 프로젝트가 자동으로 일시정지됩니다
- 자동 백업이 없어서 수동으로 백업해야 합니다
- 데이터베이스 용량 500MB를 초과하면 read-only 모드로 전환됩니다

---

## 카페24 vs Supabase Free Plan 비교

### 비용

| 항목    | 카페24 비즈니스형 | Supabase Free |
| ------- | ----------------- | ------------- |
| 월 비용 | 11,000원          | 0원           |
| 설치비  | 22,000원          | 0원           |

### 인프라 스펙

| 항목         | 카페24 비즈니스형 | Supabase Free       |
| ------------ | ----------------- | ------------------- |
| RAM          | 2GB               | Nano Compute (공유) |
| Storage      | 40GB SSD          | 500MB DB + 1GB 파일 |
| 월 트래픽    | 500GB             | 10GB Egress         |
| 데이터베이스 | MySQL (직접 설치) | PostgreSQL (관리형) |

스토리지와 트래픽이 크게 줄긴 했지만 현재 사용량에는 충분했습니다. BaaS 특성상 서버 관리가 필요 없다는 점도 큰 장점이었습니다.

## 마이그레이션 과정

### 1. 프로젝트 생성 및 데이터베이스 설계

Supabase 대시보드에서 프로젝트를 생성 후 기존 MySQL에서 사용하던 테이블 구조를 PostgreSQL에 맞게 수정하면서 재설계했습니다.

### 2. 데이터 마이그레이션

MySQL에서 PostgreSQL로 데이터를 이전하는 과정이 필요했습니다.

1. MySQL에서 데이터를 JSON 형태로 export
2. PostgreSQL 문법에 맞게 데이터 변환 (자료형, 날짜 포맷 등)
3. Supabase의 SQL Editor를 통해 데이터 import

데이터 양이 많지 않아서 간단한 스크립트로 처리했습니다.

### 3. 클라이언트 코드 수정

기존에 Axios로 REST API를 호출하던 방식을 Supabase 클라이언트로 교체했습니다.

**Before (카페24 + Axios):**

```javascript
// API 서버를 거쳐야 함
const response = await axios.get("/api/posts");
const posts = response.data;
```

**After (Supabase):**

```javascript
// 클라이언트에서 직접 데이터베이스 쿼리
const { data: posts } = await supabase.from("posts").select("*");
```

### 4. 인증 시스템 전환

직접 구현한 JWT 인증 시스템을 Supabase Auth로 교체했습니다. 토큰 관리, 세션 관리 같은 걸 직접 구현했었는데, Supabase Auth를 사용하니 이런 복잡한 로직들을 전부 알아서 처리해줬습니다. 직접 구현했던 수백 줄의 인증 코드가 몇 줄로 줄어들었습니다.

---

## 마이그레이션 후 결과

### 좋아진 점

#### 1. 데이터 동기화 문제 해결

가장 큰 목표였던 **Read-after-Write Consistency** 문제가 해결됐습니다.

MySQL과 PostgreSQL의 기본 격리 수준 차이가 큰 역할을 했습니다:

- **MySQL (InnoDB)**: 기본 격리 수준이 REPEATABLE READ로, 트랜잭션 시작 시점의 스냅샷을 읽습니다. 이 때문에 다른 커넥션에서 COMMIT된 데이터가 즉시 보이지 않을 수 있습니다.

- **PostgreSQL (Supabase)**: 기본 격리 수준이 READ COMMITTED로, 각 쿼리마다 최신 커밋된 데이터를 읽습니다. 트랜잭션이 커밋되면 바로 다음 쿼리에서 그 데이터를 볼 수 있습니다.

결과적으로 POST 요청 후 즉시 GET 요청을 보내도 업데이트된 데이터가 제대로 반환됐습니다. Connection pool에서 다른 커넥션을 사용하더라도 커밋된 데이터는 항상 보이게 됩니다.

**체감되는 개선:**

- Write 후 Read 불일치: 빈번하게 발생 → 거의 발생 안함
- 데이터 동기화 지연 문제 해소

#### 2. 개발 속도 향상

- API 엔드포인트를 직접 만들 필요가 없음
- 인증 로직도 구현 안해도 됨
- 관리자 대시보드가 기본으로 제공됨

새로운 기능 추가할 때 시간이 확실히 단축됐습니다.

#### 3. 로그 및 모니터링

Supabase 대시보드에서 제공하는 로그 확인 기능이 정말 유용합니다.

- SQL 쿼리 로그
- API 요청 로그
- 에러 로그
- 성능 메트릭

#### 4. 비용 절감

연간 132,000원의 서버 비용이 0원이 됐습니다. 나중에 서비스가 성장해서 Free Plan의 한계를 넘어서면 Pro Plan(월 $25, 약 3만원)으로 업그레이드해야 하지만 그정도 수준이 되면 충분히 감당 가능한 금액이라고 생각합니다.

### 주의할 점

#### 1. 용량 관리

500MB 데이터베이스 용량을 초과하지 않도록 주기적으로 확인해야 합니다.

**관리 방법:**

- 대용량 파일은 Storage에 저장하기
- 오래된 로그 데이터는 주기적으로 정리하기
- 이미지는 최적화해서 저장하기

#### 2. 트래픽 관리

월 10GB egress 제한이 있어서 트래픽이 많아지면 주의해야 합니다.

**대응 방법:**

- CDN 활용하기
- 불필요한 데이터 전송 최소화하기
- 이미지 최적화 및 lazy loading 적용하기

#### 3. 프로젝트 일시정지

1주일 미사용 시 자동 일시정지되므로 정기적으로 접속하거나 간단한 health check를 설정해야 합니다.

**해결 방법:**

```javascript
// Cron job으로 주기적 요청 (예: Vercel Cron)
export async function GET() {
  await supabase.from("health_check").select("*").limit(1);
  return new Response("OK");
}
```

---

## 결론

카페24 가상서버에서 Supabase Free Plan으로 이전하는 과정을 겪으면서:

- **비용 절감**: 연간 132,000원 → 0원
- **문제 해결**: MySQL REPEATABLE READ에서 발생하던 데이터 동기화 지연 문제가 PostgreSQL READ COMMITTED로 해결
- **개발 경험 향상**: API 자동 생성, 인증 시스템 내장으로 훨씬 빠르고 쉬운 개발
- **관리 부담 감소**: 서버 보안, OS 업데이트, 백업 등을 신경쓰지 않아도 됨

마이그레이션 과정에서 테이블을 PostgreSQL에 맞게 재설계하고, MySQL 데이터를 이전하고, 클라이언트 코드를 Supabase 클라이언트로 바꿨습니다. 그 과정에서 데이터 마이그레이션 스크립트 만들 때 자료형 변환을 제대로 안해서 import가 실패해서 다시 해야 했고, 이것저것 테스트도 많이 해봐야했고 특히 RLS(Row Level Security) 정책 설정할 때는 권한 문제로 데이터가 안 불러와져서 많이 고생도 있었습니다.

마이그레이션 과정에서 이런저런 문제가 발생했고 시행착오도 있었지만, 지금 생각하면 잘한 결정이었습니다.

---

## 참고 자료

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase Pricing](https://supabase.com/pricing)
- [Supabase Realtime 가이드](https://supabase.com/docs/guides/realtime)

피드백은 언제나 환영입니다. 😊
