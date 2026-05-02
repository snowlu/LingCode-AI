<template>
  <div class="res-member-center">
    <div
      class="member-header"
      :style="{
        background: `linear-gradient(135deg, ${themeColor}, ${adjustColor(themeColor, 30)})`,
      }"
    >
      <div class="member-avatar">👨</div>
      <div class="member-name">张先生</div>
      <div class="member-level">金卡会员</div>
    </div>
    <div class="points-card">
      <div class="points-label">当前积分</div>
      <div class="points-value" :style="{ color: themeColor }">5,600</div>
    </div>
    <div class="menu-list">
      <div class="menu-item" @click="navigateTo('points-detail')">
        <el-icon :color="themeColor"><Coin /></el-icon><span>积分明细</span
        ><el-icon class="menu-arrow"><ArrowRight /></el-icon>
      </div>
      <div class="menu-item" @click="navigateTo('coupon-list')">
        <el-icon :color="themeColor"><Ticket /></el-icon><span>优惠券</span
        ><el-badge :value="3" :max="99" /><el-icon class="menu-arrow"><ArrowRight /></el-icon>
      </div>
      <div class="menu-item" @click="navigateTo('consume-record')">
        <el-icon :color="themeColor"><List /></el-icon><span>消费记录</span
        ><el-icon class="menu-arrow"><ArrowRight /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Coin, Ticket, List, ArrowRight } from '@element-plus/icons-vue';
import { useH5Page } from '../useH5Page';
const { themeColor, adjustColor, navigateTo, setLayout } = useH5Page();
setLayout({ title: '会员中心', showBack: false, showTabbar: true, activeTab: 'member' });
</script>

<style lang="scss" scoped>
.member-header {
  text-align: center;
  padding: 24px;
  color: #fff;
  .member-avatar {
    font-size: 48px;
    margin-bottom: 8px;
  }
  .member-name {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  .member-level {
    font-size: 13px;
    opacity: 0.8;
  }
}
.points-card {
  background: #fff;
  margin: 8px 12px;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  .points-label {
    font-size: 13px;
    color: #999;
  }
  .points-value {
    font-size: 28px;
    font-weight: 700;
    margin-top: 4px;
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
