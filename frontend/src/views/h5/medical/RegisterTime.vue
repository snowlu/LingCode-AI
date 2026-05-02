<template>
  <div class="med-register-time">
    <div class="date-section">
      <div class="section-title">选择日期</div>
      <div class="date-grid">
        <div
          v-for="(d, i) in dates"
          :key="i"
          :class="['date-item', { active: selectedDate === i }]"
          :style="
            selectedDate === i
              ? { background: themeColor, color: '#fff', borderColor: themeColor }
              : {}
          "
          @click="selectedDate = i"
        >
          <div class="date-week">{{ d.week }}</div>
          <div class="date-day">{{ d.day }}</div>
        </div>
      </div>
    </div>
    <div class="time-section">
      <div class="section-title">选择时段</div>
      <div class="time-grid">
        <div
          v-for="(t, i) in timeSlots"
          :key="i"
          :class="['time-item', { active: selectedTime === i, disabled: t.disabled }]"
          :style="
            selectedTime === i
              ? { background: themeColor, color: '#fff', borderColor: themeColor }
              : {}
          "
          @click="!t.disabled && (selectedTime = i)"
        >
          <div class="time-period">{{ t.period }}</div>
          <div class="time-range">{{ t.range }}</div>
          <div class="time-status">{{ t.disabled ? '已满' : '可约' }}</div>
        </div>
      </div>
    </div>
    <div class="form-actions" style="padding: 16px 12px 80px">
      <button
        class="submit-btn"
        :style="{ background: themeColor }"
        @click="navigateTo(`register-submit/${route.params.id}`)"
      >
        下一步
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, setLayout, route } = useH5Page();
setLayout({ title: '选择时段', showBack: true, showTabbar: false });
const selectedDate = ref(0);
const selectedTime = ref(0);
const dates = [
  { week: '周一', day: '5/2' },
  { week: '周二', day: '5/3' },
  { week: '周三', day: '5/4' },
  { week: '周四', day: '5/5' },
  { week: '周五', day: '5/6' },
  { week: '周六', day: '5/7' },
  { week: '周日', day: '5/8' },
];
const timeSlots = [
  { period: '上午', range: '8:00-10:00', disabled: false },
  { period: '上午', range: '10:00-12:00', disabled: false },
  { period: '下午', range: '14:00-16:00', disabled: true },
  { period: '下午', range: '16:00-17:30', disabled: false },
];
</script>

<style lang="scss" scoped>
.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  padding: 12px;
}
.date-grid {
  display: flex;
  gap: 6px;
  padding: 0 12px;
  overflow-x: auto;
  .date-item {
    flex-shrink: 0;
    width: 48px;
    padding: 8px 0;
    text-align: center;
    border: 1px solid #e5e6eb;
    border-radius: 8px;
    cursor: pointer;
    .date-week {
      font-size: 11px;
      color: #999;
    }
    .date-day {
      font-size: 13px;
      font-weight: 600;
      margin-top: 2px;
    }
    &.active .date-week {
      color: rgba(255, 255, 255, 0.8);
    }
  }
}
.time-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  padding: 0 12px;
  .time-item {
    padding: 12px;
    border: 1px solid #e5e6eb;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    .time-period {
      font-size: 14px;
      font-weight: 600;
      color: #333;
    }
    .time-range {
      font-size: 12px;
      color: #999;
      margin: 4px 0;
    }
    .time-status {
      font-size: 11px;
      color: #67c23a;
    }
    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      .time-status {
        color: #f56c6c;
      }
    }
    &.active {
      .time-period {
        color: #fff;
      }
      .time-range {
        color: #fff;
      }
      .time-status {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
}
</style>
