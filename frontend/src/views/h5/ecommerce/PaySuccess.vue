<template>
  <div class="ecom-pay-success">
    <div class="h5-success">
      <div class="success-icon">✅</div>
      <div class="success-title">支付成功</div>
      <div class="success-desc">订单号：{{ orderId }}<br />感谢您的购买！</div>
      <div class="success-actions">
        <button
          class="action-btn"
          :style="{ background: themeColor }"
          @click="navigateTo(`order-detail/${orderId}`)"
        >
          查看订单
        </button>
        <button
          class="action-btn"
          style="background: #f5f5f5; color: #333"
          @click="navigateTo('order-list')"
        >
          我的订单
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useH5Page } from '../useH5Page';

const { themeColor, navigateTo, setLayout, route } = useH5Page();
setLayout({ title: '支付结果', showBack: true, showTabbar: false });

const orderId = route.params.id;
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
