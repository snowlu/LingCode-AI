<template>
  <div class="log-settings">
    <div class="menu-list">
      <div class="menu-item"><el-icon :color="themeColor"><User /></el-icon><span>个人信息</span><el-icon class="menu-arrow"><ArrowRight /></el-icon></div>
      <div class="menu-item"><el-icon :color="themeColor"><Bell /></el-icon><span>消息通知</span><el-icon class="menu-arrow"><ArrowRight /></el-icon></div>
    </div>
    <div class="logout-wrap"><button class="logout-btn" @click="handleLogout">退出登录</button></div>
  </div>
</template>

<script setup>
import { ElMessageBox } from 'element-plus';
import { User, Bell, ArrowRight } from '@element-plus/icons-vue';
import { useH5Page } from '../useH5Page';
const { themeColor, setLayout } = useH5Page();
setLayout({ title: '设置', showBack: true, showTabbar: false });
const handleLogout = async () => {
  try { await ElMessageBox.confirm('确定要退出登录吗？', '提示', { type: 'warning', confirmButtonText: '退出', cancelButtonText: '取消' }); window.location.href = '/'; } catch {}
};
</script>

<style lang="scss" scoped>
.menu-list { background: #fff; margin: 8px 12px; border-radius: 12px; overflow: hidden;
  .menu-item { display: flex; align-items: center; gap: 10px; padding: 12px 14px; border-bottom: 0.5px solid #f5f5f5; cursor: pointer;
    &:last-child { border-bottom: none; }
    span { flex: 1; font-size: 14px; color: #333; }
    .menu-arrow { color: #ccc; font-size: 12px; }
  }
}
.logout-wrap { padding: 24px 12px;
  .logout-btn { width: 100%; height: 44px; border-radius: 22px; border: 1px solid #f56c6c; background: #fff; color: #f56c6c; font-size: 15px; font-weight: 600; cursor: pointer; }
}
</style>
