<template>
  <div class="med-home">
    <div class="h5-grid h5-grid-5">
      <div
        v-for="(cat, i) in departments"
        :key="i"
        class="grid-item"
        @click="navigateTo('department-list')"
      >
        <span class="grid-icon">{{ cat.icon }}</span
        ><span class="grid-label">{{ cat.name }}</span>
      </div>
    </div>
    <div class="h5-section"><span class="section-title">热门医生</span></div>
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else class="h5-list" style="padding-bottom: 80px">
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
            <span>{{ item.department || '' }}</span
            ><span>{{ item.title || '' }}</span>
          </div>
          <div class="doctor-bottom">
            <span class="doctor-fee" :style="{ color: themeColor }"
              >¥{{ item.fee || item.price || '50' }}起</span
            ><span class="doctor-rating">⭐ {{ item.rating || '4.8' }}</span>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '', showBack: false, showTabbar: true, activeTab: 'home' });
const loading = ref(true);
const doctors = ref([]);
const departments = [
  { name: '内科', icon: '🫀' },
  { name: '外科', icon: '🦴' },
  { name: '儿科', icon: '👶' },
  { name: '妇科', icon: '👩‍⚕️' },
  { name: '眼科', icon: '👁️' },
  { name: '口腔科', icon: '🦷' },
  { name: '中医科', icon: '🌿' },
  { name: '皮肤科', icon: '🧴' },
  { name: '骨科', icon: '🦴' },
  { name: '神经科', icon: '🧠' },
];
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
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  align-items: center;
  &:active {
    background: #fafafa;
  }
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
      span {
        margin-right: 8px;
      }
    }
    .doctor-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .doctor-fee {
      font-size: 15px;
      font-weight: 700;
    }
    .doctor-rating {
      font-size: 12px;
      color: #999;
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
