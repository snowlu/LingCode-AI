<template>
  <div class="edu-attendance">
    <div class="calendar-card">
      <div class="calendar-header">{{ currentMonth }}</div>
      <div class="calendar-grid">
        <div
          v-for="d in 31"
          :key="d"
          :class="['calendar-day', { attended: d <= attendedDays, today: d === today }]"
        >
          {{ d }}
        </div>
      </div>
      <div class="attendance-stats">
        本月出勤 <span :style="{ color: themeColor }">{{ attendedDays }}</span
        >/31天
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">考勤记录</div>
      <div v-for="r in records" :key="r.id" class="record-item">
        <span class="record-date">{{ r.date || r.createdAt }}</span>
        <span :class="['record-status', r.status === '正常' ? 'normal' : 'late']">{{
          r.status
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';

const { themeColor, fetchList, setLayout } = useH5Page();
setLayout({ title: '考勤记录', showBack: true, showTabbar: false });

const currentMonth = new Date().toISOString().slice(0, 7);
const today = new Date().getDate();
const attendedDays = ref(20);
const records = ref([]);

onMounted(async () => {
  records.value = await fetchList('studentList', { pageSize: 20 });
});
</script>

<style lang="scss" scoped>
.calendar-card {
  background: #fff;
  margin: 8px 12px;
  border-radius: 12px;
  padding: 12px;
  .calendar-header {
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 8px;
  }
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    margin-bottom: 8px;
    .calendar-day {
      text-align: center;
      padding: 6px 0;
      font-size: 12px;
      color: #999;
      border-radius: 50%;
      &.attended {
        color: #fff;
        background: var(--theme);
      }
      &.today {
        border: 2px solid var(--theme);
        color: var(--theme);
      }
    }
  }
  .attendance-stats {
    text-align: center;
    font-size: 13px;
    color: #666;
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
}
.record-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f5f5f5;
  font-size: 13px;
  .record-date {
    color: #333;
  }
  .record-status {
    &.normal {
      color: #67c23a;
    }
    &.late {
      color: #e6a23c;
    }
  }
}
</style>
