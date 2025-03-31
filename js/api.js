/**
 * API模拟模块
 * 提供后端功能模拟，如搜索、数据获取等
 */

// 模拟延迟
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 获取热门搜索标签
 * @returns {Promise<Array>} 热门搜索标签数组
 */
async function getHotSearchTags() {
    await delay(300);
    return window.apiMockData.mockData.hotSearchTags;
}

/**
 * 获取筛选类型
 * @returns {Promise<Array>} 筛选类型数组
 */
async function getFilterTypes() {
    await delay(200);
    return window.apiMockData.mockData.filterTypes;
}

/**
 * 获取排序类型
 * @returns {Promise<Array>} 排序类型数组
 */
async function getSortTypes() {
    await delay(200);
    return window.apiMockData.mockData.sortTypes;
}

/**
 * 搜索内容
 * @param {string} keyword - 搜索关键词
 * @param {string} [filter='all'] - 筛选类型
 * @param {string} [sort='relevance'] - 排序类型
 * @param {number} [page=1] - 当前页码
 * @param {number} [pageSize=10] - 每页数量
 * @returns {Promise<Object>} 搜索结果
 */
async function searchContent(keyword, filter = 'all', sort = 'relevance', page = 1, pageSize = 10) {
    await delay(800);
    
    // 关键词为空或模拟无结果的情况
    if (!keyword || keyword.toLowerCase().includes('没有结果')) {
        return {
            items: [],
            total: 0,
            page: page,
            pageSize: pageSize,
            hasMore: false
        };
    }
    
    // 合并所有类型的数据
    let allItems = [
        ...window.apiMockData.mockData.products,
        ...window.apiMockData.mockData.tutorials,
        ...window.apiMockData.mockData.templates,
        ...window.apiMockData.mockData.articles
    ];
    
    // 根据关键词筛选
    let filtered = allItems.filter(item => {
        const matchesKeyword = 
            item.title.toLowerCase().includes(keyword.toLowerCase()) || 
            item.description.toLowerCase().includes(keyword.toLowerCase());
        
        // 如果指定了筛选类型，则进一步筛选
        if (filter !== 'all') {
            return matchesKeyword && item.type === filter;
        }
        
        return matchesKeyword;
    });
    
    // 根据排序类型排序
    if (sort === 'newest') {
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
        // 默认按相关度排序，这里简单地使用随机排序模拟
        filtered.sort(() => Math.random() - 0.5);
    }
    
    // 计算分页
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = filtered.slice(startIndex, endIndex);
    
    return {
        items: paginatedItems,
        total: filtered.length,
        page: page,
        pageSize: pageSize,
        hasMore: endIndex < filtered.length
    };
}

/**
 * 保存搜索历史
 * @param {Array} history - 搜索历史数组
 * @returns {Promise<boolean>} 是否保存成功
 */
async function saveSearchHistory(history) {
    await delay(100);
    try {
        localStorage.setItem('searchHistory', JSON.stringify(history));
        return true;
    } catch (error) {
        console.error('保存搜索历史失败:', error);
        return false;
    }
}

/**
 * 获取搜索历史
 * @returns {Promise<Array>} 搜索历史数组
 */
async function getSearchHistory() {
    await delay(100);
    try {
        const historyJSON = localStorage.getItem('searchHistory');
        return historyJSON ? JSON.parse(historyJSON) : [];
    } catch (error) {
        console.error('获取搜索历史失败:', error);
        return [];
    }
}

/**
 * 清空搜索历史
 * @returns {Promise<boolean>} 是否清空成功
 */
async function clearSearchHistory() {
    await delay(100);
    try {
        localStorage.removeItem('searchHistory');
        return true;
    } catch (error) {
        console.error('清空搜索历史失败:', error);
        return false;
    }
}

/**
 * 获取推荐内容
 * @returns {Promise<Array>} 推荐内容数组
 */
async function getRecommendedContent() {
    await delay(500);
    
    // 从所有数据中随机选择一些作为推荐
    const allItems = [
        ...window.apiMockData.mockData.products,
        ...window.apiMockData.mockData.tutorials,
        ...window.apiMockData.mockData.templates,
        ...window.apiMockData.mockData.articles
    ];
    
    // 随机打乱并返回前5个
    return allItems
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
}

// 导出API函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getHotSearchTags,
        getFilterTypes,
        getSortTypes,
        searchContent,
        saveSearchHistory,
        getSearchHistory,
        clearSearchHistory,
        getRecommendedContent
    };
} else {
    // 添加到全局对象
    window.api = {
        getHotSearchTags,
        getFilterTypes,
        getSortTypes,
        searchContent,
        saveSearchHistory,
        getSearchHistory,
        clearSearchHistory,
        getRecommendedContent
    };
} 