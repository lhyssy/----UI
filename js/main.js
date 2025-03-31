/**
 * 应用主入口
 * 负责应用全局状态初始化与页面导航控制
 */

// 应用全局状态对象
const appState = {
    // 用户认证状态
    auth: {
        isLoggedIn: false,
        userInfo: null
    },
    
    // 当前页面状态
    currentPage: null,
    
    // 全局配置
    config: {
        apiBaseUrl: 'https://api.example.com/v1', // 实际项目中需替换为真实API地址
        maxUploadSize: 5 * 1024 * 1024, // 5MB
        supportFileTypes: ['image/jpeg', 'image/png', 'image/gif'],
        defaultPageSize: 10
    }
};

// 页面初始化
document.addEventListener('DOMContentLoaded', () => {
    // 识别当前页面
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'index.html';
    appState.currentPage = pageName.replace('.html', '');
    
    // 初始化底部导航
    initBottomNav();
    
    // 检查用户认证状态
    checkAuthStatus();
    
    console.log(`应用初始化完成: 当前页面 ${appState.currentPage}`);
});

/**
 * 初始化底部导航
 */
function initBottomNav() {
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    
    // 高亮当前页面对应的导航项
    bottomNavItems.forEach(item => {
        const link = item.getAttribute('data-link');
        if (link && link.includes(appState.currentPage)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
        
        // 添加导航点击事件
        item.addEventListener('click', handleNavigation);
    });
}

/**
 * 处理页面导航
 * @param {Event} event - 导航点击事件
 */
function handleNavigation(event) {
    const link = this.getAttribute('data-link');
    
    if (!link) return;
    
    // 如果是同一页面，不做跳转
    if (link.includes(appState.currentPage)) {
        event.preventDefault();
        return;
    }
    
    // 检查特定页面的导航权限
    if (needsAuth(link) && !appState.auth.isLoggedIn) {
        event.preventDefault();
        showToast('请先登录后再访问该页面', 'error');
        setTimeout(() => {
            window.location.href = 'login.html'; 
        }, 1000);
        return;
    }
    
    // 显示页面加载提示
    showToast('页面加载中...', 'info');
}

/**
 * 检查页面是否需要认证
 * @param {string} pageUrl - 页面URL
 * @returns {boolean} - 是否需要认证
 */
function needsAuth(pageUrl) {
    const authPages = ['profile.html', 'publish.html'];
    return authPages.some(page => pageUrl.includes(page));
}

/**
 * 检查用户认证状态
 */
function checkAuthStatus() {
    // 从本地存储获取认证信息
    const authToken = localStorage.getItem('authToken');
    const userInfo = localStorage.getItem('userInfo');
    
    if (authToken && userInfo) {
        try {
            appState.auth.isLoggedIn = true;
            appState.auth.userInfo = JSON.parse(userInfo);
            
            // 可以在这里添加token验证逻辑
            
            console.log('用户已登录', appState.auth.userInfo);
        } catch (error) {
            console.error('解析用户信息失败', error);
            clearAuthData();
        }
    } else {
        appState.auth.isLoggedIn = false;
        appState.auth.userInfo = null;
    }
    
    // 触发认证状态更新事件
    document.dispatchEvent(new CustomEvent('authStateChanged', {
        detail: { ...appState.auth }
    }));
}

/**
 * 清除认证数据
 */
function clearAuthData() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    appState.auth.isLoggedIn = false;
    appState.auth.userInfo = null;
}

/**
 * 显示Toast消息
 * @param {string} message - 消息内容
 * @param {string} type - 消息类型
 */
function showToast(message, type = 'info') {
    if (window.utils && typeof window.utils.showToast === 'function') {
        window.utils.showToast(message, type);
    } else {
        console.log(message);
    }
}

// 导出全局应用状态和方法
window.app = {
    state: appState,
    showToast,
    clearAuthData,
    checkAuthStatus
}; 