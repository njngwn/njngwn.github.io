---
layout: post
title: "[Java] Clone Graph"
date: 2025-09-11 13:30 +0200
categories: [Data Structures and Algorithms, LeetCode]
tags: [hashset, recursion, graph, medium]
---

# Clone Graph

LeetCode Problem #133 [🔗 LeetCode Link](https://leetcode.com/problems/clone-graph/)


처음에 ArrayList를 사용했다가 그렇게 되면, 복사해야하는 노드랑 복사되어져야하는 노드가 뒤섞여버리는 문제가 발생하게 되었다. Node를 key랑 value 모두에 활용하는 것은 생각치도 못했던 접근법이었다.

그러나 여전히 재귀 탈출하는 조건을 설정하는 게 너무 어려운 것 같다. 



## My Solution

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public List<Node> neighbors;
    public Node() {
        val = 0;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val) {
        val = _val;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val, ArrayList<Node> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
}
*/

class Solution {
    HashMap<Node, Node> nodeMap = new HashMap<>(); // key: original Node, value: copied Node

    public Node cloneGraph(Node node) {
        if (node == null) return null;

        if (nodeMap.containsKey(node)) {
            return nodeMap.get(node);
        }

        Node newNode = new Node(node.val);
        nodeMap.put(node, newNode);

        for (Node neighborNode : node.neighbors) {
            newNode.neighbors.add(cloneGraph(neighborNode));
        }

        return newNode;
    }
}
```