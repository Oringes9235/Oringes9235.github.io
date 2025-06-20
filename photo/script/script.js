document.addEventListener('DOMContentLoaded', function() {
    // 相册数据
    const albums = [
        {
            id: 1,
            title: "自然风光",
            description: "美丽的山川湖海，大自然的鬼斧神工",
            coverImage: "https://source.unsplash.com/random/600x400/?nature",
            date: "2023-05-15",
            link: "#"
        },
        {
            id: 2,
            title: "城市建筑",
            description: "现代都市的摩天大楼与历史建筑",
            coverImage: "https://source.unsplash.com/random/600x400/?city",
            date: "2023-06-20",
            link: "#"
        }
        /*,{
            id: X,
            title: "夜景摄影",
            description: "城市与自然的夜晚美景",
            coverImage: "https://source.unsplash.com/random/600x400/?night",
            date: "2023-09-30",
            link: "#"
        }*/
    ];

    // 渲染相册
    const albumsContainer = document.getElementById('albums-container');
    
    function renderAlbums(albumsToRender) {
        albumsContainer.innerHTML = '';
        
        albumsToRender.forEach(album => {
            const albumCard = document.createElement('div');
            albumCard.className = 'album-card';
            albumCard.innerHTML = `
                <a href="${album.link}" class="album-link">
                    <div class="album-image">
                        <img src="${album.coverImage}" alt="${album.title}">
                    </div>
                    <div class="album-info">
                        <h3>${album.title}</h3>
                        <p>${album.description}</p>
                        <div class="album-date">
                            <i class="far fa-calendar-alt"></i>
                            <span>${formatDate(album.date)}</span>
                        </div>
                    </div>
                </a>
            `;
            albumsContainer.appendChild(albumCard);
        });
    }

    // 格式化日期
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('zh-CN', options);
    }

    // 搜索功能
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm.trim() === '') {
            renderAlbums(albums);
            return;
        }
        
        const filteredAlbums = albums.filter(album => 
            album.title.toLowerCase().includes(searchTerm) || 
            album.description.toLowerCase().includes(searchTerm)
        );
        
        renderAlbums(filteredAlbums);
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // 初始渲染
    renderAlbums(albums);
});