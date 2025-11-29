---
layout: post
title: "Gemini File Search 관리 도구 개발기"
tags: [AI, RAG, DEVELOPER, GEMINI, FILE_SEARCH, GEMINI_API, NEXTJS, TYPESCRIPT]
category: ["AI"]
---

2025년 KPI로 내부 문서 검색 시스템 개발을 목표로 정하고, RAG(Retrieval-Augmented Generation)를 공부하던 중 Google의 **File Search**를 발견했습니다. 여러 솔루션을 비교해본 결과 Gemini File Search가 우리 회사에 가장 적합하다고 판단해 도입을 결정했습니다.

회사 업무를 위해 만들긴 했지만, 어차피 만드는 거 많은 사람들이 편하게 사용할 수 있으면 좋겠다는 마음으로 **오픈소스 도구**로 개발하기로 결정했습니다. 그렇게 시작된 것이 **Gemini API File Search** 프로젝트입니다.

---

## 프로젝트 기획 배경

### 왜 만들었나?

File Search 를 사용해보니 몇 가지 불편한 점이 있었습니다:

1. **관리 도구가 없음**: 문서를 업로드하거나 쿼리를 테스트하려면 직접 개발을 해야 했습니다.
2. **비개발자는 사용 불가**: 팀원들이 직접 테스트해보고 싶어도 코딩 없이는 불가능했습니다.
3. **상태 파악이 어려움**: 어떤 문서가 업로드되어 있는지, Store가 몇 개나 있는지 확인하기가 번거로웠습니다.

### 핵심 설계 원칙

프로젝트를 시작하면서 세 가지 핵심 원칙을 정했습니다:

<h5>1. 프라이버시 우선 (Privacy-First)</h5>

가장 중요하게 생각한 부분입니다. 오픈소스 프로젝트이기 때문에 사용자의 **API 키와 문서는 절대 서버에 저장되지 않아야 한다**고 판단했습니다.

<h5>2. 직관적인 사용성</h5>

개발자가 아닌 사람도 쉽게 사용할 수 있어야 했습니다. 드래그 앤 드롭, 명확한 버튼, 실시간 피드백 등 UX에 많은 신경을 썼습니다.

<h5>3. 다국어 지원</h5>

글로벌 서비스를 고려하여 처음부터 한국어, 영어, 중국어, 일본어를 지원하기로 했습니다. <br>~~AI가 다국어를 잘 해서 도움을 많이 받았습니다..~~

## 핵심 기능 구현

### 1. Store 관리 시스템

Gemini API에서는 "Store"라는 개념으로 문서 그룹을 관리합니다. 프로젝트당 최대 10개의 Store를 생성할 수 있으며, 각 Store는 독립적인 문서 컬렉션으로 동작합니다.

**제약사항**:

- 프로젝트당 최대 10개 Store
- Store 이름은 생성 후 변경 불가

### 2. 문서 업로드 시스템

파일 업로드는 직관적인 드래그 앤 드롭 방식과 파일 선택 버튼을 제공합니다.

**지원 파일 형식**:

- 문서: `.md`, `.txt`, `.pdf`, `.html`
- Office: `.doc`, `.docx`, `.xls`, `.xlsx`
- 데이터: `.csv`, `.json`

**업로드 제약**:

- 파일당 최대 50MB
- 한 번에 최대 10개 파일

### 3. 문서 관리

**Document Management 기능**:

- 업로드된 모든 문서 목록 조회
- 파일 크기, 업로드 날짜, 메타데이터 확인
- 개별 문서 삭제

이를 통해 Store 내 문서를 체계적으로 관리할 수 있습니다.

### 4. RAG 기반 쿼리 시스템

업로드된 문서를 대상으로 AI 검색을 수행하는 핵심 기능입니다.

**Query Workspace 기능**:

- 자연어 질문 입력
- Gemini AI가 문서에서 관련 정보 검색
- 출처(citation)와 함께 답변 생성
- 쿼리 히스토리 사이드바에서 관리

**메타데이터 필터** (선택사항):

- 특정 문서나 조건으로 검색 범위 제한
- 더 정확한 결과 도출

**고급 설정**:

- 시스템 지시사항 설정
- Temperature 조절
- Top P 조절
- Top K 조절
- Max Output Tokens 조절

## 사용 시작하기

### 1. API 키 발급

[Google AI Studio](https://aistudio.google.com/apikey){:target="\_blank"}에서 무료로 API 키를 발급받습니다.

### 2. 첫 방문

프로젝트에 처음 접속하면 API 키 입력 모달이 표시됩니다. 발급받은 키를 입력하면 브라우저에만 안전하게 저장됩니다.

### 3. Store 생성

"새 스토어 추가" 버튼을 클릭하고 고유한 이름을 입력하여 Store를 생성합니다.

### 4. 문서 업로드

Store 카드에서 "문서 관리"를 클릭하고 파일을 업로드합니다.

### 5. 질문하기

"쿼리 워크스페이스"에서 업로드한 문서에 대해 자연어로 질문합니다.

## 트러블슈팅

### API 키 오류

- API 키가 `AIza`로 시작하는지 확인
- [Google AI Studio](https://aistudio.google.com/apikey){:target="\_blank"}에서 키 활성화 상태 확인
- 브라우저 캐시 삭제 후 키 재입력

### 업로드 실패

- 파일 크기 50MB 이하인지 확인
- 지원되는 파일 형식인지 확인
- 한 번에 10개 이하 파일로 제한

### 캐시 초기화

브라우저 콘솔에서 다음 명령 실행:

```javascript
localStorage.clear();
```

## 마치며

이 프로젝트는 회사의 KPI를 달성하기 위해 시작했지만, 오픈소스로 공개하면서 더 많은 사람들에게 도움이 되길 바라는 마음으로 발전시켰습니다.

앞으로도 지속적으로 개선하고 새로운 기능을 추가하여 더 나은 도구로 만들어갈 계획입니다. 관심 있으신 분들의 피드백과 기여를 환영합니다!

---

### 프로젝트 링크

- 🚀 [Live Demo](https://gemini-api-file-search.vercel.app/){:target="\_blank"}
- 📦 [GitHub Repository](https://github.com/LeeJams/Gemini-API-File-Search){:target="\_blank"}
- 📖 [Gemini API Documentation](https://ai.google.dev/docs){:target="\_blank"}

---

피드백은 언제나 환영합니다! 😊
