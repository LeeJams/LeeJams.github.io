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

## 교차 라인과 배치 프리뷰의 계산 규칙

Fluxile은 블록을 보드에 놓아 세 방향의 라인을 완성하면 해당 셀을 지우는 퍼즐입니다. 한 번의 배치로 여러 방향이 완성되면 교차점의 셀이 겹치므로, 제거 대상을 라인별로 처리할 때 중복이 생기지 않아야 했습니다.

완성된 라인의 셀 ID를 **Set으로 합쳐 한 번씩 제거**했습니다. 블록을 놓기 전에 보여주는 배치 예상 결과는 실제 보드를 바꾸지 않도록 분리했습니다. 배치·라인 제거 규칙을 화면 연출과 별도로 테스트해, 계산 결과와 시각 효과의 책임을 나눴습니다.

## 무작위 블록에도 다음 수를 둘 수 있도록

매 턴 제공할 블록 세 개를 무작위로 뽑되, 같은 계열만 세 개가 나오거나 빈 공간이 있는데도 어느 블록도 놓을 수 없는 조합은 제한해야 했습니다. 무작위 선택의 다양성과 현재 보드의 배치 가능성을 함께 고려했습니다.

새 조합에서 **최소 한 개는 배치 가능한지** 확인했습니다. 무작위 재시도를 30회로 제한하고, 이후에는 배치 가능한 후보를 직접 찾도록 했습니다. 가능한 후보가 없는 결과는 별도 상태로 반환해 일반적인 블록 제공과 구분했습니다.

## 게임 복원·순위 재시도를 외부 연결 없이 검증

플레이 도중 앱을 종료해도 게임을 이어가고, 순위 제출에 실패해도 획득한 점수를 보존해야 했습니다. **버전이 있는 게임 스냅샷**으로 진행 상태를 복원하고, 난이도별 제출 대기 점수를 저장해 다음 연결에서 재시도하도록 구현했습니다.

이 로직의 검증이 네트워크나 외부 SDK의 상태에 좌우되지 않도록 Game Center·광고 서비스에 테스트용 대체 구현(Fake)을 주입하고, Android 저장 매체도 메모리 구현으로 바꿀 수 있게 했습니다. 핵심 규칙과 저장·복원을 검증하며 SwiftUI·SpriteKit과 Kotlin·Compose로 구현해 **iOS·Android에 출시**했습니다.
