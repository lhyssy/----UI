// 模拟数据
const mockData = {
  newUser: {
    views: [5, 5, 5, 5, 5, 5, 5],
    interactions: [5, 5, 5, 5, 5, 5, 5],
    labels: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
    totalViews: 0,
    totalInteractions: 0,
    viewsGrowth: 0,
    interactionGrowth: 0,
    viewsIncrease: 0,
    funnel: {
      views: 0,
      clicks: 0,
      details: 0,
      cart: 0,
      orders: 0
    },
    platforms: [
      { name: '抖音', percentage: 33.33 },
      { name: '小红书', percentage: 33.33 },
      { name: '微信', percentage: 33.34 }
    ],
    popularContent: []
  },
  today: {
    views: [5, 5, 5, 5, 5, 5, 5],
    interactions: [5, 5, 5, 5, 5, 5, 5],
    labels: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
    totalViews: 0,
    totalInteractions: 0,
    viewsGrowth: 0,
    interactionGrowth: 0,
    viewsIncrease: 0,
    funnel: {
      views: 0,
      clicks: 0,
      details: 0,
      cart: 0,
      orders: 0
    },
    platforms: [
      { name: '抖音', percentage: 33.33 },
      { name: '小红书', percentage: 33.33 },
      { name: '微信', percentage: 33.34 }
    ],
    popularContent: []
  },
  week: {
    views: [5, 5, 5, 5, 5, 5, 5],
    interactions: [5, 5, 5, 5, 5, 5, 5],
    labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    totalViews: 0,
    totalInteractions: 0,
    viewsGrowth: 0,
    interactionGrowth: 0,
    viewsIncrease: 0,
    funnel: {
      views: 0,
      clicks: 0,
      details: 0,
      cart: 0,
      orders: 0
    },
    platforms: [
      { name: '抖音', percentage: 33.33 },
      { name: '小红书', percentage: 33.33 },
      { name: '微信', percentage: 33.34 }
    ],
    popularContent: []
  },
  month: {
    views: [5, 5, 5, 5, 5, 5, 5],
    interactions: [5, 5, 5, 5, 5, 5, 5],
    labels: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周'],
    totalViews: 0,
    totalInteractions: 0,
    viewsGrowth: 0,
    interactionGrowth: 0,
    viewsIncrease: 0,
    funnel: {
      views: 0,
      clicks: 0,
      details: 0,
      cart: 0,
      orders: 0
    },
    platforms: [
      { name: '抖音', percentage: 33.33 },
      { name: '小红书', percentage: 33.33 },
      { name: '微信', percentage: 33.34 }
    ],
    popularContent: []
  },
  all: {
    views: [5, 5, 5, 5, 5, 5, 5],
    interactions: [5, 5, 5, 5, 5, 5, 5],
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
    totalViews: 0,
    totalInteractions: 0,
    viewsGrowth: 0,
    interactionGrowth: 0,
    viewsIncrease: 0,
    funnel: {
      views: 0,
      clicks: 0,
      details: 0,
      cart: 0,
      orders: 0
    },
    platforms: [
      { name: '抖音', percentage: 33.33 },
      { name: '小红书', percentage: 33.33 },
      { name: '微信', percentage: 33.34 }
    ],
    popularContent: []
  }
};

