---
layout: post
title: "[React/Next.js] Presentation / Container 패턴"
tags: [React, Next.js, Presentation, Container, Component]
category: ["REACT"]
---

## 1. 개념 설명

**Presentation / Container 패턴**은 애플리케이션에서 비즈니스 로직과 UI 렌더링을 분리하기 위한 패턴입니다. Presentation 컴포넌트와 Container 컴포넌트로 책임을 분리하여 관심사의 분리를 통해 코드의 가독성·유지보수성·테스트 용이성을 높입니다.

또한, 최근에는 Container 역할을 **커스텀 훅(Custom Hook)** 으로 추출해 Presentation 컴포넌트에서 직접 호출하는 방식도 자주 사용됩니다. 이 방법을 통해 별도의 Container 컴포넌트를 만들지 않아도 비즈니스 로직이 훅 내부에 깔끔히 캡슐화되고, Presentation 컴포넌트는 순수하게 뷰 역할만 수행하게 되어 **로직 재사용성**과 **테스트 용이성**이 더욱 향상됩니다.

### Presentation 컴포넌트

**역할**

- UI 렌더링만 담당합니다. “어떻게 보여줄 것인가”에 집중하여, 마크업과 스타일 정의에만 관여합니다.

**제약**

- **직접적인 데이터 페칭 훅**(`useQuery`, `useMutation`, `useEffect`를 이용한 API 호출 등) 사용은 피합니다.
- **로직이 캡슐화된 커스텀 훅**(`useUser`, `useImages` 등)을 호출하여 데이터를 가져오는 것은 허용합니다.
  - 이 커스텀 훅은 순수하게 “비즈니스 로직 → 반환 값” 역할만 하도록 설계되어야 합니다.
- 모든 **데이터**와 **이벤트 핸들러**는 props를 통해 전달받습니다.

**장점**

- **순수 함수형 컴포넌트**처럼 동작 → props만으로 렌더 결과가 결정되며, 테스트 작성이 간단합니다.
- 프로젝트 내에서 재사용성이 용이합니다.

---

### Container 컴포넌트

**역할**

- 비즈니스 로직, 데이터 페칭, 상태 관리에 집중합니다. “무엇을, 언제 가져올 것인가”를 책임집니다.

**주요 책임**

- **데이터 페칭** (`useQuery({ queryKey, queryFn, ... })`)
- **폼 상태**, **로딩·에러 처리**
- Presentation 컴포넌트에 **최소한의 props**(데이터·콜백)만 주입합니다.

**장점**

- 로직이 변경되더라도 Presentation 컴포넌트에는 전혀 영향이 없습니다.
- 상태 흐름과 비동기 처리 로직을 한곳에 집중 관리할 수 있어 **유지보수**와 **디버깅**이 쉽습니다.

> **참고**
>
> 전통적 Container/Presentation 패턴 대신, **커스텀 훅 + Presentation 컴포넌트** 조합으로 Container 역할을 대체하기도 합니다.

---

## 2. 코드 예제

### 2.1 커스텀 훅: `useProfile.ts`

```ts
// src/hooks/useProfile.ts
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../api/profile";

export interface Profile {
  id: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
}

export function useProfile(userId: string) {
  return useQuery<Profile>({
    queryKey: ["profile", userId],
    queryFn: () => fetchProfile(userId),
  });
}
```

### 2.2 Presentation 컴포넌트: `ProfileCard.tsx`

```tsx
// src/components/ProfileCard/ProfileCard.props.ts
export interface ProfileCardProps {
  displayName: string;
  avatarUrl: string;
  bio: string;
  onRefresh: () => void;
}

// src/components/ProfileCard/ProfileCard.tsx
import React from "react";
import { ProfileCardProps } from "./ProfileCard.props";

export const ProfileCard = ({
  displayName,
  avatarUrl,
  bio,
  onRefresh,
}: ProfileCardProps) => (
  <div className="profile-card">
    <img
      src={avatarUrl}
      alt={`${displayName} avatar`}
      className="profile-card__avatar"
    />
    <h2>{displayName}</h2>
    <p>{bio}</p>
    <button onClick={onRefresh} className="profile-card__refresh-button">
      새로고침
    </button>
  </div>
);
```

### 2.3 Container 컴포넌트: `ProfilePage.tsx`

