---
layout: post
title: "[Java] Unique Paths"
date: 2025-09-02 22:24 +0200
categories: [Data Structures and Algorithms , LeetCode]
tags: [java, math, dynamic-programming, combinatorics]
---
> Feel free to leave a comment or contact me if you spot any errors or have feedback. I'm always open to learning!
{: .prompt-tip }
 

# [Java] Unique Paths


LeetCode Problem #62 [🔗 LeetCode Link](https://leetcode.com/problems/unique-paths/description/)


In this problem, we can accumulate unique path per element. 


For example, in 3 * 7 array, we can get that there are 21 unique paths. I put the possible unique paths until the element into the table below. So, we can final unique paths when we sum up all element in the array.

1   1   1   1   1   1   1 \
1   2   3   4   5   6   7 \
1   3   6   10  15  21  28


However, I used 2-dimensional arrays but I guess I can use dynamic programming. To get the number of path from element, we need only left element and top element.

```java
class Solution {
    public int uniquePaths(int m, int n) {
        int[][] pathMap = new int[m][n];

        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (i == 0 || j == 0) {
                    pathMap[i][j] = 1;
                } else {
                    pathMap[i][j] = pathMap[i-1][j] + pathMap[i][j-1];
                }
            }
        }

        return pathMap[m-1][n-1];
    }
}
```
