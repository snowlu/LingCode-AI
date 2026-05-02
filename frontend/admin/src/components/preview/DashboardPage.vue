<template>
  <div class="dashboard-page">
    <h2 class="page-title">工作台总览</h2>
    <div class="stats-grid">
      <div v-for="(stat, index) in statsWithApi" :key="index" class="stat-card">
        <div class="stat-icon" :style="{ background: config.color }">
          <el-icon :size="24" color="#fff"><component :is="stat.icon" /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
        <div class="stat-trend" :class="stat.up ? 'up' : 'down'">{{ stat.trend }}</div>
      </div>
    </div>
    <div class="charts-grid">
      <div class="chart-card">
        <h3>趋势分析</h3>
        <div class="chart-area">
          <svg viewBox="0 0 400 180" style="width: 100%; height: 180px">
            <defs>
              <linearGradient :id="'grad1-' + config.id" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" :style="`stop-color:${config.color};stop-opacity:0.3`" />
                <stop offset="100%" :style="`stop-color:${config.color};stop-opacity:0.05`" />
              </linearGradient>
            </defs>
            <path
              d="M0,140 L50,110 L100,130 L150,70 L200,90 L250,50 L300,75 L350,40 L400,60 L400,180 L0,180 Z"
              :fill="`url(#grad1-${config.id})`"
            />
            <polyline
              points="0,140 50,110 100,130 150,70 200,90 250,50 300,75 350,40 400,60"
              fill="none"
              :stroke="config.color"
              stroke-width="2.5"
            />
            <polyline
              points="0,160 50,145 100,155 150,120 200,135 250,100 300,120 350,90 400,105"
              fill="none"
              stroke="#52c41a"
              stroke-width="2"
              stroke-dasharray="5,5"
            />
          </svg>
          <div class="chart-legend">
            <span><i :style="{ background: config.color }"></i>本期</span>
            <span><i style="background: #52c41a"></i>上期</span>
          </div>
        </div>
      </div>
      <div class="chart-card">
        <h3>数据分布</h3>
        <div class="chart-area pie-area">
          <svg viewBox="0 0 200 200" style="width: 160px; height: 160px">
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              :stroke="config.color"
              stroke-width="30"
              stroke-dasharray="110 330"
              stroke-dashoffset="0"
              transform="rotate(-90 100 100)"
            />
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="#52c41a"
              stroke-width="30"
              stroke-dasharray="88 352"
              stroke-dashoffset="-110"
              transform="rotate(-90 100 100)"
            />
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="#faad14"
              stroke-width="30"
              stroke-dasharray="66 374"
              stroke-dashoffset="-198"
              transform="rotate(-90 100 100)"
            />
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="#e5e6eb"
              stroke-width="30"
              stroke-dasharray="44 396"
              stroke-dashoffset="-264"
              transform="rotate(-90 100 100)"
            />
          </svg>
          <div class="pie-legend">
            <span><i :style="{ background: config.color }"></i>类别A 40%</span>
            <span><i style="background: #52c41a"></i>类别B 30%</span>
            <span><i style="background: #faad14"></i>类别C 20%</span>
            <span><i style="background: #e5e6eb"></i>其他 10%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="quick-section">
      <div class="quick-card">
        <h3>快捷操作</h3>
        <div class="quick-actions">
          <el-button
            v-for="action in quickActions"
            :key="action"
            :style="{ borderColor: config.color, color: config.color }"
            >{{ action }}</el-button
          >
        </div>
      </div>
      <div class="quick-card">
        <h3>最近动态</h3>
        <div class="activity-list">
          <div v-for="(item, i) in activities" :key="i" class="activity-item">
            <div class="dot" :style="{ background: config.color }"></div>
            <span class="text">{{ item.text }}</span>
            <span class="time">{{ item.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { getDashboard } from '@/api/index.js';
const props = defineProps({ config: { type: Object, required: true } });

const dashboardData = ref({});
const loading = ref(false);

const statsWithApi = computed(() => {
  const d = dashboardData.value;
  if (!d || !Object.keys(d).length) return props.config.stats || [];
  const statsMap = {
    ecommerce: [
      {
        label: '总用户',
        value: (d.totalUsers || 0).toLocaleString(),
        icon: 'User',
        up: true,
        trend: d.userGrowth || '+0%',
      },
      {
        label: '总订单',
        value: (d.totalOrders || 0).toLocaleString(),
        icon: 'List',
        up: true,
        trend: d.orderGrowth || '+0%',
      },
      {
        label: '总营收',
        value: '¥' + (d.totalRevenue || 0).toLocaleString(),
        icon: 'Money',
        up: true,
        trend: d.revenueGrowth || '+0%',
      },
      {
        label: '今日订单',
        value: (d.todayOrders || 0).toLocaleString(),
        icon: 'ShoppingCart',
        up: true,
        trend: '+5%',
      },
    ],
    education: [
      {
        label: '总学员',
        value: (d.totalStudents || 0).toLocaleString(),
        icon: 'User',
        up: true,
        trend: d.studentGrowth || '+0%',
      },
      {
        label: '总课程',
        value: (d.totalCourses || 0).toLocaleString(),
        icon: 'Reading',
        up: true,
        trend: d.courseGrowth || '+0%',
      },
      {
        label: '总营收',
        value: '¥' + (d.totalRevenue || 0).toLocaleString(),
        icon: 'Money',
        up: true,
        trend: '+10%',
      },
      {
        label: '今日报名',
        value: (d.todayEnroll || 0).toLocaleString(),
        icon: 'List',
        up: true,
        trend: '+8%',
      },
    ],
  };
  if (statsMap[props.config.industryKey]) return statsMap[props.config.industryKey];
  const keys = Object.keys(d);
  return keys
    .slice(0, 4)
    .map(k => ({ label: k, value: String(d[k]), icon: 'DataLine', up: true, trend: '+5%' }));
});

const fetchDashboard = async () => {
  loading.value = true;
  try {
    const res = await getDashboard(props.config.industryKey || 'ecommerce');
    dashboardData.value = res.data || {};
  } catch (e) {
    console.error('获取仪表盘数据失败:', e);
  } finally {
    loading.value = false;
  }
};

const quickActions = ref(['新增数据', '导出报表', '发送通知', '系统配置']);
const activities = ref([
  { text: '系统数据已自动备份', time: '5分钟前' },
  { text: '新增用户完成注册', time: '15分钟前' },
  { text: '数据报表已生成完毕', time: '1小时前' },
  { text: '系统版本已更新至 v2.1.0', time: '3小时前' },
]);

onMounted(() => {
  fetchDashboard();
});
watch(
  () => props.config.industryKey,
  () => {
    fetchDashboard();
  }
);
</script>

<style lang="scss" scoped>
.dashboard-page {
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.page-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}
.stat-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 14px;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }
  .stat-icon {
    width: 52px;
    height: 52px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .stat-content {
    flex: 1;
    .stat-value {
      font-size: 24px;
      font-weight: 700;
      color: #333;
    }
    .stat-label {
      font-size: 13px;
      color: #999;
      margin-top: 2px;
    }
  }
  .stat-trend {
    font-size: 13px;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 4px;
    &.up {
      color: #52c41a;
      background: #f6ffed;
    }
    &.down {
      color: #ff4d4f;
      background: #fff2f0;
    }
  }
}
.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}
.chart-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  h3 {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #333;
  }
}
.chart-area {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.chart-legend,
.pie-legend {
  display: flex;
  gap: 16px;
  margin-top: 12px;
  flex-wrap: wrap;
  justify-content: center;
  span {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #666;
    i {
      width: 10px;
      height: 10px;
      border-radius: 2px;
      display: inline-block;
    }
  }
}
.pie-area {
  flex-direction: row;
  gap: 20px;
  align-items: center;
  .pie-legend {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
}
.quick-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.quick-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  h3 {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #333;
  }
}
.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  .el-button {
    border-radius: 6px;
  }
}
.activity-list {
  .activity-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #f5f5f5;
    &:last-child {
      border: none;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .text {
      flex: 1;
      font-size: 13px;
      color: #666;
    }
    .time {
      font-size: 12px;
      color: #bbb;
    }
  }
}
@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .charts-grid,
  .quick-section {
    grid-template-columns: 1fr;
  }
}
</style>
