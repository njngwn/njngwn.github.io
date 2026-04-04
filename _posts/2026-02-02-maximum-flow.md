---
layout: post
title: 'Maximum Flow'
date: 2026-02-02 00:00 +0100
categories: [Data Structures and Algorithms, Algorithms]
tags: [algorithms, graph, max-flow, min-cut, ford-fulkerson, edmonds-karp, dinic, bipartite-matching]
math: true
---

# Maximum Flow (최대 유량)

### 4.1 Flow Network

- **Definition:** Directed graph $(V,E)$ with capacity function $c: E \to \mathbb{R}_{\ge 0}$, source $s$, sink $t$. / 용량 함수 $c: E \to \mathbb{R}_{\ge 0}$, 출발지 $s$, 도착지 $t$를 가진 방향 그래프 $(V,E)$.
- **Flow:** Function $f: E \to \mathbb{R}_{\ge 0}$ satisfying: / 다음을 만족하는 함수 $f: E \to \mathbb{R}_{\ge 0}$:
  1. **Capacity constraint:** $0 \le f(e) \le c(e)$ for all edges. / 모든 간선에 대해 $0 \le f(e) \le c(e)$.
  2. **Flow conservation 보존:** For all $v \neq s,t$: inflow = outflow. / 모든 $v \neq s,t$에 대해: 유입 = 유출.
- **Value of flow 값:** $|f| = \sum_{v \in sE} f(s,v) - \sum_{u \in Es} f(u,s)$. / $|f| = \sum_{v \in sE} f(s,v) - \sum_{u \in Es} f(u,s)$.

**Visualization:**

**Flow Network Example:**
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
                 | [6]
                 v
                 t
```

**Residual Network:**
```
Forward edge: capacity - flow (remaining)
Backward edge: flow (can push back)

Example: If edge (u,v) has capacity 10 and flow 3:
  Forward: (u,v) with capacity 7
  Backward: (v,u) with capacity 3
```

---

### 4.2 Ford-Fulkerson Method

- **Residual Network / 잔여 네트워크:** Graph with residual capacities $c_f(u,v)$. / 잔여 용량 $c_f(u,v)$를 가진 그래프.
  - Forward edge / 순방향 간선: $c_f(u,v) = c(u,v) - f(u,v)$ (remaining capacity). / $c_f(u,v) = c(u,v) - f(u,v)$ (남은 용량).
  - Backward edge / 역방향 간선: $c_f(v,u) = f(u,v)$ (flow we can push back). / $c_f(v,u) = f(u,v)$ (되돌릴 수 있는 플로우).
- **Augmenting Path / 증가 경로:** Path from $s$ to $t$ in residual network. / 잔여 네트워크에서 $s$에서 $t$로의 경로.
- **Algorithm / 알고리즘:**
  1. Start with zero flow. / 0 플로우로 시작.
  2. While augmenting path exists: / 증가 경로가 존재하는 동안:
     - Find path $p$ in residual network. / 잔여 네트워크에서 경로 $p$ 찾기.
     - Push flow equal to minimum residual capacity along $p$. / $p$를 따라 최소 잔여 용량만큼 플로우 푸시.
     - Update flow. 업데이트.
- **Time Complexity / 시간 복잡도:** $\mathcal{O}(E \cdot |f^*|)$ where $|f^*|$ is max flow value (can be slow for large capacities). / $\mathcal{O}(E \cdot |f^*|)$ ($|f^*|$는 최대 플로우 값, 큰 용량에서 느릴 수 있음).

---

### 4.3 Max-Flow Min-Cut Theorem

- **Cut / 컷:** Partition $(S,T)$ of $V$ with $s \in S$, $t \in T$. / $s \in S$, $t \in T$인 $V$의 분할 $(S,T)$.
- **Capacity of cut / 컷의 용량:** $c(S,T) = \sum_{u \in S, v \in T} c(u,v)$. / $c(S,T) = \sum_{u \in S, v \in T} c(u,v)$.
- **Theorem / 정리:** Maximum flow value = Minimum cut capacity. / 최대 플로우 값 = 최소 컷 용량.
- **Equivalence / 동치:**
  1. $f$ is maximum flow. / $f$는 최대 플로우.
  2. No augmenting path in residual network. / 잔여 네트워크에 증가 경로 없음.
  3. $|f| = c(S,T)$ for some cut $(S,T)$. / 어떤 컷 $(S,T)$에 대해 $|f| = c(S,T)$.

**Visualization:**

**Max-Flow Min-Cut Example:**
```
Flow Network:
        [10]
      s -----> 1
       \        | [5]
        \ [8]  |
         \     v
          ----> 2 -----> t
                 | [7]
                 v
                 3
                 | [6]
                 v
                 t

