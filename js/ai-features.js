/**
 * 助农宣传 - AI功能模块
 * 包含AI识别、生成和优化功能
 */

// AI功能配置
const AI_CONFIG = {
    // 农产品识别信息
    recognition: {
        // 支持识别的农产品类别
        categories: [
            { name: '水果', count: 120 },
            { name: '蔬菜', count: 150 },
            { name: '谷物', count: 40 },
            { name: '坚果', count: 30 },
            { name: '菌类', count: 25 },
            { name: '茶叶', count: 20 }
        ],
        // 识别参数
        params: {
            minConfidence: 0.7,     // 最低置信度
            enhanceDetail: true,    // 增强细节
            classifyVariety: true   // 分类品种
        }
    },
    
    // 文本生成参数
    textGeneration: {
        maxLength: 500,             // a最大生成长度
        creativity: 0.7,            // 创造性 (0-1)
        tone: 'professional',       // 语调: professional, friendly, enthusiastic
        highlightFeatures: true,    // 突出产品特点
        includeOrigin: true,        // 包含产地信息
        includeBenefits: true       // 包含健康益处
    },
    
    // 图像增强参数
    imageEnhancement: {
        colorCorrection: true,      // 颜色校正
        contrastEnhancement: true,  // 对比度增强
        sharpening: true,           // 锐化
        noiseReduction: true,       // 降噪
        backgroundRemoval: false,   // 背景移除
        resizeOutput: true,         // 调整输出尺寸
        targetAspectRatio: '4:3'    // 目标宽高比
    }
};

/**
 * 初始化AI功能
 */
function initAIFeatures() {
    console.log('AI功能初始化中...');
    
    // 检测页面中的AI元素并添加功能
    initAIComponents();
    
    // 初始化AI建议
    initAISuggestions();
    
    console.log('AI功能初始化完成');
}

/**
 * 初始化页面中的AI组件
 */
function initAIComponents() {
    // 识别农产品种类图标
    const categoryIcons = {
        '水果': 'fa-apple-alt',
        '蔬菜': 'fa-carrot',
        '谷物': 'fa-wheat',
        '坚果': 'fa-seedling',
        '菌类': 'fa-leaf',
        '茶叶': 'fa-mug-hot'
    };
    
    // 添加AI识别能力标签
    const aiCapabilitiesContainer = document.querySelector('.ai-capabilities');
    if (aiCapabilitiesContainer) {
        let html = '';
        
        AI_CONFIG.recognition.categories.forEach(category => {
            const icon = categoryIcons[category.name] || 'fa-leaf';
            html += `
                <div class="ai-capability-item">
                    <i class="fas ${icon}"></i>
                    <span>${category.name} (${category.count}种)</span>
                </div>
            `;
        });
        
        aiCapabilitiesContainer.innerHTML = html;
    }
}

/**
 * 初始化AI建议功能
 */
function initAISuggestions() {
    // 在适当的地方显示AI建议
    const suggestionContainers = document.querySelectorAll('.ai-suggestion-container');
    suggestionContainers.forEach(container => {
        const type = container.getAttribute('data-suggestion-type');
        
        switch(type) {
            case 'photo':
                createPhotoSuggestion(container);
                break;
            case 'content':
                createContentSuggestion(container);
                break;
            case 'marketing':
                createMarketingSuggestion(container);
                break;
        }
    });
}

/**
 * 创建拍照建议
 * @param {HTMLElement} container - 容器元素
 */
