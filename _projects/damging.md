---
title: 담깅 · 플로깅 어시스턴트
summary: 도시환경과 건강증진을 주제로, 실시간 동선·이동 거리와 챌린지를 연결하는 플로깅 앱을 만들었습니다.
group: personal
category: 해커톤
organization: 팀 테크노마드 · 새싹톤
period: 2023.05 - 2023.06
order: 14
highlight: 2023 새싹톤 서울경제진흥원장상 (장려)
role: 팀 리더·기획/우선순위 조율·프론트엔드·발표
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
- title: 팀 리더·프론트엔드로 새싹톤 서울경제진흥원장상 수상
  detail: 약 한 달의 기획·개발·발표 일정에서 팀의 공동 목표와 기능 우선순위를 맞추고 작동하는 플로깅 서비스를 완성했습니다.
- title: 위치·지도·센서 권한을 실제 사용자 흐름으로 연결
  detail: Geolocation과 Kakao Maps로 이동 동선을 표시하고, iOS 센서 권한 요청을 사용자 클릭 후 실행하도록 문제를 해결했습니다.
    구현 과정을 관련 문서로 공개했습니다.
---

## 위치 권한 확인과 지도 갱신 순서 연결하기

사용자의 위치를 얻기 전에 지도를 현재 좌표 중심으로 만들 수 없었고, 위치 사용을 거부한 경우도 처리해야 했습니다. 최초 지도 생성과 이후 경로 갱신을 같은 작업으로 섞지 않도록 했습니다.

Geolocation 권한을 확인하고 최초 좌표로 지도를 만든 뒤, 좌표를 누적해 Kakao Maps Polyline으로 동선을 표시했습니다. 위치를 사용할 수 없으면 안내하고, 지도 생성 이후의 주기적 조회는 화면 정리 시 해제하도록 구현했습니다.

## iOS 센서 권한 요청의 실행 시점 바꾸기

DeviceOrientationEvent 권한을 useEffect에서 요청했을 때 iOS에서 동작하지 않았습니다. 화면 진입과 사용자 동작에 따른 권한 요청을 구분해야 했습니다.

버튼 클릭 이후 권한을 요청하고 허용된 경우 센서 이벤트를 연결하도록 변경했습니다. 플랫폼별 권한 조건이 기능의 호출 순서에 미치는 영향을 확인하고 구현 과정을 기록했습니다.
