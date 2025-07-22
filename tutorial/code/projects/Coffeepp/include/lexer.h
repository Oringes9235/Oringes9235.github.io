#include <stddef.h>
#include <stdlib.h>
#ifndef COFFEEPP_LEXER_H
#define COFFEEPP_LEXER_H

typedef struct ASTNode ASTNode;

typedef enum {
    TOKEN_EOF,
    TOKEN_IDENTIFIER,
    TOKEN_INT,
    TOKEN_FLOAT,
    TOKEN_STRING,
    TOKEN_SEMICOLON,
    TOKEN_LPAREN,
    TOKEN_RPAREN,
    TOKEN_LBRACE,
    TOKEN_RBRACE,
    TOKEN_ARROW,
    TOKEN_COMMA,
    TOKEN_IMPORT,
    TOKEN_PRINT,
    TOKEN_RET,
    TOKEN_END,
    TOKEN_ERO,
    TOKEN_DOT,
    TOKEN_COLOR,
    TOKEN_EQUAL,     // 对应 = 
    TOKEN_PLUS,      // 对应 +
    TOKEN_MINUS,     // 对应 -
    TOKEN_STAR,      // 对应 *
    TOKEN_SLASH,     // 对应 /
    TOKEN_ESCAPE     // 对应 \n 等转义字符
    // 可根据需要添加更多类型
} TokenType;

typedef struct {
    TokenType type;
    char* value;
    size_t line;
    size_t column;
} Token;

typedef struct {
    const char* source;
    size_t source_len;
    size_t position;
    size_t line;
    size_t column;
    Token* tokens;
    size_t token_count;
    size_t token_capacity;
} Lexer;

// 声明 StatementType 枚举类型
struct Expression;  // 前向声明

typedef enum {
    STATEMENT_UNKNOWN,
    STATEMENT_RETURN,
    STATEMENT_PRINT,
    STATEMENT_IMPORT,
    STATEMENT_COLOR,
    STMT_IMPORT,
    STMT_RET,
    STMT_PRINT,
    STMT_ARGUMENT,  // 添加STMT_ARGUMENT定义
    STATEMENT_FUNCTION,
    STMT_ASSIGN
} StatementType;

typedef struct Statement {
    StatementType type;
    // 其他字段
    struct Expression* ret_expr;
    struct Expression* print_args;
    char* color;
    struct Expression* expr;  // 添加expr字段
    int is_error; // 用于标记是否为错误返回
    char* assign_target;
    struct Expression* assign_expr;
    char* func_name;
    ASTNode* func_body;
} Statement;

// ASTNode struct
typedef struct ASTNode {
    Statement* stmt;
    struct ASTNode* next;
} ASTNode;







void init_lexer(Lexer* lexer, const char* source);
void free_lexer(Lexer* lexer);
Token* lex(Lexer* lexer);

#endif // COFFEEPP_LEXER_H