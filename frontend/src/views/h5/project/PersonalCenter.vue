<template>
  <div class="proj-personal">
    <div
      class="user-card"
      :style="{
        background: `linear-gradient(135deg, ${themeColor}, ${adjustColor(themeColor, 30)})`,
      }"
    >
      <span class="user-avatar">👨‍💻</span>
      <div>
        <h3>张三</h3>
        <span class="user-level">前端工程师</span>
      </div>
    </div>
    <div class="menu-list">
      <div class="menu-item" @click="navigateTo('todo-tasks')">
        <el-icon :color="themeColor"><List /></el-icon><span>我的任务</span
        ><el-badge :value="6" :max="99" /><el-icon class="menu-arrow"><ArrowRight /></el-icon>
      </div>
      <div class="menu-item" @click="navigateTo('project-list')">
        <el-icon :color="themeColor"><FolderOpened /></el-icon><span>我的项目</span
        ><el-badge :value="3" :max="99" /><el-icon class="menu-arrow"><ArrowRight /></el-icon>
      </div>
      <div class="menu-item">
        <el-icon :color="themeColor"><User /></el-icon><span>个人信息</span
        ><el-icon class="menu-arrow"><ArrowRight /></el-icon>
      </div>
      <div class="menu-item">
        <el-icon :color="themeColor"><Bell /></el-icon><span>消息通知</span
        ><el-badge :value="5" :max="99" /><el-icon class="menu-arrow"><ArrowRight /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { List, FolderOpened, User, Bell, ArrowRight } from '@element-plus/icons-vue';
import { useH5Page } from '../useH5Page';
const { themeColor, adjustColor, navigateTo, setLayout } = useH5Page();
setLayout({ title: '', showBack: false, showTabbar: true, activeTab: 'personal' });
</script>

<style lang="scss" scoped>
.user-card {
  margin: 8px 12px;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
  .user-avatar {
    width: 44px;
    height: 44px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }
  h3 {
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 2px;
  }
  .user-level {
    font-size: 11px;
    opacity: 0.8;
  }
}
.menu-list {
  background: #fff;
  margin: 0 12px 8px;
  border-radius: 12px;
  overflow: hidden;
  .menu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    border-bottom: 0.5px solid #f5f5f5;
    cursor: pointer;
    &:last-child {
      border-bottom: none;
    }
    span {
      flex: 1;
      font-size: 14px;
      color: #333;
    }
    .menu-arrow {
      color: #ccc;
      font-size: 12px;
    }
  }
}
</style>
