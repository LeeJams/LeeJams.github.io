---
title: Sellpick OMS 개발·운영
summary: "여러 판매 채널의 주문을 한곳에서 수집·관리하는 OMS에서, 주문 조회 성능과 동시 수집의 정합성을 개선했습니다."
group: company
icon: /assets/img/projects/logos/sellpick.png
category: 업무
organization: 헥토데이터
period: 2025.08 - 현재
role: 백엔드 개발·운영
order: 2
tech:
- Java
- Spring Boot
- PostgreSQL
- Redis
- Elasticsearch
- Kubernetes
highlight: "주문 목록 조회 1페이지 약 20초 → 5초 · 10페이지 약 100초 → 6초"
links:
- label: 서비스
  url: https://www.sellpick.co.kr
related_posts:
- "/postgresql-order-list-query-optimization/"
- "/cowork-automation-skills/"
achievements:
  - title: "주문 목록 조회: 1페이지 약 20초 → 5초, 10페이지 약 100초 → 6초"
    detail: "같은 검색 조건·정렬·페이지 크기에서 측정한 주문 조회 전체 개선 결과입니다."
  - title: "동시 주문 수집의 중복 처리 제어"
    detail: "여러 판매 채널의 수집 작업이 겹치는 상황에 적용했습니다."
---

## 핵심 기여

- **주문 조회 병목 분석:** 같은 조건의 주문 목록에서 뒤 페이지일수록 대기가 늘었습니다. `EXPLAIN (ANALYZE, BUFFERS)`의 loops로 반환하지 않을 주문에도 상품·재고·금액·상태 계산이 반복됨을 확인했습니다.
- **상세 계산 범위 축소:** 현재 페이지의 PK를 먼저 고른 뒤 해당 주문에만 상세 정보를 붙이는 2단계 페이징을 적용했습니다. 키 탐색의 OFFSET은 유지하고 비싼 계산의 범위를 줄였습니다.
- **검색·정렬 결과 검증:** 동적 정렬을 공유하고 PK 보조 정렬·복합 PK 연결을 맞췄습니다. 변경 전후 건수·PK 순서·반환 컬럼을 대조했습니다.
- **동시 수집·운영:** 판매 채널의 수집 작업이 겹칠 때 Redis 분산 락으로 중복 처리를 제어했습니다. 수집 실패를 추적하고 Grafana·OpenLens로 지표와 파드·배포 상태를 확인했습니다.