Augmenting Path 1: s→1→2→t, flow=5
  Flow: s→1:5, 1→2:5, 2→t:5

Augmenting Path 2: s→2→t, flow=2
  Flow: s→2:2, 2→t:7 (saturated)

Augmenting Path 3: s→2→3→t, flow=1
  Flow: s→2:3, 2→3:1, 3→t:1

Max Flow = 5 + 2 + 1 = 8

Min Cut: S = {s, 1, 2}, T = {3, t}
  Edges crossing: (2→t):7, (2→3):1
  Cut capacity = 7 + 1 = 8 = Max Flow ✓
```

**Maximum Flow Algorithms Comparison / 최대 유량 알고리즘 비교:**

| Algorithm / 알고리즘 | Method / 방법 | Selection Rule / 선택 규칙 | Time Complexity / 시간 복잡도 | Space Complexity / 공간 복잡도 | Best For / 최적 용도 |
|:---|:---|:---|:---|:---|:---|
| **Ford-Fulkerson** | Augmenting Paths / 증가 경로 | Arbitrary / 임의 | $\mathcal{O}(E \cdot |f^*|)$ | $\mathcal{O}(V + E)$ | Small capacities, integer flows / 작은 용량, 정수 유량 |
| **Edmonds-Karp** | Augmenting Paths / 증가 경로 | BFS (Shortest) / BFS (최단) | $\mathcal{O}(V E^2)$ | $\mathcal{O}(V + E)$ | General graphs, simple implementation / 일반 그래프, 간단한 구현 |
| **Dinic** | Blocking Flows / 차단 유량 | BFS (Levels) + DFS / BFS (레벨) + DFS | $\mathcal{O}(V^2 E)$ general / 일반 | $\mathcal{O}(V + E)$ | General graphs, faster in practice / 일반 그래프, 실전에서 더 빠름 |
| **Dinic (Unit)** | Blocking Flows / 차단 유량 | BFS + DFS / BFS + DFS | $\mathcal{O}(E \sqrt{V})$ | $\mathcal{O}(V + E)$ | Unit networks, bipartite matching / 단위 네트워크, 이분 매칭 |

**Complexity Analysis / 복잡도 분석:**

**Ford-Fulkerson:**
- Worst case: $|f^*|$ augmentations × $E$ edges per path = $\mathcal{O}(E \cdot |f^*|)$
- **Problem:** Can be very slow for large capacities (e.g., capacity = $10^9$). / 큰 용량에서 매우 느릴 수 있음.
- **Example:** Graph with capacity $10^9$ on each edge → $10^9$ iterations!

**Edmonds-Karp:**
- Property: Shortest path distance increases monotonically. / 최단 경로 거리가 단조 증가.
- At most $VE$ augmentations (each increases distance). / 최대 $VE$번 증가 (각각이 거리 증가).
- Each BFS: $\mathcal{O}(E)$, total: $\mathcal{O}(V E^2)$.

**Dinic:**
- General: At most $V$ level graph rebuilds, each blocking flow: $\mathcal{O}(VE)$. / 최대 $V$번 레벨 그래프 재구축, 각 차단 유량: $\mathcal{O}(VE)$.
- Unit networks: Special structure allows $\sqrt{V}$ phases. / 특수 구조로 $\sqrt{V}$ 단계.
- **Why faster?** Pushes flow along all shortest paths simultaneously. / 모든 최단 경로에 동시에 유량 푸시.

**When to Use / 사용 시기:**
- **Ford-Fulkerson:** Only for very small capacities or educational purposes. / 매우 작은 용량이거나 교육 목적.
- **Edmonds-Karp:** Simple to implement, good for small-medium graphs.
- **Dinic:** Best choice for most problems, especially unit networks. / 대부분의 문제에 최적, 특히 단위 네트워크.

**Possible Questions:**
- Explain the max-flow min-cut theorem. (EN: The maximum flow equals the minimum cut capacity. This is because any flow is bounded by any cut, and at maximum flow, there's a cut achieving this bound. KR: 최대 플로우는 최소 컷 용량과 같습니다. 모든 플로우는 어떤 컷에도 제한되며, 최대 플로우에서 이 한계를 달성하는 컷이 존재하기 때문입니다.)
- Why is Dinic faster than Edmonds-Karp? (EN: Dinic pushes flow along all shortest paths simultaneously using blocking flows, while Edmonds-Karp finds one path at a time. KR: Dinic는 차단 유량을 사용하여 모든 최단 경로에 동시에 유량을 푸시하지만, Edmonds-Karp는 한 번에 하나의 경로를 찾습니다.)
- When would you use unit network Dinic? (EN: For bipartite matching or problems where all capacities are 1. Complexity reduces to O(E√V). KR: 이분 매칭이나 모든 용량이 1인 문제. 복잡도가 O(E√V)로 감소.)

---

### 4.4 Edmonds-Karp Algorithm

- **Idea:** Ford-Fulkerson using BFS to find shortest augmenting path. / BFS로 최단 증가 경로를 찾는 Ford-Fulkerson.
- **Time Complexity / 시간 복잡도:** $\mathcal{O}(V E^2)$. / $\mathcal{O}(V E^2)$.
- **Why better? / 왜 더 나은가?** Independent of flow value, always finds shortest path. 값과 무관하며 항상 최단 경로를 찾습니다.

**Visualization:**

**Edmonds-Karp Process:**
```
Flow Network:
        [10]
      s ────> 1
       \       │ [5]
        \ [8]  │
         \     v
          ────> 2 ────> t
                 │ [7]
                 v
                 3
                 │ [6]
                 v
                 t

