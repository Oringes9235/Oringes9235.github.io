document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    // 加载用户数据
    let users = [];
    fetch('users.json')
        .then(response => response.json())
        .then(data => {
            users = data.users;
        })
        .catch(error => {
            console.error('加载用户数据失败:', error);
            errorText.textContent = '系统错误，无法加载用户数据';
            errorMessage.style.display = 'block';
        });
    
    // 登录表单提交
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        // 验证用户
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            // 登录成功 - 存储登录状态并跳转
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            window.location.href = 'index.html';
        } else {
            // 登录失败
            errorMessage.style.display = 'block';
            document.getElementById('password').value = '';
        }
    });
    
    // 检查是否已登录，如果已登录则跳转
    if (localStorage.getItem('isLoggedIn')) {
        window.location.href = './index.html';
    }
});