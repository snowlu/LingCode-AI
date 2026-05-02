<template>
  <div class="fin-reimburse-detail">
    <div v-if="loading" class="h5-loading"><div class="skeleton-card"></div></div>
    <template v-else-if="item">
      <div class="status-bar" :style="{ background: themeColor }">
        <div class="status-icon">
          {{ item.status === '待审批' ? '⏳' : item.status === '已审批' ? '✅' : '📋' }}
        </div>
        <div class="status-text">{{ item.status }}</div>
      </div>
      <div class="detail-section">
        <div class="detail-row">
          <span class="label">申请人</span
          ><span class="value">{{ item.applicant || item.name }}</span>
        </div>
        <div class="detail-row">
          <span class="label">报销类型</span><span class="value">{{ item.type }}</span>
        </div>
        <div class="detail-row">
          <span class="label">报销金额</span
          ><span class="value" :style="{ color: themeColor }">¥{{ item.amount }}</span>
        </div>
        <div class="detail-row">
          <span class="label">说明</span
          ><span class="value">{{ item.description || item.remark || '' }}</span>
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">审批流程</div>
        <div class="h5-timeline">
          <div v-for="(step, i) in steps" :key="i" class="timeline-item">
            <div
              class="timeline-dot"
              :style="{ background: i <= currentStep ? themeColor : '#e5e6eb' }"
            ></div>
            <div v-if="i < steps.length - 1" class="timeline-line"></div>
            <div class="timeline-content">
              <div class="timeline-title">{{ step }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, fetchDetail, setLayout, route } = useH5Page();
setLayout({ title: '报销详情', showBack: true, showTabbar: false });
const loading = ref(true);
const item = ref(null);
const steps = ['提交报销', '主管审批', '财务审批', '到账通知'];
const currentStep = computed(() => {
  const s = item.value?.status;
  if (s === '待审批') return 0;
  if (s === '主管通过') return 1;
  if (s === '财务通过') return 2;
  if (s === '已到账') return 3;
  return 0;
});
onMounted(async () => {
  item.value = await fetchDetail('reimburse', route.params.id);
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
  .detail-section-title {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }
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
