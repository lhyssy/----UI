/**
 * 农产品上传数据传递模块
 * 负责收集上传页面的农产品信息和平台选择，并格式化为JSON传递给预览页面
 */

// 当文档加载完成时初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('数据传递模块已加载');
    
    // 判断当前页面
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'upload.html') {
        // 在上传页面，初始化"下一步"按钮监听
        initNextButtonListener();
    } else if (currentPage === 'preview.html') {
        // 在预览页面，从 localStorage 加载数据并显示
        loadProductDataToPreview();
        
        // 初始化JSON查看区域
        initJsonViewer();
        
        // 初始化AI优化按钮
        initAIOptimizationButton();
    }
});

/**
 * 初始化"下一步"按钮的点击事件监听
 */
function initNextButtonListener() {
    const nextButton = document.getElementById('next-button');
    
    if (!nextButton) {
        console.error('未找到"下一步"按钮');
        return;
    }
    
    console.log('已初始化"下一步"按钮监听器');
    
    // 监听按钮点击事件
    nextButton.addEventListener('click', function() {
        console.log('下一步按钮被点击');
        
        // 收集数据并保存到 localStorage
        collectAndSaveProductData();
    });
}

/**
 * 收集农产品信息和平台选择，保存为JSON格式
 */
function collectAndSaveProductData() {
    // 从表单获取农产品信息
    const productTitle = document.getElementById('product-title')?.value || '';
    const productIntro = document.getElementById('product-intro')?.value || '';
    const productFeatures = document.getElementById('product-features')?.value || '';
    const productTaste = document.getElementById('product-taste')?.value || '';
    const productNutrition = document.getElementById('product-nutrition')?.value || '';
    const productSuggestion = document.getElementById('product-suggestion')?.value || '';
    
    // 处理特点字段，将其转换为数组
    const featuresArray = parseFeaturesToArray(productFeatures);
    
    // 将数据结构化为JSON对象
    const productData = {
        product_info: {
            title: productTitle,
            introduction: productIntro,
            features: featuresArray,
            taste_experience: productTaste,
            nutritional_value: productNutrition,
            usage_suggestions: productSuggestion
        },
        // 默认平台为小红书，会在预览页面根据用户选择更新
        platform: "xiaohongshu"
    };
    
    console.log('收集的农产品数据:', productData);
    
    // 将数据保存到 localStorage (会在预览页面读取)
    localStorage.setItem('productData', JSON.stringify(productData));
}

/**
 * 将特点文本解析为数组
 * @param {string} featuresText - 特点文本
 * @returns {string[]} 特点数组
 */
function parseFeaturesToArray(featuresText) {
    if (!featuresText || typeof featuresText !== 'string') {
        return [];
    }
    
    // 尝试通过常见的分隔符分割文本
    // 首先检查是否有明显的分行
    if (featuresText.includes('\n')) {
        return featuresText.split('\n')
            .map(item => item.trim())
            .filter(item => item.length > 0);
    }
    
    // 检查是否使用逗号或分号分隔
    if (featuresText.includes('，') || featuresText.includes(',')) {
        return featuresText.split(/[,，]/)
            .map(item => item.trim())
            .filter(item => item.length > 0);
    }
    
    if (featuresText.includes('；') || featuresText.includes(';')) {
        return featuresText.split(/[;；]/)
            .map(item => item.trim())
            .filter(item => item.length > 0);
    }
    
    // 如果没有明显的分隔符，作为单个项返回
    return [featuresText.trim()];
}

/**
 * 在预览页面加载产品数据并更新平台选择
 */
function loadProductDataToPreview() {
    console.log('尝试加载产品数据到预览页面');
    
    // 从localStorage获取产品数据
    const productDataStr = localStorage.getItem('productData');
    
    if (!productDataStr) {
        console.warn('未找到产品数据');
        return;
    }
    
    try {
        // 解析产品数据
        const productData = JSON.parse(productDataStr);
        console.log('已加载产品数据:', productData);
        
        // 监听模板选择变化，更新platform字段
        initTemplateSelectionListener(productData);
        
        // 添加监听器，检测编辑按钮状态变化
        initEditButtonListener(productData);
        
        // 创建隐藏的文本框来存储JSON数据
        createDataStorageElement(productData);
        
        // 更新JSON查看区域(如果存在)
        updateJsonViewerContent(productData);
        
        // 使用产品数据填充预览页面
        fillPreviewContent(productData);
    } catch (error) {
        console.error('解析产品数据失败:', error);
    }
}

