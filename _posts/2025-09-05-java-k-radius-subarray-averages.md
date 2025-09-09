---
layout: post
title: "[Java] K Radius Subarray Averages"
date: 2025-09-05 13:11 +0200
categories: [Data Structures and Algorithms, LeetCode-Top Interview]
tags: [array, sliding-window, medium]
---


> Feel free to leave a comment or contact me if you spot any errors or have feedback. I'm always open to learning!
{: .prompt-tip }


# K Radius Subarray Averages


LeetCode Problem #2090 [🔗 LeetCode Link](https://leetcode.com/problems/k-radius-subarray-averages/)


## My Solution 1

- Time Complexity: O(n)
- Space Complexity: O(1)

```java
class Solution {
    public int[] getAverages(int[] nums, int k) {
        if (k == 0) {
            return nums;
        }

        int[] avgArr = new int[nums.length];
        long windowSum = 0;
        Arrays.fill(avgArr, -1);

        if (nums.length < 2 * k + 1) {
            return avgArr;
        }

        // calculate first half of sliding window
        for (int i = 0; i < 2 * k + 1; ++i) {
            windowSum += nums[i];
        }

        avgArr[k] = (int) (windowSum / (2 * k + 1));

        for (int i = 2 * k + 1; i < nums.length; ++i) {
            windowSum = windowSum - nums[i-(2 * k + 1)] + nums[i];
            avgArr[i-k] = (int) (windowSum / (2 * k + 1));
        }
        
        return avgArr;
    }
}
```

## My Solution 2


```java
class Solution {
    public int[] getAverages(int[] nums, int k) {
        if (k == 0) {   // edge case
            return nums;
        }

        int n = nums.length;
        int windowSize = 2 * k + 1;
        long windowSum = 0;
        int[] avgArray = new int[n];

        Arrays.fill(avgArray, -1);

        if (n < k) {
            return avgArray;
        }

        System.out.println(windowSize);
        for (int left = 0, right = 0; right < n; ++right) {
            windowSum += nums[right];
            
            // window is full
            if (right >= windowSize-1) {
                avgArray[left+k] = (int) (windowSum / windowSize);
                windowSum -= nums[left];    // substitute first element
                left++;
            }
        }

        return avgArray;
    }
}
```
