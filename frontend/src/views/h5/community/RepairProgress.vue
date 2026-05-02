<template>
  <div class="com-repair-progress">
    <div v-if="loading" class="h5-loading"><div class="skeleton-card"></div></div>
    <template v-else-if="repair">
      <div class="status-bar" :style="{ background: themeColor }">
        <div class="status-icon">
          {{ repair.status === '待处理' ? '⏳' : repair.status === '处理中' ? '🔧' : '✅' }}
        </div>
        <div class="status-text">{{ repair.status }}</div>
      </div>
      <div class="detail-section">
        <div class="detail-row">
          <span class="label">报修类型</span><span class="value">{{ repair.type }}</span>
        </div>
        <div class="detail-row">
          <span class="label">问题描述</span><span class="value">{{ repair.description }}</span>
        </div>
        <div class="detail-row">
          <span class="label">紧急程度</span><span class="value">{{ repair.urgency }}</span>
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">处理进度</div>
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
setLayout({ title: '报修进度', showBack: true, showTabbar: false });
const loading = ref(true);
const repair = ref(null);
const steps = ['提交报修', '物业派单', '维修处理', '报修完成'];
const currentStep = computed(() => {
  const s = repair.value?.status;
  if (s === '待处理') return 0;
  if (s === '已派单') return 1;
  if (s === '处理中') return 2;
  if (s === '已处理') return 3;
  return 0;
});
onMounted(async () => {
  repair.value = await fetchDetail('repairList', route.params.id);
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
