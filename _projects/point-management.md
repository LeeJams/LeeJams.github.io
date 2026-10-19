---
title: 포인트 통합 관리
summary: "포인트 정책 변경을 DB 계산에 반영하고, 월별 배치와 실패 추적을 자동화했습니다."
group: company
icon: /assets/img/projects/logos/taejin.svg
category: 업무
organization: 태진인터내셔날 · 엔더스
period: 2021.01 - 2021.12
role: DB 설계·운영
problem: "등급 산정 기간 변경을 포인트 계산에 반영하고, 매월 배치를 반복 실행해야 했습니다."
solution: "조회 범위와 PL/SQL을 정책에 맞추고, 월별 배치의 정기 실행과 실패 이력 기록을 자동화했습니다."
order: 8
tech:
- Oracle
- PL/SQL
- DBMS_SCHEDULER
highlight: "정책 변경과 PL/SQL 개선으로 월별 배치 처리 시간 약 20% 단축"
achievements:
  - title: "월별 포인트 배치 처리 시간 약 20% 단축"
    detail: "최근 5년 → 2년 정책 변경과 PL/SQL 개선을 함께 적용한 배치 측정 결과입니다."
  - title: "월 1회 정기 실행과 실패 이력 추적 구현"
    detail: "매월 정기 실행과 로그 테이블의 예외 기록을 연결했습니다."
---

## 핵심 기여

- **정책과 DB 계산 일치:** 등급 산정 기간 변경 명세를 관련 부서와 정리하고, 포인트 합산·등급 산정의 거래 조회 범위와 PL/SQL 계산을 함께 변경했습니다.
- **반복 배치 운영:** 매월 등급 계산을 DBMS_SCHEDULER로 실행하고, 실패한 작업과 원인을 추적하도록 예외를 로그 테이블에 기록했습니다.
