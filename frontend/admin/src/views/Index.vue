<template>
  <div class="landing-page">
    <canvas ref="particleCanvas" class="particle-canvas"></canvas>

    <section class="hero">
      <div class="hero-grid-bg"></div>
      <div class="hero-glow hero-glow-1"></div>
      <div class="hero-glow hero-glow-2"></div>
      <div class="hero-glow hero-glow-3"></div>
      <div class="hero-container">
        <div class="hero-left">
          <div class="hero-badge reveal">
            <span class="badge-dot"></span>
            <span>v1.0 正式版</span>
            <span class="badge-sep">·</span>
            <span class="badge-highlight">完全开源</span>
          </div>

          <h1 class="hero-title reveal" style="--delay: 0.1s">
            <span class="title-gradient">AI 全栈低代码</span>
            <br />生成平台
          </h1>

          <p class="hero-desc reveal" style="--delay: 0.2s">
            一键生成<strong>后台管理系统 + PC 端 + H5 端</strong><br />
            开箱即用、开箱可上线、完全开源
          </p>

          <div class="hero-actions reveal" style="--delay: 0.3s">
            <button class="btn-primary" @click="$router.push('/generator')">
              <span class="btn-text">立即体验</span>
              <span class="btn-shimmer"></span>
              <svg class="btn-arrow" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8H13M10 5L13 8L10 11"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button class="btn-glass" @click="$router.push('/docs')">查看文档</button>
            <a class="btn-github" href="https://github.com" target="_blank">
              <svg viewBox="0 0 20 20" fill="currentColor" class="github-icon">
                <path
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                />
              </svg>
              <span>Star on GitHub</span>
            </a>
          </div>

          <div class="hero-stats reveal" style="--delay: 0.4s">
            <div class="stat-item">
              <span class="stat-value"
                ><span ref="stat1">{{ displayStats.templates }}</span
                >+</span
              >
              <span class="stat-label">行业模板</span>
            </div>
            <div class="stat-divider">
              <div class="divider-dot"></div>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ displayStats.platforms }}</span>
              <span class="stat-label">端全覆盖</span>
            </div>
            <div class="stat-divider">
              <div class="divider-dot"></div>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ displayStats.percent }}%</span>
              <span class="stat-label">开源免费</span>
            </div>
          </div>
        </div>

        <div class="hero-right reveal" style="--delay: 0.2s">
          <div class="hero-illustration">
            <div class="geo-ring geo-r1"></div>
            <div class="geo-ring geo-r2"></div>
            <div class="geo-block geo-b1"></div>
            <div class="geo-block geo-b2"></div>
            <div class="geo-block geo-b3"></div>
            <div class="geo-block geo-b4"></div>
            <div class="geo-node geo-n1"></div>
            <div class="geo-node geo-n2"></div>
            <div class="geo-node geo-n3"></div>
            <div class="geo-node geo-n4"></div>
            <div class="geo-connector geo-c1"></div>
            <div class="geo-connector geo-c2"></div>
            <div class="geo-connector geo-c3"></div>
            <div class="geo-orbital center-orb">
              <div class="orb-inner">
                <svg viewBox="0 0 32 32" fill="none" class="orb-icon">
                  <rect
                    x="2"
                    y="2"
                    width="28"
                    height="28"
                    rx="7"
                    stroke="url(#orbGrad)"
                    stroke-width="2"
                  />
                  <path
                    d="M11 16L14.5 19.5L21 12.5"
                    stroke="url(#orbGrad2)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <defs>
                    <linearGradient id="orbGrad" x1="0" y1="0" x2="32" y2="32">
                      <stop offset="0%" stop-color="#3b82f6" />
                      <stop offset="100%" stop-color="#8b5cf6" />
                    </linearGradient>
                    <linearGradient id="orbGrad2" x1="0" y1="0" x2="32" y2="32">
                      <stop offset="0%" stop-color="#3b82f6" />
                      <stop offset="100%" stop-color="#a78bfa" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-scroll">
        <span class="scroll-text">向下滚动探索</span>
        <div class="scroll-line">
          <div class="scroll-thumb"></div>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="section-header">
        <span class="section-label">核心能力</span>
        <h2 class="section-title">六大核心特性<span class="accent-dot">.</span></h2>
        <p class="section-desc">从 AI 生成到全栈部署，覆盖开发全流程</p>
      </div>
      <div class="features-grid">
        <div v-for="(item, idx) in coreFeatures" :key="idx" class="feature-card">
          <div class="card-glow-bg"></div>
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" v-html="item.iconSvg"></svg>
          </div>
          <div class="feature-num">{{ String(idx + 1).padStart(2, '0') }}</div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </section>

    <section class="tech-showcase">
      <div class="section-header">
        <span class="section-label">技术架构</span>
        <h2 class="section-title">现代化全栈技术体系<span class="accent-dot">.</span></h2>
        <p class="section-desc">前沿技术选型，工程化最佳实践</p>
      </div>
      <div class="tech-grid">
        <div v-for="(group, gIdx) in techGroups" :key="gIdx" class="tech-card">
          <div class="tech-card-head">
            <div class="tech-layer-icon" v-html="group.icon"></div>
            <span class="tech-layer">{{ group.label }}</span>
          </div>
          <div class="tech-items">
            <div v-for="t in group.items" :key="t.name" class="tech-row">
              <span class="tech-dot-colored" :style="{ background: group.color }"></span>
              <span class="tech-name">{{ t.name }}</span>
              <span class="tech-ver">{{ t.version }}</span>
            </div>
          </div>
          <div class="tech-card-glow"></div>
        </div>
      </div>
    </section>

    <section class="platforms">
      <div class="section-header">
        <span class="section-label">多端覆盖</span>
        <h2 class="section-title">一套配置，三端运行<span class="accent-dot">.</span></h2>
        <p class="section-desc">同时生成后台管理 + PC 用户端 + H5 移动端</p>
      </div>
      <div class="platform-grid">
        <div v-for="(p, idx) in platformList" :key="idx" class="platform-card">
          <div class="platform-visual">
            <div class="platform-screen" :class="p.screenClass">
              <div class="screen-inner">
                <div class="screen-header">
                  <span class="sc-dot"></span>
                  <span class="sc-dot"></span>
                  <span class="sc-dot"></span>
                </div>
                <div class="screen-body">
                  <div class="sb-sidebar"></div>
                  <div class="sb-main">
                    <div class="sb-line sb-l1"></div>
                    <div class="sb-line sb-l2"></div>
                    <div class="sb-line sb-l3"></div>
                    <div class="sb-block"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="platform-glow"></div>
          </div>
          <h3>{{ p.title }}</h3>
          <p>{{ p.desc }}</p>
          <div class="platform-tags">
            <span v-for="tag in p.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="templates">
      <div class="section-header">
        <span class="section-label">行业方案</span>
        <h2 class="section-title">10+ 行业专属模板<span class="accent-dot">.</span></h2>
        <p class="section-desc">覆盖主流业务场景，菜单、数据、图表贴合行业需求</p>
      </div>
      <div class="templates-grid">
        <div
          v-for="tpl in hotTemplates"
          :key="tpl.id"
          class="template-card"
          @click="goToPreview(tpl.id)"
        >
          <div class="tpl-bg-grad" :style="{ background: tpl.gradient }"></div>
          <div class="tpl-icon">
            <el-icon :size="20"><component :is="tpl.icon" /></el-icon>
          </div>
          <h4>{{ tpl.name }}</h4>
          <p>{{ tpl.description }}</p>
          <div class="tpl-tags">
            <span v-for="tag in tpl.features.slice(0, 2)" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="cta-inner">
        <div class="cta-bg-glow"></div>
        <div class="cta-bg-ring"></div>
        <h2>准备好构建你的企业系统了吗？</h2>
        <p>3 步完成企业级全栈系统，完全免费，代码开源</p>
        <div class="cta-buttons">
          <button class="btn-cta-primary" @click="$router.push('/generator')">
            <span>开始在线生成</span>
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8H13M10 5L13 8L10 11"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button class="btn-cta-secondary" @click="$router.push('/templates')">
            浏览模板市场
          </button>
        </div>
      </div>
    </section>

    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="footer-logo-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="5"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <path
                d="M8 12L11 15L16 9"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span class="footer-name">AI 全栈低代码生成平台</span>
        </div>
        <div class="footer-links">
          <router-link to="/index">首页</router-link>
          <router-link to="/templates">模板</router-link>
          <router-link to="/generator">生成器</router-link>
          <router-link to="/docs">文档</router-link>
          <router-link to="/about">关于</router-link>
        </div>
        <div class="footer-tech">
          <span>Vue3</span><span class="ft-dot"></span> <span>Node.js</span
          ><span class="ft-dot"></span> <span>Express</span><span class="ft-dot"></span>
          <span>lowdb</span>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 AI 全栈低代码生成平台</span>
        <span class="fb-sep">·</span>
        <span>MIT License</span>
        <span class="fb-sep">·</span>
        <span>可学习、可商用、可二次开发</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import {} from '@element-plus/icons-vue';

