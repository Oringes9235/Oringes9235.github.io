#ifndef COFFEEPP_PARSER_H
#define COFFEEPP_PARSER_H

#include "lexer.h"
#include "common.h"



typedef struct Expression {
    enum {
        EXPR_IDENTIFIER,
        EXPR_LITERAL,
        EXPR_BINARY,
        EXPR_ASSIGNMENT,
        EXPR_CALL
    } type;
    union {
        char* str_val;
        int int_val;
        double float_val;
    } value;
    char* arg_name;
} Expression;

typedef struct {
    Lexer* lexer;
    Token* current_token;
    ASTNode* ast;
} Parser;

// 新增函数声明
ASTNode* parse_function(Parser* parser);
ASTNode* create_decl_node(DataType type, const char* var_name, Expression* expr);
Expression* create_literal_expr(const char* value);

void init_parser(Parser* parser, Lexer* lexer);
void free_parser(Parser* parser);
ASTNode* parse(Parser* parser);

void free_ast(ASTNode* ast);
void free_expression(Expression* expr);

#endif