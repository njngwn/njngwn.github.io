---
layout: post
title: Ocaml List Functions
date: 2025-08-29 14:52 +0200
categories: [Programming Language, Ocaml]
tags: [ocaml, fpv]
---

> Feel free to leave a comment or contact me if you spot any errors or have feedback. I'm always open to learning!
{: .prompt-tip } 

# Ocaml List Functions

Ocaml에서 편하게 사용할 수 있는 메소드가 있기는 하지만, 시험 대비를 위해서는 직접 구현해야하는 상황이 많다. 

* hd: 리스트의 첫번째 요소를 리턴
* tl: 리스트에서 첫번째 요소를 제외한 리스트를 리턴
* length: 리스트 길이
* append: 두 개의 리스트를 합치기
* rev: 리스트 뒤집기
* nth: 리스트의 n번째 요소를 리턴

```ocaml
let hd li = match li with [] -> failwith "invalid" | x :: xs -> x

let tl li = match li with [] -> failwith "invalid" | x :: xs -> xs

let rec length li = match li with [] -> 0 | x :: xs -> 1 + length xs

let rec append l0 l1 = match l0 with [] -> l1 | x :: xs -> x :: append xs l1

let rev li =
  let rec loop acc = function [] -> acc | x :: xs -> loop (x :: acc) xs in
  loop [] li

let rec nth li n =
  if length li < n then failwith "invalid"
  else
    match li with
    | [] -> failwith "invalid"
    | x :: xs -> if n = 0 then x else nth xs (n - 1)
```