Iteration 1: BFS finds shortest path s→1→2→t (length=3)
  Path: s→1→2→t
  Bottleneck: min(10,5,7) = 5
  Push flow=5: s→1:5, 1→2:5, 2→t:5

Iteration 2: BFS finds shortest path s→2→t (length=2)
  Path: s→2→t
  Bottleneck: min(8,2) = 2
  Push flow=2: s→2:2, 2→t:7 (saturated)

Iteration 3: BFS finds shortest path s→2→3→t (length=3)
  Path: s→2→3→t
  Bottleneck: min(6,6) = 1
  Push flow=1: s→2:3, 2→3:1, 3→t:1

Max Flow = 5 + 2 + 1 = 8
```

---

### 4.5 Dinic's Algorithm

- **Idea:** Push flow along all shortest paths simultaneously using level graph. / 레벨 그래프를 사용하여 모든 최단 경로에 동시에 플로우 푸시.
- **Level Graph / 레벨 그래프:** BFS assigns levels, only keep edges going to next level. / BFS로 레벨 할당, 다음 레벨로 가는 간선만 유지.
- **Blocking Flow / 차단 유량:** Flow that saturates at least one edge in every path from s to t. / s에서 t로 가는 모든 경로에서 최소 하나의 간선을 포화시키는 유량.
- **Time Complexity / 시간 복잡도:** 
  - General: $\mathcal{O}(V^2 E)$. / 일반: $\mathcal{O}(V^2 E)$.
  - Unit networks: $\mathcal{O}(E \sqrt{V})$ (very fast for bipartite matching). / 단위 네트워크: $\mathcal{O}(E \sqrt{V})$ (이분 매칭에 매우 빠름).

**Visualization:**

**Dinic's Level Graph:**
```
Original Network:
        [10]
      s ────> 1
       \       │ [5]
        \ [8]  │
         \     v
          ────> 2 ────> t
                 │ [7]
                 v
                 3
                 │ [6]
                 v
                 t

