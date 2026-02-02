---
layout: post
title: 'Greedy & Approximation Algorithms'
date: 2026-02-02 00:00 +0100
categories: [Data Structures and Algorithms, Algorithms]
tags: [algorithms, greedy, approximation, interval-scheduling, change-making]
math: true
---

## 6. Greedy & Approximation (탐욕법 & 근사 알고리즘)

### 6.1 Greedy Algorithms

- **Paradigm / 패러다임:** Make locally optimal choices, never reconsider. / 지역적으로 최적 선택, 재고려하지 않음.
- **Pros / 장점:** Simple, fast, good heuristics. / 간단, 빠름, 좋은 휴리스틱.
- **Cons / 단점:** Often non-optimal. / 종종 비최적.
- **Template / 템플릿:**
  1. Maintain solution set $S$. / 해 집합 $S$ 유지.
  2. While candidates exist and solution incomplete: / 후보가 있고 해가 불완전한 동안:
     - Select best candidate $c$ (by some criterion). / 최선의 후보 $c$ 선택 (어떤 기준으로).
     - If feasible, add to $S$. / 가능하면 $S$에 추가.
- **Optimality / 최적성:** Greedy is optimal iff problem has matroid structure (Edmonds-Rado theorem). / 문제가 매트로이드 구조를 가지면 탐욕법이 최적 (Edmonds-Rado 정리).

**Visualization / 시각화:**

**Greedy Interval Scheduling:**
```
Intervals: [1,3], [2,5], [4,7], [6,8], [9,10]
           (prize: 5)  (3)    (4)    (2)    (6)

Sort by end time: [1,3], [2,5], [4,7], [6,8], [9,10]

Greedy selection:
1. Pick [1,3] (earliest end) → selected: {[1,3]}
2. Next available: [4,7] (doesn't overlap) → selected: {[1,3], [4,7]}
3. Next available: [6,8] (overlaps with [4,7]) → skip
4. Next available: [9,10] (doesn't overlap) → selected: {[1,3], [4,7], [9,10]}

Total prize: 5 + 4 + 6 = 15

Timeline:
  1---3    4---7    9--10
  ✓        ✓        ✓
    2---5    6---8
    ✗        ✗
```

**Greedy Change Making:**
```
Coins: [50, 20, 10, 5, 1]
Target: 87

Greedy:
  87 ÷ 50 = 1 → use 1×50, remainder 37
  37 ÷ 20 = 1 → use 1×20, remainder 17
  17 ÷ 10 = 1 → use 1×10, remainder 7
  7 ÷ 5 = 1 → use 1×5, remainder 2
  2 ÷ 1 = 2 → use 2×1, remainder 0

Solution: 1×50 + 1×20 + 1×10 + 1×5 + 2×1 = 5 coins
```

**Real Problem Applications:**
- **Poker (pok):** Interval scheduling problem. Given tournaments with start time, end time, and prize, select non-overlapping tournaments to maximize total prize. Greedy: sort by end time, always pick next tournament that doesn't overlap and has highest prize among available. (EN: Weighted interval scheduling - select non-overlapping intervals with maximum total weight. Greedy by end time works. KR: 가중치 간격 스케줄링 - 겹치지 않는 간격을 최대 가중치 합으로 선택. 종료 시간 기준 탐욕법이 작동합니다.)
- **Goat Riders (goa):** Maximum bipartite matching or flow problem, but can be solved with greedy matching in some cases. The problem asks: maximum number of goat riders that can survive by moving to safe positions each day. (EN: Matching problem - match riders to safe positions over time. Can use greedy or flow. KR: 매칭 문제 - 시간에 따라 라이더를 안전한 위치에 매칭. 탐욕법 또는 유량 사용 가능.)

---

### 6.2 Change Making

