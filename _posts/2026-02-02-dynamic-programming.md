---
layout: post
title: 'Dynamic Programming'
date: 2026-02-02 00:00 +0100
categories: [Data Structures and Algorithms, Algorithms]
tags: [algorithms, dynamic-programming, dp, knapsack, lis, memoization]
math: true
---

# Dynamic Programming (동적 계획법)

### 7.1 Basic Concept

- **Idea:** Solve problem by solving overlapping subproblems, store results to avoid recomputation. / 겹치는 부분 문제를 해결하고 결과를 저장하여 재계산 방지.
- **Key Properties:**
  1. **Optimal Substructure / 최적 부분 구조:** Optimal solution contains optimal solutions to subproblems. / 최적 해가 부분 문제의 최적 해를 포함.
  2. **Overlapping Subproblems / 겹치는 부분 문제:** Same subproblems appear multiple times. / 같은 부분 문제가 여러 번 나타남.
- **Approaches / 접근법:**
  - **Top-Down (Memoization) / 하향식 (메모이제이션):** Recursive with cache. / 재귀 + 캐시.
  - **Bottom-Up / 상향식:** Iterative, fill table in order. / 반복, 순서대로 테이블 채움.

**Top-Down vs Bottom-Up Comparison / 하향식 vs 상향식 비교:**

| Aspect / 측면 | Top-Down / 하향식 | Bottom-Up / 상향식 |
|:---|:---|:---|
| **Implementation** | Recursive / 재귀 | Iterative / 반복 |
| **Computation** | Only needed subproblems / 필요한 부분 문제만 | All smaller subproblems / 모든 작은 부분 문제 |
| **Cache Locality / 캐시 지역성** | Worse / 나쁨 | Better / 좋음 |
| **Memory / 메모리** | Hash map (sparse) / 해시 맵 (희소) | Array (dense) / 배열 (밀집) |
| **Best For / 최적 용도** | Sparse state space / 희소 상태 공간 | Dense state space / 밀집 상태 공간 |

**Dynamic Programming Complexity Comparison / 동적 계획법 복잡도 비교:**

| Problem / 문제 | Naive / 순수 | DP (Top-Down) / DP (하향식) | DP (Bottom-Up) / DP (상향식) | Optimized / 최적화 |
|:---|:---|:---|:---|:---|
| **Fibonacci** | $\mathcal{O}(2^n)$ | $\mathcal{O}(n)$ | $\mathcal{O}(n)$ | $\mathcal{O}(\log n)$ (matrix exponentiation) / 행렬 거듭제곱 |
| **0/1 Knapsack** | $\mathcal{O}(2^n)$ | $\mathcal{O}(n \cdot W)$ | $\mathcal{O}(n \cdot W)$ | Space: $\mathcal{O}(W)$ (1D array) / 공간: $\mathcal{O}(W)$ (1D 배열) |
| **LIS** | $\mathcal{O}(2^n)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(n \log n)$ (binary search) / 이진 탐색 |
| **Edit Distance** | $\mathcal{O}(3^{m+n})$ | $\mathcal{O}(mn)$ | $\mathcal{O}(mn)$ | Space: $\mathcal{O}(\min(m,n))$ / 공간: $\mathcal{O}(\min(m,n))$ |

**Space Optimization Techniques / 공간 최적화 기법:**
- **2D → 1D:** If current state only depends on previous row/column. / 현재 상태가 이전 행/열에만 의존.
  - Example: Knapsack `dp[i][w]` → `dp[w]` (iterate backwards). / 예: 배낭 `dp[i][w]` → `dp[w]` (역순 반복).
- **Rolling Array:** Keep only last 2 rows. / 마지막 2행만 유지.
  - Example: `dp[i%2][j]` instead of `dp[i][j]`. / 예: `dp[i][j]` 대신 `dp[i%2][j]`.

**Possible Questions:**
- When do you use DP? (EN: When problem has optimal substructure and overlapping subproblems. KR: 문제가 최적 부분 구조와 겹치는 부분 문제를 가질 때.)
- Compare top-down and bottom-up. (EN: Top-down: recursive, only computes needed subproblems. Bottom-up: iterative, better cache locality. KR: 하향식: 재귀, 필요한 부분 문제만 계산. 상향식: 반복, 더 나은 캐시 지역성.)

---

### 7.2 Examples

#### Fibonacci

- **Naive Recursive / 순수 재귀:** $\mathcal{O}(2^n)$ - exponential due to redundant calls. / $\mathcal{O}(2^n)$ - 중복 호출로 지수적.
- **DP:** $\mathcal{O}(n)$ - linear, store computed values. / $\mathcal{O}(n)$ - 선형, 계산된 값 저장.

---

#### 0/1 Knapsack

- **State / 상태:** $dp[i][w]$ = maximum value using first $i$ items with capacity $w$. / $dp[i][w]$ = 처음 $i$개 항목으로 용량 $w$에서 최대 가치.
- **Recurrence / 점화식:**
  $$dp[i][w] = \max(dp[i-1][w], dp[i-1][w-w_i] + v_i)$$
- **Time Complexity / 시간 복잡도:** $\mathcal{O}(n \cdot W)$ where $W$ is capacity. / $\mathcal{O}(n \cdot W)$ ($W$는 용량).

**Visualization / 시각화:**

