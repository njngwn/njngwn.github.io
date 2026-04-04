---
layout: post
title: 'Number Theory'
date: 2026-02-02 00:00 +0100
categories: [Data Structures and Algorithms, Algorithms]
tags: [algorithms, number-theory, gcd, euclidean, crt, modular-inverse, sieve]
math: true
---

# Number Theory (정수론)

### 8.1 GCD & LCM

- **GCD (Greatest Common Divisor) / GCD (최대공약수):** $gcd(a,b) = \max\{k : k|a \land k|b\}$. / $gcd(a,b) = \max\{k : k|a \land k|b\}$.
- **LCM (Least Common Multiple) / LCM (최소공배수):** $lcm(a,b) = \min\{k : a|k \land b|k\}$. / $lcm(a,b) = \min\{k : a|k \land b|k\}$.
- **Property:** $gcd(a,b) \cdot lcm(a,b) = a \cdot b$. / $gcd(a,b) \cdot lcm(a,b) = a \cdot b$.
- **Euclidean Algorithm / 유클리드 알고리즘:** $gcd(a,b) = gcd(b, a \bmod b)$. / $gcd(a,b) = gcd(b, a \bmod b)$.
- **Time Complexity / 시간 복잡도:** $\mathcal{O}(\log \min(a,b))$. / $\mathcal{O}(\log \min(a,b))$.

**Visualization / 시각화:**

**Euclidean Algorithm Example:**
```
gcd(48, 18):
  48 = 18 × 2 + 12
  18 = 12 × 1 + 6
  12 = 6 × 2 + 0
  → gcd(48, 18) = 6

Step-by-step:
  (48, 18) → (18, 48 mod 18 = 12)
  (18, 12) → (12, 18 mod 12 = 6)
  (12, 6) → (6, 12 mod 6 = 0)
  (6, 0) → return 6
```

**Possible Questions:**
- Explain the Euclidean algorithm. (EN: Repeatedly replace (a,b) with (b, a mod b) until b=0, then return a. KR: (a,b)를 (b, a mod b)로 반복 교체, b=0이면 a 반환.)
- Why is it $\mathcal{O}(\log \min(a,b))$? (EN: Each step reduces the larger number by at least half. KR: 각 단계에서 큰 수가 최소 절반으로 감소.)

---

### 8.2 Extended Euclidean Algorithm

- **Bézout's Lemma / 베주 항등식:** For any $a,b$, there exist $x,y$ such that $ax + by = gcd(a,b)$. / 모든 $a,b$에 대해 $ax + by = gcd(a,b)$인 $x,y$ 존재.
- **Algorithm / 알고리즘:** Compute $x,y$ alongside GCD. / GCD와 함께 $x,y$ 계산.
- **Application / 응용:** Modular inverse: if $gcd(a,m)=1$, then $x$ (from $ax + my = 1$) is the modular inverse of $a$ modulo $m$ ($ax \equiv 1 \pmod{m}$). / 모듈러 역원: $gcd(a,m)=1$이면 $x$ (from $ax + my = 1$)는 $a$의 모듈러 역원 ($ax \equiv 1 \pmod{m}$).

**Visualization / 시각화:**

**Extended Euclidean Algorithm Example:**
```
Find x, y such that 48x + 18y = gcd(48,18) = 6

Backward substitution:
  6 = 18 - 12 × 1
  12 = 48 - 18 × 2
  → 6 = 18 - (48 - 18 × 2) × 1
    = 18 - 48 + 18 × 2
    = 48 × (-1) + 18 × 3

Therefore: x = -1, y = 3
Check: 48 × (-1) + 18 × 3 = -48 + 54 = 6 ✓
```

**Modular Inverse Example:**
```
Find inverse of 7 modulo 26 (i.e., x such that 7x ≡ 1 (mod 26))

Extended Euclidean:
  26 = 7 × 3 + 5
  7 = 5 × 1 + 2
  5 = 2 × 2 + 1
  2 = 1 × 2 + 0

Backward:
  1 = 5 - 2 × 2
    = 5 - (7 - 5 × 1) × 2
    = 5 × 3 - 7 × 2
    = (26 - 7 × 3) × 3 - 7 × 2
    = 26 × 3 - 7 × 11

Therefore: 7 × (-11) + 26 × 3 = 1
Inverse: -11 mod 26 = 15

Check: 7 × 15 = 105 ≡ 1 (mod 26) ✓
```

