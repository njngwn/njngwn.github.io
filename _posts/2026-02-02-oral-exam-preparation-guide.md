---
layout: post
title: 'Oral Exam Preparation Guide'
date: 2026-02-02 00:00 +0100
categories: [Data Structures and Algorithms, Algorithms]
tags: [algorithms, exam-preparation, problem-solving, complexity-analysis]
math: true
---

# Oral Exam Preparation

## 1. Problem-Solving Strategies (문제 해결 전략)

### General Approach (일반적인 접근법)

1. **Understand the problem:** Read constraints, identify what's being asked
2. **Identify pattern:** Is it graph? DP? Greedy? Geometry?
3. **Estimate complexity:** Check constraints to determine feasible approach
4. **Choose algorithm:** Match problem characteristics to known algorithms
5. **Implement carefully:** Handle edge cases, numerical precision

### Approach by Constraints (제약 조건별 접근법)

| Constraint | Feasible Approach | Example Algorithms |
|:---|:---|:---|
| $N \le 20$ | Brute force / Bitmask DP | $2^{20} \approx 10^6$ operations |
| $N \le 40$ | Meet-in-the-Middle | $2^{20}$ operations |
| $N \le 100$ | $\mathcal{O}(N^3)$ algorithms | Floyd-Warshall, etc. |
| $N \le 1000$ | $\mathcal{O}(N^2)$ algorithms | DP, nested loops |
| $N \le 10^5$ | $\mathcal{O}(N \log N)$ algorithms | Sorting, segment tree, etc. |
| $N \le 10^6$ | $\mathcal{O}(N)$ or $\mathcal{O}(N \log N)$ | Linear scan, binary search |

### Problem Pattern Recognition (문제 패턴 식별)

- **Graph with dependencies** → Topological sort
- **Shortest path** → Dijkstra/Bellman-Ford/Floyd-Warshall
- **Maximum flow** → Ford-Fulkerson/Dinic
- **Optimization with subproblems** → DP
- **Greedy choice property** → Greedy
- **Negative weights?** → Bellman-Ford
- **All pairs?** → Floyd-Warshall
- **DAG?** → Topological sort + DP

---

## 2. Complexity Calculations (복잡도 계산)

### Common Complexity Estimates

- **Binary Search:** $\log_2(10^6) \approx 20$ iterations
- **Union-Find:** Practically constant (inverse Ackermann)
- **Dijkstra (binary heap):** $\mathcal{O}(E \log V)$
  - Example: $V=1000, E=10000$: $10000 \times 10 = 100000$ operations
- **Floyd-Warshall:** $V^3 = 1000^3 = 10^9$ operations (might be too slow)

### Calculation Examples

**Q: N=1000일 때 이진 탐색의 최대 반복 횟수는?**
- Answer: $\lceil \log_2(1000) \rceil = \lceil 9.97 \rceil = 10$ iterations

**Q: V=100, E=500인 그래프에서 Dijkstra의 연산 수는?**
- Answer: With binary heap: $\mathcal{O}(E \log V) = \mathcal{O}(500 \times \log(100)) \approx \mathcal{O}(500 \times 6.64) \approx \mathcal{O}(3320)$ operations

**Q: N=20, need to try all subsets:**
- Answer: $2^{20} \approx 10^6$ (feasible)

**Q: N=1000, need O(N²):**
- Answer: $10^6$ (feasible)

**Q: N=10⁵, need O(N log N):**
- Answer: $10^5 \times 17 \approx 1.7 \times 10^6$ (feasible)

**Q: N=1000, need O(N³):**
- Answer: $10^9$ (might be too slow, need optimization)

---

## 3. Approximation Ratio Calculations (근사 비율 계산)

### Example

**Greedy solution = 100, Optimal = 60**

- Approximation ratio = $100/60 = 1.67$ (within 2-factor)
- Or: $60/100 = 0.6$ (guarantees at least 60% of optimal)

### General Formula

For **minimization:**
- If algorithm returns $A$, optimal is $OPT$: $A \le k \cdot OPT$
- Then: $OPT \ge A/k$

For **maximization:**
- If algorithm returns $A$, optimal is $OPT$: $A \ge (1/k) \cdot OPT$
- Then: $OPT \le k \cdot A$

