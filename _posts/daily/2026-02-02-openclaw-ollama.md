---
layout: post
title: "Ollama로 OpenClaw 로컬 AI 모델 연동하기"
tags: [openclaw, ollama, 로컬 LLM, AI 에이전트, qwen3-coder, glm-4.7]
category: ["DAILY"]
---

## 도입

[지난 글 (openclaw 설치 그리고 X(트위터) 권한 위임 후기)](/daily/openclaw/)에서는 OpenClaw 설치와 기본 세팅, 텔레그램 연동, 그리고 X(트위터) 권한 위임까지 다뤘다.  
그때는 Google Gemini를 기본 LLM으로 사용했는데, 클라우드 API를 쓰다 보니 사용량 제한이나 비용이 신경 쓰일 수 있다.

그래서 이번에는 **Ollama**를 활용해서 완전히 로컬에서 돌아가는 AI 모델을 OpenClaw에 연동하는 방법을 정리해보려 한다.  
내 데이터가 외부로 나가지 않으니 프라이버시 측면에서도 낫고, 일단 세팅해두면 무제한으로 쓸 수 있다는 점이 매력적이다.

---

## 목차

1. [Ollama란?](#ollama란)
2. [Ollama 설치하기](#ollama-설치하기)
3. [메모리별 추천 모델](#메모리별-추천-모델)
4. [OpenClaw와 Ollama 연동](#openclaw와-ollama-연동)
5. [참고](#참고)

---

## Ollama란?

Ollama는 로컬에서 LLM을 쉽게 실행할 수 있게 해주는 도구다.  
Docker처럼 모델을 pull 받아서 바로 실행할 수 있고, REST API도 제공해서 다른 애플리케이션과 연동하기도 편하다.

특히 M1/M2/M3 맥에서는 Metal GPU 가속을 지원해서, 생각보다 괜찮은 성능으로 돌릴 수 있다.

---

## Ollama 설치하기

### 신규 설치

[Ollama 공식 사이트](https://ollama.com/download)에서 macOS, Windows, Linux용 설치 파일을 받을 수 있다.

맥에서는 다운로드 후 앱을 Applications 폴더로 옮기고 실행하면 끝이다.  
터미널에서 `ollama` 명령어가 인식되면 설치 완료.

### 이미 설치되어 있다면?

**Ollama가 이미 설치되어 있다면 최신 버전으로 업데이트하는 것을 권장합니다.** OpenClaw 연동에 필요한 `ollama launch openclaw` 명령어가 최근에 추가되었기 때문입니다.

```bash
# macOS - Ollama 앱에서 Check for Updates
# 또는 홈페이지에서 최신 버전 다운로드 후 덮어쓰기

# 버전 확인
ollama --version
```

### 모델 다운로드 및 실행

설치가 끝나면 모델을 받아서 바로 테스트해볼 수 있다.

```bash
# 모델 다운로드
ollama pull gemma3

# 대화 모드로 실행
ollama run gemma3
```

`ollama run` 명령어를 치면 터미널에서 바로 모델과 대화할 수 있다.  
처음 실행할 때 모델을 자동으로 다운로드하니까, `pull`을 따로 안 해도 된다.

---

## 메모리별 추천 모델

Ollama에서 사용할 수 있는 모델은 정말 많은데, 문제는 내 맥의 메모리(RAM/VRAM)에 따라 돌릴 수 있는 모델이 제한된다는 점이다.  
OpenClaw는 **최소 64K 토큰의 컨텍스트 윈도우**를 권장하니까, 이걸 감안해서 모델을 선택해야 한다.

아래 추천은 대략적인 가이드이고, 실제로는 다른 프로세스 사용량이나 모델 양자화 여부에 따라 달라질 수 있습니다.

### 8GB RAM (M1 MacBook Air 등)

솔직히 8GB에서 OpenClaw용 모델을 돌리기는 빠듯하다.  
가벼운 모델로 테스트는 가능하지만, 실사용에는 무리가 있을 수 있다.

```bash
ollama pull gemma3:4b
```

### 16GB RAM (M1/M2 MacBook Pro, Mac mini 등)

이 정도면 어느 정도 쓸만한 모델을 돌릴 수 있다.

```bash
# OpenClaw 추천 모델
ollama pull qwen3-coder
ollama pull glm-4.7
```

### 32GB+ RAM

여유가 있다면 더 큰 모델을 돌릴 수 있다.

```bash
# 더 큰 파라미터 모델
ollama pull gpt-oss:20b

# 코딩 특화 (23GB VRAM 권장)
ollama pull glm-4.7-flash
```

### 클라우드 모델

로컬 리소스가 부족하다면 Ollama에서 제공하는 클라우드 모델도 옵션이다.

```bash
ollama pull glm-4.7:cloud
```

[Ollama 클라우드 모델 목록](https://ollama.com/search?c=cloud)에서 사용 가능한 모델을 확인할 수 있다.

---

## OpenClaw와 Ollama 연동

OpenClaw 기본 설치와 세팅은 [이전 글](/daily/openclaw/)을 참고하면 된다.  
여기서는 Ollama 연동 부분만 다룬다.

### 빠른 설정

Ollama가 설치되어 있다면, 한 줄로 OpenClaw와 연동할 수 있다.

```bash
ollama launch openclaw
```

이 명령어를 실행하면 OpenClaw가 Ollama를 사용하도록 자동 설정되고, 게이트웨이가 시작된다.  
이미 게이트웨이가 실행 중이라면 자동으로 변경사항을 반영한다.

> 예전에는 `ollama launch clawdbot`이라는 명령어를 사용했는데, 지금도 별칭으로 동작한다.

### 설정만 하고 바로 실행하지 않으려면

```bash
ollama launch openclaw --config
```

이렇게 하면 설정만 저장하고, 게이트웨이는 나중에 따로 실행할 수 있다.

### 특정 모델 지정해서 실행

기본 모델이 아닌 다른 모델을 사용하고 싶다면:

```bash
ollama launch openclaw --model qwen3-coder
```

---

## 참고

- [Ollama Quickstart](https://docs.ollama.com/quickstart)
- [Ollama + OpenClaw 연동 문서](https://docs.ollama.com/integrations/openclaw)
- [OpenClaw 기본 설치 및 세팅 (이전 글)](/daily/openclaw/)

로컬 LLM의 장점은 한 번 세팅해두면 비용 걱정 없이 마음껏 쓸 수 있다는 점이다.  
물론 클라우드 모델(Gemini, Claude 등)에 비하면 성능 차이가 있을 수 있지만, 간단한 작업이나 프라이버시가 중요한 경우에는 충분히 좋은 선택이다.

다음에는 실제로 Ollama 모델로 OpenClaw를 운영하면서 느낀 점들을 정리해볼 예정입니다.

피드백은 언제나 환영입니다. 😊
