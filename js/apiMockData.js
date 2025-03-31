/**
 * API模拟数据模块
 * 提供各类模拟数据供API模块使用
 */

// 模拟数据
const mockData = {
    // 热门搜索标签
    hotSearchTags: [
        '特色农产品推广',
        '小红书爆款文案',
        '农产品视觉优化',
        '水果拍照构图',
        '微信公众号模板',
        '冬季蔬菜营销'
    ],
    
    // 搜索过滤类型
    filterTypes: [
        { id: 'all', name: '全部', icon: 'fa-th-large' },
        { id: 'product', name: '农产品', icon: 'fa-apple-alt' },
        { id: 'tutorial', name: '教程', icon: 'fa-book' },
        { id: 'template', name: '模板', icon: 'fa-image' },
        { id: 'article', name: '文章', icon: 'fa-file-alt' },
        { id: 'video', name: '视频', icon: 'fa-video' }
    ],
    
    // 排序类型
    sortTypes: [
        { id: 'relevance', name: '相关度', icon: 'fa-fire-alt' },
        { id: 'newest', name: '最新', icon: 'fa-clock' }
    ],
    
    // 模拟产品数据
    products: [
        {
            id: 'p001',
            type: 'product',
            title: '有机红富士苹果',
            description: '陕西洛川特产，生态种植，口感脆甜',
            image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            views: 2850,
            likes: 145,
            date: '2023-10-15'
        },
        {
            id: 'p002',
            type: 'product',
            title: '高山脐橙',
            description: '江西赣南特产，甜度高，果汁丰富',
            image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            views: 1560,
            likes: 98,
            date: '2023-10-20'
        },
        {
            id: 'p003',
            type: 'product',
            title: '有机紫薯',
            description: '富含花青素，营养丰富，口感绵软',
            image: 'https://images.unsplash.com/photo-1604549944235-3e5579b15cc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            views: 860,
            likes: 76,
            date: '2023-11-05'
        }
    ],
    
    // 模拟教程数据
    tutorials: [
        {
            id: 't001',
            type: 'tutorial',
            title: '如何拍摄苹果产品的高质量照片',
            description: '本教程将教您如何使用手机拍摄苹果的精美照片，让您的宣传图更有吸引力。',
            author: '助农摄影师',
            views: 1250,
            likes: 86,
            date: '2023-09-12'
        },
        {
            id: 't002',
            type: 'tutorial',
            title: '农产品短视频制作技巧',
            description: '从剧本编写到拍摄剪辑，一站式学习农产品短视频的创作要点。',
            author: '乡村创作者',
            views: 3460,
            likes: 212,
            date: '2023-10-18'
        }
    ],
    
    // 模拟模板数据
    templates: [
        {
            id: 'tpl001',
            type: 'template',
            title: '水果宣传海报模板集',
            description: '包含10套适合各类水果宣传的精美海报模板',
            images: [
                'https://via.placeholder.com/100x100?text=Template+1',
                'https://via.placeholder.com/100x100?text=Template+2',
                'https://via.placeholder.com/100x100?text=Template+3'
            ],
            downloads: 528,
            isPremium: false,
            date: '2023-08-25'
        }
    ],
    
    // 模拟文章数据
    articles: [
        {
            id: 'a001',
            type: 'article',
            title: '苹果产业发展趋势与销售策略分析',
            description: '本文分析了当前苹果产业面临的市场环境，并提出了有效的销售策略建议...',
            date: '2023-11-10'
        }
    ]
};

// 导出模拟数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        mockData
    };
} else {
    // 添加到全局对象
    window.apiMockData = {
        mockData
    };
} 