Step 1: Build Level Graph (BFS from s)
  Level 0: s
  Level 1: 1, 2
  Level 2: 3, t

Level Graph (only edges to next level):
        [10]
      s ────> 1
       \       │ [5]
        \ [8]  │
         \     v
          ────> 2 ────> t
                 │ [7]
                 v
                 3
                 │ [6]
                 v
                 t

Step 2: Find Blocking Flow
  Path 1: s→1→2→t, flow=5
  Path 2: s→2→t, flow=2
  Path 3: s→2→3→t, flow=1
  Total blocking flow = 8

Step 3: Update residual network
  (Some edges saturated, rebuild level graph)
```

- **Blocking Flow / 차단 플로우:** Flow that saturates at least one edge in every path. / 모든 경로에서 최소 하나의 간선을 포화시키는 플로우.
- **Algorithm / 알고리즘:**
  1. Build level graph using BFS. / BFS로 레벨 그래프 구축.
  2. Find blocking flow using DFS. / DFS로 차단 플로우 찾기.
  3. Add blocking flow to current flow. / 현재 플로우에 차단 플로우 추가.
  4. Repeat until no path exists. / 경로가 없을 때까지 반복.
- **Time Complexity / 시간 복잡도:** $\mathcal{O}(V^2 E)$ general, $\mathcal{O}(E \sqrt{V})$ for unit networks. / 일반 그래프 $\mathcal{O}(V^2 E)$, 단위 네트워크 $\mathcal{O}(E \sqrt{V})$.

**Real Problem Applications:**
- **Railroad Network (rai):** Dinic's algorithm finds maximum flow from Starta (city 1) to Tempolis (city $n$). Each road has a capacity (max baggage weight). The problem asks for maximum total baggage that can be transported. (EN: Maximum flow problem - find maximum weight of baggage that can be transported through the railroad network. KR: 최대 유량 문제 - 철도 네트워크를 통해 운송 가능한 최대 짐의 무게를 찾습니다.)
- **Bank Robbery (ban):** Edmonds-Karp algorithm (or max-flow) is used to find minimum cut. The problem asks: can we block all paths from intersection 1 to $n$ with $p$ policemen? This is equivalent to: is minimum cut capacity $\le p$? By max-flow min-cut theorem, we compute max flow, which equals min cut. (EN: Min-cut problem - find minimum capacity to disconnect source from sink. Max-flow min-cut theorem: max flow = min cut capacity. KR: 최소 컷 문제 - 출발지와 도착지를 분리하는 최소 용량 찾기. 최대 유량 최소 컷 정리: 최대 유량 = 최소 컷 용량.)

**Possible Questions:**
- What is a blocking flow? (EN: A flow that saturates at least one edge in every path from source to sink. KR: 출발지에서 도착지로 가는 모든 경로에서 최소 하나의 간선을 포화시키는 플로우.)
- Why is Dinic faster for unit networks? (EN: Special structure allows $\sqrt{V}$ phases instead of $V$ phases. KR: 특수 구조로 $V$ 단계 대신 $\sqrt{V}$ 단계만 필요합니다.)

---

### 4.6 Bipartite Matching

- **Problem / 문제:** Given bipartite graph $G=(X \cup Y, E)$, find maximum matching. / 이분 그래프 $G=(X \cup Y, E)$에서 최대 매칭 찾기.
- **Reduction to Max Flow / 최대 유량으로 환원:**
  1. Add source $s$ connected to all $x \in X$. / 모든 $x \in X$에 연결된 소스 $s$ 추가.
  2. Add sink $t$ connected from all $y \in Y$. / 모든 $y \in Y$에서 연결된 싱크 $t$ 추가.
  3. Direct edges from $X$ to $Y$. / $X$에서 $Y$로 간선 방향화.
  4. Set all capacities to 1. / 모든 용량을 1로 설정.
- **Result / 결과:** Max flow = Max matching size. / 최대 유량 = 최대 매칭 크기.
- **Complexity / 복잡도:** $\mathcal{O}(E \sqrt{V})$ with Dinic (unit network). / Dinic 사용 시 $\mathcal{O}(E \sqrt{V})$ (단위 네트워크).

