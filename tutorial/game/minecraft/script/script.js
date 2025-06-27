document.addEventListener('DOMContentLoaded', function() {
    // 加载Mod数据
    fetch('data/mod.json')
        .then(response => response.json())
        .then(data => {
            renderModList(data);
            setupEventListeners();
        })
        .catch(error => console.error('Error loading mod data:', error));

    // 返回按钮事件监听
    document.getElementById('back-to-list')?.addEventListener('click', function(e) {
        e.preventDefault();
        showModList();
    });
});

function renderModList(mods) {
    const modListContainer = document.getElementById('mod-list');
    
    if (!modListContainer) return;
    
    modListContainer.innerHTML = '';
    
    mods.forEach(mod => {
        const modItem = document.createElement('div');
        modItem.className = 'mod-item';
        modItem.dataset.modId = mod.id;
        
        modItem.innerHTML = `
            <img src="${mod.thumbnail}" alt="${mod.title}" class="mod-thumbnail">
            <div class="mod-info">
                <h2 class="mod-title">${mod.title}</h2>
                <div class="mod-meta">
                    <span>编辑者: ${mod.author}</span>
                    <span>更新日期: ${mod.date}</span>
                    <span>适用版本: ${mod.version}</span>
                </div>
                <p class="mod-description">${mod.shortDescription}</p>
                <div class="mod-tags">
                    ${mod.tags.map(tag => `<span class="mod-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        modListContainer.appendChild(modItem);
    });
}

function setupEventListeners() {
    const modItems = document.querySelectorAll('.mod-item');
    
    modItems.forEach(item => {
        item.addEventListener('click', function() {
            const modId = this.dataset.modId;
            showModContent(modId);
        });
    });
}

function showModContent(modId) {
    // 获取mod数据
    fetch('data/mod.json')
        .then(response => response.json())
        .then(data => {
            const mod = data.find(m => m.id === modId);
            if (!mod) return;
            
            // 隐藏列表，显示内容
            const modList = document.getElementById('mod-list');
            const modContent = document.getElementById('mod-content');
            const backButton = document.querySelector('.navbar-back');
            
            modList.classList.add('slide-out');
            
            setTimeout(() => {
                modList.style.display = 'none';
                renderModContent(mod);
                modContent.style.display = 'flex';
                modContent.classList.add('slide-in');
                backButton.style.display = 'block';
            }, 500);
        })
        .catch(error => console.error('Error loading mod data:', error));
}

function renderModContent(mod) {
    // 渲染大纲
    const outlineContainer = document.getElementById('content-outline');
    outlineContainer.innerHTML = `
        <h3>大纲</h3>
        <ul class="outline-list">
            ${generateOutline(mod.content)}
        </ul>
    `;
    
    // 渲染主要内容
    const mainContainer = document.getElementById('content-main');
    mainContainer.innerHTML = `
        <h1>${mod.title}</h1>
        <div class="mod-meta">
            <span>编辑者: ${mod.author}</span>
            <span>更新日期: ${mod.date}</span>
            <span>适用版本: ${mod.version}</span>
        </div>
        ${renderContent(mod.content)}
    `;
    
    // 添加大纲点击事件
    document.querySelectorAll('.outline-item a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function generateOutline(content) {
    let outlineHtml = '';
    
    content.forEach(item => {
        if (item.type === 'heading') {
            const level = item.level || 2;
            const id = item.text.toLowerCase().replace(/\s+/g, '-');
            
            outlineHtml += `
                <li class="outline-item level-${level}">
                    <a href="#${id}">${item.text}</a>
                </li>
            `;
        }
    });
    
    return outlineHtml;
}

function renderContent(content) {
    let html = '';
    
    content.forEach(item => {
        switch (item.type) {
            /*mod.json文件里的type可以为"
                heading(标题)、
                paragraph(文本)
                image(图片)
                code(代码)
                list(列表)
                table(表格)
                blockquote(引用块)
            "
            具体查看与mod.json文件同目录里的mod.json.md文件*/
            case 'paragraph':
                html += `<p>${item.text}</p>`;
                break;
                
            case 'heading':
                const level = item.level || 2;
                const id = item.text.toLowerCase().replace(/\s+/g, '-');
                html += `<h${level} id="${id}">${item.text}</h${level}>`;
                break;
                
            case 'image':
                html += `<img src="${item.src}" alt="${item.alt || ''}" />`;
                if (item.caption) {
                    html += `<p class="image-caption">${item.caption}</p>`;
                }
                break;
                
            case 'code':
                html += `<pre><code>${item.code}</code></pre>`;
                break;
                
            case 'list':
                const listTag = item.ordered ? 'ol' : 'ul';
                let listItems = item.items.map(li => `<li>${li}</li>`).join('');
                html += `<${listTag}>${listItems}</${listTag}>`;
                break;
                
            case 'table':
                let tableHeaders = item.headers.map(h => `<th>${h}</th>`).join('');
                let tableRows = item.rows.map(row => {
                    let cells = row.map(cell => `<td>${cell}</td>`).join('');
                    return `<tr>${cells}</tr>`;
                }).join('');
                
                html += `
                    <table>
                        <thead><tr>${tableHeaders}</tr></thead>
                        <tbody>${tableRows}</tbody>
                    </table>
                `;
                break;
                
            case 'blockquote':
                html += `<blockquote>${item.text}</blockquote>`;
                break;
        }
    });
    
    return html;
}

function showModList() {
    const modList = document.getElementById('mod-list');
    const modContent = document.getElementById('mod-content');
    const backButton = document.querySelector('.navbar-back');
    
    modContent.classList.remove('slide-in');
    modContent.classList.add('slide-out');
    
    setTimeout(() => {
        modContent.style.display = 'none';
        modList.style.display = 'block';
        modList.classList.remove('slide-out');
        modList.classList.add('slide-in');
        backButton.style.display = 'none';
    }, 500);
}