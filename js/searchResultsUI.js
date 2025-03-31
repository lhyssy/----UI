/**
 * 搜索结果UI模块
 * 负责搜索结果的界面展示和UI交互
 */

/**
 * 更新筛选类型UI
 * @param {Array} filterTypes - 筛选类型数组
 * @param {Object} searchState - 搜索状态
 */
function updateFilterTypesUI(filterTypes, searchState) {
    const filterTagContainer = document.getElementById('filterTagContainer');
    if (!filterTagContainer) return;
    
    // 清空现有内容
    filterTagContainer.innerHTML = '';
    
    // 遍历筛选类型并创建DOM元素
    filterTypes.forEach(filter => {
        const filterTag = document.createElement('button');
        filterTag.className = `filter-tag ${filter.id === searchState.filter ? 'active' : ''}`;
        filterTag.dataset.filterId = filter.id;
        filterTag.innerHTML = `
            <div class="filter-icon">
                <i class="fas ${filter.icon} text-xs"></i>
            </div>
            <span>${filter.name}</span>
        `;
        
        // 添加点击事件
        filterTag.addEventListener('click', () => {
            // 更新当前筛选类型
            searchState.filter = filter.id;
            searchState.page = 1; // 重置页码
            
            // 更新UI状态
            document.querySelectorAll('.filter-tag').forEach(tag => {
                tag.classList.remove('active');
            });
            filterTag.classList.add('active');
            
            // 重新搜索
            if (window.searchResults && typeof window.searchResults.performSearch === 'function') {
                window.searchResults.performSearch(searchState.keyword);
            }
            
            // 显示提示
            showToast(`已筛选: ${filter.name}`, 'info');
        });
        
        // 添加到容器
        filterTagContainer.appendChild(filterTag);
    });
}

/**
 * 更新排序类型UI
 * @param {Array} sortTypes - 排序类型数组
 * @param {Object} searchState - 搜索状态
 */
function updateSortTypesUI(sortTypes, searchState) {
    const sortButtonContainer = document.getElementById('sortButtonContainer');
    if (!sortButtonContainer) return;
    
    // 清空现有内容
    sortButtonContainer.innerHTML = '';
    
    // 遍历排序类型并创建DOM元素
    sortTypes.forEach(sort => {
        const sortBtn = document.createElement('button');
        sortBtn.className = `sort-btn ${sort.id === searchState.sort ? 'active' : ''}`;
        sortBtn.dataset.sortId = sort.id;
        sortBtn.innerHTML = `
            <i class="fas ${sort.icon} mr-1 text-xs"></i> ${sort.name}
        `;
        
        // 添加点击事件
        sortBtn.addEventListener('click', () => {
            // 更新当前排序类型
            searchState.sort = sort.id;
            searchState.page = 1; // 重置页码
            
            // 更新UI状态
            document.querySelectorAll('.sort-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            sortBtn.classList.add('active');
            
            // 重新搜索
            if (window.searchResults && typeof window.searchResults.performSearch === 'function') {
                window.searchResults.performSearch(searchState.keyword);
            }
            
            // 显示提示
            showToast(`已按${sort.name}排序`, 'info');
        });
        
        // 添加到容器
        sortButtonContainer.appendChild(sortBtn);
    });
}

/**
 * 显示搜索结果UI
 */
function showSearchResultUI() {
    // 隐藏搜索历史
    const searchHistoryContainer = document.getElementById('searchHistoryContainer');
    if (searchHistoryContainer) {
        searchHistoryContainer.classList.add('hidden');
    }
    
    // 显示筛选和排序区域
    const filterContainer = document.getElementById('filterContainer');
    if (filterContainer) {
        filterContainer.classList.remove('hidden');
    }
    
    const sortContainer = document.getElementById('sortContainer');
    if (sortContainer) {
        sortContainer.classList.remove('hidden');
    }
    
    // 显示搜索结果区域
    const searchResultsContainer = document.getElementById('searchResultsContainer');
    if (searchResultsContainer) {
        searchResultsContainer.classList.remove('hidden');
    }
    
    // 隐藏无结果状态
    const emptyResultContainer = document.getElementById('emptyResultContainer');
    if (emptyResultContainer) {
        emptyResultContainer.classList.add('hidden');
    }
}

/**
 * 显示无结果状态
 */
function showEmptyResultState() {
    // 隐藏搜索结果区域
    const searchResultsContainer = document.getElementById('searchResultsContainer');
    if (searchResultsContainer) {
        searchResultsContainer.classList.add('hidden');
    }
    
    // 显示无结果状态
    const emptyResultContainer = document.getElementById('emptyResultContainer');
    if (emptyResultContainer) {
        emptyResultContainer.classList.remove('hidden');
    }
}

/**
 * 更新搜索结果UI
 * @param {Object} searchState - 搜索状态
 */
function updateSearchResultsUI(searchState) {
    const searchResultsList = document.getElementById('searchResultsList');
    if (!searchResultsList) return;
    
    // 如果是第一页，清空现有内容
    if (searchState.page === 1) {
        searchResultsList.innerHTML = '';
    }
    
    // 遍历搜索结果并创建DOM元素
    searchState.items.forEach(item => {
        // 创建结果项元素
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.dataset.itemId = item.id;
        resultItem.dataset.type = item.type;
        
        // 根据不同类型设置不同的HTML结构
        switch (item.type) {
            case 'product':
                resultItem.innerHTML = createProductResultHTML(item);
                break;
            case 'tutorial':
                resultItem.innerHTML = createTutorialResultHTML(item);
                break;
            case 'template':
                resultItem.innerHTML = createTemplateResultHTML(item);
                break;
            case 'article':
                resultItem.innerHTML = createArticleResultHTML(item);
                break;
            default:
                resultItem.innerHTML = createDefaultResultHTML(item);
                break;
        }
        
        // 添加点击事件
        resultItem.addEventListener('click', () => {
            showToast(`查看详情: ${item.title}`, 'info');
            // 这里可以跳转到详情页
            // window.location.href = `detail.html?id=${item.id}&type=${item.type}`;
        });
        
        // 添加到容器
        searchResultsList.appendChild(resultItem);
    });
    
    // 更新加载更多按钮状态
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        const hasMore = searchState.hasMore;
        loadMoreBtn.classList.toggle('hidden', !hasMore);
    }
}

