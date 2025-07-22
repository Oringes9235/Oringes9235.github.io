#include "lexer.h"
#include "common.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define _GNU_SOURCE

#ifndef HAVE_STRNDUP
char* strndup(const char* s, size_t n) {
    char* p = malloc(n + 1);
    if (p) {
        memcpy(p, s, n);
        p[n] = '\0';
    }
    return p;
}
#endif

void init_lexer(Lexer* lexer, const char* source) {
    lexer->source = source;
    lexer->source_len = strlen(source);
    lexer->position = 0;
    lexer->line = 1;
    lexer->column = 1;
    lexer->tokens = NULL;
    lexer->token_count = 0;
    lexer->token_capacity = 0;
}

void free_lexer(Lexer* lexer) {
    for (size_t i = 0; i < lexer->token_count; i++) {
        if (lexer->tokens[i].value) {
            free(lexer->tokens[i].value);
        }
    }
    free(lexer->tokens);
}

static void add_token(Lexer* lexer, TokenType type, const char* value) {
    if (lexer->token_count >= lexer->token_capacity) {
        lexer->token_capacity = lexer->token_capacity == 0 ? 8 : lexer->token_capacity * 2;
        lexer->tokens = realloc(lexer->tokens, lexer->token_capacity * sizeof(Token));
    }

    Token token;
    token.type = type;
    token.value = value ? strdup(value) : NULL;
    token.line = lexer->line;
    token.column = lexer->column;

    lexer->tokens[lexer->token_count++] = token;
}

static int is_valid_var_char(char c, int first_char) {
    if (first_char) {
        return isalpha(c) || c == '_';
    }
    return isalnum(c) || c == '_' || c == '-' || c == '*';
}

