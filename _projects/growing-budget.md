---
title: 자라는 가계부
summary: "예산을 나무의 변화로 보여주는 iOS 가계부로, 업데이트·복원 중 기록 보존에 집중했습니다."
group: personal
icon: /assets/img/projects/icons/growing-budget.jpg
category: 앱
order: 12
role: "기획·iOS 개발·데이터 설계·배포"
tech:
- Swift
- SwiftUI
- SQLite
- WidgetKit
- XCTest
highlight: "복원 전 파일 검증·실패 시 원본 보존 · SQLite 마이그레이션 검증"
links:
- label: App Store
  url: https://apps.apple.com/kr/app/%EC%9E%90%EB%9D%BC%EB%8A%94-%EA%B0%80%EA%B3%84%EB%B6%80/id6774437513
achievements:
  - title: "복원 실패가 기존 기록을 덮지 않도록 설계"
    detail: "잘못된 백업·지원하지 않는 버전의 복원을 차단하고 현재 DB를 보존합니다."
  - title: "구버전 데이터와 반복 거래의 호환성 검증"
    detail: "구버전 데이터·월 전환·반복 지출·거래 CRUD·파일 왕복을 테스트했습니다."
  - title: "예산 계산을 화면 표현과 분리"
    detail: "월말·추가 수입·빈 거래의 경계 조건을 검증했습니다."
---

## 핵심 기여

- **복원 전 검증:** 기존 DB를 교체하기 전에 백업의 무결성·필수 테이블·스키마 버전을 검사하고 안전 복사본을 남겼습니다. 실패 시 현재 기록을 보존하며, CSV는 미리보기·중복 제외를 제공합니다.
- **스키마 변경의 원자성:** 업데이트 중 일부 변경만 남지 않도록 마이그레이션을 트랜잭션으로 처리하고 이력을 관리했습니다.
- **시점에 맞는 예산 피드백:** 같은 예산 사용률도 월 초·말의 의미가 달라, 월 진행률·사용률·잔액을 함께 계산하도록 화면과 로직을 분리했습니다.
