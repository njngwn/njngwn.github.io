---
layout: post
title: 'Priority Queue & Heap (우선순위 큐 & 힙)'
date: 2025-11-07 16:32 +0100
categories: [Data Structures and Algorithms, Data Structures]
tags: [data-structures, priority-queue, heap, min-heap, max-heap]
math: true
---

# Priority Queue & Heap (우선순위 큐 & 힙)

## Overview

Priority Queue is an abstract data type, and Heap is its most common implementation. Understanding heaps is crucial for many algorithms including Dijkstra's, Prim's, and heap sort.

## 1. Priority Queue

### Definition
- **Priority Queue:** Queue where elements are served based on priority
- **Operations:**
  - `insert(x)`: Add element with priority
  - `extractMin()` or `extractMax()`: Remove highest priority element
  - `peek()`: View highest priority element without removing

### Use Cases
- Task scheduling
- Dijkstra's algorithm
- Prim's MST algorithm
- Merge k sorted lists
- Find k largest/smallest elements

---

## 2. Heap

### Definition
- **Heap:** Complete binary tree with heap property
- **Min-Heap:** Parent ≤ children (root is minimum)
- **Max-Heap:** Parent ≥ children (root is maximum)

### Properties
- **Complete Binary Tree:** All levels filled except possibly last, filled left to right
- **Heap Property:** Parent-child relationship maintained
- **Array Representation:** Parent at index $i$, children at $2i+1$ and $2i+2$

### Array Representation

```
Tree:           Array: [10, 20, 15, 30, 40]
      10
     /  \
   20    15
  /  \
 30   40

Index:  0   1   2   3   4
Value: 10  20  15  30  40

Parent(i) = (i-1)/2
Left(i) = 2i+1
Right(i) = 2i+2
```

---

## 3. Heap Operations

### Insert (Bubble Up)
```cpp
void insert(vector<int>& heap, int val) {
    heap.push_back(val);
    int i = heap.size() - 1;
    
    // Bubble up
    while (i > 0 && heap[(i-1)/2] > heap[i]) {
        swap(heap[i], heap[(i-1)/2]);
        i = (i-1)/2;
    }
}
```

**Time Complexity:** $\mathcal{O}(\log n)$

### Extract Min (Bubble Down)
```cpp
int extractMin(vector<int>& heap) {
    if (heap.empty()) return -1;
    
    int min = heap[0];
    heap[0] = heap.back();
    heap.pop_back();
    
    if (!heap.empty()) {
        heapifyDown(heap, 0);
    }
    
    return min;
}

void heapifyDown(vector<int>& heap, int i) {
    int smallest = i;
    int left = 2*i + 1;
    int right = 2*i + 2;
    int n = heap.size();
    
    if (left < n && heap[left] < heap[smallest])
        smallest = left;
    if (right < n && heap[right] < heap[smallest])
        smallest = right;
    
    if (smallest != i) {
        swap(heap[i], heap[smallest]);
        heapifyDown(heap, smallest);
    }
}
```

**Time Complexity:** $\mathcal{O}(\log n)$

### Build Heap from Array
```cpp
void buildHeap(vector<int>& arr) {
    int n = arr.size();
    // Start from last non-leaf node
    for (int i = n/2 - 1; i >= 0; i--) {
        heapifyDown(arr, i);
    }
}
```

**Time Complexity:** $\mathcal{O}(n)$ - seems like O(n log n) but tighter analysis gives O(n)

### Visualization

**Insert 5 into min-heap:**
```
Before:       10
            /  \
          20    15
         /  \
        30   40

Insert 5:
Step 1:       10
            /  \
          20    15
         /  \  /
        30  40 5

Step 2: Bubble up 5
        10
       /  \
      5    15
     / \  /
   20  40 30

Step 3: Bubble up 5
        5
       /  \
     10    15
     / \  /
   20  40 30
```

