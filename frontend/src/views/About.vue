<template>
  <div class="about-page">
    <div class="page-hero">
      <div class="hero-glow"></div>
      <span class="page-label">关于项目</span>
      <h1 class="page-title">AI 全栈低代码生成平台<span class="accent">.</span></h1>
      <p class="page-desc">大模型驱动的智能代码生成工具，让全栈开发回归简单高效</p>
    </div>

    <div class="story-card">
      <h2>项目故事</h2>
      <p>
        AI 全栈低代码生成平台诞生于对开发效率的极致追求。我们观察到大量企业在搭建
        后台管理系统时，重复编写着相似的 CRUD 页面、数据表格和图表仪表盘。
      </p>
      <p>
        借助大语言模型的能力，我们实现了<span class="hl">「自然语言 → 完整项目代码」</span>的突破，
        让开发者从繁琐的重复劳动中解放出来，专注于业务创新。
      </p>
    </div>

    <div class="stats-row">
      <div v-for="s in stats" :key="s.label" class="stat-card">
        <span class="stat-num">{{ s.num }}</span>
        <span class="stat-text">{{ s.label }}</span>
      </div>
    </div>

    <div class="advantage-grid">
      <div v-for="adv in advantages" :key="adv.title" class="adv-card">
        <div class="adv-icon" v-html="adv.icon"></div>
        <h3>{{ adv.title }}</h3>
        <p>{{ adv.desc }}</p>
      </div>
    </div>

    <div class="tech-section">
      <h2 class="section-subtitle">核心技术栈</h2>
      <div class="tech-pills">
        <span v-for="t in techStack" :key="t" class="pill">{{ t }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const stats = [
  { num: '10+', label: '行业模板' },
  { num: '三端', label: '全平台覆盖' },
  { num: '100%', label: '开源免费' },
  { num: 'MIT', label: '开源协议' },
];

const advantages = [
  {
    title: 'AI 驱动开发',
    desc: '大模型理解业务需求，自动生成符合最佳实践的完整项目代码',
    icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  },
  {
    title: '开箱即用',
    desc: '下载 ZIP 解压即运行，内置 Mock 数据，零环境配置成本',
    icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 12L21 7M12 12V22M12 12L3 7" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  },
  {
    title: '企业级规范',
    desc: 'ESLint + Prettier 代码规范，模块化工程结构，符合大厂标准',
    icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M14 2V8H20" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M16 13H8M16 17H8M10 9H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  {
    title: '全栈覆盖',
    desc: '前端 Vue3 + 后端 Node.js + Express + lowdb 数据库，完整全栈方案',
    icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M3 3H21M3 3V21M3 3L21 21M21 3V21M21 21H3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  {
    title: '多端生成',
    desc: '一套配置同时生成后台管理 + PC 用户端 + H5 移动端三端代码',
    icon: '<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="9" height="9" rx="2" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="2" width="9" height="9" rx="2" stroke="currentColor" stroke-width="1.5"/><rect x="2" y="13" width="9" height="9" rx="2" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="13" width="9" height="9" rx="2" stroke="currentColor" stroke-width="1.5"/></svg>',
  },
  {
    title: '永久免费',
    desc: 'MIT 协议完全开源，可学习源码、商业使用、二次开发，零成本',
    icon: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M12 7V12L15.5 15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
];

const techStack = [
  'Vue 3',
  'Vite',
  'TypeScript',
  'Element Plus',
  'Pinia',
  'Node.js',
  'Express',
  'lowdb',
  'ESLint',
  'Prettier',
  'SCSS',
  'Axios',
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
$radius-sm: 8px;

.about-page {
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
  top: -60px;
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

  .accent {
    color: $primary;
  }
}

.page-desc {
  font-size: 16px;
  color: $text-secondary;
}

// ===== Story =====
.story-card {
  max-width: 800px;
  margin: 0 auto 64px;
  background: $surface;
  border: 1px solid $border;
  border-radius: $radius;
  padding: 40px;

  h2 {
    font-size: 28px;
    font-weight: 800;
    color: $text-primary;
    margin-bottom: 24px;
    letter-spacing: -0.02em;
  }

  p {
    font-size: 15px;
    color: $text-secondary;
    line-height: 1.85;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }

    .hl {
      color: #60a5fa;
      font-weight: 600;
    }
  }
}

// ===== Stats =====
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  max-width: 800px;
  margin: 0 auto 64px;
}

.stat-card {
  background: $surface;
  border: 1px solid $border;
  border-radius: $radius;
  padding: 28px 16px;
  text-align: center;
  transition: all 0.3s;

  &:hover {
    border-color: $border-hover;
    transform: translateY(-2px);
  }
}

.stat-num {
  display: block;
  font-size: 32px;
  font-weight: 800;
  color: $text-primary;
  letter-spacing: -0.03em;
  margin-bottom: 8px;
}

.stat-text {
  font-size: 13px;
  color: $text-muted;
}

// ===== Advantages =====
.advantage-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto 72px;
}

.adv-card {
  background: $surface;
  border: 1px solid $border;
  border-radius: $radius;
  padding: 32px 28px;
  text-align: center;
  transition: all 0.35s;

  &:hover {
    border-color: $border-hover;
    transform: translateY(-3px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
}

.adv-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: $radius-sm;
  color: $primary;

  svg {
    width: 24px;
    height: 24px;
  }
}

.adv-card h3 {
  font-size: 17px;
  font-weight: 700;
  color: $text-primary;
  margin-bottom: 10px;
}

.adv-card p {
  font-size: 13px;
  color: $text-secondary;
  line-height: 1.7;
}

// ===== Tech =====
.tech-section {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.section-subtitle {
  font-size: 28px;
  font-weight: 800;
  color: $text-primary;
  margin-bottom: 32px;
  letter-spacing: -0.02em;
}

.tech-pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.pill {
  padding: 8px 20px;
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.15);
  border-radius: 24px;
  font-size: 14px;
  font-weight: 500;
  color: #93c5fd;
  transition: all 0.25s;

  &:hover {
    background: rgba(59, 130, 246, 0.15);
    border-color: rgba(59, 130, 246, 0.3);
  }
}

@media (max-width: 768px) {
  .advantage-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
  .page-title {
    font-size: 30px;
  }
}

@media (max-width: 480px) {
  .about-page {
    padding: 80px 16px 60px;
  }
  .advantage-grid {
    grid-template-columns: 1fr;
  }
  .story-card {
    padding: 24px;
  }
}
</style>
