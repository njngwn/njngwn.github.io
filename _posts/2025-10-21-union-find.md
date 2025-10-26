---
layout: post
title: Union Find
date: 2025-10-21 14:28 +0200
categories: [Data Structures and Algorithms, Data Structures]
tags: [data-structures, union-find]
---

# Union Find (Disjoint Set)


두 노드가 같은 집합에 속하는지 판별하는 알고리즘. 반대로 서로 연결되지 않은 노드를 판별할 수도 있음.

노드를 합치는 union 연산과 루트 노드를 찾는 find 연산으로 이루어진다. 

각 그룹마다 루트 노드를 정해줘서 각 노드의 루트 노드를 확인해서 두 노드의 루트 노드가 같다면, 두 노드는 연결되어 있다고 볼 수 있다.


{% include embed/youtube.html id='ayW5B2W9hfo' %}

{% include embed/youtube.html id='92UpvDXc8fs' %}


## Code

These codes are from [geeksforgeeks](https://www.geeksforgeeks.org/dsa/introduction-to-disjoint-set-data-structure-or-union-find-algorithm/)

### Java

```java
import java.util.Arrays;

public class UnionFind {
    private int[] parent;

    public UnionFind(int size) {
      
        // Initialize the parent array with each 
        // element as its own representative
        parent = new int[size];
        for (int i = 0; i < size; i++) {
            parent[i] = i;
        }
    }

    // Find the representative (root) of the 
    // set that includes element i
    public int find(int i) {
      
        // if i itself is root or representative
        if (parent[i] == i) {
            return i;
        }
      
        // Else recursively find the representative
        // of the parent 
        return find(parent[i]);
    }

    // Unite (merge) the set that includes element 
    // i and the set that includes element j
    public void union(int i, int j) {
      
        // Representative of set containing i
        int irep = find(i);

        // Representative of set containing j
        int jrep = find(j);

        // Make the representative of i's set be 
        // the representative of j's set
        parent[irep] = jrep;
    }

    public static void main(String[] args) {
        int size = 5;
        UnionFind uf = new UnionFind(size);
        uf.union(1, 2);
        uf.union(3, 4);
        boolean inSameSet = uf.find(1) == uf.find(2);
        System.out.println("Are 1 and 2 in the same set? " + inSameSet);
    }
}
```

### C++

```c++
#include <iostream>
#include <vector>
using namespace std;

class UnionFind {
    vector<int> parent;
public:
    UnionFind(int size) {
      
        parent.resize(size);
      
        // Initialize the parent array with each 
        // element as its own representative
        for (int i = 0; i < size; i++) {
            parent[i] = i;
        }
    }

    // Find the representative (root) of the
    // set that includes element i
    int find(int i) {
      
        // If i itself is root or representative
        if (parent[i] == i) {
            return i;
        }
      
        // Else recursively find the representative 
        // of the parent
        return find(parent[i]);
    }

    // Unite (merge) the set that includes element 
    // i and the set that includes element j
    void unite(int i, int j) {
      
        // Representative of set containing i
        int irep = find(i);
      
        // Representative of set containing j
        int jrep = find(j);
       
        // Make the representative of i's set
        // be the representative of j's set
        parent[irep] = jrep;
    }
};

int main() {
    int size = 5;
    UnionFind uf(size);
    uf.unite(1, 2);
    uf.unite(3, 4);
    bool inSameSet = (uf.find(1) == uf.find(2));
    cout << "Are 1 and 2 in the same set? " 
         << (inSameSet ? "Yes" : "No") << endl;
    return 0;
}
```


## References

* [https://cp-algorithms.com/data_structures/disjoint_set_union.html](https://cp-algorithms.com/data_structures/disjoint_set_union.html)
* [https://velog.io/@jxlhe46/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EC%9C%A0%EB%8B%88%EC%98%A8-%ED%8C%8C%EC%9D%B8%EB%93%9C-Union-Find](https://velog.io/@jxlhe46/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EC%9C%A0%EB%8B%88%EC%98%A8-%ED%8C%8C%EC%9D%B8%EB%93%9C-Union-Find)
* [https://www.geeksforgeeks.org/dsa/introduction-to-disjoint-set-data-structure-or-union-find-algorithm/](https://www.geeksforgeeks.org/dsa/introduction-to-disjoint-set-data-structure-or-union-find-algorithm/)
