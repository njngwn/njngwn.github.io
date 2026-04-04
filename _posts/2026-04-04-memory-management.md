---
layout: post
title: Memory Management (Speicherverwaltung)
date: 2026-04-04 19:46 +0200
categories: [Computer Science, Operating Systems]
tags: [operating-systems, computer-science]
---

# Memory Management (Speicherverwaltung)

> 한정된 RAM을 어떻게 효율적으로 쪼개 쓰고, 부족할 때 HDD를 어떻게 빌려 쓰는지
{: .prompt-tip }

- 과거에는 프로그램이 물리적 주소에 직접 접근(Direkte Adressierung)했으나, 이는 프로그램이 운영체제나 다른 프로그램의 메모리를 침범하여 시스템을 붕괴시킬 위험이 큼
- 운영체제는 각 프로세스에게 0부터 시작하는 고유하고 독립적인 가상 주소 공간(Virtueller Adressraum)을 부여하여 프로세스를 서로 완벽히 격리함


## Paging

- Memory Management Unit (MMU)
- Translation Lookaside Buffer (TLB)

### Page Replacement Strategies

- Page Fault(프로세스가 접근하려는 페이지가 현재 물리 메모리에 없는 상황)가 발생할 때, 운영체제는 디스크에서 해당 페이지를 메모리로 불러와야 함
- 메모리가 꽉 찼을 경우 어떤 페이지를 내쫓을지 결정해야 함

#### 1. FIFO (First-In, First-Out)

#### 2. Clock / Second-Chance

#### 3. LRU (Least Recently Used) & Aging

#### 4. Working Set


---

## 빈 공간 관리 및 할당 (Freispeicherverwaltung)

페이지 단위가 아닌, 연속된 물리적 메모리 블록을 어떻게 쪼개고 관리할 것인가

### Buddy Algorithm

- 외부 단편화(External Fragmentation)을 줄일 수 있음