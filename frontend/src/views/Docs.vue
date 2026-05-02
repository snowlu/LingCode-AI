<template>
  <div class="docs-page">
    <div class="page-hero">
      <div class="hero-glow"></div>
      <span class="page-label">文档中心</span>
      <h1 class="page-title">快速开始指南<span class="accent">.</span></h1>
      <p class="page-desc">3 步完成企业级全栈项目，从创建到上线</p>
    </div>

    <div class="steps-container">
      <div v-for="(step, idx) in steps" :key="idx" class="step-card">
        <div class="step-badge">{{ String(idx + 1).padStart(2, '0') }}</div>
        <div class="step-content">
          <h3>{{ step.title }}</h3>
          <p>{{ step.desc }}</p>
          <div v-if="step.detail" class="step-detail">{{ step.detail }}</div>
          <div v-if="step.code" class="code-block">
            <span v-for="(line, li) in step.code" :key="li" class="code-line">{{ line }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="faqs">
      <span class="page-label">常见问题</span>
      <h2 class="faq-title">FAQ<span class="accent">.</span></h2>
      <div class="faq-grid">
        <div v-for="(faq, idx) in faqs" :key="idx" class="faq-card">
          <div class="faq-q">
            <span class="faq-num">{{ String(idx + 1).padStart(2, '0') }}</span>
            <span>{{ faq.q }}</span>
          </div>
          <div class="faq-a">{{ faq.a }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const steps = [
  {
    title: '选择行业模板',
    desc: '在模板市场浏览 10+ 行业方案，找到最适合你的业务场景',
    detail: '每个模板都经过精心设计，包含完整的菜单结构、数据模型和业务逻辑',
  },
  {
    title: '在线生成项目',
    desc: '进入生成器，配置项目信息，AI 自动生成前后端完整代码',
    code: [
      '1. 选择目标模板',
      '2. 填写项目名称与描述',
      '3. 点击「开始生成」',
      '4. 等待 AI 自动构建项目',
    ],
  },
  {
    title: '下载运行项目',
    desc: '下载生成的 ZIP 文件，解压即可运行，无需额外配置环境',
    code: [
      'npm install',
      'npm run dev',
      '# 前端运行在 http://localhost:5173',
      '# 后端运行在 http://localhost:3000',
    ],
  },
];

const faqs = [
  {
    q: '需要安装数据库吗？',
    a: '不需要。项目使用 lowdb 文件数据库，所有数据存储在项目目录下的 JSON 文件中，无需安装任何数据库软件。',
  },
  {
    q: '支持哪些行业场景？',
    a: '目前覆盖电商、教育、政务、医疗、物流、人力资源、金融、餐饮、社区、项目管理等 10+ 主流行业。',
  },
  {
    q: '生成的代码可以商用吗？',
    a: '可以。项目使用 MIT 协议开源，生成的代码可以自由商用、二次开发，无任何限制。',
  },
  {
    q: '支持自定义功能吗？',
    a: '可以。生成的代码结构清晰，你可以根据需求在生成基础上自由修改、添加功能模块。',
  },
  {
    q: '技术栈有哪些？',
    a: '前端使用 Vue3 + Vite + Element Plus，后端使用 Node.js + Express，数据库使用 lowdb。',
  },
  {
    q: '是否需要联网运行？',
    a: '生成项目和运行项目需要联网。运行后的项目可以完全离线使用，不依赖任何外部服务。',
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
$radius-sm: 8px;

.docs-page {
  min-height: 100vh;
  background: $bg;
  padding: 100px 32px 80px;
}

.page-hero {
  text-align: center;
  margin-bottom: 72px;
  position: relative;
}

.hero-glow {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 160px;
  background: radial-gradient(ellipse, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
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

// ===== Steps =====
.steps-container {
  max-width: 800px;
  margin: 0 auto 100px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.step-card {
  display: flex;
  gap: 24px;
  background: $surface;
  border: 1px solid $border;
  border-radius: $radius;
  padding: 32px;
  transition: all 0.3s ease;

  &:hover {
    border-color: $border-hover;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
}

.step-badge {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: $radius-sm;
  font-size: 22px;
  font-weight: 800;
  color: $primary;
  letter-spacing: -0.02em;
}

.step-content {
  flex: 1;

  h3 {
    font-size: 20px;
    font-weight: 700;
    color: $text-primary;
    margin-bottom: 8px;
  }

  p {
    font-size: 15px;
    color: $text-secondary;
    line-height: 1.7;
  }
}

.step-detail {
  margin-top: 12px;
  font-size: 13px;
  color: $text-muted;
}

.code-block {
  margin-top: 16px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: $radius-sm;
  padding: 16px 18px;
}

.code-line {
  display: block;
  font-size: 13px;
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  color: #94a3b8;
  line-height: 1.8;

  &:first-child {
    color: #60a5fa;
  }
}

// ===== FAQ =====
.faqs {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.faq-title {
  font-size: 42px;
  font-weight: 800;
  color: $text-primary;
  letter-spacing: -0.03em;
  margin-bottom: 48px;

  .accent {
    color: $primary;
  }
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  text-align: left;
}

.faq-card {
  background: $surface;
  border: 1px solid $border;
  border-radius: $radius;
  padding: 24px;
  transition: all 0.3s ease;

  &:hover {
    border-color: $border-hover;
  }
}

.faq-q {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 15px;
  font-weight: 600;
  color: $text-primary;
}

.faq-num {
  font-size: 18px;
  font-weight: 800;
  color: rgba(59, 130, 246, 0.3);
  flex-shrink: 0;
}

.faq-a {
  font-size: 13px;
  color: $text-secondary;
  line-height: 1.7;
  padding-left: 36px;
}

@media (max-width: 768px) {
  .step-card {
    flex-direction: column;
  }
  .faq-grid {
    grid-template-columns: 1fr;
  }
  .page-title,
  .faq-title {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .docs-page {
    padding: 80px 16px 60px;
  }
}
</style>
