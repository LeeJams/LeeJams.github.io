---
layout: post
title: "Gemini File Search로 간편하게 RAG 구현하기"
tags: [AI, RAG, DEVELOPER, GEMINI, FILE_SEARCH, GEMINI_API]
category: ["AI"]
---

**RAG(Retrieval-Augmented Generation)** 를 구현하려면 벡터 DB를 구축하고, 임베딩 모델을 선택하고, 청킹 전략을 수립하는 등 복잡한 과정을 거쳐야 했습니다. 그런데 구글의 **Gemini File Search**를 사용하면 이러한 과정을 API 호출 몇 번으로 간단하게 처리할 수 있습니다.

## RAG 구축의 어려움

기존에 RAG를 구축하려면 많은 작업이 필요했습니다:

- **벡터 DB 설정 및 운영** (Pinecone, Weaviate 등)
- **임베딩 파이프라인 구축 및 관리**
- **인덱스 최적화**
- **많은 시간과 비용**

Gemini File Search는 이러한 복잡한 과정을 내부적으로 처리해줍니다. 파일을 업로드하면 자동으로 **청크로 나누고, 벡터화하고, 인덱싱**합니다. 덕분에 개발자는 인프라 구축보다는 **비즈니스 로직 구현에 집중**할 수 있습니다.

## 의미 기반 검색

File Search는 **단순한 키워드 매칭이 아닌 의미 기반 검색**을 제공합니다. 예를 들어 **"재생 에너지 비용"** 이라고 검색하면, 문서에 해당 단어가 직접 포함되어 있지 않더라도 **"태양광 패널 가격 하락"** 과 같이 의미상 유사한 내용을 찾아냅니다.

**의미 기반 검색이 가능한 이유:**

- 모든 텍스트가 **고차원 벡터 공간의 점**으로 변환됨
- 의미가 비슷한 텍스트는 **벡터 공간에서 가까이 위치**
- 검색 시 **쿼리와 가장 가까운 벡터**를 찾아 관련 내용을 반환

## 간단한 사용 방법

실제 코드로 살펴보겠습니다:

```python
from google import genai
from google.genai import types
import time

client = genai.Client()

# Store 만들고
file_search_store = client.file_search_stores.create(
    config={'display_name': 'my-knowledge-base'}
)

# 파일 던지고
operation = client.file_search_stores.upload_to_file_search_store(
    file='company_docs.pdf',
    file_search_store_name=file_search_store.name,
    config={'display_name': 'Q4-strategy'}
)

# 처리 대기
while not operation.done:
    time.sleep(5)
    operation = client.operations.get(operation)

# 질문하면 끝
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Q4 전략의 핵심은?",
    config=types.GenerateContentConfig(
        tools=[file_search=(
            file_search_store_names=[file_search_store.name]
        )]
    )
)
```

정말 간단합니다. **벡터 DB 설정, 임베딩 모델 학습, 복잡한 설정 파일이 모두 필요 없습니다.**

## 메타데이터를 활용한 필터링

문서가 많을 때는 메타데이터를 활용하여 원하는 문서만 정확하게 검색할 수 있습니다:

```python
# 파일에 태그 달기
op = client.file_search_stores.import_file(
    file_search_store_name=file_search_store.name,
    file_name=sample_file.name,
    custom_metadata=[
        {"key": "department", "string_value": "engineering"},
        {"key": "year", "numeric_value": 2024},
        {"key": "confidential", "string_value": "false"}
    ]
)

# 정확히 필터링해서 검색
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="2024년 엔지니어링팀 성과는?",
    config=types.GenerateContentConfig(
        tools=[types.Tool(
            file_search=types.FileSearch(
                file_search_store_names=[file_search_store.name],
                metadata_filter="department=engineering AND year=2024"
            )
        )]
    )
)
```

## 인용 정보 제공

