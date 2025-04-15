/**
 * 禾语智宣 - 选择发布平台页面脚本
 * 提供粒子流、浮动背景以及平台选择交互逻辑
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log('发布平台选择页面JS加载完成');

    // 初始化粒子背景
    initParticlesBackground();

    // 初始化浮动背景
    initFloatingBackground();

    // 初始化平台选择
    initPlatformSelection();

    // 初始化AI助手推荐
    initAIRecommendation();

    // 初始化交互效果
    initInteractionEffects();

    // 初始化发布按钮功能
    initPublishButton();

    // 初始化步骤切换
    initStepNavigation();

    // 修复iOS上的滚动问题
    fixIOSScroll();
});

/**
 * 初始化粒子背景效果
 */
function initParticlesBackground() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": window.innerWidth < 768 ? 10 : 20,
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
     * 初始化平台选择功能
     */
    function initPlatformSelection() {
    const platformCards = document.querySelectorAll('.platform-card');
    const selectedPlatforms = new Set();
    const maxSelections = 5; // 最大选择数量
    const platformCounter = document.getElementById('selected-count');

    // 初始化checkmark显示
        platformCards.forEach(card => {
        // 确保小红书默认选择的checkmark正确显示
        if (card.classList.contains('selected')) {
            const checkmark = card.querySelector('.checkmark');
            if (checkmark && !checkmark.querySelector('i')) {
                checkmark.innerHTML = '<i class="fas fa-check text-white text-xs"></i>';
            }

            // 获取平台名称并添加到已选择集合中
            const platformName = card.querySelector('.platform-name').textContent;
            const platformId = platformName; // 使用平台名称作为ID
            selectedPlatforms.add(platformId);
        }
    });

    // 从localStorage获取之前选择的平台
    const savedPlatforms = localStorage.getItem('selectedPlatforms');
    if (savedPlatforms) {
        try {
            const platforms = JSON.parse(savedPlatforms);
            platforms.forEach(platform => {
                selectedPlatforms.add(platform);
            });

            // 更新UI以显示之前的选择
            platformCards.forEach(card => {
                const platformName = card.querySelector('.platform-name').textContent;
                const platformId = platformName; // 使用平台名称作为ID

                if (selectedPlatforms.has(platformId)) {
                    card.classList.add('selected');

                    // 确保checkmark显示正确
                    const checkmark = card.querySelector('.checkmark');
                    if (checkmark && !checkmark.querySelector('i')) {
                        checkmark.innerHTML = '<i class="fas fa-check text-white text-xs"></i>';
                    }
                }
            });

            // 更新计数器
            updatePlatformCounter();
        } catch (e) {
            console.error('恢复选择的平台失败:', e);
        }
    }

    // 为每个平台卡片添加点击事件
    platformCards.forEach(card => {
        card.addEventListener('click', function () {
            // 获取平台名称作为ID
            const platformName = this.querySelector('.platform-name').textContent;
            const platformId = platformName;

            // 获取checkmark元素
            const checkmark = this.querySelector('.checkmark');

            if (this.classList.contains('selected')) {
                // 取消选择
                this.classList.remove('selected');
                selectedPlatforms.delete(platformId);

                // 移除对钩图标
                if (checkmark) {
                    checkmark.innerHTML = '';
                }

                showToast(`已取消选择 ${platformName}`, 'info');
                    } else {
                // 检查是否超过最大选择数量
                if (selectedPlatforms.size >= maxSelections) {
                    showToast(`最多只能选择 ${maxSelections} 个平台`, 'warning');
                    return;
                }

                // 添加选择
                this.classList.add('selected');
                selectedPlatforms.add(platformId);

                // 添加对钩图标
                if (checkmark) {
                    checkmark.innerHTML = '<i class="fas fa-check text-white text-xs"></i>';
                }

                // 添加选择动画
                addSelectionAnimation(this);

                showToast(`已选择 ${platformName}`, 'success');
            }

            // 更新计数器
            updatePlatformCounter();

            // 保存选择到localStorage
            savePlatformSelections();
        });

        // 添加悬停效果
        card.addEventListener('mouseenter', function () {
            if (!this.classList.contains('selected')) {
                this.classList.add('hover');
            }
        });

        card.addEventListener('mouseleave', function () {
            this.classList.remove('hover');
        });
    });

    // 更新平台选择计数器
    function updatePlatformCounter() {
        if (platformCounter) {
            platformCounter.textContent = `${selectedPlatforms.size}/${maxSelections}`;

            // 根据选择数量更新颜色
            if (selectedPlatforms.size === 0) {
                platformCounter.classList.remove('text-green-500', 'text-yellow-500');
                platformCounter.classList.add('text-gray-400');
            } else if (selectedPlatforms.size < maxSelections) {
                platformCounter.classList.remove('text-gray-400', 'text-yellow-500');
                platformCounter.classList.add('text-green-500');
        } else {
                platformCounter.classList.remove('text-gray-400', 'text-green-500');
                platformCounter.classList.add('text-yellow-500');
            }
        }
    }

    // 保存平台选择到localStorage
    function savePlatformSelections() {
        const platforms = Array.from(selectedPlatforms);
        localStorage.setItem('selectedPlatforms', JSON.stringify(platforms));
    }

    // 初始化时更新计数器
    updatePlatformCounter();
}

