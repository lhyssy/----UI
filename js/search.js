/**
 * 搜索功能主模块
 * 负责搜索界面整体控制与交互
 */

// 当页面加载完成时初始化搜索功能
document.addEventListener('DOMContentLoaded', () => {
    // 获取搜索相关元素
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const searchHistoryContainer = document.getElementById('searchHistoryContainer');
    
    // 初始化搜索输入事件
    initSearchInputEvents(searchInput, clearSearchBtn, searchHistoryContainer);
    
    // 监听数据返回按钮事件
    document.querySelectorAll('a[href="index.html"]').forEach(backBtn => {
        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    });
    
    // 监听底部导航事件
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const link = item.getAttribute('data-link');
            if (link) {
                // 触发页面跳转前显示加载中提示
                showToast('页面加载中...', 'info');
                setTimeout(() => {
                    window.location.href = link;
                }, 300);
            }
        });
    });
});

/**
 * 初始化搜索输入事件
 * @param {HTMLElement} searchInput - 搜索输入框
 * @param {HTMLElement} clearSearchBtn - 清空搜索按钮
 * @param {HTMLElement} searchHistoryContainer - 搜索历史容器
 */
function initSearchInputEvents(searchInput, clearSearchBtn, searchHistoryContainer) {
    if (!searchInput || !clearSearchBtn || !searchHistoryContainer) return;
    
    // 搜索输入事件
    searchInput.addEventListener('input', () => {
        const hasValue = searchInput.value.trim() !== '';
        
        // 控制清空按钮的显示/隐藏
        clearSearchBtn.style.display = hasValue ? 'block' : 'none';
        
        // 输入框为空时显示搜索历史
        if (!hasValue) {
            showSearchHistory(searchHistoryContainer);
        }
    });
    
    // 搜索框回车键事件
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim()) {
            performSearch(searchInput.value.trim());
        }
    });
    
    // 清除搜索内容
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        showSearchHistory(searchHistoryContainer);
    });
    
    // 初始检查搜索框状态
    if (searchInput.value.trim()) {
        clearSearchBtn.style.display = 'block';
    } else {
        clearSearchBtn.style.display = 'none';
    }
}

/**
 * 执行搜索
 * @param {string} keyword - 搜索关键词
 */
function performSearch(keyword) {
    if (!keyword || keyword.trim() === '') return;
    
    // 触发搜索事件
    document.dispatchEvent(new CustomEvent('performSearch', {
        detail: { keyword: keyword.trim() }
    }));
}

/**
 * 显示搜索历史界面
 * @param {HTMLElement} searchHistoryContainer - 搜索历史容器
 */
function showSearchHistory(searchHistoryContainer) {
    // 显示搜索历史容器
    searchHistoryContainer.classList.remove('hidden');
    
    // 隐藏其他容器
    document.getElementById('filterContainer').classList.add('hidden');
    document.getElementById('sortContainer').classList.add('hidden');
    document.getElementById('searchResultsContainer').classList.add('hidden');
    document.getElementById('emptyResultContainer').classList.add('hidden');
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

// 导出搜索功能
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        performSearch,
        showSearchHistory
    };
} else {
    // 添加到全局对象
    window.search = {
        performSearch,
        showSearchHistory
    };
} 