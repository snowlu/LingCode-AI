<template>
  <div class="com-notice-list">
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="notices.length" class="h5-list" style="padding-bottom: 80px">
      <div
        v-for="item in notices"
        :key="item.id"
        class="notice-card"
        @click="navigateTo(`notice-detail/${item.id}`)"
      >
        <div class="notice-badge" :style="{ background: themeColor }">
          {{ item.type || '公告' }}
        </div>
        <div class="notice-info">
          <h4>{{ item.title || item.name }}</h4>
          <span class="notice-date">{{ item.createdAt || '' }}</span>
        </div>
      </div>
    </div>
    <div v-else class="h5-empty">
      <div class="empty-icon">📢</div>
      <div class="empty-text">暂无公告</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '社区公告', showBack: false, showTabbar: true, activeTab: 'home' });
const loading = ref(true);
const notices = ref([]);
onMounted(async () => {
  notices.value = await fetchList('announcement');
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.notice-card {
  display: flex;
  gap: 10px;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  align-items: center;
  .notice-badge {
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 11px;
    color: #fff;
    flex-shrink: 0;
  }
  .notice-info {
    flex: 1;
    h4 {
      font-size: 13px;
      font-weight: 500;
      color: #333;
      margin: 0 0 4px;
    }
    .notice-date {
      font-size: 11px;
      color: #999;
    }
  }
}
</style>
