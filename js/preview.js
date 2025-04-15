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
 * 初始化发布按钮
 */
function initPublishButton() {
    const goToPublishBtn = document.getElementById('goToPublishBtn');
    if (goToPublishBtn) {
        goToPublishBtn.addEventListener('click', function (event) {
            event.preventDefault(); // 阻止默认行为
            console.log('去发布按钮被点击，准备跳转到发布页面');
            // 简单跳转，不附加任何参数
            window.location.href = 'publish.html';
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
    // AI优化后的文案内容
    const optimizedContent = `
        <div class="mb-4">
            <div class="mb-2 flex items-center">
                <span class="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded mr-2"
                    style="background: linear-gradient(135deg, #ffcdd2, #ef9a9a); color: #c62828;">限时特惠</span>
                <span class="bg-green-100 text-green-600 text-xs font-bold px-2 py-1 rounded"
                    style="background: linear-gradient(135deg, #c8e6c9, #a5d6a7); color: #2e7d32;">有机认证</span>
            </div>
            <h2 class="text-lg font-bold mb-2">💫高山红富士｜咬一口就沦陷的冰糖心小炸弹！🍎</h2>
            <p class="text-sm text-gray-700 leading-relaxed">#有机种植 #会爆汁的苹果 #产地直发</p>
        </div>

        <div class="flex flex-wrap gap-2 mb-4">
            <span class="inline-block text-xs px-2 py-1 rounded-full font-medium"
                style="background: linear-gradient(135deg, #c8e6c9, #a5d6a7); color: #1b5e20;">有机认证</span>
            <span class="inline-block text-xs px-2 py-1 rounded-full font-medium"
                style="background: linear-gradient(135deg, #ffcdd2, #ef9a9a); color: #b71c1c;">特级品质</span>
            <span class="inline-block text-xs px-2 py-1 rounded-full font-medium"
                style="background: linear-gradient(135deg, #bbdefb, #90caf9); color: #0d47a1;">高山种植</span>
            <span class="inline-block text-xs px-2 py-1 rounded-full font-medium"
                style="background: linear-gradient(135deg, #fff9c4, #fff59d); color: #f57f17;">产地直发</span>
        </div>

        <div class="mb-5 text-center text-sm text-gray-700 leading-relaxed">
            <p>——————🌲自然の馈赠——————</p>
            <p class="mt-2">✨谁还没吃过这颗300天自然长成的红宝石！</p>
            <p>海拔2000m+云端果园 | 365天有机养护</p>
            <p>拒绝催熟剂❌ 不用膨大剂❌</p>
            <p>自带有机小绿标认证 每一颗都是阳光吻过的红脸蛋</p>
        </div>

        <div class="mb-5 border-l-4 pl-3 rounded-r-lg"
            style="border-color: #9aa338; background: linear-gradient(to right, rgba(154, 163, 56, 0.15), rgba(154, 163, 56, 0.05), transparent);">
            <h3 class="font-bold mb-2 text-[#9aa338]">🍎 产品特点</h3>
            <p class="text-sm text-gray-700 mb-3 leading-relaxed">
                🌱「有机喂养」不用农药的天然baby<br>
                ☀️「日光SPA」昼夜温差凝出冰糖心<br>
                📦「现摘现发」枝头到舌尖72h直达<br>
                📸「颜值爆表」自带高光滤镜的苹果届爱豆
            </p>
        </div>

        <div class="mb-5 border-l-4 pl-3 rounded-r-lg"
            style="border-color: #e67e22; background: linear-gradient(to right, rgba(230, 126, 34, 0.15), rgba(230, 126, 34, 0.05), transparent);">
            <h3 class="font-bold mb-2 text-orange-700">👅 口感体验</h3>
            <p class="text-sm text-gray-700 mb-3 leading-relaxed">
                🔥牙齿轻轻一碰就爆汁！果肉像初雪般细嫩<br>
                💥甜度直接拉满18°+ 却完全不齁嗓子！<br>
                ❄️冰镇后吃绝了！像在啃液态蜂蜜冻<br>
                ⚠️温馨提示：吃前备好纸巾 汁水多到能洗脸
            </p>
        </div>

        <div class="mb-5 border-l-4 pl-3 rounded-r-lg"
            style="border-color: #3498db; background: linear-gradient(to right, rgba(52, 152, 219, 0.15), rgba(52, 152, 219, 0.05), transparent);">
            <h3 class="font-bold mb-2 text-blue-700">💪 营养价值</h3>
            <p class="text-sm text-gray-700 mb-3 leading-relaxed">
                🍏维C含量≈3颗柠檬 熬夜党快码住<br>
                🍎果胶含量MAX 噗噗困难户救星<br>
                🍐每天1颗=给肠道做瑜伽<br>
                👩👧适配人群：健身党/宝妈/996打工人
            </p>
        </div>

        <div class="mb-5 border-l-4 pl-3 rounded-r-lg"
            style="border-color: #9b59b6; background: linear-gradient(to right, rgba(155, 89, 182, 0.15), rgba(155, 89, 182, 0.05), transparent);">
            <h3 class="font-bold mb-2 text-purple-700">🍽️ 神仙吃法</h3>
            <p class="text-sm text-gray-700 mb-3 leading-relaxed">
                ☀️早起切块拌酸奶碗 唤醒甜甜一整天<br>
                🍵下午茶做成ins风水果拼盘 秒杀甜品<br>
                🍹榨汁加气泡水+薄荷 自制冷饮店爆款<br>
                📸对半切开摆盘发朋友圈 收获99+点赞
            </p>
        </div>

        <div class="mt-5 text-center p-3 rounded-lg bg-gradient-to-r from-pink-50 to-red-50">
            <p class="text-sm text-red-600">🌟现在下单送苹果花胸针！把春天别在衣襟上～</p>
        </div>
    `;

    const generateCopyBtn = document.getElementById('generateCopyBtn');
    const aiGeneratingContainer = document.getElementById('aiGeneratingContainer');
    const aiProgressBar = document.getElementById('aiProgressBar');
    const contentEditor = document.getElementById('contentEditor');
    const staticContent = document.getElementById('staticContent');

    if (generateCopyBtn && aiGeneratingContainer && aiProgressBar) {
        generateCopyBtn.addEventListener('click', function () {
            // 显示生成状态
            aiGeneratingContainer.classList.remove('hidden');
            generateCopyBtn.disabled = true;
            generateCopyBtn.style.opacity = '0.7';

            // 模拟进度条动画
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += 2;
                aiProgressBar.style.width = `${progress}%`;

                if (progress >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => {
                        // 更新内容
                        if (contentEditor) contentEditor.innerHTML = optimizedContent;
                        if (staticContent) staticContent.innerHTML = optimizedContent;

                        // 隐藏生成状态
                        aiGeneratingContainer.classList.add('hidden');
                        generateCopyBtn.disabled = false;
                        generateCopyBtn.style.opacity = '1';

                        // 显示成功提示
                        showAiSuccess();
                    }, 500);
                }
            }, 50);
        });
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
    notification.style.backgroundColor = 'rgba(76, 175, 80, 0.9)';
    notification.style.color = 'white';
    notification.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
    notification.style.zIndex = '100';
    notification.style.transition = 'opacity 0.5s, transform 0.5s';

    document.body.appendChild(notification);

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
    let bgColor = 'rgba(33, 150, 243, 0.9)'; // 默认蓝色
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