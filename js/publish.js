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

    // 检查是否有复制的文案内容
    checkContentCopied();
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
    let selectedPlatform = null; // 改为单个选择的平台
    const maxSelections = 1; // 修改为最大选择数量为1

    // 初始化checkmark显示
    platformCards.forEach(card => {
        // 确保小红书默认选择的checkmark正确显示
        if (card.classList.contains('selected')) {
            const checkmark = card.querySelector('.checkmark');
            if (checkmark && !checkmark.querySelector('i')) {
                checkmark.innerHTML = '<i class="fas fa-check text-white text-xs"></i>';
            }

            // 获取默认选择的平台
            selectedPlatform = card.querySelector('.platform-name').textContent.trim();
        }
    });

    // 为每个平台卡片添加点击事件
    platformCards.forEach(card => {
        card.addEventListener('click', function () {
            // 获取平台名称
            const platformName = this.querySelector('.platform-name').textContent.trim();

            // 获取checkmark元素
            const checkmark = this.querySelector('.checkmark');

            if (this.classList.contains('selected')) {
                // 取消选择
                this.classList.remove('selected');
                selectedPlatform = null;

                // 移除对钩图标
                if (checkmark) {
                    checkmark.innerHTML = '';
                }

            } else {
                // 如果已经有选择的平台，先取消之前的选择
                if (selectedPlatform) {
                    // 找到之前选择的平台卡片
                    const previousSelectedCard = Array.from(platformCards).find(card =>
                        card.querySelector('.platform-name').textContent.trim() === selectedPlatform
                    );

                    if (previousSelectedCard) {
                        previousSelectedCard.classList.remove('selected');
                        const prevCheckmark = previousSelectedCard.querySelector('.checkmark');
                        if (prevCheckmark) {
                            prevCheckmark.innerHTML = '';
                        }
                    }
                }

                // 添加新选择
                this.classList.add('selected');
                selectedPlatform = platformName;

                // 添加对钩图标
                if (checkmark) {
                    checkmark.innerHTML = '<i class="fas fa-check text-white text-xs"></i>';
                }

                // 添加选择动画
                addSelectionAnimation(this);
            }
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

    // 为开关按钮添加点击事件
    const timeToggle = document.getElementById('timeToggle');
    const tagToggle = document.getElementById('tagToggle');
    const timeOptions = document.getElementById('timeOptions');
    const tagOptions = document.getElementById('tagOptions');

    // 初始化开关样式
    initToggleSwitch(timeToggle);
    initToggleSwitch(tagToggle);

    // 添加点击事件
    if (timeToggle) {
        timeToggle.addEventListener('click', function () {
            toggleSwitch(this);

            // 显示/隐藏时间选项
            if (timeOptions) {
                if (this.classList.contains('active')) {
                    timeOptions.classList.add('show');
                } else {
                    timeOptions.classList.remove('show');
                }
            }

            // 获取功能名称和显示提示
            const featureName = this.closest('.setting-item').querySelector('.font-medium').textContent;
            const isActive = this.classList.contains('active');
            showToast(`${featureName}${isActive ? '已开启' : '已关闭'}`, isActive ? 'success' : 'info');
        });
    }

    if (tagToggle) {
        tagToggle.addEventListener('click', function () {
            toggleSwitch(this);

            // 显示/隐藏标签选项
            if (tagOptions) {
                if (this.classList.contains('active')) {
                    tagOptions.classList.add('show');
                } else {
                    tagOptions.classList.remove('show');
                }
            }

            // 获取功能名称和显示提示
            const featureName = this.closest('.setting-item').querySelector('.font-medium').textContent;
            const isActive = this.classList.contains('active');
            showToast(`${featureName}${isActive ? '已开启' : '已关闭'}`, isActive ? 'success' : 'info');
        });
    }

    // 初始化时间选项点击事件
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function () {
            // 移除其他时间槽的选中状态
            timeSlots.forEach(s => s.classList.remove('selected'));

            // 选中当前时间槽
            this.classList.add('selected');

            // 显示提示
            const time = this.getAttribute('data-time');
            showToast(`已选择${time}发布`, 'success');
        });
    });
}

