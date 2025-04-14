/**
 * 禾语智宣 - 宣传图文预览页面脚本
 * 提供轮播图效果、粒子流、浮动背景以及各种交互增强
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log('预览页面JS加载完成');

    // 初始化粒子背景
    initParticlesBackground();

    // 初始化轮播图
    initImageCarousel();

    // 初始化浮动背景
    initFloatingBackground();

    // 初始化文本编辑区域
    initTextEditing();

    // 初始化AI助手
    initAIAssistant();

    // 初始化交互效果
    initInteractionEffects();

    // 恢复之前上传的图片
    restoreUploadedImages();
});

/**
 * 初始化粒子背景效果
 */
function initParticlesBackground() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": window.innerWidth < 768 ? 15 : 30,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#9aa338"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 5,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#9aa338",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "push": {
                        "particles_nb": 3
                    }
                }
            },
            "retina_detect": true
        });
    } else {
        console.warn('particlesJS 未加载，无法初始化粒子背景');
    }
}

/**
 * 初始化浮动背景
 */
function initFloatingBackground() {
    // 添加浮动背景元素
    const container = document.querySelector('body');
    if (!container) return;

    // 检查是否已存在浮动背景元素
    if (!document.querySelector('.floating-bg')) {
        // 创建浮动背景元素
        for (let i = 1; i <= 3; i++) {
            const floatingBg = document.createElement('div');
            floatingBg.className = `floating-bg bg-${i}`;
            container.appendChild(floatingBg);
        }
    }

    // 添加随机移动效果
    const floatingElements = document.querySelectorAll('.floating-bg');

    floatingElements.forEach((el, index) => {
        // 为每个元素添加不同的动画延迟
        el.style.animationDelay = `${index * 2}s`;
    });
}

/**
 * 初始化图片轮播
 */
function initImageCarousel() {
    const imageContainer = document.querySelector('.image-container');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!imageContainer || !indicators.length) return;

    let currentIndex = 0;
    const images = imageContainer.querySelectorAll('img');

    // 如果没有图片，显示占位信息
    if (images.length === 0) {
        imageContainer.classList.add('no-image');
        imageContainer.setAttribute('data-placeholder', '暂无图片，请先上传');
        return;
    }

    // 显示当前图片
    function showImage(index) {
        // 隐藏所有图片
        images.forEach(img => {
            img.style.display = 'none';
        });

        // 移除所有指示器的active类
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });

        // 显示当前图片
        if (images[index]) {
            images[index].style.display = 'block';

            // 添加淡入动画
            images[index].style.opacity = '0';
            images[index].style.transition = 'opacity 0.5s ease';

            setTimeout(() => {
                images[index].style.opacity = '1';
            }, 10);
        }

        // 高亮当前指示器
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }

        currentIndex = index;
    }

    // 下一张图片
    function nextImage() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= images.length) {
            nextIndex = 0;
        }
        showImage(nextIndex);
    }

    // 上一张图片
    function prevImage() {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = images.length - 1;
        }
        showImage(prevIndex);
    }

    // 绑定指示器点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showImage(index);
        });
    });

    // 绑定按钮点击事件
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevImage);
        nextBtn.addEventListener('click', nextImage);
    }

    // 自动轮播
    let autoplayInterval = setInterval(nextImage, 5000);

    // 鼠标悬停时暂停轮播
    imageContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    // 鼠标离开时恢复轮播
    imageContainer.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(nextImage, 5000);
    });

    // 触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;

    imageContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        // 暂停自动轮播
        clearInterval(autoplayInterval);
    }, { passive: true });

    imageContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;

        // 判断滑动方向
        if (touchEndX < touchStartX - 50) {
            // 向左滑动，显示下一张
            nextImage();
        } else if (touchEndX > touchStartX + 50) {
            // 向右滑动，显示上一张
            prevImage();
        }

        // 恢复自动轮播
        autoplayInterval = setInterval(nextImage, 5000);
    }, { passive: true });

    // 初始显示第一张图片
    showImage(0);
}

/**
 * 初始化文本编辑区域
 */
