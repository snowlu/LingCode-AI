<template>
  <div class="res-coupon-list">
    <div v-if="coupons.length" class="coupon-list">
      <div v-for="(c, i) in coupons" :key="i" class="coupon-card">
        <div class="coupon-amount" :style="{ background: themeColor }">
          <span class="coupon-value">¥{{ c.amount }}</span>
        </div>
        <div class="coupon-info">
          <div class="coupon-name">{{ c.name }}</div>
          <div class="coupon-condition">{{ c.condition }}</div>
          <div class="coupon-expire">{{ c.expire }}</div>
        </div>
      </div>
    </div>
    <div v-else class="h5-empty">
      <div class="empty-icon">🎫</div>
      <div class="empty-text">暂无优惠券</div>
    </div>
  </div>
</template>

<script setup>
import { useH5Page } from '../useH5Page';
const { themeColor, setLayout } = useH5Page();
setLayout({ title: '优惠券', showBack: true, showTabbar: false });
const coupons = [
  { amount: 50, name: '新人专享券', condition: '满200可用', expire: '2026-06-30到期' },
  { amount: 30, name: '满减券', condition: '满100可用', expire: '2026-05-31到期' },
  { amount: 20, name: '会员专享', condition: '满80可用', expire: '2026-07-31到期' },
];
</script>

<style lang="scss" scoped>
.coupon-list {
  padding: 8px 12px;
}
.coupon-card {
  display: flex;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 8px;
  .coupon-amount {
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    .coupon-value {
      font-size: 22px;
      font-weight: 700;
    }
  }
  .coupon-info {
    flex: 1;
    padding: 10px;
    .coupon-name {
      font-size: 14px;
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
    }
    .coupon-condition {
      font-size: 12px;
      color: #999;
      margin-bottom: 2px;
    }
    .coupon-expire {
      font-size: 11px;
      color: #c0c4cc;
    }
  }
}
</style>