/**
 * 添加平台选择动画效果
 * @param {HTMLElement} element - 要添加动画的元素
 */
function addSelectionAnimation(element) {
    // 创建并添加动画元素
    const animElement = document.createElement('div');
    animElement.className = 'selection-animation';
    element.appendChild(animElement);

    // 触发动画
    setTimeout(() => {
        animElement.classList.add('animate');

        // 动画结束后移除元素
        setTimeout(() => {
            animElement.remove();
        }, 700);
    }, 10);
}

/**
 * 初始化AI助手推荐
 */
function initAIRecommendation() {
    const aiRecommendBtn = document.querySelector('.ai-recommend-btn');
    if (!aiRecommendBtn) return;

    aiRecommendBtn.addEventListener('click', function () {
        // 显示生成中状态
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> AI分析中...';
        this.disabled = true;

        // 模拟AI分析过程
        setTimeout(() => {
            // 生成推荐平台
            generateRecommendedPlatforms();

            // 恢复按钮状态
            this.innerHTML = originalText;
            this.disabled = false;

            // 显示成功提示
            showToast('AI已为您推荐最适合的发布平台！', 'success');
        }, 2000);
    });

    function generateRecommendedPlatforms() {
        // 模拟根据内容和图片分析推荐平台
        const recommendedPlatforms = [
            'douyin', 'xiaohongshu', 'kuaishou'
        ];

        // 获取所有平台卡片
        const platformCards = document.querySelectorAll('.platform-card');

        // 先取消所有平台的选择
        platformCards.forEach(card => {
            card.classList.remove('selected');
        });

        // 选择推荐的平台
        platformCards.forEach(card => {
            const platformId = card.getAttribute('data-platform-id');

            if (recommendedPlatforms.includes(platformId)) {
                // 选中推荐平台
                card.classList.add('selected');

                // 添加推荐标记
                if (!card.querySelector('.ai-recommended')) {
                    const recommendBadge = document.createElement('div');
                    recommendBadge.className = 'ai-recommended';
                    recommendBadge.innerHTML = '<i class="fas fa-robot mr-1"></i>AI推荐';
                    card.appendChild(recommendBadge);

                    // 添加选择动画
                    addSelectionAnimation(card);
                }
            } else {
                // 移除推荐标记
                const recommendBadge = card.querySelector('.ai-recommended');
                if (recommendBadge) {
                    recommendBadge.remove();
                }
            }
        });

        // 更新选择数量
        const selectedPlatforms = new Set(recommendedPlatforms);
        const platformCounter = document.getElementById('selected-count');
        if (platformCounter) {
            platformCounter.textContent = `${selectedPlatforms.size}/5`;
            platformCounter.classList.remove('text-gray-400');
            platformCounter.classList.add('text-green-500');
        }

        // 保存推荐到localStorage
        localStorage.setItem('selectedPlatforms', JSON.stringify(Array.from(selectedPlatforms)));

        // 显示AI分析结果面板
        showAIAnalysisPanel(recommendedPlatforms);
    }

    function showAIAnalysisPanel(platforms) {
        // 检查是否已存在分析面板
        let analysisPanel = document.getElementById('ai-analysis-panel');

        if (!analysisPanel) {
            // 创建分析面板
            analysisPanel = document.createElement('div');
            analysisPanel.id = 'ai-analysis-panel';
            analysisPanel.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50';
            analysisPanel.innerHTML = `
                <div class="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full mx-4 transform transition-all">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-bold text-gray-800">
                            <i class="fas fa-chart-line text-green-500 mr-2"></i>AI平台分析报告
                        </h3>
                        <button id="close-analysis" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="mb-4">
                        <div class="text-sm text-gray-500 mb-2">根据您的内容和图片分析，以下平台最适合您发布:</div>
                        <div id="ai-platforms" class="flex flex-wrap gap-2 mb-4"></div>
                    </div>
                    <div class="border-t border-gray-100 pt-4">
                        <div class="text-sm font-medium text-gray-700 mb-2">分析理由：</div>
                        <div class="text-sm text-gray-600">
                            <p class="mb-2">1. 您的农产品图片清晰度高，色彩鲜艳，适合视觉导向的平台。</p>
                            <p class="mb-2">2. 您的产品描述强调有机和健康特性，符合小红书等平台用户的关注点。</p>
                            <p class="mb-2">3. 根据近期数据分析，推荐的平台在农产品品类有较高的用户参与度。</p>
                            <p>4. 您的内容风格适合短视频和图文结合的平台，能获得更高的曝光率。</p>
                        </div>
                    </div>
                    <div class="mt-6 text-right">
                        <button id="accept-recommendation" class="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-green-600 hover:to-green-700 transition-colors">
                            采纳推荐
                        </button>
                    </div>
                </div>
            `;

            document.body.appendChild(analysisPanel);

            // 添加平台图标
            const platformsContainer = analysisPanel.querySelector('#ai-platforms');
            platforms.forEach(platformId => {
                // 获取平台信息
                const platformCard = document.querySelector(`.platform-card[data-platform-id="${platformId}"]`);
                if (platformCard) {
                    const platformName = platformCard.querySelector('.platform-name').textContent;
                    const platformIcon = platformCard.querySelector('.platform-icon').cloneNode(true);

                    // 创建平台标签
                    const platformTag = document.createElement('div');
                    platformTag.className = 'flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm';
                    platformTag.appendChild(platformIcon);
                    platformTag.innerHTML += `<span class="ml-1">${platformName}</span>`;

                    platformsContainer.appendChild(platformTag);
                }
            });

            // 绑定关闭按钮事件
            const closeBtn = analysisPanel.querySelector('#close-analysis');
            closeBtn.addEventListener('click', function () {
                analysisPanel.classList.add('fade-out');
                setTimeout(() => {
                    analysisPanel.remove();
                }, 300);
            });

            // 绑定采纳推荐按钮事件
            const acceptBtn = analysisPanel.querySelector('#accept-recommendation');
            acceptBtn.addEventListener('click', function () {
                analysisPanel.classList.add('fade-out');
                setTimeout(() => {
                    analysisPanel.remove();
                }, 300);

                showToast('已采纳AI推荐的平台', 'success');
            });

            // 显示动画
            setTimeout(() => {
                analysisPanel.classList.add('show');
            }, 10);
        }
        }
    }

    /**
* 初始化交互效果
*/
function initInteractionEffects() {
    // 添加卡片悬停效果
    const cards = document.querySelectorAll('.platform-card, .step-card');
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
}

