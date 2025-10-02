---
layout: post
title: 3D Rendering Pipeline
date: 2025-10-02 22:49 +0200
categories: [Comptuer Science, Computer Graphics]
tags: [computer-science, computer-graphics, 3d-rendering]
---

# 3d Rendering Pipeline

![3d-Rendering Pipeline](/assets/img/computer-graphics/graphics-pipeline.png) _Source: graphicscompendium_

![3d-Graphics Pipeline](/assets/img/computer-graphics/OpenGL_Direct3D_graphics-pipeline.png) _Source: CMU 2015_


## Vertex Shader

3D 모델을 구성하는 기본 단위인 Vertex의 위치를 계산하는 역할

- Coordinate Transformation: 3D 모델의 각 Vertex는 고유한 3D 공간 좌표를 가지고 있음. Vertex Shader는 이 좌표를 2D 화면 상의 위치로 변환하는 계산을 수행함.

- 정점 데이터 처리: 각 정점이 가질 수 있는 색상, Normal, 텍스처 좌표 등의 데이터를 처리하여 다음 단계로 넘겨줌


## Fragment Shader

Vertex Shader가 만든 형태 위에 색을 칠하는 역할을 함. 

- Fragment: 화면에 표시될 최종 픽셀의 후보
- 색상 계산
- 특수 효과


## References

- [https://graphicscompendium.com/intro/01-graphics-pipeline](https://graphicscompendium.com/intro/01-graphics-pipeline)

- [https://15462.courses.cs.cmu.edu/fall2015/lecture/pipeline/slide_046](https://15462.courses.cs.cmu.edu/fall2015/lecture/pipeline/slide_046)
