---
layout: post
title: Media Access Control Method Comparison
date: 2025-09-21 20:26 +0200
categories: [Comptuer Science, Network]
tags: [network, computer-science]
---

## Medienzugriffsverfahren 비교 (Media Access Control Method Comparison)

제공된 소스에 기반하여 다양한 매체 접근 제어 방식(Medienzugriffsverfahren)을 비교한 표는 다음과 같습니다. 이 방식들은 여러 스테이션이 공유 매체(예: 케이블, 무선 주파수)에 접근하는 방법을 제어하며, 크게 **경쟁 기반 접속(konkurrierender Zugriff)**과 **규칙 기반 접속(geregelter Zugriff)**으로 나눌 수 있습니다.

| Verfahren (방식) | Grundprinzip (기본 원리) | Art des Zugriffs (접속 유형) | Kollisionsbehandlung (충돌 처리) | Vorteile (장점) | Nachteile (단점) | Typische Anwendung (대표적 적용 사례) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ALOHA** | 데이터가 발생하면 즉시 전송합니다. | 경쟁 기반 (Konkurrierend) | 충돌은 발생하며, 별도의 주파수를 통해 수신 확인(Acknowledgement)을 받지 못하면 충돌로 간주하고 재전송합니다. | 원리가 매우 간단합니다. | 충돌 확률이 높아 채널 효율이 약 18%로 매우 낮습니다. | 초기 무선 데이터 통신. |
| **Slotted ALOHA** | 정해진 시간 슬롯(Zeitslot)의 시작 시점에만 전송을 시작합니다. | 경쟁 기반 (Konkurrierend) | 충돌이 발생할 수 있는 위험 구간이 ALOHA의 절반으로 줄어듭니다. | 순수 ALOHA보다 효율이 개선되어 약 37%의 채널 효율을 보입니다. | 여전히 비효율적이며, 모든 스테이션 간의 시간 동기화가 필요합니다. | ALOHA의 개선된 버전. |
| **CSMA/CD** (Collision Detection) | **"Listen before talk"**: 전송 전 매체가 비어 있는지 확인합니다. 전송 중에 충돌이 감지되면 즉시 전송을 중단하고 JAM 신호를 보낸 후, Binary Exponential Backoff 알고리즘에 따라 임의의 시간 동안 대기 후 재전송합니다. | 경쟁 기반 (Konkurrierend) | 전송 중에 **충돌을 감지(Collision Detection)**합니다. 충돌이 감지되지 않으면 전송이 성공한 것으로 간주합니다. | ALOHA보다 효율적입니다. 충돌이 없을 경우 별도의 수신 확인이 필요 없습니다. | "히든 스테이션(Hidden Station)" 문제 등으로 인해 무선 네트워크에서는 일반적으로 작동하지 않습니다. 최소 프레임 길이가 요구됩니다. | 유선 이더넷(IEEE 802.3). |
| **CSMA/CA** (Collision Avoidance) | **"Listen before talk"** 원리를 따르되, 매체가 비어 있더라도 바로 전송하지 않고 경합 시간(Contention Window) 동안 임의의 시간만큼 대기하여 충돌을 피하고자 합니다. 링크 계층에서 수신 확인(ACK)을 사용하여 전송 성공 여부를 확인합니다. | 경쟁 기반 (Konkurrierend) | **충돌 회피(Collision Avoidance)**를 목표로 합니다. RTS/CTS(Request to Send/Clear to Send) 메커니즘을 사용하여 "히든 스테이션" 문제를 완화할 수 있습니다. | 충돌 감지가 어려운 무선 네트워크에 적합합니다. | 경합 시간 및 수신 확인으로 인한 오버헤드가 있습니다. | 무선랜(WLAN, IEEE 802.11). |
| **Token Passing** | 스테이션들이 논리적 링(Ring)을 형성하고, **토큰(Token)이라는 특별한 프레임**을 순환시킵니다. 토큰을 가진 스테이션만 전송할 권한을 가집니다. | 규칙 기반 / 결정론적 (Geregelt / Deterministisch) | 설계상 **충돌이 발생하지 않습니다**. | 충돌이 없어 효율적이며, 최대 전송 지연 시간을 보장할 수 있습니다(결정론적). | 토큰 분실 시 복구 메커니즘이 필요하며(모니터 스테이션), 한 노드의 오류가 전체 링의 통신을 방해할 수 있습니다. 부하가 적을 때도 토큰을 기다려야 하므로 지연이 발생할 수 있습니다. | 토큰 링(IEEE 802.5), FDDI. 현재는 대부분 이더넷으로 대체되었습니다. |