**Q: 2-근사 알고리즘이 해 120을 반환했을 때, 최적해의 범위는?**
- **Minimization:** $120 \le 2 \cdot OPT$, so $OPT \ge 60$
- **Maximization:** $OPT \le 2 \cdot 120 = 240$, or $120 \ge (1/2) \cdot OPT$, so $OPT \le 240$

---

## 4. Key Diagrams to Draw (그릴 수 있는 다이어그램)

**Important:** Practice drawing these quickly on paper during the exam!

### Tree Structures

**Binary Search Tree:**
```
        5
       / \
      3   7
     / \ / \
    2  4 6  8
```

**Heap (Min-Heap):**
```
        1
       / \
      3   2
     / \ / \
    5  4 6  7
```

**Union-Find Tree:**
```
Before: 1 → 2 → 3 → 4
After:  1
       /|\
      2 3 4
```

### Graphs

**Directed Graph:**
```
1 → 2 → 3
↓   ↑   ↓
4 → 5   6
```

**Adjacency List:**
```
1: [2, 4]
2: [3, 5]
3: [6]
4: [5]
5: [2]
6: []
```

### DP Tables

**Knapsack DP Table:**
```
    0  1  2  3  4  5
0   0  0  0  0  0  0
1   0  10 10 10 10 10
2   0  10 15 25 25 25
3   0  10 15 25 30 40
```

### Segment Tree

```
        [1,8]
       /      \
   [1,4]      [5,8]
   /   \      /   \
[1,2] [3,4] [5,6] [7,8]
/  \  /  \  /  \  /  \
1  2  3  4  5  6  7  8
```

**Knapsack DP Table:**
```
Items: (weight, value)
1: (2, 10)
2: (3, 15)
3: (4, 20)

Capacity: 5

    0  1  2  3  4  5
0   0  0  0  0  0  0
1   0  0  10 10 10 10
2   0  0  10 15 15 25
3   0  0  10 15 20 30
```

**LIS DP Table:**
```
Array: [3, 1, 4, 1, 5, 9, 2, 6]

dp[i] = length of LIS ending at i
dp: [1, 1, 2, 1, 3, 4, 2, 4]
```

### Flow Network

```
        [10]
      s -----> 1
       \        | [5]
        \ [8]   |
         \      v
          ----> 2 -----> t
                 | [7]
                 v
                 3
```

### Residual Network

```
Forward edge: capacity - flow
Backward edge: flow

Example:
Original: s→1 (cap=10, flow=3)
Residual: s→1 (cap=7), 1→s (cap=3)
```

---

## 5. Common Question Types (일반적인 질문 유형)

### 1. Algorithm Explanation (알고리즘 설명)
- "Explain how [algorithm] works step by step"
- "Walk through [algorithm] with this example"

### 2. Complexity Proof (복잡도 증명)
- "Why is the time complexity O(...)?"
- "Prove that [algorithm] runs in O(...) time"

### 3. Correctness Proof (정당성 증명)
- "Why does [algorithm] always find the optimal solution?"
- "Prove that [algorithm] is correct"

### 4. Algorithm Comparison (알고리즘 비교)
- "When would you use [A] vs [B]?"
- "Compare [algorithm A] and [algorithm B]"

### 5. Problem Application (문제 적용)
- "How would you solve [problem]?"
- "Which algorithm would you use for [problem] and why?"

### 6. Implementation Details (구현 세부사항)
- "What are common mistakes when implementing [algorithm]?"
- "How do you handle edge cases in [algorithm]?"

---

## 6. 30-Minute Q&A Preparation Checklist

### Binary Search & Union-Find
- [ ] Binary search time complexity proof ($\log n$ iterations)
- [ ] Union-Find path compression and weighted union
- [ ] Inverse Ackermann function meaning
- [ ] Real problem applications

