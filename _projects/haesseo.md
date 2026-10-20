---
title: 했어
summary: "매일의 복약과 생활 루틴을 마친 소식이 가족에게 전해지도록 만든 완료 공유 앱입니다."
group: personal
icon: /assets/img/projects/icons/haesseo.svg
category: 앱
order: 9
role: "기획·디자인·iOS 앱/백엔드 개발·출시·운영"
team: 1인 개발
contribution: "100%"
problem_label: 만들게 된 이유
problem: "매일 약을 챙겨야 하는 생활에서, 완료 여부를 가족이 매번 묻지 않아도 알 수 있도록 만들고 싶었습니다. 갑상선 수술을 앞두고 아내와 어머니의 걱정을 덜고 싶었고, 저 역시 가족의 할 일을 매일 확인하곤 했습니다. 복약뿐 아니라 서로의 생활 속 할 일을 마친 소식을 필요한 사람에게 전하는 앱으로 기획했습니다."
solution: "할 일을 완료로 기록하면 선택한 사람에게 푸시로 소식을 전하고, 홈 화면 위젯에서도 바로 체크할 수 있게 했습니다. 공유 대상과 미완료 알림은 각자의 선택과 양쪽 동의 범위 안에서 설정하도록 구성했습니다."
tech: [Swift, SwiftUI, WidgetKit, App Intents, Supabase, APNs]
links:
  - label: 서비스 소개
    url: https://haesseo.inonoi.com/
  - label: App Store
    url: https://apps.apple.com/kr/app/id6812309606
---

## 제품에서 고려한 점

- **매일 쓰는 입력의 부담:** 반복 요일과 시간을 미리 정하고, 홈 화면 위젯에서도 공유 대상을 확인한 뒤 바로 완료를 기록할 수 있게 했습니다.
- **공유할 범위의 선택:** 가까운 사이라도 모든 할 일을 공유할 필요는 없으므로, 서로 수락한 뒤 연결하고 할 일마다 공유 대상을 고르도록 했습니다.
- **재촉이 되지 않는 알림:** 미완료 소식은 양쪽이 동의한 경우에만 보내며, 조용한 시간과 알림 일시 중지도 직접 설정하도록 했습니다.
