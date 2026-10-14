# LeeJam's Coding

Jekyll 기반 개발 블로그와 포트폴리오입니다.

```bash
bundle install
bundle exec jekyll serve
```

로컬 포트폴리오: <http://localhost:4000/about/>

## 프로젝트 추가

1. `docs/project-template.md`를 `_projects/my-project.md`로 복사합니다.
2. 파일 상단의 YAML 정보와 Markdown 본문을 수정합니다.
3. 빌드·배포하면 `/about/` 목록에 자동으로 표시되고 `/about/projects/my-project/` 상세 페이지가 생성됩니다. 목록이나 라우팅 파일을 따로 수정할 필요가 없습니다.

```bash
cp docs/project-template.md _projects/my-project.md
bundle exec jekyll build
```

- `title`: 프로젝트 이름
- `summary`: 목록과 상세 상단에 표시할 소개
- `group`: `company`는 회사 프로젝트, `personal`은 개인 프로젝트 영역에 표시됩니다. 생략하면 개인 프로젝트로 분류됩니다.
- `category`: 세부 분류. 개인 프로젝트에서는 새로운 값도 필터에 자동으로 추가됩니다.
- `order`: 각 영역의 목록 순서. 작은 숫자가 먼저 표시됩니다.
- `icon`: 개인 프로젝트 이름 앞에 표시할 아이콘 경로. 생략하면 기본 아이콘이 표시됩니다. 이미지 파일은 `assets/img/projects/icons/` 등에 추가합니다.
- `organization`, `period`, `role`, `tech`, `highlight`, `links`, `cover`, `cover_alt`: 선택 정보
- `links`: `label`과 `url` 목록. 외부 URL과 사이트 내부 경로를 사용할 수 있습니다.
- `achievements`: `title`과 `detail` 목록. 상세의 **주요 성과**에서 결과와 근거를 함께 표시합니다. `highlight`는 About 목록의 한 줄 요약이며, 상세에서는 `achievements`를 우선 표시합니다. 수치에는 측정 시점·범위·조건을 함께 적습니다.
- `related_posts`: 관련 블로그 글의 URL 목록. 상세의 **관련 문서** 영역에서 해당 글의 실제 제목·작성일·링크를 자동으로 표시합니다. 서비스·스토어 링크는 `links`에, 블로그 글은 `related_posts`에 작성합니다.
- `published: false`: 목록과 상세 페이지를 빌드에서 제외합니다. 공개할 때 삭제하거나 `true`로 바꿉니다.

파일명이 상세 URL이 되므로 영문 소문자와 하이픈을 권장합니다. 기존 파일명을 바꾸면 상세 URL도 바뀝니다. 이미지는 `assets/img/projects/` 등에 추가하고 `cover`에 경로를 적습니다.

상세 상단에는 한 문장 소개·담당 범위와 핵심 성과 2~3개를 적습니다. 목록의 `highlight`에는 가장 중요한 성과를 한 줄로 적으며 **주요 성과** 표시가 자동으로 붙습니다. 본문의 **핵심 기여**는 2~4개 항목으로 추려, 각 항목에서 문제·선택 이유·구현 또는 검증을 짧게 연결합니다. 상단 소개·성과를 반복하거나 기술 이름만 나열하지 않습니다. 실제 장애와 예방 설계, 모의 테스트와 운영 측정을 구분합니다. 긴 구현 과정은 본문 뒤의 **관련 문서**에서 실제 글 제목과 링크로 연결합니다.

`docs/`는 배포 대상에서 제외되므로 템플릿의 예시 내용은 사이트에 공개되지 않습니다. 프로젝트 파일은 블로그 글과 별도 컬렉션으로 관리해 홈·글 아카이브·RSS에 섞이지 않습니다.

## 프로필 수정

소개·경력·기술·자격증·수상·학력은 `_data/portfolio.yml`에서 수정합니다. 페이지 구조는 `about.md`, 상세 구조는 `_layouts/project.html`, 스타일은 `_sass/klise/_profile.scss`에 있습니다.

About 메뉴는 `/about/`을 사용합니다. 기존 `/thanks/` 링크는 `/about/`으로 이동합니다.
