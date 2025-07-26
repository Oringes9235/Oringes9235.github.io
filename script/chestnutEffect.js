// 将类定义移到最外层（不要放在DOMContentLoaded事件监听内）
class ParticleSystem {
  constructor() {
    this.container = document.getElementById('particles-js') || 
      (() => {
        const div = document.createElement('div');
        div.id = 'particles-js';
        document.body.appendChild(div);
        return div;
      })();
    
    this.colors = ['#FF5555', '#55FF55', '#5555FF', '#FFFF55', '#FF55FF', '#55FFFF'];
    document.addEventListener('click', (e) => this.handleClick(e));
  }

  handleClick(e) {
    this.createParticles(e.clientX, e.clientY);
  }

  createParticles(x, y, count = 15) {
    // ...保持原有实现...
  }
}

// 暴露到全局作用域（便于调试）
window.ParticleSystem = ParticleSystem;

// DOM加载后初始化
document.addEventListener('DOMContentLoaded', () => {
  new ParticleSystem();
  console.log('粒子系统已初始化'); // 调试用
});

// 初始化代码（确保DOM已加载）
function initParticleSystem() {
  // 调试输出
  console.log('初始化粒子系统...');
  
  // 检查是否在正确页面
  const allowedPages = ['/', '/index.html', ''];
  if (allowedPages.includes(window.location.pathname)) {
    new ParticleSystem();
  }
}

// 确保DOM加载完成后执行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initParticleSystem);
} else {
  initParticleSystem();
}