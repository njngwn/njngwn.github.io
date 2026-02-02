---
layout: post
title: 'Shortest Paths'
date: 2026-02-02 00:00 +0100
categories: [Data Structures and Algorithms, Algorithms]
tags: [algorithms, graph, shortest-path, dijkstra, bellman-ford, floyd-warshall, sssp, apsp]
math: true
---

## 3. Shortest Paths (최단 경로)

### 3.1 Dijkstra's Algorithm

- **Scope:** Single Source Shortest Path (SSSP) for graphs with **non-negative weights**. / **음이 아닌 가중치** 그래프의 단일 출발지 최단 경로 (SSSP).
- **Idea:** Use priority queue, always process vertex with minimum distance first. / 우선순위 큐 사용, 항상 최소 거리 정점을 먼저 처리.
- **Algorithm:**
  1. Initialize distances: $dist[s] = 0$, others $\infty$. / 거리 초기화: $dist[s] = 0$, 나머지 $\infty$.
  2. Use priority queue (min-heap) ordered by distance. / 거리 기준 최소 힙 사용.
  3. Extract min, relax neighbors (update if shorter path found). / 최소 추출, 이웃 완화 (더 짧은 경로 발견 시 업데이트).
  4. Repeat until queue empty. / 큐가 빌 때까지 반복.
- **Time Complexity:** $\mathcal{O}(|E| + |V| \log |V|)$ with Fibonacci heap. / 피보나치 힙 사용 시 $\mathcal{O}(|E| + |V| \log |V|)$.
- **Why non-negative only? / 음이 아닌 가중치만 가능한 이유?** Once a vertex is processed, its distance is final. Negative edges could create shorter paths later. / 정점 처리 후 거리가 확정됩니다. 음수 간선은 나중에 더 짧은 경로를 만들 수 있습니다.

**Visualization:**

**Dijkstra's Algorithm with Min-Heap:**
```
Graph:     1
          /|\
        2/ | \3
        /  |  \
       2   3   4
      /|   |   |
    1/ |2  |1  |1
    /  |   |   |
   3   4   4   5
      /|   |   |
    3/ |4  |2  |2
    /  |   |   |
   5   5   5   6

Initial: dist[1]=0, others=∞
Min-Heap: [(0,1)]

Step 1: Extract (0,1), relax neighbors
        dist[2]=2, dist[3]=3, dist[4]=3
        Heap: [(2,2), (3,3), (3,4)]

Step 2: Extract (2,2), relax neighbors
        dist[3]=min(3, 2+2)=3, dist[4]=min(3, 2+1)=3
        Heap: [(3,3), (3,4)]

... continue until heap empty
```

**Real Problem Applications:**
- **Supermarkets (sup):** Dijkstra's algorithm finds shortest path from home (city $a$) to friend's house (city $b$), with detour to a supermarket. For each supermarket, we compute: distance from $a$ to supermarket + shopping time + distance from supermarket to $b$. The minimum over all supermarkets gives the answer. (EN: Shortest path with intermediate stop. Run Dijkstra from source, then from each supermarket to destination. KR: 중간 정지점이 있는 최단 경로. 출발지에서 Dijkstra 실행, 각 슈퍼마켓에서 목적지까지.)

**Implementation Example:**
```cpp
vector<long long> dijkstra(int start, const vector<vector<pair<int, int>>>& graph) {
    int n = graph.size() - 1;
    vector<long long> dist(n+1, INF);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, 
                   greater<pair<long long, int>>> pq;
    
    dist[start] = 0;
    pq.push({0, start});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        if (d > dist[u]) continue;  // 이미 더 짧은 경로 발견 / Already found shorter path
        
        for (auto [v, w] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    
    return dist;
}
```

**Common Mistakes:**
- 우선순위 큐 중복: 같은 정점이 여러 번 큐에 들어갈 수 있지만, `d > dist[u]` 체크로 무시 / Priority queue duplicates: Same vertex can be in queue multiple times, but ignored with `d > dist[u]` check
- 음수 가중치: Dijkstra는 음수 가중치에서 작동하지 않음 (Bellman-Ford 사용) / Negative weights: Dijkstra doesn't work with negative weights (use Bellman-Ford)
- 오버플로우: `long long` 사용 권장 (큰 가중치) / Overflow: Use `long long` for large weights

**Shortest Path Algorithms Comparison:**

