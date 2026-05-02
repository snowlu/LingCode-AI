<template>
  <div class="edu-enroll-success">
    <div class="h5-success">
      <div class="success-icon">🎉</div>
      <div class="success-title">报名成功</div>
      <div class="success-desc">您已成功报名课程！<br />快去开始学习吧！</div>
      <div class="success-actions">
        <button
          class="action-btn"
          :style="{ background: themeColor }"
          @click="navigateTo('my-courses')"
        >
          我的课程
        </button>
        <button
          class="action-btn"
          style="background: #f5f5f5; color: #333"
          @click="navigateTo('home')"
        >
          返回首页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, setLayout } = useH5Page();
setLayout({ title: '报名成功', showBack: true, showTabbar: false });
</script>

<style lang="scss" scoped>
.success-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  .action-btn {
    padding: 10px 24px;
    border-radius: 20px;
    border: none;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
}
</style>
