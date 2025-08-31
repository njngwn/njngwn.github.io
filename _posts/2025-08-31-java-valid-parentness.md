---
layout: post
title: "[java]-valid-parentness"
date: 2025-08-31 13:35 +0200
categories: [Data Structures and Algorithms , LeetCode]
tags: [java, stack, string]
---
> Feel free to leave a comment or contact me if you spot any errors or have feedback. I'm always open to learning!
{: .prompt-tip } 

# [Java] Valid Parentness


LeetCode Problem #20 [🔗 LeetCode Link](https://leetcode.com/problems/valid-parentheses/description/)


It would be useful and easier to use stack when we have to check symmetry. These days, I am studying context-free automata. .I was surprised and delighted to realize that the algorithm I naturally used to solve the "Valid Parentheses" problem was, in fact, a real-world implementation of a Pushdown Automaton.

It felt like finding a hidden connection in my knowledge. The problem asks us to check if a string of parentheses like "{()[]}" is correctly nested. The classic solution uses a Stack: you push an opening bracket and pop when you find its matching closing bracket.

This process is exactly how a Pushdown Automaton (PDA)—the machine that recognizes context-free languages—operates. The stack I was using in my code was the 'memory' that gave the automaton its power. It made me realize that context-free grammar isn't just an abstract theory; it's the very blueprint for solving this kind of nested, symmetrical problem.


```java
// Time Complexity: O(n), n: s.length
// Space Complexity: O(n), n: s.length (worst case: s="(((((((")
class Solution {
    public boolean isValid(String s) {
        Stack<Character> bracketStack = new Stack<>();

        for (char ch : s.toCharArray()) {
            if (ch == '(' || ch == '{' || ch == '[') { // open bracket
                bracketStack.push(ch);
            } else {    // close bracket
                if (bracketStack.empty()) {
                    return false;
                }

                char sp = bracketStack.pop();
                if (!((sp == '(' && ch == ')') || (sp == '{' && ch == '}') || (sp == '[' && ch == ']'))) {
                    return false;
                }
            }
        }

        return bracketStack.empty();
    }
}
```