- **Problem / 문제:** Give change using minimum number of coins. / 최소 동전 수로 거스름돈 주기.
- **Greedy Strategy / 탐욕 전략:** Always use largest coin that fits. / 항상 맞는 가장 큰 동전 사용.
- **When optimal / 최적일 때:** Canonical coin systems (e.g., CAD, EUR). / 정규 동전 체계 (예: CAD, EUR).
- **When fails / 실패할 때:** Non-canonical systems (e.g., coins 50, 20, target 60: greedy picks 50, can't complete; optimal is 3×20). / 비정규 체계 (예: 동전 50, 20, 목표 60: 탐욕법은 50 선택 후 완성 불가; 최적은 3×20).
- **Canonical Systems / 정규 체계:** 
  - $n \in \{1, 2\}$: Always canonical. / 항상 정규.
  - $n=3$: Canonical iff $r=0$ or $c_2 - q \le 0$ (where $c_3 = q \cdot c_2 + r$). / $c_3 = q \cdot c_2 + r$일 때 $r=0$이거나 $c_2 - q \le 0$이면 정규.
  - Research: Characterization known up to $n=6$. / 연구: $n=6$까지 특성화 알려짐.
- **Frobenius Coin Problem / 프로베니우스 동전 문제:** Find smallest $m_0$ such that all $m \ge m_0$ are representable. / 모든 $m \ge m_0$가 표현 가능한 최소 $m_0$ 찾기.
- **Complexity / 복잡도:** Finding optimal solution for arbitrary currencies is **NP-hard**. / 임의의 통화에 대한 최적 해 찾기는 **NP-hard**.

---

### 6.3 Approximation Algorithms

- **Definition / 정의:** Polynomial-time algorithm with guaranteed approximation ratio. / 보장된 근사 비율을 가진 다항 시간 알고리즘.
- **k-factor approximation / k-근사:** Solution value is within factor $k$ of optimal: / 해 값이 최적의 $k$ 배 이내:
  $$\frac{1}{k} \cdot OPT(I) \le A(I) \le k \cdot OPT(I)$$
- **Examples / 예시:**
  - Knapsack: 1/2-approximation (greedy vs best single item). / 배낭: 1/2-근사 (탐욕법 vs 최고 단일 항목).
  - Job Scheduling: 2-approximation (basic greedy), 3/2-approximation (ordered greedy). / 작업 스케줄링: 2-근사 (기본 탐욕법), 3/2-근사 (순서 탐욕법).
  - Facility Location: 2-approximation (greedy). / 시설 위치: 2-근사 (탐욕법).

**Greedy vs DP vs Approximation Comparison / 탐욕법 vs DP vs 근사 비교:**

| Problem Type / 문제 유형 | Greedy / 탐욕법 | DP / 동적 계획법 | Approximation / 근사 |
|:---|:---|:---|:---|
| **Optimal? / 최적?** | Sometimes / 때때로 | Always / 항상 | Guaranteed ratio / 보장된 비율 |
| **Time Complexity / 시간 복잡도** | Usually $\mathcal{O}(n \log n)$ or $\mathcal{O}(n)$ / 보통 $\mathcal{O}(n \log n)$ 또는 $\mathcal{O}(n)$ | Usually $\mathcal{O}(n^2)$ or higher / 보통 $\mathcal{O}(n^2)$ 이상 | Polynomial / 다항 시간 |
| **When Optimal / 최적일 때** | Matroid structure / 매트로이드 구조 | Optimal substructure + overlapping subproblems / 최적 부분 구조 + 겹치는 부분 문제 | NP-hard problems / NP-hard 문제 |
| **Examples / 예시** | MST, Interval Scheduling / MST, 간격 스케줄링 | Knapsack, LIS / 배낭, LIS | Job Scheduling (2-approx) / 작업 스케줄링 (2-근사) |

**Approximation Ratio Examples / 근사 비율 예시:**

| Problem / 문제 | Algorithm / 알고리즘 | Approximation Ratio / 근사 비율 | Proof Idea / 증명 아이디어 |
|:---|:---|:---|:---|
| **Job Scheduling** | Greedy (assign to least loaded) / 탐욕법 (최소 부하에 할당) | 2-approximation / 2-근사 | Last job: load ≤ OPT + d_max ≤ 2·OPT |
| **Knapsack** | Greedy (value/weight ratio) / 탐욕법 (가치/무게 비율) | 1/2-approximation / 1/2-근사 | max(greedy, best item) ≥ OPT/2 |
| **Facility Location** | Greedy / 탐욕법 | 2-approximation / 2-근사 | Cost analysis / 비용 분석 |

**Possible Questions:**
- What is a k-factor approximation? (EN: Algorithm that guarantees solution within factor k of optimal. KR: 최적의 k배 이내의 해를 보장하는 알고리즘.)
- Prove the 2-approximation for job scheduling. (EN: OPT >= max(d_i) and OPT >= (sum d_i)/m. Last job added to max-load processor: load <= OPT + d_i <= OPT + OPT = 2*OPT. KR: OPT >= max(d_i)이고 OPT >= (sum d_i)/m. 최대 부하 프로세서에 마지막으로 추가된 작업: 부하 <= OPT + d_i <= OPT + OPT = 2*OPT.)
- When is greedy optimal? (EN: When problem has matroid structure (Edmonds-Rado theorem). Examples: MST, interval scheduling. KR: 문제가 매트로이드 구조를 가질 때 (Edmonds-Rado 정리). 예: MST, 간격 스케줄링.)

