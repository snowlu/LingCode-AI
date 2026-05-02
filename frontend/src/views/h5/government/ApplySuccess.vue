<template>
  <div class="gov-apply-success">
    <div class="h5-success">
      <div class="success-icon">✅</div>
      <div class="success-title">提交成功</div>
      <div class="success-desc">您的申请已提交，请耐心等待审批结果。</div>
      <div class="success-actions">
        <button
          class="action-btn"
          :style="{ background: themeColor }"
          @click="navigateTo('my-applications')"
        >
          我的办件
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
setLayout({ title: '提交成功', showBack: true, showTabbar: false });
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
