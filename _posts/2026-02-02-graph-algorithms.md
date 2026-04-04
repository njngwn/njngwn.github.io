---
layout: post
title: 'Graph Algorithms'
date: 2026-02-02 00:00 +0100
categories: [Data Structures and Algorithms, Algorithms]
tags: [algorithms, graph, dfs, bfs, topological-sort, mst, kruskal, prim]
math: true
---

# Graph Algorithms (그래프 알고리즘)

### 2.1 Graph Representations

- **Adjacency List:** For each vertex, store list of neighbors. Preferred for sparse graphs. / 각 정점에 대해 이웃 리스트 저장. 희소 그래프에 적합.
- **Adjacency Matrix:** 2D array `bool[][]` or `int[][]`. Preferred for dense graphs or frequent edge queries. / 2차원 배열 `bool[][]` 또는 `int[][]`. 밀집 그래프나 빈번한 간선 조회에 적합.
- **Choice depends on:** Graph density, operations needed (edge testing vs. iteration). / 그래프 밀도, 필요한 연산 (간선 조회 vs 반복).

**Visualization / 시각화:**

**Graph Example:**
```
Graph: 1 → 2 → 3
       ↓   ↑   ↓
       4 → 5   6
```

**Adjacency List Representation:**
```
1: [2, 4]
2: [3, 5]
3: [6]
4: [5]
5: [2]
6: []
```

**Adjacency Matrix Representation:**
```
    1  2  3  4  5  6
1 [ 0  1  0  1  0  0 ]
2 [ 0  0  1  0  1  0 ]
3 [ 0  0  0  0  0  1 ]
4 [ 0  0  0  0  1  0 ]
5 [ 0  1  0  0  0  0 ]
6 [ 0  0  0  0  0  0 ]
```

---

### 2.2 Graph Traversal

#### DFS (Depth-First Search)

- **Data Structure / 자료구조:** Stack (LIFO). / 스택 (LIFO).
- **Behavior / 동작:** Explores as far as possible along each branch before backtracking. / 각 분기를 끝까지 탐색한 후 되돌아감.
- **Time Complexity / 시간 복잡도:** $\mathcal{O}(|V| + |E|)$. / $\mathcal{O}(|V| + |E|)$.
- **Applications / 응용:** Cycle detection, topological sort, connected components, path finding. / 사이클 탐지, 위상 정렬, 연결 요소, 경로 찾기.

#### BFS (Breadth-First Search)

