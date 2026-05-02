<template>
  <div class="gov-my-applications">
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="applications.length" class="h5-list" style="padding-bottom: 80px">
      <div
        v-for="app in applications"
        :key="app.id"
        class="list-card"
        @click="navigateTo(`application-detail/${app.id}`)"
      >
        <div class="list-img">📋</div>
        <div class="list-info">
          <h4>{{ app.itemName || app.name }}</h4>
          <div class="list-bottom">
            <span class="list-price" :style="{ color: themeColor }">{{ app.status }}</span
            ><span class="list-sales">{{ app.createdAt || '' }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="h5-empty">
      <div class="empty-icon">📋</div>
      <div class="empty-text">暂无办件</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '我的办件', showBack: true, showTabbar: false });
const loading = ref(true);
const applications = ref([]);
onMounted(async () => {
  applications.value = await fetchList('pending');
  loading.value = false;
});
</script>
