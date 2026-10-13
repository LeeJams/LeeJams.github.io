---
title: Sellpick OMS 개발·운영
summary: "멀티 채널 OMS에서 느린 주문 조회와 동시 수집의 중복 처리 문제를 개선했습니다."
group: company
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
highlight: "주문 조회 첫 페이지 약 20초 → 5초 · 뒤 페이지 약 100초 → 6초"
links:
- label: 서비스
  url: https://www.sellpick.co.kr
related_posts:
- "/postgresql-order-list-query-optimization/"
- "/cowork-automation-skills/"
achievements:
  - title: "첫 페이지 약 20초 → 5초, 뒤 페이지 약 100초 → 6초"
    detail: "해당 주문 목록에 2단계 페이징 등 여러 개선을 적용한 측정 결과입니다. 변경 전후의 건수·PK 순서·반환 컬럼을 대조했습니다."
  - title: "동시 주문 수집의 중복 처리 제어"
    detail: "Redis 분산 락을 적용해 여러 채널의 수집 작업이 겹칠 때 같은 주문을 중복 처리하는 문제를 다뤘습니다."
---

## 반환할 주문에만 상세 조회 비용 사용

뒤 페이지가 느려지는 원인은 상품·재고·금액·상태를 계산한 뒤 OFFSET으로 앞의 주문을 버리는 구조였습니다. 반환하지 않을 주문에도 비싼 상세 조회가 반복됐습니다.

**현재 페이지의 PK를 먼저 선택한 뒤 상세 정보를 붙이는 2단계 페이징**을 적용했습니다. OFFSET의 키 탐색은 남지만, 상세 조회 범위는 선택된 주문으로 제한했습니다.

## 성능을 바꿔도 검색·정렬 결과는 유지

조회 단계를 나누면 조건이나 정렬이 달라져 페이지 이동 시 중복·누락이 생길 수 있었습니다.

동적 정렬을 같은 SQL 조각으로 공유하고 PK를 보조 정렬 기준으로 추가했습니다. 복합 PK 연결과 검색 조건을 맞춰 **건수·PK 순서·반환 컬럼을 비교**하고, 실행 계획에서 비용이 큰 노드의 반복 범위도 확인했습니다.

## 동시 수집과 운영 실패 대응

수집 작업이 각각 정상이어도 실행이 겹치면 같은 주문을 중복 처리할 수 있었습니다. Redis 분산 락으로 동시 실행을 제어했습니다.

운영에서는 쇼핑몰 API 변경과 배치 실패를 추적하고, Grafana·OpenLens로 지표와 파드·배포 상태를 확인했습니다.
