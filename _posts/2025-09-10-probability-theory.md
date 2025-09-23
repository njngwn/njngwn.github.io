---
layout: post
title: Statistical Measure Summary
date: 2025-09-10 15:43 +0200
categories: [Comptuer Science, Probability Theory]
tags: [math, probability-theory, computer-science]
---

# Statistical Measure Summary

### 통계량 계산 방법

| 통계량 (Statistical Measure) | 연속 분포 (PDF / CDF) | 이산 분포 (PMF / CDF) |
| :--- | :--- | :--- |
| **평균 (Mean)** | $E[X] = \\int\_{-\\infty}^{\\infty} x \\cdot f(x) ,dx$ | $E[X] = \\sum\_{x} x \\cdot p(x)$ |
| **분산 (Variance)** | $Var(X) = E[X^2] - (E[X])^2$<br>($E[X^2] = \\int x^2 f(x) dx$) | $Var(X) = E[X^2] - (E[X])^2$<br>($E[X^2] = \\sum x^2 p(x)$) |
| **공분산 (Covariance)** | $Cov(X, Y) = E[XY] - E[X]E[Y]$<br>($E[XY] = \\iint xy f(x,y) dxdy$) | $Cov(X, Y) = E[XY] - E[X]E[Y]$<br>($E[XY] = \\sum\\sum xy p(x,y)$) |
| **편상관계수 (Partial Corr.)** | 공분산 행렬의 역행렬을 이용해 계산<br>$\\rho\_{XY \\cdot Z} = \\frac{-\\Sigma^{-1}*{12}}{\\sqrt{\\Sigma^{-1}*{11} \\Sigma^{-1}*{22}}}$ | 공분산 행렬의 역행렬을 이용해 계산<br>$\\rho*{XY \\cdot Z} = \\frac{-\\Sigma^{-1}*{12}}{\\sqrt{\\Sigma^{-1}*{11} \\Sigma^{-1}*{22}}}$ |
| **조건부 기댓값 (Cond. Expect.)** | $E[X|Y=y] = \\int*{-\\infty}^{\\infty} x \\cdot f(x|y) ,dx$ | $E[X|Y=y] = \\sum\_{x} x \\cdot p(x|y)$ |
| **q-분위수 (q-Quantile)** | CDF의 역함수: $x\_q = F^{-1}(q)$ | CDF의 역함수: $x\_q = F^{-1}(q)$ |
| **중앙값 (Median)** | $m = F^{-1}(0.5)$ 또는 $\\int\_{-\\infty}^{m} f(x) ,dx = 0.5$ | $F(m) \\ge 0.5$ 이고 $P(X \\ge m) \\ge 0.5$를 만족하는 $m$ |