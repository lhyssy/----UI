// 存储活动数据
let events = JSON.parse(localStorage.getItem('marketingEvents')) || [];

// 当前显示的日期
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

// 更新月份显示
function updateMonthDisplay() {
  const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  document.getElementById('currentMonth').textContent = `${currentYear}年${monthNames[currentMonth]}`;
}

// 生成日历
function generateCalendar() {
  const calendarGrid = document.getElementById('calendarGrid');
  calendarGrid.innerHTML = '';

  // 获取当月第一天是星期几
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  // 获取当月天数
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // 获取上个月的天数
  const daysInLastMonth = new Date(currentYear, currentMonth, 0).getDate();

  // 填充上个月的日期
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = document.createElement('div');
    day.className = 'calendar-day inactive px-1 py-1';
    day.innerHTML = `<div class="day-number">${daysInLastMonth - i}</div>`;
    calendarGrid.appendChild(day);
  }

  // 填充当月的日期
  const today = new Date();
  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement('div');
    day.className = 'calendar-day px-1 py-1';

    // 检查是否是今天
    if (i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
      day.classList.add('today');
    }

    // 检查是否有活动
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const dayEvents = events.filter(event => event.date === dateStr);

    let dayContent = `<div class="day-number">${i}</div>`;

    if (dayEvents.length > 0) {
      day.classList.add('has-event');
      dayEvents.forEach(event => {
        const eventClass = getEventClass(event.type);
        dayContent += `<div class="calendar-event ${eventClass}">${event.name}</div>`;
      });

      if (dayEvents.length > 2) {
        dayContent += `<div class="more-events">+${dayEvents.length - 2}</div>`;
      }
    }

    day.innerHTML = dayContent;
    day.addEventListener('click', () => showEventsForDate(dateStr));
    calendarGrid.appendChild(day);
  }

  // 填充下个月的日期
  const totalDays = 42; // 6行7列
  const remainingDays = totalDays - (firstDay + daysInMonth);
  for (let i = 1; i <= remainingDays; i++) {
    const day = document.createElement('div');
    day.className = 'calendar-day inactive px-1 py-1';
    day.innerHTML = `<div class="day-number">${i}</div>`;
    calendarGrid.appendChild(day);
  }
}

// 获取活动类型对应的CSS类
function getEventClass(type) {
  switch (type) {
    case 'promotional':
      return 'event-promotional';
    case 'harvest':
      return 'event-harvest';
    case 'planting':
      return 'event-planting';
    case 'market':
      return 'event-market';
    default:
      return '';
  }
}

// 显示指定日期的活动
function showEventsForDate(dateStr) {
  selectedDate = dateStr;
  const date = new Date(dateStr);
  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  document.getElementById('selectedDateTitle').textContent = `${date.getFullYear()}年${monthNames[date.getMonth()]}${date.getDate()}日活动`;

  const events = getEventsForDate(dateStr);
  renderEventList(events);
}

function createEventItem(event) {
  const eventItem = document.createElement('div');
  eventItem.className = 'event-item';

  const title = document.createElement('div');
  title.className = 'event-title';
  title.textContent = event.name;

  const type = document.createElement('span');
  type.className = `event-type ${event.type}`;
  type.textContent = getEventTypeText(event.type);

  const platforms = document.createElement('div');
  platforms.className = 'platform-tags';
  event.platforms.forEach(platform => {
    const platformTag = document.createElement('span');
    platformTag.className = 'platform-tag';
    platformTag.textContent = getPlatformText(platform);
    platforms.appendChild(platformTag);
  });

  const description = document.createElement('div');
  description.className = 'event-description';
  description.textContent = event.description || '';

  eventItem.appendChild(title);
  eventItem.appendChild(type);
  eventItem.appendChild(platforms);
  eventItem.appendChild(description);

  return eventItem;
}

function getEventTypeText(type) {
  const types = {
    'promotional': '促销宣传',
    'harvest': '收获季节',
    'planting': '种植计划',
    'market': '市场活动'
  };
  return types[type] || type;
}

function getPlatformText(platform) {
  const platforms = {
    'douyin': '抖音',
    'xiaohongshu': '小红书',
    'wechat': '微信公众号'
  };
  return platforms[platform] || platform;
}

// 获取活动类型名称
function getEventTypeName(type) {
  switch (type) {
    case 'promotional':
      return '促销宣传';
    case 'harvest':
      return '收获季节';
    case 'planting':
      return '种植计划';
    case 'market':
      return '市场活动';
    default:
      return '';
  }
}