### Graph Algorithms
- [ ] DFS vs BFS differences and use cases
- [ ] Cycle detection with DFS (back edge)
- [ ] Topological sort (Kahn's algorithm)
- [ ] Kruskal vs Prim comparison
- [ ] SCC algorithms (Kosaraju, Tarjan)

### Shortest Paths
- [ ] Why Dijkstra doesn't work with negative weights (proof)
- [ ] Bellman-Ford $(|V|-1)$ iterations reason
- [ ] Negative cycle detection
- [ ] Floyd-Warshall DP structure and loop order
- [ ] Longest path in DAG

### Maximum Flow
- [ ] Max-Flow Min-Cut theorem proof idea
- [ ] Residual network concept (forward/backward edges)
- [ ] Edmonds-Karp vs Dinic comparison
- [ ] Blocking flow definition
- [ ] Reduction to bipartite matching

### Brute Force & Backtracking
- [ ] Backtracking vs Brute Force difference
- [ ] Branch and Bound operation (bounding, pruning)
- [ ] Meet-in-the-Middle complexity improvement ($2^n \to 2^{n/2}$)

### Greedy & Approximation
- [ ] When greedy is optimal (matroid structure)
- [ ] Change making greedy failure cases
- [ ] k-approximation algorithm definition and proof
- [ ] Canonical coin systems

### Dynamic Programming
- [ ] Optimal substructure and overlapping subproblems
- [ ] Top-Down vs Bottom-Up comparison
- [ ] Knapsack DP table filling process
- [ ] LIS $O(n \log n)$ optimization (binary search)

### Number Theory
- [ ] Extended Euclidean for modular inverse
- [ ] CRT construction and non-coprime modules
- [ ] Fast Exponentiation (binary exponentiation)
- [ ] Sieve of Eratosthenes starting from $i^2$ reason
- [ ] Big Integers representation and operations
- [ ] Karatsuba algorithm (reduces 4 multiplications to 3)
- [ ] Rational numbers for exact calculations

### Geometry
- [ ] CCW test geometric meaning (cross product, triangle area)
- [ ] Graham Scan algorithm step-by-step
- [ ] Shoelace Formula (polygon area)
- [ ] Linear Algebra basics (dot product, cross product, determinant)

### Trie & Segment Tree
- [ ] Trie structure and time complexity
- [ ] Segment Tree range query operation
- [ ] Lazy Propagation necessity and propagation process

### Projective Geometry
- [ ] Projective plane definition and homogenization/dehomogenization
- [ ] Finding intersection of two lines (cross product)
- [ ] Point at infinity concept
- [ ] Advantages of projective geometry (removing special cases)

---

## 7. Additional Tips (추가 팁)

1. **Practice explaining:** Be able to explain algorithms step-by-step
2. **Know trade-offs:** When to use which algorithm and why
3. **Understand proofs:** Especially for approximation ratios
4. **Be ready for small problems:** They might give you a small problem and ask how you'd solve it
5. **Practice drawing diagrams:** Be able to draw trees, graphs, DP tables, heaps on paper during the exam

---

## 8. Quick Reference: Algorithm Selection Decision Tree

```
Problem Type?
├─ Graph?
│  ├─ Shortest path?
│  │  ├─ All pairs? → Floyd-Warshall
│  │  ├─ Negative weights? → Bellman-Ford
│  │  └─ Non-negative? → Dijkstra
│  ├─ Maximum flow? → Dinic/Edmonds-Karp
│  ├─ Dependencies? → Topological Sort
│  └─ Connectivity? → Union-Find, DFS/BFS
├─ Optimization?
│  ├─ Overlapping subproblems? → DP
│  ├─ Greedy choice property? → Greedy
│  └─ Small constraints? → Brute Force/Backtracking
├─ Geometry?
│  ├─ Convex hull? → Graham Scan
│  ├─ Polygon area? → Shoelace Formula
│  └─ Collinearity? → Projective Geometry (cross product)
└─ Number Theory?
   ├─ GCD/LCM? → Euclidean Algorithm
   ├─ Modular inverse? → Extended Euclidean
   └─ System of congruences? → CRT
```

---

## 9. Complete Algorithm Complexity Summary

### All Algorithms Comparison

| Category | Algorithm | Time Complexity | Space Complexity | When to Use |
|:---|:---|:---|:---|:---|
| **Search** | Binary Search | $\mathcal{O}(\log n)$ | $\mathcal{O}(1)$ | Sorted array, monotonic function |
| **Union-Find** | Union-Find (optimized) | $\mathcal{O}(\alpha(n))$ amortized | $\mathcal{O}(n)$ | Connectivity, MST (Kruskal) |
| **Graph Traversal** | DFS / BFS | $\mathcal{O}(V + E)$ | $\mathcal{O}(V)$ | Graph exploration |
| **Topological Sort** | Kahn's Algorithm | $\mathcal{O}(V + E)$ | $\mathcal{O}(V)$ | DAG ordering |
| **SCC** | Kosaraju / Tarjan | $\mathcal{O}(V + E)$ | $\mathcal{O}(V + E)$ | Strongly connected components |
| **MST** | Kruskal | $\mathcal{O}(E \log E)$ | $\mathcal{O}(V)$ | Sparse graphs |
| **MST** | Prim (Fibonacci Heap) | $\mathcal{O}(E + V \log V)$ | $\mathcal{O}(V)$ | Dense graphs |
| **Shortest Path** | Dijkstra (Fibonacci Heap) | $\mathcal{O}(E + V \log V)$ | $\mathcal{O}(V)$ | Non-negative weights |
| **Shortest Path** | Bellman-Ford | $\mathcal{O}(VE)$ | $\mathcal{O}(V)$ | Negative weights, no cycles |
| **Shortest Path** | Floyd-Warshall | $\mathcal{O}(V^3)$ | $\mathcal{O}(V^2)$ | All pairs, small V |
| **Max Flow** | Ford-Fulkerson | $\mathcal{O}(E \cdot |f^*|)$ | $\mathcal{O}(V + E)$ | Small capacities |
| **Max Flow** | Edmonds-Karp | $\mathcal{O}(VE^2)$ | $\mathcal{O}(V + E)$ | General graphs |
| **Max Flow** | Dinic | $\mathcal{O}(V^2 E)$ | $\mathcal{O}(V + E)$ | General graphs |
| **Max Flow** | Dinic (Unit) | $\mathcal{O}(E \sqrt{V})$ | $\mathcal{O}(V + E)$ | Unit networks, bipartite matching |
| **DP** | 0/1 Knapsack | $\mathcal{O}(nW)$ | $\mathcal{O}(W)$ optimized | Item selection |
| **DP** | LIS (optimized) | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n)$ | Longest increasing subsequence |
| **Number Theory** | GCD (Euclidean) | $\mathcal{O}(\log \min(a,b))$ | $\mathcal{O}(1)$ | Greatest common divisor |
| **Number Theory** | Extended Euclidean | $\mathcal{O}(\log \min(a,b))$ | $\mathcal{O}(1)$ | Modular inverse |
| **Number Theory** | Fast Exponentiation | $\mathcal{O}(\log n)$ | $\mathcal{O}(1)$ | $x^n$ computation |
| **Number Theory** | Sieve of Eratosthenes | $\mathcal{O}(n \log \log n)$ | $\mathcal{O}(n)$ | Prime numbers ≤ n |
| **Geometry** | Convex Hull (Graham Scan) | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n)$ | Convex hull of points |
| **Data Structures** | Trie (Insert/Lookup) | $\mathcal{O}(|s|)$ | $\mathcal{O}(|\Sigma| \cdot N)$ | String storage |
| **Data Structures** | Segment Tree (Query/Update) | $\mathcal{O}(\log n)$ | $\mathcal{O}(n)$ | Range queries |
| **Data Structures** | Segment Tree (Lazy) | $\mathcal{O}(\log n)$ | $\mathcal{O}(n)$ | Range updates |

