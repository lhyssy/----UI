// 模拟数据
const mockData = {
  today: {
    views: [120, 85, 150, 200, 180, 220, 160],
    interactions: [42, 58, 76, 52, 65, 105, 125],
    labels: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
    totalViews: 1115,
    totalInteractions: 623,
    viewsGrowth: 32.5,
    interactionGrowth: 18.7,
    viewsIncrease: 152,
    funnel: {
      views: 1115,
      clicks: 868,
      details: 489,
      cart: 278,
      orders: 134
    },
    platforms: [
      { name: '小红书', percentage: 70 },
      { name: '微信', percentage: 50 },
      { name: '抖音', percentage: 30 },
      { name: '微博', percentage: 20 }
    ],
    popularContent: [
      {
        title: '有机红富士苹果宣传图文',
        image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
        platform: '小红书',
        tags: ['小红书', '热门'],
        stats: {
          views: 1845,
          comments: 54,
          likes: 132,
          shares: 38
        }
      },
      {
        title: '新鲜草莓包装设计方案',
        image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
        platform: '微信',
        tags: ['微信', '推荐'],
        stats: {
          views: 1576,
          comments: 42,
          likes: 85,
          shares: 32
        }
      }
    ]
  },
  week: {
    views: [800, 950, 1200, 1100, 1300, 1400, 1500],
    interactions: [280, 320, 380, 340, 400, 420, 450],
    labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    totalViews: 8250,
    totalInteractions: 2590,
    viewsGrowth: 28.3,
    interactionGrowth: 15.2,
    viewsIncrease: 4152,
    funnel: {
      views: 8250,
      clicks: 6435,
      details: 3625,
      cart: 2065,
      orders: 995
    },
    platforms: [
      { name: '小红书', percentage: 65 },
      { name: '微信', percentage: 55 },
      { name: '抖音', percentage: 35 },
      { name: '微博', percentage: 25 }
    ],
    popularContent: [
      {
        title: '有机红富士苹果宣传图文',
        image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
        platform: '小红书',
        tags: ['小红书', '热门'],
        stats: {
          views: 5245,
          comments: 124,
          likes: 432,
          shares: 78
        }
      },
      {
        title: '新鲜草莓包装设计方案',
        image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
        platform: '微信',
        tags: ['微信', '推荐'],
        stats: {
          views: 4876,
          comments: 95,
          likes: 405,
          shares: 62
        }
      }
    ]
  },
  month: {
    views: [3500, 3800, 4200, 4000, 4500, 4800, 5000],
    interactions: [980, 1020, 1180, 1140, 1300, 1420, 1500],
    labels: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周'],
    totalViews: 30800,
    totalInteractions: 8540,
    viewsGrowth: 25.6,
    interactionGrowth: 12.8,
    viewsIncrease: 15200,
    funnel: {
      views: 30800,
      clicks: 24024,
      details: 13530,
      cart: 7700,
      orders: 3696
    },
    platforms: [
      { name: '小红书', percentage: 60 },
      { name: '微信', percentage: 60 },
      { name: '抖音', percentage: 40 },
      { name: '微博', percentage: 30 }
    ],
    popularContent: [
      {
        title: '有机红富士苹果宣传图文',
        image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
        platform: '小红书',
        tags: ['小红书', '热门'],
        stats: {
          views: 15245,
          comments: 324,
          likes: 832,
          shares: 278
        }
      },
      {
        title: '新鲜草莓包装设计方案',
        image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
        platform: '微信',
        tags: ['微信', '推荐'],
        stats: {
          views: 8876,
          comments: 295,
          likes: 605,
          shares: 212
        }
      }
    ]
  },
  all: {
    views: [15000, 18000, 22000, 25000, 28000, 30000, 32000],
    interactions: [4500, 5200, 5800, 6400, 7000, 7500, 8000],
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
    totalViews: 170000,
    totalInteractions: 45400,
    viewsGrowth: 22.4,
    interactionGrowth: 10.5,
    viewsIncrease: 52000,
    funnel: {
      views: 170000,
      clicks: 132600,
      details: 74625,
      cart: 42500,
      orders: 20400
    },
    platforms: [
      { name: '小红书', percentage: 55 },
      { name: '微信', percentage: 65 },
      { name: '抖音', percentage: 45 },
      { name: '微博', percentage: 35 }
    ],
    popularContent: [
      {
        title: '有机红富士苹果宣传图文',
        image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
        platform: '小红书',
        tags: ['小红书', '热门'],
        stats: {
          views: 19245,
          comments: 354,
          likes: 912,
          shares: 298
        }
      },
      {
        title: '新鲜草莓包装设计方案',
        image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
        platform: '微信',
        tags: ['微信', '推荐'],
        stats: {
          views: 9016,
          comments: 2895,
          likes: 645,
          shares: 255
        }
      }
    ]
  }
};

