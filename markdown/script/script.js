document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');
    const openFileBtn = document.getElementById('open-file');
    const saveFileBtn = document.getElementById('save-file');
    const exportPdfBtn = document.getElementById('export-pdf');
    const homeBtn = document.getElementById('home-btn');
    const fileInput = document.getElementById('file-input');
    const filenameDisplay = document.getElementById('filename');
    const lineNumbers = document.getElementById('line-numbers');
    const editModeBtn = document.getElementById('edit-mode');
    const previewModeBtn = document.getElementById('preview-mode');
    const splitModeBtn = document.getElementById('split-mode');
    const editorContainer = document.querySelector('.editor-container');
    
    let currentFileHandle = null;
    let currentMode = 'split'; // 'split', 'edit', 'preview'
    
    // 配置marked和语法高亮
    marked.setOptions({
        breaks: true,
        gfm: true,
        highlight: function(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        }
    });
    
    // 初始化编辑器内容
    const defaultContent = `# 欢迎使用Markdown编辑器

这是一个功能完善的Markdown编辑器，支持以下特性：

## 功能特性

- 实时预览Markdown
- 支持代码高亮（VS Code风格）
- 本地文件打开/保存
- PDF导出功能
- 数学公式支持（KaTeX）
- 三种视图模式
- GitHub风格样式

## 代码示例

\`\`\`javascript
function hello() {
    console.log('Hello, Markdown!');
    return Math.sqrt(4); // 返回2
}
\`\`\`

## 数学公式支持

行内公式：$E = mc^2$

块级公式：
$$
\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
$$

## 表格支持

| 功能       | 是否支持 |
|------------|----------|
| 标题       | ✓        |
| 列表       | ✓        |
| 代码块     | ✓        |
| 表格       | ✓        |
| PDF导出    | ✓        |
| 数学公式   | ✓        |

> 提示：使用工具栏按钮可以切换视图模式和操作文件
`;
    
    editor.value = defaultContent;
    updateLineNumbers();
    updatePreview();
    
    // 事件监听
    editor.addEventListener('input', function() {
        updateLineNumbers();
        updatePreview();
    });
    
    editor.addEventListener('scroll', function() {
        lineNumbers.scrollTop = editor.scrollTop;
    });
    
    openFileBtn.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', handleFileOpen);
    
    saveFileBtn.addEventListener('click', handleFileSave);
    
    exportPdfBtn.addEventListener('click', exportToPdf);
    
    homeBtn.addEventListener('click', () => {
        if (confirm('确定要返回主页吗？未保存的内容将会丢失。')) {
            // 实际应用中这里可以跳转到主页
            window.location.href = '/';
        }
    });
    
    editModeBtn.addEventListener('click', () => setEditorMode('edit'));
    previewModeBtn.addEventListener('click', () => setEditorMode('preview'));
    splitModeBtn.addEventListener('click', () => setEditorMode('split'));
    
    // 添加键盘快捷键
    document.addEventListener('keydown', (e) => {
        // Ctrl+S 保存
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            handleFileSave();
        }
        // Ctrl+O 打开
        if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
            e.preventDefault();
            fileInput.click();
        }
        // Ctrl+P 导出PDF
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            exportToPdf();
        }
    });
    
    // 更新行号
    function updateLineNumbers() {
        const lines = editor.value.split('\n');
        let lineNumbersHTML = '';
        
        for (let i = 0; i < lines.length; i++) {
            lineNumbersHTML += `${i + 1}<br>`;
        }
        
        lineNumbers.innerHTML = lineNumbersHTML;
    }
    
    // 更新预览
    function updatePreview() {
        preview.innerHTML = marked.parse(editor.value);
        
        // 渲染数学公式
        renderMathInElement(preview, {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false},
                {left: '\\(', right: '\\)', display: false},
                {left: '\\[', right: '\\]', display: true}
            ],
            throwOnError: false
        });
    }
    
    // 处理文件打开
    async function handleFileOpen(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            editor.value = e.target.result;
            updateLineNumbers();
            updatePreview();
            filenameDisplay.textContent = file.name;
        };
        reader.readAsText(file);
        
        // 重置文件输入，以便可以再次选择同一个文件
        event.target.value = '';
    }
    
    // 处理文件保存
    async function handleFileSave() {
        const content = editor.value;
        const filename = filenameDisplay.textContent;
        
        try {
            // 如果支持File System Access API
            if ('showSaveFilePicker' in window) {
                const options = {
                    suggestedName: filename,
                    types: [
                        {
                            description: 'Markdown Files',
                            accept: {
                                'text/markdown': ['.md', '.markdown']
                            }
                        }
                    ]
                };
                
                if (!currentFileHandle) {
                    currentFileHandle = await window.showSaveFilePicker(options);
                }
                
                const writable = await currentFileHandle.createWritable();
                await writable.write(content);
                await writable.close();
                
                filenameDisplay.textContent = currentFileHandle.name;
            } else {
                // 回退方案
                const blob = new Blob([content], { type: 'text/markdown' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
        } catch (err) {
            console.error('保存文件失败:', err);
            // 用户可能取消了保存操作
        }
    }
    
    // 导出PDF
    function exportToPdf() {
        // 临时切换到预览模式
        const originalMode = currentMode;
        setEditorMode('preview');
        
        // 使用浏览器打印功能生成PDF
        setTimeout(() => {
            window.print();
            
            // 恢复原始模式
            setTimeout(() => {
                setEditorMode(originalMode);
            }, 500);
        }, 500);
    }
    
    // 设置编辑器模式
    function setEditorMode(mode) {
        currentMode = mode;
        
        // 更新UI状态
        editModeBtn.classList.remove('active');
        previewModeBtn.classList.remove('active');
        splitModeBtn.classList.remove('active');
        
        editorContainer.classList.remove('editor-only', 'preview-only', 'split-mode');
        
        switch (mode) {
            case 'edit':
                editorContainer.classList.add('editor-only');
                editModeBtn.classList.add('active');
                break;
            case 'preview':
                editorContainer.classList.add('preview-only');
                previewModeBtn.classList.add('active');
                break;
            case 'split':
                editorContainer.classList.add('split-mode');
                splitModeBtn.classList.add('active');
                break;
        }
    }
    
    // 初始化设置为分屏模式
    setEditorMode('split');
});