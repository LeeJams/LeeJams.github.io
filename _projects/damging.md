---
title: 담깅 · 플로깅 어시스턴트
summary: "팀원 모집과 공동 목표 정리를 이끌고, 핵심 기능에 집중해 한 달 안에 플로깅 앱을 팀원들과 완성했습니다."
group: personal
icon: /assets/img/projects/icons/damging-icon.png
category: 해커톤
organization: 팀 테크노마드 · 새싹톤
period: 2023.05 - 2023.06
order: 15
highlight: "2023 새싹톤 서울경제진흥원장상 (장려)"
role: "팀 리더·프론트엔드 개발"
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
    detail: "팀 구성과 목표 정렬을 맡고, 핵심 기능이 동작하는 서비스를 한 달 안에 팀원들과 완성해 수상에 기여했습니다."
  - title: "이동 경로 표시와 iOS 권한 문제 해결"
    detail: "경로 표시를 구현하고 센서 이벤트의 권한 요청을 수정했습니다."
---

## 핵심 기여

- **팀 구성·공동 목표 정렬:** 팀원을 모집해 해커톤에 참여하고, 아이디어 논의에서 해결할 문제와 서비스 방향을 공유했습니다. 서로의 의견을 개방적으로 논의하며 공동 목표를 맞췄습니다.
- **핵심 기능 중심의 서비스 완성:** 전체 서비스의 완성도를 우선으로 두고 핵심 기능 개발에 집중하도록 팀의 개발 방향을 맞췄습니다. 프론트엔드 구현을 맡아 한 달 안에 팀원들과 담깅을 완성했습니다.
- **이동 경로 표시:** 위치 권한 → 최초 좌표 → 지도 생성 → 이동 좌표 누적 순서로 구성하고 Kakao Maps Polyline으로 경로를 표시했습니다. 위치 실패를 안내하고 화면 정리 시 주기 조회를 해제했습니다.
- **iOS 센서 권한:** 걸음수 측정 시도 중 `useEffect`의 자동 권한 요청이 동작하지 않았습니다. 사용자 동작 조건을 확인해 버튼 클릭에서 요청하고, 허용된 경우에만 이벤트를 연결하도록 수정했습니다.
