---
layout: post
title: 'Hash Tables & Hash Maps (해시 테이블 & 해시 맵)'
date: 2025-09-11 12:52 +0200
categories: [Data Structures and Algorithms, Data Structures]
tags: [data-structures, hash-table, hash-map, hash-set, collision-resolution]
math: true
---

# Hash Tables & Hash Maps (해시 테이블 & 해시 맵)

## Overview

Hash tables are one of the most important data structures, providing average O(1) time complexity for insert, delete, and search operations. Understanding how they work is essential for coding interviews.

## 1. Hash Table Basics

### Definition
- **Hash Table:** Data structure that maps keys to values using hash function
- **Hash Function:** Converts key to array index
- **Goal:** Average O(1) operations

### Key Operations
- `insert(key, value)`: Add key-value pair
- `get(key)`: Retrieve value by key
- `delete(key)`: Remove key-value pair
- `contains(key)`: Check if key exists

### Time Complexity

| Operation | Average | Worst | Space |
|:---|:---|:---|:---|
| **Insert** | $\mathcal{O}(1)$ | $\mathcal{O}(n)$ | $\mathcal{O}(n)$ |
| **Search** | $\mathcal{O}(1)$ | $\mathcal{O}(n)$ | - |
| **Delete** | $\mathcal{O}(1)$ | $\mathcal{O}(n)$ | - |

**Note:** Worst case occurs when all keys hash to same index (collision)

---

## 2. Hash Function

### Requirements
1. **Deterministic:** Same key → same hash
2. **Uniform Distribution:** Keys distributed evenly
3. **Fast Computation:** O(1) time
4. **Minimize Collisions:** Different keys → different hashes (ideally)

### Common Hash Functions

#### Integer Keys
```cpp
// Simple modulo
int hash(int key, int size) {
    return key % size;
}

// Better: use prime number for size
int hash(int key, int prime) {
    return key % prime;
}
```

#### String Keys
```cpp
// Polynomial rolling hash
int hash(string s, int size) {
    int hash = 0;
    int p = 31; // or 53 for lowercase + uppercase
    int pow = 1;
    
    for (char c : s) {
        hash = (hash + (c - 'a' + 1) * pow) % size;
        pow = (pow * p) % size;
    }
    return hash;
}
```

### Visualization

**Hash Function Example:**
```
Keys: [10, 20, 30, 15, 25]
Hash function: h(k) = k % 7

h(10) = 10 % 7 = 3
h(20) = 20 % 7 = 6
h(30) = 30 % 7 = 2
h(15) = 15 % 7 = 1
h(25) = 25 % 7 = 4

Array: [_, 15, 30, 10, 25, _, 20]
Index:  0   1   2   3   4   5   6
```

---

## 3. Collision Resolution

### Problem
- **Collision:** Two keys hash to same index
- **Example:** h(10) = 3, h(17) = 3 (if size = 7)

### Methods

#### 1. Chaining (Separate Chaining)
- Each bucket contains linked list of entries
- Insert: Add to list
- Search: Traverse list
- Delete: Remove from list

```cpp
class HashTable {
    vector<list<pair<int, int>>> table;
    int size;
    
public:
    HashTable(int s) : size(s), table(s) {}
    
    void insert(int key, int value) {
        int index = hash(key);
        for (auto& p : table[index]) {
            if (p.first == key) {
                p.second = value;
                return;
            }
        }
        table[index].push_back({key, value});
    }
    
    int get(int key) {
        int index = hash(key);
        for (auto& p : table[index]) {
            if (p.first == key) return p.second;
        }
        return -1; // Not found
    }
};
```

**Time Complexity:**
- Average: O(1 + α) where α = n/m (load factor)
- Worst: O(n) if all keys collide

#### 2. Open Addressing
- Store all entries in array itself
- When collision occurs, find next available slot

**Probing Methods:**

##### Linear Probing
```cpp
int probe(int key, int i, int size) {
    return (hash(key) + i) % size;
}
```

##### Quadratic Probing
```cpp
int probe(int key, int i, int size) {
    return (hash(key) + i*i) % size;
}
```

