---
layout: post
title: 'Binary Search & Union-Find (이진 탐색 & 유니온 파인드)'
date: 2026-02-02 00:00 +0100
categories: [Data Structures and Algorithms, Algorithms]
tags: [algorithms, binary-search, union-find, data-structures]
math: true
---

# Binary Search & Union-Find (이진 탐색 & 유니온 파인드)

## 1. Binary Search

- **Definition:** Efficient search algorithm in a sorted array, reducing search space by half each iteration. / 정렬된 배열에서 검색 공간을 매 반복마다 절반으로 줄이는 효율적인 검색 알고리즘.
- **Time Complexity:** $\mathcal{O}(\log n)$ where $n$ is the array size. / $\mathcal{O}(\log n)$ (배열 크기 $n$).
- **Key Idea:** Compare middle element with target, eliminate half of search space. / 중간 원소와 목표값을 비교하여 검색 공간의 절반을 제거.
- **Generalizations:**
  - Works on monotonic functions (not just arrays). / 단조 함수에도 적용 가능 (배열뿐만 아니라).
  - Can search in continuous intervals (e.g., finding square root). / 연속 구간에서도 검색 가능 (예: 제곱근 찾기).
- **Implementation:** Use `std::binary_search`, `std::lower_bound` in C++. / C++에서는 `std::binary_search`, `std::lower_bound` 사용.

**Real Problem Applications:**
- **Cake (cak):** Binary search on parameter $\alpha$ to find the scaling factor that achieves target area ratio. The area function is monotonic with respect to $\alpha$, making binary search applicable. (EN: Search for $\alpha$ such that area after scaling equals target ratio. KR: 스케일링 후 넓이가 목표 비율과 같아지는 $\alpha$를 탐색.)

**Visualization:**

**Binary Search Process (Example: search for 7 in [1,3,5,7,9,11,13]):**
```
Initial: [1, 3, 5, 7, 9, 11, 13]
         L=0              R=6
         mid=3, arr[3]=7 ✓ found!

Step-by-step:
Iteration 1: L=0, R=6, mid=3
             [1, 3, 5, 7, 9, 11, 13]
              L     M     R
             arr[3]=7 == target → found!

If searching for 6:
Iteration 1: L=0, R=6, mid=3, arr[3]=7 > 6 → R=2
             [1, 3, 5, 7, 9, 11, 13]
              L  M  R
Iteration 2: L=0, R=2, mid=1, arr[1]=3 < 6 → L=2
             [1, 3, 5, 7, 9, 11, 13]
                 L  R
Iteration 3: L=2, R=2, mid=2, arr[2]=5 < 6 → L=3
             L > R → not found
```

**Binary Search Space Reduction:**
```
n elements → n/2 → n/4 → n/8 → ... → 1
After k iterations: n/2^k ≤ 1
Therefore: k ≥ log₂(n)
```

**Implementation Example 예시:**
```cpp
// 정확한 값 찾기 / Find exact value
int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;  // 없음 / Not found
}

// 부동소수점 이진 탐색 (예: 제곱근) / Floating point binary search (e.g., square root)
double binarySearchDouble(double target, int iterations = 100) {
    double left = 0, right = target;
    for (int i = 0; i < iterations; i++) {
        double mid = (left + right) / 2.0;
        if (mid * mid <= target) left = mid;
        else right = mid;
    }
    return left;
}
```

**Common Mistakes:**
- 오버플로우: `mid = (left + right) / 2` 대신 `mid = left + (right - left) / 2` 사용 권장 / Overflow: Use `mid = left + (right - left) / 2` instead of `mid = (left + right) / 2`
- 종료 조건: `left <= right` vs `left < right` 구분 / Termination: Distinguish `left <= right` vs `left < right`
- 부동소수점: 정확한 비교 대신 오차 허용 비교 사용 / Floating point: Use error-tolerant comparison instead of exact comparison

**Possible Questions:**
- How does binary search work? (EN: Explain the algorithm step by step. KR: 알고리즘을 단계별로 설명하세요.)
- What is the time complexity and why? (EN: $\mathcal{O}(\log n)$ because we halve the search space each time. KR: 검색 공간을 매번 절반으로 줄이므로 $\mathcal{O}(\log n)$.)
- Can you apply binary search to non-array problems? (EN: Yes, on monotonic functions or continuous intervals. KR: 네, 단조 함수나 연속 구간에 적용 가능합니다.)

---

## 2. Union-Find (Disjoint Set Union)

- **Purpose:** Maintain a partition of a set efficiently. / 집합의 분할을 효율적으로 유지.
- **Operations:**
  - `find(x)`: Find the representative (root) of the set containing $x$. / $x$가 속한 집합의 대표 원소(루트) 찾기.
  - `union(x, y)`: Merge sets containing $x$ and $y$. / $x$와 $y$가 속한 집합 합치기.
- **Optimizations:**
  - **Path Compression / 경로 압축:** During `find`, make all nodes point directly to root. / `find` 중 모든 노드를 루트에 직접 연결.
  - **Weighted Union / 가중치 합치기:** Always attach smaller tree to larger tree. / 작은 트리를 큰 트리에 붙임.
