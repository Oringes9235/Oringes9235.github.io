// Markdown 解析器
class MarkdownParser {
    constructor() {
        // 标题正则
        this.headingRegex = /^(#{1,6})\s(.*)/;
        // 其他Markdown元素正则...
    }

    /**
     * 解析Markdown为HTML
     * @param {string} markdown - Markdown文本
     * @returns {string} 解析后的HTML
     */
    parse(markdown) {
        if (!markdown) return '';

        let lines = markdown.split('\n');
        let html = '';
        let inCodeBlock = false;

        for (let line of lines) {
            // 处理代码块
            if (line.startsWith('```')) {
                if (!inCodeBlock) {
                    const language = line.substring(3).trim() || '';
                    html += `<pre><code class="language-${language}">`;
                    inCodeBlock = true;
                } else {
                    html += '</code></pre>\n';
                    inCodeBlock = false;
                }
                continue;
            }

            if (inCodeBlock) {
                html += line + '\n';
                continue;
            }

            // 处理标题
            let headingMatch = line.match(this.headingRegex);
            if (headingMatch) {
                const level = headingMatch[1].length;
                const text = headingMatch[2].trim();
                const id = text.toLowerCase().replace(/[^\w]+/g, '-');
                html += `<h${level} id="${id}">${text}</h${level}>\n`;
                continue;
            }

            // 处理段落和其他元素...
            if (line.trim()) {
                html += `<p>${this.parseInline(line)}</p>\n`;
            }
        }

        return html;
    }

    /**
     * 解析行内Markdown元素
     * @param {string} text - 行内文本
     * @returns {string} 解析后的HTML
     */
    parseInline(text) {
        // 处理粗体、斜体、链接等...
        return text;
    }

    /**
     * 从Markdown生成大纲
     * @param {string} markdown - Markdown文本
     * @returns {Array} 大纲数组
     */
    generateOutline(markdown) {
        if (!markdown) return [];

        const lines = markdown.split('\n');
        const outline = [];

        for (const line of lines) {
            const headingMatch = line.match(this.headingRegex);
            if (headingMatch) {
                const level = headingMatch[1].length;
                const text = headingMatch[2].trim();
                const id = text.toLowerCase().replace(/[^\w]+/g, '-');
                outline.push({ level, text, id });
            }
        }

        return outline;
    }
}

// 页面初始化
document.addEventListener('DOMContentLoaded', function () {
    // 初始化布局
    initLayout();

    new ContentLoader().loadContent();

    // 初始化大纲
    initToc();

    const terminal = document.getElementById('typing-text');
    const messages = [
        "Welcome to Oringes' Dev Blog!",
        "This is a place where I share my coding journey.",
        "You'll find tutorials, projects and thoughts here.",
        "Feel free to explore and connect with me!",
        "Thanks for visiting! :)"
    ];
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isTyping = true;

    function type() {
        const currentMessage = messages[messageIndex];

        if (isTyping) {
            if (charIndex < currentMessage.length) {
                terminal.textContent = currentMessage.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(type, 100);
            } else {
                isTyping = false;
                setTimeout(() => {
                    isDeleting = true;
                    type();
                }, 2000);
            }
        } else if (isDeleting) {
            if (charIndex > 0) {
                terminal.textContent = currentMessage.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(type, 50);
            } else {
                isDeleting = false;
                messageIndex = (messageIndex + 1) % messages.length;
                setTimeout(() => {
                    isTyping = true;
                    type();
                }, 500);
            }
        }
    }

    // 启动打字效果
    setTimeout(type, 1000);
});


// 初始化页面布局
function initLayout() {
    const container = document.createElement('div');
    container.className = 'markdown-container';

    // 左侧信息栏
    const authorInfo = document.createElement('div');
    authorInfo.className = 'author-info';
    authorInfo.innerHTML = `
        <img src="./assets/images/avatar.png" alt="Avatar" class="avatar">
        <div class="author-name">Oringes</div>
        <div class="stats">
            <div class="stat-item">
                <div class="stat-number">11</div>
                <div class="stat-label">文章</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">8</div>
                <div class="stat-label">标签</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">3</div>
                <div class="stat-label">分类</div>
            </div>
        </div>
        <a href="https://github.com/Oringes9235" class="github-btn" target="_blank"><i class="fab fa-github"></i>&ensp;Follow Me</a>
        <div class="social-links">
            <a href="https://github.com/Oringes9235" class="social-link" target="_blank"><i class="fab fa-github" style="color: #e0e0e0;"></i></a>
            <a href="mailto:xfp20080128xfp@163.com" class="social-link" target="_blank"><i class="fas fa-envelope" style="color: #4a7dbe;"></i></a>
            <a href="https://space.bilibili.com/505450066" class="social-link" target="_blank"><i class="fab fa-bilibili" style="color: #FF679A;"></i></a>
        </div>
    `;
    // 中间内容区
    const contentArea = document.createElement('div');
    contentArea.className = 'markdown-content';
    contentArea.innerHTML = '<div class="markdown-body" id="markdown-body"></div>';

    // 右侧大纲
    const toc = document.createElement('div');
    toc.className = 'toc';
    toc.innerHTML = `
        <div class="toc-title">Table</div>
        <ul class="toc-list" id="toc-list"></ul>
    `;

    container.appendChild(authorInfo);
    container.appendChild(contentArea);
    container.appendChild(toc);

    // 替换原有内容
    const main = document.querySelector('main');
    if (main) {
        main.innerHTML = '';
        main.appendChild(container);
    } else {
        document.body.appendChild(container);
    }
}

// 加载并渲染加载HTML内容
class ContentLoader {
    constructor() {
        // 内容容器
        this.contentContainer = document.getElementById('markdown-body');
    }