const router = useRouter();
const particleCanvas = ref(null);
const observerRef = ref(null);
let animFrameId = null;
let particles = [];

const displayStats = reactive({ templates: 0, platforms: 0, percent: 0 });

const goToPreview = id => {
  router.push(`/preview/${id}`);
};

const coreFeatures = [
  {
    title: 'AI 智能驱动',
    desc: '自然语言描述业务需求，AI 自动生成完整前后端代码与 CRUD 接口，智能推荐最佳实践',
    iconSvg:
      '<path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
  },
  {
    title: '多端适配',
    desc: '一套配置同时生成 PC 管理后台 + PC 用户端 + H5 移动端，三端数据互通、风格统一',
    iconSvg:
      '<rect x="2" y="2" width="9" height="9" rx="2" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="2" width="9" height="9" rx="2" stroke="currentColor" stroke-width="1.5"/><rect x="2" y="13" width="9" height="9" rx="2" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="13" width="9" height="9" rx="2" stroke="currentColor" stroke-width="1.5"/>',
  },
  {
    title: '全栈架构',
    desc: '前端 Vue3 + 后端 Node.js + lowdb 免安装数据库，前后端一体项目，npm 一键启动',
    iconSvg:
      '<path d="M3 3H21M3 3V21M3 3L21 21M21 3V21M21 21H3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  {
    title: '开箱即用',
    desc: '无需配置数据库环境，下载 ZIP 解压即运行，内置 Mock 数据与完整 CRUD 接口',
    iconSvg:
      '<path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 12L21 7M12 12V22M12 12L3 7" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
  },
  {
    title: '企业级规范',
    desc: 'ESLint + Prettier 代码规范、模块化工程结构、完整注释，符合大厂项目标准',
    iconSvg:
      '<path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M14 2V8H20" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M16 13H8M16 17H8M10 9H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  {
    title: '100% 开源免费',
    desc: 'MIT 协议完全开源，可自由学习源码、商业使用、二次开发，零授权费用',
    iconSvg:
      '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M12 7V12L15.5 15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 2H10M14 2H16M8 22H10M14 22H16M2 8V10M2 14V16M22 8V10M22 14V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  },
];

const techGroups = [
  {
    label: '前端',
    color: '#3b82f6',
    icon: '<svg viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M7 19H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M10 15V19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    items: [
      { name: 'Vue 3', version: '3.x' },
      { name: 'Vite', version: '5.x' },
      { name: 'Element Plus', version: '2.x' },
      { name: 'Pinia', version: '2.x' },
      { name: 'Vue Router', version: '4.x' },
    ],
  },
  {
    label: '后端',
    color: '#10b981',
    icon: '<svg viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" stroke-width="1.5"/><path d="M7 7H13M7 10H13M7 13H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    items: [
      { name: 'Node.js', version: '18+' },
      { name: 'Express', version: '4.x' },
      { name: 'lowdb', version: '5.x' },
      { name: 'RESTful API', version: '—' },
    ],
  },
  {
    label: '工程化',
    color: '#f59e0b',
    icon: '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M10 6V10L13 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    items: [
      { name: 'ESLint', version: '8.x' },
      { name: 'Prettier', version: '3.x' },
      { name: 'Git', version: '—' },
      { name: 'ZIP 导出', version: '一键' },
    ],
  },
];

