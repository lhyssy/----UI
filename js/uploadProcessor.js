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
            uploadStatus.textContent = '上传完成';
            
            // 触发上传完成事件
            document.dispatchEvent(new CustomEvent('uploadComplete', {
                detail: { file: fileData.file, dataUrl: fileData.dataUrl }
            }));
            
            // 设置文件为已上传状态
            fileData.uploaded = true;
            
            // 存储上传的图片数据，但不生成模拟分析结果
            sessionStorage.setItem('lastUploadedImage', fileData.dataUrl);
            
            // 显示成功消息
            showToast('图片上传成功！', 'success');
            
            // 跳转到预览页面
            setTimeout(() => {
                window.location.href = 'preview.html';
            }, 1000);
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
        simulateUpload
    };
} else {
    // 添加到全局对象
    window.uploadProcessor = {
        processUpload,
        showUploadProgress,
        simulateUpload
    };
} 