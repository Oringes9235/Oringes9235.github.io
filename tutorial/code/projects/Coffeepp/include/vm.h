#ifndef COFFEEPP_VM_H
#define COFFEEPP_VM_H

#include "common.h"

// Forward declaration for ASTNode
typedef struct ASTNode ASTNode;

typedef struct {
    Variable* variables;
    size_t var_count;
    size_t var_capacity;
    int arg_count;
    char** args;  // 保存原始参数
} VirtualMachineState;

typedef struct {
    VirtualMachineState state;
    int exit_code;
} VirtualMachine;

// 函数声明
void init_vm(VirtualMachine* vm);
void free_vm(VirtualMachine* vm);
void vm_set_args(VirtualMachine* vm, int argc, char** argv);
void add_var(VirtualMachine* vm, Variable var);
void execute(VirtualMachine* vm, ASTNode* ast);  // 假设ASTNode已正确定义

#endif // COFFEEPP_VM_H