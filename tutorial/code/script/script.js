document.addEventListener('DOMContentLoaded', function() {
    // 主题切换
    const themeSwitcher = document.getElementById('theme-switcher');
    themeSwitcher.addEventListener('click', function() {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.body.removeAttribute('data-theme');
        } else {
            document.body.setAttribute('data-theme', 'dark');
        }
    });

    // 移动端菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('expanded');
    });

    // 项目数据
    let projects = [];
    let currentProject = null;
    let currentFile = null;

    // 从projects文件夹获取项目列表
    fetchProjects();

    // 复制按钮功能
    document.getElementById('copy-button').addEventListener('click', async function() {
        if (!currentFile) return;
        
        const codeDisplay = document.getElementById('code-display');
        const codeToCopy = codeDisplay.textContent || codeDisplay.innerText;
        
        try {
            await navigator.clipboard.writeText(codeToCopy);
            showToast('Copied!');
        } catch (error) {
            console.error('复制失败:', error);
            showToast('Copy failed', true);
        }
    });

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'copy-toast github-style';
        toast.textContent = message;
        
        // 添加到页面
        document.body.appendChild(toast);
        
        // 触发动画
        setTimeout(() => toast.classList.add('show'), 10);
        
        // 自动消失
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 2000);
    }

    // 下载按钮功能
    document.getElementById('download-button').addEventListener('click', function() {
        if (currentFile) {
            const code = document.getElementById('code-display').textContent;
            const blob = new Blob([code], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = currentFile.name;
            a.click();
            URL.revokeObjectURL(url);
        }
    });

    // 搜索功能
    document.getElementById('search-input').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const projectItems = document.querySelectorAll('.project-list li');
        
        projectItems.forEach(item => {
            const projectName = item.textContent.toLowerCase();
            if (projectName.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // 获取项目列表
    async function fetchProjects() {
        try {
            // 直接读取 projects/project.json
            const response = await fetch('./projects/project.json');
            if (!response.ok) {
                throw new Error('无法加载项目配置文件');
            }
            
            const config = await response.json();
            projects = Object.entries(config.projects).map(([name, project]) => ({
                name: name,
                path: `projects/${name}`,
                children: project.files || []
            }));

            renderProjectList();
        } catch (error) {
            console.error('加载项目失败:', error);
            projects = getDefaultProjects();
            renderProjectList();
        }
    }

    // 从 HTML 目录列表解析文件夹名
    function parseDirectoryListing(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const links = Array.from(doc.querySelectorAll('a[href]'))
            .map(link => link.getAttribute('href'))
            .filter(href => href !== '../' && href.endsWith('/')) // 仅保留子目录
            .map(href => href.replace(/\/$/, '')); // 移除末尾斜杠
        return links;
    }
    // 创建默认项目结构
    async function createDefaultProjectStructure(projectName) {
        try {
            // 尝试读取项目文件夹内容
            const response = await fetch(`./projects/${projectName}/`);
            if (!response.ok) {
                throw new Error('无法读取项目文件夹');
            }
            
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const links = doc.querySelectorAll('a[href]');
            
            const files = [];
            
            // 遍历项目文件夹中的文件
            for (const link of links) {
                const href = link.getAttribute('href');
                if (href === '../') continue;
                
                const fileName = href;
                if (fileName.endsWith('/')) {
                    // 这是一个文件夹
                    files.push({
                        name: fileName.replace(/\/$/, ''),
                        type: 'folder',
                        children: [] // 暂时为空，可以递归读取
                    });
                } else {
                    // 这是一个文件
                    const extension = fileName.split('.').pop().toLowerCase();
                    const language = getLanguageFromExtension(extension);
                    
                    files.push({
                        name: fileName,
                        path: `projects/${projectName}/${fileName}`,
                        language: language,
                        type: 'file'
                    });
                }
            }
            
            return {
                name: projectName,
                path: `projects/${projectName}`,
                children: files
            };
        } catch (error) {
            console.error(`Error creating default structure for ${projectName}:`, error);
            return {
                name: projectName,
                path: `projects/${projectName}`,
                children: []
            };
        }
    }

    // 根据文件扩展名获取语言
    function getLanguageFromExtension(extension) {
        switch(extension) {
            case 'js': return 'javascript';
            case 'py': return 'python';
            case 'html': return 'html';
            case 'css': return 'css';
            case 'md': return 'markdown';
            case 'json': return 'json';
            case 'java': return 'java';
            case 'c': return 'c';
            case 'cpp': return 'cpp';
            case 'php': return 'php';
            case 'go': return 'go';
            case 'rb': return 'ruby';
            case 'py': return 'python';
            case 'sh': return 'bash';
            case 'sql': return 'sql';
            case 'txt': return 'plaintext';
            case 'h': return 'c';
            case 'cfp': return 'coffeepp';
            case 'bat': return 'batchfile';
            default: return 'plaintext';
        }
    }

    // 默认项目数据（备用）
    function getDefaultProjects() {
        return [
            { 
                name: '示例项目1',
                path: 'projects/example1',
                children: [
                    {
                        name: 'src',
                        type: 'folder',
                        children: [
                            { name: 'index.html', path: 'projects/example1/src/index.html', language: 'html', type: 'file' },
                            { name: 'main.js', path: 'projects/example1/src/main.js', language: 'javascript', type: 'file' }
                        ]
                    },
                    {
                        name: 'styles',
                        type: 'folder',
                        children: [
                            { name: 'main.css', path: 'projects/example1/styles/main.css', language: 'css', type: 'file' }
                        ]
                    },
                    { name: 'README.md', path: 'projects/example1/README.md', language: 'markdown', type: 'file' }
                ]
            }
        ];
    }
    // 渲染项目列表
    function renderProjectList() {
        const projectList = document.getElementById('project-list');
        projectList.innerHTML = '';
        
        projects.forEach(project => {
            const li = document.createElement('li');
            li.textContent = project.name;
            li.addEventListener('click', () => {
                selectProject(project);
                // 移动端选择项目后自动折叠侧边栏
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('expanded');
                }
            });
            projectList.appendChild(li);
        });
    }

    // 选择项目
    function selectProject(project) {
        currentProject = project;
        document.getElementById('current-project').textContent = project.name;
        
        // 更新活跃状态
        const projectItems = document.querySelectorAll('.project-list li');
        projectItems.forEach(item => {
            item.classList.remove('active');
            if (item.textContent === project.name) {
                item.classList.add('active');
            }
        });
        
        // 重置为项目根目录
        renderFileTree(project.children || project.files, 0, '');
        
        // 计算并显示语言统计
        renderLanguageStats(project.children || project.files);
    }

    // 渲染文件树
    function renderFileTree(items, depth = 0, currentPath = '') {
        const fileTree = document.getElementById('file-tree');
        fileTree.innerHTML = '';

        // 如果不是根目录，添加返回上级按钮
        if (depth > 0) {
            const backItem = document.createElement('div');
            backItem.className = 'file-item back-item';
            backItem.innerHTML = `
                <span class="file-icon">⬆️</span>
                <span>返回上级</span>
            `;
            backItem.addEventListener('click', () => {
                // 获取上级路径
                const pathParts = currentPath.split('/');
                pathParts.pop(); // 移除最后一级
                const parentPath = pathParts.join('/');
                
                // 查找上级目录内容
                let parentItems = [];
                if (parentPath === '') {
                    // 返回到项目根目录
                    parentItems = currentProject.children;
                } else {
                    // 查找特定子目录
                    parentItems = findItemsByPath(currentProject.children, parentPath);
                }
                
                renderFileTree(parentItems, depth-1, parentPath);
            });
            fileTree.appendChild(backItem);
        }

        // 渲染当前目录项
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = `file-item ${item.type}`;
            div.style.paddingLeft = `${depth * 16 + 16}px`;
            
            const icon = item.type === 'folder' ? '📁' : getFileIcon(item.name);
            div.innerHTML = `
                <span class="file-icon">${icon}</span>
                <span>${item.name}</span>
                ${item.type === 'folder' ? '<span class="toggle-icon">▸</span>' : ''}
            `;
            
            div.addEventListener('click', (e) => {
                if (item.type === 'folder') {
                    e.stopPropagation();
                    const newPath = currentPath ? `${currentPath}/${item.name}` : item.name;
                    renderFileTree(item.children, depth+1, newPath);
                } else {
                    selectFile(item);
                }
            });
            
            fileTree.appendChild(div);
        });
    }

    // 获取文件图标
    function getFileIcon(filename) {
        const extension = filename.split('.').pop().toLowerCase();
        switch(extension) {
            case 'js': return '🟨';
            case 'py': return '🐍';
            case 'html': return '📄';
            case 'css': return '🎨';
            case 'md': return '📝';
            case 'json': return '📦';
            case 'txt': return '📄';
            case 'c': return '⚙️';
            case 'h': return '🛞';
            case 'cpp': return '⚙️';
            case 'cs': return '📌';
            case 'java': return '🍵';
            case 'php': return '🐘';
            case 'go': return '🛒';
            case 'rb': return '💎';
            case 'sh': return '🚀';
            case 'bat': return '🤖';
            case 'cfp': return '☕';
            default: return '📄';
        }
    }

    // 选择文件
    async function selectFile(file) {
        if (!file || !file.path) {
            displayCode(`// 错误：文件对象无效`, 'plaintext');
            return;
        }

        currentFile = file;
        document.getElementById('current-file').textContent = file.name;

        // 提前声明 fullPath
        let fullPath;
        
        try {
            // 标准化路径处理
            fullPath = file.path;
            
            // 确保路径以 projects/ 开头
            if (!fullPath.startsWith('projects/')) {
                fullPath = `projects/${fullPath}`;
            }
            
            // 移除可能存在的重复路径段
            fullPath = fullPath.replace(/(projects\/)+/, 'projects/');
            
            console.log('尝试加载文件:', fullPath); // 调试日志
            
            const response = await fetch(fullPath);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const content = await response.text();
            displayCode(content, file.language);
        } catch (error) {
            console.error('文件加载失败:', error);
            displayCode(
                `// 加载失败: ${error.message}\n` +
                `// 文件路径: ${file.path}\n` +
                `// 完整路径: ${fullPath || '未生成'}\n` +  // 现在可以访问 fullPath
                `// 建议检查:\n` +
                `// 1. 文件实际是否存在？\n` +
                `// 2. 服务器是否运行？\n` +
                `// 3. 路径是否包含特殊字符？`,
                'plaintext'
            );
        }
    }

    // 显示代码
    function displayCode(content, language) {
        const codeDisplay = document.getElementById('code-display');
        codeDisplay.textContent = content;
        codeDisplay.className = `hljs language-${language}`;
        
        hljs.highlightElement(codeDisplay);
        
        // 更新行号
        updateLineNumbers(content);
    }

    // 更新行号
    function updateLineNumbers(content) {
        const lineNumbers = document.getElementById('line-numbers');
        const lines = content.split('\n').length;
        let numbersHtml = '';
        
        for (let i = 1; i <= lines; i++) {
            numbersHtml += `${i}<br>`;
        }
        
        lineNumbers.innerHTML = numbersHtml;
    }

    // 根据路径查找项目
    function findItemsByPath(items, path) {
        if (!path) return items;
        
        const pathParts = path.split('/');
        let currentItems = items;
        
        for (const part of pathParts) {
            const found = currentItems.find(item => item.name === part);
            if (!found || !found.children) return [];
            currentItems = found.children;
        }
        
        return currentItems;
    }
    // 渲染语言统计
    function renderLanguageStats(items) {
        // 使用局部变量而不是全局变量
        const languageStats = { total: 0 };
        
        // 内部计数函数
        function countLanguages(children) {
            children.forEach(item => {
                if (item.type === 'folder') {
                    countLanguages(item.children);
                } else if (item.language) {
                    languageStats[item.language] = (languageStats[item.language] || 0) + 1;
                    languageStats.total++;
                }
            });
        }
        
        // 开始统计
        countLanguages(items);
        
        // 渲染结果
        const statsElement = document.getElementById('language-stats');
        
        if (languageStats.total === 0) {
            statsElement.innerHTML = '<div>无语言统计信息</div>';
            return;
        }

        let statsHtml = '';
        for (const [lang, count] of Object.entries(languageStats)) {
            if (lang === 'total') continue;
            
            const percentage = Math.round((count / languageStats.total) * 100);
            const color = getLanguageColor(lang);
            
            statsHtml += `
                <div class="language-stat">
                    <span class="language-color" style="background-color: ${color};"></span>
                    <span>${lang}: ${percentage}%</span>
                </div>
            `;
        }
        
        statsElement.innerHTML = statsHtml;
    }

    // 获取语言颜色
    function getLanguageColor(language) {
        switch(language) {
            case 'javascript': return '#f1e05a';
            case 'python': return '#3572A5';
            case 'html': return '#e34c26';
            case 'css': return '#563d7c';
            case 'java': return '#b07219';
            case 'c#': return '#178600';
            case 'c++': return '#f34b7d';
            case 'php': return '#4F5D95';
            case 'ruby': return '#701516';
            case 'go': return '#00ADD8';
            case 'swift': return '#F05138';
            case 'c': return '#555555';
            case 'h': return '#a074c4';
            case 'objective-c': return '#438eff';
            case 'perl': return '#0298c3';
            case 'sql': return '#e38c00';
            case 'coffeepp' : return '#244776';
            case 'markdown': return '#000000ff';
            case 'makefile': return '#e37933';
            case 'batchfile': return '#519aba';
            case 'sh': return '#89e051';
            case 'txt': return '#ca64ea';
            default: return '#ccc';
        }
    }
});