```tsx
// src/containers/ProfilePage.tsx
import React from "react";
import { useProfile } from "../hooks/useProfile";
import { ProfileCard } from "../components/ProfileCard/ProfileCard";

interface Props {
  userId: string;
}

export const ProfilePage = ({ userId }: Props) => {
  const { data, isLoading, isError, refetch } = useProfile(userId);

  if (isLoading) {
    return <div>프로필을 불러오는 중입니다…</div>;
  }

  if (isError || !data) {
    return (
      <div>
        오류가 발생했습니다.
        <button onClick={() => refetch()}>다시 시도</button>
      </div>
    );
  }

  return (
    <ProfileCard
      displayName={data.displayName}
      avatarUrl={data.avatarUrl}
      bio={data.bio}
      onRefresh={() => refetch()}
    />
  );
};
```

### 2.4 정리

1. **`useProfile`** 훅이 API 호출 로직을 담당합니다.
2. **`ProfileCard`** (Presentation 컴포넌트)는 props로 받은 데이터와 이벤트 핸들러만으로 UI를 구성하는 순수 뷰 컴포넌트입니다.
3. **`ProfilePage`** (Container 컴포넌트)는 훅에서 반환된 상태를 검사 후, Presentation 컴포넌트에 필요한 값과 콜백만 전달합니다.

## 3. 장단점 분석

| 분류                 | 장점                                                                                                                                   | 단점                                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **관심사 분리**      | - 비즈니스 로직(훅)과 UI(컴포넌트)가 명확히 분리되어 가독성과 유지보수성 크게 향상<br/>- 로직 변경 시 뷰에 최소한의 영향만 발생        | - 로직이 훅으로 분산되어 있어, 프로젝트 초반에는 구조 파악과 학습에 시간이 소요될 수 있음                               |
| **재사용성**         | - `useProfile` 같은 커스텀 훅은 여러 컴포넌트에서 반복 사용 가능<br/>- Presentation 컴포넌트는 props 기반으로 여러 곳에서 활용 용이    | - 커스텀 훅이 특정 도메인 로직에 강하게 결합되면, 다른 컨텍스트에서 재사용하려면 훅을 별도로 복제·수정해야 할 수도 있음 |
| **테스트 용이성**    | - Presentation은 props 주입만으로 단위 테스트·스냅샷 테스트가 간단<br/>- 커스텀 훅은 `react-query` 모킹을 통해 로직만 집중 테스트 가능 | - 훅 테스트 시 `react-query` 모킹, 비동기 동작 제어 등이 필요해 테스트 코드 작성이 다소 복잡해질 수 있음                |
| **폴더 구조·복잡도** | - Container 파일 없이도 커스텀 훅 하나로 로직을 관리하면 폴더 구조가 단순                                                              | - Presentation, 훅, API 호출 함수 등 파일 수가 늘어나 관리해야 할 모듈이 많아질 수 있음                                 |

## 4. 결론

초기 설계 시에는 훅과 컴포넌트 책임 경계를 명확히 정의해야 하며, 파일이 다소 분산되는 구조적 부담이 있을 수 있습니다만 프로젝트가 커질수록 이 패턴의 장점이 더욱 더 빛을 발하게 됩니다.

- **프로젝트 초기에 팀 내 가이드 문서를 마련**하여, “어떤 로직은 훅에 담고, 어떤 UI 상태만 컴포넌트에서 다룰지” 명확히 규정해 두세요.
- 하지만 **작은 화면 단위**(예: 간단한 버튼 모듈)에는 과도한 컴포넌트·훅 분리가 오히려 복잡도를 높일 수 있으므로, 상황에 맞게 유연하게 적용하면 더 좋습니다.

Presentation/Container 패턴의 핵심과, 커스텀 훅을 활용한 최신 흐름을 정리해 보았습니다.

---

## 5. 참고자료

- [Container/Presentational Pattern - Patterns.dev](https://www.patterns.dev/react/presentational-container-pattern/)
- [Presentational and Container Components - Dan Abramov](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- [Presentational and Container Pattern - velog](https://velog.io/@peacesong/Presentational-and-Container-Pattern)
- [Understanding the Container/Presentational Pattern in React - Dev.to](https://dev.to/bholu_tiwari/understanding-the-containerpresentational-pattern-in-react-56cj)
- [Container-presentational pattern in React – why and how to use - TSH.io](https://tsh.io/blog/container-presentational-pattern-in-react/)
- [React Pattern — Container/Presentational Pattern - Medium by Amber Fung](https://medium.com/@amberfung/react-pattern-container-presentational-pattern-5d0687d93e64)
