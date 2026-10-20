---
title: 듀티라운지
summary: "카지노에서 일한 경험을 바탕으로, 교대 근무를 하는 친구들을 위해 만든 일정 관리 앱입니다."
group: personal
icon: /assets/img/projects/icons/duty-lounge.jpg
category: 앱
order: 10
role: "기획·디자인·앱/백엔드 개발·출시·운영"
team: 1인 개발
contribution: "100%"
tech: [React Native, Expo, TypeScript, PostgreSQL, Supabase Auth, RLS, TanStack Query, Jest]
problem_label: 만들게 된 이유
problem: "호텔·카지노 교대 근무자가 자신의 근무표와 동료들의 일정을 함께 관리할 수 있는 공간을 만들고 싶었습니다. 개발자가 되기 전 카지노에서 일했고, 지금도 주변에 교대 근무를 하는 친구들이 많습니다. 주변에서 쓰던 앱은 간호사 근무와 커뮤니티에 초점이 맞춰져 있어, 친구들의 근무 환경을 중심에 둔 앱을 직접 기획했습니다."
solution: "개인 근무표와 그룹의 근무·휴가 일정을 달력에서 확인하도록 만들었습니다. 그룹 메모와 푸시 알림을 연결해, 일정과 근무 관련 소식을 한곳에서 나눌 수 있도록 했습니다."
achievements_title: 운영하며 개선한 것
achievements:
  - title: "Cafe24 → Supabase 이전 · 서버 고정비 월 11,000원 → 0원"
    detail: "고정비와 직접 서버 관리를 줄이기 위해 MySQL·자체 JWT 인증을 PostgreSQL·Supabase Auth로 전환했습니다. 그룹별 접근 권한은 RLS와 권한 확인 RPC로 정리했습니다. 금액은 2025년 Free Plan으로 이전한 당시 기준입니다."
  - title: "월별 데이터 조회 101회 → 3회"
    detail: "멤버마다 일정·근무를 불러오던 1 + 2N 구조를 일괄 조회와 Map 조합으로 바꿨습니다. 50명·단일 페이지 모의 데이터 기준이며, 인증·그룹·가입 확인 3회와 추가 청크·페이지 요청은 별도입니다."
  - title: "오래된 응답이 새 저장 결과를 덮는 문제 방어"
    detail: "일정 저장 뒤 늦게 도착한 조회 응답이 새 값을 덮는 현상을 재현했습니다. 이전 조회 취소·저장 응답 반영·계정별 초안 분리를 적용하고 회귀 테스트로 확인했습니다."
links:
  - label: App Store
    url: https://apps.apple.com/kr/app/%EB%93%80%ED%8B%B0%EB%9D%BC%EC%9A%B4%EC%A7%80/id6742709529
  - label: Google Play
    url: https://play.google.com/store/apps/details?id=com.leejam.dutylounge
related_posts:
  - /supabase-migration/
  - /cafe24-SSL/
---

## 제품에서 고려한 점

- **함께 근무하는 사람의 일정:** 개인 근무표만으로는 동료들의 근무·휴가를 함께 보기 어려워, 그룹에서 여러 사람의 일정을 확인할 수 있게 했습니다.
- **일정 확인 뒤 이어지는 소통:** 일정과 관련된 소식을 따로 찾아다니지 않도록 그룹 메모를 두고, 새 메모와 그룹 초대를 푸시 알림으로 연결했습니다.
