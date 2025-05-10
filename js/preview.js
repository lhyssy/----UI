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

    // 移动端适配
    initMobileAdaptation();

    // 底部导航展示动画
    initBottomNavAnimation();

    // 处理去发布按钮
    initPublishButton();

    // 处理AI内容优化
    initAIOptimization();

    // 增强滚动效果
    initScrollEffects();

    // 为模板选项添加点击交互
    initTemplateSelection();

    // 初始化水波纹效果
    initRippleEffect();
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
                    "value": ["#9aa338", "#a9b056", "#e67e22", "#3498db"]
                },
                "shape": {
                    "type": ["circle", "triangle", "polygon"],
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
                        "enable": true,
                        "speed": 0.5,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
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
                    "speed": 1.5,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
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
                        "mode": "bubble"
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
                    "bubble": {
                        "distance": 100,
                        "size": 6,
                        "duration": 0.5,
                        "opacity": 0.6,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 100,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    } else {
        console.warn('particlesJS 未加载，无法初始化粒子背景');
        // 创建一个简单的备用粒子效果
        createFallbackParticles();
    }
}

/**
 * 创建备用粒子效果
 */
function createFallbackParticles() {
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) return;

    // 添加一些简单的浮动元素作为备用
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'fallback-particle';
        particle.style.position = 'absolute';
        particle.style.width = `${Math.random() * 10 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = `rgba(154, 163, 56, ${Math.random() * 0.3 + 0.1})`;
        particle.style.borderRadius = '50%';
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animation = `float ${Math.random() * 15 + 5}s infinite ease-in-out ${Math.random() * 5}s`;

        particlesContainer.appendChild(particle);
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

            // 添加纹理和内部结构以增强效果
            const innerGlow = document.createElement('div');
            innerGlow.style.position = 'absolute';
            innerGlow.style.inset = '10%';
            innerGlow.style.borderRadius = '50%';
            innerGlow.style.background = 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)';

            floatingBg.appendChild(innerGlow);
            container.appendChild(floatingBg);
        }
    }

    // 添加随机移动效果
    const floatingElements = document.querySelectorAll('.floating-bg');

    floatingElements.forEach((el, index) => {
        // 为每个元素添加不同的动画延迟
        el.style.animationDelay = `${index * 2}s`;

        // 添加鼠标交互效果
        el.addEventListener('mouseover', function () {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 0 30px rgba(154, 163, 56, 0.3)';
            this.style.transition = 'transform 0.5s, box-shadow 0.5s';
        });

        el.addEventListener('mouseout', function () {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.transition = 'transform 0.5s, box-shadow 0.5s';
        });
    });

    // 添加基于滚动位置的视差效果
    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY || window.pageYOffset;

        floatingElements.forEach((el, index) => {
            const speed = (index + 1) * 0.05;
            el.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.02}deg)`;
        });
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
    const toggleEditBtn = document.getElementById('toggleEditBtn');
    const editorToolbar = document.getElementById('editorToolbar');
    const contentEditor = document.getElementById('contentEditor');
    const staticContent = document.getElementById('staticContent');

    if (toggleEditBtn && contentEditor && staticContent) {
        // 初始化文本编辑器
        contentEditor.contentEditable = 'true';

        // 将静态内容复制到编辑器中
        contentEditor.innerHTML = staticContent.innerHTML;

        // 编辑按钮点击事件
        toggleEditBtn.addEventListener('click', function () {
            if (contentEditor.style.display === 'none') {
                // 切换到编辑模式
                contentEditor.style.display = 'block';
                staticContent.style.display = 'none';
                editorToolbar.classList.remove('hidden');
                toggleEditBtn.innerHTML = '<i class="fas fa-check mr-1"></i> 保存文案';
                toggleEditBtn.style.background = 'linear-gradient(135deg, #4caf50, #388e3c)';
            } else {
                // 保存并切换回静态模式
                staticContent.innerHTML = contentEditor.innerHTML;
                contentEditor.style.display = 'none';
                staticContent.style.display = 'block';
                editorToolbar.classList.add('hidden');
                toggleEditBtn.innerHTML = '<i class="fas fa-edit mr-1"></i> 编辑文案';
                toggleEditBtn.style.background = 'linear-gradient(135deg, #9aa338, #a9b056)';

                // 可以在这里添加保存到服务器的代码
                console.log('文案已保存');
                // 显示保存成功提示
                showSaveSuccess();
            }
        });

        // 编辑器工具栏功能
        const editorBtns = document.querySelectorAll('.editor-btn');
        editorBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const command = this.dataset.command;
                const value = this.dataset.value || '';

                if (command === 'createLink') {
                    const url = prompt('请输入链接地址:', 'https://');
                    if (url) {
                        document.execCommand(command, false, url);
                    }
                } else {
                    document.execCommand(command, false, value);
                }

                // 保持编辑器焦点
                contentEditor.focus();
            });
        });
    }
}

