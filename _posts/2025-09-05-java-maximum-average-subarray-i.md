---
layout: post
title: "[Java] Maximum Average Subarray I"
date: 2025-09-05 12:17 +0200
categories: [Data Structures and Algorithms, LeetCode]
tags: [array, sliding-window, easy]
---


> Feel free to leave a comment or contact me if you spot any errors or have feedback. I'm always open to learning!
{: .prompt-tip }


# Maximum Average Subarray I


LeetCode Problem #643 [🔗 LeetCode Link](https://leetcode.com/problems/maximum-average-subarray-i/description/)


## Description

You are given an integer array nums consisting of n elements, and an integer k.

Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value. Any answer with a calculation error less than 10-5 will be accepted.


## My solution

I realized that I am not familiar with sliding window algorithms. That's why I chose this problem. In this problem, I don't need to store each element of sliding element, but store the maximum sum of each window. Through this approach, I can optimize space complexity. 


```java
class Solution {
    public double findMaxAverage(int[] nums, int k) {
        int windowSum = 0;
        int maxSum = 0;

        // set first window
        for (int i = 0; i < k; ++i) {
            windowSum += nums[i];
        }

        maxSum = windowSum;

        for (int i = k; i < nums.length; ++i) {
            windowSum = windowSum - nums[i-k] + nums[i];    // remove first element and add new element
            maxSum = Math.max(maxSum, windowSum);
        }

        return (double) maxSum / k;
    }
}
```

## References

- [https://algo.monster/liteproblems/643](https://algo.monster/liteproblems/643)