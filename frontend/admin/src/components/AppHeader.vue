<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo" @click="$router.push('/')">
        <el-icon :size="28" color="#409eff"><MagicStick /></el-icon>
        <span class="logo-text">AI 后台模板工厂</span>
      </div>

      <nav class="nav-menu">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          :class="{ active: $route.path === item.path }"
        >
          <el-icon><component :is="item.icon" /></el-icon>
          {{ item.label }}
        </router-link>
      </nav>

      <div class="header-actions">
        <el-button type="primary" @click="$router.push('/generator')">
          <el-icon><MagicStick /></el-icon>
          开始生成
        </el-button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const menuItems = ref([
  { path: '/index', label: '首页', icon: 'HomeFilled' },
  { path: '/templates', label: '模板市场', icon: 'Grid' },
  { path: '/generator', label: '在线生成器', icon: 'MagicStick' },
  { path: '/docs', label: '文档中心', icon: 'Document' },
  { path: '/about', label: '关于我们', icon: 'InfoFilled' },
]);
</script>

<style lang="scss" scoped>
.app-header {
  background: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  .logo-text {
    font-size: 20px;
    font-weight: 700;
    color: var(--text-primary);
  }
}

.nav-menu {
  display: flex;
  gap: 8px;

  a {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 18px;
    border-radius: 8px;
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      color: var(--primary-color);
      background: rgba(64, 158, 255, 0.05);
    }

    &.active {
      color: var(--primary-color);
      background: rgba(64, 158, 255, 0.1);
      font-weight: 600;
    }
  }
}

.header-actions {
  .el-button {
    border-radius: 8px;
    font-weight: 500;
  }
}

@media (max-width: 1024px) {
  .nav-menu {
    display: none;
  }
}
</style>
