---
layout: post
title: 3. Network Layer (Vermittlungsschicht)
date: 2025-09-12 15:47 +0200
categories: [Comptuer Science, Network]
tags: [nat, network, network-layer, computer-science]
---

> Currently I am studying Computer Science in German. However, as my mother tongue is not german, so this cheatsheet is mixed up with German, English and Korean.
{: .prompt-info }


# Network Layer (Vermittlungsschicht)

## Vermittlungsarten

### Leitungsvermittlung

### Nachrichtenvermittlung

### Paketvermittlung




## Adressierung im Internet

### IPv4 (Internet Protocol version 4)

### IPv6 (Internet Protocol version 6)

#### IPv6-Adressen zur besonderen Verwendung

| IPv6 접두사 | 주소 유형 | 주요 특징 및 예시 | 라우팅 여부 |
| :--- | :--- | :--- | :--- |
| **`::1/128`** | **루프백** (Loopback) | **컴퓨터 자신**을 가리킴 (localhost).<br> *예: 웹 브라우저에 `http://[::1]` 입력* | **X** |
| **`::/128`** | **미지정** (Unspecified) | IP를 할당받기 전 **임시**로 사용 (IPv4의 `0.0.0.0`).<br> *예: DHCP 서버에 IP 요청 시 출발지 주소* | **X** |
| **`fe80::/10`** | **링크-로컬** (Link-Local) | **라우터를 넘어가지 못하는** 내부 통신용 주소.<br> *예: 같은 공유기(Wi-Fi)에 연결된 장치 간 통신* | **X** |
| **`fc00::/7`** | **고유-로컬** (Unique-Local) | **회사/기관용 사설 IP** (IPv4의 `192.168.x.x`와 유사).<br> *예: 회사 내부 파일 서버나 프린터에 할당* | **X** |
| **`ff00::/8`** | **멀티캐스트** (Multicast) | **특정 그룹**에 속한 여러 장치에 동시 전송.<br> *예: 네트워크상의 라우터 그룹(`ff02::2`)에만 정보 전달* | **O** |
| **나머지** | **글로벌** (Global) | **전 세계 유일**한 인터넷용 공인 IP 주소.<br> *예: `google.com`에 접속 시 사용되는 주소* | **O** |


#### Stateless Address Autoconfiguration (SLAAC)

IPv6에서 호스트가 자신의 IP 주소를 자동으로 구성할 수 있도록 하는 메커니즘. 서버에 의존하지 않고 주소를 할당하기 때문에 stateless(상태 비저장)이라고 불림


#### Neighbor Discovery Protocol (NDP)
동일한 로컬 링크(단일 서브넷) 내에 있는 노드들 간의 상호 작용을 관리하는 역할

1. Address Resolution(주소 결정)
- Neighbor Solicitation(Request): 대상 IPv6 주소를 찾기 위해 사용됨. 이 메시지는 대상 IPv6 주소의 마지막 24비트에서 파생된 Solicited-Node Multicast Address로 전송됨
- Neighbor Advertisement(Reply): Neighbor Solicitation에 대한 응답으로 자신의 MAC 주소를 알리는 데 사용됨. 이 메시지에는 요청된 IPv6 주소와 해당 MAC 주소가 포함됨. 또한, 라우터-플래그(R), 요청-플래그(S), 오버라이드-플래그(O)와 같은 다양한 플래그를 포함하여 노드의 역할(예: 라우터 여부) 및 메시지의 맥락을 나타낼 수 있음

2. Router Discovery(라우터 탐색): IPv6 호스트는 라우터 요청(Router Solicitation) 메시지를 사용하여 네트워크에 있는 라우터를 찾고, 라우터는 라우터 알림(Router Advertisement) 메시지를 통해 자신의 존재와 네트워크 구성 정보(예: IPv6 프리픽스)를 알림
- Router Discovery
- Router Advertisement

3. Prefix Reconfiguration(프리픽스 재구성): 라우터 알림 메시지는 네트워크 프리픽스 정보를 포함하여 호스트가 자신의 IPv6 주소를 동적으로 구성하도록 도움
4. Next-Hop Determination(다음 홉 결정): NDP는 데이터 패킷을 보낼 때 다음 홉(Next Hop) 라우터 또는 목적지 호스트의 링크 계층 주소를 결정하는 데 사용
5. Duplicate Address Detection, DAD(주소 중복 탐지): 새로운 IPv6 주소를 사용하기 전에, 호스트는 네이버 요청 메시지를 사용하여 해당 주소가 네트워크에서 이미 사용되고 있지 않은지 확인함



## Routing

### Statisches Routing
네트워크 관리자가 라우터에 수동으로 경로 정보를 구성하는 방식
- Longest Prefix Matching
    - 라우터가 패킷을 수신하면, 패킷의 목적지 IP 주소와 라우팅 테이블에 있는 각 경로의 네트워크 주소를 비교
    - 이때 가장 길게(가장 구체적으로) 일치하는 프리픽스를 가진 경로를 선택하여 패킷을 전달

### Dynamisches Routing
라우터가 라우팅 프로토콜을 사용하여 네트워크 경로 정보를 자동으로 교환하고 학습하여 라우팅 테이블을 구축하는 방식
1. 거리 벡터(Distance-Vector) 프로토콜 - Bellman-Ford 알고리즘
: 이 프로토콜을 사용하는 라우터는 목적지까지의 다음 홉(Next Hop) 정보와 해당 목적지까지의 거리(Distanz zum Ziel)만을 알고 있으며, 이 정보를 이웃 라우터와 교환
    - RIP (Routing Information Protocol): 가장 간단한 프로토콜 중 하나로, 홉(Hop-Count) 수를 유일한 메트릭(metric)으로 사용합니다. 적은 수의 네트워크에 적합하며 대부분의 라우터에서 지원함. Count-to-Infinity 문제
    - IGRP (Interior Gateway Routing Protocol): 시스코(Cisco)의 독점 프로토콜로, RIP보다 더 복잡한 메트릭을 지원
    - EIGRP (Enhanced Interior Gateway Routing Protocol): IGRP의 후속 프로토콜이며, 시스코의 독점 프로토콜입니다. 수렴(convergence) 특성이 크게 개선되었음


2. 링크 스테이트(Link-State) 프로토콜 - Dijkstras 알고리즘: 이 프로토콜을 사용하는 라우터는 네트워크의 전체 토폴로지(Netztopologie)에 대한 정보를 가집니다. 각 라우터는 자신에게 직접 연결된 링크의 상태 정보를 네트워크 전체에 알리고, 이를 바탕으로 모든 라우터가 네트워크의 전체 지도를 구축함
    - OSPF (Open Shortest Path First)
    - IS-IS (Intermediate System to Intermediate System)

### Autonome Routing