/**
 * 使用产品数据填充预览页面的内容
 * @param {Object} productData - 产品数据对象
 */
function fillPreviewContent(productData) {
    if (!productData || !productData.product_info) return;
    
    const info = productData.product_info;
    
    // 填充静态内容区域
    const staticContent = document.getElementById('staticContent');
    if (staticContent) {
        // 填充标题
        const titleElement = staticContent.querySelector('h2');
        if (titleElement) {
            titleElement.textContent = info.title || '产品标题';
        }
        
        // 填充简介
        const introElement = staticContent.querySelector('h2 + p');
        if (introElement) {
            introElement.textContent = info.introduction || '产品简介';
        }
        
        // 填充产品特点
        const featuresElement = staticContent.querySelector('.text-\\[\\#9aa338\\] + p');
        if (featuresElement && Array.isArray(info.features)) {
            featuresElement.textContent = info.features.join('\n');
        }
        
        // 填充口感体验
        const tasteElement = staticContent.querySelector('.text-orange-700 + p');
        if (tasteElement) {
            tasteElement.textContent = info.taste_experience || '';
        }
        
        // 填充营养价值
        const nutritionElement = staticContent.querySelector('.text-blue-700 + p');
        if (nutritionElement) {
            nutritionElement.textContent = info.nutritional_value || '';
        }
        
        // 填充食用建议
        const suggestionElement = staticContent.querySelector('.text-purple-700 + p');
        if (suggestionElement) {
            suggestionElement.textContent = info.usage_suggestions || '';
        }
    }
    
    // 填充可编辑区域
    const contentEditor = document.getElementById('contentEditor');
    if (contentEditor) {
        const editorTitle = contentEditor.querySelector('h2');
        if (editorTitle) {
            editorTitle.textContent = info.title || '产品标题';
        }
        
        const editorIntro = contentEditor.querySelector('h2 + p');
        if (editorIntro) {
            editorIntro.textContent = info.introduction || '产品简介';
        }
    }
}

/**
 * 初始化模板选择监听器
 * @param {Object} productData - 产品数据对象
 */
function initTemplateSelectionListener(productData) {
    // 找到所有模板选项
    const templateOptions = document.querySelectorAll('.template-option');
    
    if (!templateOptions || templateOptions.length === 0) {
        console.warn('未找到模板选项元素');
        return;
    }
    
    // 为每个模板选项添加点击事件
    templateOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 获取模板名称
            const templateText = option.querySelector('.text-white')?.textContent.trim() || '';
            
            // 根据模板名称设置platform值
            if (templateText.includes('小红书')) {
                productData.platform = 'xiaohongshu';
            } else if (templateText.includes('微信')) {
                productData.platform = 'weixin';
            } else if (templateText.includes('抖音')) {
                productData.platform = 'douyin';
            }
            
            console.log('已更新平台选择:', productData.platform);
            
            // 更新隐藏的数据存储元素
            updateDataStorageElement(productData);
            
            // 更新JSON查看区域(如果存在)
            updateJsonViewerContent(productData);
        });
    });
}

/**
 * 初始化编辑按钮监听器
 * @param {Object} productData - 产品数据对象
 */
function initEditButtonListener(productData) {
    const toggleEditBtn = document.getElementById('toggleEditBtn');
    
    if (!toggleEditBtn) {
        console.warn('未找到编辑按钮');
        return;
    }
    
    toggleEditBtn.addEventListener('click', function() {
        // 检查编辑区域是否可见
        const contentEditor = document.getElementById('contentEditor');
        const isEditorVisible = contentEditor && contentEditor.style.display !== 'none';
        
        if (isEditorVisible) {
            console.log('编辑区域已显示，更新JSON数据');
            // 更新 JSON 数据区域
            updateDataStorageElement(productData);
            
            // 更新JSON查看区域(如果存在)
            updateJsonViewerContent(productData);
        }
    });
}

