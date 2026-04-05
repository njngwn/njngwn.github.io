---
layout: post
title: File Systems (Dateisysteme) Architecture
date: 2026-04-04 19:45 +0200
categories: [Computer Science, Operating Systems]
tags: [operating-systems, computer-science]
---

> 응용 프로그램이 만들어낸 논리적인 데이터를 하드디스크의 물리적인 블록에 어떻게 맵핑하고, 이를 어떻게 빠르고 안전하게 관리할 것인가
{: .prompt-tip }

# File System (Dateisysteme) Architecture

 운영체제는 하드디스크의 복잡한 물리적 구조(섹터, 실린더 등)를 숨기고 **'파일(File)'**이라는 논리적 단위로 추상화함
 
## File

- Everything is a file: 유닉스/리눅스 환경에서는 단순한 텍스트 데이터뿐만 아니라 디렉터리, 마우스/키보드(Character Special Files), 하드디스크(Block Special Files) 등 시스템의 모든 요소를 파일로 취급하여 관리함

## 물리적 할당 전략

### 연속 할당 방식 (Contiguous Allocation)

- 파일의 블록들을 디스크에 물리적으로 연속되게 일렬로 저장
- 구현이 쉽고 읽기 속도가 가장 빠름
- 파일을 지우고 쓰다 보면 중간중간에 빈 공간이 버려지는 외부 단편화(Externe Fragmentierung) 문제가 발생


### 연결 리스트 방식 (Linked List)

- 블록들을 흩어놓되, 블록의 끝에 '다음 블록의 주소'를 적어 연결 리스트로 만듦
- 외부 단편화는 해결되지만 임의 접근(Random Access)이 느려짐 -> 이를  보완하기 위해 포인터들을 메모리(RAM)에 표 형태로 모아둔 것이 FAT

#### FAT (File Allocation Table)


### i-node 방식 (Index-node)

- 파일의 메타데이터(크기, 권한 등)와 데이터 블록의 주소(포인터)를 하나의 i-node라는 인덱스 테이블에 모아둠
- 파일이 커지면 간접(single), 이중 간접(double), 삼중 간접(triple) 포인터를 사용하여 수십 기가바이트에서 테라바이트 단위의 거대한 파일도 효율적으로 관리할 수 있음

#### ext

| 구분 | ext2 | ext3 | ext4 |
| :--- | :---: | :---: | :---: |
| **핵심 컨셉** | 초기 표준 (기본형) | 안정성 강화 (+Journaling) | 성능 & 대용량 최적화 |
| **저널링 (Journaling)** | 지원 안 함 | **지원 함** | **지원 함** |
| **블록 관리 방식** | Block Mapping (i-node) | Block Mapping (i-node) | **Extents (범위 지정 방식)** |
| **최대 파일 크기** | 2 TiB | 2 TiB | **16 TiB** |
| **최대 볼륨 크기** | 32 TiB | 32 TiB | **1 EiB (약 100만 TiB)** |
| **복구 속도 (fsck)** | 매우 느림 | 빠름 | **매우 빠름** |
| **주요 특징** | 단순하고 가벼움 | 사고 시 데이터 유실 방지 | 파편화 방지 및 속도 향상 |

![Backtracking-Image](/assets/img/operating-system/Ext2-inode.svg.png) _Source: Wikimedia Commons_

## 안정성과 성능 최적화

### 안정성 - Journaling

파일 삭제나 생성 도중 시스템이 크래시 났을 때 데이터 일관성이 깨지는 것을 막기 위해, 디스크에 쓰기 전에 수행할 작접을 미리 로그(저널)에 기록해두는 기술

### 성능 최적화

- Buffer Cache: 느린 디스크 접근 속도를 극복하기 위해 자주 쓰는 블록을 메모리에 캐싱
- Read-Ahead: 앞으로 읽을 데이터를 미리 읽어오기
- Defragmentierung: 파편화된 디스크를 정리

### 가상 파일 시스템 (VFS)

ext, FAT 등 서로 다른 파일 시스템들을 통합하여 사용자에게 일관된 인터페이스(open, read, write)를 제공하는 계층에 대해서도 덧붙일 수 있음