/**
 * 初始化发布按钮功能
 */
function initPublishButton() {
    const publishBtn = document.querySelector('.btn-publish');
    const successModal = document.getElementById('publishSuccessModal');
    const backToHomeBtn = document.getElementById('backToHomeBtn');
    const viewContentBtn = document.getElementById('viewContentBtn');

    if (!publishBtn || !successModal) return;

    publishBtn.addEventListener('click', function () {
        // 获取选择的平台
        const selectedPlatforms = document.querySelectorAll('.platform-card.selected');

        if (selectedPlatforms.length === 0) {
            showToast('请至少选择一个发布平台', 'warning');
            return;
        }

        // 显示发布中状态
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> 发布中...';
        this.disabled = true;
        this.classList.add('btn-publishing');

        // 显示进度模态框
        showPublishingProgress(selectedPlatforms);

        // 模拟发布过程
        setTimeout(() => {
            // 恢复按钮状态
            this.innerHTML = originalText;
            this.disabled = false;
            this.classList.remove('btn-publishing');

            // 更新并显示成功模态框
            updateSuccessModal(selectedPlatforms);

            // 显示成功模态框
            successModal.classList.add('show');
        }, 2000);
    });

    // 返回首页按钮点击事件
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', function () {
            // 先隐藏模态框，然后跳转
            successModal.classList.remove('show');

            setTimeout(() => {
                window.location.href = 'home.html';
            }, 300);
        });
    }

    // 查看内容按钮点击事件
    if (viewContentBtn) {
        viewContentBtn.addEventListener('click', function () {
            successModal.classList.remove('show');
            // 可以添加查看已发布内容的逻辑
            showToast('查看发布内容功能即将上线', 'info');
        });
    }

    /**
     * 显示发布进度模态框
     * @param {NodeList} platforms 选择的平台
     */
    function showPublishingProgress(platforms) {
        // 创建进度模态框
        let progressModal = document.getElementById('publishProgressModal');

        if (!progressModal) {
            progressModal = document.createElement('div');
            progressModal.id = 'publishProgressModal';
            progressModal.className = 'modal';
            progressModal.innerHTML = `
                <div class="modal-content publishing-modal">
                    <div class="publishing-animation">
                        <div class="spinner"></div>
                    </div>
                    <h3 class="text-lg font-bold mt-4 mb-2">正在发布内容</h3>
                    <p class="text-gray-600 mb-4">您的内容正在发布到所选平台，请稍候...</p>
                    <div id="platform-progress" class="platform-progress">
                    </div>
                </div>
            `;
            document.body.appendChild(progressModal);
        }

        // 添加平台进度
        const platformProgress = progressModal.querySelector('#platform-progress');
        platformProgress.innerHTML = '';

        platforms.forEach((platform, index) => {
            const platformName = platform.querySelector('.platform-name').textContent;
            const platformItem = document.createElement('div');
            platformItem.className = 'platform-item';
            platformItem.id = `platform-${index}`;
            platformItem.innerHTML = `
                <i class="fas fa-sync-alt fa-spin"></i>
                <span>${platformName}</span>
            `;
            platformProgress.appendChild(platformItem);

            // 模拟平台发布完成
            setTimeout(() => {
                platformItem.classList.add('done');
                platformItem.querySelector('i').className = 'fas fa-check-circle';
            }, 500 + (index * 300));
        });

        // 显示模态框
        progressModal.classList.add('show');

        // 2秒后自动关闭进度模态框
        setTimeout(() => {
            progressModal.classList.remove('show');
            setTimeout(() => {
                progressModal.remove();
            }, 300);
        }, 1800);
    }

    /**
     * 更新成功模态框
     * @param {NodeList} platforms 选择的平台
     */
    function updateSuccessModal(platforms) {
        // 获取平台名称列表
        const platformNames = Array.from(platforms).map(platform =>
            platform.querySelector('.platform-name').textContent
        );

        // 更新模态框文本
        const successText = document.getElementById('publishSuccessText');
        if (successText) {
            if (platformNames.length === 1) {
                successText.textContent = `您的内容已成功发布到 ${platformNames[0]}！`;
            } else {
                const lastPlatform = platformNames.pop();
                successText.textContent = `您的内容已成功发布到 ${platformNames.join('、')} 和 ${lastPlatform}！`;
            }
        }

        // 更新平台图标区域
        const platformContainer = document.getElementById('published-platforms');
        if (platformContainer) {
            platformContainer.innerHTML = '';

            platforms.forEach(platform => {
                const platformName = platform.querySelector('.platform-name').textContent;
                const platformIcon = platform.querySelector('.platform-icon').cloneNode(true);

                // 创建平台标签
                const platformTag = document.createElement('div');
                platformTag.className = 'flex flex-col items-center';

                // 创建图标容器
                const iconContainer = document.createElement('div');
                iconContainer.className = 'w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-1 relative';
                iconContainer.appendChild(platformIcon);

                // 添加成功标记
                const successMark = document.createElement('div');
                successMark.className = 'absolute -right-1 -top-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-bounce';
                successMark.innerHTML = '<i class="fas fa-check"></i>';
                iconContainer.appendChild(successMark);

                platformTag.appendChild(iconContainer);

                // 添加平台名称
                const nameSpan = document.createElement('span');
                nameSpan.className = 'text-xs text-gray-600';
                nameSpan.textContent = platformName;
                platformTag.appendChild(nameSpan);

                platformContainer.appendChild(platformTag);
            });
        }
    }
}