function initTextEditing() {
    const editableAreas = document.querySelectorAll('[contenteditable="true"]');

    editableAreas.forEach(area => {
        // 监听焦点事件
        area.addEventListener('focus', function () {
            this.classList.add('editing');

            // 显示编辑提示
            const parent = this.closest('.info-card');
            if (parent) {
                if (!parent.querySelector('.edit-hint')) {
                    const hint = document.createElement('div');
                    hint.className = 'edit-hint text-xs text-gray-500 mt-2 italic';
                    hint.innerHTML = '<i class="fas fa-pen-nib mr-1"></i> 正在编辑...';
                    parent.appendChild(hint);
                }
            }
        });

        // 监听失焦事件
        area.addEventListener('blur', function () {
            this.classList.remove('editing');

            // 移除编辑提示
            const parent = this.closest('.info-card');
            if (parent) {
                const hint = parent.querySelector('.edit-hint');
                if (hint) {
                    hint.remove();
                }
            }

            // 保存编辑内容
            saveContentToLocalStorage();
        });

        // 处理粘贴事件，清除格式
        area.addEventListener('paste', function (e) {
            e.preventDefault();

            // 获取纯文本
            const text = (e.clipboardData || window.clipboardData).getData('text/plain');

            // 插入纯文本
            document.execCommand('insertText', false, text);
        });
    });

    // 保存内容到本地存储
    function saveContentToLocalStorage() {
        const content = {};

        editableAreas.forEach(area => {
            if (area.id) {
                content[area.id] = area.innerHTML;
            }
        });

        localStorage.setItem('previewContent', JSON.stringify(content));
    }

    // 从本地存储恢复内容
    const savedContent = localStorage.getItem('previewContent');
    if (savedContent) {
        try {
            const content = JSON.parse(savedContent);

            for (const id in content) {
                const element = document.getElementById(id);
                if (element) {
                    element.innerHTML = content[id];
                }
            }
        } catch (e) {
            console.error('恢复编辑内容失败:', e);
        }
    }
}

/**
 * 初始化AI助手
 */
function initAIAssistant() {
    const aiGenerateBtn = document.querySelector('.ai-generate-btn');
    if (!aiGenerateBtn) return;

    aiGenerateBtn.addEventListener('click', function () {
        // 显示生成中状态
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> AI正在生成中...';
        this.disabled = true;

        // 模拟AI生成过程
        setTimeout(() => {
            // 生成示例内容
            generateAIContent();

            // 恢复按钮状态
            this.innerHTML = originalText;
            this.disabled = false;

            // 显示成功提示
            showToast('AI内容生成成功！', 'success');
        }, 2000);
    });

    function generateAIContent() {
        // 示例AI生成的内容
        const productTitle = document.getElementById('product-title');
        const productIntro = document.getElementById('product-intro');
        const productFeatures = document.getElementById('product-features');
        const productTaste = document.getElementById('product-taste');
        const productNutrition = document.getElementById('product-nutrition');
        const productSuggestion = document.getElementById('product-suggestion');

        if (productTitle) {
            productTitle.innerHTML = '高山有机红富士苹果 - 自然生长 健康美味';
            addHighlightAnimation(productTitle);
        }

        if (productIntro) {
            productIntro.innerHTML = '来自海拔1500米高山果园的有机红富士苹果，无化肥农药，自然生长180天，果肉饱满多汁，香甜可口，是您送礼佳品的不二之选！';
            addHighlightAnimation(productIntro);
        }

        if (productFeatures) {
            productFeatures.innerHTML = '采用有机种植方式，无化学农药，果园全天然生态环境，每一颗苹果都经过精心挑选，保证新鲜度和口感。果实色泽鲜艳，果皮光滑细腻。';
            addHighlightAnimation(productFeatures);
        }

        if (productTaste) {
            productTaste.innerHTML = '口感脆爽多汁，甜度适中（含糖量15°以上），酸甜平衡，入口即化，回味悠长。咬一口仿佛闻到了高山果园的清新空气。';
            addHighlightAnimation(productTaste);
        }

        if (productNutrition) {
            productNutrition.innerHTML = '富含维生素C、膳食纤维和多种抗氧化物质，能够增强免疫力，促进消化，帮助肠道健康。每100克果肉约含52千卡热量，适合健康饮食。';
            addHighlightAnimation(productNutrition);
        }

        if (productSuggestion) {
            productSuggestion.innerHTML = '可直接食用，也可切片拌沙拉，或制作成苹果派、苹果汁等。餐前食用一个苹果有助于控制食欲，是减肥人士的理想选择。冷藏保存可延长新鲜度。';
            addHighlightAnimation(productSuggestion);
        }
    }

    function addHighlightAnimation(element) {
        // 添加高亮动画效果
        element.style.transition = 'background-color 1s ease';
        element.style.backgroundColor = 'rgba(154, 163, 56, 0.2)';

        setTimeout(() => {
            element.style.backgroundColor = 'transparent';
        }, 1500);
    }
}

