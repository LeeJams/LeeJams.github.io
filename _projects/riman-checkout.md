---
title: 소비자몰 주문·결제
summary: "소비자몰 주문·결제를 개발하고, 화면·상태를 기능별로 분리해 수정 범위를 좁혔습니다."
group: company
icon: /assets/img/projects/logos/riman.png
category: 업무
organization: 리만코리아 · 엔더스
period: 2022.05 - 2022.10
role: 주문·결제 프론트엔드 설계·개발
problem: "큰 결제 파일에 여러 기능이 섞여, 수정할 때 연관 코드를 넓게 추적해야 했습니다."
solution: "화면 컴포넌트와 Pinia 상태를 주문·상품·가격 계산·결제 기능별로 함께 분리했습니다."
order: 6
tech:
- Vue 3
- TypeScript
- Pinia
- PayTag
highlight: "약 4,000줄 결제 파일 → 기능별 300줄 이내 컴포넌트"
links:
- label: 서비스
  url: https://kr.riman.com/
achievements:
  - title: "약 4,000줄 결제 파일을 기능별 300줄 이내로 분리"
    detail: "화면과 Pinia 상태를 같은 기능 경계로 나눠 수정 위치를 명확히 했습니다."
  - title: "신용카드·간편결제 주문 흐름 구현"
    detail: "PayTag로 신용카드·카카오페이·페이코를 연동했습니다."
---

## 핵심 기여

- **책임별 화면 분리:** 가격 계산·결제 수단을 수정할 때 넓게 추적해야 하던 주문서를 주문 정보·상품·가격 계산·결제 컴포넌트로 나눠 수정 위치를 명확히 했습니다.
- **공유 상태 모듈화:** 화면을 나눠도 공유 상태의 결합이 남지 않도록 Pinia 스토어를 같은 기능 경계로 분리했습니다.
