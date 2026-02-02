---
layout: post
title: 'Projective Geometry'
date: 2026-02-02 00:00 +0100
categories: [Data Structures and Algorithms, Algorithms]
tags: [algorithms, geometry, projective-geometry, homogeneous-coordinates, cross-product]
math: true
---

## 11. Projective Geometry (사영 기하학)

### 11.1 Projective Plane

- **Definition / 정의:** $\mathbb{P}^2 = (\mathbb{R}^3 \setminus \{0\}) / \sim$ where $(x,y,z) \sim \lambda(x,y,z)$ for $\lambda \neq 0$. / $\mathbb{P}^2 = (\mathbb{R}^3 \setminus \{0\}) / \sim$ ($(x,y,z) \sim \lambda(x,y,z)$, $\lambda \neq 0$).
- **Homogenization / 동질화:** $(x,y) \mapsto [(x,y,1)]$. / $(x,y) \mapsto [(x,y,1)]$.
- **Dehomogenization / 비동질화:** $[(x,y,z)] \mapsto (x/z, y/z)$ if $z \neq 0$, else point at infinity. / $[(x,y,z)] \mapsto (x/z, y/z)$ ($z \neq 0$), 아니면 무한원점.
- **Points at Infinity / 무한원점:** Points with $z=0$ represent directions. / $z=0$인 점은 방향을 나타냄.

---

### 11.2 Operations

- **Line through two points / 두 점을 지나는 직선:** $L = P_1 \times P_2$ (cross product). / $L = P_1 \times P_2$ (외적).
- **Intersection of two lines / 두 직선의 교점:** $P = L_1 \times L_2$ (cross product). / $P = L_1 \times L_2$ (외적).
- **Key Property:** Every two distinct lines intersect (even if parallel in Euclidean sense - intersection is point at infinity). / 모든 두 개의 서로 다른 직선은 교차 (유클리드에서 평행해도 - 교점은 무한원점).

**Visualization / 시각화:**

**Projective Geometry - Homogenization:**
```
Euclidean point: (3, 4)
Homogeneous: [(3, 4, 1)] or any [(3λ, 4λ, λ)] for λ ≠ 0

Dehomogenization: [(6, 8, 2)] → (6/2, 8/2) = (3, 4)
Point at infinity: [(1, 2, 0)] → direction (1, 2)
```

**Line through Two Points:**
```
Points: P₁ = [(1, 2, 1)], P₂ = [(3, 4, 1)]

Line: L = P₁ × P₂
  = |i  j  k |
    |1  2  1 |
    |3  4  1 |
  = [(2×1 - 1×4), (1×3 - 1×1), (1×4 - 2×3)]
  = [(-2, 2, -2)] = [(1, -1, 1)] (normalized)

Line equation: x - y + 1 = 0
```

**Intersection of Two Lines:**
```
Lines: L₁ = [(1, -1, 1)], L₂ = [(2, 1, -3)]

Intersection: P = L₁ × L₂
  = |i   j   k  |
    |1  -1   1  |
    |2   1  -3  |
  = [((-1)×(-3) - 1×1), (1×2 - 1×(-3)), (1×1 - (-1)×2)]
  = [(2, 5, 3)]

Dehomogenize: (2/3, 5/3)
```

**Parallel Lines Intersect at Infinity:**
```
Line 1: y = 2x + 1 → [(2, -1, 1)]
Line 2: y = 2x + 3 → [(2, -1, 3)]

Intersection: P = [(2, -1, 1)] × [(2, -1, 3)]
  = [(0, -4, 0)] = point at infinity

In Euclidean: parallel lines don't intersect
In Projective: they intersect at infinity point
```

**Real Problem Applications:**
- **The Euler Line (eul):** Projective geometry concepts are used to check collinearity. The Euler line theorem states that centroid, orthocenter, and circumcenter are collinear. In projective geometry, we can use cross product to check if three points are collinear: if $P_1 \times P_2$ and $P_1 \times P_3$ are parallel (or if the cross product of vectors is zero), the points are collinear. (EN: Collinearity check using cross product in homogeneous coordinates. Three points are collinear if cross product of any two vectors between them is zero. KR: 동질 좌표에서 외적을 사용한 공선성 확인. 세 점 사이의 임의의 두 벡터의 외적이 0이면 공선입니다.)

**Possible Questions:**
- How do you find intersection of parallel lines? (EN: Use cross product, result will have z=0 (point at infinity). KR: 외적 사용, 결과는 z=0 (무한원점).)
- What is the advantage of projective geometry? (EN: Eliminates special cases - parallel lines always intersect. KR: 특수 케이스 제거 - 평행선도 항상 교차.)

---

### 11.3 Transformations

- **Euclidean / 유클리드:** Rotation and translation (preserves distances). / 회전과 평행이동 (거리 보존).
- **Affine / 아핀:** Includes scaling, shearing (preserves parallelity). / 스케일링, 전단 포함 (평행성 보존).
- **Projective / 사영:** Includes perspective distortion (preserves collinearity). / 원근 왜곡 포함 (공선성 보존).
- **Matrix Form / 행렬 형태:** All can be represented as $3 \times 3$ matrices in homogeneous coordinates. / 모두 동질 좌표에서 $3 \times 3$ 행렬로 표현 가능.