### Complexity by Input Size

| Complexity | Typical Max Input Size | Examples |
|:---|:---|:---|
| $\mathcal{O}(1)$ | Any | Hash lookup |
| $\mathcal{O}(\log n)$ | Any | Binary search |
| $\mathcal{O}(n)$ | $10^7$ - $10^8$ | Linear scan |
| $\mathcal{O}(n \log n)$ | $10^5$ - $10^6$ | Sorting, divide-and-conquer |
| $\mathcal{O}(n^2)$ | $10^3$ - $10^4$ | Nested loops, DP |
| $\mathcal{O}(n^3)$ | $100$ - $500$ | Floyd-Warshall, matrix multiplication |
| $\mathcal{O}(2^n)$ | $20$ - $25$ | Brute force, backtracking |
| $\mathcal{O}(n!)$ | $10$ - $12$ | Permutations |

**Note:** These are rough estimates assuming ~$10^8$ operations per second.

---

## 10. Common Mistakes to Avoid

1. **Off-by-one errors** in binary search boundaries
2. **Not handling edge cases** (empty input, single element)
3. **Integer overflow** in calculations
4. **Wrong loop order** in Floyd-Warshall (must be k, i, j)
5. **Forgetting to update** in DP transitions
6. **Not checking preconditions** (negative weights in Dijkstra)
7. **Incorrect base cases** in DP
8. **Missing null checks** in tree/graph traversal