/**
 * 创建隐藏的文本框来存储JSON数据
 * @param {Object} productData - 产品数据对象
 */
function createDataStorageElement(productData) {
    // 检查是否已存在该元素
    let dataStorage = document.getElementById('product-data-json');
    
    if (!dataStorage) {
        // 创建隐藏的textarea元素
        dataStorage = document.createElement('textarea');
        dataStorage.id = 'product-data-json';
        dataStorage.style.display = 'none';
        dataStorage.setAttribute('aria-hidden', 'true');
        document.body.appendChild(dataStorage);
    }
    
    // 填充JSON数据
    updateDataStorageElement(productData);
}

/**
 * 更新JSON数据存储元素
 * @param {Object} productData - 产品数据对象
 */
function updateDataStorageElement(productData) {
    const dataStorage = document.getElementById('product-data-json');
    
    if (dataStorage) {
        // 更新数据
        dataStorage.value = JSON.stringify(productData, null, 2);
        console.log('已更新JSON数据:', dataStorage.value);
        
        // 触发自定义事件，通知其他组件数据已更新
        document.dispatchEvent(new CustomEvent('productDataUpdated', {
            detail: { productData }
        }));
    }
}

/**
 * 初始化JSON查看区域的交互功能
 */
function initJsonViewer() {
    const toggleJsonBtn = document.getElementById('toggleJsonBtn');
    const jsonDataArea = document.getElementById('jsonDataArea');
    const jsonDataTextarea = document.getElementById('jsonDataTextarea');
    const updateJsonBtn = document.getElementById('updateJsonBtn');
    
    if (!toggleJsonBtn || !jsonDataArea || !jsonDataTextarea) {
        console.warn('未找到JSON查看区域元素');
        return;
    }
    
    // 切换JSON数据区域的显示/隐藏
    toggleJsonBtn.addEventListener('click', function() {
        const isHidden = jsonDataArea.classList.contains('hidden');
        
        if (isHidden) {
            jsonDataArea.classList.remove('hidden');
            toggleJsonBtn.querySelector('i.fas').classList.remove('fa-chevron-down');
            toggleJsonBtn.querySelector('i.fas').classList.add('fa-chevron-up');
            
            // 加载当前数据
            const dataStorage = document.getElementById('product-data-json');
            if (dataStorage && jsonDataTextarea) {
                jsonDataTextarea.value = dataStorage.value;
            }
        } else {
            jsonDataArea.classList.add('hidden');
            toggleJsonBtn.querySelector('i.fas').classList.remove('fa-chevron-up');
            toggleJsonBtn.querySelector('i.fas').classList.add('fa-chevron-down');
        }
    });
    
    // 更新JSON数据按钮
    if (updateJsonBtn) {
        updateJsonBtn.addEventListener('click', function() {
            if (!jsonDataTextarea.value.trim()) {
                alert('JSON数据不能为空！');
                return;
            }
            
            try {
                // 解析用户输入的JSON
                const updatedData = JSON.parse(jsonDataTextarea.value);
                
                // 验证数据结构
                if (!updatedData.product_info || !updatedData.platform) {
                    alert('JSON数据结构不正确！必须包含product_info和platform字段。');
                    return;
                }
                
                // 更新存储和UI
                updateDataStorageElement(updatedData);
                
                // 保存到localStorage
                localStorage.setItem('productData', JSON.stringify(updatedData));
                
                // 显示成功提示
                showUpdateSuccessMessage();
            } catch (error) {
                alert('JSON格式错误: ' + error.message);
            }
        });
    }
}

/**
 * 更新JSON查看区域的内容
 * @param {Object} productData - 产品数据对象
 */
function updateJsonViewerContent(productData) {
    const jsonDataTextarea = document.getElementById('jsonDataTextarea');
    
    if (jsonDataTextarea && productData) {
        jsonDataTextarea.value = JSON.stringify(productData, null, 2);
    }
}