| Algorithm | Problem Type 유형 | Time Complexity | Space Complexity / 공간 복잡도 | Handles Negative Weights? / 음수 가중치 처리? | Handles Negative Cycles? / 음수 사이클 처리? |
|:---|:---|:---|:---|:---|:---|
| **Dijkstra** | SSSP / 단일 출발지 | $\mathcal{O}(|E| + |V| \log |V|)$ (Fibonacci heap) / 피보나치 힙 | $\mathcal{O}(|V|)$ | ❌ No / 아니오 | ❌ No / 아니오 |
| **Bellman-Ford** | SSSP / 단일 출발지 | $\mathcal{O}(|V| \cdot |E|)$ | $\mathcal{O}(|V|)$ | ✅ Yes / 예 | ✅ Detects / 탐지 가능 |
| **SPFA** | SSSP / 단일 출발지 | $\mathcal{O}(|V| \cdot |E|)$ worst case / 최악 | $\mathcal{O}(|V|)$ | ✅ Yes / 예 | ✅ Detects / 탐지 가능 |
| **Floyd-Warshall** | APSP / 모든 쌍 | $\mathcal{O}(|V|^3)$ | $\mathcal{O}(|V|^2)$ | ✅ Yes / 예 | ✅ Detects / 탐지 가능 |

**Complexity Analysis:**

**Dijkstra:**
- Binary heap: $\mathcal{O}(|E| \log |V|)$ - $|V|$ extract-min + $|E|$ decrease-key
- Fibonacci heap: $\mathcal{O}(|E| + |V| \log |V|)$ - amortized $\mathcal{O}(1)$ decrease-key
- **Why not negative weights?** Once vertex is processed, distance is final. Negative edge could create shorter path later. / 정점이 처리되면 거리가 확정. 음수 간선이 나중에 더 짧은 경로를 만들 수 있음.

**Bellman-Ford:**
- $|V|-1$ iterations × $|E|$ edges = $\mathcal{O}(|V| \cdot |E|)$
- **Why $|V|-1$?** Shortest path has at most $|V|-1$ edges. / 최단 경로는 최대 $|V|-1$개 간선.
- **Negative cycle detection:** One more iteration. If distances improve, cycle exists. / 한 번 더 반복. 거리가 개선되면 사이클 존재.

**Floyd-Warshall:**
- Three nested loops: $|V| \times |V| \times |V| = \mathcal{O}(|V|^3)$
- **Space:** $|V| \times |V|$ distance matrix
- **When to use:** Need all pairs, small $|V|$ (typically $|V| \leq 500$). / 모든 쌍 필요, 작은 $|V|$ (보통 $|V| \leq 500$).

**Algorithm Selection Guide:**

```
Need shortest paths?
│
├─ Single source (SSSP)?
│  │
│  ├─ Non-negative weights?
│  │  └─ Yes → Dijkstra (O(E + V log V))
│  │
│  └─ Negative weights possible?
│     └─ Yes → Bellman-Ford or SPFA (O(VE))
│
└─ All pairs (APSP)?
   │
   ├─ Small V (≤ 500)?
   │  └─ Yes → Floyd-Warshall (O(V³))
   │
   └─ Large V?
      └─ Run Dijkstra V times (O(V(E + V log V)))
```

**Possible Questions:**
- Why doesn't Dijkstra work with negative weights? (EN: Once a vertex is finalized, we don't reconsider it, but negative edges could provide shorter paths. KR: 정점이 확정되면 재고려하지 않지만, 음수 간선이 더 짧은 경로를 제공할 수 있습니다.)
- Explain the relaxation step. (EN: For edge $(u,v)$ with weight $w$, if $dist[u] + w < dist[v]$, update $dist[v]$. KR: 가중치 $w$인 간선 $(u,v)$에 대해 $dist[u] + w < dist[v]$이면 $dist[v]$ 업데이트.)
- When would you use Floyd-Warshall vs running Dijkstra multiple times? (EN: Floyd-Warshall for small V when you need all pairs. Dijkstra multiple times for large V or when only some pairs needed. KR: 모든 쌍이 필요하고 V가 작으면 Floyd-Warshall. V가 크거나 일부 쌍만 필요하면 Dijkstra 여러 번.)

---

### 3.2 Bellman-Ford Algorithm

