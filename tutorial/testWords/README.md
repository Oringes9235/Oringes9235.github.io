# 单词记忆检测网页

这是一个用于检测单词记忆的网页应用，支持多级词汇测试和成绩统计。

## 文件结构说明

```
word-memory-test/
├── index.html                 # 主HTML文件
├── css/
│   ├── style.css              # 主要样式
│   └── animations.css         # 动画样式
├── js/
│   ├── app.js                 # 主应用逻辑
│   ├── types.ts               # TypeScript类型定义
│   └── utils.js               # 工具函数
├── json/
│   ├── levellist.json         # 等级列表数据
│   └── words/                 # 单词数据
│       ├── level1.json        # 初级词汇
│       └── level2.json        # 中级词汇
├── assets/
│   ├── sounds/                # 音效文件
│   │   └── success.mp3        # 成功音效
│   └── icons/                 # 图标文件
│       ├── arrow-right.svg    # 右箭头图标
│       ├── arrow-left.svg     # 左箭头图标
│       └── github.svg         # GitHub图标
└── README.md                  # 项目说明文件
```

## JSON数据格式说明

### 1. levellist.json

该文件包含所有词汇等级的信息，格式如下：

```json
[
    {
        "id": "唯一标识符",
        "title": "等级标题",
        "tags": ["标签1", "标签2"],
        "wordCount": 测试单词数量,
        "wordsFile": "对应的单词文件名"
    }
]
```
2. 单词文件 (如level1.json)
每个单词文件包含该等级的所有单词，格式如下：

```json
[
    {
        "id": "唯一标识符",
        "english": "英文单词",
        "chinese": ["中文释义1", "中文释义2"],
        "partsOfSpeech": ["词性1", "词性2"]
    }
]
```
### 注意事项：

1. chinese和partsOfSpeech数组的长度必须相同

2. 每个中文释义对应一个词性

3. 词性使用缩写形式，如"n."表示名词，"v."表示动词，"adj."表示形容词

## 使用说明
1. 首页显示所有词汇等级卡片

2. 点击卡片开始对应等级的测试

3. 测试时根据显示的问题输入答案

4. 点击"检查"按钮验证答案

5. 测试完成后显示结果统计

6. 可以选择"再来一次"或"返回首页"

### 自定义配置
1. 添加新等级：

- 在levellist.json中添加新条目

- 在json/words/目录下创建对应的单词文件

2. 修改样式：

- 编辑css/style.css文件

- 修改根变量可以更改主题颜色

3. 添加音效：

- 将音效文件放入assets/sounds/目录

- 在app.js中修改相关代码


## 使用说明

1. 将上述所有文件按照文件结构放置到相应目录中
2. 打开`index.html`即可使用
3. 要添加新的词汇等级，只需在`levellist.json`中添加新条目，并创建对应的单词文件
4. 要修改样式，可以编辑CSS文件中的变量和样式规则

> 这个应用完全基于前端技术实现，不需要后端支持，可以在任何现代浏览器中运行。它响应式设计，适配PC和移动设备。