**Real Problem Applications:**
- **Candy Distribution (can):** Extended Euclidean Algorithm finds modular inverse. Problem: find $m$ such that $b \cdot m \equiv 1 \pmod{k}$ (i.e., $b \cdot m = k \cdot n + 1$ for some $n$). This requires $gcd(b,k) = 1$. If true, use extended Euclidean to find $x$ in $bx + ky = 1$, then $x \bmod k$ is the modular inverse (the number of bags $m$). (EN: Linear Diophantine equation $b \cdot m - k \cdot n = 1$. Solvable iff $gcd(b,k) = 1$. Extended Euclidean gives solution. KR: 선형 디오판토스 방정식 $b \cdot m - k \cdot n = 1$. $gcd(b,k) = 1$일 때만 해가 존재. 확장 유클리드로 해를 구합니다.)
- **Keyboards (key):** Extended Euclidean or CRT. Problem: find $x$ such that $x \equiv s_1 \pmod{c_1}$ and $x \equiv s_2 \pmod{c_2}$ and $x \ge k$. This is a system of congruences, solvable using CRT if $gcd(c_1, c_2) = 1$, or extended Euclidean for the general case. (EN: System of congruences - find common solution to multiple modular equations. KR: 합동식 시스템 - 여러 모듈러 방정식의 공통 해 찾기.)

**Number Theory Algorithms Comparison / 정수론 알고리즘 비교:**

| Algorithm | Problem | Time Complexity | Space Complexity | Key Idea |
|:---|:---|:---|:---|:---|
| **Euclidean** | GCD(a,b) | $\mathcal{O}(\log \min(a,b))$ | $\mathcal{O}(1)$ | $gcd(a,b) = gcd(b, a \bmod b)$ |
| **Extended Euclidean** | Modular inverse, Bézout coefficients / 모듈러 역원, 베주 계수 | $\mathcal{O}(\log \min(a,b))$ | $\mathcal{O}(1)$ | Back-substitution / 역대입 |
| **Fast Exponentiation** | $x^n \bmod m$ | $\mathcal{O}(\log n)$ | $\mathcal{O}(1)$ | Binary representation / 이진 표현 |
| **Sieve of Eratosthenes** | Primes ≤ n / n 이하 소수 | $\mathcal{O}(n \log \log n)$ | $\mathcal{O}(n)$ | Mark multiples starting from $i^2$ / $i^2$부터 배수 표시 |
| **CRT** | System of congruences / 합동식 시스템 | $\mathcal{O}(k \log \max(n_i))$ | $\mathcal{O}(k)$ | Extended Euclidean for each modulus / 각 모듈러에 확장 유클리드 |
| **Karatsuba** | Big integer multiplication / 큰 정수 곱셈 | $\mathcal{O}(n^{1.585})$ | $\mathcal{O}(n)$ | Split and reduce multiplications / 분할하여 곱셈 수 감소 |

**Possible Questions:**
- How do you find modular inverse? (EN: Use extended Euclidean to solve ax + my = 1, then x mod m is the inverse. KR: 확장 유클리드로 ax + my = 1 해결, x mod m이 역원.)
- What if gcd(a,m) != 1? (EN: No modular inverse exists. KR: 모듈러 역원이 존재하지 않습니다.)

---

### 8.3 Chinese Remainder Theorem (CRT)

- **Theorem / 정리:** Given pairwise coprime moduli $n_1,...,n_k$ and remainders $a_1,...,a_k$, the system: / 서로소인 모듈러 $n_1,...,n_k$와 나머지 $a_1,...,a_k$가 주어지면:
  - $x \equiv a_1 \pmod{n_1}$ / $x \equiv a_1 \pmod{n_1}$
  - ... / ...
  - $x \equiv a_k \pmod{n_k}$ / $x \equiv a_k \pmod{n_k}$
  has a unique solution modulo $N = \prod n_i$. / 는 $N = \prod n_i$ 모듈로 유일한 해를 가집니다.
- **Construction / 구성:** Use extended Euclidean to find coefficients, combine solutions. / 확장 유클리드로 계수 찾기, 해 결합.
- **Non-Coprime Moduli / 비서로소 모듈러:** If moduli are not coprime, decompose into prime powers and check consistency. / 모듈러가 서로소가 아니면 소수 거듭제곱으로 분해하고 일관성 확인.

