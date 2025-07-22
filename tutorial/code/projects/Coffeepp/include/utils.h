#ifndef COFFEEPP_UTILS_H
#define COFFEEPP_UTILS_H

/**
 * @brief 读取文件内容到字符串
 * @param filename 文件名
 * @return 文件内容字符串指针，需要调用者释放
 */
char* read_file(const char* filename);

/**
 * @brief 打印错误信息（带颜色）
 * @param message 错误信息
 */
void print_error(const char* message);

/**
 * @brief 检查文件扩展名是否合法
 * @param filename 文件名
 * @param extension 期望的扩展名（如".cfp"）
 * @return 1表示合法，0不合法
 */
int check_extension(const char* filename, const char* extension);

#endif // COFFEEPP_UTILS_H