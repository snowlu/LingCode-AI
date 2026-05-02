<template>
  <div class="com-activity-list">
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="activities.length" class="h5-list" style="padding-bottom: 80px">
      <div
        v-for="item in activities"
        :key="item.id"
        class="list-card"
        @click="navigateTo(`activity-enroll/${item.id}`)"
      >
        <div class="list-img">🎉</div>
        <div class="list-info">
          <h4>{{ item.name || item.title || '社区活动' }}</h4>
          <div class="list-bottom">
            <span class="list-price" :style="{ color: themeColor }">{{
              item.status || '报名中'
            }}</span
            ><span class="list-sales">{{ item.date || item.createdAt || '' }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="h5-empty">
      <div class="empty-icon">🎉</div>
      <div class="empty-text">暂无活动</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '社区活动', showBack: false, showTabbar: true, activeTab: 'activity' });
const loading = ref(true);
const activities = ref([]);
onMounted(async () => {
  activities.value = await fetchList('publicFacility');
  loading.value = false;
});
</script>