/**
 * 创建农产品结果的HTML
 * @param {Object} item - 农产品数据
 * @returns {string} HTML字符串
 */
function createProductResultHTML(item) {
    return `
        <div class="relative">
            <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover">
            <div class="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded">农产品</div>
        </div>
        <div class="p-4">
            <h3 class="font-medium mb-1">${item.title}</h3>
            <p class="text-sm text-gray-600 mb-2">${item.description}</p>
            <div class="flex items-center text-xs text-gray-500">
                <span class="mr-3"><i class="fas fa-eye mr-1"></i> ${item.views}</span>
                <span><i class="fas fa-heart mr-1"></i> ${item.likes}</span>
            </div>
        </div>
    `;
}

/**
 * 创建教程结果的HTML
 * @param {Object} item - 教程数据
 * @returns {string} HTML字符串
 */
function createTutorialResultHTML(item) {
    return `
        <div class="p-4">
            <div class="flex justify-between">
                <span class="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">教程</span>
                <span class="text-xs text-gray-500">${item.date}</span>
            </div>
            <h3 class="font-medium mt-2 mb-1">${item.title}</h3>
            <p class="text-sm text-gray-600 mb-3">${item.description}</p>
            <div class="flex items-center text-xs">
                <div class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                    <i class="fas fa-user text-gray-500"></i>
                </div>
                <span class="text-gray-600">${item.author}</span>
                <div class="ml-auto flex items-center text-gray-500">
                    <span class="mr-3"><i class="fas fa-eye mr-1"></i> ${item.views}</span>
                    <span><i class="fas fa-thumbs-up mr-1"></i> ${item.likes}</span>
                </div>
            </div>
        </div>
    `;
}

/**
 * 创建模板结果的HTML
 * @param {Object} item - 模板数据
 * @returns {string} HTML字符串
 */
function createTemplateResultHTML(item) {
    // 创建模板预览图的HTML
    const imagesHTML = item.images.map(img => 
        `<img src="${img}" alt="模板预览" class="w-full h-20 object-cover rounded">`
    ).join('');
    
    return `
        <div class="grid grid-cols-3 gap-2 p-4">
            ${imagesHTML}
        </div>
        <div class="px-4 pb-4">
            <div class="flex justify-between mb-1">
                <h3 class="font-medium">${item.title}</h3>
                <span class="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded">模板</span>
            </div>
            <p class="text-sm text-gray-600 mb-2">${item.description}</p>
            <div class="flex items-center justify-between text-xs">
                <span class="text-blue-500">${item.isPremium ? '付费使用' : '免费使用'}</span>
                <span class="text-gray-500"><i class="fas fa-download mr-1"></i> ${item.downloads}次下载</span>
            </div>
        </div>
    `;
}

/**
 * 创建文章结果的HTML
 * @param {Object} item - 文章数据
 * @returns {string} HTML字符串
 */
function createArticleResultHTML(item) {
    return `
        <div class="p-4">
            <div class="flex items-start">
                <div class="w-16 h-16 bg-gray-100 rounded flex items-center justify-center mr-3 flex-shrink-0">
                    <i class="fas fa-file-alt text-xl text-gray-400"></i>
                </div>
                <div class="flex-1">
                    <div class="flex justify-between">
                        <span class="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded">文章</span>
                        <span class="text-xs text-gray-500">${item.date}</span>
                    </div>
                    <h3 class="font-medium mt-1 mb-1">${item.title}</h3>
                    <p class="text-sm text-gray-600 line-clamp-2">${item.description}</p>
                </div>
            </div>
        </div>
    `;
}

/**
 * 创建默认结果的HTML
 * @param {Object} item - 默认数据
 * @returns {string} HTML字符串
 */
function createDefaultResultHTML(item) {
    return `
        <div class="p-4">
            <h3 class="font-medium mb-1">${item.title}</h3>
            <p class="text-sm text-gray-600">${item.description}</p>
        </div>
    `;
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

// 为其他模块提供UI渲染函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateFilterTypesUI,
        updateSortTypesUI,
        showSearchResultUI,
        showEmptyResultState,
        updateSearchResultsUI
    };
} else {
    // 添加到全局对象
    window.searchResultsUI = {
        updateFilterTypesUI,
        updateSortTypesUI,
        showSearchResultUI,
        showEmptyResultState,
        updateSearchResultsUI
    };
} 