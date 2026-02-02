---
layout: post
title: 'Trie & Segment Tree'
date: 2026-02-02 00:00 +0100
categories: [Data Structures and Algorithms, Data Structures]
tags: [data-structures, trie, segment-tree, lazy-propagation, range-query]
math: true
---

## 10. Trie & Segment Tree (트라이 & 세그먼트 트리)

### 10.1 Trie

- **Definition / 정의:** Tree structure for storing strings. / 문자열 저장을 위한 트리 구조.
- **Properties:**
  - Root represents empty string. / 루트는 빈 문자열.
  - Path from root to node represents prefix. / 루트에서 노드로의 경로는 접두사.
  - All descendants share same prefix. / 모든 후손은 같은 접두사 공유.
- **Operations / 연산:**
  - **Insert / 삽입:** $\mathcal{O}(|s|)$ - traverse/create path. / $\mathcal{O}(|s|)$ - 경로 탐색/생성.
  - **Lookup / 조회:** $\mathcal{O}(|s|)$ - traverse path. / $\mathcal{O}(|s|)$ - 경로 탐색.
- **Applications / 응용:** Autocompletion, spell-checking, string sorting. / 자동완성, 맞춤법 검사, 문자열 정렬.

**Real Problem Applications:**
- **Ghost (gho):** Trie is used to store all known words. The game "Ghost" requires checking if a prefix exists in the word list. Trie allows efficient prefix matching - traverse the trie following the prefix characters, check if path exists and if any word ends at that node. (EN: Prefix matching in word game - check if current fragment can be extended to a valid word. Trie enables O(prefix_length) lookup. KR: 단어 게임에서 접두사 매칭 - 현재 조각이 유효한 단어로 확장 가능한지 확인. Trie는 O(접두사_길이) 조회를 가능하게 합니다.)

**Visualization / 시각화:**

**Trie Structure (Words: "cat", "car", "dog", "do"):**
```
        (root)
       /   |   \
      c    d    ...
     /     |
    a      o
   / \     |
  t   r    g
  |   |    |
  *   *    *
  
Paths:
- root → c → a → t → * (word: "cat")
- root → c → a → r → * (word: "car")
- root → d → o → g → * (word: "dog")
- root → d → o → * (word: "do")
```

**Trie Prefix Search Example:**
```
Search for prefix "ca":
  root → c → a → ✓ found
  Continue from 'a': find all words starting with "ca"
  Results: "cat", "car"
```

**Trie & Segment Tree Comparison / Trie & 세그먼트 트리 비교:**

| Data Structure / 자료구조 | Operations / 연산 | Time Complexity / 시간 복잡도 | Space Complexity / 공간 복잡도 | Best For / 최적 용도 |
|:---|:---|:---|:---|:---|
| **Trie (Insert)** | Insert string / 문자열 삽입 | $\mathcal{O}(|s|)$ | $\mathcal{O}(|\Sigma| \cdot |s|)$ per string / 문자열당 | String storage / 문자열 저장 |
| **Trie (Lookup)** | Search string / 문자열 검색 | $\mathcal{O}(|s|)$ | - | Prefix matching / 접두사 매칭 |
| **Segment Tree (Build)** | Build tree / 트리 구축 | $\mathcal{O}(n)$ | $\mathcal{O}(n)$ | Range queries / 구간 쿼리 |
| **Segment Tree (Query)** | Range query / 구간 쿼리 | $\mathcal{O}(\log n)$ | - | Sum, min, max over range / 구간 합, 최소, 최대 |
| **Segment Tree (Update)** | Point update / 점 업데이트 | $\mathcal{O}(\log n)$ | - | Single element update / 단일 원소 업데이트 |
| **Segment Tree (Lazy)** | Range update / 구간 업데이트 | $\mathcal{O}(\log n)$ | $\mathcal{O}(n)$ | Range add, range assign / 구간 더하기, 구간 할당 |

**Complexity Analysis / 복잡도 분석:**

**Trie:**
- **Insert/Lookup:** Traverse path of length $|s|$, each step is $\mathcal{O}(1)$ (array access or hash lookup). / 길이 $|s|$의 경로 탐색, 각 단계는 $\mathcal{O}(1)$.
- **Space:** Worst case: each string has unique path, total $|\Sigma| \cdot N$ where $N$ is total characters. / 최악: 각 문자열이 고유 경로, 총 $|\Sigma| \cdot N$ ($N$은 총 문자 수).
- **Optimization:** Use hash map instead of array for large alphabets. / 큰 알파벳에는 배열 대신 해시 맵 사용.

**Segment Tree:**
- **Height:** $\lceil \log_2 n \rceil$ levels. / $\lceil \log_2 n \rceil$ 레벨.
- **Query/Update:** Traverse from root to leaf: $\mathcal{O}(\log n)$ nodes. / 루트에서 리프까지 탐색: $\mathcal{O}(\log n)$ 노드.
- **Lazy Propagation:** Defer updates, apply when needed: still $\mathcal{O}(\log n)$ per operation. / 업데이트 지연, 필요 시 적용: 연산당 여전히 $\mathcal{O}(\log n)$.

**Possible Questions:**
- How does a trie store strings? (EN: Each edge is labeled with a character, path from root represents the string. KR: 각 간선은 문자로 레이블, 루트에서의 경로가 문자열을 나타냅니다.)
- What is the space complexity? (EN: $\mathcal{O}(|\Sigma| \cdot N)$ where $\Sigma$ is alphabet, $N$ is total characters. KR: $\mathcal{O}(|\Sigma| \cdot N)$ ($\Sigma$는 알파벳, $N$은 총 문자 수).)

---

### 10.2 Segment Tree

