---
title: organization-chart-vue3
summary: "화면·이벤트를 확장하면서 기존 사용 코드와의 호환성을 유지하는 Vue 3 조직도 컴포넌트입니다."
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

## 공통 렌더링과 서비스별 동작을 분리

표시 방식과 클릭 동작을 한 서비스에 고정하면 다른 프로젝트에서 재사용하기 어려웠습니다.

노드·구성원 타입과 **커스텀 슬롯**을 제공했습니다. 선택 이벤트에는 대상·ID·트리 경로를 담아, 사용하는 서비스가 항목을 식별하고 자신의 기능에 연결할 수 있게 했습니다.

## 공개 API 확장과 기존 호환성을 함께 유지

이벤트 구조를 바꾸면 기존 소비 코드의 클릭 핸들러가 영향을 받을 수 있었습니다.

타입이 있는 `select` 이벤트를 추가하면서 기존 `click-node`도 유지했습니다. Options API·script setup 예제와 데모를 공개해 **기존 방식과 새 이벤트 계약**을 확인할 수 있게 했습니다.