##### Double Hashing
```cpp
int probe(int key, int i, int size) {
    int h1 = hash1(key);
    int h2 = hash2(key);
    return (h1 + i * h2) % size;
}
```

### Comparison

| Method | Average | Worst | Space | Notes |
|:---|:---|:---|:---|:---|
| **Chaining** | O(1+α) | O(n) | O(n) | Simple, handles any load |
| **Linear Probing** | O(1/(1-α)) | O(n) | O(n) | Cache friendly, clustering |
| **Quadratic Probing** | O(1/(1-α)) | O(n) | O(n) | Less clustering |
| **Double Hashing** | O(1/(1-α)) | O(n) | O(n) | Best distribution |

---

## 4. Load Factor

### Definition
- **Load Factor α = n/m**
  - n = number of entries
  - m = number of buckets

### Impact
- **Low α (< 0.5):** Few collisions, fast operations
- **High α (> 0.7):** Many collisions, slow operations
- **Solution:** Rehash when α > threshold

### Rehashing
```cpp
void rehash() {
    vector<pair<int, int>> old = entries;
    size *= 2;
    table.clear();
    table.resize(size);
    
    for (auto& p : old) {
        insert(p.first, p.second);
    }
}
```

---

## 5. Hash Set vs Hash Map

### Hash Set
- Stores only keys (no values)
- Operations: `add(key)`, `contains(key)`, `remove(key)`
- Use: Remove duplicates, fast membership test

### Hash Map
- Stores key-value pairs
- Operations: `put(key, value)`, `get(key)`, `remove(key)`
- Use: Frequency counting, caching, indexing

---

## 6. Applications

### 1. Frequency Counting
```cpp
unordered_map<int, int> freq;
for (int num : nums) {
    freq[num]++;
}
```

### 2. Two Sum Problem
```cpp
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map; // value -> index
    
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.count(complement)) {
            return {map[complement], i};
        }
        map[nums[i]] = i;
    }
    return {};
}
```

### 3. Group Anagrams
```cpp
vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> map;
    
    for (string s : strs) {
        string key = s;
        sort(key.begin(), key.end());
        map[key].push_back(s);
    }
    
    vector<vector<string>> result;
    for (auto& p : map) {
        result.push_back(p.second);
    }
    return result;
}
```

### 4. LRU Cache
- Use hash map + doubly linked list
- O(1) get and put operations

---

## 7. Implementation in Different Languages

### C++
```cpp
#include <unordered_map>
#include <unordered_set>

unordered_map<string, int> map;
map["key"] = 10;
int value = map["key"];

unordered_set<int> set;
set.insert(10);
bool exists = set.count(10);
```

### Java
```java
HashMap<String, Integer> map = new HashMap<>();
map.put("key", 10);
int value = map.get("key");

HashSet<Integer> set = new HashSet<>();
set.add(10);
boolean exists = set.contains(10);
```

### Python
```python
# Dictionary (hash map)
map = {}
map["key"] = 10
value = map["key"]

# Set (hash set)
set = set()
set.add(10)
exists = 10 in set
```

---

## 8. Key Insights

1. **Average O(1) but worst O(n)**
   - Depends on hash function quality and load factor

2. **Collision resolution is crucial**
   - Chaining: Simple, works with any load
   - Open addressing: Space efficient, cache friendly

3. **Load factor affects performance**
   - Keep α < 0.7 for good performance
   - Rehash when needed

4. **Hash function matters**
   - Good hash: uniform distribution
   - Bad hash: many collisions

---

## Common Mistakes

1. **Not handling collisions**
   - Assuming perfect hash function

2. **Not considering load factor**
   - Letting table get too full

3. **Using mutable keys**
   - Key changes → hash changes → can't find entry

4. **Not checking for existence**
   - Accessing non-existent key

---

## References

* [https://www.geeksforgeeks.org/hashing-data-structure/](https://www.geeksforgeeks.org/hashing-data-structure/)
* [https://www.geeksforgeeks.org/hashmap-in-java/](https://www.geeksforgeeks.org/hashmap-in-java/)

