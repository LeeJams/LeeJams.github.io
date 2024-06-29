---
layout: post
title: "Description: net::ERR_CLEARTEXT_NOT_PERMITTED 이슈 해결"
tags: [ERROR, ANDROID, DEPLOY, APP, ERR_CLEARTEXT_NOT_PERMITTED]
category: ["APP"]
---

<center>
<img src="../../assets/img/app/ERR_CLEARTEXT_NOT_PERMITTED.jpeg" alt="ERR_CLEARTEXT_NOT_PERMITTED" style="width: 250px" />
</center>

테스트를 하려고 웹뷰로 HTTP를 이용하는 앱을 APK로 빌드하고 실행했는데, 다음과 같은 에러가 발생했습니다.

찾아보니 안드로이드 9(Pie) 이상부터는 HTTP 통신을 사용할 때 보안상의 이유로 기본적으로 HTTPS를 사용하도록 설정되어 있는데 HTTP 통신을 사용하다보니 에러가 났던거 였습니다. HTTP를 사용하려면 네트워크 보안 설정을 변경해야 한다고 해서 변경하는 방법을 알아보았습니다.

일단 android폴더를 확인합니다. 혹시 Expo를 사용하는 중인데 android 폴더가 없다면 다음 명령어로 android 폴더를 생성할 수 있습니다.

```bash
npx expo prebuild
```

**AndroidManifest.xml** 파일을 찾아 application 태그에 다음과 같이 설정을 추가합니다.

```xml
<!-- 경로: android/app/src/main/AndroidManifest.xml -->
<application
    android:usesCleartextTraffic="true"
    android:networkSecurityConfig="@xml/network_security_config"
>
</application>
```

그 다음 **android/app/src/main/res/xml** 폴더에 **network_security_config.xml** 파일을 생성하고 다음과 같이 설정합니다. (폴더가 없다면 생성합니다.)

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
</network-security-config>
```

이렇게 설정을 추가하고 다시 APK를 빌드하고 실행하니 정상적으로 HTTP 통신이 되었습니다.

피드백은 언제나 환영입니다. 😊