**Visualization / 시각화:**

**Chinese Remainder Theorem Example:**
```
System:
  x ≡ 2 (mod 3)
  x ≡ 3 (mod 5)
  x ≡ 2 (mod 7)

Step 1: N = 3 × 5 × 7 = 105

Step 2: For each modulus:
  N₁ = 105/3 = 35, find M₁: 35M₁ ≡ 1 (mod 3)
    35 mod 3 = 2, so 2M₁ ≡ 1 (mod 3) → M₁ = 2
  N₂ = 105/5 = 21, find M₂: 21M₂ ≡ 1 (mod 5)
    21 mod 5 = 1, so M₂ = 1
  N₃ = 105/7 = 15, find M₃: 15M₃ ≡ 1 (mod 7)
    15 mod 7 = 1, so M₃ = 1

Step 3: x = (2×35×2 + 3×21×1 + 2×15×1) mod 105
        = (140 + 63 + 30) mod 105
        = 233 mod 105 = 23

Check:
  23 mod 3 = 2 ✓
  23 mod 5 = 3 ✓
  23 mod 7 = 2 ✓
```

---

### 8.4 Big Integers

- **Motivation / 동기:** Primitive data types have limits. / 기본 데이터 타입에는 한계가 있습니다.
  - C++: `unsigned long long` ≈ $1.84 \times 10^{19}$ ($2^{64}-1$)
  - Rust: `u128` ≈ $3.40 \times 10^{38}$ ($2^{128}-1$)
- **Representation / 표현:** Base $b$ system with digits $\Sigma_b = \{0,1,...,b-1\}$. / 자릿수 $\Sigma_b = \{0,1,...,b-1\}$를 사용하는 $b$진법 시스템.
- **Language Support / 언어 지원:**
  - Python: Built-in long arithmetic
  - Java: `BigInteger` class
  - Julia: `BigInt` type
  - C++: Not in standard library (use external libraries)
  - Rust: `num_bigint` crate

**Operations / 연산:**
- **Addition / 덧셈:** $\mathcal{O}(n)$ where $n$ is number of digits. / 자릿수 $n$에 대해 $\mathcal{O}(n)$.
- **Multiplication / 곱셈:**
  - Grid Multiplication: $\mathcal{O}(n^2)$
  - Karatsuba Algorithm: $\mathcal{O}(n^{\log_2 3}) \approx \mathcal{O}(n^{1.585})$

**Karatsuba Algorithm / 카라추바 알고리즘:**
- **Idea:** Split numbers $x, y$ into halves: $x = x_0 + x_1 b^k$, $y = y_0 + y_1 b^k$
- **Naive:** $(x_0 + x_1 b^k)(y_0 + y_1 b^k) = x_0 y_0 + (x_1 y_0 + x_0 y_1)b^k + x_1 y_1 b^{2k}$ (4 multiplications)
- **Optimization:** Compute $(x_1 y_0 + x_0 y_1)$ as $(x_0 + x_1)(y_0 + y_1) - x_0 y_0 - x_1 y_1$ (3 multiplications)
- **Complexity:** Reduces from $\mathcal{O}(n^2)$ to $\mathcal{O}(n^{1.585})$

**Example / 예시:**
```
Karatsuba: Multiply 1234 × 5678

Split: x = 12×100 + 34, y = 56×100 + 78

Compute:
  z0 = 34 × 78 = 2652
  z2 = 12 × 56 = 672
  z1 = (12+34)(56+78) - z0 - z2 = 46×134 - 2652 - 672 = 6164 - 3324 = 2840

Result: z0 + z1×100 + z2×10000 = 2652 + 2840×100 + 672×10000 = 7006652
```

---

### 8.5 Rational Numbers

- **Motivation / 동기:** Floating point causes loss of significance and rounding issues. / 부동소수점은 유효숫자 손실과 반올림 문제를 일으킵니다.
- **Representation / 표현:** Store as $\frac{a}{b}$ where $gcd(a,b) = 1$ (simplified). / $gcd(a,b) = 1$인 $\frac{a}{b}$로 저장 (약분된 형태).
- **Operations / 연산:**
  - Sum: $\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}$
  - Difference: $\frac{a}{b} - \frac{c}{d} = \frac{ad - bc}{bd}$
  - Product: $\frac{a}{b} \cdot \frac{c}{d} = \frac{ac}{bd}$
  - Quotient: $\frac{a}{b} / \frac{c}{d} = \frac{ad}{bc}$ (if $c \neq 0$)
