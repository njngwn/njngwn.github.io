---
layout: post
title: 'Sliding Window & Two Pointers (슬라이딩 윈도우 & 투 포인터)'
date: 2025-09-04 21:34 +0200
categories: [Data Structures and Algorithms, Algorithms]
tags: [algorithms, sliding-window, two-pointers, array]
math: true
---

# Sliding Window & Two Pointers (슬라이딩 윈도우 & 투 포인터)

## Overview

Sliding Window and Two Pointers are essential techniques for solving array and string problems efficiently. They help reduce time complexity from $\mathcal{O}(n^2)$ to $\mathcal{O}(n)$ in many cases.

## 1. Sliding Window

### Key Ideas
- **Fixed/Variable Window:** Maintain a window of elements
- **Expand/Shrink:** Adjust window size based on condition
- **Efficiency:** Avoid recalculating from scratch

### Time Complexity
- **Typical:** $\mathcal{O}(n)$ - each element visited at most twice
- **Space:** $\mathcal{O}(1)$ or $\mathcal{O}(k)$ where k is window size

### Types

#### Fixed Window Size
```cpp
// Find maximum sum of subarray of size k
int maxSumSubarray(vector<int>& arr, int k) {
    int n = arr.size();
    int windowSum = 0;
    
    // Calculate first window
    for (int i = 0; i < k; i++)
        windowSum += arr[i];
    
    int maxSum = windowSum;
    
    // Slide window
    for (int i = k; i < n; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = max(maxSum, windowSum);
    }
    
    return maxSum;
}
```

#### Variable Window Size
```cpp
// Find minimum length subarray with sum >= target
int minSubarrayLen(vector<int>& arr, int target) {
    int n = arr.size();
    int left = 0, sum = 0;
    int minLen = INT_MAX;
    
    for (int right = 0; right < n; right++) {
        sum += arr[right];
        
        while (sum >= target) {
            minLen = min(minLen, right - left + 1);
            sum -= arr[left];
            left++;
        }
    }
    
    return minLen == INT_MAX ? 0 : minLen;
}
```

### Visualization

**Fixed Window (k=3):**
```
Array: [1, 4, 2, 10, 23, 3, 1, 0, 20]
Window 1: [1, 4, 2]     sum = 7
Window 2:    [4, 2, 10]  sum = 16
Window 3:       [2, 10, 23] sum = 35 ← max
Window 4:          [10, 23, 3] sum = 36 ← max
...
```

**Variable Window:**
```
Array: [2, 3, 1, 2, 4, 3], target = 7
Step 1: [2, 3, 1, 2] sum=8 >= 7, len=4
Step 2: [3, 1, 2, 4] sum=10 >= 7, len=4
Step 3: [1, 2, 4] sum=7 >= 7, len=3 ← min
Step 4: [2, 4, 3] sum=9 >= 7, len=3
Step 5: [4, 3] sum=7 >= 7, len=2 ← min
```

### Common Patterns

1. **Maximum/Minimum in Window**
   - Use deque to track max/min efficiently

2. **Longest Substring with K Distinct Characters**
   - Expand window, shrink when distinct > k

3. **Anagram Substring Search**
   - Compare character frequency maps

---

## 2. Two Pointers

### Key Ideas
- **Two Pointers:** Use two pointers moving in array
- **Direction:** Same direction or opposite directions
- **Condition:** Move pointers based on problem condition

### Types

#### Same Direction (Fast & Slow)
```cpp
// Remove duplicates from sorted array
int removeDuplicates(vector<int>& nums) {
    if (nums.empty()) return 0;
    
    int slow = 0;
    for (int fast = 1; fast < nums.size(); fast++) {
        if (nums[fast] != nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    return slow + 1;
}
```

#### Opposite Directions
```cpp
// Two Sum in sorted array
vector<int> twoSum(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) {
            return {left, right};
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return {};
}
```

### Visualization

**Same Direction:**
```
Array: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
        s   f
        s       f  (copy 1)
           s       f
           s           f  (copy 2)
              s           f
              s               f  (copy 3)
                 s               f
                 s                   f  (copy 4)
Result: [0, 1, 2, 3, 4, ...]
```

**Opposite Directions:**
```
Array: [2, 7, 11, 15], target = 9
        l           r
        sum = 2 + 15 = 17 > 9 → r--
        l        r
        sum = 2 + 11 = 13 > 9 → r--
        l     r
        sum = 2 + 7 = 9 ✓ found!
```

---

## 3. When to Use

### Sliding Window
- ✅ Subarray/substring problems
- ✅ Fixed or variable window size
- ✅ Need to track window state (sum, max, distinct chars)

### Two Pointers
- ✅ Sorted array problems
- ✅ Palindrome checking
- ✅ Pair finding (two sum, three sum)
- ✅ In-place array modification

---

## 4. Common Problems

### Sliding Window
- Maximum sum subarray of size k
- Longest substring without repeating characters
- Minimum window substring
- Maximum average subarray

### Two Pointers
- Two sum / Three sum
- Remove duplicates
- Container with most water
- Valid palindrome
- Merge sorted arrays

---

## 5. Complexity Analysis

| Technique | Time | Space | Use Case |
|:---|:---|:---|:---|
| **Sliding Window** | $\mathcal{O}(n)$ | $\mathcal{O}(1)$ or $\mathcal{O}(k)$ | Subarray problems |
| **Two Pointers (Same)** | $\mathcal{O}(n)$ | $\mathcal{O}(1)$ | In-place modification |
| **Two Pointers (Opposite)** | $\mathcal{O}(n)$ | $\mathcal{O}(1)$ | Sorted array problems |

---

## Key Insights

1. **Sliding Window reduces O(n²) to O(n)**
   - Instead of checking all subarrays, maintain window state

2. **Two Pointers eliminates need for nested loops**
   - Use array properties (sorted, constraints) to move pointers

3. **Both techniques are often combined**
   - Sliding window with two pointers for optimization

---

## Common Mistakes

1. **Off-by-one errors** in window boundaries
2. **Not updating window state** when sliding
3. **Moving pointers incorrectly** in two pointers
4. **Forgetting to handle edge cases** (empty array, single element)

---

## References

* [https://www.geeksforgeeks.org/window-sliding-technique/](https://www.geeksforgeeks.org/window-sliding-technique/)
* [https://algorithm-visualizer.org/dynamic-programming/sliding-window](https://algorithm-visualizer.org/dynamic-programming/sliding-window)