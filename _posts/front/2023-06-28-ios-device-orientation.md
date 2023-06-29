---
layout: post
title: "IOS에서 Device Orientation Event 권한 얻는 방법"
tags: [DeviceOrientationEvnet]
category: ["WEB"]
---

이번에 새싹톤에 참가해서 플로깅 서비스를 만들다. 걸음수 측정을 위해 Device Orientation Event를 사용하려는데 IOS에서 권한을 얻는 방법을 찾기가 힘들어서 정리해보았습니다. <br />

### Device Orientation Event

Device Orientation은 **디바이스의 방향을 나타내는 이벤트**입니다. <br />
가속도계(accelerometer)가 기기의 방향의 변화를 감지했을 때 발생하게됩니다.

**IOS의 경우 13 버전 이상부터 Device Orientation Event를 사용하기 위해서는 권한을 얻기 위해 사용자에게 권한을 요청해야합니다.**

### Device Orientation Event 권한 얻기

권한을 얻기 위해서는 아래와 같은 코드를 사용합니다.

```javascript
// IOS 13 버전 이상 check
const check = typeof DeviceOrientationEvent.requestPermission === "function";

if (check) {
  // 권한 요청
  window.DeviceOrientationEvent.requestPermission()
    .then((permissionState) => {
      if (permissionState === "granted") {
        window.addEventListener("deviceorientation", () => {
          // 원하는 동작 코드 작성
        });
      }
    })
    .catch(() => {
      alert("권한을 허용해주세요.");
    });
} else {
  // IOS 13 버전 이하는 권한 요청 없이 사용 가능
  window.addEventListener("deviceorientation", () => {
    // 원하는 동작 코드 작성
  });
}
```

### 주의사항

- IOS 13 버전 이상부터 권한 요청이 필요합니다.
- 권한 요청을 하지 않거나 거부하면 Device Orientation Event가 발생하지 않고 다시 엑세스 하려면 브라우저나 앱을 새로 시작해야합니다.

**페이지가 로드될 때 자동으로 호출하려고 하면 작동하지 않습니다.** (대체 왜...) <br />
권한 요청은 사용자의 액션에 의해 호출되어야하는데 (버튼 클릭 등) 이 부분이 참 헷갈렸습니다. 저 같은 경우는 React useEffect를 사용하여 구현하려 했는데 useEffect는 페이지가 로드될 때 자동으로 호출되기 때문에 작동하지 않아 권한 요청을 버튼 클릭 시에만 호출되도록 구현하였습니다.

#### 정리

[MDN - DeviceOrientationEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent)

걸음수 측정을 위해 열심히 개발하다 이렇게 또 하나 배운 것을 정리하게 되었습니다. <br />

피드백은 언제나 환영입니다. 😊
