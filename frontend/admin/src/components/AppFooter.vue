<template>
  <footer class="app-footer">
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
        <div class="brand-text">
          <span class="brand-name">AI 全栈低代码生成平台</span>
          <span class="brand-desc">大模型驱动的智能代码生成工具</span>
        </div>
      </div>
      <div class="footer-links">
        <div class="link-col">
          <span class="col-title">快速链接</span>
          <router-link to="/index">首页</router-link>
          <router-link to="/templates">模板市场</router-link>
          <router-link to="/generator">在线生成器</router-link>
        </div>
        <div class="link-col">
          <span class="col-title">资源</span>
          <router-link to="/docs">文档中心</router-link>
          <router-link to="/about">关于项目</router-link>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="bottom-left">
        <span>© 2026 AI 全栈低代码生成平台</span>
        <span class="sep">·</span>
        <span>MIT License · 开源免费</span>
        <span class="sep">·</span>
        <span>可学习、可商用、可二次开发</span>
      </div>
      <div class="bottom-right">
        <span>Vue3</span><span class="dot"></span> <span>Node.js</span><span class="dot"></span>
        <span>Express</span><span class="dot"></span> <span>lowdb</span><span class="dot"></span>
        <span>Element Plus</span>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
.app-footer {
  background: #060612;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 48px 32px 24px;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto 32px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 48px;
  flex-wrap: wrap;
}

.footer-brand {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.footer-logo-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  color: #3b82f6;
  margin-top: 2px;
  svg {
    width: 100%;
    height: 100%;
  }
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.brand-name {
  font-size: 16px;
  font-weight: 700;
  color: #e2e8f0;
}

.brand-desc {
  font-size: 13px;
  color: #64748b;
}

.footer-links {
  display: flex;
  gap: 56px;
}

.link-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.col-title {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 4px;
}

.link-col a {
  font-size: 14px;
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #e2e8f0;
  }
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.bottom-left {
  font-size: 13px;
  color: #64748b;

  .sep {
    margin: 0 6px;
    color: #475569;
  }
}

.bottom-right {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #475569;

  .dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #475569;
    opacity: 0.5;
  }
}

@media (max-width: 640px) {
  .footer-inner {
    flex-direction: column;
    gap: 32px;
  }
  .footer-links {
    gap: 40px;
  }
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>