/**
 * 初始化步骤导航
 */
function initStepNavigation() {
    const stepCards = document.querySelectorAll('.step-card');
    const contentWrapper = document.querySelector('.content-wrapper');

    if (!stepCards.length || !contentWrapper) return;

    stepCards.forEach(card => {
        card.addEventListener('click', function () {
            const stepNumber = this.getAttribute('data-step');

            // 如果已经是当前步骤，不执行任何操作
            if (this.classList.contains('active')) return;

            // 移除所有步骤卡片的激活状态
            stepCards.forEach(c => c.classList.remove('active'));

            // 激活当前步骤卡片
            this.classList.add('active');

            // 模拟切换内容
            contentWrapper.style.opacity = '0';
            setTimeout(() => {
                // 这里可以根据步骤加载不同的内容
                updateContentForStep(stepNumber);
                contentWrapper.style.opacity = '1';
            }, 300);
        });
    });

    function updateContentForStep(stepNumber) {
        // 这个函数应该根据步骤号更新内容区域
        // 当前只是模拟实现，实际应用中可以加载不同的内容
        console.log(`切换到步骤 ${stepNumber}`);

        // 更新内容标题
        const contentTitle = document.querySelector('.content-title');
        if (contentTitle) {
            switch (stepNumber) {
                case '1':
                    contentTitle.textContent = '第一步：选择发布平台';
                    break;
                case '2':
                    contentTitle.textContent = '第二步：设置发布参数';
                    break;
                case '3':
                    contentTitle.textContent = '第三步：确认发布内容';
                    break;
                default:
                    contentTitle.textContent = '选择发布平台';
            }
        }
    }
}

/**
 * 修复iOS上的滚动问题
 */
function fixIOSScroll() {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.addEventListener('touchmove', function (e) {
            // 允许默认的滚动行为
        }, { passive: true });
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
window.publishPage = {
    showToast
}; 