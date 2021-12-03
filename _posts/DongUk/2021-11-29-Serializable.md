---
layout: post
title: "Seializable의 위험성"
tags: [Java, Seializable, 직렬화]
author: "DongUk"
---


## Intro
안녕하세요 Jams & Donguk의 **Donguk**입니다

오늘은 데이터 통신에 이용되는 DTO, VO등에 많이 사용되는 **<strong style="color: #bb4177;">'Serialization(직렬화)'</strong>**를 공부해 봤습니다.

본 포스팅은 **Java**를 기준으로 설명할 것이므로 자바를 주 언어로 사용하시지 않는다면 이해가 어려우실 수 있습니다.
하지만 근간은 **직렬화**가 어떤 것이고 사용 시 어떤 것을 조심해야 하는지 알려드리기 위함이니 본인이 사용하시는 언어와 상이한 내용은 찾아보시면서 맞춰 보시면 될 것 같습니다.

그리고 오늘 내용은 조금 어려울 수 있습니다.(필자가 그랬습니다...)<br/>
그래서 시작부터 직렬화가 무엇인지 적고 글이 진행되면서도 계속해서 어떤 것인지 설명드리는 것으로 이해시켜드리도록 하겠습니다.
<br/>
1. 직렬화
> 자바 진영에서 사용하는 언어(Byte Type)로 JVM 메모리 내 데이터를 바꾸는 것

2. 역직렬화
>자바 진영에서 사용하는 언어(Byte Type)로된 파일을 JVM 메모리 위 데이터로 올려 파일을 실행가능한 상태로 만드는 것

이해 못하셔도 됩니다. 그럼 글 시작하겠습니다.
<br/><br/><br/><br/>

## 직렬화를 알기 전 배경지식
### 직렬화란?
Java와 외부 시스템(DB 등등)이 통신을 하기 위해서는 Java Object 또는 Data를 외부 자바 시스템에서도 사용할 수 있도록 Java Byte형태로 데이터를 변환하는 과정이 필요합니다.
<br/>
이 과정을 **<strong style="color: #bb4177;">'직렬화'</strong>**라고 칭합니다.
**<strong style="color: #bb4177;">'역직렬화'</strong>**는 반대로 외부 데이터를 Java가 이해할 수 있는 형태로 바꾸는 것을 의미합니다.
그렇다면 직렬화는 왜 필요할까요?
<br/>
* *컴퓨터는 객체나 변수를 인식할 수 없으며 실제로는 2진수 8자리로 구성된 Byte타입을 인식합니다.*<br/><br/>

직렬화가 왜 필요한지를 알기 위해서는 기본적으로 간단한 **컴퓨터 상식**을 알고 갈 필요가 있습니다.
<br/>
각각의 OS는 실행되는 소프트웨어들의 메모리 할당 로직이 모두 다릅니다.
따라서 개별 프로세스가 사용하는 **<strong style="color: #bb4177;">'가상메모리주소공간(Virtual Address Space, 통칭 VAS)'</strong>**를 부여하는 방법 또한 서로 다릅니다.

* VAS(Vertual Address Space)
** *오늘날 대부분의 운영 체제에는 가상 메모리 기법이 적용되어 있습니다.*
<br/>
** *이 가상 메모리에서의 주소 공간, 즉 가상 주소 공간은 프로세스가 참조할 수 있는 주소들의 범위이며, 하나의 프로세스 당 하나의 가상 주소 공간을 할당받습니다.*

문제는 이 *VAS*를 부여하는 방식이 모두 다르다보니 Byte타입을 해석하는 컴파일러도 모두 달랐습니다.
때문에 Window에서 C언어로 컴파일한 파일을 Linux에서는 **실행할 수 없었던 시절**이었습니다.
<br/>
이런 이슈를 해결하고자 JAVA진영에서는 초기 목표를 **WORA(Write Once Run Anywhere)**로 잡고 어느 운영환경에서든 JAVA로 컴파일한 파일을 사용가능하도록 **<strong style="color: #bb4177;">'Java Vertual Machine(JVM - 자바가상환경)'</strong>**을 제작하였습니다.
JVM은 OS위에 **<strong style="color: #bb4177;">실행파일보다 먼저 올라가고 이 JVM 위에서 실행파일을 실행</strong>**함으로써 해당 이슈를 해결 할 수 있었습니다.
Window 컴퓨팅 환경에서 제작한 Jar, War등의 Java파일을 Linux등의 컴퓨팅 환경에서도 실행 가능하게 한다는 뜻입니다.
지금은 많은 언어들이 해당 기능을 지원하지만 당시에는 혁신적인 기능으로 인기를 끌었습니다.

