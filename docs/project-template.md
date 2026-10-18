---
title: 프로젝트 이름
summary: 누구의 어떤 문제를 해결한 프로젝트인지 한 문장으로 적습니다.
group: personal # 회사 프로젝트: company / 개인 프로젝트: personal
category: 웹
organization: 개인 프로젝트
period: 2026.01 - 2026.03
role: 설계·개발
order: 17
tech: [TypeScript, React]
highlight: 목록에서 보여줄 가장 중요한 성과 하나를 적습니다.
achievements:
  - title: 변경 전후의 결과 또는 확인 가능한 산출물을 적습니다.
    detail: 측정 범위·조건이나 검증 근거를 한 문장으로 적습니다.
links:
  - label: GitHub
    url: https://github.com/LeeJams
# 선택 사항: 개발 방식과 실제 기여도
# team: 1인 개발
# contribution: "100%"
# 선택 사항: 개인 앱 카드의 문제와 해결 방식. 둘 다 있으면 성과 요약 대신 표시합니다.
# problem: 누구의 어떤 불편에서 출발했는지 적습니다.
# solution: 그 불편을 어떤 사용 흐름이나 기능으로 풀었는지 적습니다.
# problem_label: 발견한 문제 # 실험 성격의 앱은 '시작한 이유' 등으로 변경 가능
# achievements_title: 운영하며 개선한 것 # 개인 앱의 기술 개선을 남길 때 사용
# 선택 사항: 상세는 유지하고 더보기 안에 배치합니다.
# more: true
# 선택 사항: 관련 블로그 글. 제목과 작성일은 글에서 자동으로 가져옵니다.
# related_posts:
#   - /cowork-automation-skills/
# 선택 사항: 프로젝트 이미지
# icon: /assets/img/projects/icons/my-project.png # 개인 프로젝트 목록 아이콘. 생략하면 기본 아이콘 표시
# cover: /assets/img/projects/my-project.png
# cover_alt: 프로젝트 화면 설명
# 선택 사항: 공개 전에는 아래 값을 사용합니다.
# published: false
---

`_projects/`에 파일을 추가하면 `/about/`의 카드, 클릭 시 열리는 상세 모달, 개별 프로젝트 페이지에 같은 내용이 자동으로 반영됩니다.
회사 프로젝트는 정렬 순서의 처음 6개를 먼저 표시하고 나머지는 더보기로 펼칩니다. `_apps/`의 추가 앱은 기본 카드로 표시하되 개인 프로젝트의 더보기로 펼치며, 앱 스토어 링크로 연결합니다.
`_projects/`에서 `more: true`를 지정하면 상세 모달과 개별 페이지를 유지하면서 더보기 안에 배치합니다.

개인 앱(`group: personal`, `category: 앱`)의 상세는 본문 → 운영 중 개선 → 제작 정보 순서로 보여줍니다. 회사 프로젝트는 주요 성과를 먼저 보여줍니다.

## 개인 앱 본문 작성

`만들게 된 이유`에는 실제로 겪거나 관찰한 상황과 해결하고 싶었던 불편을 두세 문장으로 적습니다. `어떻게 풀었나`에는 그 문제에 대응하는 제품 선택을 2~3개로 추립니다. 기술 설명은 선택의 이유를 뒷받침할 때만 넣습니다. 아직 측정하지 않은 효과를 성과로 단정하지 않습니다.

구성은 [토스의 제품 사례](https://toss.tech/article/only-3-users-product)와 [NN/g의 포트폴리오 가이드](https://www.nngroup.com/articles/ux-design-portfolios/)를 참고했습니다. 했어의 기능·공유 범위는 [공식 서비스 소개](https://haesseo.inonoi.com/), 듀티라운지의 기능은 [공식 App Store 설명](https://apps.apple.com/kr/app/id6742709529)과 대조했습니다. 두 앱을 만든 개인적인 배경은 작성자가 직접 제공한 경험을 바탕으로 정리했습니다.

했어 아이콘은 개발자가 제공한 앱 저장소의 `Design/Brand/haesseo-app-icon.svg` 원본을 복사해 사용합니다.

## 회사 프로젝트 본문 작성

- **구체적인 기술적 선택:** 대상 기능의 문제와 선택한 해결 방식을 두 문장 안팎으로 연결합니다. 기술 이름만 나열하거나 원인부터 말하지 않습니다.
- **지킨 조건과 검증:** 변경 과정에서 유지한 업무 규칙과 확인한 근거를 적습니다. 실제 시행착오와 예방 설계, 모의 테스트와 운영 측정을 구분합니다.

핵심 기여는 2~4개 정도로 추립니다. 굵은 제목은 실제 기여가 드러나는 이름으로 바꾸고, 상단 성과 수치나 소개를 반복하지 않습니다. 긴 구현 과정은 관련 블로그 글로 연결합니다. 확인하지 않은 장애·분석·성과는 만들지 않습니다.
