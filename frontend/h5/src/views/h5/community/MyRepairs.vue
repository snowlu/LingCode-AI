<template>
  <div class="com-my-repairs">
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="repairs.length" class="h5-list" style="padding-bottom: 80px">
      <div
        v-for="item in repairs"
        :key="item.id"
        class="list-card"
        @click="navigateTo(`repair-progress/${item.id}`)"
      >
        <div class="list-img">🔧</div>
        <div class="list-info">
          <h4>{{ item.type || '报修' }} - {{ item.description?.slice(0, 15) || '' }}</h4>
          <div class="list-bottom">
            <span class="list-price" :style="{ color: themeColor }">{{ item.status }}</span
            ><span class="list-sales">{{ item.createdAt || '' }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="h5-empty">
      <div class="empty-icon">🔧</div>
      <div class="empty-text">暂无报修</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '我的报修', showBack: false, showTabbar: true, activeTab: 'personal' });
const loading = ref(true);
const repairs = ref([]);
onMounted(async () => {
  repairs.value = await fetchList('repairList');
  loading.value = false;
});
</script>
