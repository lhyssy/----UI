/**
 * 消息通知页面 - 功能处理脚本
 * 处理通知的标签切换、滑动手势、标记已读/未读、删除等功能
 */
document.addEventListener('DOMContentLoaded', function() {
    const tabItems = document.querySelectorAll('.tab-item');
    const notificationItems = document.querySelectorAll('.notification-item');
    const emptyState = document.getElementById('emptyState');
    const clearAllBtn = document.getElementById('clearAllBtn');
    
    // 初始化各种功能
    initTabSwitching(tabItems, notificationItems, emptyState);
    initClearAllButton(clearAllBtn, notificationItems, emptyState);
    initNotificationSwipeGesture(notificationItems, emptyState);
    
    // 更新未读消息数量
    updateUnreadCount();
});

/**
 * 初始化标签切换功能
 */
function initTabSwitching(tabItems, notificationItems, emptyState) {
    tabItems.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有标签的活动状态
            tabItems.forEach(t => t.classList.remove('active'));
            
            // 添加当前标签的活动状态
            this.classList.add('active');
            
            const tabType = this.getAttribute('data-tab');
            filterNotifications(tabType, notificationItems, emptyState);
        });
    });
}

/**
 * 根据标签过滤通知
 */
function filterNotifications(type, notificationItems, emptyState) {
    let visibleCount = 0;
    
    notificationItems.forEach(item => {
        const itemType = item.getAttribute('data-type');
        
        if (type === 'all' || type === itemType) {
            item.style.display = 'block';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });
    
    // 显示或隐藏空状态
    if (visibleCount === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
    }
}

/**
 * 初始化清空所有通知按钮
 */
function initClearAllButton(clearAllBtn, notificationItems, emptyState) {
    if (!clearAllBtn) return;
    
    clearAllBtn.addEventListener('click', function() {
        if (confirm('确定要清空所有通知吗？')) {
            notificationItems.forEach(item => {
                item.style.display = 'none';
            });
            emptyState.style.display = 'block';
            
            // 更新标签上的数字
            const badge = document.querySelector('.badge');
            if (badge) {
                badge.textContent = '0';
            }
            
            showToast('已清空所有通知', 'success');
        }
    });
}

/**
 * 初始化通知滑动手势
 */
function initNotificationSwipeGesture(notificationItems, emptyState) {
    let startX, currentX, isDragging = false;
    const threshold = 50; // 滑动阈值
    
    notificationItems.forEach(item => {
        // 点击通知项
        item.addEventListener('click', function(e) {
            if (!isDragging) {
                // 如果是未读，标记为已读
                if (this.classList.contains('unread')) {
                    markAsRead(this);
                }
                
                // 这里可以跳转到通知详情页或执行其他操作
                showToast('查看通知详情', 'info');
            }
        });
        
        // 触摸开始
        item.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            currentX = startX;
            isDragging = false;
        });
        
        // 触摸移动
        item.addEventListener('touchmove', function(e) {
            if (!startX) return;
            
            currentX = e.touches[0].clientX;
            const diffX = currentX - startX;
            
            // 只允许向左滑动（负值）
            if (diffX < 0) {
                isDragging = true;
                
                // 设置滑动距离，最大140px（两个操作按钮的宽度）
                const translateX = Math.max(-140, diffX);
                const swipeDeleteEl = this.querySelector('.swipe-action.swipe-delete');
                const swipeMarkEl = this.querySelector('.swipe-action.swipe-mark');
                
                if (swipeDeleteEl) {
                    swipeDeleteEl.style.transform = `translateX(${translateX + 70}px)`;
                }
                if (swipeMarkEl) {
                    swipeMarkEl.style.transform = `translateX(${translateX + 70}px)`;
                }
                
                // 阻止滚动
                e.preventDefault();
            }
        });
        
        // 触摸结束
        item.addEventListener('touchend', function(e) {
            if (!startX) return;
            
            const diffX = currentX - startX;
            const swipeDeleteEl = this.querySelector('.swipe-action.swipe-delete');
            const swipeMarkEl = this.querySelector('.swipe-action.swipe-mark');
            
            if (diffX < -threshold) {
                // 显示操作按钮
                if (swipeDeleteEl) {
                    swipeDeleteEl.style.transform = 'translateX(0)';
                }
                if (swipeMarkEl) {
                    swipeMarkEl.style.transform = 'translateX(0)';
                }
            } else {
                // 重置位置
                if (swipeDeleteEl) {
                    swipeDeleteEl.style.transform = 'translateX(70px)';
                }
                if (swipeMarkEl) {
                    swipeMarkEl.style.transform = 'translateX(70px)';
                }
            }
            
            startX = null;
            currentX = null;
        });
        
        // 标记已读/未读按钮
        const markBtn = item.querySelector('.swipe-action.swipe-mark');
        if (markBtn) {
            markBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const notificationItem = this.parentElement;
                if (notificationItem.classList.contains('unread')) {
                    markAsRead(notificationItem);
                } else {
                    markAsUnread(notificationItem);
                }
                
                // 重置滑动状态
                const swipeDeleteEl = notificationItem.querySelector('.swipe-action.swipe-delete');
                const swipeMarkEl = notificationItem.querySelector('.swipe-action.swipe-mark');
                
                if (swipeDeleteEl) {
                    swipeDeleteEl.style.transform = 'translateX(70px)';
                }
                if (swipeMarkEl) {
                    swipeMarkEl.style.transform = 'translateX(70px)';
                }
            });
        }
        
        // 删除按钮
        const deleteBtn = item.querySelector('.swipe-action.swipe-delete');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const notificationItem = this.parentElement;
                notificationItem.style.height = notificationItem.offsetHeight + 'px';
                
                // 添加收起动画
                setTimeout(() => {
                    notificationItem.style.height = '0';
                    notificationItem.style.opacity = '0';
                    notificationItem.style.padding = '0';
                    notificationItem.style.margin = '0';
                    notificationItem.style.overflow = 'hidden';
                    notificationItem.style.transition = 'all 0.3s ease';
                }, 10);
                
                // 移除元素
                setTimeout(() => {
                    notificationItem.remove();
                    
                    // 更新未读数量
                    updateUnreadCount();
                    
                    // 检查是否需要显示空状态
                    const currentTab = document.querySelector('.tab-item.active').getAttribute('data-tab');
                    let visibleCount = 0;
                    
                    document.querySelectorAll('.notification-item').forEach(item => {
                        const itemType = item.getAttribute('data-type');
                        if (currentTab === 'all' || currentTab === itemType) {
                            visibleCount++;
                        }
                    });
                    
                    if (visibleCount === 0 && emptyState) {
                        emptyState.style.display = 'block';
                    }
                }, 300);
                
                showToast('已删除通知', 'success');
            });
        }
    });
}