function createPhotoSuggestion(container) {
    const suggestions = [
        '使用自然光拍摄，突出农产品真实色彩',
        '多角度拍摄，展示产品特点和优势',
        '保持镜头稳定，避免模糊',
        '使用干净的背景，突出产品本身',
        '适当展示产品的尺寸和规格'
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    
    container.innerHTML = `
        <div class="ai-suggestion">
            <div class="flex items-center mb-2">
                <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
                <h4 class="font-medium text-sm">拍照建议</h4>
            </div>
            <p class="text-xs text-gray-600">${randomSuggestion}</p>
        </div>
    `;
}

/**
 * 创建内容建议
 * @param {HTMLElement} container - 容器元素
 */
function createContentSuggestion(container) {
    const suggestions = [
        '添加产地信息，提高消费者信任度',
        '突出有机无公害等特点，吸引健康消费群体',
        '描述口感和新鲜度，提高购买欲望',
        '添加合适的季节性描述，增强时效性',
        '强调特有的种植环境或工艺，凸显独特性'
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    
    container.innerHTML = `
        <div class="ai-suggestion">
            <div class="flex items-center mb-2">
                <i class="fas fa-pen-fancy text-blue-500 mr-2"></i>
                <h4 class="font-medium text-sm">内容建议</h4>
            </div>
            <p class="text-xs text-gray-600">${randomSuggestion}</p>
        </div>
    `;
}

/**
 * 创建营销建议
 * @param {HTMLElement} container - 容器元素
 */
function createMarketingSuggestion(container) {
    const suggestions = [
        '使用限时优惠提高转化率',
        '添加客户评价增加信任度',
        '突出产品的独特卖点',
        '针对节日和季节调整营销重点',
        '添加适当的健康益处说明'
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    
    container.innerHTML = `
        <div class="ai-suggestion">
            <div class="flex items-center mb-2">
                <i class="fas fa-bullhorn text-purple-500 mr-2"></i>
                <h4 class="font-medium text-sm">营销建议</h4>
            </div>
            <p class="text-xs text-gray-600">${randomSuggestion}</p>
        </div>
    `;
}

/**
 * 识别农产品图片
 * @param {File|Blob|String} image - 图片文件、Blob对象或图片URL
 * @returns {Promise} - 识别结果的Promise对象
 */
function recognizeAgriculturalProduct(image) {
    return new Promise((resolve, reject) => {
        // 这里是模拟识别过程，实际应用中应调用后端API
        console.log('正在识别农产品...');
        
        setTimeout(() => {
            // 模拟识别结果
            const results = {
                success: true,
                product: {
                    name: '红富士苹果',
                    category: '水果',
                    confidence: 0.95,
                    features: ['红色', '圆形', '新鲜'],
                    possibleOrigin: ['山东烟台', '陕西延安'],
                    estimatedQuality: '优质',
                    nutritionInfo: {
                        calories: '52大卡/100g',
                        vitamins: ['维生素C', '维生素A'],
                        minerals: ['钾', '镁']
                    }
                },
                suggestions: {
                    marketing: '突出脆甜多汁、富含维生素的特点',
                    pricing: '当前市场价格区间: 8-15元/斤',
                    improvement: '建议展示切开的果肉，突出口感特点'
                }
            };
            
            resolve(results);
        }, 1500);
    });
}

/**
 * 生成农产品宣传文案
 * @param {Object} productInfo - 产品信息对象
 * @param {String} style - 文案风格: formal, casual, enthusiastic
 * @returns {Promise} - 文案生成结果的Promise对象
 */
function generateMarketingContent(productInfo, style = 'enthusiastic') {
    return new Promise((resolve, reject) => {
        // 这里是模拟文案生成过程，实际应用中应调用后端API
        console.log('正在生成宣传文案...');
        
        setTimeout(() => {
            // 模拟生成结果
            const content = {
                title: `${productInfo.name} - 新鲜采摘直达您家`,
                description: `来自${productInfo.possibleOrigin[0]}的优质${productInfo.name}，果肉脆甜多汁，富含维生素和矿物质。我们坚持无农药种植，确保每一口都健康安心。现在下单，48小时内新鲜直达您家！`,
                sellingPoints: [
                    '精选优质品种，保证新鲜口感',
                    '严格品控，保证无农药残留',
                    '冷链直达，锁住营养与新鲜'
                ],
                suggestedTags: ['有机水果', '新鲜直达', '健康生活'],
                callToAction: '限时特惠，点击购买'
            };
            
            resolve(content);
        }, 2000);
    });
}

/**
 * 增强农产品图片
 * @param {File|Blob|String} image - 图片文件、Blob对象或图片URL
 * @param {Object} options - 增强选项
 * @returns {Promise} - 图片增强结果的Promise对象
 */
function enhanceProductImage(image, options = {}) {
    return new Promise((resolve, reject) => {
        // 这里是模拟图片增强过程，实际应用中应调用后端API
        console.log('正在增强图片...');
        
        // 合并默认参数与传入的参数
        const enhancementOptions = Object.assign({}, AI_CONFIG.imageEnhancement, options);
        
        setTimeout(() => {
            // 模拟增强结果
            // 实际情况下，应返回处理后的图片URL或Blob对象
            resolve({
                success: true,
                enhancedImageUrl: 'https://example.com/enhanced-image.jpg',
                appliedEnhancements: Object.keys(enhancementOptions).filter(key => enhancementOptions[key] === true),
                beforeAfterComparison: 'https://example.com/before-after.jpg'
            });
        }, 2000);
    });
}

// 在页面加载时初始化AI功能
document.addEventListener('DOMContentLoaded', initAIFeatures);

// 导出AI功能
window.AI = {
    recognize: recognizeAgriculturalProduct,
    generateContent: generateMarketingContent,
    enhanceImage: enhanceProductImage
}; 