Token* lex(Lexer* lexer) {
    while (lexer->position < lexer->source_len) {
        char c = lexer->source[lexer->position];
        
        // 跳过空白字符
        if (isspace(c)) {
            if (c == '\n') {
                lexer->line++;
                lexer->column = 1;
            } else {
                lexer->column++;
            }
            lexer->position++;
            continue;
        }
        
        // 处理注释
        if (c == '#') {
            if (lexer->position + 1 < lexer->source_len && 
                lexer->source[lexer->position + 1] == '*') {
                // 多行注释
                lexer->position += 2;
                lexer->column += 2;
                while (lexer->position < lexer->source_len) {
                    if (lexer->source[lexer->position] == '*' &&
                        lexer->position + 1 < lexer->source_len &&
                        lexer->source[lexer->position + 1] == '#') {
                        lexer->position += 2;
                        lexer->column += 2;
                        break;
                    }
                    if (lexer->source[lexer->position] == '\n') {
                        lexer->line++;
                        lexer->column = 1;
                    } else {
                        lexer->column++;
                    }
                    lexer->position++;
                }
                continue;
            } else {
                // 单行注释
                while (lexer->position < lexer->source_len && 
                       lexer->source[lexer->position] != '\n') {
                    lexer->position++;
                    lexer->column++;
                }
                continue;
            }
        }
        
        // 处理分号
        if (c == ';') {
            add_token(lexer, TOKEN_SEMICOLON, NULL);
            lexer->position++;
            lexer->column++;
            continue;
        }
        
        // 处理字符串
        if (c == '"') {
            size_t start = lexer->position + 1;
            size_t len = 0;
            lexer->position++;
            lexer->column++;
            
            while (lexer->position < lexer->source_len && 
                   lexer->source[lexer->position] != '"') {
                if (lexer->source[lexer->position] == '\\' && 
                    lexer->position + 1 < lexer->source_len) {
                    lexer->position++;
                    lexer->column++;
                    len++;
                }
                lexer->position++;
                lexer->column++;
                len++;
            }
            
            if (lexer->position >= lexer->source_len) {
                fprintf(stderr, "Unterminated string at line %zu, column %zu\n", 
                        lexer->line, lexer->column);
                return NULL;
            }
            
            char* str = malloc(len + 1);
            strncpy(str, lexer->source + start, len);
            str[len] = '\0';
            add_token(lexer, TOKEN_STRING, str);
            free(str);
            
            lexer->position++;
            lexer->column++;
            continue;
        }
        
        // 处理数字
        if (isdigit(c)) {
            size_t start = lexer->position;
            int is_float = 0;
            
            while (lexer->position < lexer->source_len && 
                   (isdigit(lexer->source[lexer->position]) || 
                   lexer->source[lexer->position] == '.')) {
                if (lexer->source[lexer->position] == '.') {
                    if (is_float) break;
                    is_float = 1;
                }
                lexer->position++;
                lexer->column++;
            }
            
            char* num_str = strndup(lexer->source + start, lexer->position - start);
            add_token(lexer, is_float ? TOKEN_FLOAT : TOKEN_INT, num_str);
            free(num_str);
            continue;
        }
        
        // 处理标识符和关键字
        if (is_valid_var_char(c, 1)) {
            size_t start = lexer->position;
            while (lexer->position < lexer->source_len && 
                   is_valid_var_char(lexer->source[lexer->position], 0)) {
                lexer->position++;
                lexer->column++;
            }
            
            char* ident = strndup(lexer->source + start, lexer->position - start);
            
            // 检查关键字
            TokenType type = TOKEN_IDENTIFIER;
            if (strcmp(ident, "@import") == 0) type = TOKEN_IMPORT;
            else if (strcmp(ident, "print") == 0) type = TOKEN_PRINT;
            else if (strcmp(ident, "ret") == 0) type = TOKEN_RET;
            else if (strcmp(ident, "end") == 0) type = TOKEN_END;
            else if (strcmp(ident, "ero") == 0) type = TOKEN_ERO;
            else if (strcmp(ident, "red") == 0) type = TOKEN_COLOR;
            
            add_token(lexer, type, ident);
            free(ident);
            continue;
        }
        
        // 处理箭头操作符
        /*
        if (c == '=' && lexer->position + 1 < lexer->source_len && 
            lexer->source[lexer->position + 1] == '>') {
            add_token(lexer, TOKEN_ARROW, NULL);
            lexer->position += 2;
            lexer->column += 2;
            continue;
        }*/
        if (c == '=') {
            if (lexer->position + 1 < lexer->source_len && 
                lexer->source[lexer->position + 1] == '>') {
                add_token(lexer, TOKEN_ARROW, NULL);
                lexer->position += 2;
                lexer->column += 2;
            } else {
                add_token(lexer, TOKEN_EQUAL, NULL);
                lexer->position++;
                lexer->column++;
            }
            continue;
        }
        // 对转义字符的处理
        if (c == '\\') {
            lexer->position++;
            lexer->column++;
            switch (lexer->source[lexer->position]) {
                case 'n': add_token(lexer, TOKEN_ESCAPE, "\\n"); break;
                // 处理其他转义字符
            }
            continue;
        }
        // 处理其他单字符token
        switch (c) {
            case '(': add_token(lexer, TOKEN_LPAREN, NULL); break;
            case ')': add_token(lexer, TOKEN_RPAREN, NULL); break;
            case '{': add_token(lexer, TOKEN_LBRACE, NULL); break;
            case '}': add_token(lexer, TOKEN_RBRACE, NULL); break;
            case ',': add_token(lexer, TOKEN_COMMA, NULL); break;
            case '.': add_token(lexer, TOKEN_DOT, NULL); break;
            case '+': add_token(lexer, TOKEN_PLUS, NULL); break;
            case '-': add_token(lexer, TOKEN_MINUS, NULL); break;
            case '*': add_token(lexer, TOKEN_STAR, NULL); break;
            case '/': add_token(lexer, TOKEN_SLASH, NULL); break;
            default:
                fprintf(stderr, "Unexpected character '%c' at line %zu, column %zu\n", 
                        c, lexer->line, lexer->column);
                return NULL;
        }
        
        lexer->position++;
        lexer->column++;
    }
    
    add_token(lexer, TOKEN_EOF, NULL);
    return lexer->tokens;
}