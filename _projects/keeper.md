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

## 직원 관리 화면의 업무 계산을 UI와 분리

Keeper의 근태·급여 기능에서는 근로시간과 휴게시간을 계산하고, 주휴수당·최저임금 같은 업무 규정을 다뤘습니다. 계산을 화면 코드에 함께 두면 UI 변경이 계산에 영향을 주고, 업무 규칙만 따로 검증하기도 어려웠습니다.

프레젠테이션/컨테이너 패턴과 Hooks로 **UI·계산·데이터 처리의 책임을 나눴습니다.** 업무 규칙을 반영한 근로시간 계산은 Vitest 유닛 테스트로 검증해 화면을 실행하지 않고도 계산을 확인할 수 있게 했습니다.

## 앱 안의 웹 화면과 네이티브 데이터 연동

직원 관리 기능은 네이티브 앱 안의 웹 화면인 WebView에서도 제공됐습니다. 웹 화면이 동작하는 것뿐 아니라 앱과 웹이 주고받는 데이터의 인터페이스도 맞아야 했습니다.

앱 팀과 전달 인터페이스를 협의해 WebView 브릿지를 구현했습니다. 웹 화면의 동작과 앱으로 전달되는 데이터를 함께 확인하며 연동을 맞췄습니다.
