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
    const bubbleContainer = document.createElement('div');
    bubbleContainer.classList.add('bubble-container');
    
    // 创建10个气泡
    for (let i = 0; i < 10; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // 随机大小
        const size = Math.random() * 100 + 50;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // 随机位置
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.bottom = `-${size}px`;
        
        // 随机动画持续时间
        const duration = Math.random() * 20 + 10;
        bubble.style.animationDuration = `${duration}s`;
        
        // 随机延迟
        const delay = Math.random() * 5;
        bubble.style.animationDelay = `${delay}s`;
        
        bubbleContainer.appendChild(bubble);
    }
    
    document.body.appendChild(bubbleContainer);
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