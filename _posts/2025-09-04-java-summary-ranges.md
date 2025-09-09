---
layout: post
title: "[Java] Summary Ranges"
date: 2025-09-04 14:39 +0200
categories: [Data Structures and Algorithms, LeetCode-Top Interview 150]
tags: [array, top-interview-150, easy]
---


> Feel free to leave a comment or contact me if you spot any errors or have feedback. I'm always open to learning!
{: .prompt-tip }
 

# [Java] Summary Ranges

LeetCode Problem #228 [🔗 LeetCode Link](https://leetcode.com/problems/summary-ranges/?envType=study-plan-v2&envId=top-interview-150)


Espeically, this problem is in the Must-do List for Interview Prep in Leetcode. 


## Description

You are given a sorted unique integer array nums.

A range [a,b] is the set of all integers from a to b (inclusive).

Return the smallest sorted list of ranges that cover all the numbers in the array exactly. That is, each element of nums is covered by exactly one of the ranges, and there is no integer x such that x is in one of the ranges but not in nums.

Each range [a,b] in the list should be output as:

- "a->b" if a != b
- "a" if a == b


## Example

### Example 1

* **Input**: nums = [0,1,2,4,5,7]
* **Output**: ["0->2","4->5","7"]
* **Explanation**: The ranges are:
[0,2] --> "0->2"
[4,5] --> "4->5"
[7,7] --> "7"


### Example 2

* **Input**: nums = [0,2,3,4,6,8,9]
* **Output**: ["0","2->4","6","8->9"]
* **Explanation**: The ranges are:
[0,0] --> "0"
[2,4] --> "2->4"
[6,6] --> "6"
[8,9] --> "8->9"


## Constraints


- 0 <= nums.length <= 20
- -231 <= nums[i] <= 231 - 1
- All the values of nums are unique.
- nums is sorted in ascending order.



## My Solution

My approach was using Hashmap as I wanted to store key and value, here frequency of letter. But after looking over others' solutions. It would be better to use int array because ransomNote and magazone consist of lowercase English letters only, which means I can use ASCII.

```java
class Solution {
    public List<String> summaryRanges(int[] nums) {
        ArrayList<String> rangeList = new ArrayList<>();

        if (nums.length > 0) {
            int start = nums[0];
            int end = nums[0];

            for (int i = 1; i < nums.length; ++i) {
                if (nums[i] - nums[i-1] == 1) {
                    end = nums[i];
                } else {
                    if (start == end) {
                        rangeList.add(Integer.toString(start));
                    } else {
                        rangeList.add(Integer.toString(start) + "->" + Integer.toString(end));
                    }
                    start = nums[i];
                    end = nums[i];
                }
            }

            if (start == end) {
                rangeList.add(Integer.toString(start));
            } else {
                rangeList.add(Integer.toString(start) + "->" + Integer.toString(end));
            }
        }

        return rangeList;
    }
}
```
