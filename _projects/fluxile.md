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

## 한 번에 완성된 라인의 셀을 중복 없이 제거

Fluxile은 블록을 보드에 놓아 세 방향의 라인을 완성하면 해당 셀을 지우는 퍼즐입니다. 여러 방향의 라인이 동시에 완성되면 같은 셀이 겹칠 수 있어, 라인별로 제거하면 중복 처리가 생길 수 있었습니다.

완성된 셀 ID를 **Set으로 합쳐 한 번씩 제거**했습니다. 배치 전에 완성 라인을 계산하는 프리뷰는 실제 보드를 변경하지 않도록 분리하고, 배치·라인 제거 규칙을 화면 연출과 별도로 테스트했습니다.

## 무작위 블록 제공과 배치 가능성의 균형

새 손패를 만들 때 배치할 블록 세 개를 무작위로 뽑았습니다. 같은 종류만 나오거나, 보드에 빈 공간이 있어도 세 블록 중 어느 것도 놓을 수 없는 경우를 다뤄야 했습니다.

같은 계열의 블록 세 개가 나오는 조합을 제한하고 최소 한 개는 배치 가능한지 확인했습니다. 재시도는 30회로 제한한 뒤 가능한 후보를 찾는 fallback으로 전환했습니다. 배치 가능한 후보가 없을 때는 그 결과를 별도 상태로 반환해 일반 손패와 구분했습니다.

## 재실행 복원과 순위 제출 실패에 대비

플레이 도중 앱을 종료해도 게임을 이어갈 수 있어야 하고, 순위 제출에 실패해도 획득한 점수를 잃지 않아야 했습니다. 진행 상태는 버전이 있는 스냅샷으로 저장하고 난이도별 제출 대기 점수를 보존했습니다.

이 저장·재시도 로직을 외부 서비스 연결 없이 검증할 수 있도록 Game Center·광고 서비스는 테스트용 대체 구현(Fake)으로, Android 저장 매체는 메모리 구현으로 바꿀 수 있게 했습니다.