/**
 * 初始化交互效果
 */
function initInteractionEffects() {
    // 添加卡片悬停效果
    const cards = document.querySelectorAll('.info-card');
    cards.forEach(card => {
        card.classList.add('fade-in');
    });

    // 添加按钮点击效果
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', function () {
            this.style.transform = 'scale(0.98)';
        });

        btn.addEventListener('mouseup', function () {
            this.style.transform = '';
        });

        btn.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    // 修复iOS上的滚动问题
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.addEventListener('touchmove', function (e) {
            // 允许默认的滚动行为
        }, { passive: true });
    }

    // 添加发布按钮事件
    const publishBtn = document.querySelector('.btn-publish');
    if (publishBtn) {
        publishBtn.addEventListener('click', function () {
            window.location.href = 'publish.html';
        });
    }
}

/**
* 恢复之前上传的图片
*/
function restoreUploadedImages() {
    const imageContainer = document.querySelector('.image-container');
    const indicatorContainer = document.querySelector('.indicator-container');

    if (!imageContainer || !indicatorContainer) return;

    // 从localStorage获取图片
    const uploadedImagesStr = localStorage.getItem('uploadedImages');
    if (!uploadedImagesStr) return;

    try {
        const uploadedImages = JSON.parse(uploadedImagesStr);

        // 检查是否有图片
        if (!Array.isArray(uploadedImages) || uploadedImages.length === 0) return;

        // 清除"暂无图片"提示
        imageContainer.classList.remove('no-image');
        imageContainer.removeAttribute('data-placeholder');

        // 清除现有图片和指示器
        const existingImages = imageContainer.querySelectorAll('img');
        const existingIndicators = indicatorContainer.querySelectorAll('.indicator');

        existingImages.forEach(img => img.remove());
        existingIndicators.forEach(indicator => indicator.remove());

        // 添加上传的图片
        uploadedImages.forEach((img, index) => {
            // 创建图片元素
            const imgEl = document.createElement('img');
            imgEl.src = img.preview || img.src;
            imgEl.style.display = index === 0 ? 'block' : 'none';
            imgEl.alt = `农产品图片 ${index + 1}`;
            imgEl.className = 'w-full h-full object-cover';

            // 创建指示器
            const indicator = document.createElement('div');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.setAttribute('data-index', index);

            // 添加到容器
            imageContainer.appendChild(imgEl);
            indicatorContainer.appendChild(indicator);
        });

        // 重新初始化轮播
        initImageCarousel();

    } catch (e) {
        console.error('恢复上传图片失败:', e);
    }
}

/**
* 显示提示消息
* @param {string} message - 提示消息
* @param {string} type - 提示类型 (success, error, warning, info)
*/
function showToast(message, type = 'info') {
    // 检查是否已存在toast
    let toast = document.querySelector('.toast');

    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }

    // 设置样式
    toast.className = `toast toast-${type}`;

    // 设置图标
    let icon = '';
    switch (type) {
        case 'success':
            icon = '<i class="fas fa-check-circle mr-2"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-times-circle mr-2"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle mr-2"></i>';
            break;
        case 'info':
            icon = '<i class="fas fa-info-circle mr-2"></i>';
            break;
    }

    // 设置内容
    toast.innerHTML = `${icon}${message}`;

    // 显示提示
    toast.classList.add('show');

    // 自动关闭
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// 导出公共函数
window.previewPage = {
    showToast
}; 