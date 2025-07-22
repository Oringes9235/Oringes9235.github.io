# 文件树

```txt
code/
├── index.html
├── style
│   └── style.css
├── script.js
│   └── script.js
├── projects/
│   ├── project1/
│   │   ├── main.js
│   │   ├── style.css
│   │   └── index.html
│   ├── project2/
│   │   ├── app.py
│   │   └── utils.py
│   └── project3/
│       ├── index.html
│       ├── script.js
│       └── style.css
└── README.md
```


# Projects
### 使用说明：
1. 项目结构：

- 每个项目应该放在 projects 文件夹下的单独子文件夹中

- 每个项目可以包含一个 project.json 文件来描述项目结构（可选）！Important

2. project.json 示例：
```json
{
    "files": [
        {
            "name": "src",
            "type": "folder",
            "children": [
                {
                    "name": "index.html",
                    "path": "projects/myproject/src/index.html",
                    "language": "html",
                    "type": "file"
                }
            ]
        },
        {
            "name": "README.md",
            "path": "projects/myproject/README.md",
            "language": "markdown",
            "type": "file"
        }
    ]
}
```
