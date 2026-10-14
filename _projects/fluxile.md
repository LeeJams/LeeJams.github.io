---
title: Fluxile
summary: "세 방향의 라인을 완성하는 헥사 블록 퍼즐을 iOS·Android로 출시했습니다."
group: personal
icon: /assets/img/projects/icons/fluxile.jpg
category: 앱
order: 9
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
    detail: "배치·라인 제거 규칙과 프리뷰를 화면 연출과 분리해 검증했습니다."
  - title: "앱 종료·연결 실패에도 게임과 점수 보존"
    detail: "진행 상태와 난이도별 제출 대기 점수를 기기에 저장합니다."
  - title: "iOS·Android 출시와 핵심 규칙 테스트"
    detail: "SwiftUI·SpriteKit과 Kotlin·Compose로 직접 구현·배포했습니다."
---

## 핵심 기여

- **교차 라인 처리:** 세 방향의 라인이 겹치는 셀을 Set으로 합쳐 한 번씩 제거했습니다. 배치 예상 결과의 계산은 실제 보드를 바꾸지 않도록 분리했습니다.
- **블록 제공 규칙:** 세 블록이 모두 같은 계열인 조합을 제한하고 최소 한 개는 배치 가능한지 확인했습니다. 무작위 재시도는 30회로 제한한 뒤 후보를 직접 찾고, 후보 없음은 별도 상태로 반환했습니다.
- **복원·제출 재시도:** 앱 종료에 대비한 버전별 게임 스냅샷과 난이도별 제출 대기 점수를 저장했습니다. 연결 실패 시 점수를 보존해 다음 연결에서 재시도합니다.
- **외부 서비스와 테스트 분리:** Game Center·광고는 Fake, Android 저장은 메모리 구현으로 대체해 핵심 규칙과 저장·복원을 검증했습니다.
