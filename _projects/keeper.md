---
title: Keeper 직원 관리 서비스
summary: "직원 관리 서비스의 프론트엔드에서 근로시간 계산의 검증과 웹·앱 연동을 맡았습니다."
group: company
category: 업무
organization: 한화비전
period: 2024.05 - 2025.07
role: 프론트엔드 개발
order: 3
tech:
- React
- Next.js
- TypeScript
- MobX
- TanStack Query
- Vitest
highlight: "근로시간 계산 로직 분리·Vitest 검증 · WebView 브릿지 구현"
links:
- label: 서비스
  url: https://keeper.ceo/
related_posts:
- "/presentation-container/"
achievements:
  - title: "근로시간 계산을 화면과 분리해 검증"
    detail: "화면 실행 없이 근태 업무 규칙을 확인할 수 있게 했습니다."
  - title: "웹·앱을 연결하는 WebView 브릿지 구현"
    detail: "앱 팀과 인터페이스를 협의해 직원 관리 웹 기능을 앱에 연결했습니다."
---

## 핵심 기여

- **업무 계산의 독립 검증:** 근태·급여 화면의 UI 변경과 계산 검증을 분리하기 위해 프레젠테이션/컨테이너 패턴과 Hooks를 적용했습니다. 근로시간 계산은 Vitest 유닛 테스트로 확인했습니다.
- **웹·앱 데이터 연동:** WebView에서 제공하는 직원 관리 기능을 앱에 연결하도록, 앱 팀과 데이터 전달 인터페이스를 협의하고 브릿지를 구현했습니다.