- **Scope:** SSSP for graphs with **negative weights** (but no negative cycles). / **음수 가중치** 그래프의 SSSP (음수 사이클 없음).
- **Idea:** Relax all edges $|V|-1$ times. / 모든 간선을 $|V|-1$번 완화.
- **Algorithm:**
  1. Initialize distances: $dist[s] = 0$, others $\infty$. / 거리 초기화: $dist[s] = 0$, 나머지 $\infty$.
  2. For $i = 1$ to $|V|-1$: / $i = 1$부터 $|V|-1$까지:
     - For each edge $(u,v)$ with weight $w$: / 가중치 $w$인 각 간선 $(u,v)$에 대해:
       - If $dist[u] + w < dist[v]$, update $dist[v]$. / $dist[u] + w < dist[v]$이면 $dist[v]$ 업데이트.
  3. Check for negative cycles: One more iteration. If any distance can still be improved, negative cycle exists. / 음수 사이클 확인: 한 번 더 반복. 거리가 개선되면 음수 사이클 존재.
- **Time Complexity:** $\mathcal{O}(|V| \cdot |E|)$. / $\mathcal{O}(|V| \cdot |E|)$.
- **Optimization:** Queue-based version (SPFA) - only process vertices whose distance changed. / 큐 기반 버전 (SPFA) - 거리가 변경된 정점만 처리.

**Visualization:**

**Bellman-Ford Algorithm Example:**
```
Graph: 1 → 2 (w=1), 1 → 3 (w=4), 2 → 3 (w=-2), 2 → 4 (w=2), 3 → 4 (w=1)
Source: 1

Initial: dist[1]=0, dist[2]=∞, dist[3]=∞, dist[4]=∞

Iteration 1 (relax all edges):
  (1,2): dist[2] = min(∞, 0+1) = 1
  (1,3): dist[3] = min(∞, 0+4) = 4
  (2,3): dist[3] = min(4, 1+(-2)) = -1
  (2,4): dist[4] = min(∞, 1+2) = 3
  (3,4): dist[4] = min(3, -1+1) = 0
  Result: dist = [0, 1, -1, 0]

Iteration 2:
  (1,2): dist[2] = min(1, 0+1) = 1 (no change)
  (1,3): dist[3] = min(-1, 0+4) = -1 (no change)
  (2,3): dist[3] = min(-1, 1+(-2)) = -1 (no change)
  (2,4): dist[4] = min(0, 1+2) = 0 (no change)
  (3,4): dist[4] = min(0, -1+1) = 0 (no change)
  Result: dist = [0, 1, -1, 0] (converged)

Iteration 3 (check for negative cycle):
  All distances unchanged → no negative cycle
```

**Implementation Example:**
```cpp
vector<long long> bellmanFord(int start, const vector<Edge>& edges, int n) {
    vector<long long> dist(n+1, INF);
    dist[start] = 0;
    
    // Relax all edges |V|-1 times
    for (int i = 1; i < n; i++) {
        for (const auto& e : edges) {
            if (dist[e.from] != INF && dist[e.from] + e.weight < dist[e.to]) {
                dist[e.to] = dist[e.from] + e.weight;
            }
        }
    }
    
    // Check for negative cycles
    for (const auto& e : edges) {
        if (dist[e.from] != INF && dist[e.from] + e.weight < dist[e.to]) {
            // Negative cycle detected!
            return {};  // or mark nodes reachable from negative cycle
        }
    }
    
    return dist;
}
```

**Common Mistakes:**
- 반복 횟수: 정확히 $|V|-1$번 반복해야 함 / Iteration count: Must iterate exactly $|V|-1$ times
- 음수 사이클 탐지: 한 번 더 반복하여 거리 개선 확인 / Negative cycle detection: One more iteration to check distance improvement
- INF 체크: `dist[u] != INF` 확인 후 완화 (INF에서 시작하는 경로는 무시) / INF check: Check `dist[u] != INF` before relaxing (ignore paths starting from INF)

**SPFA (Shortest Path Faster Algorithm) / SPFA:**
- **Idea:** Queue-based optimization of Bellman-Ford. Only process vertices whose distance changed. / Bellman-Ford의 큐 기반 최적화. 거리가 변경된 정점만 처리.
- **Algorithm:**
  1. Use queue to store vertices with updated distances. / 거리가 업데이트된 정점을 큐에 저장.
  2. Process vertices in phases. / 단계별로 정점 처리.
  3. If queue not empty after $|V|$ phases, negative cycle exists. / $|V|$ 단계 후 큐가 비지 않으면 음수 사이클 존재.
