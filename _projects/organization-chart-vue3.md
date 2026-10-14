---
title: organization-chart-vue3
summary: "조직·구성원의 계층을 표시하는 Vue 3 컴포넌트로, 화면 확장과 기존 이벤트 호환성을 지원합니다."
group: personal
icon: /assets/img/projects/icons/organization-chart.svg
category: 오픈소스
order: 13
role: "컴포넌트 설계·개발·npm 배포"
tech:
- Vue 3
- TypeScript
- npm
highlight: "기존 이벤트 호환성 유지 · 타입·슬롯·선택 경로를 갖춘 npm 패키지"
links:
- label: npm
  url: https://www.npmjs.com/package/organization-chart-vue3
- label: GitHub
  url: https://github.com/LeeJams/Organization-Chart-Vue3
achievements:
  - title: "서비스에 맞춰 확장할 수 있는 조직도 API 제공"
    detail: "노드·구성원 타입과 커스텀 슬롯을 제공하고, 선택 이벤트에 ID·트리 경로를 담아 서비스 기능과 연결할 수 있게 했습니다."
  - title: "기존 이벤트를 유지하며 npm 패키지 배포"
    detail: "click-node를 유지하면서 타입이 있는 select 이벤트를 추가했습니다. Options API·script setup 예제와 데모로 사용 계약을 문서화했습니다."
---

## 서비스마다 달라지는 조직도의 표현과 선택 동작

조직·구성원의 계층을 그리는 Vue 3 컴포넌트를 재사용 가능한 패키지로 만들었습니다. 사용하는 서비스마다 항목을 보여주는 방식과 선택 이후 동작이 달라질 수 있어, 서비스가 자신의 화면과 기능에 맞춰 확장할 수 있어야 했습니다.

## 공통 렌더링과 서비스별 기능의 경계 설계

노드·구성원 타입으로 데이터 구조를 정의하고, **커스텀 슬롯**으로 항목의 표현을 바꿀 수 있게 했습니다. 선택 이벤트에는 대상·ID·트리 경로를 담아 서비스가 선택한 항목을 식별하고 후속 기능에 연결하도록 했습니다.

패키지는 계층 렌더링과 선택 정보 전달을 맡고, 이를 사용하는 서비스가 항목의 표현과 선택 뒤 동작을 구현하도록 책임을 나눴습니다.

## 기존 이벤트 호환성을 유지하며 npm 배포

선택 정보를 확장한 `select` 이벤트를 추가할 때도 기존 `click-node`를 사용하는 코드가 계속 동작해야 했습니다. **기존 이벤트를 유지하면서 타입이 있는 `select`를 추가**해 새 API와 기존 사용 방식의 호환성을 함께 다뤘습니다.

npm으로 배포하고 Options API·script setup 예제와 데모를 공개했습니다. 사용자가 데이터 구조·슬롯·이벤트를 실제 코드로 확인해 자신의 서비스에 연결할 수 있도록 문서화했습니다.
