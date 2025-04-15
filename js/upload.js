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
    let previewArea;
    let previewGrid;
    let imageCount;
    let nextButton;
    let uploadProgress;
    let totalProgress;
    let uploadPercentage;

    // 初始化函数
    function init() {
        console.log('Initializing upload.js');

        // 获取DOM元素 - 更新选择器以匹配HTML中的实际元素
        fileUpload = document.getElementById('file-upload');
        uploadZone = document.getElementById('upload-zone');
        previewArea = document.getElementById('preview-area');
        previewGrid = document.getElementById('image-previews');
        imageCount = document.getElementById('image-count');
        nextButton = document.getElementById('next-button');
        uploadProgress = document.getElementById('upload-progress');
        totalProgress = document.getElementById('total-progress');
        uploadPercentage = document.getElementById('upload-percentage');

        if (!fileUpload) {
            console.error('未找到file-upload元素');
            return;
        }

        if (!uploadZone) {
            console.error('未找到upload-zone元素');
            return;
        }

        console.log('DOM元素已找到，开始绑定事件');

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
        if (!previewGrid) return;

        if (isMobile) {
            // 手机端优化
            previewGrid.className = 'grid grid-cols-2 gap-3';
            if (uploadZone) {
                uploadZone.classList.add('p-4');
                uploadZone.classList.remove('p-8');
            }
        } else {
            // 桌面端优化
            previewGrid.className = 'grid grid-cols-3 gap-4';
            if (uploadZone) {
                uploadZone.classList.add('p-8');
                uploadZone.classList.remove('p-4');
            }
        }
    }

    // 绑定事件
    function bindEvents() {
        if (!fileUpload || !uploadZone || !nextButton) {
            console.error('无法绑定事件：关键DOM元素未找到');
            return;
        }

        console.log('绑定拖放和文件上传事件');

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

        // 文件选择事件
        fileUpload.addEventListener('change', function () {
            console.log('选择了文件:', this.files.length, '个文件');
            handleFiles(this.files);
        });

        // 下一步按钮点击事件
        nextButton.addEventListener('click', function () {
            if (uploadedImages.length > 0) {
                // 显示上传进度对话框
                if (uploadProgress) {
                    uploadProgress.style.display = 'flex';
                }

                // 保存上传的图片到本地存储，以便在下一页使用
                localStorage.setItem('uploadedImages', JSON.stringify(uploadedImages.map(img => ({
                    id: img.id,
                    preview: img.src || img.preview
                }))));

                // 显示成功消息
                showSuccessMessage('图片上传成功！正在前往下一步...');

                // 模拟总体上传进度
                let totalProgressValue = 0;
                const progressInterval = setInterval(() => {
                    totalProgressValue += Math.random() * 5;
                    if (totalProgressValue > 100) totalProgressValue = 100;

                    if (totalProgress) {
                        totalProgress.style.width = totalProgressValue + '%';
                    }

                    if (uploadPercentage) {
                        uploadPercentage.textContent = Math.round(totalProgressValue) + '%';
                    }

                    if (totalProgressValue === 100) {
                        clearInterval(progressInterval);

                        // 跳转到预览页面
                        setTimeout(() => {
                window.location.href = 'preview.html';
                        }, 1000);
                    }
                }, 100);
            } else {
                alert('请至少上传一张图片');
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
        uploadZone.classList.add('active');
    }

    // 取消高亮上传区域
    function unhighlight() {
        uploadZone.classList.remove('active');
    }

    // 处理拖放的文件
    function handleDrop(e) {
        console.log('文件被拖放');
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    // 处理选择的文件
    function handleFiles(files) {
        console.log('处理', files.length, '个文件');
        if (files.length === 0) return;

        // 过滤出图片文件
        const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));

        if (imageFiles.length === 0) {
            showErrorMessage('请选择有效的图片文件');
            return;
        }

        // 检查是否超过最大图片数量
        if (uploadedImages.length + imageFiles.length > MAX_IMAGES) {
            showErrorMessage(`最多只能上传${MAX_IMAGES}张图片`);
            return;
        }

        // 显示预览区域
        if (previewArea) {
            previewArea.style.display = 'block';
        }

        // 处理每个文件
        imageFiles.forEach(file => {
            // 检查文件大小
            if (file.size > MAX_FILE_SIZE) {
                showErrorMessage('图片大小不能超过10MB');
                return;
            }

            console.log('创建图片预览:', file.name);

            // 创建一个唯一ID
            const imageId = 'img-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);

            // 读取并显示图片
            const reader = new FileReader();
            reader.onload = function (e) {
                // 创建预览元素
                const template = document.getElementById('image-preview-template');
                if (!template) {
                    console.error('找不到预览模板元素');
                    return;
                }

                const preview = template.content.cloneNode(true);

                const previewContainer = document.createElement('div');
                previewContainer.className = 'image-preview-container';
                previewContainer.setAttribute('data-id', imageId);
                previewContainer.appendChild(preview);

                if (previewGrid) {
                    previewGrid.appendChild(previewContainer);
                }

                // 设置图片源
                const img = previewContainer.querySelector('img');
                if (img) {
                    img.src = e.target.result;
                }

                // 存储上传的图片信息
                uploadedImages.push({
                    id: imageId,
                    file: file,
                    src: e.target.result
                });

                // 更新图片数量
                if (imageCount) {
                    imageCount.textContent = uploadedImages.length;
                }

                // 启用下一步按钮
                if (nextButton) {
                    nextButton.disabled = uploadedImages.length === 0;
                }

                // 绑定删除按钮事件
                const deleteBtn = previewContainer.querySelector('.delete-image');
                if (deleteBtn) {
                    deleteBtn.addEventListener('click', function () {
                        removeImage(imageId);
                    });
                }

                // 模拟上传进度
                simulateUpload(previewContainer.querySelector('.progress'), imageId);
            };
            reader.readAsDataURL(file);
        });
    }

    // 模拟上传进度
    function simulateUpload(progressBar, imageId) {
        if (!progressBar) return;

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;

            progressBar.style.width = progress + '%';

            if (progress === 100) {
                clearInterval(interval);

                setTimeout(() => {
                    const container = document.querySelector(`[data-id="${imageId}"]`);
                    if (container) {
                        const progressContainer = container.querySelector('.progress').parentElement;
                        progressContainer.style.transition = 'opacity 0.5s ease';
                        progressContainer.style.opacity = '0';

                        setTimeout(() => {
                            progressContainer.style.display = 'none';
                        }, 500);
                    }
                }, 500);
            }
        }, 200);
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
            container.style.opacity = '0';
            container.style.transform = 'scale(0.8)';

            setTimeout(() => {
                container.remove();

                // 更新图片数量
                if (imageCount) {
                    imageCount.textContent = uploadedImages.length;
                }

                // 如果没有图片了，隐藏预览区域
                if (uploadedImages.length === 0 && previewArea) {
                    previewArea.style.display = 'none';
                }

        // 更新下一步按钮状态
                if (nextButton) {
                    nextButton.disabled = uploadedImages.length === 0;
                }
            }, 300);
        }
    }

    // 恢复上传状态
    function restoreUploadState() {
        const images = localStorage.getItem('uploadedImages');
        if (images) {
            try {
                const parsedImages = JSON.parse(images);
                if (Array.isArray(parsedImages) && parsedImages.length > 0) {
                    console.log('恢复之前上传的', parsedImages.length, '张图片');
                    parsedImages.forEach(img => {
                        // 确保图片有ID和预览URL
                        if (img.id && (img.preview || img.src)) {
                            uploadedImages.push({
                                id: img.id,
                                src: img.preview || img.src
                            });

                            // 创建预览元素
                            if (previewArea && previewGrid) {
                                previewArea.style.display = 'block';

                                const template = document.getElementById('image-preview-template');
                                if (template) {
                                    const preview = template.content.cloneNode(true);

                                    const previewContainer = document.createElement('div');
                                    previewContainer.className = 'image-preview-container';
                                    previewContainer.setAttribute('data-id', img.id);
                                    previewContainer.appendChild(preview);

                                    previewGrid.appendChild(previewContainer);

                                    // 设置图片源
                                    const imgElement = previewContainer.querySelector('img');
                                    if (imgElement) {
                                        imgElement.src = img.preview || img.src;
                                    }

                                    // 绑定删除按钮事件
                                    const deleteBtn = previewContainer.querySelector('.delete-image');
                                    if (deleteBtn) {
                                        deleteBtn.addEventListener('click', function () {
                                            removeImage(img.id);
                                        });
                                    }

                                    // 隐藏进度条
                                    const progressContainer = previewContainer.querySelector('.progress').parentElement;
                                    if (progressContainer) {
                                        progressContainer.style.display = 'none';
                                    }
                                }
                            }
                        }
                    });

                    // 更新图片数量
                    if (imageCount) {
                        imageCount.textContent = uploadedImages.length;
                    }

                    // 更新下一步按钮状态
                    if (nextButton) {
                        nextButton.disabled = uploadedImages.length === 0;
                    }
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