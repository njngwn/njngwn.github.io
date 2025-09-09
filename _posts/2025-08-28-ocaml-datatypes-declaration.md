---
layout: post
title: OCaml Datatypes Declaration
date: 2025-08-28 18:46 +0200
categories: [Programming Language, OCaml]
tags: [ocaml, fpv]
---

> Feel free to leave a comment or contact me if you spot any errors or have feedback. I'm always open to learning!
{: .prompt-tip } 

## How to declare type in Ocaml

```ocaml
type vector3 = float * float * float (* tuple *)

let p1 = (0.1, 0.2, 0.3)
let p2 = (0.4, 0.5, 0.6)
let p3 = (0.7, 0.8, 0.9)
```


In order to concat strings, we have to use ^ instead of +.

```ocaml
let string_of_vector3 (x, y, z) =
  "(" ^ string_of_float x ^ "," ^ string_of_float y ^ "," ^ string_of_float z
  ^ ")"

let vector3_add (x1, y1, z1) (x2, y2, z2) = (x1 +. x2, y1 +. y2, z1 +. z2)

let vector3_max (x1, y1, z1) (x2, y2, z2) =
  if
    (x1 *. x1) +. (y1 *. y1) +. (z1 *. z1)
    > (x2 *. x2) +. (y2 *. y2) +. (z2 *. z2)
  then (x1, y1, z1)
  else (x2, y2, z2)
```


Also, paramter could be in both ways, (x1, x2, x3) or v1.

```ocaml
let combine v1 v2 v3 = string_of_vector3 (vector3_add v1 (vector3_max v2 v3))
```


## Declare list using type
```ocaml
type student = {
  first_name : string;
  last_name : string;
  id : int;
  semester : int;
  grades : (int * float) list; (* list of grade, which is a pair of course number and grade value *)
}

type database = student list
```
