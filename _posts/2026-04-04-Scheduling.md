---
layout: post
title: Scheduling
date: 2025-10-21 14:28 +0200
categories: [Computer Science, Operating Systems]
tags: [operating-systems, computer-science, scheduling, CFS]
---

# Scheduling

시스템에 존재하는 수많은 프로세스와 스레드가 한정된 CPU 자원을 효율적이고 공정하게 나누어 쓸 수 있도록 실행 순서와 시간을 결정하는 핵심 매커니즘

시스템에는 일반적으로 처리할 수 있는 CPU 코어 수보다 훨씬 많은 프로세스가 존재하기 때문에, 운영체제는 프로세스를 실행(running), 대기(blocked), 준비(ready) 상태로 끊임없이 전이시키며 CPU를 번갈아 할당하는 멀티프로그래밍을 구현함

### Scheduler

- 실행 준비가 완료되어 대기 큐(Run Queue)에 모여 있는 프로세스들 중에서 다음에 CPU를 할당받을 프로세스를 선택
- 시스템의 목적(처리량 극대화, 응답 시간 최소화 등)에 따라 FCFS, Round Robin, CFS 등 특정 스케줄링 알고리즘을 사용하여 어떤 프로세스에게 언제, 얼마 동안 CPU를 줄지 전략적인 결정을 내림 

### Dispatcher 

- 스케줄러가 다음 프로세스를 선택하면, 기존 프로세스의 실행을 멈추고 새 프로세스가 실행될 수 있도록 상태 전이와 문맥 교환(Context Switch)을 직접 실행

- 작동 단계:
1. 현재 실행 중인 프로세스/스레드에서 CPU를 회수하고, 상태를 '대기(blocked)'나 '준비(ready)' 상태로 변경
2. 중단되는 프로세스의 현재 문맥(레지스터 값, 프로그램 카운터 등)을 해당 프로세스의 **PCB에 안전하게 저장(save)**
3. 스케줄러가 선택한 새로운 프로세스의 PCB로부터 문맥 정보를 CPU로 불러옴(reload).
4. 새로운 프로세스의 상태를 '실행 중(running)'으로 변경하고, 시스템을 유저 모드(User Mode)로 전환하여 제어권을 넘겨줌


## Batch Systems

사용자의 직접적인 개입 없이 대량의 작업을 처리하는 시스템 -> 단위 시간당 처리량(Throtughput) 극대화와 전체 실행 시간(Turnaround Time) 최소화가 목표

### FCFS (First-Come-First-Served)

- 먼저 도착한 프로세스에 먼저 CPU를 할당하는 비선점형(Non-preemptive) 방식
- 단순하지만 긴 연산을 수행하는 프로세스가 CPU를 독점할 경우 뒤에 대기하는 짧은 프로세스들의 대기 시간이 급증하는 단점이 있음

### SJF (Shortest Job First)

- 실행 시간이 가장 짧은 프로세스를 먼저 처리하여 평균 대기 시간을 최적화하는 비선점형 방식

### SRTN (Shortest Job First)

- SJF의 선점형(Preemptive) 버전
- 새로운 프로세스가 도착했을 때 그 프로세스의 남은 실행 시간이 현재 실행 중인 프로세스의 남은 시간보다 짧다면 즉시 CPU를 선점하여 실행

## Interactive Systems

사용자와 상호작용하는 PC나 스마트폰 같은 시스템으로, 응답 시간(Response Time) 최소화와 사용자 기대치에 비례하는 자원 분배를 목표로 하여 주로 선점형 전략을 사용

### Round-Robin (RR, Zeitscheibenstrategie)

- 모든 프로세스에 동일한 시간 할당량(Time Quantum)을 부여하고, 시간이 만료되면 타이머 인터럽트를 통해 다음 프로세스로 CPU를 넘김
- 할당량이 너무 짧으면 문맥 교환 오버헤드가 급증하고, 너무 길면 응답성이 떨어지므로 적절한 할당량 설정이 핵심

### Priority Scheduling

- 각 프로세스에 우선순위를 부여하여 높은 순위의 프로세스부터 실행
- 고정된 정적 우선순위를 사용할 경우 낮은 우선순위 프로세스가 영원히 실행되지 못하는 **기아 현상(Starvation)**이 발생할 수 있음 -> 이를 막기 위해 운영체제는 오래 대기한 프로세스의 우선순위를 점진적으로 높이거나, I/O 바운드 프로세스에게 우선순위 부스트(I/O-Boost)를 주는 등의 동적 우선순위 조절(Dynamic Prioritization) 기법을 활용


## Realtime System

차량 엔진 제어나 항공 시스템처럼 특정 작업이 반드시 정해진 마감 시간(Deadline) 내에 완료되어야 하는 예측 가능성이 최우선 목표인 시스템

### EDF (Earliest Deadline First)

마감 시간이 가장 임박한 프로세스를 먼저 실행하며, 설계에 따라 선점형과 비선점형으로 모두 구현할 수 있음

### RMS (Rate-Monotonic Scheduling)

주기적으로 반복 실행되는 프로세스를 위한 선점형 스케줄링입니다. 주기가 짧을수록 (즉, 발생 빈도가 높을수록) 더 높은 우선순위를 정적으로 부여하여 일정 내 처리를 보장


## 현대 운영체제와 멀티코어 환경의 스케줄링 확장

스레드(Thread) 개념의 도입으로 현대 운영체제 커널(예: 리눅스)은 프로세스 단위가 아닌 커널 수준 스레드(Kernel-Level Threads) 단위로 스케줄링을 수행함

### CFS (Completely Fair Scheduler)

고정된 시간 할당량이나 전통적인 우선순위 큐 대신, 프로세스의 가중치(Niceness 값)를 반영한 **가상 실행 시간(Virtual Runtime, vt)**을 계산

### Multicore Scheduling

- 다중 코어 시스템에서 모든 코어가 하나의 전역 큐(Global Queue)를 공유하면 락(Lock) 경합으로 인한 병목 현상과 캐시 지역성(Cache Locality) 저하가 발생
- 각 코어마다 **독립적인 로컬 큐(Local Queue)**를 두어 캐시 효율과 확장성을 높임

#### Work Stealing

- 로컬 큐 구조는 특정 코어에만 작업이 몰리는 부하 불균형(Load Imbalance)을 유발할 수 있으므로, 바쁜 코어의 대기 작업을 한가한 다른 코어가 훔쳐 와서 실행하는 Work Stealing(작업 훔치기) 기법을 통해 전체 시스템의 균형을 유지
