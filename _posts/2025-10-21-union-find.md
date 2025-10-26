---
layout: post
title: Union Find
date: 2025-10-21 14:28 +0200
categories: [Data Structures and Algorithms, Data Structures]
tags: [data-structures, union-find]
---

# Union Find


두 노드가 같은 집합에 속하는지 판별하는 알고리즘. 반대로 서로 연결되지 않은 노드를 판별할 수도 있음.

노드를 합치는 union 연산과 루트 노드를 찾는 find 연산으로 이루어진다. 

각 그룹마다 루트 노드를 정해줘서 각 노드의 루트 노드를 확인해서 두 노드의 루트 노드가 같다면, 두 노드는 연결되어 있다고 볼 수 있다.


{% include embed/youtube.html id='ayW5B2W9hfo' %}

{% include embed/youtube.html id='92UpvDXc8fs' %}


## References

* [https://cp-algorithms.com/data_structures/disjoint_set_union.html](https://cp-algorithms.com/data_structures/disjoint_set_union.html)
* [https://velog.io/@jxlhe46/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EC%9C%A0%EB%8B%88%EC%98%A8-%ED%8C%8C%EC%9D%B8%EB%93%9C-Union-Find](https://velog.io/@jxlhe46/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EC%9C%A0%EB%8B%88%EC%98%A8-%ED%8C%8C%EC%9D%B8%EB%93%9C-Union-Find)