---

## 11. Last-Minute Review Checklist

### Before the Exam
- [ ] Review all algorithm time complexities
- [ ] Practice explaining each algorithm step-by-step
- [ ] Review common mistakes for each topic
- [ ] Practice drawing diagrams quickly
- [ ] Review complexity calculations
- [ ] Review approximation ratio calculations
- [ ] Review problem-solving strategies
- [ ] Review all "Possible Questions" sections in each post

### During the Exam
- [ ] Listen carefully to the question
- [ ] Ask for clarification if needed
- [ ] Think step-by-step, don't rush
- [ ] Draw diagrams to explain
- [ ] Show your reasoning process
- [ ] Mention edge cases and optimizations

---

---

## 12. Detailed Q&A by Topic (주제별 상세 질문-답변)

### Binary Search & Union-Find

**Q1.1: Binary Search의 동작 원리를 단계별로 설명하세요.**

**Answer:**
1. Initialize: `left = 0`, `right = n-1` (or appropriate bounds)
2. While `left <= right`:
   - Calculate `mid = (left + right) / 2`
   - Compare `arr[mid]` with target
   - If equal: return `mid`
   - If `arr[mid] > target`: search left half (`right = mid - 1`)
   - If `arr[mid] < target`: search right half (`left = mid + 1`)
3. If loop ends, target not found

**Q1.2: Binary Search의 시간 복잡도가 O(log n)인 이유는?**

**Answer:**
Each iteration eliminates half of the search space. Starting with n elements:
- After 1 iteration: n/2 elements remain
- After 2 iterations: n/4 elements remain
- After k iterations: n/2^k elements remain
We stop when n/2^k ≤ 1, so k ≥ log₂(n). Therefore, at most ⌈log₂(n)⌉ iterations.

**Q1.3: Union-Find에서 Path Compression과 Weighted Union의 목적은?**

**Answer:**
- **Path Compression:** During `find`, make all nodes point directly to root. Reduces tree height, making future `find` operations faster. Amortized cost becomes nearly constant.
- **Weighted Union:** Always attach smaller tree to larger tree. Prevents tree from becoming a chain, keeping height logarithmic. Combined with path compression, gives inverse Ackermann complexity.

**Q1.4: Union-Find의 복잡도가 실질적으로 상수인 이유는?**

**Answer:**
The inverse Ackermann function α(n) grows extremely slowly:
- α(61) = 3
- α(2^65536) ≈ 4
For any practical input size, α(n) ≤ 4, so it's effectively constant.

---

### Graph Algorithms

**Q2.1: DFS와 BFS의 차이점과 각각의 사용 시나리오는?**

**Answer:**
- **DFS (Depth-First):** Uses stack (LIFO), explores deeply before backtracking. Use for: cycle detection, topological sort, connected components, path finding (not necessarily shortest).
- **BFS (Breadth-First):** Uses queue (FIFO), explores level by level. Use for: shortest path in unweighted graphs, level-order traversal, finding minimum steps.

**Q2.2: DFS로 사이클을 탐지하는 방법은?**

**Answer:**
Maintain a `visited` array and a `recStack` (recursion stack) array. For each vertex:
1. Mark as visited and add to recStack
2. For each neighbor:
   - If not visited, recurse
   - If visited AND in recStack, cycle found (back edge)
3. Remove from recStack when backtracking

