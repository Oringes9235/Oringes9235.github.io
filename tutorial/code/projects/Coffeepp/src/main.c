#include "../include/parser.h"
#include "../include/vm.h"
#include "../include/utils.h"

int main(int argc, char** argv) {
    // 声明并初始化虚拟机
    VirtualMachine vm;
    init_vm(&vm);

    if (argc > 1) {
        // 创建参数变量
        Variable arg_a = {
            .name = "a",
            .type = DT_INT,
            .value.int_val = atoi(argv[1])
        };
        
        Variable arg_b = {
            .name = "b",
            .type = DT_INT,
            .value.int_val = argc > 2 ? atoi(argv[2]) : 0
        };
        
        // 添加到虚拟机状态
        add_var(&vm, arg_a);
        add_var(&vm, arg_b);
    }
    if (argc < 2) {
        fprintf(stderr, "Usage: %s <file.cfp> [args...]\n", argv[0]);
        return 1;
    }

    char* source = read_file(argv[1]);
    if (!source) {
        fprintf(stderr, "Error reading file: %s\n", argv[1]);
        return 1;
    }
//printf("File content:\n%s\n", source);  // 读取文件后DEBUG

    // 初始化词法分析器
    Lexer lexer;
    init_lexer(&lexer, source);
    
    // 词法分析
    Token* tokens = lex(&lexer);
    if (!tokens) {
        fprintf(stderr, "Lexical analysis failed\n");
        free(source);
        return 1;
    }
//printf("Token count: %zu\n", lexer.token_count);  // 词法分析后DEBUG
    // 初始化语法分析器
    Parser parser;
    init_parser(&parser, &lexer);
    
    // 语法分析
    ASTNode* ast = parse(&parser);
    if (!ast) {
        fprintf(stderr, "Syntax analysis failed\n");
        free_lexer(&lexer);
    }
    // 初始化虚拟机参数
    vm_set_args(&vm, argc - 1, argv + 1);  // 跳过程序名
    
    // 执行程序
    execute(&vm, ast);
    vm_set_args(&vm, argc - 1, argv + 1);  // 跳过程序名
    
    // 执行程序
    execute(&vm, ast);
    if (ast) {
        free_ast(ast);
    }
    // 清理资源
    free_vm(&vm);
    // free_parser(&parser);
    free_lexer(&lexer);
    free(source);

    return vm.exit_code;
    return 0;
}