**Extract Min:**
```
Before:       5
            /  \
          10    15
         /  \  /
       20   40 30

Step 1: Replace root with last
        30
       /  \
     10    15
     / \
   20   40

Step 2: Bubble down 30
        10
       /  \
     30    15
     / \
   20   40

Step 3: Continue bubbling
        10
       /  \
     20    15
     / \
   30   40
```

---

## 4. Time Complexity

| Operation | Time | Space |
|:---|:---|:---|
| **Insert** | $\mathcal{O}(\log n)$ | $\mathcal{O}(1)$ |
| **Extract Min/Max** | $\mathcal{O}(\log n)$ | $\mathcal{O}(1)$ |
| **Peek** | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ |
| **Build Heap** | $\mathcal{O}(n)$ | $\mathcal{O}(1)$ |
| **Heapify** | $\mathcal{O}(\log n)$ | $\mathcal{O}(1)$ |

---

## 5. Heap vs Other Data Structures

| Operation | Heap | Sorted Array | Balanced BST |
|:---|:---|:---|:---|
| **Insert** | $\mathcal{O}(\log n)$ | $\mathcal{O}(n)$ | $\mathcal{O}(\log n)$ |
| **Extract Min** | $\mathcal{O}(\log n)$ | $\mathcal{O}(1)$ | $\mathcal{O}(\log n)$ |
| **Peek** | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ |
| **Build** | $\mathcal{O}(n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ |

**Heap Advantages:**
- Fast insertion and extraction
- O(n) build time
- Space efficient (array representation)

---

## 6. Applications

### 1. Heap Sort
- Build max-heap
- Repeatedly extract max and place at end
- Time: O(n log n), Space: O(1)

### 2. Dijkstra's Algorithm
- Use min-heap to always process closest unvisited vertex
- Reduces time from O(V²) to O(E + V log V)

### 3. Prim's MST
- Use min-heap to find minimum weight edge
- Efficient for sparse graphs

### 4. Merge K Sorted Lists
- Insert first element of each list into min-heap
- Extract min, add next element from same list

### 5. Find K Largest Elements
- Use min-heap of size k
- Keep k largest elements

---

## 7. Implementation in C++

### Using STL
```cpp
#include <queue>
#include <vector>

// Min-heap (default)
priority_queue<int, vector<int>, greater<int>> minHeap;

// Max-heap
priority_queue<int> maxHeap;

// Operations
minHeap.push(10);
int top = minHeap.top();
minHeap.pop();
```

### Custom Comparator
```cpp
struct Compare {
    bool operator()(pair<int, int> a, pair<int, int> b) {
        return a.second > b.second; // Min-heap by second element
    }
};

priority_queue<pair<int, int>, vector<pair<int, int>>, Compare> pq;
```

---

## 8. Key Insights

1. **Heap is complete binary tree**
   - Allows array representation
   - Efficient memory usage

2. **Heap property maintained during operations**
   - Insert: bubble up
   - Extract: bubble down

3. **Build heap is O(n) not O(n log n)**
   - Most nodes are near bottom
   - Fewer operations for lower levels

4. **Heap vs Priority Queue**
   - Priority Queue is abstract data type
   - Heap is concrete implementation

---

## Common Mistakes

1. **Confusing min-heap and max-heap**
   - Min-heap: root is minimum
   - Max-heap: root is maximum

2. **Index calculation errors**
   - Parent: (i-1)/2
   - Left: 2i+1, Right: 2i+2

3. **Not maintaining heap property**
   - Must bubble up/down after modifications

4. **Using wrong heap type**
   - Dijkstra needs min-heap
   - K largest needs min-heap of size k

---

## References

* [https://www.geeksforgeeks.org/dsa/priority-queue-set-1-introduction/](https://www.geeksforgeeks.org/dsa/priority-queue-set-1-introduction/)
* [https://www.geeksforgeeks.org/binary-heap/](https://www.geeksforgeeks.org/binary-heap/)
