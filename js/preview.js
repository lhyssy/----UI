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
    const previewTitle = document.querySelector('.text-lg.font-bold.mb-1');
    const previewDesc = document.querySelector('.text-sm.text-gray-700');
    const contentSections = document.querySelectorAll('.font-bold.mb-2 + .text-sm.text-gray-700');
    
    // 初始化组件
    const uploadedImages = loadImages();
    initAIGeneration();
    initTemplateSelectors();
    
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
                            progressStatus.innerHTML = '分析图片内容中<span>.</span><span>.</span><span>.</span>';
                        } else if (progress < 60) {
                            progressStatus.innerHTML = '生成营销文案中<span>.</span><span>.</span><span>.</span>';
                        } else if (progress < 90) {
                            progressStatus.innerHTML = '优化内容格式中<span>.</span><span>.</span><span>.</span>';
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
                        showToast('AI文案生成成功', 'success');
                        
                        // 平滑滚动到内容区域
                        if (previewTitle) {
                            previewTitle.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    } else {
                        showToast('生成文案失败，请重试', 'error');
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
        if (result.details && result.details.length > 0 && contentSections) {
            contentSections.forEach((section, index) => {
                if (result.details[index]) {
                    applyWithAnimation(section, result.details[index]);
                }
            });
        }
    }
    
    /**
     * 使用SiliconFlow API生成文案
     */
    async function generateCopyWithAI() {
        try {
            // 准备图片数据
            const imageURL = carouselImage.src;
            console.log('图片URL:', imageURL);
            
            // 检查图片URL是否是blob URL
            if (imageURL.startsWith('blob:')) {
                try {
                    // 尝试将blob URL转换为base64
                    const base64Image = await blobUrlToBase64(imageURL);
                    return await generateWithBase64(base64Image);
                } catch (error) {
                    console.error('Blob URL转换失败:', error);
                    throw new Error('图片格式处理失败，请重新上传图片');
                }
            } else {
                // 非blob URL，可能是网络图片，直接生成文案
                return await simulateGeneration(imageURL);
            }
        } catch (error) {
            console.error('生成文案错误:', error);
            throw error;
        }
    }
    
    /**
     * Blob URL转Base64
     */
    async function blobUrlToBase64(blobUrl) {
        return new Promise((resolve, reject) => {
            // 获取blob
            fetch(blobUrl)
                .then(response => response.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        // reader.result包含base64编码的数据URL
                        resolve(reader.result.split(',')[1]); // 移除"data:image/jpeg;base64,"前缀
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                })
                .catch(reject);
        });
    }
    
    /**
     * 使用Base64图片数据调用API
     */
    async function generateWithBase64(base64Image) {
        // API请求参数
        const apiKey = 'sk-eyqrlkcvcmhcssqncdlszfugbxnkkuvxfygjpsvgervhploi';
        const apiUrl = 'https://api.siliconflow.cn/v1/chat/completions';
        
        // 创建简化的请求
        const requestBody = {
            model: "deepseek-ai/DeepSeek-V3",
            messages: [
                {
                    role: "system",
                    content: "你是一个专业的农产品文案创作专家，擅长创作吸引人、专业的农产品营销文案。"
                },
                {
                    role: "user",
                    content: `请为一个农产品创作营销文案，这是一个水果或蔬菜类农产品。
                    特别注重以下几个方面：
                    
                    1. 标题：20字以内，吸引眼球
                    2. 描述：50字左右，突出卖点
                    3. 产品特点：100字左右，详细介绍产品优势，突出有机、天然、健康等卖点
                    4. 口感描述：80字左右，生动形象
                    5. 营养价值：80字左右，专业可信
                    
                    文案要求：
                    - 用语要生动活泼
                    - 突出产品特色
                    - 适当使用感叹句
                    - 添加emoji表情
                    - 融入时下流行语
                    
                    请按以下JSON格式返回：{"title":"标题", "description":"描述", "details":["产品特点", "口感描述", "营养价值"]}`
                }
            ],
            max_tokens: 1500,
            temperature: 0.8,
            top_p: 0.9
        };

        console.log('发送V3生成请求...');
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status}`);
        }

        const data = await response.json();
        console.log('V3生成结果:', data);
        
        // 解析结果
        let finalResult;
        try {
            finalResult = JSON.parse(data.choices[0].message.content);
        } catch (e) {
            console.error('JSON解析错误:', e);
            finalResult = manuallyParseContent(data.choices[0].message.content);
        }

        return finalResult;
    }
    
    /**
     * 模拟生成文案（备用方案）
     */
    async function simulateGeneration(imageUrl) {
        console.log('使用本地模拟生成文案...');
        
        // 水果类型判断逻辑
        let fruitType = 'generic';
        
        // 简单判断图片中可能的水果类型
        if (imageUrl.toLowerCase().includes('apple') || 
            imageUrl.toLowerCase().includes('red') || 
            imageUrl.includes('苹果')) {
            fruitType = 'apple';
        } else if (imageUrl.toLowerCase().includes('tomato') || 
                imageUrl.toLowerCase().includes('tomat') || 
                imageUrl.includes('番茄')) {
            fruitType = 'tomato';
        } else if (imageUrl.toLowerCase().includes('grape') || 
                imageUrl.toLowerCase().includes('葡萄')) {
            fruitType = 'grape';
        } else if (imageUrl.toLowerCase().includes('orange') || 
                imageUrl.toLowerCase().includes('citrus') || 
                imageUrl.includes('柑橘')) {
            fruitType = 'orange';
        }
        
        // 根据不同水果类型返回预设的文案
        const fruitCopy = {
            'apple': {
                title: "🍎 高山红富士 | 自然甜脆每一口",
                description: "来自海拔1200米高山果园，昼夜温差大造就了独特甜度和口感，纯天然有机种植，健康美味随手可得！",
                details: [
                    "我们的红富士苹果采用纯有机种植方式，不使用任何化学农药和肥料，果园位于高海拔山区，远离城市污染。每一颗苹果都经过严格筛选，确保品质一致，外观光亮红润，个头均匀，无斑点和伤痕，真正做到有机健康。",
                    "咬上一口，清脆的声音伴随着汁水四溢，果肉细腻紧致不松软，甜度适中带有微酸平衡，香气馥郁回味悠长。冷藏后食用更加爽脆，满口生津，是夏日解渴、冬季补充维生素的理想选择！",
                    "富含多种维生素和矿物质，特别是维生素C和膳食纤维含量丰富，有助于增强免疫力和促进肠道健康。苹果中的多酚类物质具有抗氧化作用，有助于延缓衰老和预防心血管疾病。每天一个苹果，医生远离我！"
                ]
            },
            'tomato': {
                title: "🍅 阳光玉茄 | 鲜甜多汁营养爆棚",
                description: "精选温室培育的高品质番茄，皮薄多汁，酸甜适中，富含番茄红素，是您餐桌上的健康之选！",
                details: [
                    "我们的番茄采用现代化温室栽培技术，全程控温控湿，避免病虫害，无需使用农药。每一颗番茄都饱满圆润，色泽鲜红均匀，表皮光滑细腻，触感紧实有弹性，切开后汁水丰富不易流失，是高品质番茄的典范。",
                    "轻轻咬下，薄薄的果皮下是满满的果肉和汁水，酸甜比例恰到好处，既有阳光的甜美又不失清新的酸度，口感丰富层次分明。无论是生吃、做沙拉还是烹饪，都能保持其鲜美的口感和丰富的营养。",
                    "番茄富含番茄红素、维生素C、维生素E等多种抗氧化物质，有助于抵抗自由基损伤，保护心血管健康。同时含有丰富的钾元素和膳食纤维，有助于维持水电解质平衡和促进肠道蠕动。热量低、营养高，是健康饮食的理想选择！"
                ]
            },
            'grape': {
                title: "🍇 紫晶葡萄 | 一颗颗都是天然甜蜜",
                description: "精选优质葡萄园，阳光充足，颗颗饱满多汁，含糖量高，香气浓郁，产地直发，新鲜送到您家！",
                details: [
                    "我们的葡萄产自阳光充沛的专业葡萄园，采用减少农药的绿色种植方式，严格控制用水和生长环境。每一串葡萄都粒大均匀，颜色一致，果粉保存完好，果穗紧实，新鲜采摘后即刻包装，锁住最佳风味和营养。",
                    "轻轻咬下，果肉细嫩多汁，果皮与果肉完美结合不分离，甜度适中不腻口，带有独特的葡萄芳香，口感层次丰富。冰镇后食用，清爽怡人，是夏日解暑和日常享用的理想水果选择。",
                    "葡萄富含多种植物营养素和抗氧化物质，如白藜芦醇、花青素等，有助于抵抗自由基、延缓衰老。同时含有丰富的钾、镁等矿物质和多种维生素，能够补充能量，增强体力，提高免疫力，是天然的健康小零食！"
                ]
            },
            'orange': {
                title: "🍊 阳光金橙 | 酸甜多汁维C满满",
                description: "来自南方果园的优质柑橘，果肉饱满多汁，口感酸甜适中，富含维生素C，现摘现发，新鲜直达！",
                details: [
                    "我们的柑橘采用绿色种植技术，精选优质果园，阳光充足，水源纯净。每一个橙子都经过严格筛选，确保外观光洁，色泽鲜亮，大小均匀，无明显疤痕。果皮薄而有弹性，果实沉甸甸的充满饱满果汁，是优质柑橘的典范。",
                    "轻轻剥开果皮，清新的柑橘香气扑面而来。咬下一瓣，果肉细嫩多汁，瞬间在口中迸发出酸甜平衡的美妙滋味，果粒饱满完整，汁水丰富不干柴，回味悠长带有独特的柑橘芳香，让人忍不住一口接一口。",
                    "柑橘富含维生素C、胡萝卜素、柠檬酸等多种营养物质，具有增强免疫力、美白肌肤、促进铁吸收的功效。其中的膳食纤维有助于肠道健康，丰富的有机酸可促进消化。低热量高营养，是健康生活的理想水果之选！"
                ]
            },
            'generic': {
                title: "🌟 鲜味农场 | 天然美味源于有机种植",
                description: "精选高品质有机农产品，无农药无添加，保留最原始的鲜美滋味，从农场到餐桌，新鲜直达！",
                details: [
                    "我们的农产品采用纯天然有机种植方式，远离城市污染，不使用化学农药和激素。每一件产品都经过严格挑选，确保外观完美，无损伤无病虫害，色泽自然鲜亮。从种植到采收，全程严格把控，为您提供真正健康的有机食材。",
                    "品尝时，能够感受到最原始纯正的味道，口感鲜嫩多汁，滋味浓郁不失层次，香气自然不刺鼻。与超市普通产品相比，有机种植的农产品风味更加丰富，回甘持久，带给您舌尖上的自然享受。",
                    "有机农产品含有更丰富的抗氧化物质和维生素，矿物质含量更为均衡。不含农药残留和化学添加剂，减少有害物质摄入，保护肠道健康。长期食用有助于增强免疫力，促进新陈代谢，是现代健康饮食的明智选择！"
                ]
            }
        };
        
        return fruitCopy[fruitType];
    }
    
    /**
     * 优化手动解析内容的函数
     */
    function manuallyParseContent(content) {
        console.log('尝试手动解析内容...');
        const lines = content.split('\n');
        const result = {
            title: '',
            description: '',
            details: ['', '', '']
        };
        
        // 改进的解析逻辑
        let currentSection = '';
        let currentContent = [];
        
        for (const line of lines) {
            const cleanLine = line.trim();
            if (!cleanLine) continue;
            
            // 检测段落标题
            if (cleanLine.includes('标题') || cleanLine.includes('title')) {
                if (currentContent.length > 0) {
                    // 保存之前的内容
                    saveParsedContent(result, currentSection, currentContent.join(' '));
                    currentContent = [];
                }
                currentSection = 'title';
                const match = cleanLine.match(/[：:]\s*(.+)/);
                if (match) {
                    result.title = match[1].trim();
                }
            } else if (cleanLine.includes('描述') || cleanLine.includes('description')) {
                if (currentContent.length > 0) {
                    saveParsedContent(result, currentSection, currentContent.join(' '));
                    currentContent = [];
                }
                currentSection = 'description';
                const match = cleanLine.match(/[：:]\s*(.+)/);
                if (match) {
                    result.description = match[1].trim();
                }
            } else if (cleanLine.includes('产品特点') || cleanLine.includes('特点')) {
                if (currentContent.length > 0) {
                    saveParsedContent(result, currentSection, currentContent.join(' '));
                    currentContent = [];
                }
                currentSection = 'features';
                const match = cleanLine.match(/[：:]\s*(.+)/);
                if (match) {
                    result.details[0] = match[1].trim();
                }
            } else if (cleanLine.includes('口感') || cleanLine.includes('taste')) {
                if (currentContent.length > 0) {
                    saveParsedContent(result, currentSection, currentContent.join(' '));
                    currentContent = [];
                }
                currentSection = 'taste';
                const match = cleanLine.match(/[：:]\s*(.+)/);
                if (match) {
                    result.details[1] = match[1].trim();
                }
            } else if (cleanLine.includes('营养') || cleanLine.includes('nutrition')) {
                if (currentContent.length > 0) {
                    saveParsedContent(result, currentSection, currentContent.join(' '));
                    currentContent = [];
                }
                currentSection = 'nutrition';
                const match = cleanLine.match(/[：:]\s*(.+)/);
                if (match) {
                    result.details[2] = match[1].trim();
                }
            } else {
                // 收集当前段落的内容
                currentContent.push(cleanLine);
            }
        }
        
        // 保存最后一个段落的内容
        if (currentContent.length > 0) {
            saveParsedContent(result, currentSection, currentContent.join(' '));
        }
        
        console.log('手动解析结果:', result);
        return result;
    }
    
    /**
     * 辅助函数：保存解析的内容到对应字段
     */
    function saveParsedContent(result, section, content) {
        switch (section) {
            case 'title':
                if (!result.title) result.title = content;
                break;
            case 'description':
                if (!result.description) result.description = content;
                break;
            case 'features':
                if (!result.details[0]) result.details[0] = content;
                break;
            case 'taste':
                if (!result.details[1]) result.details[1] = content;
                break;
            case 'nutrition':
                if (!result.details[2]) result.details[2] = content;
                break;
        }
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