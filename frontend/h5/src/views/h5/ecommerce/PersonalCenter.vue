<template>
  <div class="ecom-personal">
    <div
      class="user-card"
      :style="{
        background: `linear-gradient(135deg, ${themeColor}, ${adjustColor(themeColor, 30)})`,
      }"
    >
      <span class="user-avatar">👨</span>
      <div>
        <h3>{{ userInfo.name }}</h3>
        <span class="user-level">{{ userInfo.level }}</span>
      </div>
    </div>
    <div class="order-shortcut">
      <div class="shortcut-item" @click="navigateTo('order-list')">
        <span class="shortcut-icon">⏳</span><span class="shortcut-label">待支付</span>
      </div>
      <div class="shortcut-item" @click="navigateTo('order-list')">
        <span class="shortcut-icon">📦</span><span class="shortcut-label">待发货</span>
      </div>
      <div class="shortcut-item" @click="navigateTo('order-list')">
        <span class="shortcut-icon">🚚</span><span class="shortcut-label">待收货</span>
      </div>
      <div class="shortcut-item" @click="navigateTo('order-list')">
        <span class="shortcut-icon">⭐</span><span class="shortcut-label">待评价</span>
      </div>
    </div>
    <div class="menu-list">
      <div class="menu-item" @click="navigateTo('order-list')">
        <el-icon :color="themeColor"><List /></el-icon><span>我的订单</span
        ><el-badge :value="orderCount" :max="99" /><el-icon class="menu-arrow"><ArrowRight /></el-icon>
      </div>
      <div class="menu-item" @click="navigateTo('address')">
        <el-icon :color="themeColor"><Location /></el-icon><span>收货地址</span
        ><el-badge :value="addressCount" :max="99" /><el-icon class="menu-arrow"><ArrowRight /></el-icon>
      </div>
      <div class="menu-item" @click="navigateTo('favorites')">
        <el-icon :color="themeColor"><Star /></el-icon><span>我的收藏</span
        ><el-badge :value="favoriteCount" :max="99" /><el-icon class="menu-arrow"><ArrowRight /></el-icon>
      </div>
      <div class="menu-item" @click="navigateTo('settings')">
        <el-icon :color="themeColor"><Setting /></el-icon><span>账户设置</span
        ><el-icon class="menu-arrow"><ArrowRight /></el-icon>
      </div>
    </div>
    <div class="h5-section"><span class="section-title">最近订单</span></div>
    <div v-if="recentOrders.length" class="h5-list" style="padding-bottom: 80px">
      <div
        v-for="order in recentOrders"
        :key="order.id"
        class="order-item"
        @click="navigateTo(`order-detail/${order.id}`)"
      >
        <div class="order-top">
          <span class="order-product">{{ order.product || order.name }}</span
          ><el-tag :type="getStatusType(order.status)" size="small">{{ order.status }}</el-tag>
        </div>
        <div class="order-bottom">
          <span class="order-id">{{ order.orderNo || `ORD${order.id}` }}</span
          ><span class="order-amount" :style="{ color: themeColor }"
            >¥{{ order.amount || order.price || 0 }}</span
          >
        </div>
      </div>
    </div>
    <div v-else class="h5-empty">
      <div class="empty-icon">📭</div>
      <div class="empty-text">暂无订单</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { List, Location, Star, Setting, ArrowRight } from '@element-plus/icons-vue';
import { useH5Page } from '../useH5Page';

const { themeColor, adjustColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '', showBack: false, showTabbar: true, activeTab: 'personal' });

const userInfo = ref({ name: '用户', level: '普通会员' });
const recentOrders = ref([]);
const orderCount = ref(0);
const addressCount = ref(0);
const favoriteCount = ref(0);

const getStatusType = status => {
  if (['已完成', '已签收'].some(k => status?.includes(k))) return 'success';
  if (['已支付', '已发货', '运输中'].some(k => status?.includes(k))) return 'warning';
  if (['已取消'].some(k => status?.includes(k))) return 'danger';
  return 'info';
};

onMounted(async () => {
  const [members, orders, addresses, favorites] = await Promise.all([
    fetchList('memberList', { pageSize: 1 }),
    fetchList('orderList', { pageSize: 5 }),
    fetchList('address', { pageSize: 1 }),
    fetchList('favorites', { pageSize: 1 }),
  ]);
  if (members.length) {
    userInfo.value = { name: members[0].username || members[0].name || '用户', level: members[0].role || members[0].level || '普通会员' };
  }
  recentOrders.value = orders;
  const allOrders = await fetchList('orderList', { pageSize: 50 });
  orderCount.value = allOrders.length;
  const allAddresses = await fetchList('address', { pageSize: 50 });
  addressCount.value = allAddresses.length;
  const allFavorites = await fetchList('favorites', { pageSize: 50 });
  favoriteCount.value = allFavorites.length;
});
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
.order-shortcut {
  display: flex;
  background: #fff;
  margin: 0 12px 8px;
  border-radius: 12px;
  padding: 12px 0;
  .shortcut-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    .shortcut-icon {
      font-size: 20px;
    }
    .shortcut-label {
      font-size: 11px;
      color: #666;
    }
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
.order-item {
  background: #fff;
  border-radius: 12px;
  padding: 10px 12px;
  margin-bottom: 6px;
  cursor: pointer;
  .order-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
    .order-product {
      font-size: 13px;
      font-weight: 500;
      color: #333;
    }
  }
  .order-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .order-id {
      font-size: 11px;
      color: #999;
    }
    .order-amount {
      font-size: 14px;
      font-weight: 600;
    }
  }
}
</style>
