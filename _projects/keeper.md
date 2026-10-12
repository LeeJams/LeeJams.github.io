---
title: Keeper 직원 관리 서비스
summary: 근태부터 급여·근로계약서까지, 직원 관리 도메인의 프론트엔드를 개발했습니다.
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
highlight: 근로시간 계산의 책임 분리·Vitest 검증 · WebView 데이터 연동
links:
- label: 서비스
  url: https://keeper.ceo/
related_posts:
- "/presentation-container/"
achievements:
- title: 근로시간 계산을 UI와 분리하고 유닛 테스트로 검증
  detail: 프레젠테이션/컨테이너 패턴과 Hooks로 책임을 나누고, 근태 도메인 규칙을 적용한 계산 로직을 Vitest로 검증했습니다.
- title: 웹 화면과 네이티브 앱의 데이터 연동 구현
  detail: 앱 팀과 인터페이스를 협의하고 WebView 브릿지를 구현해 직원 관리 기능을 웹·앱의 흐름으로 연결했습니다.
---

## 업무 규칙을 화면 코드에 섞지 않기

근로시간 계산에는 최저임금·주휴수당·휴게시간 같은 업무 규칙이 연결됐습니다. 계산과 렌더링이 함께 있으면 화면을 바꾸면서 계산 로직까지 영향을 줄 수 있고, 계산만 따로 검증하기도 어려웠습니다.

규정을 학습해 근태 로직에 반영하고, 프레젠테이션/컨테이너 패턴과 Hooks로 UI·계산·데이터 처리의 책임을 나눴습니다. 근로시간 계산은 Vitest 유닛 테스트로 확인해 업무 규칙을 화면과 분리해서 검증했습니다.

## 웹 화면과 앱의 데이터 전달 경계 맞추기

WebView 안에서 화면이 정상 동작하는 것만으로는 네이티브 앱과 데이터가 맞는지 알 수 없었습니다. 앱 쪽에서 기대하는 인터페이스와 웹의 전달 방식이 일치해야 했습니다.

앱 팀과 인터페이스를 협의하고 WebView 브릿지를 구현했습니다. 웹 UI 구현과 앱의 데이터 연동을 따로 확인하면서 직원 관리 기능의 흐름을 연결했습니다.
