#include "../include/parser.h"
#include "../include/lexer.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

void init_parser(Parser* parser, Lexer* lexer) {
    parser->lexer = lexer;
    parser->current_token = lexer->tokens;
    parser->ast = NULL;
}

static Token* advance(Parser* parser) {
    if (parser->current_token->type != TOKEN_EOF) {
        parser->current_token++;
    }
    return parser->current_token;
}

static Token* expect(Parser* parser, TokenType type) {
    if (parser->current_token->type == type) {
        return advance(parser);
    }
    fprintf(stderr, "Expected token %d but got %d at line %zu\n", 
            type, parser->current_token->type, parser->current_token->line);
    return NULL;
}

Expression* create_literal_expr(const char* value) {
    Expression* expr = malloc(sizeof(Expression));
    expr->type = EXPR_LITERAL;
    expr->value.str_val = strdup(value);
    return expr;
}

static ASTNode* parse_statement(Parser* parser) {
    // printf语句解析
    if (parser->current_token->type == TOKEN_PRINT) {
        ASTNode* node = malloc(sizeof(ASTNode));
        node->stmt = malloc(sizeof(Statement));
        node->stmt->type = STMT_PRINT;
        advance(parser);

        if (expect(parser, TOKEN_LPAREN) == NULL) return NULL;
        
        // 解析字符串参数
        if (parser->current_token->type == TOKEN_STRING) {
            node->stmt->print_args = create_literal_expr(parser->current_token->value);
            advance(parser);
        }

        if (expect(parser, TOKEN_RPAREN) == NULL || 
            expect(parser, TOKEN_SEMICOLON) == NULL) {
            free(node);
            return NULL;
        }
        return node;
    }

    // ret语句解析
    if (parser->current_token->type == TOKEN_RET) {
        ASTNode* node = malloc(sizeof(ASTNode));
        node->stmt = malloc(sizeof(Statement));
        node->stmt->type = STMT_RET;
        advance(parser);

        if (parser->current_token->type == TOKEN_END) {
            node->stmt->is_error = 0;
            advance(parser);
        } else if (parser->current_token->type == TOKEN_ERO) {
            node->stmt->is_error = 1;
            advance(parser);
        }

        if (expect(parser, TOKEN_SEMICOLON) == NULL) return NULL;
        return node;
    }

    return NULL;
}

ASTNode* parse_function(Parser* parser) {
    if (parser->current_token->type != TOKEN_IDENTIFIER) return NULL;
    
    char* func_name = strdup(parser->current_token->value);
    advance(parser);

    if (expect(parser, TOKEN_LPAREN) == NULL) return NULL;
    if (expect(parser, TOKEN_RPAREN) == NULL) return NULL;
    if (expect(parser, TOKEN_LBRACE) == NULL) return NULL;

    ASTNode* func_node = malloc(sizeof(ASTNode));
    func_node->stmt = malloc(sizeof(Statement));
    func_node->stmt->type = STATEMENT_FUNCTION;
    func_node->stmt->func_name = func_name;

    // 解析函数体
    ASTNode* body_head = NULL;
    ASTNode** current = &body_head;
    
    while (parser->current_token->type != TOKEN_RBRACE && 
           parser->current_token->type != TOKEN_EOF) {
        ASTNode* stmt_node = parse_statement(parser);
        if (!stmt_node) break;
        
        *current = stmt_node;
        current = &((*current)->next);
    }
    
    if (expect(parser, TOKEN_RBRACE) == NULL) return NULL;
    
    func_node->stmt->func_body = body_head;
    return func_node;
}

ASTNode* parse(Parser* parser) {
    ASTNode* program = NULL;
    while (parser->current_token->type != TOKEN_EOF) {
        ASTNode* node = parse_function(parser);
        if (!node) {
            fprintf(stderr, "Failed to parse at line %zu\n", parser->current_token->line);
            return NULL;
        }
        
        if (!program) {
            program = node;
        } else {
            ASTNode* current = program;
            while (current->next) current = current->next;
            current->next = node;
        }
    }
    return program;
}

void free_expression(Expression* expr) {
    if (!expr) return;
    
    switch (expr->type) {
        case EXPR_LITERAL:
            if (expr->value.str_val) free(expr->value.str_val);
            break;
        case EXPR_IDENTIFIER:
            if (expr->arg_name) free(expr->arg_name);
            break;
        // 其他表达式类型的释放
        case EXPR_BINARY:
        case EXPR_ASSIGNMENT:
        case EXPR_CALL:
            // 如果有子表达式需要递归释放
            if (expr->arg_name) free(expr->arg_name);
            break;
    }
    free(expr);
}

void free_statement(Statement* stmt) {
    if (!stmt) return;
    
    switch (stmt->type) {
        case STMT_PRINT:
            if (stmt->print_args) free_expression(stmt->print_args);
            if (stmt->color) free(stmt->color);
            break;
        case STMT_RET:
            if (stmt->ret_expr) free_expression(stmt->ret_expr);
            break;
        case STMT_IMPORT:
            // 如果有import相关资源需要释放
            break;
        case STATEMENT_FUNCTION:
            if (stmt->func_name) free(stmt->func_name);
            if (stmt->func_body) free_ast(stmt->func_body);
            break;
        case STMT_ASSIGN:
            if (stmt->assign_target) free(stmt->assign_target);
            if (stmt->assign_expr) free_expression(stmt->assign_expr);
            break;
        // 其他语句类型的释放
    }
    free(stmt);
}

void free_ast(ASTNode* ast) {
    while (ast) {
        ASTNode* next = ast->next;
        
        if (ast->stmt) {
            free_statement(ast->stmt);
        }
        
        free(ast);
        ast = next;
    }
}

// 更新现有的free_parser函数
void free_parser(Parser* parser) {
    if (parser && parser->ast) {
        free_ast(parser->ast);
        parser->ast = NULL;
    }
}