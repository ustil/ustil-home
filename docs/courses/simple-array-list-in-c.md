# 在 C 中实现简单动态数组

内存管理是 C 语言乃至计算机科学的重要课题，本文将使用不到 50 行代码实现一个简单的动态数组，读完本文，你将学到：

1. **结构体的使用**：代码中使用了结构体 `ArrayList` 来封装动态数组的相关信息，包括长度、容量和数据存储指针。结构体是 C 语言中用于组织和存储不同类型数据的一种重要工具。
2. **内存管理概念**：通过 `calloc`、`realloc` 和 `free` 函数，可以了解到如何分配和释放内存，并在已分配空间不足时进行扩容。
3. **简单错误处理**：代码中使用了 `exit` 函数来处理内存分配失败的情况。这展示了在编程中如何进行简单的错误处理，以保证程序在出现问题时能够优雅地退出。
4. **指针的使用**：了解指针的概念和在动态内存分配中的应用。

## 代码实现

```c
#include <stdio.h>
#include <stdlib.h>

// 定义一个动态数组结构体
typedef struct {
  size_t length;   // 数组当前长度
  size_t capacity; // 数组容量
  int* data;       // 存储数据的指针
} ArrayList;

// 初始化一个新的动态数组
ArrayList array_list_new(size_t capacity) {
  ArrayList list = {
      .length = 0,
      .capacity = capacity,
      .data = calloc(capacity, sizeof(int)),  // 使用 calloc 分配内存并初始化为 0
  };
  // 分配内存失败，立即退出程序
  if (list.data == NULL) {
    exit(EXIT_FAILURE);
  }
  return list;
}

// 释放动态数组占用的内存
void array_list_drop(ArrayList* list) {
  free(list->data);
}

// 打印动态数组的所有元素
void array_list_println(ArrayList* list) {
  for (size_t i = 0; i < list->length; i++) {
    printf("%d ", list->data[i]);
  }
  putchar('\n');
}

// 向动态数组末尾添加一个元素
void array_list_push(ArrayList* list, int value) {
  // 当数组长度即将超过容量时，扩大数组容量
  if (list->length + 1 > list->capacity) {
    // 此处选择每次扩大到当前容量的 2 倍
    size_t new_capacity = list->capacity * 2;
    int* new_list = realloc(list->data, new_capacity * sizeof(int));
    if (new_list == NULL) {
      // 重新分配内存失败，释放原内存并退出程序
      array_list_drop(list);
      exit(EXIT_FAILURE);
    }

    list->data = new_list;
    list->capacity = new_capacity;
  }
  list->data[list->length++] = value;
}

int main(void) {
  // 创建一个初始容量为5的动态数组
  ArrayList list = array_list_new(5);

  // 向数组添加元素
  array_list_push(&list, 0);
  array_list_push(&list, 1);
  array_list_push(&list, 2);
  array_list_push(&list, 3);
  array_list_push(&list, 4);

  // 打印数组容量、长度和元素
  printf("capacity: %zd, length: %zd, elements: ", list.capacity, list.length);
  array_list_println(&list);

  // 再次向数组添加元素
  array_list_push(&list, 5);
  array_list_push(&list, 6);
  array_list_push(&list, 7);

  // 打印数组容量、长度和元素
  printf("capacity: %zd, length: %zd, elements: ", list.capacity, list.length);
  array_list_println(&list);

  // 释放动态数组占用的内存
  array_list_drop(&list);

  return EXIT_SUCCESS;
}
```

运行结果：

```
$ ./list
capacity: 5, length: 5, elements: 0 1 2 3 4 
capacity: 10, length: 8, elements: 0 1 2 3 4 5 6 7 
```

## 结构定义

结构体是一种用户自定义的数据类型，它允许我们将不同类型的数据组合在一起形成一个新的数据类型。在本例中，`ArrayList` 结构体用于封装动态数组的相关信息，包括数组的长度、容量以及数据存储的指针。

```c
typedef struct {
  size_t length;   // 数组当前长度
  size_t capacity; // 数组容量
  int* data;       // 存储数据的指针
} ArrayList;
```

其中，`length` 代表数组当前存储元素数量，而 `capacity` 代表数组当前最大可容纳的元素数量。长度 `length` 一定小于或等于容量 `capacity`，当数组长度即将超过容量时，需要对数组进行扩容，以确保有足够的空间存储新的元素。

## 语法糖

语法糖指编程语言提供的一种用以简化复杂语法的简单语法格式，且两种语法等价。在上文的代码中，`list->length` 就是用来简化 `(*list).length` 写法的语法糖，两种写法完全等价，但显然前者更为简练。在 C 中，可以通过 `.` 运算符来访问结构体的成员，如 `list.length`，但假如 `list` 是一个指针，就需要先解引用，再访问，比较繁琐，而这种用法又很常见，所以 C 为我们提供了 `->` 运算符以使代码更为简练。

## 传值 or 传指针？

为什么在上面代码定义的各个函数都选择传入结构体的指针？在两数交换函数的例子中，由于我们需要实现交换两整数的值，而函数传参在内存中采用复制操作，所以我们需要传入两数指针以在函数中定位原始值所在内存位置，以实现两值交换。而在上面代码中也存在同样的问题，如 `array_list_push` 函数中需要改变成员 `length` 和 `capacity` 的值。

此外，由于结构体中存储多个值，所以结构体的大小通常大于 `int`、`char` 等基本类型，所以对于结构体直接传值，可能会带来较大的复制成本，而采用传指针即可规避该问题。但也并不是所有情况都适合传指针，由于（任何）指针类型通常占用 4（32 位）或 8（64 位）字节，其大小大于或等于基本类型，且在栈中的复制成本并不会过高，反而使用指针进行解引用也会造成一定成本；况且，C 中并不支持对右值（临时值、字面量）进行取地址操作（`&1`、`&"hello"`），所以对于使用指针作为参数的函数，必须提前定义变量才能实现传参。

```c
void foo(int*);

void bar() {
  // 须提前定义变量
  int a = 0;
  foo(&a)

  // 非法操作
  // foo(&0);
}
```

## 错误处理

在代码中，使用 `exit(EXIT_FAILURE);` 来处理内存分配失败的情况。这样做的好处在于，如果动态内存分配失败，程序会立即退出并返回一个非零的退出码，通知操作系统发生了错误。这有助于及早发现并处理程序运行中的问题，使程序更加健壮。

### `return` 和 `exit` 的区别

- `return`：用于从函数中返回值，将控制权返回到调用该函数的地方。
- `exit`：用于立即终止程序的执行，无论程序当前执行到何处。

因此，在 `main` 函数中，`return` 与 `exit` 基本等价；

### EXIT_SUCCESS 和 EXIT_FAILURE 是什么

他们是定义在 `stdlib.h` 中的两个宏，`EXIT_SUCCESS` 通常为 0，`EXIT_FAILURE` 通常为非 0。

```c
#define	EXIT_FAILURE 1
#define	EXIT_SUCCESS 0
```

## 总结

以上所展示的代码仅实现了在动态数组末尾增加元素并进行动态扩容，距离能够在生产环境下使用且功能完备的数组库还远远不足，但至少通过学习，我们能够了解到实现动态数组的关键核心。希望这篇文章能帮助读者更好地了解 C 语言语法与内存操作。
