---
layout: post
title: "react-native-kakao 안드로이드 로그인 오류 해결"
tags: [react-native-kakao, ANDROID, KAKAO, LOGIN, ERROR, react-native, expo]
category: ["APP"]
---

# Android에서 발생한 카카오 로그인 앱 종료 오류 해결 후기

안녕하세요! Expo로 앱을 개발하다가 Android 릴리즈(Production) 빌드에서만 발생하는 카카오 로그인 오류를 해결한 과정을 공유합니다.

---

### 환경

- Expo 기반 React Native 앱
- iOS 디바이스 및 Android 시뮬레이터에서는 정상 동작
- Google Play 스토어 배포 버전(.apk/.aab)에서만 카카오 로그인 시 앱이 강제 종료

### 증상

- 카카오 로그인 버튼을 누르면 별도 에러 메시지 없이 앱이 바로 종료됨

---

## 원인 분석

프로덕션 빌드에서는 코드 축소(Code Shrinking), 난독화(Obfuscation), 최적화(Optimization) 과정을 거치는데, 카카오 SDK 내부 모델 객체가 난독화 과정에서 제거 또는 이름이 변경되면서 런타임에 클래스/필드를 찾지 못해 크래시가 발생했습니다.

---

## 해결 방법

> 카카오 SDK 관련 클래스와 모델 객체를 ProGuard(R8) 처리 대상에서 제외하도록 프로가드 규칙 파일에 예외 처리를 추가합니다.

### 1. 안드로이드 네이티브 프로젝트(ProGuard) 설정

```proguard
# Kakao SDK 모델 객체 유지
-keep class com.kakao.sdk.**.model.* { <fields>; }

# Square OkHttp 관련 경고 무시 (이슈 #6792)
-dontwarn org.bouncycastle.jsse.**
-dontwarn org.conscrypt.*
-dontwarn org.openjsse.**

# Retrofit2 (R8 full 모드에서 제네릭 시그니처 유지)
-if interface * { @retrofit2.http.* public * *(...); }
-keep,allowoptimization,allowshrinking,allowobfuscation class <3>
```

- `-keep class com.kakao.sdk.**.model.* { <fields>; }`: **카카오 SDK의 모든 모델 클래스와 필드를 난독화 대상에서 제외합니다.**
- `-dontwarn ...`: **bouncycastle, conscrypt, openjsse 관련 경고를 무시하여 빌드 실패를 방지합니다.**
- Retrofit 관련 규칙은 R8 full 모드에서 제네릭 정보를 유지하기 위해 추가합니다.

### 2. Expo 앱 설정 (app.json 또는 app.config.js)

Expo 프로젝트에서는 플러그인 설정으로 ProGuard를 활성화하고, 위 규칙을 추가할 수 있습니다.

```json
{
  "expo": {
    // … 기존 설정 생략 …
    "plugins": [
      "expo-apple-authentication",
      [
        "expo-build-properties",
        {
          "android": {
            "enableProguardInReleaseBuilds": true,
            "extraProguardRules": "-keep class com.kakao.sdk.**.model.* { <fields>; }\n-keep class * extends com.google.gson.TypeAdapter\n\n# https://github.com/square/okhttp/pull/6792\n-dontwarn org.bouncycastle.jsse.**\n-dontwarn org.conscrypt.*\n-dontwarn org.openjsse.**\n\n#------------------RETROFIT---------------------\n#R8 full mode strips generic signatures from return types if not kept.\n-if interface * { @retrofit2.http.* public *** *(...); }\n-keep,allowoptimization,allowshrinking,allowobfuscation class <3>\n#-------------------END--------------------------"
          }
        }
      ]
    ]
  }
}
```

- `enableProguardInReleaseBuilds`: **Production 릴리즈 빌드에서 ProGuard를 활성화**
- `extraProguardRules`: **앞서 작성한 프로가드 규칙을 문자열로 전달**

---

## 마무리 및 참고 자료

위 설정을 적용한 후, Android 릴리즈 빌드에서도 카카오 로그인이 정상 동작함을 확인했습니다. 프로덕션 환경에서 외부 SDK를 사용할 때는 난독화/최적화 예외 처리를 잊지 않는 것이 중요한것 같습니다.

### 참고 자료

- [카카오 개발자 문서](https://developers.kakao.com/docs/latest/ko/android/getting-started#project-pro-guard)
- [디벨토크 사례](https://devtalk.kakao.com/t/react-native-android/142981)
- [react-native-kakao 공식 문서](https://rnkakao.dev/en/docs/install-android)

---