A back edge (edge to ancestor in current path) indicates a cycle.

**Q2.3: Topological Sort가 가능한 조건과 Kahn 알고리즘을 설명하세요.**

**Answer:**
- **Condition:** Graph must be a DAG (Directed Acyclic Graph). If cycle exists, topological sort impossible.
- **Kahn's Algorithm:**
  1. Count in-degrees for all vertices
  2. Initialize queue with vertices having in-degree 0
  3. While queue not empty:
     - Remove vertex u, add to result
     - For each neighbor v of u: decrement in-degree
     - If in-degree becomes 0, add to queue
  4. If result size < |V|, cycle exists

**Q2.4: Kruskal과 Prim 알고리즘의 차이점은?**

**Answer:**
- **Kruskal:** Sort all edges, add smallest that doesn't create cycle. Uses Union-Find. Better for sparse graphs. Time: O(E log E).
- **Prim:** Start from vertex, always add minimum edge connecting visited to unvisited. Uses priority queue. Better for dense graphs. Time: O(E + V log V) with Fibonacci heap.

---

### Shortest Paths

**Q3.1: Dijkstra가 음수 가중치에서 작동하지 않는 이유는?**

**Answer:**
Dijkstra assumes that once a vertex is processed (extracted from priority queue), its distance is final. This is true only for non-negative weights. With negative edges, a shorter path might be found later through a negative edge, but Dijkstra won't reconsider the already-processed vertex.

**Example:** Graph: A→B (weight 1), A→C (weight 3), B→C (weight -2). Dijkstra processes B first with distance 1, then C with distance 3. But path A→B→C has total weight -1, which is shorter. However, C was already finalized.

**Q3.2: Bellman-Ford 알고리즘의 동작 원리와 음수 사이클 탐지는?**

**Answer:**
- **Algorithm:** Relax all edges $(|V|-1)$ times. After $(|V|-1)$ iterations, shortest paths are found (if no negative cycles).
- **Negative Cycle Detection:** Run one more iteration. If any distance can still be improved, negative cycle exists. Reason: Shortest path has at most $(|V|-1)$ edges. If $|V|$ iterations can still improve, there's a cycle with negative total weight.

**Q3.3: Floyd-Warshall의 시간 복잡도와 왜 O(V³)인가?**

**Answer:**
Three nested loops: for each intermediate vertex $k$, for each source $i$, for each destination $j$. Each iteration does constant work (one comparison and assignment). Total: $|V| \times |V| \times |V| = |V|^3$ operations.

**Important:** Loop order must be k, i, j. Changing order can give incorrect results.

---

### Maximum Flow

**Q4.1: Max-Flow Min-Cut 정리를 설명하세요.**

**Answer:**
**Theorem:** Maximum flow value = Minimum cut capacity.

