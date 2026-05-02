<template>
  <div class="ecom-order-list">
    <div class="tab-bar">
      <div
        v-for="t in tabs"
        :key="t.key"
        :class="['tab-item', { active: activeTab === t.key }]"
        :style="activeTab === t.key ? { color: themeColor, borderBottomColor: themeColor } : {}"
        @click="activeTab = t.key"
      >
        {{ t.label }}
      </div>
    </div>
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="filteredOrders.length" class="h5-list">
      <div
        v-for="order in filteredOrders"
        :key="order.id"
        class="order-card"
        @click="navigateTo(`order-detail/${order.id}`)"
      >
        <div class="order-top">
          <span class="order-no">{{ order.orderNo || `ORD${order.id}` }}</span>
          <el-tag :type="getStatusType(order.status)" size="small">{{ order.status }}</el-tag>
        </div>
        <div class="order-body">
          <span class="order-icon">📦</span>
          <div class="order-info">
            <div class="order-product">{{ order.product || order.name }}</div>
            <div class="order-date">{{ order.createdAt || '' }}</div>
          </div>
          <div class="order-amount" :style="{ color: themeColor }">
            ¥{{ order.amount || order.price || 0 }}
          </div>
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
import { ref, computed, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';

const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '我的订单', showBack: true, showTabbar: false });

const loading = ref(true);
const orders = ref([]);
const activeTab = ref('all');
const tabs = [
  { key: 'all', label: '全部' },
  { key: '待支付', label: '待支付' },
  { key: '已支付', label: '已支付' },
  { key: '已发货', label: '已发货' },
  { key: '已完成', label: '已完成' },
];

const filteredOrders = computed(() => {
  if (activeTab.value === 'all') return orders.value;
  return orders.value.filter(o => o.status === activeTab.value);
});

const getStatusType = status => {
  if (['已完成', '已签收', '已退款'].some(k => status?.includes(k))) return 'success';
  if (['已支付', '已发货', '运输中'].some(k => status?.includes(k))) return 'warning';
  if (['已取消'].some(k => status?.includes(k))) return 'danger';
  return 'info';
};

onMounted(async () => {
  orders.value = await fetchList('orderList', { pageSize: 50 });
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.tab-bar {
  display: flex;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  .tab-item {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    font-size: 13px;
    color: #666;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    &.active {
      font-weight: 600;
    }
  }
}
.order-card {
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  .order-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    .order-no {
      font-size: 11px;
      color: #999;
    }
  }
  .order-body {
    display: flex;
    align-items: center;
    gap: 10px;
    .order-icon {
      font-size: 28px;
    }
    .order-info {
      flex: 1;
      .order-product {
        font-size: 13px;
        font-weight: 500;
        color: #333;
      }
      .order-date {
        font-size: 11px;
        color: #999;
        margin-top: 2px;
      }
    }
    .order-amount {
      font-size: 16px;
      font-weight: 700;
    }
  }
}
</style>
