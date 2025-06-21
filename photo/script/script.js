document.addEventListener('DOMContentLoaded', function() {
    // 相册数据
    const albums = [
        {
            id: 1,
            title: "2026届第二中学泉州研学",
            description: "Shoot by Oringes.",
            coverImage: "./coverImage/2026届第二中学泉州研学ShootbyOringes.webp",
            date: "2024-12-20",
            link: "https://photo.baidu.com/photo/wap/albumShare/invite/RYyVrBvsPA?from=webcreate"
        },
        {
            id: 2,
            title: "2026届第二中学泉州研学",
            description: "Shoot by System",
            coverImage: "./coverImage/2026届第二中学泉州研学ShootbySystem.webp",
            date: "2024-12-20",
            link: "https://photo.baidu.com/photo/wap/albumShare/invite/GPePjjSp?from=webcreate"
        },
        {
            id: 3,
            title: "2026届第五中学_才溪_龙田古田研学",
            description: "Shoot by System",
            coverImage: "./coverImage/2026届第五中学_才溪_龙田古田研学ShootbySystem.webp",
            date: "2023-06-20",
            link: "https://photo.baidu.com/photo/wap/albumShare/invite/dLUSgOEwgl?from=webcreate"
        },
        {
            id: 4,
            title: "2026届第一中学厦门研学",
            description: "Shoot by System",
            coverImage: "./coverImage/2026届第一中学厦门研学ShootbySystem.webp",
            date: "2025-05-24",
            link: "https://photo.baidu.com/photo/wap/albumShare/invite/CFZvVPfIBW?from=webcreate"
        },
        {
            id: 5,
            title: "2027届第二中学泉州研学",
            description: "Shoot by System",
            coverImage: "./coverImage/2027届第二中学泉州研学ShootbySystem.webp",
            date: "2024-12-23",
            link: "https://photo.baidu.com/photo/wap/albumShare/invite/DXBjzIVdfl?from=webcreate"
        },
        {
            id: 6,
            title: "2027届第二中学_明强古田研学",
            description: "Shoot by System",
            coverImage: "./coverImage/2027届第二中学_明强古田研学ShootbySystem.webp",
            date: "2025-02-17",
            link: "https://photo.baidu.com/photo/wap/albumShare/invite/ftVYlzdunv?from=webcreate"
        },
        {
            id: 7,
            title: "2026届第二中学_明强古田研学",
            description: "Shoot by System",
            coverImage: "./coverImage/2026届第二中学_明强古田研学ShootbySystem.webp",
            date: "2025-02-24",
            link: "https://photo.baidu.com/photo/wap/albumShare/invite/pNMzRCVKZF?from=webcreate"
        }
        
        /*,{
            id: X,
            title: "夜景摄影",
            description: "城市与自然的夜晚美景",
            coverImage: "#",
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