---
layout: post
title: "[Java] Reverse Bits"
date: 2025-09-04 15:10 +0200
categories: [Data Structures and Algorithms, LeetCode-Top Interview 150]
tags: [divide-and-conquer, bit-manipulation, top-interview-150, easy]
---

> Feel free to leave a comment or contact me if you spot any errors or have feedback. I'm always open to learning!
{: .prompt-tip }
 

# [Java] Reverse Bits

LeetCode Problem #190 [🔗 LeetCode Link](https://leetcode.com/problems/reverse-bits/description/)


Espeically, this problem is in the Must-do List for Interview Prep in Leetcode. 


## Description

Reverse bits of a given 32 bits signed integer.


## Example


* **Input**: n = 43261596
* **Output**: n = 43261596
* **Explanation**: 

| Integer   | Binary                             |
|-----------|------------------------------------|
| 43261596  | 0000001010010101000001111010011100 |
| 964176192 | 0011100101011110000010100101000000 |


## My Solution

My first apporach was using StringBuilder. But this code couldn't pass the test. 

```java
class Solution {
    public int reverseBits(int n) {
        // n is even
        StringBuilder binary = new StringBuilder(32);
        binary.append(Integer.toBinaryString(n));

        binary.reverse();

        for (int i = 0; i < 32 - binary.length(); ++i) {
            System.out.println("add 0");
            binary.append("0");
        }

        return Integer.parseInt(binary.toString(), 2);
    }
}
```
