---
title: 듀티라운지
summary: "카지노 교대 근무 앱을 운영하며, 백엔드 이전과 일정 조회·저장의 정합성을 개선했습니다."
group: personal
icon: /assets/img/projects/icons/duty-lounge.jpg
category: 앱
order: 10
role: "기획·디자인·앱/백엔드 개발·출시·운영"
team: 1인 개발
contribution: "100%"
tech: [React Native, Expo, TypeScript, PostgreSQL, Supabase Auth, RLS, TanStack Query, Jest]
highlight: "Cafe24 → Supabase 이전 · 서버 고정비 월 11,000원 → 0원 (2025년 이전 당시)"
achievements:
  - title: "서버 고정비 월 11,000원 → 0원"
    detail: "2025년 Cafe24에서 Supabase Free Plan으로 이전한 당시 기준입니다."
  - title: "월별 데이터 조회 101회 → 3회"
    detail: "50명·단일 페이지 모의 데이터 기준. 인증·그룹·가입 확인 3회와 추가 청크·페이지 요청은 별도입니다."
  - title: "오래된 응답이 새 저장 결과를 덮는 문제 방어"
    detail: "단일 저장 재현 테스트와 계정 전환·초안 보존 회귀 테스트로 확인했습니다."
links:
  - label: App Store
    url: https://apps.apple.com/kr/app/%EB%93%80%ED%8B%B0%EB%9D%BC%EC%9A%B4%EC%A7%80/id6742709529
  - label: Google Play
    url: https://play.google.com/store/apps/details?id=com.leejam.dutylounge
related_posts:
  - /supabase-migration/
  - /cafe24-SSL/
---

## 핵심 기여

- **백엔드 이전:** 초기 사용량에도 발생하는 고정비·OS·API·DB 관리를 줄이기 위해 Cafe24에서 Supabase로 옮겼습니다. MySQL을 PostgreSQL로, 자체 JWT 인증을 Auth·profiles의 UUID 구조로 전환했습니다.
- **데이터·권한 오류 대응:** 자료형 변환 누락에 따른 import 실패를 수정하고, RLS 적용 후 조회가 막히는 문제를 소유자·그룹 가입 관계의 정책과 권한 확인 RPC로 해결했습니다.
- **그룹 일괄 조회:** 멤버별 일정·근무 요청이 1 + 2N회로 늘어나는 구조를 일괄 조회·Map 조합으로 바꿨습니다. URL·행 제한에 맞춰 50명 청크·100행 페이지 처리를 적용했습니다.
- **캐시 경쟁·초안 보존:** 단일 저장 실험에서 늦은 이전 조회가 저장 결과를 덮는 문제를 재현했습니다. 조회 취소 후 저장 응답 반영, 이전 계정 응답 제외, 편집 초안 분리를 적용하고 회귀 테스트로 확인했습니다.
