---
layout: post
title: "[Java] Majority Element"
date: 2025-09-03 18:59 +0200
categories: [Data Structures and Algorithms , LeetCode-Top Interview 150]
tags: [arrays, two-pointers, top-interview-150, easy]
---


> Feel free to leave a comment or contact me if you spot any errors or have feedback. I'm always open to learning!
{: .prompt-tip }
 

# [Java] Remove Duplicates from Sorted Array

LeetCode Problem #169 [🔗 LeetCode Link](https://leetcode.com/problems/majority-element/description/?envType=study-plan-v2&envId=top-interview-150)


Espeically, this problem is in the Must-do List for Interview Prep in Leetcode. 


## Description

Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.


## Example

### Example 1

* **Input**: nums = [3,2,3]
* **Output**: 3


### Example 2

* **Input**: nums = [2,2,1,1,1,2,2]
* **Output**: 2


## Constraints


- n == nums.length
- 1 <= n <= 5 * 104
- -109 <= nums[i] <= 109



## My Solution

```java
class Solution {
    public int majorityElement(int[] nums) {
        HashMap<Integer, Integer> cntHashMap = new HashMap<>();
        int maxElement = 0;
        int maxCount = 0;

        for (int num : nums) {
            if (cntHashMap.containsKey(num)) {
                cntHashMap.put(num, cntHashMap.get(num)+1);
            } else {
                cntHashMap.put(num, 1);
            }

            if (cntHashMap.get(num) > maxCount) {
                maxElement = num;
                maxCount = cntHashMap.get(num);
            }
        }

        return maxElement;
    }
}
```

