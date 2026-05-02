<template>
  <div class="log-network">
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="networks.length" class="h5-list" style="padding-bottom: 80px">
      <div
        v-for="item in networks"
        :key="item.id"
        class="list-card"
        @click="navigateTo(`network-detail/${item.id}`)"
      >
        <div class="list-img">📍</div>
        <div class="list-info">
          <h4>{{ item.name || '网点' }}</h4>
          <div class="list-bottom">
            <span class="list-sales">{{ item.address || item.status || '' }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="h5-empty">
      <div class="empty-icon">📍</div>
      <div class="empty-text">暂无网点</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '网点列表', showBack: true, showTabbar: false });
const loading = ref(true);
const networks = ref([]);
onMounted(async () => {
  networks.value = await fetchList('courier');
  loading.value = false;
});
</script>
