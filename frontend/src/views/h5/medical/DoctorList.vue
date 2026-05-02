<template>
  <div class="med-doctor-list">
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="doctors.length" class="h5-list" style="padding-bottom: 80px">
      <div
        v-for="item in doctors"
        :key="item.id"
        class="doctor-card"
        @click="navigateTo(`doctor-detail/${item.id}`)"
      >
        <div class="doctor-avatar">👨‍⚕️</div>
        <div class="doctor-info">
          <h4>{{ item.name }}</h4>
          <div class="doctor-meta">
            <span>{{ item.department || '' }}</span>
          </div>
          <div class="doctor-bottom">
            <span class="doctor-fee" :style="{ color: themeColor }"
              >¥{{ item.fee || item.price || '50' }}</span
            >
          </div>
        </div>
        <button
          class="register-btn"
          :style="{ background: themeColor }"
          @click.stop="navigateTo(`register-time/${item.id}`)"
        >
          挂号
        </button>
      </div>
    </div>
    <div v-else class="h5-empty">
      <div class="empty-icon">👨‍⚕️</div>
      <div class="empty-text">暂无医生</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '医生列表', showBack: true, showTabbar: false });
const loading = ref(true);
const doctors = ref([]);
onMounted(async () => {
  doctors.value = await fetchList('doctorSchedule');
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.doctor-card {
  display: flex;
  gap: 10px;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  align-items: center;
  .doctor-avatar {
    width: 48px;
    height: 48px;
    background: #f5f7fa;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    flex-shrink: 0;
  }
  .doctor-info {
    flex: 1;
    h4 {
      font-size: 14px;
      font-weight: 600;
      color: #333;
      margin: 0 0 4px;
    }
    .doctor-meta {
      font-size: 11px;
      color: #999;
      margin-bottom: 4px;
    }
    .doctor-bottom {
      .doctor-fee {
        font-size: 15px;
        font-weight: 700;
      }
    }
  }
  .register-btn {
    padding: 6px 14px;
    border-radius: 16px;
    border: none;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
  }
}
</style>
