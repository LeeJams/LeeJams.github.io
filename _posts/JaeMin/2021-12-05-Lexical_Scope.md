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
저는 쉽게 **"자신이 선언될 당시의 환경을 기억하는 함수"**로 정의한 것이 이해하기 쉬웠습니다.
<br />
즉, 자신이 정의될 때의 **렉시컬 환경을 기억**하는 것입니다.

코드를 한번 보자
```javascript
const x = "global"

function outer() {
  const x = 'function scope';
  const inner = function () { console.log(x); };
  return inner;
}

const innerFunc = outer();
innerFunc();
```
