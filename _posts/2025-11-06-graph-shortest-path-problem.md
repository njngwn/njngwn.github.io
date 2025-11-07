---
layout: post
title: 'Graph: Shortest/Longest Path Problem'
date: 2025-11-06 11:22 +0100
categories: [Data Structures and Algorithms, Algorithms]
tags: [algorithms, graph, sssp, apsp, dijkstra, bellman-ford, floyd-warshall]
---

# Graph: Shortest Path Problem

- Single Pair Shortest Path (SPSP): find a shortest path between two nodes
- Single Source Shortest Path (SSSP): find a shortest path between one node and all the other nodes
- All Pairs Shortest PAth (APSP): find a shortest path between all pairs of nodes


## Single Source Shortest Path (SSSP)

### Dikstra's Algorithm

- Solve the SSSP for graph with non-negative weights
- Using graph exploration similar to DFS/BFS, but use priority queue instead if having a stack/queue as worklist
- priority given by distance to source state
- keep track of predecessors to construct shortest paths


### Bellman-Ford Algorithm

- solves SSSP even if the graph has **negative edge weights**
- update distance by considering each edge and repeat |V|-1 times
- some constant-factor optimizations possible


## All Pairs Shortest Path (APSP)

### Floyd-Warshall Algorithm



# Graph: Longest Path Problem