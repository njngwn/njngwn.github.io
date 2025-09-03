---
layout: post
title: "[Java] Longest Substring Without Repeating Characters\n"
date: 2023-09-30 10:28 +0200
categories: [Data Structures and Algorithms , LeetCode]
tags: [java, hash-table, string, sliding-window]
---

> Feel free to leave a comment or contact me if you spot any errors or have feedback. I'm always open to learning!
{: .prompt-tip }
 

# [Java] Longest Substring Without Repeating Characters


LeetCode Problem #3 [🔗 LeetCode Link](https://leetcode.com/problems/longest-substring-without-repeating-characters/description/)


- Time Complexity: O(n), n: s.length()
- Space Complexity: O(n), n: s.length()


```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        int begin = 0;
        int end = 0;
        int maxLength = 0;

        Set<Character> letterSet = new HashSet<>();
        while (end < s.length()) {
            // if the letter is not in the hashset, then add it into hashset and move end pointer
            if (!letterSet.contains(s.charAt(end))) {
                letterSet.add(s.charAt(end));
                ++end;
                maxLength = Math.max(maxLength, end - begin); // update maxlength
            } else { // if the letter is in the hashset, then remove it and move begin pointer
                letterSet.remove(s.charAt(begin));
                ++begin;
            }
        }
        
        return maxLength;
    }
}
```
