/**
 * 发布平台页面 - 功能脚本
 * 处理平台选择、发布功能等
 */
document.addEventListener('DOMContentLoaded', function () {
    // 元素引用
    const publishBtn = document.getElementById('publishBtn');
    const cancelPublishBtn = document.getElementById('cancelPublishBtn');
    const publishSuccessModal = document.getElementById('publishSuccessModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const backToHomeBtn = document.getElementById('backToHomeBtn');
    const viewContentBtn = document.getElementById('viewContentBtn');
    const platformCards = document.querySelectorAll('.platform-card');

    // 初始化
    initPlatformSelection();
    initPublishButtons();

    /**
     * 初始化平台选择功能
     */
    function initPlatformSelection() {
        platformCards.forEach(card => {
            // 排除"更多平台"卡片
            if (card.querySelector('.fa-chevron-right')) {
                card.addEventListener('click', function () {
                    // 显示即将上线提示
                    if (typeof window.showToast === 'function') {
                        window.showToast('更多平台即将上线，敬请期待', 'info');
                    }
                });
                return;
            }

            card.addEventListener('click', function () {
                // 添加触摸反馈
                this.classList.add('active-feedback');
                setTimeout(() => {
                    this.classList.remove('active-feedback');
                }, 200);

                // 切换选中状态
                this.classList.toggle('selected');

                // 处理勾选图标
                const checkmark = this.querySelector('.checkmark');
                if (checkmark) {
                    const isSelected = this.classList.contains('selected');

                    // 更新样式
                    if (isSelected) {
                        checkmark.classList.add('bg-green-500');
                        checkmark.classList.remove('border', 'border-gray-300');

                        // 添加勾选图标
                        checkmark.innerHTML = '<i class="fas fa-check text-white text-xs"></i>';
                    } else {
                        checkmark.classList.remove('bg-green-500');
                        checkmark.classList.add('border', 'border-gray-300');
                        checkmark.innerHTML = '';
                    }

                    // 播放动画
                    if (isSelected) {
                        checkmark.style.animation = 'none';
                        setTimeout(() => {
                            checkmark.style.animation = 'scale-in 0.2s ease forwards';
                        }, 10);
                    }
                }

                // 更新平台名称样式
                const platformName = this.querySelector('.platform-name');
                if (platformName) {
                    if (this.classList.contains('selected')) {
                        platformName.classList.add('text-green-600');
                    } else {
                        platformName.classList.remove('text-green-600');
                    }
                }

                // 添加触觉反馈 (如果支持)
                if (navigator.vibrate) {
                    navigator.vibrate(30);
                }

                // 更新已选择平台数量
                updateSelectedPlatformsCount();
            });
        });
    }

    /**
     * 更新已选择平台数量
     */
    function updateSelectedPlatformsCount() {
        const selectedCount = document.querySelectorAll('.platform-card.selected').length;

        // 更新发布按钮状态
        if (selectedCount > 0) {
            publishBtn.disabled = false;
            publishBtn.classList.remove('opacity-50');
        } else {
            publishBtn.disabled = true;
            publishBtn.classList.add('opacity-50');
        }
    }

    /**
     * 初始化发布按钮事件
     */
    function initPublishButtons() {
        // 立即发布按钮
        if (publishBtn) {
            publishBtn.addEventListener('click', handlePublish);
        }

        // 暂不发布按钮
        if (cancelPublishBtn) {
            cancelPublishBtn.addEventListener('click', function () {
                // 返回上一页
                window.history.back();
            });
        }

        // 模态框关闭按钮
        if (modalOverlay) {
            modalOverlay.addEventListener('click', function () {
                publishSuccessModal.classList.add('hidden');
            });
        }

        // 返回首页按钮
        if (backToHomeBtn) {
            backToHomeBtn.addEventListener('click', function () {
                window.location.href = 'home.html';
            });
        }

        // 查看内容按钮
        if (viewContentBtn) {
            viewContentBtn.addEventListener('click', function () {
                // 这里可以跳转到内容查看页面
                window.location.href = 'profile.html';
            });
        }
    }

    /**
     * 处理发布操作
     */
    function handlePublish() {
        // 获取已选择的平台
        const selectedPlatforms = [];
        document.querySelectorAll('.platform-card.selected').forEach(card => {
            const platformName = card.querySelector('.platform-name');
            if (platformName) {
                selectedPlatforms.push(platformName.textContent.trim());
            }
        });

        // 如果没有选择平台，提示用户
        if (selectedPlatforms.length === 0) {
            if (typeof window.showToast === 'function') {
                window.showToast('请至少选择一个发布平台', 'warning');
            }
            return;
        }

        // 禁用按钮，防止重复点击
        publishBtn.disabled = true;

        // 显示加载动画
        const originalBtnText = publishBtn.innerHTML;
        publishBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> 发布中...';

        // 模拟发布请求过程
        setTimeout(function () {
            // 发布完成，显示成功提示
            showPublishSuccess(selectedPlatforms);

            // 恢复按钮状态
            publishBtn.innerHTML = originalBtnText;
            publishBtn.disabled = false;

            // 清空localStorage中的临时数据
            // localStorage.removeItem('uploadedImages');
        }, 1500);
    }

    /**
     * 显示发布成功提示
     */
    function showPublishSuccess(platforms) {
        // 更新成功提示文本
        const successText = publishSuccessModal.querySelector('p');
        if (successText && platforms.length > 0) {
            successText.textContent = `您的内容已成功发布到 ${platforms.join('、')} 平台！`;
        }

        // 显示成功模态框
        publishSuccessModal.classList.remove('hidden');

        // 如果有showToast函数，也显示一个Toast提示
        if (typeof window.showToast === 'function') {
            window.showToast('发布成功！', 'success');
        }
    }
}); 