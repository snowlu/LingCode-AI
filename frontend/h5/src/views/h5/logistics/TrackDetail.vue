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
        <div v-if="waybill.sender" class="detail-row">
          <span class="label">寄件人</span><span class="value">{{ waybill.sender }}</span>
        </div>
        <div v-if="waybill.receiver" class="detail-row">
          <span class="label">收件人</span><span class="value">{{ waybill.receiver }}</span>
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">物流轨迹</div>
        <div class="h5-timeline">
          <div v-for="(step, i) in timeline" :key="i" class="timeline-item">
            <div class="timeline-dot" :style="{ background: i === 0 ? themeColor : '#e5e6eb' }"></div>
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
    <div v-else class="h5-empty">
      <div class="empty-icon">📦</div>
      <div class="empty-text">运单不存在</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';

const { themeColor, fetchDetail, setLayout, route } = useH5Page();
setLayout({ title: '运单轨迹', showBack: true, showTabbar: false });

const loading = ref(true);
const waybill = ref(null);

const statusOrder = ['已揽收', '运输中', '到达目的城市', '派送中', '已签收'];

const timeline = computed(() => {
  if (!waybill.value) return [];
  const status = waybill.value.status;
  const idx = statusOrder.indexOf(status);
  const steps = [];
  const tracks = waybill.value.tracks || [];
  for (let i = 0; i < statusOrder.length; i++) {
    const active = idx >= 0 && i <= idx;
    const track = tracks.find(t => t.status === statusOrder[i]);
    steps.push({
      title: statusOrder[i],
      desc: track?.desc || (active ? (statusOrder[i] === status ? '当前状态' : '已完成') : '等待中'),
      time: track?.time || (active ? waybill.value.createdAt || '' : ''),
      active,
    });
  }
  return steps.filter(s => s.active || s.time);
});

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
  .status-icon { font-size: 28px; }
  .status-text { font-size: 16px; font-weight: 600; }
}
.detail-section {
  background: #fff;
  margin: 8px 12px;
  border-radius: 12px;
  padding: 12px;
  .detail-section-title { font-size: 14px; font-weight: 600; color: #333; margin-bottom: 8px; }
  .detail-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px;
    .label { color: #999; }
    .value { color: #333; }
  }
}
</style>
