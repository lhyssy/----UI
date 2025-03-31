/**
 * 营销日历 - 主要功能控制
 * 处理日历视图切换、事件筛选、日历交互等功能
 */
document.addEventListener('DOMContentLoaded', function() {
    // 日历视图切换
    initCalendarViewSwitch();
    
    // 事件类型选择器
    initEventTypeSelectors();
    
    // 全天活动切换
    initAllDayEventToggle();
    
    // 显示添加事件模态框
    initEventModalHandlers();
    
    // 日历单元格点击事件
    initCalendarDayEvents();
    
    // 模拟保存活动按钮点击
    initSaveEventButton();
});

/**
 * 初始化日历视图切换（月/周）
 */
function initCalendarViewSwitch() {
    const calendarSwitch = document.querySelector('.calendar-switch');
    const monthView = calendarSwitch.querySelector('.month');
    const weekView = calendarSwitch.querySelector('.week');
    
    monthView.addEventListener('click', function() {
        calendarSwitch.setAttribute('data-active', 'month');
        monthView.style.color = '#10b981';
        weekView.style.color = '#6b7280';
        showToast('已切换至月视图', 'success');
    });
    
    weekView.addEventListener('click', function() {
        calendarSwitch.setAttribute('data-active', 'week');
        weekView.style.color = '#10b981';
        monthView.style.color = '#6b7280';
        showToast('已切换至周视图', 'success');
    });
}

/**
 * 初始化事件类型选择器
 */
function initEventTypeSelectors() {
    const eventTypeSelectors = document.querySelectorAll('.event-type-selector');
    eventTypeSelectors.forEach(selector => {
        selector.addEventListener('click', function() {
            // 在添加事件模态框内的事件类型选择
            if (this.closest('#addEventModal')) {
                eventTypeSelectors.forEach(s => {
                    if (s.closest('#addEventModal')) {
                        s.classList.remove('selected');
                    }
                });
                this.classList.add('selected');
            } else {
                // 在主页面的事件类型过滤
                this.classList.toggle('selected');
            }
        });
    });
}

/**
 * 初始化全天活动切换
 */
function initAllDayEventToggle() {
    const allDayCheckbox = document.getElementById('allDayEvent');
    const timeInputs = document.getElementById('timeInputs');
    
    if (allDayCheckbox && timeInputs) {
        allDayCheckbox.addEventListener('change', function() {
            if (this.checked) {
                timeInputs.style.display = 'none';
            } else {
                timeInputs.style.display = 'grid';
            }
        });
    }
}

/**
 * 初始化添加事件模态框
 */
function initEventModalHandlers() {
    const addButton = document.querySelector('.fa-plus').parentElement;
    const addEventModal = document.getElementById('addEventModal');
    const closeAddEventModal = document.getElementById('closeAddEventModal');
    
    if (addButton && addEventModal && closeAddEventModal) {
        addButton.addEventListener('click', function() {
            addEventModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
        
        closeAddEventModal.addEventListener('click', function() {
            addEventModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }
}

/**
 * 初始化日历单元格点击事件
 */
function initCalendarDayEvents() {
    const calendarDays = document.querySelectorAll('.calendar-day');
    const addEventModal = document.getElementById('addEventModal');
    
    calendarDays.forEach(day => {
        day.addEventListener('click', function() {
            if (!this.classList.contains('inactive')) {
                const dayNumber = this.querySelector('.day-number').textContent;
                showToast(`已选择7月${dayNumber}日`, 'info');
                
                // 可以在这里显示添加事件模态框或选中的日期的事件列表
                setTimeout(() => {
                    if (addEventModal) {
                        addEventModal.classList.remove('hidden');
                        document.body.style.overflow = 'hidden';
                    }
                }, 300);
            }
        });
    });
}

/**
 * 初始化保存活动按钮
 */
function initSaveEventButton() {
    const saveEventButton = document.querySelector('.bg-green-500.text-white.rounded-lg');
    
    if (saveEventButton) {
        saveEventButton.addEventListener('click', function() {
            // 显示加载状态
            this.innerHTML = '<div class="flex items-center justify-center"><div class="loader mr-2"></div> 保存中...</div>';
            this.disabled = true;
            
            // 模拟保存过程
            setTimeout(() => {
                const addEventModal = document.getElementById('addEventModal');
                if (addEventModal) {
                    addEventModal.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                }
                this.innerHTML = '保存活动';
                this.disabled = false;
                
                showToast('活动已成功添加到日历', 'success');
            }, 1500);
        });
    }
} 