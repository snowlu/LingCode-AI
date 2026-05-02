<template>
  <div class="ecom-order-detail">
    <div v-if="loading" class="h5-loading"><div class="skeleton-card"></div></div>
    <template v-else-if="order">
      <div class="status-bar" :style="{ background: themeColor }">
        <div class="status-icon">{{ getStatusIcon(order.status) }}</div>
        <div class="status-text">{{ order.status }}</div>
      </div>
      <div class="detail-section">
        <div class="section-title">收货信息</div>
        <div class="detail-row">
          <span class="label">收货人</span><span class="value">{{ order.customer || '—' }}</span>
        </div>
        <div class="detail-row">
          <span class="label">手机号</span><span class="value">{{ order.phone || '—' }}</span>
        </div>
        <div class="detail-row">
          <span class="label">地址</span><span class="value">{{ order.address || '—' }}</span>
        </div>
      </div>
      <div class="detail-section">
        <div class="section-title">商品信息</div>
        <div class="product-row">
          <span class="product-icon">📦</span>
          <div class="product-info">
            <div class="product-name">{{ order.product || order.name }}</div>
          </div>
          <div class="product-price" :style="{ color: themeColor }">
            ¥{{ order.amount || order.price || 0 }}
          </div>
        </div>
      </div>
      <div class="detail-section">
        <div class="section-title">订单信息</div>
        <div class="detail-row">
          <span class="label">订单号</span
          ><span class="value">{{ order.orderNo || `ORD${order.id}` }}</span>
        </div>
        <div class="detail-row">
          <span class="label">下单时间</span><span class="value">{{ order.createdAt || '—' }}</span>
        </div>
        <div class="detail-row">
          <span class="label">备注</span><span class="value">{{ order.remark || '无' }}</span>
        </div>
      </div>
      <div class="detail-actions">
        <button
          v-if="order.status === '待支付'"
          class="action-btn"
          :style="{ background: themeColor }"
          @click="navigateTo(`pay/${order.id}`)"
        >
          去支付
        </button>
        <button
          v-if="order.status === '已支付'"
          class="action-btn"
          style="background: #f56c6c"
          @click="cancelOrder"
        >
          取消订单
        </button>
        <button
          v-if="order.status === '已发货'"
          class="action-btn"
          :style="{ background: themeColor }"
          @click="confirmReceive"
        >
          确认收货
        </button>
        <button
          v-if="order.status === '已完成'"
          class="action-btn"
          style="background: #e6a23c"
          @click="applyAfterSale"
        >
          申请售后
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useH5Page } from '../useH5Page';

const { themeColor, navigateTo, fetchDetail, updateData, setLayout, route } = useH5Page();
setLayout({ title: '订单详情', showBack: true, showTabbar: false });

const loading = ref(true);
const order = ref(null);

const getStatusIcon = status => {
  const map = { 待支付: '⏳', 已支付: '✅', 已发货: '🚚', 已完成: '🎉', 已取消: '❌' };
  return map[status] || '📋';
};

onMounted(async () => {
  order.value = await fetchDetail('orderList', route.params.id);
  loading.value = false;
});

const cancelOrder = async () => {
  await updateData('orderList', { id: order.value.id, status: '已取消' });
  order.value.status = '已取消';
  ElMessage.success('订单已取消');
};

const confirmReceive = async () => {
  await updateData('orderList', { id: order.value.id, status: '已完成' });
  order.value.status = '已完成';
  ElMessage.success('已确认收货');
};

const applyAfterSale = () => {
  ElMessage.success('售后申请已提交');
};
</script>

<style lang="scss" scoped>
.status-bar {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
  .status-icon {
    font-size: 28px;
  }
  .status-text {
    font-size: 16px;
    font-weight: 600;
  }
}
.detail-section {
  background: #fff;
  margin: 8px 12px;
  border-radius: 12px;
  padding: 12px;
  .section-title {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }
  .detail-row {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    font-size: 13px;
    .label {
      color: #999;
    }
    .value {
      color: #333;
    }
  }
}
.product-row {
  display: flex;
  align-items: center;
  gap: 10px;
  .product-icon {
    font-size: 28px;
  }
  .product-info {
    flex: 1;
    .product-name {
      font-size: 13px;
      color: #333;
    }
  }
  .product-price {
    font-size: 16px;
    font-weight: 700;
  }
}
.detail-actions {
  padding: 16px 12px 80px;
  display: flex;
  gap: 8px;
  .action-btn {
    flex: 1;
    height: 40px;
    border-radius: 20px;
    border: none;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
}
</style>