문제는 이 **WORA**를 구현하기 위해서는 2가지가 필요합니다.
1. 어느 환경에서도 실행할 수 있는 Vertual Machine(가상 환경)이 존재해야 함
> 각 OS별로 작동하는 JAVA **JRE**만든 상태이며 이를 다운 받을 때 각 컴퓨팅 환경에 맞는 JRE를 선택해 다운받도록 현재 되어있습니다.(JRE안에 JVM이 포함되어 있습니다.)
2. **Vertual Machine만 있다면 어디서든 실행할 수 있도록 JVM에서 사용가능한 자바 언어(JAVA Byte Type)로 직렬화, 역직렬화를 진행해야 함**
> 1. 직렬화<br/>
JVM 내 Heap, Stack등의 메모리에 적재된 Primitive Type, Reference Type들을 컴파일러가 직렬화를 수행하여 JAVA Byte로 변경된 파일 생성
<br/>
> 2. 역직렬화<br/>
위에서 생성된 파일을 실행하고자 하는 환경에서 실행하면 JVM이 역직렬화를 통해 해당 파일 내 데이터들을 JVM 메모리위에 올려 데이터 활용

<br/><br/>
여기서 알 수 있듯이 원래는 Serialization이 DTO나 VO 때문에 등장했던 것이 아닙니다. 원래 JVM은 직렬화를 진행하고 있었습니다.
<br/>
다만 Network 통신을 할 때에도 객체를 그대로 전달할 수 없다보니 데이터 변환이 필요하여 Serializable을 DTO나 VO, DOMAIN등에 사용한 것 뿐입니다.
<br/>
그럼 왜 우리는 굳이 java.io.serializable을 직접 상속받아 serialVersionUID를 정의할까요?
<br/><br/><br/><br/>

## JAVA의 Serialization(직렬화) 구현 시 주의사항
### Serializable을 상속받아 serialVersionUID를 선언하는 이유
위 내용들만 살펴보면 직렬화라는 것은 JVM이 알아서 잘 처리하고 있는 것으로 보입니다.
하지만 왜 웹서비스들 제작 시 DTO, VO, Domain 등의 클래스 생성 시 소스코드상에 **<strong style="color: #bb4177;">'implements Serializable'</strong>**을 왜 상속해 사용하는지 이해하기 어려울 것입니다.
실제로 아무런 값을 지정해주지 않는다면 JAVA는 각 객체들에게 임의의 고유한 **<strong style="color: #bb4177;">'serialVersionUID'</strong>**를 부여해 Serialization을 구현합니다.
<br/><br/>
문제는 이 때 JAVA가 임의로 그 값을 발행한다는 것에 있습니다.
예를들어 A라는 서버에서 B라는 서버로 특정 값을 담은 DTO객체를 전송한다고 가정하겠습니다.
<br/>
이 때 A서버에서는 DTO객체를 직렬화하여 JAVA Byte로 바꿔 B서버로 전송합니다.
해당 데이터를 수신한 B서버에는 DTO객체와 맵핑되는 객체가 있어야만 합니다.
그래야만 수신한 데이터가 어떤 데이터인지 알고 역직렬화를 수행할 수 있습니다.
그런데 만약 최초 통신 후 두번째 통신 부터 **A서버의 DTO 변수를 4개에서 5개로 변경**하고 그 값을 B서버로 전송한다면 어떻게 될까요?
<br/><br/>
자바가상기계 (JVM)은 **<strong style="color: #bb4177;">'직렬화와 역직렬화를 하는 시점의 클래스에 대한 버전 번호(serialVersionUID)를 부여'</strong>**합니다.
만약 그 시점에 클래스의 정의가 바뀌어 있다면 **<strong style="color: #bb4177;">'새로운 버전 번호를 할당'</strong>**합니다.
<br/>
즉, **변수가 4개일 때 JVM으로 부터 임의로 부여받았던 'serialVersionUID'**와 **변수가 5개로 변경된 지금의 'serialVersionUID'**는 다르기 때문에
B서버에서는 역직렬화 시 두 객체가 서로 다른 객체라고 생각해 **<strong style="color: #bb4177;">'InvalidClassException'</strong>**이 발생할 수 있습니다.
<br/><br/>
그럼 두 객체가 같은 객체라는 것을 증명하기 위해서는 어떡해야 할까요?
이 때 위에서 말했던 **implements Serializable**를 상속 받아 전송하고자하는 클래스에 **serialVersionUID**를 심어줌으로써 문제를 해결할 수 있습니다.
개발자가 강제로 serialVersionUID를 넣어놨으므로 A서버에서 데이터 변수가 변경되어도 JVM이 새로운 serialVersionUID를 생성하지 않고 해당 UID그대로를 B서버에 전달합니다.
```java
public class Member implements Serializable {
      private static final long serialVersionUID = -3966212388291623358L;

      String name;
      String password;
}
```
B서버에서는 위 **serialVersionUID**를 확인하고 UID에 맞는 객체를 찾아 A서버의 객체와 **같은 객체**라고 판단하고 내부 데이터를 업데이트 해주게 됩니다.
<br><br>

