---
layout: post
title: "[Java] Remove Duplicates from Sorted Array"
date: 2025-09-03 16:32 +0200
categories: [Data Structures and Algorithms , LeetCode-Top Interview 150]
tags: [arrays, two-pointers, top-interview-150, easy]
---


> Feel free to leave a comment or contact me if you spot any errors or have feedback. I'm always open to learning!
{: .prompt-tip }
 

# [Java] Remove Duplicates from Sorted Array

LeetCode Problem #26 [🔗 LeetCode Link](https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/?envType=study-plan-v2&envId=top-interview-150)


Espeically, this problem is in the Must-do List for Interview Prep in Leetcode. 


## Description

Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.

Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:


- Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.

- Return k.


## Example


* **Input**: nums = [0,0,1,1,1,2,2,3,3,4]
* **Output**: 5, nums = [0,1,2,3,4,\_,\_,\_,\_,\_]
* **Explanation**: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively. It does not matter what you leave beyond the returned k (hence they are underscores).


## Constraints

- 1 <= nums.length <= 3 * 104
- -100 <= nums[i] <= 100
- nums is sorted in non-decreasing order.


## My Solution

```java
class Solution {
    public int removeDuplicates(int[] nums) {
        int temp = nums[0];
        int cnt = 1;
        int[] copiedNums = new int[nums.length];

        // deep copy
        for (int i = 0; i < copiedNums.length; ++i) {
            copiedNums[i] = nums[i];
        }

        // check duplication
        for (int i = 1; i < copiedNums.length; ++i) {
            if (copiedNums[i] == temp) {
                copiedNums[i] = -101;
            } else {
                temp = copiedNums[i];
                cnt++;
            }
        }

        // copy value to original array
        for (int i = 0, j = 0; i < copiedNums.length; ++i) {
            if (copiedNums[i] != -101) {
                nums[j++] = copiedNums[i];
            }
        }

        return cnt;
    }
}
```

