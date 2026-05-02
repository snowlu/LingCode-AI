<template>
  <div class="templates-page">
    <div class="page-hero">
      <div class="hero-glow"></div>
      <span class="page-label">模板市场</span>
      <h1 class="page-title">10+ 行业专属模板<span class="accent">.</span></h1>
      <p class="page-desc">覆盖主流业务场景，选择模板快速生成完整项目代码</p>
    </div>

    <div class="templates-grid">
      <div
        v-for="tpl in allTemplates"
        :key="tpl.id"
        class="template-card"
        @click="goToPreview(tpl.id)"
      >
        <div class="tpl-grad" :style="{ background: tpl.gradient }"></div>
        <div class="tpl-header">
          <el-icon :size="18"><component :is="tpl.icon" /></el-icon>
          <span class="tpl-id">#{{ tpl.id }}</span>
        </div>
        <h3>{{ tpl.name }}</h3>
        <p>{{ tpl.description }}</p>
        <div class="tpl-meta">
          <span class="meta-item">
            <svg viewBox="0 0 16 16" fill="none" class="meta-icon">
              <rect
                x="2"
                y="2"
                width="5"
                height="5"
                rx="1"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <rect
                x="9"
                y="2"
                width="5"
                height="5"
                rx="1"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <rect
                x="2"
                y="9"
                width="5"
                height="5"
                rx="1"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <rect
                x="9"
                y="9"
                width="5"
                height="5"
                rx="1"
                stroke="currentColor"
                stroke-width="1.5"
              />
            </svg>
            三端覆盖
          </span>
          <span class="meta-item">
            <svg viewBox="0 0 16 16" fill="none" class="meta-icon">
              <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5" />
              <path
                d="M8 4V8L10.5 10.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            开箱即用
          </span>
        </div>
        <div class="tpl-tags">
          <span v-for="tag in tpl.features" :key="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {} from '@element-plus/icons-vue';

const router = useRouter();
const goToPreview = id => router.push(`/preview/${id}`);

const allTemplates = [
  {
    id: 1,
    name: '电商后台管理',
    description: '完整的电商后台管理系统，含商品管理、订单处理、数据统计仪表盘',
    icon: 'ShoppingCart',
    features: ['商品管理', '订单处理', '数据统计', '用户中心'],
    gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
  },
  {
    id: 2,
    name: '教育管理系统',
    description: '课程管理、学员档案、在线考试于一体的教育信息化管理平台',
    icon: 'Reading',
    features: ['课程管理', '学员档案', '在线考试', '成绩管理'],
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
  },
  {
    id: 3,
    name: '政务服务平台',
    description: '办事大厅、审批流程、信息公开等政务服务全流程管理',
    icon: 'OfficeBuilding',
    features: ['办事大厅', '审批流程', '信息公开', '事项管理'],
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
  },
  {
    id: 4,
    name: '医疗健康系统',
    description: '挂号预约、电子病历、药房管理一站式医疗信息化解决方案',
    icon: 'FirstAidKit',
    features: ['挂号预约', '电子病历', '药房管理', '科室管理'],
    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
  },
  {
    id: 5,
    name: '物流仓储系统',
    description: '仓库管理、运单追踪、车辆调度完整物流供应链管理',
    icon: 'Van',
    features: ['仓库管理', '运单追踪', '车辆调度', '数据分析'],
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  },
  {
    id: 6,
    name: '人力资源系统',
    description: '招聘管理、考勤打卡、绩效评估、员工档案全面管理',
    icon: 'UserFilled',
    features: ['招聘管理', '考勤打卡', '绩效评估', '员工档案'],
    gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
  },
  {
    id: 7,
    name: '财务管理系统',
    description: '账务管理、报表分析、预算控制企业级财务管理',
    icon: 'Money',
    features: ['账务管理', '报表分析', '预算控制', '审计追踪'],
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
  },
  {
    id: 8,
    name: '餐饮管理系统',
    description: '菜品管理、订单点餐、桌台管理、后厨协作完整方案',
    icon: 'Notebook',
    features: ['菜品管理', '订单点餐', '桌台管理', '后厨协作'],
    gradient: 'linear-gradient(135deg, #f97316, #ea580c)',
  },
  {
    id: 9,
    name: '社区服务平台',
    description: '社区公告、便民服务、活动管理、邻里互助平台',
    icon: 'Finished',
    features: ['社区公告', '便民服务', '活动管理', '邻里互助'],
    gradient: 'linear-gradient(135deg, #84cc16, #65a30d)',
  },
  {
    id: 10,
    name: '项目管理系统',
    description: '任务看板、甘特图、团队协作、进度追踪全流程',
    icon: 'Monitor',
    features: ['任务看板', '甘特图', '团队协作', '进度追踪'],
    gradient: 'linear-gradient(135deg, #64748b, #475569)',
  },
];
</script>

