/**
 * 宣传图文预览页面 - 功能脚本
 * 处理图片轮播、AI生成文案、模板切换等功能
 */
document.addEventListener('DOMContentLoaded', function () {
    // 获取元素
    const carouselImage = document.getElementById('carouselImage');
    const carouselIndicators = document.getElementById('carouselIndicators');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const generateCopyBtn = document.getElementById('generateCopyBtn');
    const aiGeneratingContainer = document.getElementById('aiGeneratingContainer');
    const aiProgressBar = document.getElementById('aiProgressBar');
    const previewTitle = document.querySelector('.text-lg.font-bold.mb-2');
    const previewDesc = document.querySelector('.p-4.border-b.border-gray-100 .text-sm.text-gray-700.leading-relaxed');
    const contentSections = document.querySelectorAll('.border-l-4 .text-sm.text-gray-700.mb-3.leading-relaxed');
    const imageContainer = document.querySelector('.image-container');

    // 开关状态
    let isCopyOptimized = true;
    let isLayoutOptimized = true;
    let isTopicEnabled = false;

    // 轮播图状态
    let currentIndex = 0;
    let autoplayInterval;
    let images = [];

    // 初始化组件
    initCarousel();
    initAIGeneration();
    initTemplateSelectors();
    initOptimizationSwitches();

    // 设置初始基础文案
    setupInitialContent();

    /**
     * 初始化轮播图功能
     */
    function initCarousel() {
        try {
            // 设置加载状态
            if (imageContainer) {
                imageContainer.classList.add('loading');
            }

            // 使用utils.js中的函数加载图片
            let images = [];
            if (typeof window.loadImagesFromStorage === 'function') {
                images = window.loadImagesFromStorage();
            } else {
                // 备用方案：直接从localStorage获取
                const uploadedImagesJSON = localStorage.getItem('uploadedImages');
                if (uploadedImagesJSON) {
                    try {
                        images = JSON.parse(uploadedImagesJSON);
                        console.log('从uploadedImages加载图片:', images);
                    } catch (e) {
                        console.error('解析uploadedImages失败:', e);
                    }
                }
            }

            // 如果依然没有图片，使用默认示例图片
            if (!images || images.length === 0) {
                console.log('未找到上传的图片，使用默认图片');

                // 显示无图片状态
                if (imageContainer) {
                    imageContainer.classList.remove('loading');
                    imageContainer.classList.add('no-image');
                    imageContainer.setAttribute('data-placeholder', '请上传产品图片');
                }

                // 使用示例图片
                images = [
                    "https://img.alicdn.com/imgextra/i3/O1CN01I45oTi1vdDnxRSC1I_!!6000000006198-0-tps-1080-720.jpg",
                    "https://img.alicdn.com/imgextra/i4/O1CN01A0iWb91wiXylQC0RL_!!6000000006347-0-tps-1080-720.jpg",
                    "https://img.alicdn.com/imgextra/i2/O1CN01Z0S2Kr1KpQnQ4YC4R_!!6000000001211-0-tps-1080-720.jpg",
                    "https://img.alicdn.com/imgextra/i1/O1CN01lMQRRE1xfrjKFAihs_!!6000000006471-0-tps-1080-720.jpg"
                ];
            }

            // 创建指示器
            if (carouselIndicators) {
                carouselIndicators.innerHTML = '';
                images.forEach((_, index) => {
                    const indicator = document.createElement('div');
                    indicator.classList.add('indicator');
                    if (index === 0) indicator.classList.add('active');
                    indicator.addEventListener('click', () => goToSlide(index));
                    carouselIndicators.appendChild(indicator);
                });
            }

            // 显示第一张图片
            if (images.length > 0 && carouselImage) {
                const imgSrc = typeof window.getImageSource === 'function'
                    ? window.getImageSource(images[0])
                    : getImageSource(images[0]);

                console.log('显示第一张图片:', imgSrc);

                // 图片加载完成后移除加载状态
                carouselImage.onload = function () {
                    if (imageContainer) {
                        imageContainer.classList.remove('loading');
                        imageContainer.classList.remove('no-image');
                    }
                    console.log('图片加载完成');
                };

                // 图片加载失败时显示错误状态
                carouselImage.onerror = function () {
                    console.error('图片加载失败:', imgSrc);
                    if (imageContainer) {
                        imageContainer.classList.remove('loading');
                        imageContainer.classList.add('no-image');
                        imageContainer.setAttribute('data-placeholder', '图片加载失败');
                    }
                    // 尝试使用默认图片
                    carouselImage.src = "https://img.alicdn.com/imgextra/i3/O1CN01I45oTi1vdDnxRSC1I_!!6000000006198-0-tps-1080-720.jpg";
                };

                carouselImage.src = imgSrc;
            }

            // 隐藏轮播按钮（如果只有一张图片）
            if (images.length <= 1) {
                if (prevBtn) prevBtn.style.display = 'none';
                if (nextBtn) nextBtn.style.display = 'none';
                if (carouselIndicators) carouselIndicators.style.display = 'none';
            } else {
                // 显示按钮
                if (prevBtn) prevBtn.style.display = 'flex';
                if (nextBtn) nextBtn.style.display = 'flex';

                // 绑定按钮事件
                if (prevBtn) prevBtn.addEventListener('click', prevImage);
                if (nextBtn) nextBtn.addEventListener('click', nextImage);

                // 启动自动轮播
                startAutoplay();

                // 鼠标悬停时暂停轮播
                if (imageContainer) {
                    imageContainer.addEventListener('mouseenter', stopAutoplay);
                    imageContainer.addEventListener('mouseleave', startAutoplay);
                }
            }
        } catch (error) {
            console.error('初始化轮播图失败:', error);

            // 出错时显示错误状态
            if (imageContainer) {
                imageContainer.classList.remove('loading');
                imageContainer.classList.add('no-image');
                imageContainer.setAttribute('data-placeholder', '图片加载失败');
            }

            if (carouselImage) {
                carouselImage.src = "https://img.alicdn.com/imgextra/i3/O1CN01I45oTi1vdDnxRSC1I_!!6000000006198-0-tps-1080-720.jpg";
            }
        }
    }

    /**
     * 获取图片源URL（处理不同格式的图片数据）
     * 如果utils.js中存在同名函数，该函数将不会被使用
     */
    function getImageSource(img) {
        // 这个函数是备用实现，优先使用utils.js中的版本
        if (!img) return "";

        if (typeof img === 'string') {
            return img;
        } else if (typeof img === 'object') {
            return img.preview || img.url || img.src || "";
        }

        return "";
    }

    /**
     * 切换到指定幻灯片
     */
    function goToSlide(index) {
        if (!images || images.length === 0) return;

        // 添加加载状态
        if (imageContainer) {
            imageContainer.classList.add('loading');
        }

        // 更新当前索引
        currentIndex = index;

        // 更新图片
        if (carouselImage) {
            const imgSrc = getImageSource(images[currentIndex]);
            carouselImage.onload = function () {
                if (imageContainer) {
                    imageContainer.classList.remove('loading');
                }
            };
            carouselImage.src = imgSrc;
        }

        // 更新指示器状态
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, i) => {
            if (i === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    /**
     * 显示上一张图片
     */
    function prevImage() {
        if (!images || images.length <= 1) return;
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        goToSlide(currentIndex);
        resetAutoplay();
    }

    /**
     * 显示下一张图片
     */
    function nextImage() {
        if (!images || images.length <= 1) return;
        currentIndex = (currentIndex + 1) % images.length;
        goToSlide(currentIndex);
        resetAutoplay();
    }

    /**
     * 开始自动播放
     */
    function startAutoplay() {
        stopAutoplay(); // 确保不会有多个计时器
        autoplayInterval = setInterval(() => {
            nextImage();
        }, 3000);
    }

    /**
     * 停止自动播放
     */
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }

    /**
     * 重置自动播放（点击按钮后重新开始计时）
     */
    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    /**
     * 设置初始基础文案
     */
    function setupInitialContent() {
        // 这些是初始的基础文案，用户可以编辑修改
        if (previewTitle) {
            previewTitle.textContent = "高山果园红富士苹果 | 有机种植 · 自然成熟 · 脆甜多汁";
        }

        if (previewDesc) {
            previewDesc.innerHTML = "✨ 来自高海拔山区的红富士苹果，采用有机种植方式，不使用化学农药和化肥，保证了果实的天然品质。每一口都能感受到新鲜与甜脆，是您日常水果的理想选择。";
        }

        if (contentSections && contentSections.length > 0) {
            // 设置产品特点
            if (contentSections[0]) {
                contentSections[0].textContent = "这款红富士苹果产自高海拔山区，生长环境优越，采用有机种植方式，不使用化学农药和化肥，保证了果实的天然品质。果实成熟度高，颜色红润，外观光亮诱人。";
            }

            // 设置口感体验
            if (contentSections[1]) {
                contentSections[1].textContent = "口感脆甜多汁，果肉细腻，香气怡人。咬一口，汁水四溢，甜度适中不腻口，是水果爱好者的不二之选。冷藏后食用，口感更佳。";
            }

            // 设置营养价值
            if (contentSections[2]) {
                contentSections[2].textContent = "富含多种维生素和膳食纤维，有助于肠道健康，增强免疫力。每天一个苹果，医生远离我！特别适合注重健康生活的现代人。";
            }

            // 设置食用建议
            if (contentSections[3]) {
                contentSections[3].textContent = "建议冷藏后食用，口感更佳。可以直接作为水果享用，也可切片加入沙拉或搭配酸奶食用。适合送礼或自用，一年四季皆宜。";
            }
        }
    }

    /**
     * 初始化优化开关
     */
    function initOptimizationSwitches() {
        // 优化文案开关
        const copySwitch = document.querySelector('.bg-white.rounded-xl.p-3.shadow-sm.mb-3:nth-child(2) .relative');
        if (copySwitch) {
            copySwitch.addEventListener('click', function () {
                isCopyOptimized = !isCopyOptimized;
                this.classList.toggle('bg-gray-300');
                this.classList.toggle('bg-green-500');
                const dot = this.querySelector('span');
                if (dot) {
                    dot.classList.toggle('right-1');
                    dot.classList.toggle('left-1');
                }
                showToast(isCopyOptimized ? '已开启文案优化' : '已关闭文案优化', 'info');
            });
        }

        // 优化排版开关
        const layoutSwitch = document.querySelector('.bg-white.rounded-xl.p-3.shadow-sm.mb-3:nth-child(3) .relative');
        if (layoutSwitch) {
            layoutSwitch.addEventListener('click', function () {
                isLayoutOptimized = !isLayoutOptimized;
                this.classList.toggle('bg-gray-300');
                this.classList.toggle('bg-green-500');
                const dot = this.querySelector('span');
                if (dot) {
                    dot.classList.toggle('right-1');
                    dot.classList.toggle('left-1');
                }
                showToast(isLayoutOptimized ? '已开启排版优化' : '已关闭排版优化', 'info');
            });
        }

        // 热门话题开关
        const topicSwitch = document.querySelector('.bg-white.rounded-xl.p-3.shadow-sm:last-child .relative');
        if (topicSwitch) {
            topicSwitch.addEventListener('click', function () {
                isTopicEnabled = !isTopicEnabled;
                this.classList.toggle('bg-gray-300');
                this.classList.toggle('bg-green-500');
                const dot = this.querySelector('span');
                if (dot) {
                    dot.classList.toggle('right-1');
                    dot.classList.toggle('left-1');
                }
                showToast(isTopicEnabled ? '已开启热门话题' : '已关闭热门话题', 'info');
            });
        }
    }

    /**
     * AI生成文案功能
     */
    function initAIGeneration() {
        if (!generateCopyBtn) return;

        generateCopyBtn.addEventListener('click', async function () {
            // 确保有图片可供分析
            if (!carouselImage || !carouselImage.src || carouselImage.src === '') {
                showToast('请先上传图片', 'error');
                return;
            }

            // 禁用按钮，显示生成状态
            generateCopyBtn.disabled = true;
            if (aiGeneratingContainer) {
                aiGeneratingContainer.classList.remove('hidden');
            }

            try {
                // 模拟AI生成进度
                let progress = 0;
                const interval = setInterval(() => {
                    progress += Math.random() * 5;
                    if (progress > 100) progress = 100;

                    if (aiProgressBar) {
                        aiProgressBar.style.width = progress + '%';
                    }

                    // 完成时应用新文案
                    if (progress === 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            // 生成文案
                            const result = generateSampleContent();

                            // 应用生成的文案
                            applyGeneratedContent(result);

                            // 隐藏生成状态，启用按钮
                            if (aiGeneratingContainer) {
                                aiGeneratingContainer.classList.add('hidden');
                            }
                            generateCopyBtn.disabled = false;

                            // 显示完成提示
                            showToast('文案生成完成', 'success');
                        }, 500);
                    }
                }, 200);
            } catch (error) {
                console.error('生成文案失败:', error);
                showToast('生成文案失败，请重试', 'error');

                // 出错时恢复按钮状态
                generateCopyBtn.disabled = false;
                if (aiGeneratingContainer) {
                    aiGeneratingContainer.classList.add('hidden');
                }
            }
        });

        /**
         * 生成示例内容（真实项目中应调用API）
         */
        function generateSampleContent() {
            return {
                title: "有机山地红富士苹果 | 鲜脆多汁 · 自然生长 · 营养丰富",
                description: "🌟 精选自海拔1200米以上的山地果园，每一颗红富士苹果都经过严格的有机种植标准，不使用化学农药和肥料，保留了水果的原始风味和营养价值。果肉脆嫩，汁水丰富，自然甜度适中，是您日常健康饮食的理想选择！",
                features: "产自高海拔山地果园，采用纯有机种植工艺，严格按照欧盟有机认证标准管理。果实个头均匀，表皮光滑，通体红润，自然光泽诱人。每一颗都是经过精心挑选，确保品质如一。",
                taste: "咬一口，清脆的口感伴随着丰富的果汁在口中迸发，自然甜度不腻口，带有淡淡的果香，余味中还有一丝清爽的酸，平衡了整体风味，让人忍不住再吃一口。",
                nutrition: "富含多种维生素、膳食纤维和抗氧化物质，有助于提升免疫力、促进肠道健康、减缓衰老。相比普通苹果，有机种植的富士苹果多酚含量更高，营养价值更为丰富。每100克仅含52大卡热量，是减肥期的理想零食。",
                suggestion: "最佳食用温度为4-8℃，建议冷藏后食用口感更佳。可直接享用，也可切片加入沙拉、搭配酸奶或制作苹果派。果皮中含有丰富的营养物质，建议连皮一起食用。适合全家人日常食用，尤其推荐给需要补充维生素的儿童和老人。"
            };
        }
    }

    /**
     * 应用生成的内容到界面
     */
    function applyGeneratedContent(result) {
        // 渐变应用文本的动画函数
        const applyWithAnimation = (element, newText) => {
            if (!element) return;

            // 先淡出
            element.style.transition = 'opacity 0.3s ease';
            element.style.opacity = '0';

            // 更新内容并淡入
            setTimeout(() => {
                element.textContent = newText;
                element.style.opacity = '1';
            }, 300);
        };

        // 应用标题
        if (previewTitle && result.title) {
            applyWithAnimation(previewTitle, result.title);
        }

        // 应用描述
        if (previewDesc && result.description) {
            applyWithAnimation(previewDesc, result.description);
        }

        // 应用详细内容
        if (contentSections && contentSections.length > 0) {
            // 产品特点
            if (contentSections[0] && result.features) {
                applyWithAnimation(contentSections[0], result.features);
            }

            // 口感体验
            if (contentSections[1] && result.taste) {
                applyWithAnimation(contentSections[1], result.taste);
            }

            // 营养价值
            if (contentSections[2] && result.nutrition) {
                applyWithAnimation(contentSections[2], result.nutrition);
            }

            // 食用建议
            if (contentSections[3] && result.suggestion) {
                applyWithAnimation(contentSections[3], result.suggestion);
            }
        }
    }

    /**
     * 初始化模板选择器
     */
    function initTemplateSelectors() {
        const templateOptions = document.querySelectorAll('.template-option');

        templateOptions.forEach(option => {
            option.addEventListener('click', function () {
                // 移除所有选中样式
                templateOptions.forEach(opt => {
                    opt.classList.remove('selected');
                    opt.classList.add('border-gray-200');
                });

                // 添加选中样式
                this.classList.add('selected');
                this.classList.remove('border-gray-200');

                // 获取模板名称
                const templateName = this.querySelector('.bg-black\\/60').textContent.trim();
                showToast(`已选择${templateName}`, 'success');

                // 这里可以添加模板切换的实际逻辑
                // applyTemplate(templateName);
            });
        });
    }

    /**
     * 显示提示信息（依赖common.js中的showToast函数）
     */
    function showToast(message, type) {
        if (typeof window.showToast === 'function') {
            window.showToast(message, type);
        } else {
            console.log(`${type}: ${message}`);
        }
    }
}); 