**Proof idea:**
1. Any flow is bounded by any cut (flow must cross cut, can't exceed capacity)
2. At maximum flow, residual network has no augmenting path
3. BFS from source in residual network defines a cut (reachable = S, unreachable = T)
4. This cut has capacity equal to flow value (all edges from S to T are saturated, all from T to S have zero flow)
5. Therefore, flow equals cut capacity, proving both are optimal

**Q4.2: Dinic 알고리즘의 Blocking Flow는 무엇인가?**

**Answer:**
A blocking flow is a flow that saturates at least one edge in every path from source to sink in the level graph. After pushing a blocking flow, at least one edge on every path is saturated, so no more flow can be pushed along those paths. We then rebuild the level graph and find a new blocking flow.

**Q4.3: Edmonds-Karp와 Dinic의 차이점은?**

**Answer:**
- **Edmonds-Karp:** Uses BFS to find shortest augmenting path each time. Time: O(VE²). Simple but slower.
- **Dinic:** Builds level graph, finds blocking flow (pushes flow along all shortest paths simultaneously). Time: O(V²E) general, O(E√V) for unit networks. More complex but faster.

---

### Dynamic Programming

**Q5.1: DP의 최적 부분 구조와 겹치는 부분 문제를 설명하세요.**

**Answer:**
- **Optimal Substructure:** Optimal solution to problem contains optimal solutions to subproblems. Example: In shortest path, if path A→B→C is optimal, then A→B and B→C must be optimal.
- **Overlapping Subproblems:** Same subproblems are solved multiple times. Example: In Fibonacci, fib(5) requires fib(3) multiple times.

**Q5.2: LIS의 O(n log n) 알고리즘을 설명하세요.**

**Answer:**
Maintain array `m[l]` = minimum last element of LIS of length l. For each element:
1. Binary search for largest l where `m[l] < arr[i]`
2. If found, extend: `m[l+1] = arr[i]`
3. If not found (arr[i] is smallest), update: `m[1] = arr[i]`

Time: O(n log n) because each element does one binary search.

---

### Number Theory

**Q6.1: 확장 유클리드 알고리즘으로 모듈러 역원을 구하는 방법은?**

**Answer:**
For modular inverse of $a \pmod{m}$ (where $gcd(a,m) = 1$):
1. Use extended Euclidean to find $x, y$ such that $ax + my = 1$
2. Then $x \bmod m$ is the modular inverse of $a \pmod{m}$

**Example:** Find inverse of 3 mod 7:
- Extended Euclidean: $3 \cdot 5 + 7 \cdot (-2) = 1$
- So $5 \bmod 7 = 5$ is the inverse (check: $3 \cdot 5 = 15 \equiv 1 \pmod{7}$)

**Q6.2: 중국인의 나머지 정리(CRT)를 설명하세요.**

**Answer:**
Given system: $x \equiv a_1 \pmod{m_1}$, $x \equiv a_2 \pmod{m_2}$, ..., $x \equiv a_n \pmod{m_n}$ where all $m_i$ are pairwise coprime.

**Solution:**
1. Compute $M = m_1 \cdot m_2 \cdot ... \cdot m_n$
2. For each $i$, compute $M_i = M / m_i$
3. Find modular inverse $y_i$ of $M_i \pmod{m_i}$
4. Solution: $x = \sum_{i} a_i \cdot M_i \cdot y_i \pmod{M}$

**Q6.3: Karatsuba 알고리즘은 무엇인가?**

**Answer:**
Karatsuba is a fast multiplication algorithm for big integers. Instead of $\mathcal{O}(n^2)$ grid multiplication, it achieves $\mathcal{O}(n^{1.585})$.

**Idea:** Split numbers $x, y$ into halves: $x = x_0 + x_1 b^k$, $y = y_0 + y_1 b^k$

**Naive:** $(x_0 + x_1 b^k)(y_0 + y_1 b^k) = x_0 y_0 + (x_1 y_0 + x_0 y_1)b^k + x_1 y_1 b^{2k}$ (4 multiplications)

**Optimization:** Compute $(x_1 y_0 + x_0 y_1)$ as $(x_0 + x_1)(y_0 + y_1) - x_0 y_0 - x_1 y_1$ (only 3 multiplications needed)

**Q6.4: 유리수(Rational Numbers)를 사용하는 이유는?**

**Answer:**
Floating point numbers cause loss of significance and rounding errors. For exact calculations, store numbers as $\frac{a}{b}$ where $gcd(a,b) = 1$.

**Operations:**
- Sum: $\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}$
- Product: $\frac{a}{b} \cdot \frac{c}{d} = \frac{ac}{bd}$
- Always simplify using $gcd$ after operations.

---

### Geometry

**Q7.1: CCW (Counter-Clockwise) 테스트를 설명하세요.**

**Answer:**
Given three points $P_1, P_2, P_3$, compute cross product:
$$\text{CCW} = (P_2 - P_1) \times (P_3 - P_1) = (x_2 - x_1)(y_3 - y_1) - (y_2 - y_1)(x_3 - x_1)$$

- **CCW > 0:** Counter-clockwise (left turn)
- **CCW < 0:** Clockwise (right turn)
- **CCW = 0:** Collinear

Geometric meaning: Twice the signed area of triangle $P_1P_2P_3$.

**Q7.2: Graham Scan 알고리즘을 설명하세요.**

**Answer:**
1. Find bottommost point (or leftmost if tie) as pivot
2. Sort other points by angle with pivot
3. Initialize stack with first two points
4. For each remaining point:
   - While CCW of top-2, top-1, current is clockwise (or collinear), pop top
   - Push current point
