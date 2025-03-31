/**
 * 助农宣传 - 主JavaScript文件
 * 包含通用UI功能和交互逻辑
 */

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化导航栏
    initNavigation();
    
    // 初始化通用UI组件
    initUIComponents();
    
    // 注册事件监听
    registerEventListeners();
});

/**
 * 初始化导航栏
 */
function initNavigation() {
    // 底部导航栏项目点击事件
    const navItems = document.querySelectorAll('.bottom-nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const link = this.getAttribute('data-link');
            if (link) {
                window.location.href = link;
            }
        });
    });
    
    // 返回按钮
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.history.back();
        });
    }
}

/**
 * 初始化UI组件
 */
function initUIComponents() {
    // 添加波纹效果
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
    
    // 初始化下拉菜单
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function() {
            const content = this.nextElementSibling;
            content.classList.toggle('hidden');
        });
    });
}

/**
 * 创建波纹效果
 * @param {Event} e - 点击事件
 */
function createRippleEffect(e) {
    const button = e.currentTarget;
    
    // 创建波纹元素
    const ripple = document.createElement('span');
    button.appendChild(ripple);
    
    // 计算尺寸
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    ripple.style.width = ripple.style.height = `${diameter}px`;
    
    // 计算位置
    const rect = button.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left - diameter / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - diameter / 2}px`;
    
    // 添加波纹类
    ripple.classList.add('ripple');
    
    // 移除波纹
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * 显示提示消息
 * @param {string} message - 提示内容
 * @param {string} type - 提示类型 (success, error, info, warning, loading)
 * @param {number} duration - 持续时间(毫秒)
 */
function showToast(message, type = 'info', duration = 2000) {
    // 移除现有的Toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 创建新的Toast元素
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    // 设置不同类型的图标和样式
    let icon = '';
    let bgClass = '';
    
    switch(type) {
        case 'success':
            icon = '<i class="fas fa-check-circle mr-2"></i>';
            bgClass = 'bg-green-500';
            break;
        case 'error':
            icon = '<i class="fas fa-times-circle mr-2"></i>';
            bgClass = 'bg-red-500';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-circle mr-2"></i>';
            bgClass = 'bg-yellow-500';
            break;
        case 'loading':
            icon = '<div class="spinner-small mr-2"></div>';
            bgClass = 'bg-blue-500';
            break;
        case 'info':
        default:
            icon = '<i class="fas fa-info-circle mr-2"></i>';
            bgClass = 'bg-blue-500';
    }
    
    // 设置Toast内容
    toast.innerHTML = `
        <div class="${bgClass} text-white px-4 py-3 rounded-lg shadow-lg flex items-center">
            ${icon}
            <span>${message}</span>
        </div>
    `;
    
    // 添加CSS样式
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%) translateY(-20px)';
    toast.style.zIndex = '9999';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s, transform 0.3s';
    
    // 添加到文档中
    document.body.appendChild(toast);
    
    // 淡入显示
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    // 自动淡出
    if (type !== 'loading') {
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(-20px)';
            
            // 移除元素
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, duration);
    }
    
    // 返回Toast元素，便于外部控制
    return toast;
}

/**
 * 注册全局事件监听
 */
function registerEventListeners() {
    // 监听网络状态变化
    window.addEventListener('online', () => {
        showToast('网络已连接', 'success');
    });
    
    window.addEventListener('offline', () => {
        showToast('网络已断开', 'error');
    });
    
    // 页面可见性变化
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            // 页面变为可见时执行的操作
        }
    });
}

// 导出公共函数
window.showToast = showToast; 