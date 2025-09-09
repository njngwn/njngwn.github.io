---
layout: post
title: OCaml Tree
date: 2025-09-09 11:53 +0200
categories: [Programming Language, OCaml]
tags: [ocaml, tree, binary-search-tree]
password: fpv
---

> Feel free to leave a comment or contact me if you spot any errors or have feedback. I'm always open to learning!
{: .prompt-tip }
 
# OCaml Tree


## Binary Search Tree

Binary Search Tree(이하 BST)의 가장 큰 특징은 노드의 값을 기준으로 왼쪽 트리 값은 노드보다 작아야하고, 오른쪽 트리 값은 현재 노드보다 커야한다. 값을 추가할 때도 마찬가지.


### Tree와 Node 생성하기

```ocaml
type tree = Node of int * tree * tree | Empty

let leaf _ = Empty
let node v l r = Node (v, l, r)
let inspect n = match n with Node (v, l, r) -> Some (v, l, r) | Empty -> None

let t1 =
  Node
    ( 8,
      Node (1, Empty, Node (6, Empty, Empty)),
      Node (12, Node (9, Empty, Empty), Node (42, Empty, Empty)) )
```


### Tree를 List로 풀어쓰기

Tree를 리스트로 출력하는데는 2가지 접근법이 있을 수 있다. 첫번재로는 @ 를 사용할 수도 있지만 이럴 경우에 시간이 더 걸린다고 한다. 두번째 방법으로는 tail-recursive가 있는데, 시간복잡도가 중요하지 않다면, 첫번째 방법이 훨씬 더 간단해보인다. @는 그냥 리스트를 합치는 거라고 생각하면 된다. 

```ocaml
let rec to_list = function
  | Empty -> []
  | Node (v, l, r) -> to_list l @ (v :: to_list r)

let to_list tr =
  let rec to_list_helper tr acc =
    match tr with
    | Empty -> acc
    | Node (v, l, r) -> to_list_helper l (v :: to_list_helper r acc)
  in
  to_list_helper tr []
```


### insert

```ocaml
let rec insert n tr =
  match tr with
  | Empty -> Node (n, Empty, Empty)
  | Node (v, l, r) ->
      if n = v then tr
      else if n > v then Node (v, l, insert n r)
      else Node (v, insert n l, r)
```


### remove

트리에서 값을 제거할 때에는, 1) 해당 값을 찾고, 2) 그 값을 다른 노드로 채워줘야 한다. 이미 값의 크기대로 정렬이 된 상태이므로 값을 찾은 후에는 왼쪽 서브트리에서 가장 큰 값을 찾아서 그 값으로 대체해준다. 왼쪽 서브트리나 오른쪽 서브트리, 둘 중 하나만 존재하는 경우에는 그 트리로 삭제하려는 노드를 제거해주었다.


```ocaml
let rec remove_max tr =
  match tr with
  | Empty -> failwith "unreachable"
  | Node (v, l, Empty) -> (v, l)
  | Node (v, l, r) ->
      let v', r' = remove_max r in
      (v', Node (v, l, r'))

let rec remove x tr =
  match tr with
  | Empty -> Empty
  | Node (v, l, r) -> (
      if x < v then Node (v, remove x l, r)
      else if x > v then Node (v, l, remove x r)
      else
        match (l, r) with
        | Empty, _ -> r
        | _, Empty -> l
        | _ ->
            let v', l' = remove_max l in
            Node (v', l', r))
```


## References

- [https://courses.cs.cornell.edu/cs3110/2021sp/textbook/data/trees.html](https://courses.cs.cornell.edu/cs3110/2021sp/textbook/data/trees.html)