- **Note:** Always simplify using $gcd(a,b)$ after operations. / 연산 후 항상 $gcd(a,b)$로 약분.

---

### 8.6 Fast Exponentiation

**Binary Exponentiation / 이진 거듭제곱:**
- Compute $x^n$ in $\mathcal{O}(\log n)$ multiplications. / $\mathcal{O}(\log n)$ 곱셈으로 $x^n$ 계산.
- **Idea:** $x^n = \prod_{i} (x^{2^i})^{n_i}$ where $n_i$ are bits of $n$. / $x^n = \prod_{i} (x^{2^i})^{n_i}$ ($n_i$는 $n$의 비트).

**Visualization / 시각화:**

**Fast Exponentiation Example:**
```
Compute 3^13

13 in binary: 1101₂ = 8 + 4 + 1

Step-by-step:
  result = 1
  base = 3
  
  Bit 0 (LSB): 1 → result = 1 × 3 = 3, base = 3² = 9
  Bit 1: 0 → result = 3 (no change), base = 9² = 81
  Bit 2: 1 → result = 3 × 81 = 243, base = 81² = 6561
  Bit 3 (MSB): 1 → result = 243 × 6561 = 1594323

Check: 3^13 = 1594323 ✓

Only 5 multiplications instead of 12!
```

---

### 8.7 Sieve of Eratosthenes

- **Purpose / 목적:** Find all primes $\le n$. / $n$ 이하의 모든 소수 찾기.
- **Algorithm / 알고리즘:**
  1. Mark all numbers 2..n as potential primes. / 2..n을 모두 소수 후보로 표시.
  2. For $i = 2$ to $\sqrt{n}$: / $i = 2$부터 $\sqrt{n}$까지:
     - If $i$ is prime, mark all multiples $i^2, i^2+i, ...$ as composite. / $i$가 소수이면 모든 배수 $i^2, i^2+i, ...$를 합성수로 표시.
- **Time Complexity / 시간 복잡도:** $\mathcal{O}(n \log \log n)$. / $\mathcal{O}(n \log \log n)$.

**Visualization / 시각화:**

**Sieve of Eratosthenes (n=30):**
```
Initial: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]

i=2 (prime): Mark multiples of 2 starting from 2²=4
  [2, 3, ✗, 5, ✗, 7, ✗, 9, ✗, 11, ✗, 13, ✗, 15, ✗, 17, ✗, 19, ✗, 21, ✗, 23, ✗, 25, ✗, 27, ✗, 29, ✗]

i=3 (prime): Mark multiples of 3 starting from 3²=9
  [2, 3, ✗, 5, ✗, 7, ✗, ✗, ✗, 11, ✗, 13, ✗, ✗, ✗, 17, ✗, 19, ✗, ✗, ✗, 23, ✗, 25, ✗, ✗, ✗, 29, ✗]

i=4 (composite, skip)
i=5 (prime): Mark multiples of 5 starting from 5²=25
  [2, 3, ✗, 5, ✗, 7, ✗, ✗, ✗, 11, ✗, 13, ✗, ✗, ✗, 17, ✗, 19, ✗, ✗, ✗, 23, ✗, ✗, ✗, ✗, ✗, 29, ✗]

i=6 (composite, skip)
Stop at i=5 (since 5²=25 ≤ 30, but 6²=36 > 30)

Primes: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
```

**Why start from i²:**
```
For i=5:
  Multiples: 5, 10, 15, 20, 25, 30, ...
  
  5×1 = 5 (already prime)
  5×2 = 10 (already marked by 2)
  5×3 = 15 (already marked by 3)
  5×4 = 20 (already marked by 2)
  5×5 = 25 (first unmarked) ← start here!
```

**Possible Questions:**
- Why start from $i^2$? (EN: Smaller multiples are already marked by previous primes. KR: 더 작은 배수는 이미 이전 소수에 의해 표시되었습니다.)
- Why only up to $\sqrt{n}$? (EN: Any composite number <= n has a prime factor <= sqrt(n). KR: n 이하의 모든 합성수는 sqrt(n) 이하의 소인수를 가집니다.)