/**
 * 标记通知为已读
 */
function markAsRead(item) {
    item.classList.remove('unread');
    const dot = item.querySelector('.notification-dot');
    if (dot) dot.remove();
    
    const markBtn = item.querySelector('.swipe-action.swipe-mark');
    if (markBtn) {
        markBtn.style.backgroundColor = '#6b7280';
        markBtn.innerHTML = '<i class="fas fa-redo mr-1"></i> 未读';
    }
    
    updateUnreadCount();
    showToast('已标记为已读', 'success');
}

/**
 * 标记通知为未读
 */
function markAsUnread(item) {
    item.classList.add('unread');
    
    const timeContainer = item.querySelector('.flex.items-center') || item.querySelector('.text-xs.text-gray-500').parentNode;
    
    // 添加未读圆点
    if (!item.querySelector('.notification-dot') && timeContainer) {
        const dot = document.createElement('div');
        dot.className = 'notification-dot mr-2';
        timeContainer.prepend(dot);
    }
    
    const markBtn = item.querySelector('.swipe-action.swipe-mark');
    if (markBtn) {
        markBtn.style.backgroundColor = '#10b981';
        markBtn.innerHTML = '<i class="fas fa-check mr-1"></i> 已读';
    }
    
    updateUnreadCount();
    showToast('已标记为未读', 'success');
}

/**
 * 更新未读数量
 */
function updateUnreadCount() {
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    const badge = document.querySelector('.badge');
    if (badge) {
        badge.textContent = unreadCount;
        
        if (unreadCount === 0) {
            badge.style.display = 'none';
        } else {
            badge.style.display = 'inline-flex';
        }
    }
} 