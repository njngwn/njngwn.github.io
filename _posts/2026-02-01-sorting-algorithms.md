---
layout: post
title: 'Sorting Algorithms (정렬 알고리즘)'
date: 2026-02-01 00:00 +0100
categories: [Data Structures and Algorithms, Algorithms]
tags: [algorithms, sorting, quicksort, mergesort, heapsort, comparison-sort]
math: true
---

# Sorting Algorithms (정렬 알고리즘)

## Overview

Sorting is one of the most fundamental operations in computer science. Understanding different sorting algorithms and their trade-offs is essential for coding interviews and real-world applications.

## Comparison of Sorting Algorithms

| Algorithm | Best Case | Average Case | Worst Case | Space | Stable | In-place |
|:---|:---|:---|:---|:---|:---|:---|
| **Quick Sort** | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(\log n)$ | ❌ No | ✅ Yes |
| **Merge Sort** | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n)$ | ✅ Yes | ❌ No |
| **Heap Sort** | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(1)$ | ❌ No | ✅ Yes |
| **Insertion Sort** | $\mathcal{O}(n)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(1)$ | ✅ Yes | ✅ Yes |
| **Bubble Sort** | $\mathcal{O}(n)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(1)$ | ✅ Yes | ✅ Yes |

## 1. Quick Sort

### Key Ideas
- **Divide and Conquer:** Partition array around a pivot
- **Pivot Selection:** Choose pivot (first, last, middle, or random)
- **Partition:** Rearrange so elements < pivot are left, > pivot are right
- **Recurse:** Sort left and right subarrays

### Time Complexity
- **Best/Average:** $\mathcal{O}(n \log n)$ - balanced partitions
- **Worst:** $\mathcal{O}(n^2)$ - unbalanced partitions (already sorted)
- **Space:** $\mathcal{O}(\log n)$ - recursion stack

### Implementation

```cpp
int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];  // Choose last element as pivot
    int i = low - 1;  // Index of smaller element
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
```

### Visualization

**Partition Process:**
```
Array: [10, 80, 30, 90, 40, 50, 70]
Pivot: 70

Step 1: Compare 10 < 70 → swap with itself
Step 2: Compare 80 > 70 → skip
Step 3: Compare 30 < 70 → swap with 80
Step 4: Compare 90 > 70 → skip
Step 5: Compare 40 < 70 → swap with 80
Step 6: Compare 50 < 70 → swap with 80
Final: [10, 30, 40, 50, 70, 90, 80]
         ↑              ↑  ↑
      < pivot        > pivot pivot
```

### When to Use
- General-purpose sorting
- Average case performance matters
- Memory is limited (in-place)

### Common Mistakes
- Not handling duplicate elements correctly
- Choosing bad pivot (causes worst case)
- Off-by-one errors in partition

---

## 2. Merge Sort

### Key Ideas
- **Divide and Conquer:** Split array in half recursively
- **Merge:** Combine two sorted halves into one sorted array
- **Stable:** Maintains relative order of equal elements

### Time Complexity
- **All Cases:** $\mathcal{O}(n \log n)$ - always balanced
- **Space:** $\mathcal{O}(n)$ - temporary array for merging

### Implementation

```cpp
void merge(vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    vector<int> L(n1), R(n2);
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}
```

### Visualization

**Merge Process:**
```
Left:  [2, 5, 8]    Right: [1, 3, 6]
         ↑              ↑
Compare 2 and 1 → 1 is smaller → output 1
Left:  [2, 5, 8]    Right: [3, 6]
         ↑              ↑
Compare 2 and 3 → 2 is smaller → output 2
...
Result: [1, 2, 3, 5, 6, 8]
```

### When to Use
- Stable sort required
- Worst-case performance guaranteed
- External sorting (large datasets)

---

## 3. Heap Sort

### Key Ideas
- **Heap:** Build max-heap from array
- **Extract:** Repeatedly extract max and place at end
- **In-place:** Uses array itself as heap structure

### Time Complexity
- **All Cases:** $\mathcal{O}(n \log n)$
- **Space:** $\mathcal{O}(1)$ - in-place

### Implementation

```cpp
void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    // Extract elements one by one
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}
```

### Visualization

**Heap Structure:**
```
Array: [4, 10, 3, 5, 1]
Heap:       4
          /   \
        10     3
       /  \
      5    1

After heapify:       10
                   /   \
                  5     3
                 /  \
                4    1
```

### When to Use
- In-place sorting with guaranteed O(n log n)
- Memory-constrained environments
- Priority queue applications

---

## 4. Comparison: Quick Sort vs Merge Sort vs Heap Sort

| Aspect | Quick Sort | Merge Sort | Heap Sort |
|:---|:---|:---|:---|
| **Average Time** | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ |
| **Worst Time** | $\mathcal{O}(n^2)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ |
| **Space** | $\mathcal{O}(\log n)$ | $\mathcal{O}(n)$ | $\mathcal{O}(1)$ |
| **Stable** | ❌ No | ✅ Yes | ❌ No |
| **In-place** | ✅ Yes | ❌ No | ✅ Yes |
| **Best For** | General purpose | Stable sort needed | Memory limited |

---

## 5. Simple Sorting Algorithms

### Insertion Sort
- **Time:** $\mathcal{O}(n^2)$ worst, $\mathcal{O}(n)$ best (nearly sorted)
- **Space:** $\mathcal{O}(1)$
- **Use:** Small arrays, nearly sorted data

### Bubble Sort
- **Time:** $\mathcal{O}(n^2)$
- **Space:** $\mathcal{O}(1)$
- **Use:** Educational purposes only

---

## 6. Non-Comparison Sorts

### Counting Sort
- **Time:** $\mathcal{O}(n + k)$ where k is range
- **Use:** Small integer range

### Radix Sort
- **Time:** $\mathcal{O}(d(n + k))$ where d is digits
- **Use:** Fixed-width integers

---

## Key Concepts

### Stability
- **Stable:** Equal elements maintain relative order
- **Unstable:** Equal elements may swap positions
- **When it matters:** Sorting by multiple keys

### In-place
- **In-place:** Uses $\mathcal{O}(1)$ extra space
- **Not in-place:** Requires additional memory

### Adaptive
- **Adaptive:** Faster on nearly sorted data
- **Non-adaptive:** Same time regardless of input order

---

## Common Interview Questions

1. **When would you use Quick Sort over Merge Sort?**
   - When average performance matters and memory is limited
   - When stability is not required

2. **How do you avoid worst-case O(n²) in Quick Sort?**
   - Use random pivot selection
   - Use median-of-three pivot
   - Switch to insertion sort for small subarrays

3. **Why is Merge Sort stable but Quick Sort is not?**
   - Merge Sort preserves order during merge
   - Quick Sort swaps elements that may change order

4. **What's the space complexity of Quick Sort?**
   - O(log n) for recursion stack in average case
   - O(n) in worst case (unbalanced partitions)

---

## References

* [https://www.geeksforgeeks.org/sorting-algorithms/](https://www.geeksforgeeks.org/sorting-algorithms/)
* [https://en.wikipedia.org/wiki/Sorting_algorithm](https://en.wikipedia.org/wiki/Sorting_algorithm)

