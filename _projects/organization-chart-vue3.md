---
title: organization-chart-vue3
summary: Vue 3에서 계층형 조직을 표현하는 공개 조직도 컴포넌트입니다.
group: personal
category: 오픈소스
order: 13
role: 컴포넌트·타입·공개 API 설계·문서화·npm 배포
tech:
- Vue 3
- TypeScript
- npm
highlight: 기존 이벤트 호환성 유지 · 타입·슬롯·선택 경로를 갖춘 npm 패키지
links:
- label: npm
  url: https://www.npmjs.com/package/organization-chart-vue3
- label: GitHub
  url: https://github.com/LeeJams/Organization-Chart-Vue3
achievements:
- title: 조직도를 서비스별 화면에 맞게 확장하는 공개 API 구현
  detail: 노드·구성원 타입, 안정적인 ID·트리 경로를 포함한 선택 이벤트와 커스텀 슬롯을 제공해 계층 렌더링을 사용하는 서비스의 기능과
    연결하도록 구성했습니다.
- title: 기존 이벤트 호환성과 도입 예제를 갖춘 npm 배포
  detail: 기존 click-node 이벤트를 유지하며 타입이 있는 select 이벤트를 제공하고, Options API·script setup
    예제와 데모를 공개했습니다.
---

## 공통 렌더링과 서비스별 표시 방식 분리하기

조직도를 한 서비스의 화면에 맞춰 고정하면 다른 프로젝트에서 쓰기 어려웠습니다. 계층을 그리는 공통 로직은 유지하면서 제목·구성원의 표시 방식과 클릭 이후 동작을 사용하는 쪽에서 결정할 수 있어야 했습니다.

노드·구성원 타입과 커스텀 슬롯을 제공했습니다. 선택 이벤트에는 대상·ID·트리 경로를 함께 전달해 사용하는 서비스가 선택한 항목을 식별하고 자신의 기능과 연결할 수 있게 했습니다.

## 타입을 추가하면서 기존 소비 코드의 호환성 유지하기

이벤트 구조를 바꾸면 기존 클릭 핸들러가 영향을 받을 수 있었습니다. 새 사용 방식과 기존 사용 방식의 경계를 명확히 둘 필요가 있었습니다.

타입이 있는 select 이벤트를 제공하면서 기존 click-node 이벤트도 유지했습니다. Options API·script setup 사용 예제와 데모를 함께 제공해 도입 방식과 이벤트 계약을 확인할 수 있도록 정리했습니다.