// 更新图表数据
function updateCharts(timeRange) {
  const data = mockData[timeRange];

  // 更新浏览量数据
  document.getElementById('totalViews').textContent = data.totalViews.toLocaleString();
  document.getElementById('viewsGrowth').innerHTML = `<i class="fas fa-arrow-up mr-1"></i>${data.viewsGrowth}%`;
  document.getElementById('viewsIncrease').textContent = `较前次统计增加${data.viewsIncrease}`;

  // 更新互动量数据
  document.getElementById('totalInteractions').textContent = data.totalInteractions.toLocaleString();
  document.getElementById('interactionGrowth').innerHTML = `<i class="fas fa-arrow-up mr-1"></i>${data.interactionGrowth}%`;

  // 更新浏览量图表
  const viewsChart = document.getElementById('viewsChart');
  viewsChart.innerHTML = '';
  const maxViews = Math.max(...data.views);
  data.views.forEach((value, index) => {
    const height = (value / maxViews) * 100;
    const opacity = 0.3 + (value / maxViews) * 0.7;
    const bar = document.createElement('div');
    bar.className = 'bar' + (index >= data.views.length - 2 ? ' highlight' : '');
    bar.style.height = '5%';
    bar.style.opacity = opacity;
    bar.setAttribute('data-value', value);
    viewsChart.appendChild(bar);
  });

  // 更新互动量图表
  const interactionChart = document.getElementById('interactionChart');
  interactionChart.innerHTML = '';
  const maxInteractions = Math.max(...data.interactions);
  data.interactions.forEach((value, index) => {
    const height = (value / maxInteractions) * 100;
    const opacity = 0.3 + (value / maxInteractions) * 0.7;
    const bar = document.createElement('div');
    bar.className = 'bar' + (index >= data.interactions.length - 2 ? ' highlight' : '');
    bar.style.height = '5%';
    bar.style.opacity = opacity;
    bar.setAttribute('data-value', value);
    interactionChart.appendChild(bar);
  });

  // 更新标签
  const viewsLabels = document.getElementById('viewsLabels');
  const interactionLabels = document.getElementById('interactionLabels');
  viewsLabels.innerHTML = '';
  interactionLabels.innerHTML = '';
  data.labels.forEach(label => {
    const span = document.createElement('span');
    span.textContent = label;
    viewsLabels.appendChild(span.cloneNode(true));
    interactionLabels.appendChild(span);
  });

  // 更新转化漏斗
  const funnelSteps = document.getElementById('funnelSteps');
  funnelSteps.innerHTML = '';
  const funnelData = [
    { label: '浏览量', value: data.funnel.views, width: 100 },
    { label: '点击互动', value: data.funnel.clicks, width: 78 },
    { label: '详情查看', value: data.funnel.details, width: 45 },
    { label: '收藏', value: data.funnel.cart, width: 26 }
  ];

  funnelData.forEach(step => {
    const div = document.createElement('div');
    div.className = 'funnel-step';
    div.innerHTML = `
      <div class="funnel-bar" style="width: ${step.width}%">${step.label}</div>
      <div class="funnel-value text-gray-500">${step.value.toLocaleString()}</div>
    `;
    funnelSteps.appendChild(div);
  });

  // 更新最终转化率
  document.getElementById('finalConversionRate').textContent =
    ((data.funnel.orders / data.funnel.views) * 100).toFixed(1) + '%';

  // 更新平台分布饼图
  const platformChart = echarts.init(document.getElementById('platformDistribution'));
  const platformOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%'
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '50%'],
      data: [
        {
          name: '抖音',
          value: data.platforms.find(p => p.name === '抖音').percentage,
          itemStyle: {
            color: 'rgba(154, 163, 56, 1)'
          }
        },
        {
          name: '小红书',
          value: data.platforms.find(p => p.name === '小红书').percentage,
          itemStyle: {
            color: 'rgba(154, 163, 56, 0.7)'
          }
        },
        {
          name: '微信',
          value: data.platforms.find(p => p.name === '微信').percentage,
          itemStyle: {
            color: 'rgba(154, 163, 56, 0.4)'
          }
        }
      ],
      label: {
        show: true,
        formatter: '{b}\n{d}%',
        color: 'rgba(15, 45, 73, 1)',
        fontSize: 14,
        lineHeight: 20,
        padding: [10, 0, 10, 0]
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };
  platformChart.setOption(platformOption);

  // 更新热门内容
  updatePopularContent();
}

function updatePopularContent() {
  const popularContent = document.getElementById('popularContent');
  popularContent.innerHTML = `
        <div class="bg-white rounded-xl p-6 text-center">
            <div class="text-gray-400 mb-2">
                <i class="fas fa-inbox text-4xl"></i>
            </div>
            <p class="text-gray-500">您尚未发布内容</p>
        </div>
    `;
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  // 默认显示新用户数据
  updateCharts('newUser');

  // 添加时间范围切换事件监听
  const timeTabs = document.querySelectorAll('.time-tab');
  timeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // 移除所有active类
      timeTabs.forEach(t => t.classList.remove('active'));
      // 添加active类到当前点击的标签
      tab.classList.add('active');
      // 更新图表
      const timeRange = tab.getAttribute('data-range');
      updateCharts(timeRange);
    });
  });

  // 为图表柱状图添加交互效果
  document.querySelectorAll('.bar').forEach(bar => {
    bar.addEventListener('mouseenter', function () {
      this.style.opacity = '0.8';
      const value = this.getAttribute('data-value');
      showToast(`数值: ${value}`, 'info', 1000);
    });

    bar.addEventListener('mouseleave', function () {
      this.style.opacity = '1';
    });
  });

  // 热门宣传内容点击事件
  document.querySelectorAll('.popular-item').forEach(item => {
    item.addEventListener('click', function () {
      const title = this.querySelector('h4').textContent;
      showToast(`查看详情: ${title}`, 'info');
    });
  });

  // 导出按钮点击事件
  document.querySelector('button[class*="bg-gray-100"]').addEventListener('click', function () {
    showToast('数据报告已导出', 'success');
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

  // 监听窗口大小变化，重新调整图表大小
  window.addEventListener('resize', function () {
    const platformChart = echarts.init(document.getElementById('platformDistribution'));
    platformChart.resize();
  });
}); 