5. Stack contains convex hull points

Time: O(n log n) dominated by sorting.

---

### Trie & Segment Tree

**Q8.1: Trie의 구조와 시간 복잡도를 설명하세요.**

**Answer:**
- **Structure:** Tree where each node represents a character. Path from root to node represents a string prefix.
- **Insert/Lookup:** O(|s|) where |s| is string length. Each character requires one node traversal.
- **Space:** O(|\Sigma| \cdot N) where \Sigma is alphabet size, N is total characters.

**Q8.2: Segment Tree의 Lazy Propagation을 설명하세요.**

**Answer:**
**Problem:** Range update in O(log n) instead of O(n log n).

**Solution:**
- Store pending updates in `lazy` array
- When updating range [l, r]:
  1. Mark nodes with lazy value (don't update children yet)
  2. Only propagate when querying or when children need to be accessed
- When querying: Before accessing node, apply lazy to current node, push to children, clear lazy

**Key:** Lazy is only propagated when needed, not immediately.

---

### Projective Geometry

**Q9.1: 사영 평면에서 두 직선의 교점을 구하는 방법은?**

**Answer:**
In homogeneous coordinates:
- Line through two points: $L = P_1 \times P_2$ (cross product)
- Intersection of two lines: $P = L_1 \times L_2$ (cross product)

**Example:** Lines $L_1 = [a_1, b_1, c_1]$, $L_2 = [a_2, b_2, c_2]$
- Intersection: $P = L_1 \times L_2 = [b_1c_2 - b_2c_1, c_1a_2 - c_2a_1, a_1b_2 - a_2b_1]$

**Q9.2: 사영 기하의 장점은 무엇인가?**

**Answer:**
- **No special cases:** Parallel lines intersect at point at infinity. No need to check if lines are parallel.
- **Unified operations:** Same formula works for all cases (intersecting, parallel, etc.)
- **Simpler code:** Fewer conditional branches

---

### Greedy & Approximation

**Q10.1: 탐욕법이 최적인 조건은?**

**Answer:**
Greedy is optimal when problem has **matroid structure:**
- **Hereditary property:** If set is independent, all subsets are independent
- **Exchange property:** If A and B are independent and |A| < |B|, there exists element in B-A that can be added to A

Examples: Minimum Spanning Tree (graphic matroid), Interval Scheduling.

**Q10.2: k-근사 알고리즘이란?**

**Answer:**
For minimization: Algorithm returns solution $A$ such that $A \le k \cdot OPT$ where $OPT$ is optimal.
For maximization: Algorithm returns solution $A$ such that $A \ge (1/k) \cdot OPT$.

**Proof method:** Show that algorithm's solution is within factor k of optimal, often by comparing to a lower/upper bound.

---

### Brute Force & Backtracking

**Q11.1: Backtracking과 Brute Force의 차이는?**

**Answer:**
- **Brute Force:** Try all possibilities, no early termination
- **Backtracking:** Try possibilities but abandon (backtrack) when current path cannot lead to valid solution

**Example:** N-Queens - backtracking abandons partial solutions that already have conflicts, while brute force would try all $N^N$ placements.

**Q11.2: Branch and Bound의 동작 원리는?**

**Answer:**
1. **Branching:** Split problem into subproblems
2. **Bounding:** Compute upper/lower bound for each subproblem
3. **Pruning:** If bound shows subproblem cannot improve current best, discard it
4. **Search:** Continue with promising subproblems

**Key:** Good bounds allow pruning many subproblems, reducing search space.

**Q11.3: Meet-in-the-Middle의 복잡도 개선은?**

**Answer:**
Instead of trying all $2^n$ possibilities:
1. Split into two halves: $2^{n/2}$ each
2. Generate all possibilities for first half: $2^{n/2}$
3. Generate all possibilities for second half: $2^{n/2}$
4. Combine results: Match first half with second half

**Complexity:** $O(2^{n/2})$ instead of $O(2^n)$

**Example:** Subset sum with n=40: $2^{40} \approx 10^{12}$ (too slow) → $2^{20} \approx 10^6$ (feasible)

---

