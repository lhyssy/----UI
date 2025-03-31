/**
 * 搜索历史模块
 * 负责搜索历史的管理和展示
 */

// 存储当前搜索历史的数组
let searchHistory = [];

// 最大历史记录数量
const MAX_HISTORY_ITEMS = 5;

// 当页面加载完成时初始化搜索历史
document.addEventListener('DOMContentLoaded', async () => {
    // 从API加载搜索历史
    await loadSearchHistory();
    
    // 从API加载热门搜索标签
    await loadHotSearchTags();
    
    // 绑定清空历史按钮事件
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', clearAllHistory);
    }
});

/**
 * 加载搜索历史
 */
async function loadSearchHistory() {
    try {
        // 显示加载指示器
        showLoadingIndicator();
        
        // 从后端API获取搜索历史
        searchHistory = await api.getSearchHistory();
        
        // 更新UI
        updateSearchHistoryUI();
        
        // 隐藏加载指示器
        hideLoadingIndicator();
    } catch (error) {
        console.error('加载搜索历史失败:', error);
        hideLoadingIndicator();
    }
}

/**
 * 加载热门搜索标签
 */
async function loadHotSearchTags() {
    try {
        // 获取热门搜索标签
        const hotTags = await api.getHotSearchTags();
        
        // 更新热门搜索UI
        updateHotSearchTagsUI(hotTags);
    } catch (error) {
        console.error('加载热门搜索标签失败:', error);
    }
}

/**
 * 更新搜索历史UI
 */
function updateSearchHistoryUI() {
    const recentSearchList = document.getElementById('recentSearchList');
    if (!recentSearchList) return;
    
    // 清空现有内容
    recentSearchList.innerHTML = '';
    
    // 如果没有历史记录，显示提示
    if (searchHistory.length === 0) {
        recentSearchList.innerHTML = `
            <div class="p-4 text-center text-gray-500 text-sm">
                暂无搜索历史
            </div>
        `;
        return;
    }
    
    // 遍历历史记录并创建DOM元素
    searchHistory.forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'recent-search-item';
        historyItem.innerHTML = `
            <i class="fas fa-history text-gray-400 mr-3"></i>
            <span class="flex-1">${item}</span>
            <i class="fas fa-times text-gray-400 delete-btn" data-index="${index}"></i>
        `;
        
        // 添加点击事件：点击搜索词
        historyItem.querySelector('span').addEventListener('click', () => {
            document.getElementById('searchInput').value = item;
            // 触发搜索事件
            document.dispatchEvent(new CustomEvent('performSearch', {
                detail: { keyword: item }
            }));
        });
        
        // 添加点击事件：点击删除图标
        historyItem.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            removeHistoryItem(index);
        });
        
        // 添加到容器
        recentSearchList.appendChild(historyItem);
    });
}

/**
 * 更新热门搜索标签UI
 * @param {Array} tags - 热门搜索标签数组
 */
function updateHotSearchTagsUI(tags) {
    const hotSearchContainer = document.getElementById('hotSearchContainer');
    if (!hotSearchContainer) return;
    
    // 清空现有内容
    hotSearchContainer.innerHTML = '';
    
    // 遍历标签并创建DOM元素
    tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'hot-search-tag';
        tagElement.textContent = tag;
        
        // 添加点击事件
        tagElement.addEventListener('click', () => {
            document.getElementById('searchInput').value = tag;
            // 触发搜索事件
            document.dispatchEvent(new CustomEvent('performSearch', {
                detail: { keyword: tag }
            }));
        });
        
        // 添加到容器
        hotSearchContainer.appendChild(tagElement);
    });
}

/**
 * 添加搜索历史项
 * @param {string} keyword - 搜索关键词
 */
async function addHistoryItem(keyword) {
    if (!keyword || keyword.trim() === '') return;
    
    // 清理关键词
    keyword = keyword.trim();
    
    // 检查是否已存在相同搜索词
    const existingIndex = searchHistory.findIndex(item => item === keyword);
    if (existingIndex !== -1) {
        // 如果存在，先移除旧的
        searchHistory.splice(existingIndex, 1);
    }
    
    // 添加到历史记录的顶部
    searchHistory.unshift(keyword);
    
    // 如果超出最大数量，移除最旧的
    if (searchHistory.length > MAX_HISTORY_ITEMS) {
        searchHistory.pop();
    }
    
    // 更新UI
    updateSearchHistoryUI();
    
    // 保存到API
    await api.saveSearchHistory(searchHistory);
}

/**
 * 移除特定的搜索历史项
 * @param {number} index - 要移除的项的索引
 */
async function removeHistoryItem(index) {
    if (index < 0 || index >= searchHistory.length) return;
    
    // 移除指定项
    searchHistory.splice(index, 1);
    
    // 更新UI
    updateSearchHistoryUI();
    
    // 保存到API
    await api.saveSearchHistory(searchHistory);
    
    // 显示提示
    showToast('已删除搜索记录', 'success');
}

/**
 * 清空所有搜索历史
 */
async function clearAllHistory() {
    // 显示确认对话框
    if (confirm('确定要清空搜索历史吗？')) {
        // 清空历史记录数组
        searchHistory = [];
        
        // 更新UI
        updateSearchHistoryUI();
        
        // 调用API清空历史
        await api.clearSearchHistory();
        
        // 显示提示
        showToast('已清空搜索历史', 'success');
    }
}

/**
 * 显示加载指示器
 */
function showLoadingIndicator() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) {
        loadingIndicator.classList.remove('hidden');
    }
}

/**
 * 隐藏加载指示器
 */
function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) {
        loadingIndicator.classList.add('hidden');
    }
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

// 导出搜索历史功能
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadSearchHistory,
        loadHotSearchTags,
        addHistoryItem,
        removeHistoryItem,
        clearAllHistory
    };
} else {
    // 添加到全局对象
    window.searchHistory = {
        loadSearchHistory,
        loadHotSearchTags,
        addHistoryItem,
        removeHistoryItem,
        clearAllHistory
    };
} 