/**
 * 禾语智宣 - 图片上传与预览功能增强
 * 本文件为upload.html页面提供移动端适配与增强功能
 */

(function () {
    // 全局变量
    let uploadedImages = [];
    const MAX_IMAGES = 9;
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    let dragSrcEl = null;
    let isMobile = window.innerWidth < 768;

    // DOM元素
    let fileUpload;
    let uploadZone;
    let previewSection;
    let previewGrid;
    let uploadStatus;
    let nextStepBtn;
    let aiEnhanceSwitch;
    let cameraButton;
    let albumButton;

    // 初始化函数
    function init() {
        // 获取DOM元素
        fileUpload = document.getElementById('file-upload');
        uploadZone = document.getElementById('upload-zone');
        previewSection = document.querySelector('.preview-section');
        previewGrid = document.getElementById('image-preview-grid');
        uploadStatus = document.querySelector('.upload-status');
        nextStepBtn = document.getElementById('next-step');
        aiEnhanceSwitch = document.getElementById('ai-enhance-switch');
        cameraButton = document.querySelector('.camera-button');
        albumButton = document.querySelector('.album-button');

        // 初始化移动端交互增强
        initMobileInteractions();

        // 初始化响应式布局更新
        updateResponsiveLayout();

        // 绑定事件
        bindEvents();

        // 恢复之前的上传状态（如果有）
        restoreUploadState();
    }

    // 初始化移动端交互增强
    function initMobileInteractions() {
        // 监听键盘事件来调整布局
        window.addEventListener('resize', function () {
            isMobile = window.innerWidth < 768;
            updateResponsiveLayout();
        });

        // 处理iOS键盘弹出
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            document.addEventListener('focusin', function (e) {
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                    document.body.classList.add('keyboard-open');
                }
            });
            document.addEventListener('focusout', function (e) {
                document.body.classList.remove('keyboard-open');
            });
        }

        // 监听屏幕方向变化
        window.addEventListener('orientationchange', function () {
            setTimeout(updateResponsiveLayout, 300);
        });
    }

    // 更新响应式布局
    function updateResponsiveLayout() {
        if (isMobile) {
            // 手机端优化
            previewGrid.className = 'grid grid-cols-2 gap-3';
            uploadZone.classList.add('p-4');
            uploadZone.classList.remove('p-8');
        } else {
            // 桌面端优化
            previewGrid.className = 'grid grid-cols-4 gap-4';
            uploadZone.classList.add('p-8');
            uploadZone.classList.remove('p-4');
        }
    }

    // 绑定事件
    function bindEvents() {
        // 拖拽上传相关事件
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadZone.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });

        // 高亮拖拽区域
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadZone.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadZone.addEventListener(eventName, unhighlight, false);
        });

        // 处理文件拖拽
        uploadZone.addEventListener('drop', handleDrop, false);

        // 点击上传区域或按钮时触发文件选择
        uploadZone.addEventListener('click', () => fileUpload.click());
        cameraButton.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isMobile) {
                fileUpload.setAttribute('capture', 'environment');
            }
            fileUpload.click();
        });

        albumButton.addEventListener('click', (e) => {
            e.stopPropagation();
            fileUpload.removeAttribute('capture');
            fileUpload.click();
        });

        // 文件选择事件
        fileUpload.addEventListener('change', handleFiles, false);

        // AI增强开关事件
        aiEnhanceSwitch.addEventListener('change', function () {
            localStorage.setItem('aiEnhance', this.checked);

            // 如果有图片且开关打开，模拟AI增强效果
            if (this.checked && uploadedImages.length > 0) {
                simulateAIEnhancement();
            }
        });

        // 下一步按钮点击事件
        nextStepBtn.addEventListener('click', function () {
            if (uploadedImages.length > 0) {
                // 保存上传的图片到本地存储，以便在下一页使用
                localStorage.setItem('uploadedImages', JSON.stringify(uploadedImages));

                // 显示成功消息
                showSuccessMessage('图片上传成功！正在前往下一步...');

                // 跳转到预览页面
                setTimeout(() => {
                    window.location.href = 'preview.html';
                }, 1000);
            }
        });
    }

    // 阻止默认行为
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // 高亮上传区域
    function highlight() {
        uploadZone.classList.add('highlight');
    }

    // 取消高亮上传区域
    function unhighlight() {
        uploadZone.classList.remove('highlight');
    }

    // 处理拖放的文件
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFileUpload(files);
    }

    // 处理选择的文件
    function handleFiles() {
        const files = this.files;
        handleFileUpload(files);
    }

    // 处理文件上传
    function handleFileUpload(files) {
        if (files.length === 0) return;

        // 检查是否超过最大图片数量
        if (uploadedImages.length + files.length > MAX_IMAGES) {
            showErrorMessage(`最多只能上传${MAX_IMAGES}张图片`);
            return;
        }

        // 处理每个文件
        Array.from(files).forEach(file => {
            // 检查文件类型
            if (!file.type.match('image.*')) {
                showErrorMessage('只能上传图片文件');
                return;
            }

            // 检查文件大小
            if (file.size > MAX_FILE_SIZE) {
                showErrorMessage('图片大小不能超过10MB');
                return;
            }

            // 读取文件并创建预览
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function (e) {
                const imageData = {
                    id: Date.now() + Math.random().toString(36).substr(2, 9),
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    src: e.target.result,
                    enhanced: false
                };

                uploadedImages.push(imageData);
                createImagePreview(imageData);
                updateUploadStatus();
                saveUploadState();

                // 如果AI增强开关打开，模拟增强效果
                if (aiEnhanceSwitch.checked) {
                    simulateAIEnhancement();
                }
            };
        });
    }

    // 创建图片预览元素
    function createImagePreview(imageData) {
        // 显示预览区域
        previewSection.classList.remove('hidden');

        // 创建预览容器
        const container = document.createElement('div');
        container.className = 'image-preview-container relative bg-white rounded-lg overflow-hidden shadow-sm';
        container.dataset.id = imageData.id;
        container.draggable = true;

        // 添加拖拽事件
        container.addEventListener('dragstart', handleDragStart, false);
        container.addEventListener('dragenter', handleDragEnter, false);
        container.addEventListener('dragover', handleDragOver, false);
        container.addEventListener('dragleave', handleDragLeave, false);
        container.addEventListener('drop', handlePreviewDrop, false);
        container.addEventListener('dragend', handleDragEnd, false);

        // 添加触摸事件（移动端）
        if ('ontouchstart' in window) {
            container.addEventListener('touchstart', handleTouchStart, false);
            container.addEventListener('touchmove', handleTouchMove, false);
            container.addEventListener('touchend', handleTouchEnd, false);
        }

        // 创建图片元素
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'aspect-w-1 aspect-h-1 w-full';

        const img = document.createElement('img');
        img.src = imageData.src;
        img.className = 'w-full h-full object-cover';
        img.alt = imageData.name;
        img.loading = 'lazy';

        imgWrapper.appendChild(img);
        container.appendChild(imgWrapper);

        // 添加删除按钮
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md transform transition-transform hover:scale-110';
        deleteBtn.innerHTML = '<i class="fas fa-times text-xs"></i>';
        deleteBtn.addEventListener('click', function () {
            removeImage(imageData.id);
        });

        container.appendChild(deleteBtn);

        // 添加增强标签（如果已增强）
        if (imageData.enhanced) {
            const enhancedBadge = document.createElement('div');
            enhancedBadge.className = 'absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-sm';
            enhancedBadge.innerHTML = '<i class="fas fa-magic mr-1"></i>已增强';
            container.appendChild(enhancedBadge);
        }

        // 添加到预览网格
        previewGrid.appendChild(container);
    }

    // 拖拽开始处理函数
    function handleDragStart(e) {
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', this.dataset.id);
        this.classList.add('dragging');
    }

    // 拖拽进入处理函数
    function handleDragEnter(e) {
        this.classList.add('active');
    }

    // 拖拽悬停处理函数
    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    // 拖拽离开处理函数
    function handleDragLeave(e) {
        this.classList.remove('active');
    }

    // 拖拽放置处理函数
    function handlePreviewDrop(e) {
        e.stopPropagation();

        if (dragSrcEl !== this) {
            const draggedId = e.dataTransfer.getData('text/plain');
            const targetId = this.dataset.id;

            // 交换元素位置
            swapImages(draggedId, targetId);
        }

        return false;
    }

    // 拖拽结束处理函数
    function handleDragEnd(e) {
        // 移除所有拖拽相关的类
        document.querySelectorAll('.image-preview-container').forEach(item => {
            item.classList.remove('active', 'dragging');
        });
    }

    // 触摸开始处理函数（移动端拖拽）
    let touchStartX, touchStartY, touchEl;

    function handleTouchStart(e) {
        if (e.touches.length !== 1) return;

        touchEl = this;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;

        // 为长按设置一个延时
        this.longPressTimer = setTimeout(() => {
            this.classList.add('dragging');
            showSuccessMessage('拖动调整顺序');
        }, 500);
    }

    // 触摸移动处理函数
    function handleTouchMove(e) {
        if (!touchEl || !touchEl.classList.contains('dragging')) return;

        const touch = e.touches[0];
        const currentX = touch.clientX;
        const currentY = touch.clientY;

        // 计算移动距离
        const deltaX = currentX - touchStartX;
        const deltaY = currentY - touchStartY;

        // 设置元素位置
        touchEl.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        touchEl.style.zIndex = 1000;

        // 检测是否悬停在其他图片预览元素上
        const elementsBelow = document.elementsFromPoint(currentX, currentY);
        let dropTarget = null;

        for (let i = 0; i < elementsBelow.length; i++) {
            if (elementsBelow[i].classList.contains('image-preview-container') &&
                elementsBelow[i] !== touchEl) {
                dropTarget = elementsBelow[i];
                break;
            }
        }

        // 清除所有高亮
        document.querySelectorAll('.image-preview-container').forEach(item => {
            item.classList.remove('active');
        });

        // 高亮当前悬停元素
        if (dropTarget) {
            dropTarget.classList.add('active');
        }
    }

    // 触摸结束处理函数
    function handleTouchEnd(e) {
        clearTimeout(this.longPressTimer);

        if (!touchEl || !touchEl.classList.contains('dragging')) return;

        const touch = e.changedTouches[0];
        const currentX = touch.clientX;
        const currentY = touch.clientY;

        // 清除变换样式
        touchEl.style.transform = '';
        touchEl.style.zIndex = '';
        touchEl.classList.remove('dragging');

        // 检测拖放目标
        const elementsBelow = document.elementsFromPoint(currentX, currentY);
        let dropTarget = null;

        for (let i = 0; i < elementsBelow.length; i++) {
            if (elementsBelow[i].classList.contains('image-preview-container') &&
                elementsBelow[i] !== touchEl) {
                dropTarget = elementsBelow[i];
                break;
            }
        }

        // 如果有有效的拖放目标，交换位置
        if (dropTarget) {
            swapImages(touchEl.dataset.id, dropTarget.dataset.id);
        }

        // 清除所有高亮
        document.querySelectorAll('.image-preview-container').forEach(item => {
            item.classList.remove('active');
        });

        touchEl = null;
    }

    // 交换图片位置
    function swapImages(draggedId, targetId) {
        // 查找图片在数组中的索引
        const draggedIndex = uploadedImages.findIndex(img => img.id === draggedId);
        const targetIndex = uploadedImages.findIndex(img => img.id === targetId);

        if (draggedIndex !== -1 && targetIndex !== -1) {
            // 交换数组中的位置
            [uploadedImages[draggedIndex], uploadedImages[targetIndex]] =
                [uploadedImages[targetIndex], uploadedImages[draggedIndex]];

            // 保存状态
            saveUploadState();

            // 重新渲染预览区域
            refreshImagePreviews();
        }
    }

    // 刷新图片预览区域
    function refreshImagePreviews() {
        // 清空预览网格
        previewGrid.innerHTML = '';

        // 重新创建所有预览
        uploadedImages.forEach(imageData => {
            createImagePreview(imageData);
        });
    }

    // 移除图片
    function removeImage(id) {
        // 在数组中移除图片
        uploadedImages = uploadedImages.filter(img => img.id !== id);

        // 移除图片预览元素
        const container = document.querySelector(`.image-preview-container[data-id="${id}"]`);
        if (container) {
            // 添加消失动画
            container.style.transition = 'all 0.3s ease';
            container.style.transform = 'scale(0.8)';
            container.style.opacity = '0';

            // 动画完成后移除元素
            setTimeout(() => {
                container.remove();

                // 如果没有图片了，隐藏预览区域
                if (uploadedImages.length === 0) {
                    previewSection.classList.add('hidden');
                }
            }, 300);
        }

        // 更新上传状态
        updateUploadStatus();
        saveUploadState();
    }

    // 更新上传状态
    function updateUploadStatus() {
        uploadStatus.textContent = `已上传 ${uploadedImages.length}/${MAX_IMAGES}`;

        // 更新下一步按钮状态
        if (uploadedImages.length > 0) {
            nextStepBtn.classList.remove('opacity-50', 'pointer-events-none');
        } else {
            nextStepBtn.classList.add('opacity-50', 'pointer-events-none');
        }
    }

    // 模拟AI增强效果
    function simulateAIEnhancement() {
        // 找到未增强的图片
        const unenhancedImages = uploadedImages.filter(img => !img.enhanced);

        if (unenhancedImages.length === 0) return;

        // 显示加载消息
        showSuccessMessage('AI正在增强图片质量...');

        // 模拟增强延迟
        setTimeout(() => {
            unenhancedImages.forEach(img => {
                // 标记为已增强
                img.enhanced = true;

                // 实际项目中，这里应该发送请求到后端进行图片增强处理
                // 这里仅作模拟，实际不修改图片
            });

            // 刷新预览以显示增强标签
            refreshImagePreviews();
            saveUploadState();

            // 显示完成消息
            showSuccessMessage('图片增强完成！');
        }, 1500);
    }

    // 保存上传状态到本地存储
    function saveUploadState() {
        localStorage.setItem('uploadState', JSON.stringify({
            images: uploadedImages,
            aiEnhance: aiEnhanceSwitch.checked
        }));
    }

    // 恢复上传状态
    function restoreUploadState() {
        const state = localStorage.getItem('uploadState');
        if (state) {
            try {
                const parsedState = JSON.parse(state);

                // 恢复图片
                if (parsedState.images && parsedState.images.length > 0) {
                    uploadedImages = parsedState.images;
                    refreshImagePreviews();
                    updateUploadStatus();
                }

                // 恢复AI增强开关状态
                if (parsedState.aiEnhance !== undefined) {
                    aiEnhanceSwitch.checked = parsedState.aiEnhance;
                }

            } catch (e) {
                console.error('恢复上传状态失败:', e);
            }
        }
    }

    // 显示错误消息
    function showErrorMessage(message) {
        const toast = document.createElement('div');
        toast.className = 'error-toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // 显示成功消息
    function showSuccessMessage(message) {
        const toast = document.createElement('div');
        toast.className = 'success-toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // 当文档加载完成时初始化
    document.addEventListener('DOMContentLoaded', init);
})(); 