---
layout: post
title: "[Java] Pacific Atlantic Water Flow"
date: 2025-09-15 19:47 +0200
categories: [Data Structures and Algorithms, LeetCode]
tags: [array, dfs, depth-first-search, matrix, medium]
---


# [Java] Pacific Atlantic Water Flow

LeetCode Problem #417 [🔗 LeetCode Link](https://leetcode.com/problems/pacific-atlantic-water-flow/)


## Description

There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).

The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.


## My Solution

```java
class Solution {
    private void checkWaterFlow(int[][] heights, int row, int col, int prevHeight, boolean[][] flowable) {
        if (row < 0 || row >= heights.length || col < 0 || col >= heights[0].length) {  // boundary
            return;
        }
        // if previous cell is lower than current cell, water cannot flow or if it is already visited, then return. 
        if (heights[row][col] < prevHeight || flowable[row][col]) {   
            return;
        }

        flowable[row][col] = true;

        checkWaterFlow(heights, row-1, col, heights[row][col], flowable);
        checkWaterFlow(heights, row+1, col, heights[row][col], flowable);
        checkWaterFlow(heights, row, col-1, heights[row][col], flowable);
        checkWaterFlow(heights, row, col+1, heights[row][col], flowable);
    }

    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        int rows = heights.length;
        int cols = heights[0].length;

        boolean[][] pacific = new boolean[rows][cols];
        boolean[][] atlantic = new boolean[rows][cols];

        for (int i = 0; i < rows; ++i) {
            checkWaterFlow(heights, i, 0, 0, pacific);  // flow from left
            checkWaterFlow(heights, i, cols-1, 0, atlantic); // flow from right
        }

        for (int i = 0; i < cols; ++i) {
            checkWaterFlow(heights, 0, i, 0, pacific);  // flow from top
            checkWaterFlow(heights, rows-1, i, 0, atlantic); // flow from bottom
        }

        // check whether cell is reachable from both oceans
        List<List<Integer>> oceanFlows = new ArrayList<>();

        for (int i = 0; i < rows; ++i) {
            for (int j = 0; j < cols; ++j) {
                if (pacific[i][j] && atlantic[i][j]) {
                    oceanFlows.add(List.of(i, j));
                }
            }
        }

        return oceanFlows;
    }
}
```
