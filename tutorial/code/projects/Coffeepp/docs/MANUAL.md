# Coffee++ 操作手册

## 基本语法

### 变量声明
    int num = 42;
    float pi = 3.14159;
    char greeting = "Hello, World!";
    auto anything = "Can be any type";

### 变量赋值
    var1 => var2;  # 将var1的值赋给var2

### 控制台输出
    printf("Hello/nWorld!");  # 换行输出
    printf.red("Error message");  # 红色输出

### 函数定义
    auto add(a, b) {
        ret => a + b;
    }

### 主函数
    main(arg1, arg2) {
        printf(arg1);
        printf(arg2);
        ret end;  # 正常结束
    }

## 命令行使用
    coffeepp program.cfp arg1 arg2