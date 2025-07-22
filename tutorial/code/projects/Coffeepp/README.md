# Coffee++ 语言介绍

## 语言概述
Coffee++ 是一种结合 C 语言简洁性和脚本语言灵活性的轻量级编程语言，主要特点包括：

- 文件扩展名：`.cfp`（主文件）和 `.cfh`（头文件）
- 注释风格：
    - 单行：`# 这是注释`
    - 多行：
    #*
     这是多行
     注释
    *#

## 核心特性

### 1. 变量与数据类型
支持四种基本类型：

    int num = 42;
    float pi = 3.14159;
    char text = "Hello";
    auto dynamic = "可以是任意类型";

变量命名规则：
- 允许：字母/数字/_-*
- 首字符：字母或下划线

### 2. 控制结构
条件判断：

    if (x > 10) {
        printf("Large number/n");
    }

循环结构：

    while (x < 100) {
        x => x + 1;
    }

### 3. 函数定义
语法示例：

    auto add(a, b) {
        ret => a + b;
    }

### 4. 主函数与参数
主函数自动执行：

    main(arg1, arg2) {
        printf(arg1);
        printf(arg2);
        ret end;  # 正常退出
    }

## 特色功能

### 彩色输出
~~~cfp
printf.red("Error message");  # 红色输出
printf.green("Success!");    # 绿色输出
~~~

### 链式赋值
&nbsp;&nbsp;&nbsp;&nbsp;x => y => z => 0;  # 同时赋值多个变量

## 示例程序
完整计算器实现：

~~~cfp
# 简易计算器
main(a, b) {
    int sum = a + b;
    printf("Result: ");
    printf(sum);
    printf("/n");
    
    ret end;
}
~~~

## 开发工具链
编译命令：

    gcc -Iinclude src/*.c -o coffeepp

执行方式：

    ./coffeepp program.cfp 参数1 参数2

    
# 项目地址
<strong>
https://github.com/Oringes9235/Coffeepp
</strong>