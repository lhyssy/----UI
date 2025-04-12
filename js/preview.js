/**
 * 宣传图文预览页面 - 功能脚本
 * 处理图片轮播、AI生成文案、模板切换等功能
 */
document.addEventListener('DOMContentLoaded', function() {
    // 获取元素
    const carouselImage = document.getElementById('carouselImage');
    const carouselIndicators = document.getElementById('carouselIndicators');
    const prevImageBtn = document.getElementById('prevImageBtn');
    const nextImageBtn = document.getElementById('nextImageBtn');
    const generateCopyBtn = document.getElementById('generateCopyBtn');
    const aiGeneratingContainer = document.getElementById('aiGeneratingContainer');
    const aiProgressBar = document.getElementById('aiProgressBar');
    const previewTitle = document.querySelector('.text-lg.font-bold.mb-2');
    const previewDesc = document.querySelector('.p-4.border-b.border-gray-100 .text-sm.text-gray-700.leading-relaxed');
    const contentSections = document.querySelectorAll('.border-l-4 .text-sm.text-gray-700.mb-3.leading-relaxed');
    
    // 开关状态
    let isCopyOptimized = true;
    let isLayoutOptimized = true;
    let isTopicEnabled = false;
    
    // 初始化组件
    const uploadedImages = loadImages();
    initAIGeneration();
    initTemplateSelectors();
    initOptimizationSwitches();
    
    // 设置初始基础文案
    setupInitialContent();
    
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
            copySwitch.addEventListener('click', function() {
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
            layoutSwitch.addEventListener('click', function() {
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
            topicSwitch.addEventListener('click', function() {
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
     * 处理图片加载
     */
    function loadImages() {
        let uploadedImages = [];
        let currentImageIndex = 0;
        
        try {
            // 首先检查是否有从单张图片预览跳转过来的情况
            const currentImage = localStorage.getItem('currentImage');
            
            if (currentImage) {
                // 如果有当前选中的图片，将它放在第一位
                uploadedImages.push(currentImage);
                localStorage.removeItem('currentImage'); // 清除当前图片标记
            }
            
            // 然后加载所有上传过的图片
            const storedImages = localStorage.getItem('uploadedImages');
            if (storedImages) {
                const parsedImages = JSON.parse(storedImages);
                
                // 避免重复添加当前图片
                if (currentImage) {
                    parsedImages.forEach(img => {
                        if (img !== currentImage) {
                            uploadedImages.push(img);
                        }
                    });
                } else {
                    uploadedImages = parsedImages;
                }
                
                // 设置第一张图片
                if (uploadedImages.length > 0 && carouselImage) {
                    carouselImage.src = uploadedImages[0];
                    
                    // 清空指示器
                    if (carouselIndicators) {
                        carouselIndicators.innerHTML = '';
                        
                        // 添加指示器
                        uploadedImages.forEach((_, index) => {
                            const indicator = document.createElement('div');
                            indicator.className = `image-carousel-indicator ${index === 0 ? 'active' : ''}`;
                            indicator.dataset.index = index;
                            
                            // 点击指示器切换图片
                            indicator.addEventListener('click', function() {
                                currentImageIndex = parseInt(this.dataset.index);
                                updateCarousel();
                            });
                            
                            carouselIndicators.appendChild(indicator);
                        });
                    }
                    
                    // 只有多张图片时才显示切换按钮
                    if (prevImageBtn && nextImageBtn) {
                        if (uploadedImages.length <= 1) {
                            prevImageBtn.style.display = 'none';
                            nextImageBtn.style.display = 'none';
                        } else {
                            prevImageBtn.style.display = 'flex';
                            nextImageBtn.style.display = 'flex';
                        }
                    }
                }
            }
        } catch (e) {
            console.error('加载图片失败:', e);
            showToast('加载图片失败，请返回重试', 'error');
        }
        
        // 更新轮播图
        function updateCarousel() {
            if (uploadedImages.length === 0 || !carouselImage) return;
            
            // 更新图片
            carouselImage.src = uploadedImages[currentImageIndex];
            
            // 更新指示器
            if (carouselIndicators) {
                const indicators = carouselIndicators.querySelectorAll('.image-carousel-indicator');
                indicators.forEach((indicator, index) => {
                    if (index === currentImageIndex) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }
        }
        
        // 上一张图片
        if (prevImageBtn) {
            prevImageBtn.addEventListener('click', function() {
                if (uploadedImages.length <= 1) return;
                
                currentImageIndex = (currentImageIndex - 1 + uploadedImages.length) % uploadedImages.length;
                updateCarousel();
            });
        }
        
        // 下一张图片
        if (nextImageBtn) {
            nextImageBtn.addEventListener('click', function() {
                if (uploadedImages.length <= 1) return;
                
                currentImageIndex = (currentImageIndex + 1) % uploadedImages.length;
                updateCarousel();
            });
        }
        
        return uploadedImages;
    }
    
    /**
     * AI生成文案功能
     */
    function initAIGeneration() {
        if (!generateCopyBtn) return;
        
        generateCopyBtn.addEventListener('click', function() {
            // 确保有图片可供分析
            if (!carouselImage || !carouselImage.src || carouselImage.src === '') {
                showToast('请先上传图片', 'error');
                return;
            }
            
            // 显示生成中状态
            generateCopyBtn.disabled = true;
            if (aiGeneratingContainer) {
                aiGeneratingContainer.classList.remove('hidden');
            }
            
            // 获取状态文本元素
            const progressStatus = document.querySelector('#aiGeneratingContainer .loading-text');
            
            // 模拟进度条
            let progress = 0;
            let progressInterval;
            
            if (aiProgressBar) {
                progressInterval = setInterval(() => {
                    progress += 2;
                    aiProgressBar.style.width = `${Math.min(progress, 90)}%`;
                    
                    // 更新状态文本
                    if (progressStatus) {
                        if (progress < 30) {
                            progressStatus.innerHTML = '分析原文内容中<span>.</span><span>.</span><span>.</span>';
                        } else if (progress < 60) {
                            progressStatus.innerHTML = '优化文案表达中<span>.</span><span>.</span><span>.</span>';
                        } else if (progress < 90) {
                            progressStatus.innerHTML = '提升内容质量中<span>.</span><span>.</span><span>.</span>';
                        }
                    }
                    
                    if (progress >= 90) {
                        clearInterval(progressInterval);
                    }
                }, 100);
            }
            
            // 调用SiliconFlow API生成文案
            generateCopyWithAI().then(result => {
                // 完成进度条
                if (aiProgressBar) {
                    aiProgressBar.style.width = '100%';
                }
                if (progressStatus) {
                    progressStatus.innerHTML = '生成完成！';
                }
                
                // 等待短暂动画后填充内容
                setTimeout(() => {
                    // 隐藏生成中状态
                    generateCopyBtn.disabled = false;
                    if (aiGeneratingContainer) {
                        aiGeneratingContainer.classList.add('hidden');
                    }
                    
                    // 填充生成的内容
                    if (result) {
                        // 应用生成的文案
                        applyGeneratedContent(result);
                        
                        // 显示成功提示
                        showToast('AI优化文案成功', 'success');
                        
                        // 平滑滚动到内容区域
                        if (previewTitle) {
                            previewTitle.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    } else {
                        showToast('优化文案失败，请重试', 'error');
                    }
                }, 500);
            }).catch(error => {
                console.error('AI生成失败:', error);
                
                // 隐藏生成中状态
                if (progressInterval) {
                    clearInterval(progressInterval);
                }
                if (aiProgressBar) {
                    aiProgressBar.style.width = '0%';
                }
                generateCopyBtn.disabled = false;
                if (aiGeneratingContainer) {
                    aiGeneratingContainer.classList.add('hidden');
                }
                
                // 显示详细错误提示
                let errorMessage = '生成文案失败';
                if (error.message) {
                    if (error.message.includes('API请求失败: 401')) {
                        errorMessage += '：API密钥无效或已过期';
                    } else if (error.message.includes('API请求失败: 429')) {
                        errorMessage += '：超出API调用限制，请稍后再试';
                    } else if (error.message.includes('API请求失败: 5')) {
                        errorMessage += '：服务器错误，请稍后再试';
                    } else {
                        errorMessage += '：' + error.message;
                    }
                }
                
                showToast(errorMessage, 'error');
            });
        });
    }
    
    /**
     * 应用生成的文案内容
     */
    function applyGeneratedContent(result) {
        // 创建一个应用动画效果的函数
        const applyWithAnimation = (element, newText) => {
            if (!element || !newText) return;
            
            // 添加淡出效果
            element.style.transition = 'opacity 0.3s ease';
            element.style.opacity = '0';
            
            // 等待淡出完成后更新内容
            setTimeout(() => {
                element.textContent = newText;
                element.style.opacity = '1';
                
                // 添加高亮效果
                element.style.backgroundColor = '#f0fdf4';
                setTimeout(() => {
                    element.style.backgroundColor = 'transparent';
                    element.style.transition = 'background-color 0.5s ease';
                }, 100);
            }, 300);
        };

        // 应用标题
        if (result.title && previewTitle) {
            applyWithAnimation(previewTitle, result.title);
        }

        // 应用描述
        if (result.description && previewDesc) {
            applyWithAnimation(previewDesc, result.description);
        }
        
        // 应用详细内容
        if (result.sections && result.sections.length > 0 && contentSections) {
            result.sections.forEach((section, index) => {
                if (section.content && contentSections[index]) {
                    applyWithAnimation(contentSections[index], section.content);
                }
            });
        }
    }
    
    /**
     * 使用SiliconFlow API生成文案
     */
    async function generateCopyWithAI() {
        // 模拟 API 调用延迟
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        return {
            title: "【今日优选】高山生态红富士苹果 | 自然有机种植 · 果香浓郁 · 营养丰富",
            description: "🌟 精选自海拔2000米以上的山地果园，阳光充足，昼夜温差大，自然生长周期长，造就了这款口感绝佳的红富士苹果。每一颗都经过精挑细选，保证新鲜送达您的餐桌，带来原生态的健康美味体验。",
            sections: [
                {
                    title: "产品特点",
                    content: "高海拔阳光充足，昼夜温差大，果实生长缓慢，营养更加丰富。采用有机种植方式，不使用化学农药和化肥，坚持生态友好理念，保证果实天然纯净。每一颗苹果都经过严格的筛选，确保品质卓越。土壤富含矿物质，灌溉用水来自山泉，品质远超普通果园。"
                },
                {
                    title: "口感体验",
                    content: "轻咬一口，清脆的声音伴随着果汁四溢，甜度适中且回甘持久，不会过分甜腻。果肉细腻多汁，香气浓郁怡人，带有独特的花蜜香调。冰镇后食用，口感更加清爽提神，是夏日解暑的绝佳选择。经冷藏处理后，脆甜感更加明显，细嚼慢咽，甘甜回味无穷。"
                },
                {
                    title: "营养价值",
                    content: "富含多种维生素、矿物质和膳食纤维，苹果多酚有助于抗氧化，促进肠道健康，增强免疫力。适合各年龄段人群食用，是健康饮食的理想选择。常言道：每天一个苹果，医生远离我，科学研究表明，苹果确实有助于维持心血管健康，降低氧化应激，对于现代人的健康生活方式具有重要价值。"
                },
                {
                    title: "食用建议",
                    content: "建议冷藏后食用，口感更佳。可以直接作为水果享用，也可切片加入沙拉、搭配酸奶或制作苹果派。苹果还能制作成鲜榨果汁，搭配其他水果制作特色饮品，带来清新健康的口感体验。秋冬季节可以做成热苹果茶，加入肉桂和少量蜂蜜，既暖身又健康。"
                }
            ]
        };
    }
    
    /**
     * 初始化模板选择器
     */
    function initTemplateSelectors() {
        const templateOptions = document.querySelectorAll('.template-option');
        const previewContent = document.querySelector('.preview-content');
        
        templateOptions.forEach(option => {
            option.addEventListener('click', function() {
                // 移除所有模板的选中状态
                templateOptions.forEach(t => t.classList.remove('selected'));
                
                // 添加当前模板的选中状态
                this.classList.add('selected');
                
                // 显示选中模板的提示
                if (this.querySelector('.bg-black')) {
                    const templateName = this.querySelector('.bg-black').textContent;
                    showToast(`已切换到${templateName}`, 'success');
                } else {
                    showToast('已切换模板', 'success');
                }
            });
        });
    }
}); 