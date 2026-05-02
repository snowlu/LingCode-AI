<template>
  <div class="med-my-appointments">
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="appointments.length" class="h5-list" style="padding-bottom: 80px">
      <div
        v-for="item in appointments"
        :key="item.id"
        class="list-card"
        @click="navigateTo(`appointment-detail/${item.id}`)"
      >
        <div class="list-img">🏥</div>
        <div class="list-info">
          <h4>{{ item.name || item.patient || '挂号' }}</h4>
          <div class="list-bottom">
            <span class="list-price" :style="{ color: themeColor }">¥{{ item.fee || 50 }}</span
            ><span class="list-sales">{{ item.status }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="h5-empty">
      <div class="empty-icon">🏥</div>
      <div class="empty-text">暂无预约</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '我的预约', showBack: false, showTabbar: true, activeTab: 'record' });
const loading = ref(true);
const appointments = ref([]);
onMounted(async () => {
  appointments.value = await fetchList('registration');
  loading.value = false;
});
</script>
