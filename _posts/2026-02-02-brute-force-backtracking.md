---
layout: post
title: 'Brute Force & Backtracking'
date: 2026-02-02 00:00 +0100
categories: [Data Structures and Algorithms, Algorithms]
tags: [algorithms, brute-force, backtracking, branch-and-bound, meet-in-the-middle]
math: true
---

# Brute Force & Backtracking (브루트 포스 & 백트래킹)

### 5.1 Brute Force

- **Definition / 정의:** Systematically enumerate all solution candidates and test each. / 모든 해 후보를 체계적으로 열거하고 각각 테스트.
- **Pros / 장점:** Simple, sound and complete, finds optimal solution. / 간단, 완전하고 정확, 최적 해 찾음.
- **Cons / 단점:** Inefficient, combinatorial explosion for large inputs. / 비효율적, 큰 입력에서 조합 폭발.

**Combinatorial Explosion / 조합 폭발:**
```
Example: Password brute force (without restrictions)

| Allowed Chars | Length | Search Space | Approx. Time |
|:---|:---|:---|:---|
| 0-9 | 5 | 10⁵ | Instant |
| a-z | 5 | 26⁵ ≈ 1.1×10⁷ | Instant |
| a-z, A-Z, 0-9 | 5 | 62⁵ ≈ 9.1×10⁸ | Seconds |
| a-z, A-Z, 0-9 | 8 | 62⁸ ≈ 2.1×10¹⁴ | Hours/Days |
| a-z, A-Z, 0-9 | 10 | 62¹⁰ ≈ 8.3×10¹⁷ | Years |
| ASCII | 10 | 128¹⁰ ≈ 10²¹ | Centuries |
```

**When to Use / 사용 시기:**
- Small input size (e.g., $n \le 20$ for $2^n$ problems). / 작은 입력 크기 (예: $2^n$ 문제에서 $n \le 20$).
- Safety-critical applications (simplicity over speed). / 안전 중요 응용 (속도보다 단순성).
- Benchmark for faster methods. / 더 빠른 방법의 벤치마크.

---

### 5.2 Backtracking

- **Idea:** Construct candidates incrementally, abandon if cannot extend to valid solution. / 후보를 점진적으로 구성, 유효한 해로 확장 불가능하면 포기.
- **Key Functions:**
  - `valid(c)`: Check if partial solution $c$ violates constraints. / 부분 해 $c$가 제약을 위반하는지 확인.
  - `completed(c)`: Check if solution is complete. / 해가 완성되었는지 확인.
  - `next(c)`: Generate possible extensions. / 가능한 확장 생성.
- **Algorithm / 알고리즘:** DFS on solution tree, prune invalid branches. / 해 트리에서 DFS, 유효하지 않은 가지 제거.
- **Examples / 예시:** Sudoku, N-Queens. / 스도쿠, N-퀸.

**Visualization / 시각화:**

**N-Queens Backtracking (4-Queens):**
```
Solution Tree:
                    [ ]
                   / | | \
              [Q1] [Q1] [Q1] [Q1]
              /|\   /|\   /|\   /|\
          [Q2]... [Q2]... [Q2]... [Q2]...
          /|\     /|\     /|\     /|\
      [Q3]... [Q3]... [Q3]... [Q3]...
      /|\     /|\     /|\     /|\
  [Q4]... [Q4]... [Q4]... [Q4]...

Example path (valid solution):
Row 1: Q at col 2
  [. Q . .]
  [. . . .]
  [. . . .]
  [. . . .]

Row 2: Q at col 4 (check: not attacked)
  [. Q . .]
  [. . . Q]
  [. . . .]
  [. . . .]

Row 3: Q at col 1 (check: not attacked)
  [. Q . .]
  [. . . Q]
  [Q . . .]
  [. . . .]

Row 4: Q at col 3 (check: not attacked)
  [. Q . .]
  [. . . Q]
  [Q . . .]
  [. . Q .]  ✓ Solution found!

Backtracking: If at row 3, no valid position → backtrack to row 2
```