/**
 * 初始化开关样式
 * @param {HTMLElement} toggleElement - 开关元素
 */
function initToggleSwitch(toggleElement) {
    if (!toggleElement) return;

    // 清空开关内的所有内容，避免重叠
    toggleElement.innerHTML = '';

    // 确保移除active类，以便重新初始化状态
    toggleElement.classList.remove('active');

    // 设置基本样式
    toggleElement.style.width = '44px';
    toggleElement.style.height = '24px';
    toggleElement.style.borderRadius = '12px';
    toggleElement.style.backgroundColor = '#cbd5e0';
    toggleElement.style.position = 'relative';
    toggleElement.style.cursor = 'pointer';
    toggleElement.style.transition = 'background-color 0.3s';

    // 添加开关圆点
    const circle = document.createElement('div');
    circle.className = 'toggle-circle';
    circle.style.width = '18px';
    circle.style.height = '18px';
    circle.style.borderRadius = '50%';
    circle.style.backgroundColor = 'white';
    circle.style.position = 'absolute';
    circle.style.top = '3px';
    circle.style.left = '3px';
    circle.style.transition = 'transform 0.3s';
    circle.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.2)';

    toggleElement.appendChild(circle);
}

/**
 * 切换开关状态
 * @param {HTMLElement} toggleElement - 开关元素
 */