/**
 * 显示更新成功消息
 */
function showUpdateSuccessMessage() {
    // 创建消息元素
    const messageElement = document.createElement('div');
    messageElement.textContent = '数据已更新';
    messageElement.className = 'update-message bg-green-500 text-white px-3 py-2 rounded-lg fixed bottom-20 left-1/2 transform -translate-x-1/2';
    messageElement.style.zIndex = '9999';
    document.body.appendChild(messageElement);
    
    // 淡出效果
    setTimeout(() => {
        messageElement.style.opacity = '0';
        messageElement.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.removeChild(messageElement);
        }, 500);
    }, 2000);
}

/**
 * 初始化AI优化按钮
 */
function initAIOptimizationButton() {
    const generateCopyBtn = document.getElementById('generateCopyBtn');
    const aiGeneratingContainer = document.getElementById('aiGeneratingContainer');
    const aiProgressBar = document.getElementById('aiProgressBar');
    
    if (!generateCopyBtn) {
        console.warn('未找到AI优化按钮');
        return;
    }
    
    generateCopyBtn.addEventListener('click', async function() {
        // 获取当前产品数据
        const dataStorage = document.getElementById('product-data-json');
        if (!dataStorage || !dataStorage.value) {
            showErrorMessage('未找到产品数据');
            return;
        }
        
        try {
            const productData = JSON.parse(dataStorage.value);
            
            // 显示生成中状态
            if (aiGeneratingContainer) {
                aiGeneratingContainer.classList.remove('hidden');
            }
            
            // 模拟进度条
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += 5;
                if (progress > 90) progress = 90; // 保留最后10%给实际完成时
                
                if (aiProgressBar) {
                    aiProgressBar.style.width = progress + '%';
                }
            }, 300);
            
            // 调用Coze工作流API
            try {
                const result = await callCozeWorkflow(productData);
                
                // 清除进度条动画
                clearInterval(progressInterval);
                
                // 设置进度条为100%
                if (aiProgressBar) {
                    aiProgressBar.style.width = '100%';
                }
                
                // 处理返回结果
                handleCozeResult(result);
                
                // 隐藏生成中状态
                setTimeout(() => {
                    if (aiGeneratingContainer) {
                        aiGeneratingContainer.classList.add('hidden');
                    }
                    
                    // 显示成功消息
                    showAISuccessMessage();
                }, 1000);
                
            } catch (error) {
                console.error('调用Coze工作流失败:', error);
                clearInterval(progressInterval);
                
                // 显示错误消息
                showErrorMessage('AI优化失败，请稍后重试');
                
                // 隐藏生成中状态
                if (aiGeneratingContainer) {
                    aiGeneratingContainer.classList.add('hidden');
                }
            }
            
        } catch (error) {
            console.error('解析产品数据失败:', error);
            showErrorMessage('数据格式错误');
        }
    });
}

/**
 * 调用Coze工作流
 * @param {Object} productData - 产品数据
 * @returns {Promise<Object>} - 工作流返回结果
 */
async function callCozeWorkflow(productData) {
    console.log('调用Coze工作流，参数:', productData);
    
    try {
        // 使用fetch API调用Coze工作流API
        const response = await fetch('https://api.coze.cn/v1/workflow/run', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer pat_az9rZGVfYKSvVvW9jgVaEHFD1qkJ76Djd9YRD2wgHBI5h5wQU0UfxjiyfITdGUVm'
            },
            body: JSON.stringify({
                workflow_id: '7497171481404244006',
                parameters: productData
            })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API响应错误:', errorText);
            throw new Error(`API调用失败: ${response.status} - ${errorText}`);
        }
        
        // 检查响应类型
        if (!response.body) {
            throw new Error('API返回的响应不包含可读流');
        }
        
        // 读取响应流
        const reader = response.body.getReader();
        let result = '';
        
        while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
                break;
            }
            
            // 将Uint8Array转换为字符串
            const chunk = new TextDecoder().decode(value);
            result += chunk;
            
            // 打印调试信息
            console.log('收到流数据块:', chunk.length, '字节');
        }
        
        console.log('完整响应数据:', result);
        
        // 尝试解析JSON响应
        try {
            const jsonResult = JSON.parse(result);
            return jsonResult;
        } catch (e) {
            // 如果不是JSON，则返回文本内容
            return { content: result };
        }
        
    } catch (error) {
        console.error('Coze API调用失败:', error);
        throw error;
    }
}

