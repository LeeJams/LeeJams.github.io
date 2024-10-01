---
layout: post
title: "[프로그래머스] JadenCase 문자열 만들기 - JavaScript"
tags: [JAVASCRIPT, PROGRAMMERS, CODINGTEST, LV2]
category: ["프로그래머스"]
---

##### 문제 출처

[Lv.2 JadenCase 문자열 만들기 - JavaScript](https://school.programmers.co.kr/learn/courses/30/lessons/12951?language=javascript){:target="\_blank"}

##### 문제 설명

**JadenCase란 모든 단어의 첫 문자가 대문자이고, 그 외의 알파벳은 소문자인 문자열입니다.** 단, 첫 문자가 알파벳이 아닐 때에는 이어지는 알파벳은 소문자로 쓰면 됩니다. (첫 번째 입출력 예 참고)
문자열 s가 주어졌을 때, s를 JadenCase로 바꾼 문자열을 리턴하는 함수, solution을 완성해주세요.

##### 제한 조건

- s는 길이 1 이상 200 이하인 문자열입니다.
- s는 알파벳과 숫자, 공백문자(" ")로 이루어져 있습니다.
  - 숫자는 단어의 첫 문자로만 나옵니다.
  - 숫자로만 이루어진 단어는 없습니다.
  - 공백문자가 연속해서 나올 수 있습니다.

##### 예시

입출력 예

| s                       | return                  |
| ----------------------- | ----------------------- |
| "3people unFollowed me" | "3people Unfollowed Me" |
| "for the last week"     | "For The Last Week"     |

##### 풀이

```javascript
function solution(s) {
  // 메서드 체이닝
  // toLowerCase() 문자열을 소문자로 변환
  // split(" ") 공백을 기준으로 배열로 변환
  // map() 배열을 하나씩 순회후 반환
  // charAt(0) 문자열의 0번째를 선택
  // toUpperCase() 문자열을 대문자로 변환
  // substring(1) 문자열 1번부터 끝까지
  // join(" ") 공백을 두고 배열을 문자열로 변환
  return s
    .toLowerCase()
    .split(" ")
    .map((v) => v.charAt(0).toUpperCase() + v.substring(1))
    .join(" ");
}

console.log(solution("1 2 3 4")); // "1 4"
console.log(solution("-1 -2 -3 -4")); // "-4 -1"
console.log(solution("-1 -1")); // "-1 -1"
```

##### 정리

자바스크립트의 다양한 메서드를 이용해 쉽게 풀수 있는 lv2 문제였습니다!<br />
사용된 메서드와 문법에 대해 더 공부하고 싶으신 분은 **링크**를 클릭해주세요!

[toUpperCase() 메서드 - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase){:target="\_blank"}<br />
[toLowerCase() 메서드 - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase){:target="\_blank"}<br />
[split() 메서드 - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/split){:target="\_blank"}<br />
[map() 메서드 - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map){:target="\_blank"}<br />
[join() 메서드 - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/join){:target="\_blank"}<br />
[substring() 메서드 - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/substring){:target="\_blank"}<br />
[charAt() 메서드 - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/charAt){:target="\_blank"}<br />

피드백은 언제나 환영입니다. 😊