/**
 * 初始化AI助手
 * 报告：有关于AI优化的部分已经于data-transfer.js中实现
 * 本代码只有生成toast的作用，所以在这里注释化
 
function initAIAssistant() {
    const aiGenerateBtn = document.querySelector('.ai-generate-btn');
    if (!aiGenerateBtn) return;

    aiGenerateBtn.addEventListener('click', function () {
        debugger;
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
        }, 5000);
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
}*/

/**
 * 初始化交互效果
 */
function initInteractionEffects() {
    // 添加卡片悬停效果
    const cards = document.querySelectorAll('.info-card, .bg-white, .template-option');
    cards.forEach(card => {
        card.classList.add('fade-in');

        // 添加3D倾斜效果
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // 计算倾斜角度，最大为3度
            const tiltX = ((y / rect.height) * 6) - 3;
            const tiltY = (-(x / rect.width) * 6) + 3;

            // 应用变换
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.01, 1.01, 1.01)`;

            // 添加光影效果
            const glare = this.querySelector('.card-glare') || document.createElement('div');
            if (!glare.classList.contains('card-glare')) {
                glare.className = 'card-glare';
                glare.style.position = 'absolute';
                glare.style.top = '0';
                glare.style.left = '0';
                glare.style.right = '0';
                glare.style.bottom = '0';
                glare.style.zIndex = '1';
                glare.style.pointerEvents = 'none';
                this.appendChild(glare);
            }

            // 更新光源位置
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%)`;
        });

        // 移除倾斜效果
        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
            const glare = this.querySelector('.card-glare');
            if (glare) {
                glare.remove();
            }
        });
    });

    // 添加按钮点击效果
    const buttons = document.querySelectorAll('.btn, .editor-btn, #toggleEditBtn, .ai-generate-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', function () {
            this.style.transform = 'scale(0.96)';
            this.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            this.style.transition = 'transform 0.2s, box-shadow 0.2s';
        });

        btn.addEventListener('mouseup', function () {
            this.style.transform = '';
            this.style.boxShadow = '';
        });

        btn.addEventListener('mouseleave', function () {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // 为AI功能开关添加点击事件
    const toggleSwitches = document.querySelectorAll('.bg-white .relative.inline-block');

    toggleSwitches.forEach(toggle => {
        // 添加鼠标样式，表明可点击
        toggle.style.cursor = 'pointer';

        toggle.addEventListener('click', function () {
            // 获取内部的圆点
            const circle = this.querySelector('span');

            // 检查当前状态
            const isActive = this.classList.contains('bg-green-500');

            if (isActive) {
                // 从打开切换到关闭状态
                this.classList.remove('bg-green-500');
                this.classList.add('bg-gray-300');

                // 移动圆点到左侧
                circle.style.right = 'auto';
                circle.style.left = '1px';
            } else {
                // 从关闭切换到打开状态
                this.classList.remove('bg-gray-300');
                this.classList.add('bg-green-500');

                // 移动圆点到右侧
                circle.style.left = 'auto';
                circle.style.right = '1px';
            }

            // 获取功能名称
            const featureName = this.closest('.flex.items-center.justify-between')
                .querySelector('.font-medium').textContent;

            // 显示状态变化提示
            const newState = isActive ? '已关闭' : '已开启';
            showToast(`${featureName}${newState}`, isActive ? 'info' : 'success');
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

    // 增加图片预览交互
    enhanceImagePreview();
}

/**
 * 增强图片预览交互
 */
function enhanceImagePreview() {
    const imageContainer = document.querySelector('.image-container');
    if (!imageContainer) return;

    // 添加双击放大功能
    imageContainer.addEventListener('dblclick', function (e) {
        e.preventDefault();
        this.classList.toggle('expanded');

        if (this.classList.contains('expanded')) {
            this.style.position = 'fixed';
            this.style.top = '50%';
            this.style.left = '50%';
            this.style.transform = 'translate(-50%, -50%)';
            this.style.maxHeight = '90vh';
            this.style.maxWidth = '90vw';
            this.style.width = 'auto';
            this.style.height = 'auto';
            this.style.zIndex = '1000';

            // 创建关闭按钮
            const closeBtn = document.createElement('button');
            closeBtn.className = 'expand-close-btn';
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '10px';
            closeBtn.style.right = '10px';
            closeBtn.style.zIndex = '1001';
            closeBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            closeBtn.style.color = 'white';
            closeBtn.style.border = 'none';
            closeBtn.style.borderRadius = '50%';
            closeBtn.style.width = '30px';
            closeBtn.style.height = '30px';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.display = 'flex';
            closeBtn.style.alignItems = 'center';
            closeBtn.style.justifyContent = 'center';

            closeBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                imageContainer.classList.remove('expanded');
                imageContainer.style = '';
                this.remove();

                if (overlay) overlay.remove();
            });

            this.appendChild(closeBtn);

            // 创建背景覆盖
            const overlay = document.createElement('div');
            overlay.className = 'image-overlay';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.right = '0';
            overlay.style.bottom = '0';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            overlay.style.zIndex = '999';

            overlay.addEventListener('click', function () {
                imageContainer.classList.remove('expanded');
                imageContainer.style = '';
                closeBtn.remove();
                this.remove();
            });

            document.body.appendChild(overlay);
        } else {
            this.style = '';
            const closeBtn = document.querySelector('.expand-close-btn');
            if (closeBtn) closeBtn.remove();

            const overlay = document.querySelector('.image-overlay');
            if (overlay) overlay.remove();
        }
    });

    // 添加图片滑入动画
    const images = imageContainer.querySelectorAll('img');
    images.forEach(img => {
        img.style.transform = 'translateX(100%)';
        img.style.opacity = '0';
        img.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';

        setTimeout(() => {
            img.style.transform = 'translateX(0)';
            img.style.opacity = '1';
        }, 300);
    });
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
 * 初始化移动端适配
 */
function initMobileAdaptation() {
    // 检测设备类型
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // 添加移动端viewport meta标签
    if (isMobile && !document.querySelector('meta[name="viewport"]')) {
        const viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
        document.head.appendChild(viewportMeta);
    }

    // 调整移动端元素大小
    if (isMobile) {
        // 调整图片容器高度
        const imageContainers = document.querySelectorAll('.image-container');
        imageContainers.forEach(container => {
            container.style.maxHeight = window.innerWidth * 0.6 + 'px';
        });

        // 修改：只禁用多指缩放，不阻止正常滚动
        document.addEventListener('gesturestart', function (event) {
            event.preventDefault();
        }, { passive: false });

        document.addEventListener('gesturechange', function (event) {
            event.preventDefault();
        }, { passive: false });

        // 处理iOS的滚动问题
        if ((/iPhone|iPad|iPod/).test(navigator.userAgent)) {
            // 确保内容区域可滚动
            const contentArea = document.querySelector('.my-content');
            if (contentArea) {
                contentArea.style.webkitOverflowScrolling = 'touch';

                // 修复iOS滚动卡顿
                contentArea.addEventListener('touchmove', function (e) {
                    // 允许默认滚动
                }, { passive: true });
            }

            // 添加空白的body touchmove处理，修复iOS 11+上的滚动问题
            document.body.addEventListener('touchmove', function (e) {
                // 允许正常滚动
            }, { passive: true });
        }

        // 修复iOS点击延迟
        const fastClickAreas = document.querySelectorAll('button, a, .template-option');
        fastClickAreas.forEach(el => {
            el.addEventListener('touchstart', function () { }, { passive: true });
        });
    }

    // 确保页面可以滚动
    window.addEventListener('load', function () {
        // 短暂延迟，确保所有内容加载完毕
        setTimeout(function () {
            // 尝试滚动到顶部，重置任何潜在的滚动问题
            window.scrollTo(0, 0);

            // 检测内容高度，确保滚动正常工作
            const contentArea = document.querySelector('.my-content');
            if (contentArea && contentArea.scrollHeight > contentArea.clientHeight) {
                console.log('内容区域可滚动，高度差: ' + (contentArea.scrollHeight - contentArea.clientHeight) + 'px');

                // 如果检测到无法滚动，强制启用滚动
                if (getComputedStyle(contentArea).overflow === 'hidden') {
                    contentArea.style.overflowY = 'auto';
                    console.log('已强制启用滚动');
                }
            }
        }, 300);
    });
}

/**
 * 初始化底部导航动画
 */
function initBottomNavAnimation() {
    const bottomNav = document.querySelector('.bottom-nav');

    if (!bottomNav) return;

    // 创建底部导航开关按钮
    const showNavBtn = document.createElement('button');
    showNavBtn.classList.add('show-nav-btn');
    showNavBtn.style.position = 'fixed';
    showNavBtn.style.bottom = '20px';
    showNavBtn.style.right = '20px';
    showNavBtn.style.width = '40px';
    showNavBtn.style.height = '40px';
    showNavBtn.style.borderRadius = '50%';
    showNavBtn.style.background = 'linear-gradient(135deg, rgba(154, 163, 56, 1), #a9b056)';
    showNavBtn.style.color = 'white';
    showNavBtn.style.display = 'flex';
    showNavBtn.style.alignItems = 'center';
    showNavBtn.style.justifyContent = 'center';
    showNavBtn.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    showNavBtn.style.border = 'none';
    showNavBtn.style.zIndex = '45';
    showNavBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(showNavBtn);

    let navVisible = false;

    showNavBtn.addEventListener('click', function () {
        if (navVisible) {
            bottomNav.style.transform = 'translateY(70px)';
            showNavBtn.innerHTML = '<i class="fas fa-bars"></i>';
        } else {
            bottomNav.style.transform = 'translateY(0)';
            showNavBtn.innerHTML = '<i class="fas fa-times"></i>';
        }
        navVisible = !navVisible;
    });

    // 底部导航项点击处理
    const navItems = document.querySelectorAll('.bottom-nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            const link = this.getAttribute('data-link');
            if (link) {
                window.location.href = link;
            }
        });
    });
}

/**
 * 初始化发布按钮功能
 */
function initPublishButton() {
    const goToPublishBtn = document.getElementById('goToPublishBtn');
    if (goToPublishBtn) {
        goToPublishBtn.addEventListener('click', function (event) {
            event.preventDefault(); // 阻止默认行为
            console.log('去发布按钮被点击，准备跳转到发布页面');

            // 获取文案内容
            const contentEditor = document.getElementById('contentEditor');
            const staticContent = document.getElementById('staticContent');

            let content = '';

            // 判断使用哪个内容区域
            if (contentEditor && contentEditor.style.display !== 'none') {
                // 从编辑区获取内容
                content = contentEditor.innerText || contentEditor.textContent;
            } else if (staticContent) {
                // 从静态区域获取内容
                content = staticContent.innerText || staticContent.textContent;
            }

            // 如果有内容，复制到剪贴板
            if (content.trim()) {
                try {
                    navigator.clipboard.writeText(content).then(() => {
                        console.log('文案已复制到剪贴板');

                        // 在localStorage中存储一个标志，表示文案已复制
                        localStorage.setItem('contentCopied', 'true');

                        // 跳转到发布页面
                        window.location.href = 'publish.html';
                    }).catch(err => {
                        console.error('复制到剪贴板失败:', err);
                        showToast('复制内容失败，请手动复制', 'error');
                        window.location.href = 'publish.html';
                    });
                } catch (err) {
                    console.error('剪贴板API不可用:', err);
                    showToast('复制内容失败，请手动复制', 'error');
                    window.location.href = 'publish.html';
                }
            } else {
                // 没有内容也跳转
                window.location.href = 'publish.html';
            }
        });
    }

    const saveDraftBtn = document.getElementById('saveDraftBtn');
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', function (event) {
            event.preventDefault();
            console.log('保存草稿按钮被点击');
            showToast('草稿已保存', 'success');
        });
    }
}

