<template>
  <div class="ecom-pay">
    <div class="pay-amount">
      <div class="pay-label">支付金额</div>
      <div class="pay-price" :style="{ color: themeColor }">¥{{ amount }}</div>
    </div>
    <div class="pay-methods">
      <div class="form-label">支付方式</div>
      <div
        v-for="m in methods"
        :key="m.key"
        :class="['method-item', { active: selectedMethod === m.key }]"
        @click="selectedMethod = m.key"
      >
        <span class="method-icon">{{ m.icon }}</span>
        <span class="method-name">{{ m.name }}</span>
        <span
          :class="['method-check', { checked: selectedMethod === m.key }]"
          :style="
            selectedMethod === m.key ? { background: themeColor, borderColor: themeColor } : {}
          "
          >✓</span
        >
      </div>
    </div>
    <div class="pay-info">
      <div>订单号：{{ orderId }}</div>
      <div>商品：{{ productName }}</div>
    </div>
    <div class="form-actions" style="padding: 16px 12px 80px">
      <button class="submit-btn" :style="{ background: themeColor }" @click="handlePay">
        确认支付 ¥{{ amount }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useH5Page } from '../useH5Page';

const { themeColor, navigateTo, updateData, fetchDetail, setLayout, route } = useH5Page();
setLayout({ title: '收银台', showBack: true, showTabbar: false });

const orderId = ref(route.params.id);
const amount = ref(0);
const productName = ref('');
const selectedMethod = ref('wechat');
const methods = [
  { key: 'wechat', name: '微信支付', icon: '💚' },
  { key: 'alipay', name: '支付宝', icon: '💙' },
  { key: 'bank', name: '银行卡', icon: '💳' },
];

onMounted(async () => {
  const detail = await fetchDetail('orderList', orderId.value);
  if (detail) {
    amount.value = detail.amount || detail.price || 0;
    productName.value = detail.product || detail.name || '';
  }
});

const handlePay = async () => {
  await updateData('orderList', { id: parseInt(orderId.value), status: '已支付' });
  ElMessage.success('支付成功');
  navigateTo(`pay-success/${orderId.value}`);
};
</script>

<style lang="scss" scoped>
.pay-amount {
  background: #fff;
  text-align: center;
  padding: 24px 12px;
  margin-bottom: 8px;
  .pay-label {
    font-size: 13px;
    color: #999;
    margin-bottom: 8px;
  }
  .pay-price {
    font-size: 32px;
    font-weight: 700;
  }
}
.pay-methods {
  background: #fff;
  margin: 0 12px 8px;
  border-radius: 12px;
  padding: 12px;
  .form-label {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }
  .method-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 0;
    border-bottom: 1px solid #f5f5f5;
    cursor: pointer;
    &.active {
    }
    &:last-child {
      border-bottom: none;
    }
    .method-icon {
      font-size: 20px;
    }
    .method-name {
      flex: 1;
      font-size: 14px;
      color: #333;
    }
    .method-check {
      width: 18px;
      height: 18px;
      border: 2px solid #ddd;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: #fff;
      &.checked {
      }
    }
  }
}
.pay-info {
  background: #fff;
  margin: 0 12px;
  border-radius: 12px;
  padding: 12px;
  font-size: 12px;
  color: #999;
  div {
    padding: 4px 0;
  }
}
</style>