// 更新图表数据
function updateCharts(timeRange) {
  const data = mockData[timeRange];

  // 更新浏览量数据
  document.getElementById('totalViews').textContent = data.totalViews.toLocaleString();
  document.getElementById('viewsGrowth').innerHTML = `<i class="fas fa-arrow-up mr-1"></i>${data.viewsGrowth}%`;
  document.getElementById('viewsIncrease').textContent = `较上周增加${data.viewsIncrease}`;

  // 更新互动量数据
  document.getElementById('totalInteractions').textContent = data.totalInteractions.toLocaleString();
  document.getElementById('interactionGrowth').innerHTML = `<i class="fas fa-arrow-up mr-1"></i>${data.interactionGrowth}%`;

  // 更新浏览量图表
  const viewsChart = document.getElementById('viewsChart');
  viewsChart.innerHTML = '';
  data.views.forEach((value, index) => {
    const maxValue = Math.max(...data.views);
    const height = (value / maxValue) * 100;
    const bar = document.createElement('div');
    bar.className = 'bar' + (index >= data.views.length - 2 ? ' highlight' : '');
    bar.style.height = `${height}%`;
    bar.setAttribute('data-value', value);
    viewsChart.appendChild(bar);
  });

  // 更新互动量图表
  const interactionChart = document.getElementById('interactionChart');
  interactionChart.innerHTML = '';
  data.interactions.forEach((value, index) => {
    const maxValue = Math.max(...data.interactions);
    const height = (value / maxValue) * 100;
    const bar = document.createElement('div');
    bar.className = 'bar' + (index >= data.interactions.length - 2 ? ' highlight' : '');
    bar.style.height = `${height}%`;
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
    { label: '加购/收藏', value: data.funnel.cart, width: 26 },
    { label: '下单转化', value: data.funnel.orders, width: 12 }
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

  // 更新平台分布
  const platformDistribution = document.getElementById('platformDistribution');
  platformDistribution.innerHTML = '';
  data.platforms.forEach(platform => {
    const div = document.createElement('div');
    div.className = 'flex-1 flex flex-col items-center';
    div.innerHTML = `
      <div class="progress-ring">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle class="bg" cx="30" cy="30" r="24" />
          <circle class="progress" cx="30" cy="30" r="24" style="stroke-dasharray: 150.8; stroke-dashoffset: ${150.8 * (1 - platform.percentage / 100)};" />
        </svg>
        <div class="percent-text">${platform.percentage}%</div>
      </div>
      <p class="text-sm mt-2">${platform.name}</p>
    `;
    platformDistribution.appendChild(div);
  });

  // 更新热门内容
  const popularContent = document.getElementById('popularContent');
  popularContent.innerHTML = '';
  data.popularContent.forEach(content => {
    const div = document.createElement('div');
    div.className = 'popular-item bg-white stagger-item';
    div.innerHTML = `
      <img src="${content.image}" alt="${content.title}" class="popular-image w-full">
      <div class="p-4">
        <h4 class="font-medium">${content.title}</h4>
        <div class="flex items-center mt-2">
          ${content.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="flex justify-between mt-3 text-sm text-gray-500">
          <div class="flex items-center">
            <i class="far fa-eye mr-1"></i>
            <span>${content.stats.views.toLocaleString()}</span>
          </div>
          <div class="flex items-center">
            <i class="far fa-comment mr-1"></i>
            <span>${content.stats.comments.toLocaleString()}</span>
          </div>
          <div class="flex items-center">
            <i class="far fa-heart mr-1"></i>
            <span>${content.stats.likes.toLocaleString()}</span>
          </div>
          <div class="flex items-center">
            <i class="fas fa-share-alt mr-1"></i>
            <span>${content.stats.shares.toLocaleString()}</span>
          </div>
        </div>
      </div>
    `;
    popularContent.appendChild(div);
  });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  // 默认显示今日数据
  updateCharts('today');

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
}); 