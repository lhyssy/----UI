/**
 * 助农宣传应用通用JavaScript功能
 * 包含页面导航、公共UI组件和常用功能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 页面入场动画
    initPageAnimations();

    // 返回按钮事件绑定
    setupBackButtons();

    // 底部导航事件绑定
    setupBottomNavigation();

    // 页面特效初始化
    initPageEffects();

    // 平台选择事件
    setupPlatformOptions();

    // 初始化所有页面导航
    initNavigation();
    
    // 初始化页面动画
    initAnimations();
    
    // 初始化返回按钮
    initBackButton();
});

/**
 * 初始化页面动画
 */
function initPageAnimations() {
    // 延迟动画元素
    const animatedElements = document.querySelectorAll('.animate-in');
    setTimeout(() => {
        animatedElements.forEach(el => {
            el.classList.add('animated');
        });
    }, 100);
}

/**
 * 设置返回按钮
 */
function setupBackButtons() {
    const backButtons = document.querySelectorAll('#backButton, .back-button');
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // 检查是否有指定的返回URL
            const backUrl = this.getAttribute('data-back-url');
            if (backUrl) {
                window.location.href = backUrl;
            } else {
                window.history.back();
            }
        });
    });
}

/**
 * 设置底部导航
 */
function setupBottomNavigation() {
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    
    // 根据当前页面设置激活状态
    const currentPage = getCurrentPage();
    
    bottomNavItems.forEach(item => {
        const link = item.getAttribute('data-link');
        if (link && currentPage.includes(link)) {
            item.classList.add('active');
        }
        
        item.addEventListener('click', function() {
            const link = this.getAttribute('data-link');
            if (link) {
                window.location.href = link;
            }
        });
    });
}

/**
 * 获取当前页面名称
 */
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop();
    return page || 'index.html';
}

/**
 * 初始化页面特效
 */
function initPageEffects() {
    // 添加气泡效果
    if (document.querySelector('.hero-section')) {
        createBubbleEffect();
    }
    
    // 初始化卡片悬停效果
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
}

/**
 * 创建气泡背景效果
 */
function createBubbleEffect() {
    const container = document.createElement('div');
    container.className = 'bubble-container';
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.overflow = 'hidden';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '-1';
    
    document.body.appendChild(container);
    
    // 创建气泡
    for (let i = 0; i < 15; i++) {
        createBubble(container);
    }
}

/**
 * 创建单个气泡
 * @param {HTMLElement} container - 容器元素
 */