**Possible Questions:**
- How does backtracking differ from brute force? (EN: Backtracking prunes invalid partial solutions early, while brute force generates all candidates. KR: 백트래킹은 유효하지 않은 부분 해를 일찍 제거하지만, 브루트 포스는 모든 후보를 생성합니다.)
- Explain the N-Queens problem solution. (EN: Place queens row by row, check if new queen attacks previous ones. If yes, backtrack. KR: 퀸을 행별로 배치, 새 퀸이 이전 퀸을 공격하는지 확인. 공격하면 백트래킹.)

---

### 5.3 Branch and Bound

- **Purpose / 목적:** Optimization problems (find best solution, not just any). / 최적화 문제 (임의의 해가 아닌 최선의 해 찾기).
- **Components / 구성 요소:**
  1. **Branching / 분기:** Split problem into subproblems. / 문제를 부분 문제로 분할.
  2. **Bounding / 경계:** Calculate lower/upper bound for subproblem. / 부분 문제의 하한/상한 계산.
  3. **Pruning / 가지치기:** Discard if bound shows no better solution possible. / 경계가 더 나은 해 불가능을 보이면 제거.
- **Example (TSP) / 예시 (TSP):** Lower bound = current path length + MST of remaining cities. / 하한 = 현재 경로 길이 + 남은 도시의 MST.

**Visualization / 시각화:**

**Branch and Bound Example (Knapsack):**
```
Items: (w,v) = (2,3), (3,4), (4,5), (5,6)
Capacity W = 8

Search Tree:
                    [0,0] LB=0, UB=18
                   /              \
            Include 1          Exclude 1
            [2,3] LB=3        [0,0] LB=0
           /        \         /        \
      Include 2  Exclude 2  Include 2  Exclude 2
      [5,7] LB=7  [2,3] LB=3 [3,4] LB=4 [0,0] LB=0
      /     \      /     \    /     \    /     \
   ...     ...   ...    ... ...    ... ...    ...

LB = Lower Bound (greedy solution)
UB = Upper Bound (relaxed solution)
Prune if LB ≥ current best
```

**TSP Branch and Bound:**
```
Cities: A, B, C, D
Current path: A→B (cost=5)
Remaining: C, D

Lower Bound = current cost + MST(C,D)
  = 5 + MST(C,D)
  = 5 + min(edge(C,D))

If LB ≥ best_known_cost → prune this branch
```

---

### 5.4 Meet-in-the-Middle

- **Idea:** Split search space in half, solve independently, combine results. / 검색 공간을 절반으로 나누어 독립적으로 해결 후 결과 결합.
- **Complexity / 복잡도:** Time $O(2^n) \to O(2^{n/2})$, space increases. / 시간 $O(2^n) \to O(2^{n/2})$, 공간 증가.
- **Example (Subset Sum) / 예시 (부분집합 합):** Split set $S$ into $A$ and $B$, generate all subset sums for each, check if $T - s_A$ exists in $B$'s sums. / 집합 $S$를 $A$와 $B$로 분할, 각각의 모든 부분집합 합 생성, $B$의 합에 $T - s_A$ 존재 여부 확인.

**Visualization / 시각화:**

**Meet-in-the-Middle (Subset Sum):**
```
Set S = {1, 2, 3, 4, 5, 6}
Target T = 10

Split: A = {1, 2, 3}, B = {4, 5, 6}

Generate all subset sums for A:
  A_sums = {0, 1, 2, 3, 1+2=3, 1+3=4, 2+3=5, 1+2+3=6}
          = {0, 1, 2, 3, 4, 5, 6}

Generate all subset sums for B:
  B_sums = {0, 4, 5, 6, 4+5=9, 4+6=10, 5+6=11, 4+5+6=15}
          = {0, 4, 5, 6, 9, 10, 11, 15}

For each sum_a in A_sums:
  Check if (T - sum_a) in B_sums:
    sum_a=0: 10-0=10 ∈ B_sums → found! ({} + {4,6})
    sum_a=1: 10-1=9 ∈ B_sums → found! ({1} + {4,5})
    sum_a=4: 10-4=6 ∈ B_sums → found! ({1,3} + {5,6})
    ...

Time: O(2^(n/2)) instead of O(2^n)
```

