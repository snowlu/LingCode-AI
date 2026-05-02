<template>
  <div class="log-track-detail">
    <div v-if="loading" class="h5-loading"><div class="skeleton-card"></div></div>
    <template v-else-if="waybill">
      <div class="status-bar" :style="{ background: themeColor }">
        <div class="status-icon">📦</div>
        <div class="status-text">{{ waybill.status }}</div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">运单信息</div>
        <div class="detail-row">
          <span class="label">运单号</span
          ><span class="value">{{ waybill.name || waybill.waybillNo || waybill.id }}</span>
        </div>
        <div class="detail-row">
          <span class="label">状态</span><span class="value">{{ waybill.status }}</span>
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">物流轨迹</div>
        <div class="h5-timeline">
          <div v-for="(step, i) in timeline" :key="i" class="timeline-item">
            <div
              class="timeline-dot"
              :style="{ background: i === 0 ? themeColor : '#e5e6eb' }"
            ></div>
            <div v-if="i < timeline.length - 1" class="timeline-line"></div>
            <div class="timeline-content">
              <div class="timeline-title">{{ step.title }}</div>
              <div class="timeline-desc">{{ step.desc }}</div>
              <div class="timeline-time">{{ step.time }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, fetchDetail, setLayout, route } = useH5Page();
setLayout({ title: '运单轨迹', showBack: true, showTabbar: false });
const loading = ref(true);
const waybill = ref(null);
const timeline = [
  { title: '已签收', desc: '您的包裹已由本人签收', time: '2026-05-01 14:30' },
  { title: '派送中', desc: '快递员正在派送', time: '2026-05-01 08:00' },
  { title: '到达目的城市', desc: '包裹已到达北京分拨中心', time: '2026-04-30 22:00' },
  { title: '运输中', desc: '包裹正在运输途中', time: '2026-04-30 06:00' },
  { title: '已揽收', desc: '快递员已揽收包裹', time: '2026-04-29 16:00' },
];
onMounted(async () => {
  waybill.value = await fetchDetail('waybillList', route.params.id);
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
