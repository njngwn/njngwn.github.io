---
layout: post
title: "[Java] Rotate Array"
date: 2025-09-03 20:32 +0200
categories: [Data Structures and Algorithms , LeetCode-Top Interview 150]
tags: [array, two-pointers, top-interview-150, math, ]
---


> Feel free to leave a comment or contact me if you spot any errors or have feedback. I'm always open to learning!
{: .prompt-tip }
 

# [Java] Rotate Array

LeetCode Problem #189 [🔗 LeetCode Link](https://leetcode.com/problems/rotate-array/description/?envType=study-plan-v2&envId=top-interview-150)


Espeically, this problem is in the Must-do List for Interview Prep in Leetcode. 


## Description

Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.


## Example


* **Input**: nums = [1,2,3,4,5,6,7], k = 3
* **Output**: [5,6,7,1,2,3,4]
* **Explanation**:\
rotate 1 steps to the right: [7,1,2,3,4,5,6]\
rotate 2 steps to the right: [6,7,1,2,3,4,5]\
rotate 3 steps to the right: [5,6,7,1,2,3,4]


## Constraints

- 1 <= nums.length <= 105
- -231 <= nums[i] <= 231 - 1
- 0 <= k <= 105



## My Solution

We just need reversing arrays 3 times. For instance,

[1, 2, 3, 4, 5, 6, 7], k = 3 

First, reverse the whole array: [7, 6, 5, 4, 3, 2, 1]

And then reverse the first k-elements: [5, 6, 7, 4, 3, 2, 1].

Also, reverse the remaining elements: [5, 6, 7, 1, 2, 3, 4].


Another hack is that we don't need to rotate as many as k. For example, if array is [1, 2, 3, 4] and k is 7. The results of rotating 8 times and rotating 3 times are same as the array become the first array after 4 rotations, which is the length of array.



```java
class Solution {
    public void rotate(int[] nums, int k) {
        k = k % nums.length;

        // reverse whole array
        reverse(nums, 0, nums.length-1);
        // reverse k element
        reverse(nums, 0, k-1);
        // reverse nums.length-k element
        reverse(nums, k, nums.length-1);
    }

    public void reverse(int[] nums, int start, int end) {
        while (start <= end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    }
}
```
