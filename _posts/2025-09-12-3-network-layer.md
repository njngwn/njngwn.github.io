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




## Routing

### Statisches Routing

### Dynamisches Routing

### Autonome Routing