function toggleSwitch(toggleElement) {
    if (!toggleElement) return;

    const circle = toggleElement.querySelector('.toggle-circle');

    if (toggleElement.classList.contains('active')) {
        // 关闭开关
        toggleElement.classList.remove('active');
        toggleElement.style.backgroundColor = '#cbd5e0';
        if (circle) {
            circle.style.transform = 'translateX(0)';
        }
    } else {
        // 开启开关
        toggleElement.classList.add('active');
        toggleElement.style.backgroundColor = '#48bb78';
        if (circle) {
            circle.style.transform = 'translateX(20px)';
        }
    }
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
        const selectedCard = document.querySelector('.platform-card.selected');

        if (!selectedCard) {
            showToast('请选择一个发布平台', 'warning');
            return;
        }

        const platformName = selectedCard.querySelector('.platform-name').textContent.trim();

        // 从localStorage获取预览页面的内容
        const previewContent = localStorage.getItem('previewContent');
        // 默认内容，当没有找到保存的内容时使用
        const defaultContent = `
            高山果园红富士苹果 | 有机种植 · 自然成熟 · 脆甜多汁

            ✨来自高海拔山区的红富士苹果，采用有机种植方式，不使用化学农药和化肥，保证了果实的天然品质。每一口都能感受到新鲜与甜脆，是您日常水果的理想选择。

            🍎 产品特点
            这款红富士苹果产自高海拔山区，生长环境优越，采用有机种植方式，不使用化学农药和化肥，保证了果实的天然品质。果实成熟度高，颜色红润，外观光亮诱人。

            👅 口感体验
            口感脆甜多汁，果肉细腻，香气怡人。咬一口，汁水四溢，甜度适中不腻口，是水果爱好者的不二之选。冷藏后食用，口感更佳。

            💪 营养价值
            富含多种维生素和膳食纤维，有助于肠道健康，增强免疫力。每天一个苹果，医生远离我！特别适合注重健康生活的现代人。

            🍽️ 食用建议
            建议冷藏后食用，口感更佳。可以直接作为水果享用，也可切片加入沙拉、搭配酸奶或制作苹果派。苹果还能制作成鲜榨果汁，搭配其他水果制作特色饮品，带来清新健康的口感体验。
        `;

        // 根据选择的平台执行不同的发布逻辑
        switch (platformName) {
            case '小红书':
                // 小红书发布页面URL
                const xiaohongshuPublishUrl = 'https://creator.xiaohongshu.com/publish/publish';

                // 将内容保存到localStorage，以便在小红书页面使用
                localStorage.setItem('xhsContent', previewContent || defaultContent);

                // 显示跳转提示
                showToast('正在跳转到小红书发布页面...', 'info');

                // 添加小红书内容填充脚本
                const xhsFillScript = `
                    // 等待小红书页面加载完成后执行
                    window.addEventListener('load', function() {
                        setTimeout(function() {
                            // 获取从禾语智宣传输过来的内容
                            const xhsContent = localStorage.getItem('xhsContent');
                            if (!xhsContent) return;
                            
                            // 尝试不同的选择器查找小红书的文本编辑区
                            const possibleSelectors = [
                                '.publish-editor', 
                                '[contenteditable="true"]', 
                                'textarea',
                                '.editor-container [contenteditable="true"]',
                                '.note-editor-container [contenteditable="true"]',
                                '.content-edit-area'
                            ];
                            
                            let editor = null;
                            for (const selector of possibleSelectors) {
                                const elements = document.querySelectorAll(selector);
                                if (elements && elements.length > 0) {
                                    // 尝试找到最有可能是主编辑器的元素
                                    for (const el of elements) {
                                        if (el.offsetWidth > 200 && el.offsetHeight > 100) {
                                            editor = el;
                                            break;
                                        }
                                    }
                                    if (editor) break;
                                }
                            }
                            
                            if (editor) {
                                // 尝试填充内容到编辑器
                                try {
                                    // 先尝试设置innerHTML
                                    if (typeof editor.innerHTML !== 'undefined') {
                                        editor.innerHTML = xhsContent.replace(/\\n/g, '<br>');
                                    } 
                                    // 再尝试设置value（用于textarea）
                                    else if (typeof editor.value !== 'undefined') {
                                        editor.value = xhsContent;
                                    }
                                    // 最后尝试设置innerText
                                    else {
                                        editor.innerText = xhsContent;
                                    }
                                    
                                    // 触发input和change事件
                                    ['input', 'change'].forEach(eventType => {
                                        const event = new Event(eventType, { bubbles: true });
                                        editor.dispatchEvent(event);
                                    });
                                    
                                    console.log('禾语智宣内容已自动填充到小红书');
                                } catch (err) {
                                    console.error('填充内容失败:', err);
                                }
                            } else {
                                console.warn('未找到小红书编辑器，请手动复制内容');
                                // 创建一个悬浮框显示内容，便于用户复制
                                const floatDiv = document.createElement('div');
                                floatDiv.style.position = 'fixed';
                                floatDiv.style.top = '20px';
                                floatDiv.style.right = '20px';
                                floatDiv.style.width = '300px';
                                floatDiv.style.maxHeight = '80vh';
                                floatDiv.style.overflowY = 'auto';
                                floatDiv.style.background = 'white';
                                floatDiv.style.border = '1px solid #ddd';
                                floatDiv.style.borderRadius = '8px';
                                floatDiv.style.padding = '15px';
                                floatDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                                floatDiv.style.zIndex = '9999';
                                floatDiv.innerHTML = \`
                                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
                                        <b>禾语智宣内容</b>
                                        <button id="copyBtn" style="background:#9aa338;color:white;border:none;border-radius:4px;padding:5px 10px;cursor:pointer">复制</button>
                                    </div>
                                    <pre style="white-space:pre-wrap;word-break:break-word">\${xhsContent}</pre>
                                \`;
                                document.body.appendChild(floatDiv);
                                
                                // 添加复制功能
                                document.getElementById('copyBtn').addEventListener('click', function() {
                                    navigator.clipboard.writeText(xhsContent).then(function() {
                                        this.textContent = '已复制!';
                                        setTimeout(() => this.textContent = '复制', 2000);
                                    }.bind(this)).catch(err => {
                                        console.error('复制失败:', err);
                                    });
                                });
                            }
                        }, 2000); // 给页面加载一些时间
                    });
                `;

                // 将填充脚本保存到localStorage
                localStorage.setItem('xhsFillScript', xhsFillScript);

                // 在新标签页打开小红书
                window.open(xiaohongshuPublishUrl, '_blank');
                break;

            case '抖音':
                // 抖音发布页面URL
                const douyinPublishUrl = 'https://creator.douyin.com/creator-micro/content/upload';

                // 将内容保存到localStorage，以便在抖音页面使用
                localStorage.setItem('dyContent', previewContent || defaultContent);

                // 显示跳转提示
                showToast('正在跳转到抖音发布页面...', 'info');

                // 添加抖音内容填充脚本
                const dyFillScript = `
                    // 等待抖音页面加载完成后执行
                    window.addEventListener('load', function() {
                        setTimeout(function() {
                            // 获取从禾语智宣传输过来的内容
                            const dyContent = localStorage.getItem('dyContent');
                            if (!dyContent) return;
                            
                            // 尝试不同的选择器查找抖音的文本编辑区
                            const possibleSelectors = [
                                '.editor-input-content',
                                '.public-DraftEditor-content',
                                '[contenteditable="true"]',
                                'textarea',
                                '.caption-textarea'
                            ];
                            
                            let editor = null;
                            for (const selector of possibleSelectors) {
                                const elements = document.querySelectorAll(selector);
                                if (elements && elements.length > 0) {
                                    // 尝试找到最有可能是主编辑器的元素
                                    for (const el of elements) {
                                        if (el.offsetWidth > 100 && el.offsetHeight > 30) {
                                            editor = el;
                                            break;
                                        }
                                    }
                                    if (editor) break;
                                }
                            }
                            
                            if (editor) {
                                // 尝试填充内容到编辑器
                                try {
                                    // 先尝试设置innerHTML
                                    if (typeof editor.innerHTML !== 'undefined') {
                                        editor.innerHTML = dyContent.replace(/\\n/g, '<br>');
                                    } 
                                    // 再尝试设置value（用于textarea）
                                    else if (typeof editor.value !== 'undefined') {
                                        editor.value = dyContent;
                                    }
                                    // 最后尝试设置innerText
                                    else {
                                        editor.innerText = dyContent;
                                    }
                                    
                                    // 触发input和change事件
                                    ['input', 'change'].forEach(eventType => {
                                        const event = new Event(eventType, { bubbles: true });
                                        editor.dispatchEvent(event);
                                    });
                                    
                                    console.log('禾语智宣内容已自动填充到抖音');
                                } catch (err) {
                                    console.error('填充内容失败:', err);
                                }
                            } else {
                                console.warn('未找到抖音编辑器，请手动复制内容');
                                // 创建一个悬浮框显示内容，便于用户复制
                                const floatDiv = document.createElement('div');
                                floatDiv.style.position = 'fixed';
                                floatDiv.style.top = '20px';
                                floatDiv.style.right = '20px';
                                floatDiv.style.width = '300px';
                                floatDiv.style.maxHeight = '80vh';
                                floatDiv.style.overflowY = 'auto';
                                floatDiv.style.background = 'white';
                                floatDiv.style.border = '1px solid #ddd';
                                floatDiv.style.borderRadius = '8px';
                                floatDiv.style.padding = '15px';
                                floatDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                                floatDiv.style.zIndex = '9999';
                                floatDiv.innerHTML = \`
                                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
                                        <b>禾语智宣内容</b>
                                        <button id="copyBtn" style="background:#111827;color:white;border:none;border-radius:4px;padding:5px 10px;cursor:pointer">复制</button>
                                    </div>
                                    <pre style="white-space:pre-wrap;word-break:break-word">\${dyContent}</pre>
                                \`;
                                document.body.appendChild(floatDiv);
                                
                                // 添加复制功能
                                document.getElementById('copyBtn').addEventListener('click', function() {
                                    navigator.clipboard.writeText(dyContent).then(function() {
                                        this.textContent = '已复制!';
                                        setTimeout(() => this.textContent = '复制', 2000);
                                    }.bind(this)).catch(err => {
                                        console.error('复制失败:', err);
                                    });
                                });
                            }
                        }, 2000); // 给页面加载一些时间
                    });
                `;

                // 将填充脚本保存到localStorage
                localStorage.setItem('dyFillScript', dyFillScript);

                // 在新标签页打开抖音
                window.open(douyinPublishUrl, '_blank');
                break;

            case '微信视频号':
                // 微信视频号发布页面URL
                const weixinPublishUrl = 'https://channels.weixin.qq.com/platform/post/create';

                // 将内容保存到localStorage，以便在微信视频号页面使用
                localStorage.setItem('wxContent', previewContent || defaultContent);

                // 显示跳转提示
                showToast('正在跳转到微信视频号发布页面...', 'info');

                // 添加微信视频号内容填充脚本
                const wxFillScript = `
                    // 等待微信视频号页面加载完成后执行
                    window.addEventListener('load', function() {
                        setTimeout(function() {
                            // 获取从禾语智宣传输过来的内容
                            const wxContent = localStorage.getItem('wxContent');
                            if (!wxContent) return;
                            
                            // 尝试不同的选择器查找微信视频号的文本编辑区
                            const possibleSelectors = [
                                '.editor-content',
                                '.rich-text-editor',
                                '[contenteditable="true"]',
                                'textarea',
                                '.weui-textarea'
                            ];
                            
                            let editor = null;
                            for (const selector of possibleSelectors) {
                                const elements = document.querySelectorAll(selector);
                                if (elements && elements.length > 0) {
                                    // 尝试找到最有可能是主编辑器的元素
                                    for (const el of elements) {
                                        if (el.offsetWidth > 100 && el.offsetHeight > 30) {
                                            editor = el;
                                            break;
                                        }
                                    }
                                    if (editor) break;
                                }
                            }
                            
                            if (editor) {
                                // 尝试填充内容到编辑器
                                try {
                                    // 先尝试设置innerHTML
                                    if (typeof editor.innerHTML !== 'undefined') {
                                        editor.innerHTML = wxContent.replace(/\\n/g, '<br>');
                                    } 
                                    // 再尝试设置value（用于textarea）
                                    else if (typeof editor.value !== 'undefined') {
                                        editor.value = wxContent;
                                    }
                                    // 最后尝试设置innerText
                                    else {
                                        editor.innerText = wxContent;
                                    }
                                    
                                    // 触发input和change事件
                                    ['input', 'change'].forEach(eventType => {
                                        const event = new Event(eventType, { bubbles: true });
                                        editor.dispatchEvent(event);
                                    });
                                    
                                    console.log('禾语智宣内容已自动填充到微信视频号');
                                } catch (err) {
                                    console.error('填充内容失败:', err);
                                }
                            } else {
                                console.warn('未找到微信视频号编辑器，请手动复制内容');
                                // 创建一个悬浮框显示内容，便于用户复制
                                const floatDiv = document.createElement('div');
                                floatDiv.style.position = 'fixed';
                                floatDiv.style.top = '20px';
                                floatDiv.style.right = '20px';
                                floatDiv.style.width = '300px';
                                floatDiv.style.maxHeight = '80vh';
                                floatDiv.style.overflowY = 'auto';
                                floatDiv.style.background = 'white';
                                floatDiv.style.border = '1px solid #ddd';
                                floatDiv.style.borderRadius = '8px';
                                floatDiv.style.padding = '15px';
                                floatDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                                floatDiv.style.zIndex = '9999';
                                floatDiv.innerHTML = \`
                                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
                                        <b>禾语智宣内容</b>
                                        <button id="copyBtn" style="background:#07C160;color:white;border:none;border-radius:4px;padding:5px 10px;cursor:pointer">复制</button>
                                    </div>
                                    <pre style="white-space:pre-wrap;word-break:break-word">\${wxContent}</pre>
                                \`;
                                document.body.appendChild(floatDiv);
                                
                                // 添加复制功能
                                document.getElementById('copyBtn').addEventListener('click', function() {
                                    navigator.clipboard.writeText(wxContent).then(function() {
                                        this.textContent = '已复制!';
                                        setTimeout(() => this.textContent = '复制', 2000);
                                    }.bind(this)).catch(err => {
                                        console.error('复制失败:', err);
                                    });
                                });
                            }
                        }, 2000); // 给页面加载一些时间
                    });
                `;

                // 将填充脚本保存到localStorage
                localStorage.setItem('wxFillScript', wxFillScript);

                // 在新标签页打开微信视频号
                window.open(weixinPublishUrl, '_blank');
                break;

            default:
                // 显示不支持的平台提示
                showToast(`暂不支持发布到 ${platformName}`, 'warning');
                break;
        }
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

    // 如果不存在，创建一个新的toast元素
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';

        // 添加基本样式
        toast.style.position = 'fixed';
        toast.style.top = '80px'; // 改为顶部显示
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.padding = '10px 20px';
        toast.style.borderRadius = '25px';
        toast.style.color = 'white';
        toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        toast.style.zIndex = '9999';
        toast.style.display = 'flex';
        toast.style.alignItems = 'center';
        toast.style.justifyContent = 'center';
        toast.style.transition = 'all 0.3s ease';
        toast.style.opacity = '0';
        toast.style.visibility = 'hidden';
        toast.style.fontSize = '14px';
        toast.style.fontWeight = '500';

        document.body.appendChild(toast);
    } else {
        // 如果toast已存在，确保位置设置为顶部
        toast.style.top = '80px';
        toast.style.bottom = 'auto';
    }

    // 定义icon变量
    let icon = '';

    // 根据类型设置不同的背景色
    switch (type) {
        case 'success':
            toast.style.backgroundColor = 'rgba(72, 187, 120, 0.95)';
            icon = '<i class="fas fa-check-circle mr-2"></i>';
            break;
        case 'error':
            toast.style.backgroundColor = 'rgba(245, 101, 101, 0.95)';
            icon = '<i class="fas fa-times-circle mr-2"></i>';
            break;
        case 'warning':
            toast.style.backgroundColor = 'rgba(237, 137, 54, 0.95)';
            icon = '<i class="fas fa-exclamation-triangle mr-2"></i>';
            break;
        case 'info':
        default:
            toast.style.backgroundColor = 'rgba(66, 153, 225, 0.95)';
            icon = '<i class="fas fa-info-circle mr-2"></i>';
            break;
    }

    // 设置内容
    toast.innerHTML = `${icon}${message}`;

    // 添加额外的样式调整
    const iconElement = toast.querySelector('i');
    if (iconElement) {
        iconElement.style.marginRight = '8px';
    }

    // 显示提示
    toast.style.visibility = 'visible';
    toast.style.opacity = '1';

    // 自动关闭
    setTimeout(() => {
        toast.style.opacity = '0';

        // 等待动画完成后隐藏元素
        setTimeout(() => {
            toast.style.visibility = 'hidden';
        }, 300);
    }, 3000);
}

/**
 * 检查是否有从预览页面复制的文案内容
 */
function checkContentCopied() {
    const contentCopied = localStorage.getItem('contentCopied');

    if (contentCopied === 'true') {
        // 显示提示
        showToast('文案已复制到剪贴板，可随时粘贴使用', 'success');

        // 清除标志，避免下次进入页面仍显示提示
        localStorage.removeItem('contentCopied');
    }
}

// 导出公共函数
window.publishPage = {
    showToast
}; 