<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo" @click="$router.push('/')">
        <svg viewBox="0 0 28 28" fill="none" class="logo-svg">
          <rect x="2" y="2" width="24" height="24" rx="6" stroke="url(#logoGrad)" stroke-width="2"/>
          <path d="M9 14L12.5 17.5L19 10.5" stroke="url(#logoGrad2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="28" y2="28">
              <stop offset="0%" stop-color="#3b82f6"/>
              <stop offset="100%" stop-color="#8b5cf6"/>
            </linearGradient>
            <linearGradient id="logoGrad2" x1="0" y1="0" x2="28" y2="28">
              <stop offset="0%" stop-color="#3b82f6"/>
              <stop offset="100%" stop-color="#a78bfa"/>
            </linearGradient>
          </defs>
        </svg>
        <span class="logo-text">AI 全栈低代码生成平台</span>
      </div>

      <nav class="nav-menu">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          :class="{ active: $route.path === item.path || $route.path.startsWith(item.path + '/') }"
        >
          <el-icon><component :is="item.icon" /></el-icon>
          {{ item.label }}
        </router-link>
      </nav>

      <div class="header-actions">
        <button class="header-btn" @click="$router.push('/generator')">
          <el-icon><MagicStick /></el-icon>
          开始生成
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const menuItems = ref([
  { path: '/index', label: '首页', icon: 'HomeFilled' },
  { path: '/templates', label: '模板市场', icon: 'Grid' },
  { path: '/generator', label: '在线生成器', icon: 'MagicStick' },
  { path: '/docs', label: '文档中心', icon: 'Document' },
  { path: '/about', label: '关于项目', icon: 'InfoFilled' }
])
</script>

<style lang="scss" scoped>
.app-header {
  background: rgba(10, 10, 26, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: opacity 0.25s;

  &:hover { opacity: 0.8; }
}

.logo-svg {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
}

.logo-text {
  font-size: 16px;
  font-weight: 700;
  color: #e2e8f0;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.nav-menu {
  display: flex;
  gap: 4px;

  a {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 8px;
    color: #94a3b8;
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.2s;

    &:hover {
      color: #e2e8f0;
      background: rgba(255, 255, 255, 0.06);
    }

    &.active {
      color: #3b82f6;
      background: rgba(59, 130, 246, 0.1);
      font-weight: 600;
    }
  }
}

.header-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 20px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s;
  font-family: inherit;
  box-shadow: 0 0 16px rgba(59, 130, 246, 0.2);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 0 24px rgba(59, 130, 246, 0.35);
  }
}

@media (max-width: 1024px) {
  .nav-menu { display: none; }
}

@media (max-width: 640px) {
  .header-content { padding: 0 16px; }
  .logo-text { font-size: 13px; }
}
</style>
