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

## 조직도 공통 렌더링과 서비스별 표현을 분리

조직·구성원의 계층을 그리는 Vue 3 조직도 컴포넌트를 재사용 가능한 형태로 만들었습니다. 사용하는 서비스마다 항목을 보여주는 방식과 선택 이후 동작이 다를 수 있어, 공통 렌더링 안에 이를 고정하지 않도록 했습니다.

노드·구성원 타입과 **커스텀 슬롯**을 제공했습니다. 선택 이벤트에는 대상·ID·트리 경로를 담아, 서비스가 선택한 항목을 식별하고 자신의 기능에 연결할 수 있게 했습니다.

## 선택 이벤트를 확장하면서 기존 호출 방식 유지

선택한 항목의 정보를 담는 `select` 이벤트를 추가하면서, 기존 `click-node`를 사용하는 코드도 계속 동작해야 했습니다. 새 API를 제공하는 작업과 기존 계약을 유지하는 작업을 함께 다뤘습니다.

타입이 있는 `select`를 추가하고 기존 `click-node`도 유지했습니다. Options API·script setup 예제와 데모를 공개해 기존 방식과 새 이벤트 계약을 확인할 수 있게 했습니다.
