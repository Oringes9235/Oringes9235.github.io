# `mod.json` 文件中的 `type` 类型详解

在您的 Minecraft Mod 介绍页面中，`mod.json` 文件使用 `type` 字段来定义不同类型的内容块。以下是每种类型的详细说明和使用示例：

## 1. `heading` - 标题

**用途**：用于创建各级标题

**属性**：
- `text`: 标题文本
- `level`: 标题级别 (1-6，默认为2)

```json
{
    "type": "heading",
    "text": "安装指南",
    "level": 2
}
```

## 2. `paragraph` - 普通文本段落

**用途**：用于显示普通文本内容

**属性**：
- `text`: 段落文本

```json
{
    "type": "paragraph",
    "text": "JEI 是一个物品和配方查看器，可以帮助玩家在游戏中查看所有物品及其合成配方。"
}
```

## 3. `image` - 图片

**用途**：插入图片

**属性**：
- `src`: 图片URL
- `alt`: 替代文本 (可选)
- `caption`: 图片说明 (可选)

```json
{
    "type": "image",
    "src": "https://i.imgur.com/7ZJZJZJ.png",
    "alt": "JEI界面截图",
    "caption": "JEI的物品查看界面"
}
```

## 4. `code` - 代码块

**用途**：显示代码片段

**属性**：
- `code`: 代码内容

```json
{
    "type": "code",
    "code": "/give @p minecraft:diamond 64"
}
```

## 5. `list` - 列表

**用途**：创建有序或无序列表

**属性**：
- `ordered`: 是否为有序列表 (true/false)
- `items`: 列表项数组

```json
{
    "type": "list",
    "ordered": false,
    "items": [
        "查看所有游戏内物品和方块",
        "查看物品的合成配方",
        "查看物品的用途"
    ]
}
```

## 6. `table` - 表格

**用途**：创建数据表格

**属性**：
- `headers`: 表头数组
- `rows`: 表格行数据数组

```json
{
    "type": "table",
    "headers": ["选项", "描述", "默认值"],
    "rows": [
        ["物品列表位置", "控制JEI物品列表在屏幕上的位置", "右侧"],
        ["搜索栏位置", "控制搜索栏在物品列表中的位置", "顶部"]
    ]
}
```

## 7. `blockquote` - 引用块

**用途**：突出显示引用内容

**属性**：
- `text`: 引用文本

```json
{
    "type": "blockquote",
    "text": "JEI 是 Minecraft 中最流行的物品和配方查看器之一。"
}
```

## 完整内容块示例

```json
"content": [
    {
        "type": "heading",
        "text": "主要功能",
        "level": 2
    },
    {
        "type": "paragraph",
        "text": "以下是本Mod的主要功能特点："
    },
    {
        "type": "list",
        "ordered": false,
        "items": [
            "高性能优化",
            "兼容多种Mod",
            "自定义配置选项"
        ]
    },
    {
        "type": "image",
        "src": "https://example.com/mod-screenshot.jpg",
        "alt": "Mod界面截图"
    },
    {
        "type": "heading",
        "text": "安装方法",
        "level": 3
    },
    {
        "type": "code",
        "code": "java -jar install_mod.jar"
    }
]
```

## 注意事项

1. 所有内容块都必须在 `content` 数组中按顺序排列
2. 每种类型都有其必需的属性，缺少可能导致渲染错误
3. 标题级别 (`level`) 建议从2开始 (h2)，因为页面通常已有一个h1标题
4. 图片URL建议使用HTTPS协议以确保安全
5. 表格数据应确保每行的列数与表头数量一致

这些内容类型可以灵活组合，创建出丰富多样的Mod介绍页面。