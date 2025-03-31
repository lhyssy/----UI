/**
 * 上传处理和AI分析模块
 * 负责处理上传进度和AI分析
 */

// 当页面加载完成时初始化上传处理
document.addEventListener('DOMContentLoaded', () => {
    // 监听开始上传事件
    document.addEventListener('startUpload', (e) => {
        const { index } = e.detail;
        processUpload(index);
    });
});

/**
 * 处理上传
 * @param {number} index - 文件索引
 */
function processUpload(index) {
    // 获取上传的文件
    const files = window.upload ? window.upload.getUploadedFiles() : [];
    if (!files || !files[index]) {
        showToast('无法找到要上传的图片', 'error');
        return;
    }
    
    // 显示上传进度
    showUploadProgress(files[index]);
}

/**
 * 显示上传进度
 * @param {Object} fileData - 文件数据对象
 */
function showUploadProgress(fileData) {
    const progressBar = document.getElementById('upload-progress-bar');
    const progressContainer = document.getElementById('upload-progress-container');
    const uploadStatus = document.getElementById('upload-status');
    
    if (!progressBar || !progressContainer || !uploadStatus) return;
    
    // 显示进度容器
    progressContainer.classList.remove('hidden');
    
    // 设置初始状态
    uploadStatus.textContent = '准备上传...';
    progressBar.style.width = '0%';
    
    // 禁用按钮，防止重复操作
    const confirmButton = document.getElementById('confirm-button');
    const retakeButton = document.getElementById('retake-button');
    
    if (confirmButton) confirmButton.disabled = true;
    if (retakeButton) retakeButton.disabled = true;
    
    // 模拟上传进度
    simulateUpload(fileData, progressBar, uploadStatus);
}

/**
 * 模拟上传过程
 * @param {Object} fileData - 文件数据对象
 * @param {HTMLElement} progressBar - 进度条元素
 * @param {HTMLElement} uploadStatus - 状态文本元素
 */
function simulateUpload(fileData, progressBar, uploadStatus) {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // 更新状态
            uploadStatus.textContent = '上传完成，正在分析...';
            
            // 触发上传完成事件
            document.dispatchEvent(new CustomEvent('uploadComplete', {
                detail: { file: fileData.file, dataUrl: fileData.dataUrl }
            }));
            
            // 模拟AI分析
            simulateAIAnalysis(fileData, uploadStatus);
        }
        
        // 更新进度条
        progressBar.style.width = `${progress}%`;
        
        // 更新状态文本
        if (progress < 30) {
            uploadStatus.textContent = '上传中...';
        } else if (progress < 70) {
            uploadStatus.textContent = '处理图片...';
        } else if (progress < 100) {
            uploadStatus.textContent = '优化图像质量...';
        }
    }, 200);
}

/**
 * 模拟AI分析过程
 * @param {Object} fileData - 文件数据对象
 * @param {HTMLElement} uploadStatus - 状态文本元素
 */
function simulateAIAnalysis(fileData, uploadStatus) {
    // 设置文件为已上传状态
    fileData.uploaded = true;
    
    // 模拟AI分析的不同阶段
    uploadStatus.textContent = 'AI分析图像中...';
    
    setTimeout(() => {
        uploadStatus.textContent = '识别图像内容...';
    }, 1000);
    
    setTimeout(() => {
        uploadStatus.textContent = '生成关键描述...';
    }, 2000);
    
    setTimeout(() => {
        uploadStatus.textContent = '优化营销文案...';
    }, 3000);
    
    // 分析完成
    setTimeout(() => {
        uploadStatus.textContent = '分析完成！';
        
        // 存储分析结果
        const analysisResult = generateMockAnalysisResult(fileData);
        sessionStorage.setItem('lastUploadedImage', fileData.dataUrl);
        sessionStorage.setItem('lastAnalysisResult', JSON.stringify(analysisResult));
        
        // 触发分析完成事件
        document.dispatchEvent(new CustomEvent('analysisComplete', {
            detail: { 
                file: fileData.file, 
                dataUrl: fileData.dataUrl,
                result: analysisResult
            }
        }));
        
        // 显示成功消息
        showToast('图片上传并分析成功！', 'success');
        
        // 跳转到预览页面
        setTimeout(() => {
            window.location.href = 'preview.html';
        }, 1000);
    }, 4000);
}

/**
 * 生成模拟的分析结果
 * @param {Object} fileData - 文件数据对象
 * @returns {Object} 分析结果对象
 */
function generateMockAnalysisResult(fileData) {
    // 随机水果名称
    const fruits = ['苹果', '香蕉', '橙子', '梨', '桃子', '葡萄', '西瓜', '草莓', '蓝莓', '樱桃'];
    const fruit = fruits[Math.floor(Math.random() * fruits.length)];
    
    // 随机产地
    const origins = ['山东', '陕西', '江苏', '浙江', '福建', '广东', '云南', '海南', '四川', '新疆'];
    const origin = origins[Math.floor(Math.random() * origins.length)];
    
    // 随机品质特点
    const qualities = ['有机', '生态', '绿色', '无公害', '纯天然', '优质', '精选', '高端', '新鲜', '特级'];
    const quality = qualities[Math.floor(Math.random() * qualities.length)];
    
    // 构建分析结果
    return {
        productName: `${origin}${quality}${fruit}`,
        category: '水果',
        origin: origin,
        features: [
            `${quality}栽培，品质保证`,
            '无农药残留，安全健康',
            '新鲜采摘，产地直发',
            '口感鲜美，营养丰富'
        ],
        marketingPoints: [
            `${origin}特产，地理标志产品`,
            '严选${quality}等级，保证品质',
            '冷链配送，保鲜送达',
            '支持7天无理由退换'
        ],
        suggestedPrice: (Math.random() * 20 + 10).toFixed(2),
        timestamp: new Date().toISOString()
    };
}

/**
 * 显示Toast消息
 * @param {string} message - 消息内容
 * @param {string} type - 消息类型
 * @param {number} duration - 显示时长
 */
function showToast(message, type, duration) {
    if (window.utils && typeof window.utils.showToast === 'function') {
        return window.utils.showToast(message, type, duration);
    } else if (typeof window.showToast === 'function') {
        return window.showToast(message, type, duration);
    } else {
        console.log(message);
        alert(message);
    }
}

// 导出上传处理功能
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        processUpload,
        showUploadProgress,
        simulateUpload,
        simulateAIAnalysis,
        generateMockAnalysisResult
    };
} else {
    // 添加到全局对象
    window.uploadProcessor = {
        processUpload,
        showUploadProgress,
        simulateUpload,
        simulateAIAnalysis,
        generateMockAnalysisResult
    };
} 