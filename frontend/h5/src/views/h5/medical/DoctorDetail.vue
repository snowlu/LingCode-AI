<template>
  <div class="med-doctor-detail">
    <div v-if="loading" class="h5-loading"><div class="skeleton-card"></div></div>
    <template v-else-if="doctor">
      <div
        class="doctor-header"
        :style="{
          background: `linear-gradient(135deg, ${themeColor}, ${adjustColor(themeColor, 30)})`,
        }"
      >
        <div class="doctor-avatar">👨‍⚕️</div>
        <div class="doctor-name">{{ doctor.name }}</div>
        <div class="doctor-title">
          {{ doctor.department || '' }} · {{ doctor.title || '主任医师' }}
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">医生简介</div>
        <div class="detail-desc">
          {{ doctor.description || '从医多年，临床经验丰富，擅长各类常见病、多发病的诊治。' }}
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">出诊时间</div>
        <div v-for="s in schedule" :key="s" class="schedule-item">
          <span>📅</span><span>{{ s }}</span>
        </div>
      </div>
      <div class="detail-actions">
        <button
          class="action-btn"
          :style="{ background: themeColor }"
          @click="navigateTo(`register-time/${doctor.id}`)"
        >
          立即挂号
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, adjustColor, navigateTo, fetchDetail, setLayout, route } = useH5Page();
setLayout({ title: '医生详情', showBack: true, showTabbar: false });
const loading = ref(true);
const doctor = ref(null);
const schedule = ['周一上午 8:00-12:00', '周三上午 8:00-12:00', '周四下午 14:00-17:00', '周五全天'];
onMounted(async () => {
  doctor.value = await fetchDetail('doctorSchedule', route.params.id);
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.doctor-header {
  text-align: center;
  padding: 24px;
  color: #fff;
  .doctor-avatar {
    font-size: 48px;
    margin-bottom: 8px;
  }
  .doctor-name {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  .doctor-title {
    font-size: 13px;
    opacity: 0.8;
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
  .detail-desc {
    font-size: 13px;
    color: #666;
    line-height: 1.6;
  }
}
.schedule-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #f5f5f5;
  font-size: 13px;
  color: #333;
}
.detail-actions {
  padding: 16px 12px 80px;
  .action-btn {
    width: 100%;
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
