---
title: Fluxile
summary: "AI를 개발에 활용하며 iOS·Android 네이티브로 구현·출시한 헥사 블록 퍼즐입니다."
group: personal
icon: /assets/img/projects/icons/fluxile.jpg
category: 앱
order: 11
more: true
role: "기획·디자인·iOS/Android 개발·출시·운영"
team: 1인 개발
contribution: "100%"
tech:
- Swift
- SwiftUI
- SpriteKit
- Kotlin
- Jetpack Compose
- XCTest
problem_label: 시작한 이유
problem: "AI를 개발에 활용하면서 iOS·Android 네이티브 앱의 구현부터 출시까지 직접 경험해 보고 싶었습니다. 헥사 블록 퍼즐을 소재로 게임 규칙과 화면 연출을 나누고, 앱을 종료하거나 연결이 끊겨도 플레이를 이어갈 수 있는 흐름을 완성하는 것을 목표로 삼았습니다."
solution: "iOS는 SwiftUI·SpriteKit, Android는 Kotlin·Compose로 각각 구현했습니다. 게임 진행 상태와 제출 대기 점수를 저장하고, 핵심 규칙·저장·복원은 외부 연동을 대체한 테스트로 확인했습니다."
links:
- label: App Store
  url: https://apps.apple.com/kr/app/fluxile/id6790445512
- label: Google Play
  url: https://play.google.com/store/apps/details?id=io.leejam.Fluxile
related_posts:
- "/think-like-a-user/"
---

## 구현에서 고려한 점

- **교차 라인 처리:** 세 방향의 라인이 겹치는 셀을 Set으로 합쳐 한 번씩 제거했습니다. 배치 예상 결과의 계산은 실제 보드를 바꾸지 않도록 분리했습니다.
- **블록 제공 규칙:** 세 블록이 모두 같은 계열인 조합을 제한하고 최소 한 개는 배치 가능한지 확인했습니다. 무작위 재시도는 30회로 제한한 뒤 후보를 직접 찾고, 후보 없음은 별도 상태로 반환했습니다.
- **복원·제출 재시도:** 앱 종료에 대비한 버전별 게임 스냅샷과 난이도별 제출 대기 점수를 저장했습니다. 연결 실패 시 점수를 보존해 다음 연결에서 재시도합니다.
- **규칙 검증:** Game Center·광고와 Android 저장소를 테스트 대역으로 바꿔, 외부 연동과 분리한 상태에서 핵심 규칙과 저장·복원을 검증했습니다.