- **Purpose / 목적:** Efficient range queries and point updates. / 효율적인 구간 쿼리와 점 업데이트.
- **Structure / 구조:** Binary tree, each node represents an interval. / 이진 트리, 각 노드는 구간을 나타냄.
- **Operations / 연산:**
  - **Build / 구축:** $\mathcal{O}(n)$. / $\mathcal{O}(n)$.
  - **Point Update / 점 업데이트:** $\mathcal{O}(\log n)$. / $\mathcal{O}(\log n)$.
  - **Range Query / 구간 쿼리:** $\mathcal{O}(\log n)$. / $\mathcal{O}(\log n)$.
- **Generalization / 일반화:** Works for any monoid (associative operation with identity). / 모든 모노이드(항등원을 가진 결합 연산)에 작동.

**Visualization / 시각화:**

**Segment Tree Structure (Array: [1, 3, 5, 7, 9, 11]):**
```
                    [0-5]: 36
                   /        \
            [0-2]: 9      [3-5]: 27
           /      \       /      \
      [0-1]: 4  [2]: 5  [3-4]: 16  [5]: 11
     /      \              /      \
  [0]: 1  [1]: 3      [3]: 7  [4]: 9

Array indices: 0  1  2  3  4  5
Values:        [1, 3, 5, 7, 9, 11]

Query [1,4] (sum):
  - [0-2] doesn't fully cover → go to children
  - [1] fully inside → add 3
  - [2] fully inside → add 5
  - [3-4] fully inside → add 16
  - Total: 3 + 5 + 16 = 24
```

**Possible Questions:**
- How does range query work? (EN: Recursively split query interval, combine results from nodes that fully cover subintervals. KR: 쿼리 구간을 재귀적으로 분할, 부분 구간을 완전히 덮는 노드의 결과 결합.)
- What is a monoid? (EN: Set with associative operation and identity element. Examples: (N, +, 0), (R, min, inf). KR: 결합 연산과 항등원을 가진 집합. 예: (N, +, 0), (R, min, inf).)

---

### 10.3 Lazy Propagation

- **Purpose / 목적:** Efficient range updates. / 효율적인 구간 업데이트.
- **Idea:** Store pending updates in `lazy` variable, propagate only when needed. / 대기 중인 업데이트를 `lazy` 변수에 저장, 필요할 때만 전파.
- **Operations / 연산:**
  - **RangeAdd:** $\mathcal{O}(\log n)$ - mark lazy, don't update children immediately. / $\mathcal{O}(\log n)$ - lazy 표시, 자식 즉시 업데이트 안 함.
  - **Propagate:** $\mathcal{O}(1)$ - push lazy to children when querying. / $\mathcal{O}(1)$ - 쿼리 시 lazy를 자식에 전파.
- **Key:** Only propagate when node is actually accessed. / 노드가 실제로 접근될 때만 전파.

**Visualization / 시각화:**

**Lazy Propagation Example (Range Add):**
```
Segment Tree (initial values):
        [0-5]: 36
       /        \
  [0-2]: 9    [3-5]: 27
  /    \      /      \
[0-1]:4 [2]:5 [3-4]:16 [5]:11
/    \        /      \
[0]:1 [1]:3  [3]:7 [4]:9

Update: Add 2 to range [1,4]

Step 1: Mark lazy values (don't update children yet)
        [0-5]: 36 + lazy=0
       /        \
  [0-2]: 9    [3-5]: 27 + lazy=2
  /    \      /      \
[0-1]:4 [2]:5 [3-4]:16 [5]:11

Step 2: When querying [3,4], propagate lazy
  - Access [3-5]: lazy=2 → apply to value: 27 + 2×3 = 33
  - Push lazy to children: [3-4]:lazy=2, [5]:lazy=2
  - Access [3-4]: lazy=2 → apply: 16 + 2×2 = 20
  - Push to children: [3]:lazy=2, [4]:lazy=2
  - Access [3]: lazy=2 → apply: 7 + 2×1 = 9
  - Access [4]: lazy=2 → apply: 9 + 2×1 = 11

Final state after propagation:
        [0-5]: 36
       /        \
  [0-2]: 9    [3-5]: 33 (updated)
  /    \      /      \
[0-1]:4 [2]:5 [3-4]:20 [5]:13
/    \        /      \
[0]:1 [1]:3  [3]:9 [4]:11
```

**Lazy Propagation Flow:**
```
Update Range [l, r]:
  1. Find nodes that fully cover [l, r]
  2. Mark lazy value (don't update children)
  3. Update node value: value += lazy × (range_size)

Query Range [l, r]:
  1. Before accessing node, check if lazy exists
  2. If lazy exists:
     a. Apply lazy to current node value
     b. Push lazy to children (if not leaf)
     c. Clear lazy
  3. Continue query as normal

Key Insight: Lazy is only propagated when needed!
```

**Possible Questions:**
- Why is lazy propagation needed? (EN: Without it, range update would be O(n log n). Lazy allows O(log n) by deferring updates. KR: 없으면 구간 업데이트가 O(n log n). Lazy는 업데이트를 지연시켜 O(log n) 허용.)
- When do you propagate? (EN: When querying a node or when its children need to be accessed. KR: 노드를 쿼리하거나 자식에 접근해야 할 때.)

**References:**
* [https://www.geeksforgeeks.org/dsa/trie-insert-and-search/](https://www.geeksforgeeks.org/dsa/trie-insert-and-search/)
* [https://cp-algorithms.com/data_structures/segment_tree.html](https://cp-algorithms.com/data_structures/segment_tree.html)
* [https://www.geeksforgeeks.org/dsa/segment-tree-data-structure/](https://www.geeksforgeeks.org/dsa/segment-tree-data-structure/)

