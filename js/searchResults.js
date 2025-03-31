/**
 * 搜索结果模块
 * 负责搜索结果的核心逻辑和状态管理
 */

// 存储当前搜索状态
const searchState = {
    keyword: '',
    filter: 'all',
    sort: 'relevance',
    page: 1,
    pageSize: 10,
    items: [],
    total: 0,
    hasMore: false,
    isSearching: false
};

// 当页面加载完成时初始化搜索结果功能
document.addEventListener('DOMContentLoaded', async () => {
    // 初始化筛选类型
    await initFilterTypes();
    
    // 初始化排序类型
    await initSortTypes();
    
    // 绑定加载更多按钮事件
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreResults);
    }
    
    // 绑定浏览推荐内容按钮事件
    const browseRecommendBtn = document.getElementById('browseRecommendBtn');
    if (browseRecommendBtn) {
        browseRecommendBtn.addEventListener('click', loadRecommendedContent);
    }
    
    // 监听搜索事件
    document.addEventListener('performSearch', (e) => {
        const { keyword } = e.detail;
        performSearch(keyword);
    });
});

/**
 * 初始化筛选类型
 */
async function initFilterTypes() {
    try {
        // 获取筛选类型
        const filterTypes = await api.getFilterTypes();
        
        // 使用搜索UI模块更新筛选类型UI
        if (window.searchResultsUI && typeof window.searchResultsUI.updateFilterTypesUI === 'function') {
            window.searchResultsUI.updateFilterTypesUI(filterTypes, searchState);
        }
    } catch (error) {
        console.error('初始化筛选类型失败:', error);
    }
}

/**
 * 初始化排序类型
 */
async function initSortTypes() {
    try {
        // 获取排序类型
        const sortTypes = await api.getSortTypes();
        
        // 使用搜索UI模块更新排序类型UI
        if (window.searchResultsUI && typeof window.searchResultsUI.updateSortTypesUI === 'function') {
            window.searchResultsUI.updateSortTypesUI(sortTypes, searchState);
        }
    } catch (error) {
        console.error('初始化排序类型失败:', error);
    }
}

/**
 * 执行搜索
 * @param {string} keyword - 搜索关键词
 */
async function performSearch(keyword) {
    if (!keyword || keyword.trim() === '') return;
    
    // 清理关键词
    keyword = keyword.trim();
    
    // 更新搜索关键词
    searchState.keyword = keyword;
    searchState.page = 1; // 重置页码
    searchState.items = []; // 清空现有结果
    
    // 将关键词添加到搜索历史
    if (window.searchHistory && typeof window.searchHistory.addHistoryItem === 'function') {
        await window.searchHistory.addHistoryItem(keyword);
    }
    
    // 显示搜索界面
    if (window.searchResultsUI && typeof window.searchResultsUI.showSearchResultUI === 'function') {
        window.searchResultsUI.showSearchResultUI();
    }
    
    // 执行搜索
    await searchContent();
}

/**
 * 搜索内容
 */
async function searchContent() {
    // 如果正在搜索，则不执行
    if (searchState.isSearching) return;
    
    try {
        // 标记正在搜索
        searchState.isSearching = true;
        
        // 显示加载指示器
        showLoadingIndicator();
        
        // 显示搜索状态
        showToast('正在搜索...', 'info');
        
        // 调用API搜索内容
        const result = await api.searchContent(
            searchState.keyword,
            searchState.filter,
            searchState.sort,
            searchState.page,
            searchState.pageSize
        );
        
        // 更新搜索状态
        if (searchState.page === 1) {
            // 首次搜索，替换现有结果
            searchState.items = result.items;
        } else {
            // 加载更多，追加结果
            searchState.items = [...searchState.items, ...result.items];
        }
        
        searchState.total = result.total;
        searchState.hasMore = result.hasMore;
        
        // 更新UI
        if (window.searchResultsUI && typeof window.searchResultsUI.updateSearchResultsUI === 'function') {
            window.searchResultsUI.updateSearchResultsUI(searchState);
        }
        
        // 更新结果数量
        const resultCountElement = document.getElementById('resultCount');
        if (resultCountElement) {
            resultCountElement.textContent = searchState.total;
        }
        
        // 隐藏加载指示器
        hideLoadingIndicator();
        
        // 如果没有结果，显示无结果状态
        if (searchState.total === 0 && window.searchResultsUI && 
            typeof window.searchResultsUI.showEmptyResultState === 'function') {
            window.searchResultsUI.showEmptyResultState();
        }
    } catch (error) {
        console.error('搜索内容失败:', error);
        hideLoadingIndicator();
        showToast('搜索失败，请重试', 'error');
    } finally {
        // 标记搜索结束
        searchState.isSearching = false;
    }
}

/**
 * 加载更多结果
 */
async function loadMoreResults() {
    // 如果没有更多结果或正在搜索，则不执行
    if (!searchState.hasMore || searchState.isSearching) return;
    
    // 增加页码
    searchState.page++;
    
    // 执行搜索
    await searchContent();
}

/**
 * 加载推荐内容
 */
async function loadRecommendedContent() {
    try {
        // 显示加载指示器
        showLoadingIndicator();
        
        // 调用API获取推荐内容
        const recommendedItems = await api.getRecommendedContent();
        
        // 更新搜索状态
        searchState.keyword = '推荐内容';
        searchState.items = recommendedItems;
        searchState.total = recommendedItems.length;
        searchState.hasMore = false;
        searchState.page = 1;
        
        // 显示搜索界面
        if (window.searchResultsUI && typeof window.searchResultsUI.showSearchResultUI === 'function') {
            window.searchResultsUI.showSearchResultUI();
        }
        
        // 更新UI
        if (window.searchResultsUI && typeof window.searchResultsUI.updateSearchResultsUI === 'function') {
            window.searchResultsUI.updateSearchResultsUI(searchState);
        }
        
        // 更新结果数量
        const resultCountElement = document.getElementById('resultCount');
        if (resultCountElement) {
            resultCountElement.textContent = searchState.total;
        }
        
        // 隐藏加载指示器
        hideLoadingIndicator();
        
        // 显示提示
        showToast('为您推荐以下内容', 'info');
    } catch (error) {
        console.error('加载推荐内容失败:', error);
        hideLoadingIndicator();
        showToast('加载推荐内容失败，请重试', 'error');
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

// 导出搜索结果功能
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        searchState,
        performSearch,
        loadMoreResults,
        loadRecommendedContent
    };
} else {
    // 添加到全局对象
    window.searchResults = {
        searchState,
        performSearch,
        loadMoreResults,
        loadRecommendedContent
    };
} 