/**
* 初始化AI内容优化
*/
function initAIOptimization() {
    const generateCopyBtn = document.getElementById('generateCopyBtn');
    const aiGeneratingContainer = document.getElementById('aiGeneratingContainer');
    const aiProgressBar = document.getElementById('aiProgressBar');
    const contentEditor = document.getElementById('contentEditor');
    const staticContent = document.getElementById('staticContent');

    if (generateCopyBtn && aiGeneratingContainer && aiProgressBar) {
        generateCopyBtn.addEventListener('click', function () {
            // 检查是否已有data-transfer.js提供的功能
            if (window.initAIOptimizationButton) {
                console.log('使用真实AI优化功能');
                // 不做任何事情，由data-transfer.js处理AI优化功能
                return;
            }

            // 使用真实AI优化前的提示
            showNotification("正在连接AI引擎...", "sync");

            console.log('AI优化按钮被点击，但data-transfer.js未提供处理能力');
            showToast('AI优化功能暂时不可用，请稍后再试', 'warning');
        });
    }
}

/**
 * 初始化滚动效果
 */
function initScrollEffects() {
    // 获取所有需要应用滚动效果的元素
    const animatedElements = document.querySelectorAll('.template-preview, .ai-assistant, .bg-white, .image-container');

    // 创建IntersectionObserver来检测元素何时进入视口
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // 一旦元素已经显示，不再需要观察它
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // 相对于视口
        threshold: 0.1, // 当10%的元素可见时触发
        rootMargin: '0px 0px -50px 0px' // 微调触发位置
    });

    // 开始观察每个元素
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });

    // 添加滚动指示器
    addScrollIndicator();
}

