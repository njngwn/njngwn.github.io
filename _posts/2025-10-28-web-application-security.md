---
layout: post
title: Web Application Security
date: 2025-10-28 16:20 +0100
categories: [Computer Science, IT Security]
tags: [it-security, computer-science]
mermaid: true
---

# Web Application Security

## Schutzziele

| Schutzziele | Definition | Erklärung | Angriffe Beispiele | Schutzkonzepte |
| --- | --- | --- | --- | --- |
| Vertraulichkeit</br>(confidentiality) | Schutz vor unautorisierter Informationsgewinnung | 인가된 사용자만 정보에 접근할 수 있어야 함. (정보의 비밀 보장) |  Abhören, Passwort knacken |
| Integrität</br>(integrity) | Schutz vor unautorisierter und unbemerkter Modifikation | 정보가 무단으로 변경되거나 삭제되지 않았음을 보장함 (정확성, 완전성) | Buffer-Overflow, SQL-Injection |
| Verfügbarkeit</br>(availability) | Schutz vor unbefugter Beeinträchtigung der Funktionalität | 인가된 사용자가 원하는 시간에 정보나 시스템에 접근할 수 있어야 함 | Ransomware, Spam |
| Authentizität</br>(authenticity) | Nachweis der Echtheit und Glaubwürdigkeit der Identität einer handelnden Entität (natürliche Person, Maschine, Dienst, …) oder eines zu nutzenden Objekts | 정보의 출처나 사용자의 신원이 주장하는 것과 같음을 보장함 (위조되지 않음) | Phishing, Man-in-the-Middle | Passwort und 2ter Faktor: Token, biometrischer Fingerabdruck,</br> • Digitaler Personalausweis |
| Verbindlichkeit, Zurechenbarkeit</br>(accountability) | Schutz vor unzulässigem Abstreiten durchgeführter Handlungen | 특정 행위를 수행한 주체를 명확히 하고, 나중에 그 행위를 부인(Abstreitbarkeit)할 수 없도록 함 | Identitätsdiebstahl, Mailadresse fälschen | Digitale/elektronische Signatur, ggf. Blockchain |
| Privatheit</br>(privacy) | Die Fähigkeit einer natürlichen Person, die Weitergabe und Nutzung seiner personenbeziehbaren Daten zu kontrollieren (informationelle Selbstbestimmung) | 개인이 자신의 정보가 언제, 어떻게, 누구에게 공개될지 통제할 수 있어야 함 | Profilbildung, Data-Analytics | u.a. Anonymisierung, Pseudonymisierung |


## Security-Policy

### Same-Origin-Policy (SOP)
* kontrolliert wie Code geladen aus einem Origin auf Ressourcen andrer Origins zugreifen kann. "동일한 웹사이트", 즉 "same origin"에서 온 객체/콘텐츠에만 접근이 허용됨
* Origin (Beispiel: https://mail.google.com:443)
    * scheme (Protokoll): v
    * hostname: mail.google.com
    * port: 443
* Netzwerkzugriff
    * Cross Origin Writes -> erlaubt
    * Cross Origin Embedding -> erlaubt
    * Cross Origin Reads -> nicht erlaubt
* API und Storage Zugriff
    * https://developer.mozilla.org/de/docs/Web/Security/Same-origin_policy
* Cross Origin Resource Sharing (CORS) Mechanismen erlauben es z.B. API Endpunkten dem Browser mitzuteilen, welche Origins die Antwort erhalten dürfen.
* XSS 공격으로 SOP를 무력화할 수 있음


## Web Application Attacks

### Cross-Site Request Forgery (CSRF)

* Die Same Origin Polict verhindert nur cross origin reads. 신뢰하는 사이트를 향해 악성 요청을 보내 행동을 강제하는(Write) 공격
* CSRF 공격은 SOP가 막지 않는 영역을 악용함. SOP는 다른 출처의 데이터를 **읽는 것(read)**을 막지만, 다른 출처로 요청을 **보내는 것(write/send)**은 막지 않음. CSRF는 바로 이 "보내는" 행위를 위조하는 공격

#### Lösungen
* session cookie schützen: SameSite: strict (später)
* CSRF Token im form
* Die Seite könnte cross origin requests ablehnen


### Cross-Site Scripting (XSS)

* 신뢰하는 사이트에 악성 코드를 심어 정보를 훔치는(Read) 공격
* XSS 공격은 SOP의 보호를 우회하거나 무력화시킵니다. 공격자는 신뢰받는 사이트(예: bank.de)에 스크립트를 주입합니다. 브라우저는 이 스크립트가 bank.de의 "일부"라고 착각하게 됩니다. 그 결과, 이 스크립트는 "동일 출처(Same-Origin)"에서 실행되는 것으로 인정되어, SOP의 제약을 받지 않고 bank.de의 쿠키나 데이터를 마음대로 읽을(read) 수 있게 됩니다

```mermaid
sequenceDiagram
    participant Angreifer
    participant Nutzer
    participant Server

    Angreifer->>Server: hackert auf DB
    right of Angreifer: attacker-server.de/cookie
    Nutzer->>Server: name=<xss>
    Server->>Nutzer: 
    Nutzer->>Angreifer: cookie
```

### Stored XSS (저장형)

![Stored-XSS](/assets/img/it-security/stored-xss.png) _Source: AhnLab_

공격자의 악성 스크립트가 웹사이트의 데이터베이스에 저장됩니다 (예: 게시판 글, 사용자 프로필). 다른 사용자가 이 글을 읽을 때마다 스크립트가 실행됩니다.

### Reflected XSS (반사형)

![Reflected-XSS](/assets/img/it-security/reflexted-xss.png) _Source: AhnLab_

악성 스크립트가 URL 파라미터 등 을 통해 서버로 전송됩니다. 서버는 이 스크립트를 저장하지 않고, 응답 HTML에 **즉시 "반사"**하여 사용자에게 보냅니다. 사용자가 공격자가 보낸 악성 링크를 클릭할 때만 작동합니다


## Sicherheitsattribute Cookies
| | |
|---|---|
| HttpOnly | Verhindert auslesen aus JS (document.cooke) |
| Secure | Ausschließlich verschlüsselte (https) Übertragung |
| SameSite | Mitschicken bei cross origin requests</br>* None immer</br>* Lax navigation ∧¬ startusändernd</br>* strict nie |


## Nutzer Authentifizierung

immer im Server!

* code im client kann vom nutzer geändert entfernt etc. werden

## References
* https://studysteadily.tistory.com/9
* https://www.wallarm.com/what/what-is-the-difference-between-csrf-and-xss
* https://www.jit.io/resources/app-security/xss-vs-csrf