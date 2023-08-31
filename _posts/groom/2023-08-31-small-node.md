---
layout: post
title: "[구름톤 챌린지] 14일차 미션 작은 노드 - JavaScript"
tags:
  [JAVASCRIPT, GOORM, CHALLENGE, 구름톤, 구름톤챌린지, 작은, 노드, 작은 노드]
category: ["구름톤 챌린지"]
---

##### 문제 출처

[구름톤 챌린지](https://level.goorm.io/l/challenge/goormthon-challenge?utm_source=inhouse_level&utm_medium=banner_main&utm_content=open){:target="\_blank"}

##### 문제 설명

N개의 노드와 M개의 **양방향 간선**으로 이루어진 그래프가 있다. 이 그래프의 노드는 1번부터 N번까지 번호가 붙어 있다. 양 끝 노드가 동일한 간선은 주어지지 않는다.

플레이어는 아래 규칙에 따라 그래프에서 이동하려고 한다. 플레이어는 처음 K번 노드에 있다.

1. **한 번 방움한 노드는 다시 방문할 수 없다. 시작 노드도 방문한 것으로 간주한다.**
2. 현재 노드와 간선으로 직접 연결된 다른 노드 중, 방문할 수 있으면서 **번호가 가장 작은 노드**로 이동한다.

플레이어가 더이상 이동할 수 있는 노드가 없을 때, **방문한 서로 다른 노드의 개수와 마지막 노드 번호**를 구해보자.

##### 제한 조건

- 첫째 줄에 노드의 개수 N, 간선의 개수 M, 시작 노드의 번호 K가 공백을 두고 주어진다.
- 다음 M개의 줄에는 간선이 잇는 양 끝 정점의 번호가 공백을 두고 주어진다.

##### 예시

입력 예 <br />
6 6 1 <br />
1 2 <br />
1 3 <br />
2 3 <br />
3 4 <br />
3 5 <br />
4 6 <br />

출력 예 <br />
5 6

##### 풀이

```javascript
const readline = require("readline");
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [];
rl.on("line", (line) => {
  input.push(line);
});

rl.on("close", () => {
  // 노드의 개수 N, 간선의 개수 M, 시작 노드의 번호 K
  const [N, M, K] = input[0].split(" ").map(Number);

  // 간선이 잇는 양 끝 정점의 번호 배열
  const arr = input.slice(1).map((n) => n.split(" ").map(Number));

  // 노드의 연결관계를 위한 객체
  const graph = {};

  // 배열을 가져와 노드의 연결관계를 매핑해준다.
  // ex) {'1': [2, 3], '2': [1, 3], '3': [1, 4, 5] ...}
  arr.forEach((v) => {
    const [a, b] = v;

    // 양방향 간선이기에 a, b를 다 이어준다.
    if (!graph[a]) graph[a] = [];
    if (!graph[b]) graph[b] = [];
    graph[a].push(b);
    graph[b].push(a);
  });

  // 마지막 번호를 체크
  let last = K;
  // 시작 노드도 방문한 것으로 간주
  const visited = [K];

  while (true) {
    // 연결 관계가 없으면 멈춘다.
    if (!graph[last]) break;

    // 마지막 번호가 가지고 있는 배열을 찾고
    // filter() 메서드를 통해 방문했던 번호를 제외합니다.
    // 오름차순 정렬을 해 0번 째 젤 작은 번호를 가져옵니다.
    const minSite = graph[last]
      .filter((n) => !visited.includes(n))
      .sort((a, b) => a - b)[0];

    // 만약 번호가 없으면 멈춘다.
    if (!minSite) break;

    last = minSite;
    visited.push(minSite);
  }

  console.log(visited.length + " " + last);
});
```

##### 정리

현재 구름톤 챌린지가 진행중인데 하루에 한 문제를 풀면서 머리를 굴려보아요.<br />

피드백은 언제나 환영입니다. 😊

##### 사용한 메서드

[split() 메서드 - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/split){:target="\_blank"}<br />
[slice() 메서드 - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/slice){:target="\_blank"}<br />
[map() 메서드 - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map){:target="\_blank"}<br />
[filter() 메서드 - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter){:target="\_blank"}<br />
[sort() 메서드 - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort){:target="\_blank"}<br />
[구조 분해 할당 - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment){:target="\_blank"}<br />
[includes() 메서드 - MDN](hthttps://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/includes){:target="\_blank"}
