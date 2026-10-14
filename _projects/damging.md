---
title: 담깅 · 플로깅 어시스턴트
summary: "실시간 이동 동선과 챌린지를 연결하는 플로깅 앱에서 팀 리더와 프론트엔드 개발을 맡았습니다."
group: personal
icon: /assets/img/projects/icons/damging-icon.png
category: 해커톤
organization: 팀 테크노마드 · 새싹톤
period: 2023.05 - 2023.06
order: 15
highlight: "2023 새싹톤 서울경제진흥원장상 (장려)"
role: "팀 리더·프론트엔드 개발·발표"
tech:
- React
- Geolocation API
- DeviceOrientationEvent
- Kakao Maps API
cover: "/assets/img/daily/damging.png"
cover_alt: 담깅 플로깅 어시스턴트 앱 소개 화면
related_posts:
- "/sesacton/"
- "/kakaomap-line/"
- "/ios-device-orientation/"
- "/device-orientation/"
achievements:
  - title: "2023 새싹톤 서울경제진흥원장상 (장려)"
    detail: "약 한 달간 팀 리더·프론트엔드 개발·발표를 맡아 앱을 완성했습니다."
  - title: "이동 경로 표시와 iOS 권한 문제 해결"
    detail: "경로 표시를 구현하고 센서 이벤트의 권한 요청을 수정했습니다."
---

## 핵심 기여

- **이동 경로 표시:** 위치 권한 → 최초 좌표 → 지도 생성 → 이동 좌표 누적 순서로 구성하고 Kakao Maps Polyline으로 경로를 표시했습니다. 위치 실패를 안내하고 화면 정리 시 주기 조회를 해제했습니다.
- **iOS 센서 권한:** 걸음수 측정 시도 중 `useEffect`의 자동 권한 요청이 동작하지 않았습니다. 사용자 동작 조건을 확인해 버튼 클릭에서 요청하고, 허용된 경우에만 이벤트를 연결하도록 수정했습니다.
