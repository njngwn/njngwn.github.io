---
layout: post
title: "[Java] Remove Element"
date: 2025-09-03 16:08 +0200
categories: [Data Structures and Algorithms , LeetCode-Top Interview 150]
tags: [arrays, two-pointers, top-interview-150, easy]
---

> Feel free to leave a comment or contact me if you spot any errors or have feedback. I'm always open to learning!
{: .prompt-tip }
 

# [Java] Remove Element

LeetCode Problem #27 [🔗 LeetCode Link](https://leetcode.com/problems/remove-element/description/?envType=study-plan-v2&envId=top-interview-150)


Espeically, this problem is in the Must-do List for Interview Prep in Leetcode. 


## Description

Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.

Consider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things:

* Change the array nums such that the first k elements of nums contain the elements which are not equal to val. The remaining elements of nums are not important as well as the size of nums.

* Return k.


## Example


* **Input**: nums = [3, 2, 2, 3], val = 3
* **Output**: 2, nums = [2, 2, \_, \_]
* **Explanation**: Your function should return k = 2, with the first two elements of nums being 2.
It does not matter what you leave beyond the returned k (hence they are underscores).


## My Solution

```java
class Solution {
    public int removeElement(int[] nums, int val) {
        int size = nums.length;
        int leftIdx = 0; 
        int rightIdx = nums.length-1;

        while (leftIdx < rightIdx) {
            if (nums[leftIdx] == val && nums[rightIdx] != val) {
                // swap
                int temp = nums[leftIdx];
                nums[leftIdx] = nums[rightIdx];
                nums[rightIdx] = temp;
            }
            if (nums[leftIdx] != val) leftIdx++;
            if (nums[rightIdx] == val) rightIdx--;
        }

        // count the number which is not val
        for (int i = nums.length-1; i >= 0; --i) {
            if (nums[i] == val) {
                size--;
            }
        }

        return size;
    }
}
```