    loadContent() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const contentFile = currentPath.replace('.html', '.html'); // 现在使用HTML文件

        fetch(`./content/${contentFile}`)
            .then(response => {
                if (!response.ok) throw new Error('内容加载失败');
                return response.text();
            })
            .then(html => {
                this.contentContainer.innerHTML = html;
                this.generateOutline();
            })
            .catch(error => {
                console.error('加载内容失败:', error);
                this.contentContainer.innerHTML = `
                    <div class="error">
                        <h2>加载内容失败</h2>
                        <p>${error.message}</p>
                    </div>
                `;
            });
    }

    generateOutline() {
        const tocList = document.getElementById('toc-list');
        if (!tocList) return;

        const headings = this.contentContainer.querySelectorAll('h1, h2, h3');
        let html = '';

        headings.forEach(heading => {
            if (!heading.id) {
                heading.id = heading.textContent.toLowerCase().replace(/[^\w]+/g, '-');
            }

            if (heading.tagName === 'H1') {
                html += `<li class="toc-item"><a href="#${heading.id}" class="toc-link">${heading.textContent}</a></li>`;
            }
        });

        tocList.innerHTML = html;
    }
}

// 初始化大纲
function initToc() {
    const tocList = document.getElementById('toc-list');
    if (!tocList) return;

    // 监听滚动，高亮当前章节
    window.addEventListener('scroll', function () {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let currentId = '';

        headings.forEach(heading => {
            const rect = heading.getBoundingClientRect();
            if (rect.top <= 100) {
                currentId = heading.id;
            }
        });

        const links = tocList.querySelectorAll('a');
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    });
}

// 渲染大纲
function renderToc(outline) {
    const tocList = document.getElementById('toc-list');
    if (!tocList) return;

    let html = '';
    let currentLevel = 1;

    // 只显示一级标题
    const mainHeadings = outline.filter(item => item.level === 1);

    mainHeadings.forEach(item => {
        html += `<li class="toc-item"><a href="#${item.id}" class="toc-link">${item.text}</a></li>`;
    });

    tocList.innerHTML = html;

    // 点击大纲链接平滑滚动
    tocList.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const id = e.target.getAttribute('href').substring(1);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                history.pushState(null, '', `#${id}`);
            }
        }
    });
}
// 简单版粒子效果（添加到markdown.js末尾）
function initParticles() {
    const container = document.createElement('div');
    container.id = 'particles-js';
    document.body.appendChild(container);

    document.addEventListener('click', (e) => {
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            Object.assign(particle.style, {
                position: 'absolute',
                left: `${e.clientX}px`,
                top: `${e.clientY}px`,
                width: `${Math.random() * 15 + 5}px`,
                height: `${Math.random() * 15 + 5}px`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                borderRadius: '50%',
                pointerEvents: 'none'
            });

            container.appendChild(particle);

            particle.animate([
                { transform: 'translate(0,0) scale(1)', opacity: 1 },
                { transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).onfinish = () => particle.remove();
        }
    });
}

// 直接初始化（不依赖类）
document.addEventListener('DOMContentLoaded', initParticles);

