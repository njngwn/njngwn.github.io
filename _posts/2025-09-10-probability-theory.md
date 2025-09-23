---
layout: post
title: Statistical Measure Summary
date: 2025-09-10 15:43 +0200
categories: [Comptuer Science, Probability Theory]
tags: [math, probability-theory, computer-science]
math: true
---

# Statistical Measure Summary

### 통계량 계산 방법

| 통계량 (Statistical Measure) | 연속 분포 (PDF / CDF) | 이산 분포 (PMF / CDF) |
| :--- | :--- | :--- |
| **평균 (Mean)** | $$E[X] = \int_{-\infty}^{\infty} x \cdot f(x) \,dx$$ | $$E[X] = \sum_{x} x \cdot p(x)$$ |
| **분산 (Variance)** | $$Var(X) = E[X^2] - (E[X])^2$$<br>($$E[X^2] = \int x^2 f(x) \,dx$$) | $$Var(X) = E[X^2] - (E[X])^2$$<br>($$E[X^2] = \sum x^2 p(x)$$)|
| **공분산 (Covariance)** | $$Cov(X, Y) = E[XY] - E[X]E[Y]$$<br>($$E[XY] = \iint xy f(x,y) \,dx\,dy$$) | $$Cov(X, Y) = E[XY] - E[X]E[Y]$$<br>($$E