---
layout: post
title: "[구름톤 챌린지] 15일차 미션 과일 구매 - JavaScript"
tags:
  [JAVASCRIPT, GOORM, CHALLENGE, 구름톤, 구름톤챌린지, 과일, 구매, 과일 구매]
category: ["구름톤 챌린지"]
---

##### 문제 출처

[구름톤 챌린지](https://level.goorm.io/l/challenge/goormthon-challenge?utm_source=inhouse_level&utm_medium=banner_main&utm_content=open){:target="\_blank"}

##### 문제 설명

과일을 사기 위해 마크를 간 플레이어는 큰 난관에 봉착했다. 왜냐하면 팔고 있는 과일이 너무 많아서, 어떤 과일을 사면 좋을지 결정하는 게 너무 어려웠지 때문이다. 현재 마트에서 팔고 있는 과일은 N개가 있고, 각 과일의 가격은 P 그리고 그 과일을 먹었을 때 플레이어가 얻을 수 있는 포만감은 C이다.

**이 마트에서는 특이하게 과일을 조각 단위로 구매하는 것이 가능하다. 가격이 P인 과일을 조각 단위로 구매하고자 할 경우, 플레이어는 이 과일을 P개의 조각으로 자른 뒤 그중 원하는 몇 개의 조각만을 구매할 수 있다. 이때 모든 조각의 가격은 1, 먹었을 때 얻을 수 있는 포만감은 C/P로 동일하다.**

플레이어는 K만큼은 돈을 가지고 있다. 플레이어는 주어진 금액 이내에서 구매한 과일들의 포만감 합이 가장 크게 되도록 살 과일을 선택하려고 한다. 플레이어가 최적의 방법에 따라 과일을 구매했을 때, **구매한 과일들의 최대 포만감 합을 구해보자.**

##### 제한 조건

- 첫째 줄에 마트에서 파는 과일의 개수 N과 플레이어가 가진 돈 K가 공백을 두고 주어진다.
- 다음 N개의 줄에는 각 과일의 가격 P와 그 과일을 먹었을 때 플레이어가 얻을 수 있는 포만감 C가 공백을 두고 주어진다.
- **C는 항상 P의 배수이다.**

##### 예시

입력 예 <br />
6 13 <br />
2 8 <br />
7 35 <br />
1 5 <br />
3 12 <br />
10 30 <br />
1 7 <br />

출력 예 <br />
63

##### 풀이

모든 과일을 조각으로 만들어 계산하면 쉽게 문제를 해결할 수 있다.

```javascript
const readline = require('readline');
let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
let input = [];
rl.on('line', (line) => {
	input.push(line);
});

rl.on('close', () => {
  // 과일 수 N, 가진 돈 K
	let [N, K] = input[0].split(" ").map(Number);

  // 과일 가격, 포만감, 조각 냈을 때 포만감을 만들어 포만감 순으로 정렬해준다.
  // 조각 과일의 가격은 1이다.
  // ex) [[1, 7, 7], [7, 35, 5], [1, 5, 5] ... ]
	const fruits = input.slice(1).map(f => f.split(" ").map(Number)).map(f => [f[0], f[1], f[1] / f[0]]).sort((a, b) => b[2] - a[2]);
	
	let answer = 0;
	let curIdx = 0;

  // K가 0이 아닐 경우
	while(K) {
    // 현재 조각 과일의 개수를 체크해서
    // 0일 경우 다음 과일로 넘어간다.
		if(fruits[curIdx][0] === 0) curIdx++;

    // 다음 과일이 없을 경우 멈춘다.
		if(curIdx === fruits.length) break;

    // 과일이 있을 경우 
    // 몇개의 조각 과일을 살 수 있는지 계산한다.
		let check = K - fruits[curIdx][0];
		if(check >= 0) {
			check = fruits[curIdx][0];
			K = K - fruits[curIdx][0];
			fruits[curIdx][0] = 0;
		} else {
			check = K
			K = 0;
		}
    
    // 계산된 조각 과일의 개수를 포만감과 곱해 더해준다.
		answer += fruits[curIdx][2] * check;
	}
	
	console.log(answer);
})
```

##### 정리

현재 구름톤 챌린지가 진행중인데 하루에 한 문제를 풀면서 머리를 굴려보아요.<br />

피드백은 언제나 환영입니다. 😊

##### 사용한 메서드

[split() 메서드 - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/split){:target="\_blank"}<br />
[slice() 메서드 - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/slice){:target="\_blank"}<br />
[map() 메서드 - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map){:target="\_blank"}<br />
[sort() 메서드 - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort){:target="\_blank"}<br />
[구조 분해 할당 - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment){:target="\_blank"}<br />