/**
 * 处理Coze工作流返回的结果
 * @param {Object} result - Coze工作流返回的结果
 */
function handleCozeResult(result) {
    console.log('处理Coze工作流返回结果:', result);
    
    if (!result) {
        console.error('无效的Coze工作流返回结果');
        return;
    }
    
    // 确定内容来源
    let content = '';
    
    if (typeof result === 'string') {
        // 如果返回的是字符串
        content = result;
    } else if (result.content) {
        // 如果返回的对象有content字段
        content = result.content;
    } else if (result.response) {
        // 如果返回的对象有response字段
        content = result.response;
    } else if (result.data && result.data.content) {
        // 如果返回的对象有data.content字段
        content = result.data.content;
    } else {
        // 如果找不到内容，尝试将整个结果转为字符串
        try {
            content = JSON.stringify(result, null, 2);
        } catch (e) {
            console.error('无法解析工作流返回结果:', e);
            return;
        }
    }
    
    if (!content) {
        console.error('无法提取Coze工作流返回内容');
        return;
    }
    
    // 获取内容编辑区域
    const contentEditor = document.getElementById('contentEditor');
    const staticContent = document.getElementById('staticContent');
    
    if (!contentEditor || !staticContent) {
        console.error('未找到内容编辑区域');
        return;
    }
    
    // 显示编辑区域，隐藏静态内容
    contentEditor.style.display = 'block';
    staticContent.style.display = 'none';
    
    // 将返回内容处理为HTML格式
    const formattedContent = formatCozeContent(content);
    
    // 将Coze返回的内容填充到编辑区域
    contentEditor.innerHTML = formattedContent;
    
    // 显示编辑工具栏
    const editorToolbar = document.getElementById('editorToolbar');
    if (editorToolbar) {
        editorToolbar.classList.remove('hidden');
    }
}

/**
 * 将Coze返回的内容格式化为HTML
 * @param {string} content - Coze返回的文本内容
 * @returns {string} - 格式化后的HTML内容
 */
function formatCozeContent(content) {
    // 如果内容已经是HTML，直接返回
    if (content.trim().startsWith('<') && content.includes('</')) {
        return content;
    }
    
    // 将换行符转换为<br>标签
    let html = content.replace(/\n/g, '<br>');
    
    // 创建基本的结构
    return `
        <div class="mb-4">
            <h2 class="text-lg font-bold mb-2">AI优化后的文案</h2>
            <p class="text-sm text-gray-700 leading-relaxed">
                ${html}
            </p>
        </div>
    `;
}

/**
 * 显示错误消息
 * @param {string} message - 错误消息
 */
function showErrorMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = 'error-message bg-red-500 text-white px-3 py-2 rounded-lg fixed bottom-20 left-1/2 transform -translate-x-1/2';
    messageElement.style.zIndex = '9999';
    document.body.appendChild(messageElement);
    
    // 淡出效果
    setTimeout(() => {
        messageElement.style.opacity = '0';
        messageElement.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.removeChild(messageElement);
        }, 500);
    }, 2000);
}

/**
 * 显示AI优化成功消息
 */
function showAISuccessMessage() {
    const messageElement = document.createElement('div');
    messageElement.textContent = 'AI优化完成';
    messageElement.className = 'success-message bg-indigo-500 text-white px-3 py-2 rounded-lg fixed bottom-20 left-1/2 transform -translate-x-1/2';
    messageElement.style.zIndex = '9999';
    document.body.appendChild(messageElement);
    
    // 淡出效果
    setTimeout(() => {
        messageElement.style.opacity = '0';
        messageElement.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.removeChild(messageElement);
        }, 500);
    }, 2000);
} 