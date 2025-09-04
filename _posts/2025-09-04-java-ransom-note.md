---
layout: post
title: "[Java] Ransom Note"
date: 2025-09-04 14:12 +0200
categories: [Data Structures and Algorithms , LeetCode-Top Interview 150]
tags: [hash-table, string, counting, top-interview-150, easy]
---


> Feel free to leave a comment or contact me if you spot any errors or have feedback. I'm always open to learning!
{: .prompt-tip }
 

# [Java] Remove Duplicates from Sorted Array

LeetCode Problem #383 [🔗 LeetCode Link](https://leetcode.com/problems/ransom-note/description/?envType=study-plan-v2&envId=top-interview-150)


Espeically, this problem is in the Must-do List for Interview Prep in Leetcode. 


## Description

Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

Each letter in magazine can only be used once in ransomNote.


## Example

### Example 1

* **Input**: ransomNote = "aa", magazine = "ab"
* **Output**: false


### Example 2

* **Input**: ransomNote = "aa", magazine = "aab"
* **Output**: true


## Constraints


- 1 <= ransomNote.length, magazine.length <= 105
- ransomNote and magazine consist of lowercase English letters.



## My Solution

My approach was using Hashmap as I wanted to store key and value, here frequency of letter. But after looking over others' solutions. It would be better to use int array because ransomNote and magazone consist of lowercase English letters only, which means I can use ASCII.

```java
class Solution {
    public boolean canConstruct(String ransomNote, String magazine) {
        HashMap<Character, Integer> letterMap = new HashMap<>(); // key: letter, value: frequency

        // put letters to letterSet
        for (Character ch : magazine.toCharArray()) {
            if (letterMap.containsKey(ch)){
                letterMap.put(ch, letterMap.get(ch)+1);
            } else {
                letterMap.put(ch, 1);
            }
        }

        for (Character ch : ransomNote.toCharArray()) {
            if (letterMap.containsKey(ch) && letterMap.get(ch) > 0) {
                letterMap.put(ch, letterMap.get(ch)-1);
            } else {
                return false;
            }
        }

        return true;
    }
}

```
