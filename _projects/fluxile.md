---
title: Fluxile
summary: "세 방향의 라인을 완성하는 헥사 블록 퍼즐을 iOS·Android로 출시했습니다."
group: personal
icon: /assets/img/projects/icons/fluxile.jpg
category: 앱
order: 9
role: "기획·iOS/Android 개발·배포"
tech:
- Swift
- SwiftUI
- SpriteKit
- Kotlin
- Jetpack Compose
- XCTest
highlight: "교차 라인 중복 처리 방지 · 게임 복원·순위 제출 재시도 구현"
links:
- label: App Store
  url: https://apps.apple.com/kr/app/fluxile/id6790445512
- label: Google Play
  url: https://play.google.com/store/apps/details?id=io.leejam.Fluxile
related_posts:
- "/think-like-a-user/"
achievements:
  - title: "교차 라인을 중복 없이 제거하는 게임 규칙 구현"
    detail: "세 방향에서 완성된 라인의 셀을 Set으로 합쳐 한 번씩 제거하고, 프리뷰 계산을 실제 보드 변경과 분리했습니다."
  - title: "앱 종료·연결 실패에도 게임과 점수 보존"
    detail: "버전이 있는 게임 스냅샷으로 복원하고, 순위 제출에 실패한 점수는 보관해 다음 연결에서 재시도합니다."
  - title: "iOS·Android 출시와 핵심 규칙 테스트"
    detail: "SwiftUI·SpriteKit과 Kotlin·Compose로 구현했습니다. 외부 SDK·저장 매체를 대체할 수 있게 해 규칙과 저장·복원을 검증했습니다."
---

## 교차 라인의 중복 처리와 프리뷰 부작용 방지

세 방향의 완성 라인은 같은 셀에서 교차합니다. 라인별로 셀을 제거하면 중복 처리가 생기고, 프리뷰 계산이 실제 보드를 바꿔서도 안 됐습니다.

완성 셀 ID를 **Set으로 합쳐 한 번씩 제거**했습니다. 프리뷰는 배치 예정 셀을 가정해 계산만 수행하도록 분리하고, 보드·배치·제거 규칙을 화면 연출과 별도로 테스트했습니다.

## 배치 가능한 손패와 게임 종료 조건 구분

무작위 손패는 같은 종류만 나오거나, 빈 공간이 있어도 아무 블록을 놓지 못하는 경우가 있었습니다.

같은 패밀리 세 개를 제한하고 최소 한 개의 배치 가능성을 확인했습니다. 재시도는 30회로 제한한 뒤 가능한 후보를 찾는 fallback으로 전환하고, 후보가 없으면 게임오버 후보 상태를 반환했습니다.

## 저장·연결 실패를 데이터 손실로 만들지 않기

게임 복원과 순위 제출은 앱 종료·연결 실패를 함께 다뤄야 했습니다. 진행 상태는 버전이 있는 스냅샷으로 저장하고 난이도별 제출 대기 점수를 보존했습니다.

Game Center·광고 서비스는 Fake 구현으로, Android 저장 매체는 메모리 구현으로 대체할 수 있게 해 **외부 연결 없이 핵심 규칙과 저장·복원**을 검증했습니다.