- **Time Complexity:** Amortized $\mathcal{O}(\alpha(n))$ where $\alpha$ is the inverse Ackermann function (practically constant). / 평균 $\mathcal{O}(\alpha(n))$ ($\alpha$는 역 아커만 함수, 실질적으로 상수).
- **Applications:** Kruskal's algorithm, connectivity queries, cycle detection. / Kruskal 알고리즘, 연결성 쿼리, 사이클 탐지.

**Real Problem Applications:**
- **Road Destruction (roa):** Union-Find is used in Kruskal's algorithm to find Maximum Spanning Tree. We sort edges by capacity (descending), then use Union-Find to check if adding an edge creates a cycle. The MST gives the roads to keep, and the rest are closed. (EN: Kruskal's MST algorithm uses Union-Find to efficiently check connectivity and avoid cycles. KR: Kruskal의 MST 알고리즘이 Union-Find를 사용하여 연결성을 효율적으로 확인하고 사이클을 방지합니다.)

**Visualization:**

**Union-Find Tree Structure:**
```
Before Path Compression:
    1                   4
   / \                 / \
  2   3               5   6
 / \
7   8

After find(7) with Path Compression:
    1
   /|\
  2 3 7
  |
  8

All nodes now point directly to root 1.
```

**Union Operation (Weighted Union):**
```
Before union(1,4):
Set 1:    1          Set 2:    4
         / \                   / \
        2   3                 5   6
       / \
      7   8

After union(1,4) - attach smaller to larger:
        1
       /|\
      2 3 4
     /|  / \
    7 8 5   6
```

**Path Compression Example:**
```
Before: 1 → 2 → 3 → 4 → 5
        (finding 5 requires 4 steps)

After find(5) with path compression:
        1
       /|\
      2 3 5
      |
      4
      (all nodes point to root)
```

**Implementation Example 예시:**
```cpp
class UnionFind {
private:
    vector<int> parent, size;
    
public:
    UnionFind(int n) : parent(n+1), size(n+1, 1) {
        for (int i = 1; i <= n; i++) {
            parent[i] = i;
        }
    }
    
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);  // 경로 압축 / Path compression
        }
        return parent[x];
    }
    
    void unite(int a, int b) {
        a = find(a);
        b = find(b);
        if (a == b) return;
        
        // 가중치 합치기 / Weighted union
        if (size[a] < size[b]) swap(a, b);
        parent[b] = a;
        size[a] += size[b];
    }
    
    bool same(int a, int b) {
        return find(a) == find(b);
    }
};
```

**Common Mistakes:**
- 경로 압축 누락: `find`에서 재귀 호출 후 부모 업데이트 필수 / Missing path compression: Must update parent after recursive call in `find`
- 가중치 합치기 누락: 작은 트리를 큰 트리에 붙여야 함 / Missing weighted union: Must attach smaller tree to larger tree
- 초기화: `parent[i] = i`로 자기 자신을 부모로 설정 / Initialization: Set `parent[i] = i` to make each element its own parent

**Complexity Analysis:**

| Operation | Without Optimization 없음 | With Path Compression / 경로 압축 | With Both / 둘 다 |
|:---|:---|:---|:---|
| `find(x)` | $\mathcal{O}(n)$ worst case / 최악 $n$ | $\mathcal{O}(\log n)$ amortized / 평균 $\log n$ | $\mathcal{O}(\alpha(n))$ amortized / 평균 $\alpha(n)$ |
| `union(x,y)` | $\mathcal{O}(n)$ worst case / 최악 $n$ | $\mathcal{O}(\log n)$ amortized / 평균 $\log n$ | $\mathcal{O}(\alpha(n))$ amortized / 평균 $\alpha(n)$ |
| **Space / 공간** | $\mathcal{O}(n)$ | $\mathcal{O}(n)$ | $\mathcal{O}(n)$ |

**Why $\alpha(n)$ is practically constant / $\alpha(n)$가 실질적으로 상수인 이유:**
- $\alpha(61) = 3$
- $\alpha(2^{65536}) \approx 4$
- For any practical input size, $\alpha(n) \leq 4$ / 실용적인 입력 크기에서 $\alpha(n) \leq 4$

**Possible Questions:**
- Explain path compression and weighted union. (EN: Path compression flattens the tree during find. Weighted union keeps trees balanced. KR: 경로 압축은 find 중 트리를 평평하게 만듭니다. 가중치 합치기는 트리를 균형있게 유지합니다.)
- Why is the complexity practically constant? (EN: Inverse Ackermann function grows extremely slowly. KR: 역 아커만 함수가 매우 느리게 증가하기 때문입니다.)

**Visual Resources:**

{% include embed/youtube.html id='ayW5B2W9hfo' %}

{% include embed/youtube.html id='92UpvDXc8fs' %}

**References:**
* [https://cp-algorithms.com/data_structures/disjoint_set_union.html](https://cp-algorithms.com/data_structures/disjoint_set_union.html)
* [https://velog.io/@jxlhe46/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EC%9C%A0%EB%8B%88%EC%98%A8-%ED%8C%8C%EC%9D%B8%EB%93%9C-Union-Find](https://velog.io/@jxlhe46/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EC%9C%A0%EB%8B%88%EC%98%A8-%ED%8C%8C%EC%9D%B8%EB%93%9C-Union-Find)
* [https://www.geeksforgeeks.org/dsa/introduction-to-disjoint-set-data-structure-or-union-find-algorithm/](https://www.geeksforgeeks.org/dsa/introduction-to-disjoint-set-data-structure-or-union-find-algorithm/)