**Knapsack DP Table Example:**
```
Items: (weight, value)
Item 1: (2, 3)
Item 2: (3, 4)
Item 3: (4, 5)
Capacity W = 5

DP Table dp[i][w]:
        w=0  w=1  w=2  w=3  w=4  w=5
i=0 [    0    0    0    0    0    0 ]
i=1 [    0    0    3    3    3    3 ]  (item 1)
i=2 [    0    0    3    4    4    7 ]  (item 1,2)
i=3 [    0    0    3    4    5    7 ]  (item 1,2,3)

Answer: dp[3][5] = 7
Reconstruction: item 2 (w=3, v=4) + item 1 (w=2, v=3) = 7
```

---

#### Longest Increasing Subsequence (LIS)

- **Naive DP / 순수 DP:** $\mathcal{O}(n^2)$ - $dp[i]$ = length of LIS ending at $i$. / $\mathcal{O}(n^2)$ - $dp[i]$ = $i$에서 끝나는 LIS 길이.
- **Optimized / 최적화:** $\mathcal{O}(n \log n)$ - maintain array $m[l]$ = minimum last element of LIS of length $l$, use binary search. / $\mathcal{O}(n \log n)$ - $m[l]$ = 길이 $l$의 LIS의 최소 마지막 원소 유지, 이진 탐색 사용.

**Visualization / 시각화:**

**LIS O(n²) DP Example:**
```
Array: [3, 1, 4, 1, 5, 9, 2, 6]

dp[i] = length of LIS ending at position i

i=0: [3] → dp[0] = 1
i=1: [1] → dp[1] = 1 (no previous smaller)
i=2: [3,4] or [1,4] → dp[2] = 2
i=3: [1] → dp[3] = 1
i=4: [3,4,5] or [1,4,5] → dp[4] = 3
i=5: [3,4,5,9] → dp[5] = 4
i=6: [1,2] → dp[6] = 2
i=7: [3,4,5,6] → dp[7] = 4

dp = [1, 1, 2, 1, 3, 4, 2, 4]
LIS length = max(dp) = 4
```

**LIS O(n log n) Optimization:**
```
Array: [3, 1, 4, 1, 5, 9, 2, 6]

m[l] = minimum last element of LIS of length l

Process each element:
  Element 3: m[1] = 3
    m = [∞, 3, ∞, ∞, ...]
  
  Element 1: m[1] = 1 (update, 1 < 3)
    m = [∞, 1, ∞, ∞, ...]
  
  Element 4: m[2] = 4 (extend LIS of length 1)
    m = [∞, 1, 4, ∞, ...]
  
  Element 1: m[1] = 1 (no change, 1 = 1)
    m = [∞, 1, 4, ∞, ...]
  
  Element 5: m[3] = 5 (extend LIS of length 2)
    m = [∞, 1, 4, 5, ∞, ...]
  
  Element 9: m[4] = 9 (extend LIS of length 3)
    m = [∞, 1, 4, 5, 9, ∞, ...]
  
  Element 2: m[2] = 2 (update, 2 < 4)
    m = [∞, 1, 2, 5, 9, ∞, ...]
  
  Element 6: m[4] = 6 (update, 6 < 9)
    m = [∞, 1, 2, 5, 6, ∞, ...]

LIS length = 4 (last non-∞ index)
```

**Real Problem Applications:**
- **Potato Farmers (pot):** LIS variant. We want a sequence where IQ decreases ($q_{f_1} > q_{f_2} > ...$) and weight increases ($w_{f_1} < w_{f_2} < ...$). Solution: Sort farmers by IQ descending, then find LIS on weight. This ensures IQ decreases (by sorting) and weight increases (by LIS). (EN: Two-dimensional LIS - sort by one dimension, find LIS on the other. KR: 2차원 LIS - 한 차원으로 정렬, 다른 차원에서 LIS 찾기.)
- **Non-negative Partial Sums (non):** DP with prefix sums. For each cyclic shift, we check if all prefix sums are non-negative. We use prefix sum array and check each starting position. (EN: Prefix sum technique to check all partial sums for each cyclic shift. KR: 각 순환 이동에 대해 모든 부분합을 확인하기 위한 접두사 합 기법.)
- **Story Time (sto):** DP on DAG. We need to count valid orderings of chapters respecting dependencies and character constraints. This is a counting DP problem on a topological ordering. (EN: Counting DP on DAG - count valid topological orderings with additional constraints. KR: DAG에서의 계수 DP - 추가 제약 조건이 있는 유효한 위상 순서의 개수.)

**Possible Questions:**
- Explain the LIS $\mathcal{O}(n \log n)$ algorithm. (EN: Maintain array m[l] = min last element of LIS of length l. For each element, binary search for position to extend or improve. KR: 배열 m[l] = 길이 l의 LIS의 최소 마지막 원소 유지. 각 원소에 대해 확장하거나 개선할 위치를 이진 탐색.)
- How do you reconstruct the solution in knapsack? (EN: Backtrack: if dp[i][w] != dp[i-1][w], item i was included. KR: 역추적: dp[i][w] != dp[i-1][w]이면 항목 i가 포함됨.)

**References:**
* [https://www.geeksforgeeks.org/dsa/introduction-to-dynamic-programming-data-structures-and-algorithm-tutorials/](https://www.geeksforgeeks.org/dsa/introduction-to-dynamic-programming-data-structures-and-algorithm-tutorials/)