/**
 * 添加滚动指示器
 */
function addScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = '<i class="fas fa-chevron-down"></i>';
    indicator.style.position = 'fixed';
    indicator.style.bottom = '100px';
    indicator.style.left = '50%';
    indicator.style.transform = 'translateX(-50%)';
    indicator.style.width = '40px';
    indicator.style.height = '40px';
    indicator.style.borderRadius = '50%';
    indicator.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    indicator.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    indicator.style.display = 'flex';
    indicator.style.alignItems = 'center';
    indicator.style.justifyContent = 'center';
    indicator.style.color = '#9aa338';
    indicator.style.zIndex = '40';
    indicator.style.cursor = 'pointer';
    indicator.style.animation = 'bounce 2s infinite';

    document.body.appendChild(indicator);

    // 检测滚动来隐藏指示器
    let isVisible = true;
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100 && isVisible) {
            indicator.style.opacity = '0';
            indicator.style.transform = 'translateX(-50%) translateY(20px)';
            indicator.style.transition = 'opacity 0.5s, transform 0.5s';
            isVisible = false;
        } else if (window.scrollY <= 50 && !isVisible) {
            indicator.style.opacity = '1';
            indicator.style.transform = 'translateX(-50%) translateY(0)';
            isVisible = true;
        }
    });

    // 点击滚动到内容
    indicator.addEventListener('click', function () {
        window.scrollTo({
            top: window.innerHeight * 0.3,
            behavior: 'smooth'
        });
    });
}

