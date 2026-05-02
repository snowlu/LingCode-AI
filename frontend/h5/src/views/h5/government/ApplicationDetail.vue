<template>
  <div class="gov-application-detail">
    <div v-if="loading" class="h5-loading"><div class="skeleton-card"></div></div>
    <template v-else-if="application">
      <div class="status-bar" :style="{ background: themeColor }">
        <div class="status-icon">{{ getStatusIcon(application.status) }}</div>
        <div class="status-text">{{ application.status }}</div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">申请信息</div>
        <div class="detail-row">
          <span class="label">申请人</span><span class="value">{{ application.name }}</span>
        </div>
        <div class="detail-row">
          <span class="label">办理事项</span
          ><span class="value">{{ application.itemName || application.name }}</span>
        </div>
        <div class="detail-row">
          <span class="label">申请时间</span><span class="value">{{ application.createdAt }}</span>
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">流程进度</div>
        <div class="h5-timeline">
          <div v-for="(step, i) in flowSteps" :key="i" class="timeline-item">
            <div
              class="timeline-dot"
              :style="{ background: i <= currentStep ? themeColor : '#e5e6eb' }"
            ></div>
            <div v-if="i < flowSteps.length - 1" class="timeline-line"></div>
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
setLayout({ title: '办件进度', showBack: true, showTabbar: false });
const loading = ref(true);
const application = ref(null);
const flowSteps = ['提交申请', '窗口受理', '部门审批', '办结完成'];
const currentStep = computed(() => {
  const s = application.value?.status;
  if (s === '待审批') return 0;
  if (s === '受理中') return 1;
  if (s === '审批中') return 2;
  if (s === '已办结') return 3;
  return 0;
});
const getStatusIcon = s => ({ 待审批: '⏳', 受理中: '📋', 审批中: '✅', 已办结: '🎉' })[s] || '📋';
onMounted(async () => {
  application.value = await fetchDetail('pending', route.params.id);
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
</style>
