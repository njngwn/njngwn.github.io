---
layout: post
title: Basic GLSL
date: 2025-10-03 12:43 +0200
---

이 네 개의 GLSL ES 3.0 셰이더 코드에 대해 설명해 드릴게요. 이 코드들은 \*\*렌더 투 텍스처(Render-to-Texture)\*\*라는 2단계 렌더링 기법에 사용되는 전형적인 예시입니다.

전체적으로 **1단계**에서 3D 장면을 화면이 아닌 메모리상의 텍스처에 그리고, **2단계**에서 그 텍스처를 화면 전체에 그리는 방식으로 동작합니다. 이는 블러(blur)나 블룸(bloom) 같은 후처리 효과(post-processing effects)를 구현하는 핵심 기술입니다. 💡

-----

### 1단계: 3D 장면을 텍스처에 그리기

이 단계에서는 첫 번째 버텍스 셰이더와 프래그먼트 셰이더가 사용됩니다.

#### **1. 첫 번째 버텍스 셰이더 (Vertex Shader)**

```glsl
#version 300 es

// 정점(vertex)의 속성 정보들
in vec3 vertexPosition; // 모델의 로컬 좌표
in vec3 vertexNormal;   // 법선 벡터
in vec2 vertexTextureCoordinates; // 텍스처 좌표

// 변환 행렬들
uniform mat4 mMatrix; // 모델 행렬
uniform mat4 vMatrix; // 뷰(카메라) 행렬
uniform mat4 pMatrix; // 투영 행렬

void main() {
  // 모델의 로컬 좌표를 월드 공간 -> 뷰 공간으로 변환
  vec4 vertexCamSpace = vMatrix * mMatrix * vec4(vertexPosition, 1.0);
  // 뷰 공간 좌표를 최종 클립 공간 좌표로 변환
  gl_Position = pMatrix * vertexCamSpace;
}
```

  * **역할:** 3D 모델의 각 정점 위치를 계산합니다.
  * **동작 방식:**
    1.  `vertexPosition` (모델 고유의 로컬 좌표)에 `mMatrix`(모델 행렬)를 곱해 3D 월드 공간 좌표로 변환합니다.
    2.  여기에 `vMatrix`(뷰 행렬)를 곱해 카메라 시점의 좌표로 변환합니다.
    3.  마지막으로 `pMatrix`(투영 행렬)를 곱해 2D 화면에 표시될 최종 좌표(`gl_Position`)를 계산합니다.
    4.  이것은 3D 그래픽스에서 물체를 화면에 그리기 위한 가장 **표준적인 정점 변환 과정**입니다.

#### **2. 첫 번째 프래그먼트 셰이더 (Fragment Shader)**

```glsl
#version 300 es

precision highp float;
out vec4 fragColor;

void main() {
  // 모든 픽셀을 빨간색(R:1, G:0, B:0, A:1)으로 칠함
  fragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
```

  * **역할:** 각 픽셀의 최종 색상을 결정합니다.
  * **동작 방식:** 매우 단순하게, 렌더링 되는 모든 픽셀을 **불투명한 빨간색**으로 설정합니다. 보통 실제 렌더링에서는 조명 계산이나 텍스처 매핑 등을 통해 더 복잡한 색상을 계산합니다.

> **1단계 요약:** 위의 두 셰이더를 사용해 3D 모델을 렌더링합니다. 하지만 이 결과를 화면에 바로 보내는 것이 아니라, 메모리상의 **프레임버퍼(Framebuffer)와 연결된 텍스처**에 저장합니다. 결과적으로 3D 모델의 실루엣이 그려진 빨간색 이미지가 텍스처 형태로 만들어집니다.

-----

### 2단계: 텍스처를 화면에 그리기

이 단계에서는 1단계에서 만든 텍스처를 화면 전체에 사각형을 그려 채우는 역할을 합니다.

#### **3. 두 번째 버텍스 셰이더 (Render Quad Vertex Shader)**

```glsl
#version 300 es

// 사각형의 정점 좌표와 텍스처 좌표
in vec3 vertexPosition;
in vec2 vertexTextureCoordinates;

// 프래그먼트 셰이더로 텍스처 좌표를 전달
out vec2 fragmentTextureCoordinates;

void main() {
  // 정점 좌표를 변환 없이 그대로 사용
  gl_Position = vec4(vertexPosition, 1.0);
  // 텍스처 좌표를 그대로 전달
  fragmentTextureCoordinates = vertexTextureCoordinates;
}
```

  * **역할:** 화면을 꽉 채우는 하나의 사각형(Quad)을 만듭니다.
  * **동작 방식:**
    1.  이 셰이더는 3D 변환 행렬(MVP)을 사용하지 않습니다. 입력받은 `vertexPosition`을 `gl_Position`에 바로 할당합니다.
    2.  이는 `vertexPosition`에 이미 화면 전체를 덮는 좌표(예: `(-1, -1)`, `(1, -1)`, `(1, 1)`, `(-1, 1)`)가 들어온다는 것을 의미합니다.
    3.  입력받은 `vertexTextureCoordinates`는 프래그먼트 셰이더로 넘겨줍니다.

#### **4. 두 번째 프래그먼트 셰이더 (Render Quad Fragment Shader)**

```glsl
#version 300 es

precision highp float;

// 1단계에서 렌더링된 결과물이 담긴 텍스처
uniform sampler2D textureRendered;

// 버텍스 셰이더에서 보간되어 넘어온 텍스처 좌표
in vec2 fragmentTextureCoordinates;
out vec4 fragColor;

void main() {
  // 주어진 좌표로 텍스처에서 색상 값을 가져와 현재 픽셀의 색으로 지정
  fragColor = texture(textureRendered, fragmentTextureCoordinates.st);
}
```

  * **역할:** 1단계에서 만든 텍스처를 사각형 위에 그려 화면에 최종 출력합니다.
  * **동작 방식:**
    1.  `textureRendered`는 **1단계에서 3D 장면을 그려서 만든 텍스처**입니다.
    2.  버텍스 셰이더에서 넘어온 `fragmentTextureCoordinates`를 이용해 `textureRendered` 텍스처의 해당 위치에서 색상 값을 읽어옵니다.
    3.  `texture()` 함수가 이 역할을 하며, 읽어온 색상 값을 최종 픽셀 색상(`fragColor`)으로 설정합니다.

> **2단계 요약:** 화면 전체를 덮는 사각형을 그리고, 그 사각형의 각 픽셀을 1단계에서 만든 텍스처의 색상으로 채웁니다. 결과적으로 1단계의 렌더링 결과(빨간색 3D 모델 이미지)가 화면에 나타납니다.