---
title: organization-chart-vue3
summary: "조직·구성원의 계층을 표시하는 Vue 3 컴포넌트로, 화면 확장과 기존 이벤트 호환성을 지원합니다."
group: personal
icon: /assets/img/projects/icons/organization-chart.svg
category: 오픈소스
order: 15
role: "컴포넌트 설계·개발·npm 배포"
problem: "서비스별로 다른 조직도 항목 표현과 선택 동작을 지원하는 것이 과제였습니다. 저는 Vue 3에서 서비스별 확장이 가능하고, 기존 이벤트 사용 방식도 유지할 수 있는 조직도 컴포넌트를 공개 패키지로 제공하고자 했습니다."
solution: "노드 표현과 선택 후 동작을 서비스에서 바꿀 수 있는 API를 제공하고, 기존 이벤트와 함께 사용할 수 있도록 호환성을 유지했습니다."
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
    detail: "타입·커스텀 슬롯·선택 정보를 갖춘 공개 컴포넌트입니다."
  - title: "기존 이벤트를 유지하며 npm 패키지 배포"
    detail: "Options API·script setup 예제와 데모를 함께 공개했습니다."
---

## 핵심 기여

- **서비스별 확장:** 조직도 항목의 표현과 선택 뒤 동작이 달라질 수 있어 노드·구성원 타입과 커스텀 슬롯을 제공했습니다. 선택 이벤트에 대상·ID·트리 경로를 담아 서비스 기능에 연결하도록 했습니다.
- **기존 코드 호환:** 선택 정보를 확장하며 기존 `click-node`를 유지하고 타입이 있는 `select` 이벤트를 추가했습니다. 새 API를 도입해도 기존 사용 방식이 동작하도록 했습니다.
