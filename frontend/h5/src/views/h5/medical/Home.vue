<template>
  <div class="med-home">
    <div class="h5-grid h5-grid-5">
      <div v-for="cat in displayDepts" :key="cat.id || cat.name" class="grid-item" @click="navigateTo(`doctor-list?department=${cat.name}`)">
        <span class="grid-icon">{{ cat.icon }}</span><span class="grid-label">{{ cat.name }}</span>
      </div>
    </div>
    <div class="h5-section"><span class="section-title">热门医生</span></div>
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else class="h5-list" style="padding-bottom: 80px">
      <div v-for="item in doctors" :key="item.id" class="doctor-card" @click="navigateTo(`doctor-detail/${item.id}`)">
        <div class="doctor-avatar">👨‍⚕️</div>
        <div class="doctor-info">
          <h4>{{ item.name }}</h4>
          <div class="doctor-meta"><span>{{ item.department || '' }}</span><span>{{ item.title || '' }}</span></div>
          <div class="doctor-bottom">
            <span class="doctor-fee" :style="{ color: themeColor }">¥{{ item.fee || item.price || '50' }}起</span
            ><span class="doctor-rating">⭐ {{ item.rating || '4.8' }}</span>
          </div>
        </div>
        <button class="register-btn" :style="{ background: themeColor }" @click.stop="navigateTo(`register-time/${item.id}`)">挂号</button>
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
const defaultDeptIcons = ['🫀', '🦴', '👶', '👩‍⚕️', '👁️', '🦷', '🌿', '🧴', '🦵', '🧠'];
const displayDepts = ref([]);

onMounted(async () => {
  const depts = await fetchList('department');
  if (depts.length) {
    displayDepts.value = depts.slice(0, 10).map((d, i) => ({ ...d, icon: d.icon || defaultDeptIcons[i] || '🏥' }));
  } else {
    displayDepts.value = [
      { name: '内科', icon: '🫀' }, { name: '外科', icon: '🦴' },
      { name: '儿科', icon: '👶' }, { name: '妇科', icon: '👩‍⚕️' },
      { name: '眼科', icon: '👁️' }, { name: '口腔科', icon: '🦷' },
      { name: '中医科', icon: '🌿' }, { name: '皮肤科', icon: '🧴' },
      { name: '骨科', icon: '🦵' }, { name: '神经科', icon: '🧠' },
    ];
  }
  doctors.value = await fetchList('doctorSchedule');
  loading.value = false;
});
</script>
