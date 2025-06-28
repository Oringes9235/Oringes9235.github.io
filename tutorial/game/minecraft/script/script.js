document.addEventListener('DOMContentLoaded', function() {
    // 加载Mod数据
    fetch('data/mod.json')
        .then(response => response.json())
        .then(data => {
            // 初始化时渲染完整列表
            renderModList(data);
            // 设置mod点击事件
            setupEventListeners();
            // 设置搜索功能
            setupSearch(data);
        })
        .catch(error => console.error('Error loading mod data:', error));

    // 返回按钮事件监听
    document.getElementById('back-to-list')?.addEventListener('click', function(e) {
        e.preventDefault();
        showModList();
    });
});

// 设置搜索功能
function setupSearch(modData) {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (!searchTerm) {
            // 如果搜索框为空，显示全部mod
            renderModList(modData);
            return;
        }
        
        // 过滤mod数据
        const filteredMods = modData.filter(mod => {
            // 检查所有可搜索字段
            return (
                (mod.id && mod.id.toLowerCase().includes(searchTerm)) ||
                (mod.title && mod.title.toLowerCase().includes(searchTerm)) ||
                (mod.author && mod.author.toLowerCase().includes(searchTerm)) ||
                (mod.version && mod.version.toLowerCase().includes(searchTerm)) ||
                (mod.shortDescription && mod.shortDescription.toLowerCase().includes(searchTerm)) ||
                (mod.tags && mod.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
            );
        });
        
        // 渲染过滤后的列表
        renderModList(filteredMods);
        // 重新设置事件监听器，因为DOM元素被重新创建了
        setupEventListeners();
    }
    
    // 确保元素存在再添加事件监听
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// 渲染mod列表
function renderModList(mods) {
    const modListContainer = document.getElementById('mod-list');
    
    if (!modListContainer) return;
    
    modListContainer.innerHTML = '';
    
    // 如果没有mod数据，显示提示
    if (!mods || mods.length === 0) {
        modListContainer.innerHTML = '<div class="no-results" style="text-align: center;color: #303030;opacity: 0.5;margin-top: 70px;margin-bottom: 70px;">Sorry，没有找到匹配的Mod</div>';
        return;
    }
    
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
                    ${mod.tags ? mod.tags.map(tag => `<span class="mod-tag">${tag}</span>`).join('') : ''}
                </div>
            </div>
        `;
        
        modListContainer.appendChild(modItem);
    });
}

// 设置mod项的点击事件
function setupEventListeners() {
    const modItems = document.querySelectorAll('.mod-item');
    
    modItems.forEach(item => {
        item.addEventListener('click', function() {
            const modId = this.dataset.modId;
            showModContent(modId);
        });
    });
}

// 显示mod详情内容
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

// 渲染mod详情内容
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

// 生成大纲
function generateOutline(content) {
    if (!content) return '';
    
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

// 渲染内容
function renderContent(content) {
    if (!content) return '';
    
    let html = '';
    
    content.forEach(item => {
        switch (item.type) {
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

// 显示mod列表
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