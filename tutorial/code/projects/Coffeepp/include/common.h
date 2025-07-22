#ifndef COFFEEPP_COMMON_H
#define COFFEEPP_COMMON_H

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>
#include <ctype.h>

// 数据类型枚举
typedef enum {
    DT_INT,
    DT_FLOAT,
    DT_CHAR,
    DT_AUTO,
    DT_UNKNOWN
} DataType;

// 变量结构体
typedef struct {
    char* name;
    DataType type;
    union {
        int64_t int_val;
        double float_val;
        char* char_val;
    } value;
} Variable;

// 虚拟机状态
typedef struct {
    Variable* variables;
    size_t var_count;
    size_t var_capacity;
} VMState;

#endif // COFFEEPP_COMMON_H