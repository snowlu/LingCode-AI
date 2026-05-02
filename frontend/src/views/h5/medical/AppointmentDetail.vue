<template>
  <div class="med-appointment-detail">
    <div v-if="loading" class="h5-loading"><div class="skeleton-card"></div></div>
    <template v-else-if="appointment">
      <div class="status-bar" :style="{ background: themeColor }">
        <div class="status-icon">
          {{
            appointment.status === '已预约' ? '📋' : appointment.status === '已就诊' ? '✅' : '🏥'
          }}
        </div>
        <div class="status-text">{{ appointment.status }}</div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">预约信息</div>
        <div class="detail-row">
          <span class="label">患者</span
          ><span class="value">{{ appointment.name || appointment.patient }}</span>
        </div>
        <div class="detail-row">
          <span class="label">科室</span
          ><span class="value">{{ appointment.department || '内科' }}</span>
        </div>
        <div class="detail-row">
          <span class="label">挂号费</span><span class="value">¥{{ appointment.fee || 50 }}</span>
        </div>
        <div class="detail-row">
          <span class="label">预约时间</span
          ><span class="value">{{ appointment.date || appointment.createdAt }}</span>
        </div>
      </div>
      <div v-if="appointment.status === '已就诊'" class="detail-section">
        <div class="detail-section-title">就诊记录</div>
        <div class="detail-row">
          <span class="label">诊断</span
          ><span class="value">{{ appointment.diagnosis || '上呼吸道感染' }}</span>
        </div>
        <div class="detail-row">
          <span class="label">处方</span
          ><span
            class="value"
            :style="{ color: themeColor, cursor: 'pointer' }"
            @click="navigateTo(`prescription-detail/${appointment.id}`)"
            >查看处方 ›</span
          >
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, fetchDetail, setLayout, route } = useH5Page();
setLayout({ title: '预约详情', showBack: true, showTabbar: false });
const loading = ref(true);
const appointment = ref(null);
onMounted(async () => {
  appointment.value = await fetchDetail('registration', route.params.id);
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