const platformList = [
  {
    title: '后台管理端',
    desc: '功能完整的后台管理系统，数据管理、图表分析、权限控制一站式覆盖',
    tags: ['数据表格', '图表', '权限', '导出'],
    screenClass: 'screen-admin',
  },
  {
    title: 'PC 用户端',
    desc: '宽屏完整的业务用户界面，响应式布局适配各种屏幕尺寸',
    tags: ['业务页面', '响应式', '交互', '展示'],
    screenClass: 'screen-pc',
  },
  {
    title: 'H5 移动端',
    desc: '触屏优化的移动端界面，支持手机壳预览调试模式',
    tags: ['触屏适配', '手机壳', '移动交互', 'H5'],
    screenClass: 'screen-h5',
  },
];

const hotTemplates = ref([
  {
    id: 1,
    name: '电商后台系统',
    description: '商品管理、订单处理、用户中心',
    icon: 'ShoppingCart',
    features: ['商品管理', '订单处理', '数据统计'],
    gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
  },
  {
    id: 2,
    name: '教育管理系统',
    description: '课程管理、学员档案、在线考试',
    icon: 'Reading',
    features: ['课程管理', '学员档案', '在线考试'],
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
  },
  {
    id: 3,
    name: '政务服务平台',
    description: '办事大厅、审批流程、信息公开',
    icon: 'OfficeBuilding',
    features: ['办事大厅', '审批流程', '信息公开'],
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
  },
  {
    id: 4,
    name: '医疗健康系统',
    description: '挂号预约、电子病历、药房管理',
    icon: 'FirstAidKit',
    features: ['挂号预约', '电子病历', '药房管理'],
    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
  },
  {
    id: 5,
    name: '物流仓储系统',
    description: '仓库管理、运单追踪、车辆调度',
    icon: 'Van',
    features: ['仓库管理', '运单追踪', '数据分析'],
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  },
  {
    id: 6,
    name: '人力资源系统',
    description: '招聘管理、考勤打卡、绩效评估',
    icon: 'UserFilled',
    features: ['招聘管理', '考勤打卡', '绩效评估'],
    gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
  },
]);