// 获取活动类型对应的徽章类
function getEventBadgeClass(type) {
  switch (type) {
    case 'promotional':
      return 'bg-red-100 text-red-700';
    case 'harvest':
      return 'bg-yellow-100 text-yellow-700';
    case 'planting':
      return 'bg-green-100 text-green-700';
    case 'market':
      return 'bg-blue-100 text-blue-700';
    default:
      return '';
  }
}

// 打开添加活动模态框
function openAddEventModal(date = null) {
  const modal = document.getElementById('addEventModal');
  const eventDate = document.getElementById('eventDate');

  if (date) {
    eventDate.value = date;
  } else {
    eventDate.value = new Date().toISOString().split('T')[0];
  }

  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// 关闭添加活动模态框
function closeAddEventModal() {
  const modal = document.getElementById('addEventModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
  document.getElementById('eventForm').reset();
}

// 添加新活动
function addEvent(eventData) {
  const newEvent = {
    id: Date.now().toString(),
    ...eventData
  };
  events.push(newEvent);
  localStorage.setItem('marketingEvents', JSON.stringify(events));
  generateCalendar();
  showEventsForDate(eventData.date);
  closeAddEventModal();
}

// 更新活动列表
function updateEventList() {
  const eventList = document.getElementById('eventList');
  const selectedDate = document.getElementById('selectedDateTitle').dataset.date;

  const dayEvents = events.filter(event => event.date === selectedDate);

  if (dayEvents.length === 0) {
    eventList.innerHTML = '<div class="p-4 text-center text-gray-500">暂无活动</div>';
    return;
  }

  eventList.innerHTML = dayEvents.map(event => `
        <div class="event-item p-4">
            <div class="flex justify-between items-start">
                <div class="event-title">${event.name}</div>
                <div class="flex items-center">
                    <div class="event-type ${event.type}">
                        <div class="event-badge ${getEventBadgeClass(event.type)}"></div>
                        <span>${getEventTypeName(event.type)}</span>
                    </div>
                    <div class="platform-tags">
                        ${event.platforms.map(platform => `
                            <span class="platform-tag">${getPlatformName(platform)}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="event-description mt-2">${event.description || '暂无描述'}</div>
        </div>
    `).join('');
}

// 获取平台名称
function getPlatformName(platform) {
  const platforms = {
    'douyin': '抖音',
    'xiaohongshu': '小红书',
    'wechat': '微信公众号'
  };
  return platforms[platform] || platform;
}

// 删除活动
function deleteEvent(eventId) {
  events = events.filter(event => event.id !== eventId);
  localStorage.setItem('marketingEvents', JSON.stringify(events));
  generateCalendar();
  showEventsForDate(currentDate.toISOString().split('T')[0]);
}

// 初始化
document.addEventListener('DOMContentLoaded', function () {
  // 初始化日历
  renderCalendar(currentYear, currentMonth);

  // 显示今天的活动
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  showEventsForDate(todayStr);

  // 添加活动按钮点击事件
  document.getElementById('addEventBtn').addEventListener('click', function () {
    const modal = document.getElementById('addEventModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });

  // 关闭模态框按钮点击事件
  document.querySelector('.close-modal').addEventListener('click', function () {
    const modal = document.getElementById('addEventModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  // 取消按钮点击事件
  document.getElementById('cancelEvent').addEventListener('click', function () {
    const modal = document.getElementById('addEventModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  // 表单提交事件
  document.getElementById('eventForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventType = document.getElementById('eventType').value;
    const eventDescription = document.getElementById('eventDescription').value;

    // 获取选中的平台
    const platforms = [];
    document.querySelectorAll('input[name="platform"]:checked').forEach(checkbox => {
      platforms.push(checkbox.value);
    });

    // 创建新活动
    const newEvent = {
      id: Date.now().toString(),
      name: eventName,
      date: eventDate,
      type: eventType,
      platforms: platforms,
      description: eventDescription
    };

    // 保存活动
    let events = JSON.parse(localStorage.getItem('marketingEvents') || '[]');
    events.push(newEvent);
    localStorage.setItem('marketingEvents', JSON.stringify(events));

    // 更新日历和活动列表
    renderCalendar(currentYear, currentMonth);
    showEventsForDate(eventDate);

    // 关闭模态框
    const modal = document.getElementById('addEventModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';

    // 重置表单
    document.getElementById('eventForm').reset();
  });

  // 月份切换按钮事件
  document.getElementById('prevMonth').addEventListener('click', function () {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    updateMonthDisplay();
    renderCalendar(currentYear, currentMonth);
  });

  document.getElementById('nextMonth').addEventListener('click', function () {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    updateMonthDisplay();
    renderCalendar(currentYear, currentMonth);
  });

  // 日历格子点击事件
  document.getElementById('calendarGrid').addEventListener('click', (e) => {
    const dayElement = e.target.closest('.calendar-day');
    if (dayElement && !dayElement.classList.contains('inactive')) {
      const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${dayElement.querySelector('.day-number').textContent.padStart(2, '0')}`;
      openAddEventModal(date);
    }
  });

  // 点击模态框外部关闭
  document.getElementById('addEventModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      closeAddEventModal();
    }
  });

  // 删除活动
  document.getElementById('eventList').addEventListener('click', (e) => {
    if (e.target.closest('.delete-event')) {
      const eventId = e.target.closest('.delete-event').dataset.id;
      if (confirm('确定要删除这个活动吗？')) {
        deleteEvent(eventId);
      }
    }
  });

  // 返回按钮
  document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = 'home.html';
  });

  // 底部导航栏交互
  document.querySelectorAll('.bottom-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const link = item.getAttribute('data-link');
      if (link) {
        window.location.href = link;
      }
    });
  });
});

