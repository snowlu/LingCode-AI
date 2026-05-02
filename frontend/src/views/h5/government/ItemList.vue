<template>
  <div class="gov-item-list">
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="items.length" class="h5-list" style="padding-bottom: 80px">
      <div
        v-for="item in items"
        :key="item.id"
        class="list-card"
        @click="navigateTo(`item-detail/${item.id}`)"
      >
        <div class="list-img">📋</div>
        <div class="list-info">
          <h4>{{ item.name }}</h4>
          <div class="list-bottom">
            <span class="list-price" :style="{ color: themeColor }">{{ item.fee || '免费' }}</span
            ><span class="list-sales">{{ item.department || '' }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="h5-empty">
      <div class="empty-icon">📋</div>
      <div class="empty-text">暂无事项</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '事项列表', showBack: true, showTabbar: true, activeTab: 'service' });
const loading = ref(true);
const items = ref([]);
onMounted(async () => {
  items.value = await fetchList('itemList');
  loading.value = false;
});
</script>