- **Data Structure / 자료구조:** Queue (FIFO). / 큐 (FIFO).
- **Behavior / 동작:** Explores all neighbors at current level before moving to next level. / 현재 레벨의 모든 이웃을 탐색한 후 다음 레벨로 이동.
- **Time Complexity / 시간 복잡도:** $\mathcal{O}(|V| + |E|)$. / $\mathcal{O}(|V| + |E|)$.
- **Applications / 응용:** Shortest path (unweighted), level-order traversal, minimum spanning tree (Prim's variant). / 최단 경로 (가중치 없음), 레벨 순회, 최소 신장 트리 (Prim 변형).

**Visualization / 시각화:**

**DFS Traversal (Stack-based, LIFO):**
```
Graph:     1
          / \
         2   3
        / \   \
       4   5   6

DFS Order (starting from 1):
Stack: [1] → [3,2] → [3,5,4] → [3,5] → [3] → [6] → []
Visit: 1 → 2 → 4 → 5 → 3 → 6

DFS Tree:
    1
   / \
  2   3
 / \   \
4   5   6
```

**BFS Traversal (Queue-based, FIFO):**
```
Same Graph:
BFS Order (starting from 1):
Queue: [1] → [2,3] → [3,4,5] → [4,5,6] → [5,6] → [6] → []
Visit: 1 → 2 → 3 → 4 → 5 → 6

BFS Tree (level by level):
Level 0:    1
Level 1:  2   3
Level 2: 4 5   6
```

**Real Problem Applications:**
- **Library Hell (lib):** DFS is used to traverse the dependency graph. Starting from packages to keep, we mark all dependencies (direct and transitive) as required. Then we check if any package to remove is marked as required. (EN: DFS traverses dependency graph to find all transitive dependencies. KR: DFS가 의존성 그래프를 순회하여 모든 전이적 의존성을 찾습니다.)
- **City Roads (cit):** DFS/BFS is used to check if the graph remains acyclic after assigning directions to undirected edges. We need to find a topological ordering or detect cycles. (EN: Graph traversal to verify acyclicity after direction assignment. KR: 방향 할당 후 비순환성을 확인하기 위한 그래프 순회.)

**Implementation Example:**
```cpp
// DFS (재귀) / DFS (Recursive)
vector<bool> visited(n+1, false);
void dfs(int u, const vector<vector<int>>& graph) {
    visited[u] = true;
    for (int v : graph[u]) {
        if (!visited[v]) {
            dfs(v, graph);
        }
    }
}

// DFS (반복, 스택 사용) / DFS (Iterative, using stack)
void dfsIterative(int start, const vector<vector<int>>& graph) {
    vector<bool> visited(n+1, false);
    stack<int> s;
    s.push(start);
    
    while (!s.empty()) {
        int u = s.top();
        s.pop();
        if (visited[u]) continue;
        visited[u] = true;
        
        for (int v : graph[u]) {
            if (!visited[v]) {
                s.push(v);
            }
        }
    }
}

// BFS (큐 사용) / BFS (using queue)
void bfs(int start, const vector<vector<int>>& graph) {
    vector<bool> visited(n+1, false);
    queue<int> q;
    q.push(start);
    visited[start] = true;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        for (int v : graph[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}
```

**Common Mistakes / 자주 하는 실수:**
- 방문 체크 위치: 큐/스택에 넣기 전에 방문 표시 (BFS) vs 꺼낸 후 방문 표시 (DFS 반복) / Visit check: Mark before pushing (BFS) vs after popping (DFS iterative)
- 무방향 그래프: 양방향 간선 추가 필요 / Undirected graph: Need to add edges in both directions
- 재귀 깊이: 깊은 그래프에서 스택 오버플로우 주의 / Recursion depth: Watch for stack overflow in deep graphs

**DFS Finish Times / DFS 종료 시간:**
```
DFS assigns two timestamps:
- Discovery time: When node is first visited
- Finish time: When all descendants are processed

Example:
  Discovery/Finish times:
  d(1/12), a(2/11), b(3/10), e(4/9), g(5/8), f(6/7)
  
  DFS Tree:
     d(1/12)
    /    |    \
   a(2/11) f(6/7) g(5/8)
   |              |
   b(3/10)        ...
   |
   e(4/9)
```

**Strongly Connected Components (SCC) / 강연결 요소:**
- **Definition / 정의:** Maximal set of vertices where every vertex can reach every other vertex. / 모든 정점이 서로 도달 가능한 최대 정점 집합.
- **Kosaraju's Algorithm / Kosaraju 알고리즘:**
  1. Run DFS on G, record finish times. / G에서 DFS 실행, 종료 시간 기록.
  2. Compute G^T (transpose: reverse all edges). / G^T 계산 (전치: 모든 간선 역방향).
  3. Run DFS on G^T in decreasing finish time order. / G^T에서 감소하는 종료 시간 순서로 DFS 실행.
  4. Each DFS tree in step 3 is an SCC. / 3단계의 각 DFS 트리가 SCC.
- **Time Complexity / 시간 복잡도:** $\mathcal{O}(|V| + |E|)$. / $\mathcal{O}(|V| + |E|)$.
- **Tarjan's Algorithm / Tarjan 알고리즘:** Single DFS with low-link values. / 낮은 링크 값을 사용한 단일 DFS.

**Graph Traversal Comparison / 그래프 순회 비교:**

| Algorithm / 알고리즘 | Data Structure / 자료구조 | Time Complexity / 시간 복잡도 | Space Complexity / 공간 복잡도 | Best For / 최적 용도 |
|:---|:---|:---|:---|:---|
| **DFS** | Stack (LIFO) / 스택 | $\mathcal{O}(|V| + |E|)$ | $\mathcal{O}(|V|)$ | Deep exploration, cycle detection / 깊은 탐색, 사이클 탐지 |
| **BFS** | Queue (FIFO) / 큐 | $\mathcal{O}(|V| + |E|)$ | $\mathcal{O}(|V|)$ | Shortest path (unweighted), level-order / 최단 경로(가중치 없음), 레벨 순회 |
| **Topological Sort** | Queue / 큐 | $\mathcal{O}(|V| + |E|)$ | $\mathcal{O}(|V|)$ | DAG ordering, dependency resolution / DAG 순서, 의존성 해결 |
| **SCC (Kosaraju)** | Stack (DFS) / 스택 | $\mathcal{O}(|V| + |E|)$ | $\mathcal{O}(|V| + |E|)$ | Strongly connected components / 강연결 요소 |

**When to Use / 사용 시기:**
- **DFS:** When you need to explore deeply, find cycles, or do backtracking. / 깊이 탐색, 사이클 찾기, 백트래킹 필요 시.
- **BFS:** When you need shortest paths in unweighted graphs or level-by-level processing. / 가중치 없는 그래프의 최단 경로나 레벨별 처리 필요 시.
- **Topological Sort:** When you have dependencies and need a valid ordering. / 의존성이 있고 유효한 순서가 필요할 때.

**Possible Questions:**
- When would you use DFS vs BFS? (EN: DFS for deep exploration, BFS for shortest paths. KR: DFS는 깊은 탐색에, BFS는 최단 경로에 사용.)
- How do you detect cycles with DFS? (EN: Check for back edges (edges to already visited nodes in current path). KR: 역방향 간선(현재 경로에서 이미 방문한 노드로 가는 간선) 확인.)
- Explain Kosaraju's algorithm for SCC. (EN: Two DFS passes - first on G records finish times, second on G^T processes in reverse finish time order. KR: 두 번의 DFS - 첫 번째는 G에서 종료 시간 기록, 두 번째는 G^T에서 역순 종료 시간 순서로 처리.)

---

### 2.3 Topological Sort

- **Definition / 정의:** Linear ordering of vertices such that for every edge $(u,v)$, $u$ appears before $v$. / 모든 간선 $(u,v)$에 대해 $u$가 $v$보다 앞에 오는 선형 순서.
- **Condition / 조건:** Only possible for DAGs (Directed Acyclic Graphs). / DAG(방향 비순환 그래프)에서만 가능.
- **Kahn's Algorithm / Kahn 알고리즘:**
  1. Count in-degrees for all vertices. / 모든 정점의 진입 차수 계산.
  2. Start with vertices having in-degree 0. / 진입 차수 0인 정점부터 시작.
  3. Remove them and update in-degrees of neighbors. / 제거하고 이웃의 진입 차수 업데이트.
  4. Repeat until all vertices processed. / 모든 정점 처리될 때까지 반복.
- **Time Complexity / 시간 복잡도:** $\mathcal{O}(|V| + |E|)$. / $\mathcal{O}(|V| + |E|)$.
- **Cycle Detection / 사이클 탐지:** If unvisited vertices remain after algorithm, graph has a cycle. / 알고리즘 후 미방문 정점이 남아있으면 사이클 존재.

**Visualization / 시각화:**

**Topological Sort (Kahn's Algorithm):**
```
DAG:  1 → 2 → 4
      ↓   ↓
      3 → 5

Step 1: Count in-degrees
  Vertex: 1  2  3  4  5
  In-deg: 0  1  1  1  2

Step 2: Queue with in-degree 0: [1]
Step 3: Process:
  Remove 1 → result: [1]
    Decrement neighbors: 2→0, 3→0
    Queue: [2, 3]
  Remove 2 → result: [1, 2]
    Decrement neighbors: 4→0, 5→1
    Queue: [3, 4]
  Remove 3 → result: [1, 2, 3]
    Decrement neighbors: 5→0
    Queue: [4, 5]
  Remove 4 → result: [1, 2, 3, 4]
    Queue: [5]
  Remove 5 → result: [1, 2, 3, 4, 5]

Topological order: 1, 2, 3, 4, 5
```

**Real Problem Applications:**
- **Party Planning (par):** Topological sort is used to find the critical path in a DAG of tasks with dependencies. The longest path from source (task 1) to sink (task n) gives the minimum time needed. (EN: Tasks form a DAG with dependencies. Topological sort allows processing tasks in order, computing earliest completion time. KR: 작업들이 의존성을 가진 DAG를 형성합니다. 위상 정렬로 작업을 순서대로 처리하고 최소 완료 시간을 계산합니다.)
- **City Roads (cit):** Topological sort helps verify if the directed graph (after assigning directions) is acyclic. If topological sort succeeds, the graph is acyclic. (EN: Success of topological sort confirms acyclicity. KR: 위상 정렬 성공은 비순환성을 확인합니다.)

**Possible Questions:**
- Why can't you topologically sort a cyclic graph? (EN: Cycle creates circular dependency, impossible to order. KR: 사이클이 순환 의존성을 만들어 순서를 정할 수 없습니다.)
- Explain Kahn's algorithm step by step. (EN: Start with zero in-degree nodes, remove them, update neighbors. KR: 진입 차수 0인 노드부터 시작, 제거, 이웃 업데이트.)

---

### 2.4 Minimum Spanning Tree (MST)

- **Definition / 정의:** Subgraph that is a tree connecting all vertices with minimum total edge weight. / 모든 정점을 연결하는 트리 중 간선 가중치 합이 최소인 부분 그래프.
- **Kruskal's Algorithm / Kruskal 알고리즘:**
  1. Sort edges by weight. / 간선을 가중치로 정렬.
  2. Iterate through edges (smallest first). / 작은 것부터 순회.
  3. Add edge if it doesn't create a cycle (use Union-Find). / 사이클을 만들지 않으면 추가 (Union-Find 사용).
- **Time Complexity / 시간 복잡도:** $\mathcal{O}(|E| \log |E|)$ (dominated by sorting). / $\mathcal{O}(|E| \log |E|)$ (정렬이 지배적).
- **Prim's Algorithm / Prim 알고리즘:**
  1. Start from arbitrary vertex. / 임의의 정점에서 시작.
  2. Maintain set of visited vertices. / 방문한 정점 집합 유지.
  3. Always add minimum-weight edge connecting visited to unvisited. / 방문-미방문을 연결하는 최소 가중치 간선 추가.
- **Time Complexity / 시간 복잡도:** $\mathcal{O}(|E| + |V| \log |V|)$ with Fibonacci heap. / 피보나치 힙 사용 시 $\mathcal{O}(|E| + |V| \log |V|)$.

**Visualization / 시각화:**

**Kruskal's Algorithm Example:**
```
Graph:     1
         / | \
       2/  |  \3
       /   |   \
      2    3    4
     /|    |    |
   1/ |2   |1   |4
   /  |    |    |
  3   4    4    5
     /|    |    |
   3/ |4   |2   |5
   /  |    |    |
  5   5    5    6

Edges (sorted by weight):
(2,4):1, (3,4):1, (1,2):2, (2,3):2, (1,3):3, (4,5):4, (1,4):3, (5,6):5

MST Construction:
1. Add (2,4):1 → sets: {1}, {2,4}, {3}, {5}, {6}
2. Add (3,4):1 → sets: {1}, {2,3,4}, {5}, {6}
3. Add (1,2):2 → sets: {1,2,3,4}, {5}, {6}
4. Add (2,3):2 → skip (creates cycle)
5. Add (1,3):3 → skip (creates cycle)
6. Add (4,5):4 → sets: {1,2,3,4,5}, {6}
7. Add (5,6):5 → sets: {1,2,3,4,5,6}

MST: (2,4), (3,4), (1,2), (4,5), (5,6)
Total weight: 1+1+2+4+5 = 13
```

**Prim's Algorithm Example:**
```
Graph:     1
         / | \
       2/  |  \3
       /   |   \
      2    3    4
     /|    |    |
   1/ |2   |1   |4
   /  |    |    |
  3   4    4    5
     /|    |    |
   3/ |4   |2   |5
   /  |    |    |
  5   5    5    6

Start from vertex 1:
Step 1: Add (1,2):2 → MST: {(1,2)}
        Priority: (2,2), (3,3), (4,3)
Step 2: Add (2,4):1 → MST: {(1,2), (2,4)}
        Priority: (3,3), (4,1), (5,4)
Step 3: Add (4,3):1 → MST: {(1,2), (2,4), (4,3)}
        Priority: (5,4), (6,5)
Step 4: Add (4,5):4 → MST: {(1,2), (2,4), (4,3), (4,5)}
        Priority: (6,5)
Step 5: Add (5,6):5 → MST: {(1,2), (2,4), (4,3), (4,5), (5,6)}

Final MST weight: 2+1+1+4+5 = 13
```

**Real Problem Applications:**
- **Road Destruction (roa):** Kruskal's algorithm is used to find Maximum Spanning Tree (MST with maximum total capacity). We sort edges by capacity in descending order, then use Union-Find to add edges without creating cycles. The MST gives roads to keep, and total capacity - MST capacity gives roads to close. (EN: Maximum Spanning Tree problem - keep roads with highest capacity while maintaining connectivity. KR: 최대 신장 트리 문제 - 연결성을 유지하면서 최대 용량 도로를 유지합니다.)

**MST Algorithms Comparison / MST 알고리즘 비교:**

| Algorithm | Time Complexity | Space Complexity | Best For | Key Data Structure |
|:---|:---|:---|:---|:---|
| **Kruskal** | $\mathcal{O}(|E| \log |E|)$ | $\mathcal{O}(|V|)$ | Sparse graphs ($|E| \approx |V|$) / 희소 그래프 | Union-Find, sorted edges / Union-Find, 정렬된 간선 |
| **Prim (Binary Heap)** | $\mathcal{O}(|E| \log |V|)$ | $\mathcal{O}(|V|)$ | Sparse graphs / 희소 그래프 | Priority Queue / 우선순위 큐 |
| **Prim (Fibonacci Heap)** | $\mathcal{O}(|E| + |V| \log |V|)$ | $\mathcal{O}(|V|)$ | Dense graphs ($|E| \approx |V|^2$) / 밀집 그래프 | Fibonacci Heap / 피보나치 힙 |

**Complexity Breakdown / 복잡도 분석:**
- **Kruskal:** Sorting dominates: $\mathcal{O}(|E| \log |E|)$ + Union-Find: $\mathcal{O}(|E| \cdot \alpha(|V|))$ ≈ $\mathcal{O}(|E| \log |E|)$ / 정렬이 지배적
- **Prim (Binary Heap):** $|V|$ extract-min: $\mathcal{O}(|V| \log |V|)$ + $|E|$ decrease-key: $\mathcal{O}(|E| \log |V|)$ / $|V|$번 최소 추출 + $|E|$번 키 감소
- **Prim (Fibonacci Heap):** $|V|$ extract-min: $\mathcal{O}(|V| \log |V|)$ + $|E|$ decrease-key: $\mathcal{O}(|E|)$ amortized / 평균적으로 더 빠름

**When to Choose:**
- **Kruskal:** Simpler implementation, good for sparse graphs, easier to understand.
- **Prim:** Better for dense graphs (with Fibonacci heap), maintains tree structure. / 밀집 그래프에 더 좋음 (피보나치 힙 사용), 트리 구조 유지.

**Possible Questions:**
- Compare Kruskal and Prim. (EN: Kruskal simpler, good for sparse graphs. Prim better for dense graphs. KR: Kruskal이 더 간단하고 희소 그래프에 좋습니다. Prim은 밀집 그래프에 더 좋습니다.)
- Why does Kruskal use Union-Find? (EN: To efficiently check if adding an edge creates a cycle. KR: 간선 추가 시 사이클 생성 여부를 효율적으로 확인하기 위해.)


