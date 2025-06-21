// 检查登录状态
if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', function() {
    // 相册数据
    const albums = [
        {
            id: 1,
            title: "2008年",
            description: "Photographed by Sony DSC-T110",
            coverImage: "./coverImage/2008年PhotographedbySonyDSC-T110.webp",
            date: "2008",
            link: "https://photo.baidu.com/photo/wap/albumShare/invite/kcajAIUPLb?from=webcreate"
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
// 登出功能
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.href = './login.html';
});