<style lang="scss" scoped>
$bg: #0a0a1a;
$surface: #13132a;
$primary: #3b82f6;
$text-primary: #f1f5f9;
$text-secondary: #94a3b8;
$text-muted: #64748b;
$border: rgba(255, 255, 255, 0.06);
$border-hover: rgba(99, 161, 247, 0.25);
$radius: 14px;

.templates-page {
  min-height: 100vh;
  background: $bg;
  padding: 100px 32px 80px;
}

.page-hero {
  text-align: center;
  margin-bottom: 64px;
  position: relative;
}

.hero-glow {
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 200px;
  background: radial-gradient(ellipse, rgba(59, 130, 246, 0.06) 0%, transparent 70%);
  pointer-events: none;
}

.page-label {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: $primary;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 16px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.15);
  padding: 5px 14px;
  border-radius: 4px;
}

.page-title {
  font-size: 42px;
  font-weight: 800;
  color: $text-primary;
  letter-spacing: -0.03em;
  margin-bottom: 14px;
  animation: fadeIn 0.6s ease-out;

  .accent {
    color: $primary;
  }
}

.page-desc {
  font-size: 16px;
  color: $text-secondary;
  animation: fadeIn 0.6s ease-out 0.15s both;
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1280px;
  margin: 0 auto;
}

.template-card {
  background: $surface;
  border: 1px solid $border;
  border-radius: $radius;
  padding: 28px 22px 22px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.35s ease;
  animation: fadeInUp 0.5s ease-out both;

  @for $i from 1 through 10 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.05}s;
    }
  }

  .tpl-grad {
    position: absolute;
    top: -30px;
    right: -30px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    opacity: 0.06;
    pointer-events: none;
    transition: opacity 0.35s;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: $border-hover;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

    .tpl-grad {
      opacity: 0.12;
    }
  }
}

.tpl-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  color: $primary;
}

.tpl-id {
  font-size: 11px;
  color: $text-muted;
  font-weight: 600;
  opacity: 0.5;
}

.template-card h3 {
  font-size: 16px;
  font-weight: 700;
  color: $text-primary;
  margin-bottom: 8px;
}

.template-card p {
  font-size: 13px;
  color: $text-secondary;
  line-height: 1.6;
  margin-bottom: 16px;
  min-height: 40px;
}

.tpl-meta {
  display: flex;
  gap: 14px;
  margin-bottom: 14px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: $text-muted;

  .meta-icon {
    width: 12px;
    height: 12px;
  }
}

.tpl-tags {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;

  span {
    font-size: 10px;
    color: $text-muted;
    background: rgba(255, 255, 255, 0.03);
    padding: 3px 8px;
    border-radius: 4px;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(32px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1024px) {
  .templates-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .page-title {
    font-size: 32px;
  }
}

@media (max-width: 768px) {
  .templates-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .page-title {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .templates-grid {
    grid-template-columns: 1fr;
  }
  .templates-page {
    padding: 80px 16px 60px;
  }
}
</style>
