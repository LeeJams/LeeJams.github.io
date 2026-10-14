---
title: 담깅 · 플로깅 어시스턴트
summary: "실시간 이동 동선과 챌린지를 연결하는 플로깅 앱에서 팀 리더와 프론트엔드 개발을 맡았습니다."
group: personal
icon: /assets/img/projects/icons/damging-icon.png
category: 해커톤
organization: 팀 테크노마드 · 새싹톤
period: 2023.05 - 2023.06
order: 14
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
  - title: "새싹톤 서울경제진흥원장상 수상"
    detail: "팀 리더·프론트엔드 개발자로 약 한 달간 기획·개발·발표를 진행해 이동 동선·거리·챌린지를 연결하는 앱을 완성했습니다."
  - title: "위치·지도·iOS 센서 권한을 연결한 동작 구현"
    detail: "Geolocation·Kakao Maps로 경로를 표시하고, iOS 센서 권한 요청을 사용자 클릭 이후로 바꿔 동작 문제를 해결했습니다."
---

## 사용자가 지나온 동선을 지도에 표시

플로깅 중 지나온 경로를 실시간으로 보여주기 위해 위치 정보를 받아 지도에 선을 그리는 기능을 구현했습니다. 현재 위치 지도를 만들려면 먼저 권한과 최초 좌표가 필요했고, 이후 이동 좌표를 받는 과정과 구분해야 했습니다.

최초 좌표로 지도를 생성한 뒤, 누적 좌표를 **Kakao Maps Polyline으로 표시**했습니다. 위치를 사용할 수 없으면 안내하고, 경로 갱신용 주기 조회는 화면 정리 시 해제하도록 구현했습니다.

## iOS에서 자동 실행한 센서 권한 요청이 동작하지 않는 문제

플로깅 중 걸음수 측정을 시도하며 스마트폰의 센서 이벤트를 받아오려 했습니다. React의 `useEffect`에서 DeviceOrientationEvent 권한을 요청했지만 iOS에서 동작하지 않아 요청의 실행 시점을 확인했습니다.

화면 진입 시 자동 실행되는 요청을 **사용자의 버튼 클릭 이후**로 옮겼습니다. 사용자 동작 안에서 권한을 요청하고, 허용된 경우에만 센서 이벤트를 연결하도록 변경했습니다.
