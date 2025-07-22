#include "../include/vm.h"
#include "../include/lexer.h"
#include "../include/parser.h"  // 添加parser.h头文件以获得Expression结构体定义
#include <stdio.h>
#include <string.h>

// Forward声明ASTNode结构体
typedef struct ASTNode ASTNode;

// 引入Expression结构体
typedef struct Expression Expression;

void init_vm(VirtualMachine* vm) {
    vm->state.variables = NULL;
    vm->state.var_count = 0;
    vm->state.var_capacity = 0;
    vm->exit_code = 0;
    vm->state.arg_count = 0;
    vm->state.args = NULL;
}

void free_vm(VirtualMachine* vm) {
    for (size_t i = 0; i < vm->state.var_count; i++) {
        free(vm->state.variables[i].name);
        if (vm->state.variables[i].type == DT_CHAR) {
            free(vm->state.variables[i].value.char_val);
        }
    }
    free(vm->state.variables);
    if (vm->state.args) {
        free(vm->state.args);
    }
}

void vm_set_args(VirtualMachine* vm, int argc, char** argv) {
    vm->state.arg_count = argc;
    vm->state.args = malloc(argc * sizeof(char*));
    for (int i = 0; i < argc; i++) {
        vm->state.args[i] = strdup(argv[i]);
    }
}

static Variable* find_var(VirtualMachine* vm, const char* name) {
    for (size_t i = 0; i < vm->state.var_count; i++) {
        if (strcmp(vm->state.variables[i].name, name) == 0) {
            return &vm->state.variables[i];
        }
    }
    return NULL;
}

void add_var(VirtualMachine* vm, Variable var) {
    if (vm->state.var_count >= vm->state.var_capacity) {
        vm->state.var_capacity = vm->state.var_capacity == 0 ? 8 : vm->state.var_capacity * 2;
        vm->state.variables = realloc(vm->state.variables, 
                                     vm->state.var_capacity * sizeof(Variable));
    }
    vm->state.variables[vm->state.var_count++] = var;
}

void execute(VirtualMachine* vm, ASTNode* ast) {
    while (ast) {
        switch (ast->stmt->type) {
            case STATEMENT_FUNCTION:
                if (strcmp(ast->stmt->func_name, "main") == 0) {
                    execute(vm, ast->stmt->func_body);
                }
                break;
                
            case STMT_PRINT:
                if (ast->stmt->print_args) {
                    // 移除字符串的引号
                    char* str = ast->stmt->print_args->value.str_val;
                    size_t len = strlen(str);
                    if (len >= 2 && str[0] == '"' && str[len-1] == '"') {
                        str[len-1] = '\0';
                        printf("%s\n", str + 1);
                    } else {
                        printf("%s\n", str);
                    }
                }
                break;
                
            case STMT_RET:
                vm->exit_code = ast->stmt->is_error ? 1 : 0;
                return;
        }
        ast = ast->next;
    }
}