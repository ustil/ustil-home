# 简单实用算法合集

## 判断三个数中的最大值

```c
#include <stdio.h>

int main(void) {
  int a, b, c;
  scanf("%d %d %d", &a, &b, &c);
  if (a > b) {
    if (a > c) {
      printf("MAX is %d.\n", a);
    } else {
      printf("MAX is %d.\n", c);
    }
  } else {
    if (b > c) {
      printf("MAX is %d.\n", b);
    } else {
      printf("MAX is %d.\n", c);
    }
  }
  return 0;
}
```

## 判断闰年

```c
#include <stdio.h>

int main(void) {
  int year;
  scanf("%d", &year);

  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    printf("YES\n");
  } else {
    printf("NO\n");
  }
  return 0;
}
```

## 求两个正整数的最大公约数（辗转相除法）

```c
#include <stdio.h>

int main(void) {
  int a, b;
  scanf("%d %d", &a, &b);
  // 此处交换是想让 `a` 是较大的数，当然可以根据自己的需要或者实际情况来变更
  if (a < b) {
    int tmp = a;
    a = b;
    b = tmp;
  }
  while (b != 0) {
    int num = a % b;
    a = b;
    b = num;
  }
  printf("The greatest common divisor is %d.\n", a);
  return 0;
}
```

## 非负整数倒序分解（倒序输出）

```c
#include <stdio.h>

int main(void) {
  int number;
  scanf("%d", &number);

  while (number != 0) {
    printf("%d", number % 10);
    // 保证分解最后一个数字的时候不会再输出空格
    // 倒序输出只需要删除以下三行
    if (number > 9) {
      printf(" ");
    }
    number /= 10;
  }
  printf("\n");
  return 0;
}
```

> 如果想实现负数的倒序，只需开始的时候对 `number` 取绝对值，分解之前判断是否为负数，如果是，那就先输出一个负号。
  
## 非负整数正序分解

```c
#include <stdio.h>

int main(void) {
  int number;
  scanf("%d", &number);
  int tmp = number;
  int mask = 1;
  while (tmp > 9) {
    mask *= 10;
    tmp /= 10;
  }
  while (mask != 0) {
    printf("%d", number / mask);
    if (mask > 9) {
      printf(" ");
    }
    number %= mask;
    mask /= 10;
  }
  printf("\n");
  return 0;
}
```

## 朴素素数检验

```c
#include <stdbool.h>
#include <stdio.h>

bool is_prime(int number) {
  if (number < 2) {
    return false;
  }
  // 循环条件可改为 `i <= sqrt(number)` 以加快速度（函数 `sqrt` 位于 `math.h` 中）
  for (int i = 2; i <= number - 1; i++) {
    if (number % i == 0) {
      return false;
    }
  }
  return true;
}

int main(void) {
  int number;
  scanf("%d", &number);
  printf("%s\n", is_prime(number) ? "YES" : "NO");
  return 0;
}
```

## 整数位数

```c
#include <stdio.h>

int main(void) {
  int number;
  scanf("%d", &number);
  if (number < 0) {
    number = -number;
  }

  int digits = 0;
  while (number != 0) {
    digits++;
    number /= 10;
  }
  printf("The digits is %d.\n", digits);
  return 0;
}
```

## 无限循环

```c
#include <stdbool.h>

int main() {
  while (true) {
  }
  do {
  } while (true);
  for (;;) {
  }
  return 0;
}
```

## 求 n 位水仙花数

```c
#include <stdbool.h>
#include <stdio.h>

int power(int base, int exp) {
  int result = 1;
  for (int i = 0; i < exp; i++) {
    result *= base;
  }
  return result;
}

bool is_narcissistic(int number, int digits) {
  int sum = 0;
  int n = number;
  while (n > 0) {
    sum += power(n % 10, digits);
    n /= 10;
  }
  return number == sum;
}

int main(void) {
  int n;
  scanf("%d", &n);
  if (n == 1) {
    printf("0\n");
  }
  for (int i = power(10, n - 1); i < power(10, n); i++) {
    if (is_narcissistic(i, n)) {
      printf("%d\n", i);
    }
  }
  return 0;
}
```

## 求第 n 项斐波那契数

```c
#include <stdio.h>

long long fabonacci(int n) {
  if (n < 2) {
    return n;
  }
  return fabonacci(n - 1) + fabonacci(n - 2);
}

int main() {
  int n;
  scanf("%d", &n);
  printf("%lld\n", fabonacci(n));
  return 0;
}
```