function createBubble(container) {
    const bubble = document.createElement('div');
    const size = Math.random() * 60 + 20;
    const duration = Math.random() * 20 + 10;
    const left = Math.random() * 100;
    
    bubble.style.position = 'absolute';
    bubble.style.bottom = '-100px';
    bubble.style.left = `${left}%`;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.borderRadius = '50%';
    bubble.style.background = 'rgba(7, 193, 96, 0.05)';
    bubble.style.animation = `float ${duration}s linear infinite`;
    
    container.appendChild(bubble);
    
    // 创建动画关键帧
    if (!document.querySelector('#bubble-keyframes')) {
        const keyframes = document.createElement('style');
        keyframes.id = 'bubble-keyframes';
        keyframes.innerHTML = `
            @keyframes float {
                0% {
                    transform: translateY(0) rotate(0);
                    opacity: 0;
                }
                10% {
                    opacity: 0.5;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(keyframes);
    }
}

/**
 * 设置平台选择功能
 */
function setupPlatformOptions() {
    const platformOptions = document.querySelectorAll('.platform-option');
    platformOptions.forEach(option => {
        option.addEventListener('click', function() {
            const checkIcon = this.querySelector('.check-icon i');
            if (checkIcon) {
                if (checkIcon.classList.contains('fa-circle')) {
                    checkIcon.classList.remove('far', 'fa-circle', 'text-gray-300');
                    checkIcon.classList.add('fas', 'fa-check-circle', 'text-green-500');
                    this.classList.add('selected');
                } else {
                    checkIcon.classList.remove('fas', 'fa-check-circle', 'text-green-500');
                    checkIcon.classList.add('far', 'fa-circle', 'text-gray-300');
                    this.classList.remove('selected');
                }
            } else {
                // 切换选中状态
                this.classList.toggle('selected');
            }
            
            // 通知状态变化
            const event = new CustomEvent('platformSelectionChanged');
            document.dispatchEvent(event);
        });
    });
}

/**
 * 显示加载中状态
 * @param {HTMLElement} element - 要显示加载状态的元素
 * @param {string} text - 加载中的提示文字
 */
function showLoading(element, text = '加载中...') {
    element.classList.add('loading');
    
    // 创建加载指示器
    const spinner = document.createElement('div');
    spinner.classList.add('loading-spinner');
    
    const message = document.createElement('div');
    message.classList.add('loading-message');
    message.textContent = text;
    
    const loadingContainer = document.createElement('div');
    loadingContainer.classList.add('loading-container');
    loadingContainer.appendChild(spinner);
    loadingContainer.appendChild(message);
    
    // 备份原内容
    element.setAttribute('data-original-content', element.innerHTML);
    element.innerHTML = '';
    element.appendChild(loadingContainer);
}

/**
 * 隐藏加载中状态
 * @param {HTMLElement} element - 要隐藏加载状态的元素
 */
function hideLoading(element) {
    element.classList.remove('loading');
    
    // 恢复原内容
    const originalContent = element.getAttribute('data-original-content');
    if (originalContent) {
        element.innerHTML = originalContent;
    }
}

/**
 * 显示提示消息
 * @param {string} message - 提示内容
 * @param {string} type - 提示类型 (success, error, warning, info, loading)
 * @param {number} duration - 显示时长，毫秒
 */
function showToast(message, type = 'info', duration = 3000) {
    // 移除现有的toast
    const existingToast = document.querySelector('.toast-container');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 创建新的toast
    const toast = document.createElement('div');
    toast.className = `toast-container ${type}`;
    
    // 添加图标
    let icon = '';
    switch(type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        case 'loading':
            icon = '<div class="loading-spinner-sm"></div>';
            break;
        default:
            icon = '<i class="fas fa-info-circle"></i>';
    }
    
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">${icon}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // 添加显示类（用于动画）
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // 如果不是加载中，自动隐藏
    if (type !== 'loading' && duration > 0) {
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, duration);
    }
    
    return toast;
}

/**
 * 格式化数字为K,M格式
 * @param {number} num - 要格式化的数字
 * @returns {string} 格式化后的字符串
 */
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

/**
 * 日期格式化
 * @param {Date|string} date - 日期对象或日期字符串
 * @param {string} format - 格式化模板
 * @returns {string} 格式化后的日期字符串
 */
function formatDate(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

/**
 * 初始化页面导航
 */
function initNavigation() {
    // 处理底部导航栏点击
    document.querySelectorAll('[data-link]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const link = this.getAttribute('data-link');
            if (link) {
                // 点击效果
                addClickEffect(this);
                // 延迟跳转
                setTimeout(() => {
                    navigateTo(link);
                }, 150);
            }
        });
    });
    
    // 激活当前页面对应的导航项
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
        const itemLink = item.getAttribute('data-link');
        if (itemLink === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // 为菜单项添加统一点击效果
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            addClickEffect(this);
        });
    });

    // 为所有按钮添加统一点击效果
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            addClickEffect(this);
        });
    });
}

/**
 * 添加点击效果
 * @param {HTMLElement} element - 要添加效果的元素
 */
function addClickEffect(element) {
    // 添加点击效果类
    element.classList.add('click-effect');
    
    // 移除效果类
    setTimeout(() => {
        element.classList.remove('click-effect');
    }, 150);
}

/**
 * 导航到指定页面
 * @param {string} page - 目标页面路径
 */
function navigateTo(page) {
    // 添加页面切换动画
    document.body.classList.add('page-transition-out');
    
    // 延迟跳转以便显示动画
    setTimeout(() => {
        window.location.href = page;
    }, 300);
}

/**
 * 初始化页面动画
 */
function initAnimations() {
    // 淡入动画
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        setTimeout(() => {
            el.style.transition = 'opacity 0.5s ease';
            el.style.opacity = '1';
        }, 100);
    });
    
    // 滑入动画
    const slideElements = document.querySelectorAll('.slide-up');
    slideElements.forEach((el, index) => {
        el.style.transform = 'translateY(20px)';
        el.style.opacity = '0';
        setTimeout(() => {
            el.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            el.style.transform = 'translateY(0)';
            el.style.opacity = '1';
        }, 100 + index * 100);
    });
    
    // 交错动画
    const staggerElements = document.querySelectorAll('.stagger-item');
    staggerElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
        setTimeout(() => {
            el.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 + index * 80);
    });
}

/**
 * 初始化返回按钮
 */
function initBackButton() {
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.history.back();
        });
    }
}

// 添加CSS样式
const style = document.createElement('style');
style.textContent = `
    .toast-container {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        max-width: 80%;
        background-color: white;
        color: #333;
        padding: 10px 15px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        opacity: 0;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
    }
    
    .toast-container.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
    
    .toast-content {
        display: flex;
        align-items: center;
    }
    
    .toast-icon {
        margin-right: 10px;
    }
    
    .toast-container.success .toast-icon {
        color: #10b981;
    }
    
    .toast-container.error .toast-icon {
        color: #ef4444;
    }
    
    .toast-container.warning .toast-icon {
        color: #f59e0b;
    }
    
    .toast-container.info .toast-icon {
        color: #3b82f6;
    }
    
    .loading-spinner, .loading-spinner-sm {
        width: 20px;
        height: 20px;
        border: 2px solid rgba(7, 193, 96, 0.3);
        border-radius: 50%;
        border-top-color: #07c160;
        animation: spin 1s linear infinite;
    }
    
    .loading-spinner {
        width: 40px;
        height: 40px;
        border-width: 3px;
    }
    
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
    
    .page-transition-out {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .pulse {
        animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
    
    .hover-zoom {
        transition: transform 0.2s ease;
    }
    
    .hover-zoom:hover {
        transform: scale(1.02);
    }
    
    .template-change {
        opacity: 0.5;
        transition: opacity 0.3s ease;
    }
    
    .upload-success {
        width: 60px;
        height: 60px;
        background-color: rgba(16, 185, 129, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        font-size: 30px;
        color: #10b981;
    }

    .click-effect {
        transform: scale(0.95);
        opacity: 0.8;
        transition: transform 0.15s ease, opacity 0.15s ease;
    }

    /* 统一按钮样式 */
    button, .bottom-nav-item, .menu-item, [data-link] {
        transition: transform 0.15s ease, opacity 0.15s ease, background-color 0.15s ease;
        -webkit-tap-highlight-color: transparent;
    }

    button:active, .bottom-nav-item:active, .menu-item:active, [data-link]:active {
        transform: scale(0.95);
        opacity: 0.8;
    }
`;

document.head.appendChild(style); 