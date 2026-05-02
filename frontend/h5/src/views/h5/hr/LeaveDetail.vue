<template>
  <div class="hr-leave-detail">
    <div v-if="loading" class="h5-loading"><div class="skeleton-card"></div></div>
    <template v-else-if="leave">
      <div class="status-bar" :style="{ background: themeColor }">
        <div class="status-icon">
          {{ leave.status === '待审批' ? '⏳' : leave.status === '已批准' ? '✅' : '❌' }}
        </div>
        <div class="status-text">{{ leave.status }}</div>
      </div>
      <div class="detail-section">
        <div class="detail-row">
          <span class="label">请假类型</span><span class="value">{{ leave.type }}</span>
        </div>
        <div class="detail-row">
          <span class="label">开始日期</span><span class="value">{{ leave.startDate }}</span>
        </div>
        <div class="detail-row">
          <span class="label">结束日期</span><span class="value">{{ leave.endDate }}</span>
        </div>
        <div class="detail-row">
          <span class="label">请假天数</span><span class="value">{{ leave.days }}天</span>
        </div>
        <div class="detail-row">
          <span class="label">请假原因</span><span class="value">{{ leave.reason }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, fetchDetail, setLayout, route } = useH5Page();
setLayout({ title: '请假详情', showBack: true, showTabbar: false });
const loading = ref(true);
const leave = ref(null);
onMounted(async () => {
  leave.value = await fetchDetail('leaveApproval', route.params.id);
  loading.value = false;
});
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
  .detail-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    font-size: 13px;
    border-bottom: 1px solid #f5f5f5;
    &:last-child {
      border-bottom: none;
    }
    .label {
      color: #999;
    }
    .value {
      color: #333;
    }
  }
}
</style>