File Search는 답변과 함께 출처 정보를 제공합니다. 어느 문서의 어느 부분에서 정보를 가져왔는지 정확히 확인할 수 있습니다.

```python
print(response.candidates[0].grounding_metadata)
```

> 기업 환경에서는 AI 답변의 신뢰성이 매우 중요합니다. 단순히 "AI가 이렇게 답했다"가 아니라, **구체적인 출처를 제시**할 수 있어야 합니다.

## 청킹 전략 커스터마이징

기본 설정이 맞지 않는다면 청킹 전략을 직접 설정할 수도 있습니다:

```python
operation = client.file_search_stores.upload_to_file_search_store(
    file='technical_doc.pdf',
    file_search_store_name=file_search_store.name,
    config={
        'chunking_config': {
            'white_space_config': {
                'max_tokens_per_chunk': 200,  # 청크 크기
                'max_overlap_tokens': 20       # 중복 토큰
            }
        }
    }
)
```

문서의 특성에 따라 청크 크기를 조절할 수 있습니다:

- **기술 문서**: 작은 청크로 설정
- **긴 글/스토리**: 큰 청크로 설정

## 합리적인 가격 정책

**비용 구조:**

- **인덱싱 비용**: 100만 토큰당 $0.15
- **저장 비용**: 무료
- **검색 시 임베딩 비용**: 무료

> 벡터 DB 인스턴스를 24시간 운영할 필요가 없어 고정 비용 부담이 없습니다. 트래픽이 없으면 비용도 발생하지 않는 **완전한 서버리스 모델**입니다.

**저장 용량:**

| 티어      | 용량  |
| --------- | ----- |
| 무료 티어 | 1GB   |
| Tier 1    | 10GB  |
| Tier 2    | 100GB |
| Tier 3    | 1TB   |

## 알아두어야 할 제약사항

물론 제약사항도 있습니다:

- **파일당 최대 100MB**
- **각 Store는 20GB 미만** 권장

**대규모 엔터프라이즈라면?**

File Search는 **"파일 기반 대화형 검색"** 에 최적화되어 있습니다. 다음과 같은 경우에는 **Vertex AI Search**를 고려하는 것이 좋습니다:

- 전사적 지식 검색 시스템 구축
- 세밀한 권한 제어가 필요한 경우
- 대용량 데이터 처리가 필요한 경우

## Store 관리 방법

```python
# 새 Store 만들기
store = client.file_search_stores.create(
    config={'display_name': 'customer-support-kb'}
)

# 전체 목록 보기
for s in client.file_search_stores.list():
    print(s)

# 필요없으면 삭제
client.file_search_stores.delete(
    name='fileSearchStores/old-store',
    config={'force': True}
)
```

여러 개의 Store를 만들어 **부서별, 프로젝트별로 지식을 분리**하여 관리할 수 있습니다.

## 마치며

Gemini File Search를 사용하면 **RAG 시스템을 훨씬 쉽게 구축**할 수 있습니다. 예전에는 대기업이나 큰 리소스를 가진 팀에서만 가능했던 일이지만, 이제는 **스타트업이나 개인 개발자도 고성능 지식 검색 시스템**을 만들 수 있게 되었습니다.

**주요 장점 정리:**

- ✅ 벡터 DB 운영 불필요
- ✅ 복잡한 설정 제거
- ✅ 서버리스 비용 구조
- ✅ 의미 기반 검색
- ✅ 영구 저장소 제공
- ✅ 인용 정보 제공

> 벡터 DB를 직접 운영하고 관리하는 데 시간을 쓰기보다는, 인프라는 구글에 맡기고 실제로 사용자에게 필요한 기능을 개발하는 데 집중할 수 있다는 점이 큰 장점이라고 생각합니다.

RAG 시스템 구축을 고려하고 계신다면 Gemini File Search를 한번 사용해보시는 것을 추천드립니다.

피드백은 언제나 환영입니다. 😊
