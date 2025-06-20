document.addEventListener('DOMContentLoaded', function() {
    // 初始化链接数据（可以从本地存储加载）
    let links = JSON.parse(localStorage.getItem('navLinks')) || [
        { name: 'GitHub', url: 'https://github.com', category: '开发', icon: 'fab fa-github' },
        { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', category: '开发', icon: 'fas fa-code' },
        { name: 'Stack Overflow', url: 'https://stackoverflow.com', category: '开发', icon: 'fab fa-stack-overflow' },
        { name: 'Google', url: 'https://google.com', category: '搜索', icon: 'fab fa-google' },
        { name: '百度', url: 'https://baidu.com', category: '搜索', icon: 'fas fa-search' },
        { name: 'YouTube', url: 'https://youtube.com', category: '视频', icon: 'fab fa-youtube' },
        { name: '哔哩哔哩', url: 'https://bilibili.com', category: '视频', icon: 'fas fa-play' }
    ];

    // DOM元素
    const categoriesContainer = document.querySelector('.categories');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const addLinkBtn = document.getElementById('addLinkBtn');
    const modal = document.getElementById('addLinkModal');
    const closeBtn = document.querySelector('.close');
    const linkForm = document.getElementById('linkForm');

    // 渲染链接
    function renderLinks(linksToRender = links) {
        // 按分类分组
        const categories = {};
        
        linksToRender.forEach(link => {
            if (!categories[link.category]) {
                categories[link.category] = [];
            }
            categories[link.category].push(link);
        });
        
        // 清空容器
        categoriesContainer.innerHTML = '';
        
        // 渲染每个分类
        for (const category in categories) {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'category';
            
            const categoryTitle = document.createElement('h2');
            categoryTitle.textContent = category;
            categoryElement.appendChild(categoryTitle);
            
            const linksContainer = document.createElement('div');
            linksContainer.className = 'links';
            
            categories[category].forEach(link => {
                const linkElement = document.createElement('a');
                linkElement.className = 'link-item';
                linkElement.href = link.url;
                linkElement.target = '_blank';
                
                linkElement.innerHTML = `
                    <div class="link-icon">
                        <i class="${link.icon || 'fas fa-link'}"></i>
                    </div>
                    <div class="link-name">${link.name}</div>
                    <div class="link-delete" data-url="${link.url}">
                        <i class="fas fa-trash"></i>
                    </div>
                `;
                
                linksContainer.appendChild(linkElement);
            });
            
            categoryElement.appendChild(linksContainer);
            categoriesContainer.appendChild(categoryElement);
        }
        
        // 添加删除事件监听
        document.querySelectorAll('.link-delete').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const url = this.getAttribute('data-url');
                deleteLink(url);
            });
        });
    }
    
    // 删除链接
    function deleteLink(url) {
        if (confirm('确定要删除这个链接吗？')) {
            links = links.filter(link => link.url !== url);
            saveLinks();
            renderLinks();
        }
    }
    
    // 保存链接到本地存储
    function saveLinks() {
        localStorage.setItem('navLinks', JSON.stringify(links));
    }
    
    // 搜索链接
    function searchLinks() {
        const searchTerm = searchInput.value.toLowerCase();
        
        if (!searchTerm) {
            renderLinks();
            return;
        }
        
        const filteredLinks = links.filter(link => 
            link.name.toLowerCase().includes(searchTerm) || 
            link.url.toLowerCase().includes(searchTerm) ||
            link.category.toLowerCase().includes(searchTerm)
        );
        
        renderLinks(filteredLinks);
    }
    
    // 添加新链接
    function addLink(e) {
        e.preventDefault();
        
        const name = document.getElementById('linkName').value;
        const url = document.getElementById('linkUrl').value;
        const category = document.getElementById('linkCategory').value;
        const icon = document.getElementById('linkIcon').value;
        
        // 验证URL
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            alert('URL必须以http://或https://开头');
            return;
        }
        
        // 检查是否已存在
        const exists = links.some(link => link.url === url);
        if (exists) {
            alert('该链接已存在！');
            return;
        }
        
        // 添加新链接
        links.push({ name, url, category, icon });
        saveLinks();
        renderLinks();
        
        // 重置表单并关闭模态框
        linkForm.reset();
        modal.style.display = 'none';
    }
    
    // 事件监听
    searchBtn.addEventListener('click', searchLinks);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchLinks();
        }
    });
    
    addLinkBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    linkForm.addEventListener('submit', addLink);
    
    // 初始渲染
    renderLinks();
});