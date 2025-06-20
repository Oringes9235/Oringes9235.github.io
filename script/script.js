document.addEventListener('DOMContentLoaded', function() {
    // 加载链接数据
    fetch('links.json')
        .then(response => response.json())
        .then(data => {
            displayLinks(data);
            setupSearch(data);
        })
        .catch(error => console.error('加载链接失败:', error));

    // 显示链接
    function displayLinks(linksData) {
        const categoriesContainer = document.getElementById('categories');
        categoriesContainer.innerHTML = '';
        
        linksData.categories.forEach(category => {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'category';
            
            const categoryTitle = document.createElement('h2');
            categoryTitle.textContent = category.name;
            categoryElement.appendChild(categoryTitle);
            
            const linksContainer = document.createElement('div');
            linksContainer.className = 'links-container';
            
            category.links.forEach(link => {
                const linkCard = document.createElement('div');
                linkCard.className = 'link-card';
                
                const linkIcon = document.createElement('div');
                linkIcon.className = 'link-icon';
                if (link.icon) {
                    if (link.icon.startsWith('fa-')) {
                        // Font Awesome 图标
                        const icon = document.createElement('i');
                        icon.className = `fas ${link.icon}`;
                        linkIcon.appendChild(icon);
                    } else {
                        // 文本图标
                        linkIcon.textContent = link.icon;
                    }
                } else {
                    // 默认图标
                    const icon = document.createElement('i');
                    icon.className = 'fas fa-link';
                    linkIcon.appendChild(icon);
                }
                
                const linkInfo = document.createElement('div');
                linkInfo.className = 'link-info';
                
                const linkTitle = document.createElement('h3');
                const linkAnchor = document.createElement('a');
                linkAnchor.href = link.url;
                linkAnchor.textContent = link.name;
                linkAnchor.target = '_blank';
                linkTitle.appendChild(linkAnchor);
                
                const linkDesc = document.createElement('p');
                linkDesc.textContent = link.description || '';
                
                linkInfo.appendChild(linkTitle);
                linkInfo.appendChild(linkDesc);
                
                linkCard.appendChild(linkIcon);
                linkCard.appendChild(linkInfo);
                linksContainer.appendChild(linkCard);
            });
            
            categoryElement.appendChild(linksContainer);
            categoriesContainer.appendChild(categoryElement);
        });
    }

    // 设置搜索功能
    function setupSearch(linksData) {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (!searchTerm) {
                displayLinks(linksData);
                return;
            }
            
            // 过滤链接
            const filteredData = {
                categories: linksData.categories.map(category => ({
                    name: category.name,
                    links: category.links.filter(link => 
                        link.name.toLowerCase().includes(searchTerm) || 
                        (link.description && link.description.toLowerCase().includes(searchTerm)) ||
                        link.url.toLowerCase().includes(searchTerm)
                    )
                })).filter(category => category.links.length > 0)
            };
            
            displayLinks(filteredData);
        }
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});