// Particle system
const initParticles = () => {
  const canvas = particleCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.5 + 0.1,
  }));
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -20) p.x = canvas.width + 20;
      if (p.x > canvas.width + 20) p.x = -20;
      if (p.y < -20) p.y = canvas.height + 20;
      if (p.y > canvas.height + 20) p.y = -20;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`;
      ctx.fill();
    });
    particles.forEach((a, i) => {
      particles.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(99, 161, 247, ${0.08 * (1 - d / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });
    animFrameId = requestAnimationFrame(animate);
  };
  animate();
};

// Stats counter
const animateStats = () => {
  const targets = { templates: 10, platforms: 3, percent: 100 };
  const _steps = { templates: 0, platforms: 0, percent: 0 };
  const duration = 1800;
  const start = performance.now();
  const tick = now => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    displayStats.templates = Math.floor(targets.templates * eased);
    displayStats.platforms = Math.floor(targets.platforms * eased);
    displayStats.percent = Math.floor(targets.percent * eased);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

// Scroll reveal
const handleReveal = entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
};

onMounted(() => {
  initParticles();
  animateStats();

  if ('IntersectionObserver' in window) {
    observerRef.value = new IntersectionObserver(handleReveal, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    });
    document
      .querySelectorAll(
        '.reveal-on-scroll, .feature-card, .tech-card, .platform-card, .template-card'
      )
      .forEach(el => {
        observerRef.value.observe(el);
      });
  }

  window.addEventListener('resize', () => {
    if (particleCanvas.value) {
      particleCanvas.value.width = window.innerWidth;
      particleCanvas.value.height = window.innerHeight;
    }
  });
});

onBeforeUnmount(() => {
  if (animFrameId) cancelAnimationFrame(animFrameId);
  if (observerRef.value) observerRef.value.disconnect();
});
</script>

<style lang="scss" scoped>
$bg: #0a0a1a;
$bg2: #0f0f23;
$surface: #13132a;
$surface2: #1a1a35;
$primary: #3b82f6;
$primary-glow: rgba(59, 130, 246, 0.3);
$accent: #8b5cf6;
$text-primary: #f1f5f9;
$text-secondary: #94a3b8;
$text-muted: #64748b;
$border: rgba(255, 255, 255, 0.06);
$border-hover: rgba(99, 161, 247, 0.25);
$radius-sm: 8px;
$radius: 12px;
$radius-lg: 16px;
$radius-xl: 20px;

.landing-page {
  background: $bg;
  color: $text-primary;
  overflow-x: hidden;
  position: relative;
}

.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

// ===================== HERO =====================
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 120px 32px 100px;
  overflow: hidden;
  z-index: 0;
}

.hero-grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(59, 130, 246, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 0%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 0%, transparent 70%);
  z-index: 0;
}

.hero-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  z-index: 0;
  opacity: 0.4;
}

.hero-glow-1 {
  width: 600px;
  height: 600px;
  background: rgba(59, 130, 246, 0.12);
  top: -200px;
  left: -100px;
  animation: glow-drift 10s ease-in-out infinite;
}

.hero-glow-2 {
  width: 400px;
  height: 400px;
  background: rgba(139, 92, 246, 0.1);
  bottom: -100px;
  right: -50px;
  animation: glow-drift 8s ease-in-out infinite 3s;
}

.hero-glow-3 {
  width: 300px;
  height: 300px;
  background: rgba(59, 130, 246, 0.08);
  top: 50%;
  left: 60%;
  animation: glow-drift 12s ease-in-out infinite 1s;
}

.hero-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  gap: 80px;
  position: relative;
  z-index: 1;
}

.hero-left {
  flex: 0 0 560px;
  max-width: 560px;
}

.reveal {
  opacity: 0;
  transform: translateY(30px);
  animation: revealIn 0.8s ease-out forwards;
  animation-delay: var(--delay, 0s);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 18px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 24px;
  font-size: 13px;
  color: #93c5fd;
  margin-bottom: 32px;
  backdrop-filter: blur(8px);

  .badge-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #60a5fa;
    box-shadow: 0 0 8px rgba(96, 165, 250, 0.6);
    animation: pulse-dot 2s ease-in-out infinite;
  }

  .badge-sep {
    color: $text-muted;
  }
  .badge-highlight {
    color: #60a5fa;
    font-weight: 600;
  }
}

.hero-title {
  font-size: 60px;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 28px;
  letter-spacing: -0.03em;
  color: #f8fafc;

  .title-gradient {
    background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #60a5fa 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s ease-in-out infinite;
  }
}

.hero-desc {
  font-size: 18px;
  line-height: 1.75;
  color: #94a3b8;
  margin-bottom: 44px;

  strong {
    color: #e2e8f0;
    font-weight: 600;
  }
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 52px;
  flex-wrap: wrap;
}

// ---- Buttons ----
.btn-primary {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 34px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #fff;
  border: none;
  border-radius: $radius-sm;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  font-family: inherit;
  transition: all 0.3s ease;
  box-shadow: 0 0 24px rgba(37, 99, 235, 0.3);

  .btn-shimmer {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 100%
    );
    transform: translateX(-100%);
    animation: shimmer-btn 3s ease-in-out infinite;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 36px rgba(37, 99, 235, 0.45);
  }

  .btn-arrow {
    width: 18px;
    height: 18px;
    transition: transform 0.3s;
    position: relative;
    z-index: 1;
  }

  &:hover .btn-arrow {
    transform: translateX(3px);
  }
}

.btn-glass {
  display: inline-flex;
  align-items: center;
  padding: 14px 32px;
  background: rgba(255, 255, 255, 0.04);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: $radius-sm;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  backdrop-filter: blur(10px);
  font-family: inherit;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.18);
    transform: translateY(-2px);
  }
}

.btn-github {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: $radius-sm;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s;
  backdrop-filter: blur(10px);

  .github-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
}

// ---- Stats ----
.hero-stats {
  display: flex;
  align-items: center;
  gap: 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.stat-value {
  font-size: 28px;
  font-weight: 800;
  color: #f8fafc;
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 13px;
  color: $text-muted;
  font-weight: 500;
}

.stat-divider {
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .divider-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: $text-muted;
    opacity: 0.5;
  }
}

// ---- Illustration ----
.hero-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-illustration {
  width: 480px;
  height: 420px;
  position: relative;
}

.geo-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(59, 130, 246, 0.15);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.geo-r1 {
  width: 340px;
  height: 340px;
  border-style: dashed;
  animation: spin-slow 30s linear infinite;
}

.geo-r2 {
  width: 240px;
  height: 240px;
  animation: spin-slow 20s linear infinite reverse;
}

.geo-block {
  position: absolute;
  border-radius: $radius-sm;
  backdrop-filter: blur(12px);
  transition: all 0.6s ease;
}

.geo-b1 {
  width: 100px;
  height: 100px;
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.2);
  top: 60px;
  left: 60px;
  animation: float-subtle 7s ease-in-out infinite;
}

.geo-b2 {
  width: 70px;
  height: 70px;
  background: rgba(139, 92, 246, 0.08);
  border: 1px solid rgba(139, 92, 246, 0.2);
  top: 180px;
  right: 80px;
  border-radius: 50%;
  animation: float-subtle 9s ease-in-out infinite 2s;
}

.geo-b3 {
  width: 90px;
  height: 65px;
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.12);
  bottom: 100px;
  left: 130px;
  animation: float-subtle 8s ease-in-out infinite 1s;
}

.geo-b4 {
  width: 55px;
  height: 55px;
  background: rgba(139, 92, 246, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.15);
  bottom: 160px;
  right: 140px;
  border-radius: 50%;
  animation: float-subtle 10s ease-in-out infinite 3s;
}

.geo-node {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #60a5fa;
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.5);
}

.geo-n1 {
  top: 80px;
  left: 310px;
}
.geo-n2 {
  top: 200px;
  left: 30px;
}
.geo-n3 {
  bottom: 100px;
  right: 60px;
}
.geo-n4 {
  bottom: 200px;
  right: 300px;
}

.geo-connector {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, rgba(59, 130, 246, 0.3), transparent);
  transform-origin: left center;
}

.geo-c1 {
  width: 120px;
  top: 120px;
  left: 170px;
  transform: rotate(25deg);
}
.geo-c2 {
  width: 80px;
  top: 230px;
  right: 180px;
  transform: rotate(-15deg);
}
.geo-c3 {
  width: 90px;
  bottom: 150px;
  left: 250px;
  transform: rotate(40deg);
}

.center-orb {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.orb-inner {
  width: 80px;
  height: 80px;
  background: rgba(19, 19, 42, 0.9);
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-radius: $radius-lg;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 40px rgba(59, 130, 246, 0.15);
  backdrop-filter: blur(20px);
  animation: float-subtle 6s ease-in-out infinite;
}

.orb-icon {
  width: 36px;
  height: 36px;
}

.hero-scroll {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 1;

  .scroll-text {
    font-size: 11px;
    color: $text-muted;
    letter-spacing: 0.08em;
  }

  .scroll-line {
    width: 1px;
    height: 40px;
    background: rgba(148, 163, 184, 0.2);
    border-radius: 1px;
    position: relative;
    overflow: hidden;

    .scroll-thumb {
      width: 100%;
      height: 16px;
      background: rgba(59, 130, 246, 0.4);
      border-radius: 1px;
      position: absolute;
      top: 0;
      animation: scroll-down 2s ease-in-out infinite;
    }
  }
}

// ===================== SECTIONS =====================
.section-header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 72px;
}

.section-label {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: $primary;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 18px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.15);
  padding: 5px 14px;
  border-radius: 4px;
}

.section-title {
  font-size: 42px;
  font-weight: 800;
  color: #f8fafc;
  margin-bottom: 18px;
  letter-spacing: -0.03em;
  line-height: 1.15;

  .accent-dot {
    color: $primary;
  }
}

.section-desc {
  font-size: 17px;
  color: #94a3b8;
  line-height: 1.6;
}

// ===================== FEATURES =====================
.features {
  padding: 120px 32px;
  position: relative;
  z-index: 1;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: $surface;
  border: 1px solid $border;
  border-radius: $radius-lg;
  padding: 40px 32px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateY(40px);

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .card-glow-bg {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.4s;
    background: radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 60%);
  }

  &:hover {
    transform: translateY(-4px);
    border-color: $border-hover;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

    .card-glow-bg {
      opacity: 1;
    }
  }
}

.feature-icon {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: $radius;
  margin-bottom: 28px;
  color: $primary;

  svg {
    width: 26px;
    height: 26px;
  }
}

.feature-num {
  position: absolute;
  top: 32px;
  right: 32px;
  font-size: 40px;
  font-weight: 800;
  color: rgba(59, 130, 246, 0.05);
  letter-spacing: -0.04em;
  pointer-events: none;
}

.feature-card h3 {
  font-size: 20px;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 12px;
}

.feature-card p {
  font-size: 14px;
  line-height: 1.75;
  color: #94a3b8;
}

// ===================== TECH =====================
.tech-showcase {
  padding: 120px 32px;
  position: relative;
  z-index: 1;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(59, 130, 246, 0.02) 50%,
    transparent 100%
  );
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
}

.tech-card {
  background: $surface;
  border: 1px solid $border;
  border-radius: $radius-lg;
  padding: 36px 30px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateY(40px);

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    border-color: $border-hover;
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
}

.tech-card-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 28px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.tech-layer-icon {
  width: 28px;
  height: 28px;
  color: $primary;

  svg {
    width: 100%;
    height: 100%;
  }
}

.tech-layer {
  font-size: 12px;
  font-weight: 700;
  color: $primary;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.tech-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 0;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  }
}

.tech-dot-colored {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.tech-name {
  font-size: 15px;
  font-weight: 500;
  color: #e2e8f0;
  flex: 1;
}

.tech-ver {
  font-size: 12px;
  color: $text-muted;
  background: rgba(255, 255, 255, 0.04);
  padding: 3px 10px;
  border-radius: 4px;
}

.tech-card-glow {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.04) 0%, transparent 70%);
  pointer-events: none;
}

// ===================== PLATFORMS =====================
.platforms {
  padding: 120px 32px;
  position: relative;
  z-index: 1;
}

.platform-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  max-width: 1120px;
  margin: 0 auto;
}

.platform-card {
  background: $surface;
  border: 1px solid $border;
  border-radius: $radius-lg;
  padding: 36px 28px;
  text-align: center;
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateY(40px);

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    border-color: $border-hover;
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);

    .platform-glow {
      opacity: 1;
    }
  }
}

.platform-visual {
  position: relative;
  margin: 0 auto 28px;
}

.platform-screen {
  width: 200px;
  margin: 0 auto;
  border-radius: $radius-sm;
  overflow: hidden;
  background: #0f0f23;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);

  &.screen-admin {
    width: 220px;
  }
  &.screen-h5 {
    width: 120px;
    border-radius: 18px;
  }
}

.screen-inner {
  padding: 8px 10px 10px;
}

.screen-header {
  display: flex;
  gap: 5px;
  margin-bottom: 8px;

  .sc-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
  }
}

.screen-body {
  display: flex;
  gap: 6px;
  height: 70px;
}

.sb-sidebar {
  width: 30%;
  background: rgba(59, 130, 246, 0.08);
  border-radius: 3px;
}

.sb-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.sb-line {
  height: 5px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.05);
  &.sb-l1 {
    width: 90%;
  }
  &.sb-l2 {
    width: 70%;
  }
  &.sb-l3 {
    width: 55%;
  }
}

.sb-block {
  height: 24px;
  border-radius: 3px;
  background: rgba(59, 130, 246, 0.1);
  margin-top: 3px;
}

.platform-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none;
}

.platform-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 10px;
}

.platform-card p {
  font-size: 14px;
  color: #94a3b8;
  line-height: 1.7;
  margin-bottom: 16px;
}

.platform-tags {
  display: flex;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;

  span {
    font-size: 11px;
    color: $text-muted;
    background: rgba(255, 255, 255, 0.03);
    padding: 4px 10px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.04);
  }
}

// ===================== TEMPLATES =====================
.templates {
  padding: 120px 32px;
  position: relative;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(59, 130, 246, 0.02) 0%,
    transparent 50%,
    rgba(59, 130, 246, 0.02) 100%
  );
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1100px;
  margin: 0 auto;
}

.template-card {
  background: $surface;
  border: 1px solid $border;
  border-radius: $radius-lg;
  padding: 30px 24px 24px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.35s ease;
  opacity: 0;
  transform: translateY(40px);

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .tpl-bg-grad {
    position: absolute;
    top: -40px;
    right: -40px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    opacity: 0.06;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: $border-hover;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

    .tpl-bg-grad {
      opacity: 0.12;
    }
  }
}

.tpl-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(59, 130, 246, 0.1);
  border-radius: $radius-sm;
  color: $primary;
  margin-bottom: 18px;
}

.template-card h4 {
  font-size: 16px;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 8px;
}

.template-card p {
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 16px;
  line-height: 1.5;
}

.tpl-tags {
  display: flex;
  gap: 6px;

  span {
    font-size: 11px;
    color: $text-muted;
    background: rgba(255, 255, 255, 0.03);
    padding: 3px 10px;
    border-radius: 4px;
  }
}

// ===================== CTA =====================
.cta {
  padding: 100px 32px 120px;
  position: relative;
  z-index: 1;
}

.cta-inner {
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
  background: linear-gradient(
    150deg,
    rgba(30, 58, 138, 0.5) 0%,
    rgba(29, 78, 216, 0.4) 50%,
    rgba(37, 99, 235, 0.5) 100%
  );
  border-radius: $radius-xl;
  padding: 64px 48px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(59, 130, 246, 0.2);
  backdrop-filter: blur(20px);
}

.cta-bg-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 60%);
  pointer-events: none;
}

.cta-bg-ring {
  position: absolute;
  top: -80px;
  right: -80px;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  border: 1px solid rgba(59, 130, 246, 0.08);
  pointer-events: none;
}

.cta-inner h2 {
  font-size: 34px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 14px;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;
}

.cta-inner p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
}

.cta-buttons {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.btn-cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 38px;
  background: #fff;
  color: #0f172a;
  border: none;
  border-radius: $radius-sm;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
}

.btn-cta-secondary {
  display: inline-flex;
  align-items: center;
  padding: 16px 36px;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: $radius-sm;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover {
    background: rgba(255, 255, 255, 0.13);
    border-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }
}

// ===================== FOOTER =====================
.site-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 40px 32px 28px;
  position: relative;
  z-index: 1;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 24px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-logo-icon {
  width: 28px;
  height: 28px;
  color: $primary;
  svg {
    width: 100%;
    height: 100%;
  }
}

.footer-name {
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
}

.footer-links {
  display: flex;
  gap: 24px;

  a {
    font-size: 13px;
    color: $text-muted;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #e2e8f0;
    }
  }
}

.footer-tech {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: $text-muted;

  .ft-dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: $text-muted;
    opacity: 0.4;
  }
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  text-align: center;
  font-size: 12px;
  color: $text-muted;

  .fb-sep {
    margin: 0 6px;
    opacity: 0.3;
  }
}

// ===================== ANIMATIONS =====================
@keyframes revealIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes shimmer-btn {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes pulse-dot {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

@keyframes glow-drift {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(30px, -20px) scale(1.05);
  }
  50% {
    transform: translate(-10px, -40px) scale(0.95);
  }
  75% {
    transform: translate(-20px, 10px) scale(1.03);
  }
}

@keyframes float-subtle {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes spin-slow {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes scroll-down {
  0% {
    top: -16px;
  }
  100% {
    top: 100%;
  }
}

// ===================== RESPONSIVE =====================
@media (max-width: 1024px) {
  .hero-container {
    flex-direction: column;
    text-align: center;
    gap: 56px;
  }
  .hero-left {
    flex: none;
    max-width: 100%;
  }
  .hero-actions {
    justify-content: center;
  }
  .hero-stats {
    justify-content: center;
  }
  .hero-title {
    font-size: 42px;
  }
  .features-grid,
  .platform-grid,
  .templates-grid,
  .tech-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .section-title {
    font-size: 32px;
  }
  .hero-illustration {
    width: 360px;
    height: 320px;
  }
  .cta-inner {
    padding: 48px 32px;
  }
}

@media (max-width: 640px) {
  .hero {
    padding: 80px 20px 70px;
  }
  .hero-title {
    font-size: 32px;
  }
  .hero-desc {
    font-size: 15px;
  }
  .features,
  .tech-showcase,
  .platforms,
  .templates {
    padding: 60px 20px;
  }
  .features-grid,
  .platform-grid,
  .templates-grid,
  .tech-grid {
    grid-template-columns: 1fr;
  }
  .section-title {
    font-size: 26px;
  }
  .section-header {
    margin-bottom: 48px;
  }
  .cta {
    padding: 60px 20px;
  }
  .cta-inner {
    padding: 40px 24px;
  }
  .cta-inner h2 {
    font-size: 24px;
  }
  .footer-inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .hero-illustration {
    transform: scale(0.7);
    width: 280px;
    height: 250px;
  }
}
</style>
