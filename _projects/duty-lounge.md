---
title: 듀티라운지
summary: "카지노 교대 근무 앱을 운영하며, 백엔드 이전과 일정 조회·저장의 정합성을 개선했습니다."
group: personal
icon: /assets/img/projects/icons/duty-lounge.jpg
category: 앱
order: 10
role: "기획·앱/백엔드 개발·운영"
tech: [React Native, Expo, TypeScript, PostgreSQL, Supabase Auth, RLS, TanStack Query, Jest]
highlight: "Cafe24 → Supabase 이전 · 서버 고정비 월 11,000원 → 0원 (2025년 이전 당시)"
achievements:
  - title: "서버 고정비 월 11,000원 → 0원"
    detail: "2025년 Cafe24 가상서버에서 Supabase Free Plan으로 이전한 당시 기준입니다. 자체 API·인증·DB를 전환해 직접 운영할 범위를 줄였습니다."
  - title: "월별 데이터 조회 101회 → 3회"
    detail: "50명·단일 페이지 모의 데이터 기준입니다. 인증·가입 확인 3회는 별도이며, 데이터 증가 시 청크·페이지 요청도 늘어납니다."
  - title: "오래된 응답이 새 저장 결과를 덮는 문제 방어"
    detail: "이전 조회 취소, 저장 응답의 캐시 반영, 편집 초안 분리를 적용했습니다. 느린 응답·계정 전환 상황을 회귀 테스트로 확인했습니다."
links:
  - label: App Store
    url: https://apps.apple.com/kr/app/%EB%93%80%ED%8B%B0%EB%9D%BC%EC%9A%B4%EC%A7%80/id6742709529
  - label: Google Play
    url: https://play.google.com/store/apps/details?id=com.leejam.dutylounge
related_posts:
  - /supabase-migration/
  - /cafe24-SSL/
---

## 초기 서비스 규모에 맞춰 운영 범위 축소

Cafe24의 NestJS·Prisma·MySQL과 자체 JWT 인증은 초기 사용량에도 서버 고정비와 OS·API·DB 관리가 필요했습니다. 관계형 데이터와 인증을 함께 제공하는 Supabase로 직접 운영할 범위를 줄이기로 했습니다.

MySQL 데이터를 PostgreSQL로 변환하고 Auth·profiles의 UUID 참조에 맞춰 앱 호출과 인증을 전환했습니다. import 오류와 RLS 적용 후 조회 문제를 해결하며, **소유자·그룹 가입 관계에 따른 조회·수정 권한**과 권한 확인을 포함한 RPC를 구성했습니다.

## 멤버 수에 비례하는 요청을 일괄 조회로 전환

멤버 목록 이후 각 멤버의 일정·근무를 요청해 월별 데이터 조회가 **1 + 2N회**였습니다. 병렬 실행만으로는 요청 개수를 줄일 수 없었습니다.

멤버 ID로 일정·근무를 각각 일괄 조회하고 Map으로 조합했습니다. URL 길이·반환 행 제한에 맞춰 50명 청크·100행 페이지 처리를 적용하고, 단일 페이지 모의 데이터로 요청 수를 검증했습니다.

## 조회 응답 순서와 편집 상태를 분리

저장 응답 뒤에 오래된 조회가 도착하면 캐시를 이전 값으로 덮었습니다. 캐시 무효화나 낙관적 갱신만으로는 응답 순서의 경쟁을 막지 못했습니다.

**이전 조회를 취소한 뒤 저장 응답을 반영**하고, 계정 전환 시 이전 계정 응답을 제외했습니다. 편집 초안도 서버 데이터와 분리해 느린 조회·계정 변경·초안 보존을 회귀 테스트로 확인했습니다.