위 내용을 간추리면 5가지입니다.
1. **JVM은 데이터 통신 시 직렬화를 통해 메모리에 존재하는 데이터를 JAVA Byte로 변환합니다.**
2. **이 때 JVM은 개발자가 따로 serialVersionUID를 지정하지 않는 경우 직렬화와 역직렬화를 수행하는 시점의 객체 상태를 판단해 버전번호(serialVersionUID)를 따로 부여합니다.**
3. **만약 직렬화할 때 사용한 serialVersionUID의 값과 역직렬화 하기 위해 사용했던 serialVersionUID값이 다르다면 InvalidClassException이 발생할 수 있습니다.**
4. **이런 문제를 해결하기 위해 클래스 생성 시 Serializable를 상속받고 해당 클래스에 고유한 SerialVerionUID를 심습니다.**
5. **해당 객체를 수신하는 쪽에서 송신한 쪽과 SerialVerionUID로 맵핑되는 객체를 찾습니다. 이후 역직렬화해줍니다.**
<br/><br/><br/><br/>

## 그럼 데이터 통신 시 serializable은 반드시 상속받아야 하는가?
결론적으로 이야기하자면 어디서 사용하느냐에 따라 다르겠지만 웹개발을 하는 입장에서는 **<strong style="color: #bb4177;">권장하고 싶지 않습니다.</strong>**

이수홍님의 '자바 직렬화, 그것이 알고싶다. 실무편'(https://techblog.woowahan.com/2551/)의 내용을 인용하자면 크게 6가지 이유로 권장되지 않습니다.
1. serialVersionUID는 개발 시 **직접 관리가 필요**
2. 역직렬화 대상 클래스의 멤버 변수 타입변경 지양되므로 **타입 변경 자체가 어려움**
> 때문에 자주 변경되는 클래스는 Java 직렬화 사용이 사실상 불가능
3. 외부(DB, 캐시 서버, NoSQL 서버 등)에 **장기간 저장될 정보는 Java 직렬화 사용을 지양**
> 장기간 보관될 경우 **클래스 변경을 예측 불가**
4. 개발자가 **직접 컨트롤할 수 없는 클래스(프레임워크 또는 라이브러리에서 제공하는 클래스)는 직렬화 지양**
6. 역직렬화에 실패하는 상황에 대한 **예외처리가 필수적으로 요구됨**
7. 직렬화된 데이터는 타입 정보등의 클래스 **메타정보를 포함하기 때문에 JSON 포맷에 비해 약 2~10배 더 사이즈가 큼**
> 특히 직렬화된 데이터를 메모리 서버(Redis, Memcached)에 저장하는 환경에서 트래픽에 따라 네트워크 비용과 캐시 서버 비용이 급증할 수 있으므로, JSON 포맷으로의 변경을 고려해야 한다.

<br/><br/><br/><br/>

## Tip
1. 실제 파일을 생성하는 **'ObjectOutputStream'**은 대표적인 **'직렬화'**객체이며 반대로 **'ObjectInputStream'**은 **'역직렬화'**객체이다.
2. DB, Network 통신 시 사용되는 DTO, VO, Domain의 serializable Interface는 '**java.io**.serializable'로 마찬가지로 io에 속한 객체이다.
3. transient를 활용하면 해당 변수를 직렬화 대상에서 제외시킬 수 있다.
```java
public class Member implements Serializable {
      String name;
      transient String password;  // 직렬화 대상에서 제외되어 직렬화 시 null 처리
}
```
4. 직렬화는 JSON이나 CSV등으로도 가능하다.
<br/><br/><br/><br/>

## 마무리
DTO나 VO 사용 시 반드시 사용해야하는 줄 알았던 serializable은 사실 json으로 통신하고 있던 우리 서비스에는 불필요한 코드였습니다.<br/>
PL님이 제가 사용했던 java.io.serializable을 걷어내라고 했던 이유를 알 수 있던 시간이었습니다.<br/>
그냥 코딩하면 안 된다는 것을 다시 한 번 느낍니다.
