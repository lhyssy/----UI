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
  const selectedEvents = events.filter(event => event.date === dateStr);
  const eventList = document.getElementById('eventList');
  const selectedDateTitle = document.getElementById('selectedDateTitle');

  // 更新标题
  const date = new Date(dateStr);
  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  selectedDateTitle.textContent = `${date.getFullYear()}年${monthNames[date.getMonth()]}${date.getDate()}日活动`;

  // 更新活动列表
  eventList.innerHTML = '';
  if (selectedEvents.length === 0) {
    eventList.innerHTML = '<div class="p-4 text-center text-gray-500">暂无活动</div>';
    return;
  }

  selectedEvents.forEach(event => {
    const eventItem = createEventItem(event);
    eventList.appendChild(eventItem);
  });
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
}

// 删除活动
function deleteEvent(eventId) {
  events = events.filter(event => event.id !== eventId);
  localStorage.setItem('marketingEvents', JSON.stringify(events));
  generateCalendar();
  showEventsForDate(currentDate.toISOString().split('T')[0]);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  // 初始化日历
  updateMonthDisplay();
  generateCalendar();
  showEventsForDate(currentDate.toISOString().split('T')[0]);

  // 月份切换按钮
  document.getElementById('prevMonth').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    updateMonthDisplay();
    generateCalendar();
  });

  document.getElementById('nextMonth').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    updateMonthDisplay();
    generateCalendar();
  });

  // 添加活动按钮
  document.getElementById('addEventBtn').addEventListener('click', () => {
    document.getElementById('addEventModal').style.display = 'block';
  });

  // 取消添加活动
  document.getElementById('cancelEvent').addEventListener('click', () => {
    document.getElementById('addEventModal').style.display = 'none';
  });

  // 提交活动表单
  document.getElementById('eventForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventType = document.getElementById('eventType').value;
    const eventDescription = document.getElementById('eventDescription').value;

    // 获取选中的营销平台
    const selectedPlatforms = Array.from(document.querySelectorAll('input[name="platform"]:checked'))
      .map(checkbox => checkbox.value);

    addEvent({
      name: eventName,
      date: eventDate,
      type: eventType,
      description: eventDescription,
      platforms: selectedPlatforms
    });

    // 重置表单并关闭模态框
    document.getElementById('eventForm').reset();
    document.getElementById('addEventModal').style.display = 'none';
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