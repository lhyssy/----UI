/**
 * 图片画廊模块
 * 负责管理上传图片的画廊显示
 */

// 当页面加载完成时初始化画廊
document.addEventListener('DOMContentLoaded', () => {
    // 监听图片添加事件
    document.addEventListener('imageAdded', (e) => {
        // 如果有需要，可以在这里执行额外的处理
        updateGalleryUI();
    });
    
    // 监听图片移除事件
    document.addEventListener('imageRemoved', (e) => {
        // 如果有需要，可以在这里执行额外的处理
        updateGalleryUI();
    });
});

/**
 * 更新画廊
 * @param {Array} files - 上传的文件数组
 * @param {number} currentIndex - 当前选中的索引
 */
function updateGallery(files, currentIndex) {
    // 本地变量存储，避免直接依赖全局变量
    const uploadedFiles = files || (window.upload ? window.upload.getUploadedFiles() : []);
    const currentUploadIndex = currentIndex !== undefined ? 
        currentIndex : (window.upload ? window.upload.getCurrentIndex() : 0);
    
    updateGalleryUI(uploadedFiles, currentUploadIndex);
}

/**
 * 更新画廊UI
 * @param {Array} uploadedFiles - 上传的文件数组
 * @param {number} currentUploadIndex - 当前选中的索引
 */
function updateGalleryUI(uploadedFiles, currentUploadIndex) {
    const galleryContainer = document.getElementById('gallery-container');
    const noImagesText = document.getElementById('no-images-text');
    
    // 如果没有提供参数，尝试从全局获取
    if (!uploadedFiles && window.upload) {
        uploadedFiles = window.upload.getUploadedFiles();
    }
    
    if (!currentUploadIndex && window.upload) {
        currentUploadIndex = window.upload.getCurrentIndex();
    }
    
    if (!galleryContainer) return;
    
    // 清空现有内容
    galleryContainer.innerHTML = '';
    
    // 如果有上传的图片，隐藏"无图片"文本
    if (noImagesText) {
        if (uploadedFiles && uploadedFiles.length > 0) {
            noImagesText.classList.add('hidden');
        } else {
            noImagesText.classList.remove('hidden');
        }
    }
    
    // 如果没有图片或无法获取图片列表，直接返回
    if (!uploadedFiles || uploadedFiles.length === 0) {
        return;
    }
    
    // 遍历所有上传的文件
    uploadedFiles.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        if (index === currentUploadIndex) {
            galleryItem.classList.add('active');
        }
        
        // 创建图片元素
        const img = document.createElement('img');
        img.src = item.dataUrl;
        img.alt = `上传图片 ${index + 1}`;
        
        // 创建移除按钮
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = '×';
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // 防止事件冒泡到gallery-item
            e.preventDefault();
            
            // 如果有上传模块，使用其移除功能
            if (window.upload && typeof window.upload.removeImage === 'function') {
                window.upload.removeImage(index);
            } else {
                // 触发图片移除事件
                document.dispatchEvent(new CustomEvent('requestImageRemove', {
                    detail: { index: index }
                }));
            }
        });
        
        // 点击图片将其设为当前选中
        galleryItem.addEventListener('click', () => {
            // 如果有上传模块，使用其预览功能
            if (window.upload && typeof window.upload.showUploadPreview === 'function') {
                window.upload.showUploadPreview(index);
            } else {
                // 触发图片选中事件
                document.dispatchEvent(new CustomEvent('imageSelected', {
                    detail: { index: index }
                }));
            }
        });
        
        // 添加到画廊项
        galleryItem.appendChild(img);
        galleryItem.appendChild(removeBtn);
        
        // 添加到画廊容器
        galleryContainer.appendChild(galleryItem);
    });
}

/**
 * 获取画廊中的图片数量
 * @returns {number} 图片数量
 */
function getGalleryImageCount() {
    if (window.upload && window.upload.getUploadedFiles) {
        const files = window.upload.getUploadedFiles();
        return files ? files.length : 0;
    }
    
    // 尝试计算DOM中的图片数量
    const galleryContainer = document.getElementById('gallery-container');
    if (galleryContainer) {
        return galleryContainer.querySelectorAll('.gallery-item').length;
    }
    
    return 0;
}

/**
 * 清空画廊
 */
function clearGallery() {
    const galleryContainer = document.getElementById('gallery-container');
    const noImagesText = document.getElementById('no-images-text');
    
    if (galleryContainer) {
        galleryContainer.innerHTML = '';
    }
    
    if (noImagesText) {
        noImagesText.classList.remove('hidden');
    }
    
    // 触发画廊清空事件
    document.dispatchEvent(new CustomEvent('galleryCleared'));
}

// 导出画廊功能
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateGallery,
        updateGalleryUI,
        getGalleryImageCount,
        clearGallery
    };
} else {
    // 添加到全局对象
    window.gallery = {
        updateGallery,
        updateGalleryUI,
        getGalleryImageCount,
        clearGallery
    };
} 