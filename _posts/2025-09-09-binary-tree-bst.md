---
layout: post
title: 'Binary Tree & Binary Search Tree (이진 트리 & 이진 탐색 트리)'
date: 2025-09-09 12:14 +0200
categories: [Data Structures and Algorithms, Data Structures]
tags: [data-structures, tree, binary-tree, binary-search-tree, bst]
math: true
---

# Binary Tree & Binary Search Tree (이진 트리 & 이진 탐색 트리)

## Overview

Binary trees are fundamental data structures used in many algorithms. Understanding tree traversal and BST operations is essential for coding interviews.

## 1. Binary Tree Basics

### Definition
- **Binary Tree:** Tree where each node has at most 2 children (left and right)
- **Properties:**
  - Maximum nodes at level $l$: $2^l$
  - Maximum nodes in tree of height $h$: $2^{h+1} - 1$
  - Minimum height with $n$ nodes: $\lceil \log_2(n+1) \rceil - 1$

### Tree Traversal

#### Inorder (Left, Root, Right)
```cpp
void inorder(TreeNode* root) {
    if (root) {
        inorder(root->left);
        cout << root->val << " ";
        inorder(root->right);
    }
}
```

#### Preorder (Root, Left, Right)
```cpp
void preorder(TreeNode* root) {
    if (root) {
        cout << root->val << " ";
        preorder(root->left);
        preorder(root->right);
    }
}
```

#### Postorder (Left, Right, Root)
```cpp
void postorder(TreeNode* root) {
    if (root) {
        postorder(root->left);
        postorder(root->right);
        cout << root->val << " ";
    }
}
```

#### Level Order (BFS)
```cpp
void levelOrder(TreeNode* root) {
    if (!root) return;
    
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        TreeNode* node = q.front();
        q.pop();
        cout << node->val << " ";
        
        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
}
```

### Visualization

**Tree Structure:**
```
        1
       / \
      2   3
     / \   \
    4   5   6

Inorder:   4 2 5 1 3 6
Preorder:  1 2 4 5 3 6
Postorder: 4 5 2 6 3 1
Level:     1 2 3 4 5 6
```

---

## 2. Binary Search Tree (BST)

### Definition
- **BST Property:** For each node:
  - All nodes in left subtree < node value
  - All nodes in right subtree > node value
  - Both subtrees are also BSTs

### Key Operations

#### Search
```cpp
TreeNode* searchBST(TreeNode* root, int val) {
    if (!root || root->val == val) return root;
    
    if (val < root->val)
        return searchBST(root->left, val);
    else
        return searchBST(root->right, val);
}
```

**Time Complexity:** $\mathcal{O}(h)$ where $h$ is height
- **Best:** $\mathcal{O}(\log n)$ - balanced tree
- **Worst:** $\mathcal{O}(n)$ - skewed tree

#### Insert
```cpp
TreeNode* insertBST(TreeNode* root, int val) {
    if (!root) return new TreeNode(val);
    
    if (val < root->val)
        root->left = insertBST(root->left, val);
    else if (val > root->val)
        root->right = insertBST(root->right, val);
    
    return root;
}
```

#### Delete
```cpp
TreeNode* deleteNode(TreeNode* root, int key) {
    if (!root) return root;
    
    if (key < root->val) {
        root->left = deleteNode(root->left, key);
    } else if (key > root->val) {
        root->right = deleteNode(root->right, key);
    } else {
        // Node to delete found
        if (!root->left) return root->right;
        if (!root->right) return root->left;
        
        // Node with two children: get inorder successor
        TreeNode* minNode = findMin(root->right);
        root->val = minNode->val;
        root->right = deleteNode(root->right, minNode->val);
    }
    return root;
}

TreeNode* findMin(TreeNode* node) {
    while (node->left) node = node->left;
    return node;
}
```

### Visualization

**BST Insert Example:**
```
Insert: 5, 3, 7, 2, 4, 6, 8

Step 1:     5
Step 2:     5
           /
          3
Step 3:     5
          / \
         3   7
Step 4:     5
          / \
         3   7
        /
       2
...
Final:       5
            / \
           3   7
          / \ / \
         2  4 6 8
```

---

## 3. BST Properties

### Inorder Traversal
- **Key Property:** Inorder traversal of BST gives sorted sequence
- **Use:** Validate BST, get sorted order

```cpp
bool isValidBST(TreeNode* root) {
    TreeNode* prev = nullptr;
    return validate(root, prev);
}

bool validate(TreeNode* node, TreeNode*& prev) {
    if (!node) return true;
    
    if (!validate(node->left, prev)) return false;
    
    if (prev && prev->val >= node->val) return false;
    prev = node;
    
    return validate(node->right, prev);
}
```

### Successor and Predecessor
- **Successor:** Smallest node greater than current
- **Predecessor:** Largest node smaller than current

---

## 4. Time Complexity

| Operation | Average | Worst | Space |
|:---|:---|:---|:---|
| **Search** | $\mathcal{O}(\log n)$ | $\mathcal{O}(n)$ | $\mathcal{O}(1)$ |
| **Insert** | $\mathcal{O}(\log n)$ | $\mathcal{O}(n)$ | $\mathcal{O}(1)$ |
| **Delete** | $\mathcal{O}(\log n)$ | $\mathcal{O}(n)$ | $\mathcal{O}(1)$ |
| **Inorder** | $\mathcal{O}(n)$ | $\mathcal{O}(n)$ | $\mathcal{O}(h)$ |

**Note:** Worst case occurs when tree is skewed (like a linked list)

---

## 5. Balanced BST

### Why Balance Matters
- **Unbalanced:** Height = n → operations become O(n)
- **Balanced:** Height = log n → operations are O(log n)

### Self-Balancing Trees
- **AVL Tree:** Height-balanced (difference ≤ 1)
- **Red-Black Tree:** Color-balanced
- **B-Tree:** Multi-way balanced tree

---

## 6. Common Problems

### Tree Traversal
- Inorder, Preorder, Postorder traversal
- Level-order traversal (BFS)
- Zigzag level order

### BST Operations
- Search, Insert, Delete
- Validate BST
- Convert sorted array to BST
- Find kth smallest element

### Tree Properties
- Maximum depth
- Minimum depth
- Balanced tree check
- Symmetric tree

---

## 7. Key Insights

1. **Inorder traversal of BST is sorted**
   - Useful for validation and getting sorted sequence

2. **BST search is like binary search**
   - Each comparison eliminates half of remaining nodes

3. **Tree height determines complexity**
   - Balanced: O(log n), Unbalanced: O(n)

4. **Recursive structure**
   - Most tree problems can be solved recursively
   - Think: solve for left, solve for right, combine

---

## Common Mistakes

1. **Forgetting null checks** in tree traversal
2. **Incorrect BST validation** (not checking entire subtree)
3. **Off-by-one errors** in tree height calculations
4. **Not handling edge cases** (empty tree, single node)

---

## References

* [https://www.geeksforgeeks.org/dsa/introduction-to-binary-search-tree/](https://www.geeksforgeeks.org/dsa/introduction-to-binary-search-tree/)
* [https://www.cs.usfca.edu/~galles/visualization/BST.html](https://www.cs.usfca.edu/~galles/visualization/BST.html)
* [https://algorithm-visualizer.org/branch-and-bound/binary-search-tree](https://algorithm-visualizer.org/branch-and-bound/binary-search-tree)