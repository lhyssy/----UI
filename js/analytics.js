// 模拟数据
const mockData = {
  today: {
    views: [20, 15, 25, 30, 28, 35, 25],
    interactions: [12, 18, 26, 22, 25, 35, 45],
    labels: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
    totalViews: 178,
    totalInteractions: 183,
    viewsGrowth: 5.5,
    interactionGrowth: 3.7,
    viewsIncrease: 12,
    funnel: {
      views: 178,
      clicks: 138,
      details: 89,
      cart: 48,
      orders: 23
    },
    platforms: [
      { name: '小红书', percentage: 41 },
      { name: '微信', percentage: 33 },
      { name: '抖音', percentage: 26 }
    ],
    popularContent: [
      {
        title: '🍓谁懂啊！在办公室吃草莓被追着要链接！现摘的丹东九九，咬一口爆浆的甜，连叶子都带着奶香✨',
        image: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?q=80&w=2206&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        platform: '小红书',
        tags: ['小红书', '热门'],
        stats: {
          views: 84,
          comments: 14,
          likes: 22,
          shares: 8
        }
      },
      {
        title: '紧急通知：你的夏日 "菠萝补给站" 已上线！新鲜直采，甜爽暴击，速来查收',
        image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
        platform: '微信',
        tags: ['微信', '推荐'],
        stats: {
          views: 76,
          comments: 12,
          likes: 15,
          shares: 5
        }
      }
    ]
  },
  week: {
    views: [80, 95, 120, 110, 130, 140, 150],
    interactions: [40, 52, 68, 54, 60, 70, 80],
    labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    totalViews: 825,
    totalInteractions: 424,
    viewsGrowth: 4.3,
    interactionGrowth: 2.2,
    viewsIncrease: 42,
    funnel: {
      views: 825,
      clicks: 643,
      details: 362,
      cart: 206,
      orders: 99
    },
    platforms: [
      { name: '小红书', percentage: 28 },
      { name: '微信', percentage: 39 },
      { name: '抖音', percentage: 35 }
    ],
    popularContent: [
      {
        title: '🍓谁懂啊！在办公室吃草莓被追着要链接！现摘的丹东九九，咬一口爆浆的甜，连叶子都带着奶香✨',
        image: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?q=80&w=2206&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        platform: '小红书',
        tags: ['小红书', '热门'],
        stats: {
          views: 145,
          comments: 24,
          likes: 32,
          shares: 18
        }
      },
      {
        title: '紧急通知：你的夏日 "菠萝补给站" 已上线！新鲜直采，甜爽暴击，速来查收',
        image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
        platform: '微信',
        tags: ['微信', '推荐'],
        stats: {
          views: 116,
          comments: 15,
          likes: 25,
          shares: 12
        }
      }
    ]
  },
  month: {
    views: [200, 220, 240, 230, 250, 260, 270],
    interactions: [80, 92, 108, 94, 100, 110, 120],
    labels: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周'],
    totalViews: 1670,
    totalInteractions: 704,
    viewsGrowth: 3.6,
    interactionGrowth: 1.8,
    viewsIncrease: 70,
    funnel: {
      views: 1670,
      clicks: 1302,
      details: 733,
      cart: 417,
      orders: 200
    },
    platforms: [
      { name: '小红书', percentage: 27 },
      { name: '微信', percentage: 42 },
      { name: '抖音', percentage: 31 }
    ],
    popularContent: [
      {
        title: '🍓谁懂啊！在办公室吃草莓被追着要链接！现摘的丹东九九，咬一口爆浆的甜，连叶子都带着奶香✨',
        image: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?q=80&w=2206&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        platform: '小红书',
        tags: ['小红书', '热门'],
        stats: {
          views: 245,
          comments: 34,
          likes: 42,
          shares: 28
        }
      },
      {
        title: '紧急通知：你的夏日 "菠萝补给站" 已上线！新鲜直采，甜爽暴击，速来查收',
        image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
        platform: '微信',
        tags: ['微信', '推荐'],
        stats: {
          views: 216,
          comments: 25,
          likes: 35,
          shares: 22
        }
      }
    ]
  },
  all: {
    views: [200, 220, 240, 230, 250, 260, 270],
    interactions: [80, 92, 108, 94, 100, 110, 120],
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
    totalViews: 1670,
    totalInteractions: 704,
    viewsGrowth: 3.6,
    interactionGrowth: 1.8,
    viewsIncrease: 70,
    funnel: {
      views: 1670,
      clicks: 1302,
      details: 733,
      cart: 417,
      orders: 200
    },
    platforms: [
      { name: '小红书', percentage: 27 },
      { name: '微信', percentage: 42 },
      { name: '抖音', percentage: 31 }
    ],
    popularContent: [
      {
        title: '🍓谁懂啊！在办公室吃草莓被追着要链接！现摘的丹东九九，咬一口爆浆的甜，连叶子都带着奶香✨',
        image: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?q=80&w=2206&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        platform: '小红书',
        tags: ['小红书', '热门'],
        stats: {
          views: 245,
          comments: 34,
          likes: 42,
          shares: 28
        }
      },
      {
        title: '紧急通知：你的夏日 "菠萝补给站" 已上线！新鲜直采，甜爽暴击，速来查收',
        image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
        platform: '微信',
        tags: ['微信', '推荐'],
        stats: {
          views: 216,
          comments: 25,
          likes: 35,
          shares: 22
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
    bar.style.height = `${height}%`;
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
    bar.style.height = `${height}%`;
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