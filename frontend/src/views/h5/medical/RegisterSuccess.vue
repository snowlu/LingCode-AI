<template>
  <div class="med-register-success">
    <div class="h5-success">
      <div class="success-icon">✅</div>
      <div class="success-title">挂号成功</div>
      <div class="success-desc">请按时就诊，提前15分钟到达。</div>
      <div class="success-actions">
        <button
          class="action-btn"
          :style="{ background: themeColor }"
          @click="navigateTo('my-appointments')"
        >
          我的预约
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
setLayout({ title: '挂号成功', showBack: true, showTabbar: false });
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