/**
 * 初始化模板选择交互
 */
function initTemplateSelection() {
    const templateOptions = document.querySelectorAll('.template-option');
    if (!templateOptions.length) return;

    templateOptions.forEach(option => {
        option.addEventListener('click', function () {
            // 移除其他选项的选中状态
            templateOptions.forEach(opt => opt.classList.remove('selected'));

            // 添加当前选项的选中状态
            this.classList.add('selected');

            // 添加选中动画
            this.style.animation = 'pulse 0.5s';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);

            // 可以在这里添加应用模板的逻辑
            const templateName = this.querySelector('.text-white').textContent.trim();
            console.log(`选择了模板: ${templateName}`);

            // 显示提示消息
            showNotification(`已选择${templateName}`, 'check-circle');
        });
    });
}

/**
 * 初始化水波纹效果
 */
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .editor-btn, #toggleEditBtn, .ai-generate-btn, .bottom-nav-item, .template-option');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // 创建水波纹元素
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.position = 'absolute';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.top = y + 'px';
            ripple.style.left = x + 'px';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.borderRadius = '50%';
            ripple.style.pointerEvents = 'none';
            ripple.style.opacity = '0.6';

            // 添加水波纹元素
            if (this.style.position !== 'static') {
                this.style.position = 'relative';
            }
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            // 动画水波纹
            const diameter = Math.max(rect.width, rect.height) * 2;
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.width = diameter + 'px';
            ripple.style.height = diameter + 'px';

            // 清除水波纹
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 添加水波纹动画
    if (!document.querySelector('#rippleAnimation')) {
        const style = document.createElement('style');
        style.id = 'rippleAnimation';
        style.textContent = `
            @keyframes ripple {
                from {
                    width: 0;
                    height: 0;
                    opacity: 0.6;
                }
                to {
                    width: 600px;
                    height: 600px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
* 显示保存成功提示
*/
function showSaveSuccess() {
    showNotification('文案已保存', 'check-circle');
}

/**
 * 显示AI生成成功提示
 */
function showAiSuccess() {
    showNotification('AI优化完成', 'magic');
}

/**
 * 通用提示框函数
 */
function showNotification(message, icon) {
    const notification = document.createElement('div');
    notification.classList.add('save-notification');
    notification.innerHTML = `<i class="fas fa-${icon} mr-2"></i>${message}`;
    notification.style.position = 'fixed';
    notification.style.bottom = '80px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.padding = '8px 16px';
    notification.style.borderRadius = '20px';
    notification.style.backgroundColor = 'rgba(76, 175, 80, 0.8)';
    notification.style.color = 'white';
    notification.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
    notification.style.zIndex = '100';
    notification.style.transition = 'opacity 0.5s, transform 0.5s';
    notification.style.backdropFilter = 'blur(5px)';
    notification.style.webkitBackdropFilter = 'blur(5px)';
    notification.style.border = '1px solid rgba(255, 255, 255, 0.2)';

    document.body.appendChild(notification);

    // 添加进入动画
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(-50%) translateY(20px)';

    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);

    // 淡出效果
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 2000);
}

/**
 * 显示Toast消息
 */
function showToast(message, type = 'info') {
    let bgColor = 'rgba(33, 150, 243, 0.9)';
    let icon = 'info-circle';

    if (type === 'success') {
        bgColor = 'rgba(76, 175, 80, 0.9)';
        icon = 'check-circle';
    } else if (type === 'error') {
        bgColor = 'rgba(244, 67, 54, 0.9)';
        icon = 'exclamation-circle';
    } else if (type === 'warning') {
        bgColor = 'rgba(255, 152, 0, 0.9)';
        icon = 'exclamation-triangle';
    }

    showNotification(message, icon);
}

// 导出公共函数
window.previewPage = {
    showToast
}; 