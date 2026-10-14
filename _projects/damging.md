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

## 플로깅 활동을 이동 경로와 챌린지로 연결

담깅은 걸으며 쓰레기를 줍는 플로깅 활동을 이동 동선·거리·챌린지로 연결한 해커톤 앱입니다. 프론트엔드에서는 사용자가 지나온 경로를 실시간으로 보여주기 위해 위치 정보와 지도 갱신의 순서를 맞춰야 했습니다.

**위치 권한 확인 → 최초 좌표 획득 → 지도 생성 → 이동 좌표 누적**으로 흐름을 구성하고, 누적 경로를 Kakao Maps Polyline으로 표시했습니다. 위치를 사용할 수 없으면 안내하고, 주기 조회는 화면 정리 시 해제하도록 구현했습니다.

## iOS에서 센서 권한 요청이 동작하지 않은 문제

지도 기능과 함께 걸음수 측정을 시도하며 스마트폰의 센서 이벤트를 받아오려 했습니다. React의 `useEffect`에서 DeviceOrientationEvent 권한을 요청했지만 iOS에서 동작하지 않았습니다.

권한 요청에 사용자 동작이 필요하다는 조건을 확인하고, 실행 시점을 **화면 진입에서 버튼 클릭으로 변경**했습니다. 클릭 안에서 권한을 요청하고 허용된 경우에만 이벤트를 연결해, 센서 이벤트를 받지 못하던 문제를 해결했습니다.

## 팀 결과물 구현과 해커톤 발표

팀 리더·프론트엔드 개발자로 약 한 달간 기획·개발·발표를 맡았습니다. 위치·지도·센서 권한의 동작을 맞추며 이동 동선·거리·챌린지를 연결하는 앱을 완성했고, 팀은 **2023 새싹톤 서울경제진흥원장상(장려)**을 받았습니다.