- **Worst-case Complexity / 최악 복잡도:** Still $\mathcal{O}(|V| \cdot |E|)$, but often faster in practice. / 여전히 $\mathcal{O}(|V| \cdot |E|)$, 하지만 실전에서는 더 빠름.

**Longest Path in DAG:**
- **Problem:** Find longest simple path in DAG. / DAG에서 최장 단순 경로 찾기.
- **Approach 1 1:** Negate all edge weights, use Bellman-Ford. / 모든 간선 가중치 부호 반전, Bellman-Ford 사용.
- **Approach 2 2:** Topological sort + DP. Process nodes in topological order, update distances. / 위상 정렬 + DP. 위상 순서로 노드 처리, 거리 업데이트.
- **Time Complexity:** $\mathcal{O}(|V| + |E|)$ with topological sort. / 위상 정렬 사용 시 $\mathcal{O}(|V| + |E|)$.

**Possible Questions:**
- Why $|V|-1$ iterations? (EN: Shortest path has at most $|V|-1$ edges. KR: 최단 경로는 최대 $|V|-1$개의 간선을 가집니다.)
- How do you detect negative cycles? (EN: Run one more iteration. If distances can still be improved, negative cycle exists. KR: 한 번 더 반복 실행. 거리가 개선되면 음수 사이클 존재.)
- What is SPFA? (EN: Queue-based Bellman-Ford that only processes vertices with updated distances. KR: 거리가 업데이트된 정점만 처리하는 큐 기반 Bellman-Ford.)

---

### 3.3 Floyd-Warshall Algorithm

- **Scope:** All Pairs Shortest Path (APSP). / 모든 쌍 최단 경로 (APSP).
- **Idea:** Dynamic programming - try all intermediate vertices. / 동적 계획법 - 모든 중간 정점 시도.
- **Algorithm:**
  - Initialize $dist[i][j]$ with edge weights (or $\infty$ if no edge). / $dist[i][j]$를 간선 가중치로 초기화 (간선 없으면 $\infty$).
  - For each intermediate vertex $k$: / 각 중간 정점 $k$에 대해:
    - For each pair $(i,j)$: / 각 쌍 $(i,j)$에 대해:
      - $dist[i][j] = \min(dist[i][j], dist[i][k] + dist[k][j])$. / $dist[i][j] = \min(dist[i][j], dist[i][k] + dist[k][j])$.
- **Time Complexity:** $\mathcal{O}(|V|^3)$. / $\mathcal{O}(|V|^3)$.
- **Can handle / 처리 가능:** Negative weights, detects negative cycles (if $dist[i][i] < 0$ after algorithm). / 음수 가중치, 음수 사이클 탐지 (알고리즘 후 $dist[i][i] < 0$이면).

**Visualization:**

**Floyd-Warshall DP Table:**
```
Graph: 1 → 2 (w=3), 2 → 3 (w=1), 1 → 3 (w=7)

Initial dist[][] (k=0, no intermediate):
       1    2    3
   1 [ 0    3   ∞ ]
   2 [ ∞    0    1 ]
   3 [ ∞   ∞    0 ]

After k=1 (can use vertex 1 as intermediate):
       1    2    3
   1 [ 0    3   ∞ ]  (no change)
   2 [ ∞    0    1 ]  (no change)
   3 [ ∞   ∞    0 ]   (no change)

After k=2 (can use vertices 1,2 as intermediate):
       1    2    3
   1 [ 0    3    4 ]  (1→2→3: 3+1=4)
   2 [ ∞    0    1 ]  (no change)
   3 [ ∞   ∞    0 ]   (no change)

After k=3 (can use all vertices):
       1    2    3
   1 [ 0    3    4 ]  (final)
   2 [ ∞    0    1 ]  (final)
   3 [ ∞   ∞    0 ]   (final)
```

**Possible Questions:**
- Why does the order of loops matter? (EN: Must process $k$ (intermediate) before $i,j$ to ensure subproblems are solved. KR: 부분 문제가 해결되도록 $k$(중간)를 $i,j$보다 먼저 처리해야 합니다.)
- How does Floyd-Warshall detect negative cycles? (EN: After algorithm, if $dist[i][i] < 0$ for any $i$, there's a negative cycle. KR: 알고리즘 후 어떤 $i$에 대해 $dist[i][i] < 0$이면 음수 사이클이 있습니다.)