function renderEventList(events) {
  const eventList = document.getElementById('eventList');
  eventList.innerHTML = '';

  if (events.length === 0) {
    eventList.innerHTML = '<div class="text-center py-4 text-gray-500">暂无活动</div>';
    return;
  }

  events.forEach(event => {
    const eventItem = document.createElement('div');
    eventItem.className = 'event-item';
    eventItem.dataset.eventId = event.id;

    const eventTitle = document.createElement('div');
    eventTitle.className = 'event-title';
    eventTitle.textContent = event.name;

    const eventMeta = document.createElement('div');
    eventMeta.className = 'flex items-center mb-2';

    const eventType = document.createElement('div');
    eventType.className = `event-type ${event.type}`;
    eventType.textContent = getEventTypeText(event.type);

    const platformTags = document.createElement('div');
    platformTags.className = 'platform-tags';
    event.platforms.forEach(platform => {
      const tag = document.createElement('span');
      tag.className = 'platform-tag';
      tag.textContent = getPlatformText(platform);
      platformTags.appendChild(tag);
    });

    const eventDescription = document.createElement('div');
    eventDescription.className = 'event-description';
    eventDescription.textContent = event.description;

    eventMeta.appendChild(eventType);
    eventMeta.appendChild(platformTags);
    eventItem.appendChild(eventTitle);
    eventItem.appendChild(eventMeta);
    eventItem.appendChild(eventDescription);
    eventList.appendChild(eventItem);
  });
}

function deleteEvent(eventId) {
  // 从本地存储中删除活动
  let events = JSON.parse(localStorage.getItem('marketingEvents') || '[]');
  events = events.filter(event => event.id !== eventId);
  localStorage.setItem('marketingEvents', JSON.stringify(events));

  // 重新渲染日历和活动列表
  renderCalendar(currentYear, currentMonth);
  renderEventList(getEventsForDate(selectedDate));
}

// 修改 renderCalendar 函数中的活动渲染部分
function renderCalendar(year, month) {
  const calendarGrid = document.getElementById('calendarGrid');
  calendarGrid.innerHTML = '';

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  // 填充空白格子
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.className = 'calendar-day empty';
    calendarGrid.appendChild(emptyDay);
  }

  // 填充日期格子
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';

    // 检查是否是今天
    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      dayElement.classList.add('today');
    }

    // 获取当天的活动
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayEvents = getEventsForDate(dateStr);

    // 如果有活动，添加has-event类
    if (dayEvents.length > 0) {
      dayElement.classList.add('has-event');
    }

    // 构建日期格子的内容
    let dayContent = `<div class="day-number">${day}</div>`;

    // 添加活动
    if (dayEvents.length > 0) {
      dayEvents.forEach(event => {
        dayContent += `<div class="calendar-event">${event.name}</div>`;
      });

      // 如果活动超过2个，显示更多提示
      if (dayEvents.length > 2) {
        dayContent += `<div class="more-events">+${dayEvents.length - 2} 更多</div>`;
      }
    }

    dayElement.innerHTML = dayContent;
    dayElement.onclick = () => showEventsForDate(dateStr);
    calendarGrid.appendChild(dayElement);
  }
}

// 获取指定日期的活动
function getEventsForDate(dateStr) {
  const events = JSON.parse(localStorage.getItem('marketingEvents') || '[]');
  return events.filter(event => event.date === dateStr);
} 