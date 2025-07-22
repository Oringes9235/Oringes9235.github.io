#include "utils.h"
#include <stdio.h>
#include <stdlib.h>

char* read_file(const char* filename) {
    FILE* file = fopen(filename, "rb");
    if (!file) return NULL;
    
    fseek(file, 0, SEEK_END);
    long length = ftell(file);
    fseek(file, 0, SEEK_SET);
    
    char* buffer = malloc(length + 1);
    if (!buffer) {
        fclose(file);
        return NULL;
    }
    
    fread(buffer, 1, length, file);
    buffer[length] = '\0';
    
    fclose(file);
    return buffer;
}