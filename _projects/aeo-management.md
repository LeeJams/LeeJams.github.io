---
title: AEO 인증 관리 시스템
summary: "수기 엑셀을 인증 업무용 데이터로 전환하고, 심사 기준 변경을 설정으로 처리하는 시스템입니다."
group: company
category: 업무
organization: 현대글로비스 · 엔더스
period: 2023.08 - 2024.03
role: 풀스택 개발
order: 4
tech:
- Vue 3
- TypeScript
- Java
- Spring Boot
- MyBatis
- MariaDB
- Apache POI
highlight: "수만 건 엑셀 데이터 정규화 · 심사 기준을 설정으로 관리"
achievements:
  - title: "수만 건 수기 엑셀을 정규화된 데이터로 전환"
    detail: "인증 기준과 심사 프로세스에 맞춘 DB와 이관 기능을 구현했습니다."
  - title: "심사 기준 변경을 코드 수정 없이 반영"
    detail: "평가 항목을 설정으로 관리해 화면·백엔드에 함께 반영했습니다."
---

## 핵심 기여

- **업무 기준의 데이터 전환:** 수기 엑셀을 심사 항목별로 조회·관리하도록 인증 기준과 업무 흐름에 맞춰 DB를 설계했습니다. Apache POI 파싱 → DTO 매핑 → 유효성 검사 → 배치 저장으로 이관했습니다.
- **심사 기준의 설정 분리:** 평가 항목을 코드에 고정하면 기준 변경이 여러 구현에 영향을 주므로, 화면·백엔드가 같은 설정을 사용하도록 구성했습니다.
