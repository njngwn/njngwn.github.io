---
layout: post
title: "[Java] Longest Repeating Character Replacement"
date: 2025-09-04 22:02 +0200
categories: [Data Structures and Algorithms, LeetCode]
tags: [hash-table, string, sliding-window, medium]
---

> Feel free to leave a comment or contact me if you spot any errors or have feedback. I'm always open to learning!
{: .prompt-tip }


# Longest Repeating Character Replacement

LeetCode Problem #424 [🔗 LeetCode Link](https://leetcode.com/problems/longest-repeating-character-replacement/description/)


## Description

You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.


## Example

### Example 1

- **Input**: s = "ABAB", k = 2
- **Output**: 4
- **Explanation**: Replace the two 'A's with two 'B's or vice versa.

### Example 2

- **Input**: s = "AABABBA", k = 1
- **Output**: 4
- **Explanation**: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achieve this answer too.


## Constraints

- 1 <= s.length <= 105
- s consists of only uppercase English letters.
- 0 <= k <= s.length


## My Approach

At first, I tried to use sliding window. I could pass the two examples above, however, I didn't consider the case "ABBB" with k = 1. This case should return 4 but my codes return 3. 


```java
class Solution {
    public int characterReplacement(String s, int k) {
        char[] letterArr = s.toCharArray();
        int maxLength = 1;

        for (int i = 0; i < letterArr.length; ++i) {
            int attempt = k;
            int tempLength = 1;
            
            for (int j = i+1; j < letterArr.length; ++j) {
                System.out.println("i: " + letterArr[i] + ", j:" + letterArr[j] + ", length: " + tempLength);
                if (letterArr[i] == letterArr[j] || attempt > 0) {
                    tempLength++;
                    if (letterArr[i] != letterArr[j]) {
                        attempt--;
                    }
                } else {
                    break;
                }
            }

            maxLength = tempLength > maxLength ? tempLength : maxLength;
        }

        return maxLength;
    }
}
```
