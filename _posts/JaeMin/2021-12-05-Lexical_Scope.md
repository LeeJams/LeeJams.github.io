---
layout: post
title: "JavaScript 클로저"
tags: [JAVASCRIPT, CLOSURE]
author: "LeeJam"
---
>**클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.  - MDN -**

**클로저**는 자바스크립트를 공부하면 무조건 듣는 난해하기로 유명한 개념이다. 위 **MDN**에서 정의한 글을 보자... 무슨 말인지 전혀 이해를 할 수가 없다.

그래서 오늘은 클로저에 대해 공부한 것을 쉽게 다뤄볼 예정이다.

<p style="text-decoration-line: line-through;">일반적인 스코프의 개념을 모르시는 분들에게는 친절한 포스팅이 아닐 수 있습니다.</p>

### 렉시컬 스코프
우선 클로저를 이해하려면 자바스크립트의 **렉시컬 스코프**에 대해 알아야 한다.

```javascript
var x = 'global';

function foo() {
  var x = 'function scope';
  bar();
}

function bar() {
  console.log(x);
}

foo();
bar();
```
위 코드의 실행 결과는 예측해보자. 
<br />
```javascript
// 실행 결과
// function scope
// global
```
이런 결과를 생각했다면 그것은 오답이다. 그렇다면 답은 무엇일까?
<br />
<span style="text-decoration-line: line-through;">글쓴이도 처음에는 이게 정답인줄 알았다..</span>
```javascript
// 실행 결과
// global
// global
```
정답은 위 결과가 정답이다.

**이유는 자바스크립트 엔진은 함수를 어디서 호출했는지가 아니라 <strong style="color: #bb4177;">함수를 어디서 정의했는지에 따라</strong> 상위 스코프를 결정하기 때문이다.**

즉, **bar 함수**의 정의가 평가되는 시점에 **'global'**이란 값을 결정지었기 때문에 어디서 **bar()**을 호출하든 **'global'** 값이 나오게 된다.

이것이 바로 <strong style="color: #bb4177;">렉시컬 스코프</strong>다.

### 클로저
그럼 이제 본론으로 돌아와서 클로저란 무엇일까?
<br />
쉽게 **"자신이 선언될 당시의 환경을 기억하는 함수"**로 정의한 것이 이해하기 쉬웠다.
<br />
즉, 자신이 정의될 때의 **렉시컬 환경을 기억**하는 것이다.

코드를 한번 보자.
```javascript
function lostFunc() {
  var name = "LeeJam";
  function getName() {
    console.log(name);
  }
  return getName;
}

var checkFunc = lostFunc();

getName();
/* 
실행결과

LeeJam
undefined 
*/
```
일반적으로는 **함수 안의 지역 변수들은 그 함수가 처리되는 동안에만 존재하기 때문에 getName 함수가 리턴되면 name변수에 접근 할 수 없다고 예상**된다. (실제로 몇몇 프로그래밍 언어에서는 그렇다)
<br />하지만 <strong style="color: #bb4177;">자바스크립트의 모든 함수는 자신의 상위 스코프를 기억한다.</strong>라는 특성을 가지고 있다.

1. **getName 함수**가 선언될 당시 위치는 **lostFunc의 내부**였다. 때문에 **getName 함수**의 **상위 스코프는 lostFunc 함수**가 된다. 
2. 함수는 자신의 상위 스코프를 기억한다. **lostFunc 함수**를 **getName 함수**에서 참조하기 떄문에 lostFunc 함수는 **가비지 컬렉션의 대상이 되지 않는다.**

즉, **MDN**에서 내린 정의 **클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.** 라는 말은 **'함수를 어디서 정의했는지에 따라 상위 스코프를 결정하는 렉시컬 스코프'** & **'자바스크립트의 모든 함수는 자신의 상위 스코프를 기억한다.'** 라는 함수의 특성을 조합한 것을 말하는 것이고 그것이 바로 <strong style="color: #bb4177;">클로저</strong>다.

### 마무리
오늘은 클로저와 클로저를 알기 위한 렉시컬 스코프에 관련된 내용을 가볍게 정리해봤습니다. 
<br />
다음엔 클로저의 활용에 관련된 글을 다뤄보겠습니다.

피드백은 언제나 환영입니다.