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
    detail: "UI·계산·데이터 처리의 책임을 나누고, 근태 업무 규칙을 반영한 계산 로직을 Vitest 유닛 테스트로 확인했습니다."
  - title: "웹·앱을 연결하는 WebView 브릿지 구현"
    detail: "앱 팀과 데이터 전달 인터페이스를 협의하고, 직원 관리 기능을 네이티브 앱의 사용 흐름에 연결했습니다."
---

## 업무 계산을 화면 변경에서 분리

근로시간 계산에는 최저임금·주휴수당·휴게시간 규칙이 연결됐습니다. 렌더링과 계산이 섞이면 화면 변경이 계산 결과에도 영향을 줄 수 있었습니다.

프레젠테이션/컨테이너 패턴과 Hooks로 **UI·계산·데이터 처리의 책임을 분리**했습니다. 업무 규칙은 계산 로직에 반영하고 Vitest로 독립적으로 검증했습니다.

## 앱 팀과 데이터 전달 계약을 먼저 합의

WebView 화면 구현과 네이티브 앱의 데이터 연동은 별도로 확인해야 했습니다. 앱이 기대하는 형식과 웹의 전달 방식이 같아야 기능이 이어졌습니다.

앱 팀과 인터페이스를 협의해 WebView 브릿지를 구현했습니다. 화면 동작과 앱으로 전달되는 데이터를 함께 확인하며 연동을 맞췄습니다.
