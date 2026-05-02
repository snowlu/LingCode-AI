<template>
  <div class="log-home">
    <div class="h5-search" @click="navigateTo('track')">
      <el-icon><Search /></el-icon><span>输入运单号查询</span>
    </div>
    <div class="h5-grid h5-grid-4">
      <div
        v-for="(cat, i) in categories"
        :key="i"
        class="grid-item grid-item-lg"
        @click="navigateTo(cat.route)"
      >
        <span class="grid-icon">{{ cat.icon }}</span
        ><span class="grid-label">{{ cat.name }}</span>
      </div>
    </div>
    <div class="h5-section"><span class="section-title">物流服务</span></div>
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else class="h5-list" style="padding-bottom: 80px">
      <div
        v-for="item in waybills"
        :key="item.id"
        class="list-card"
        @click="navigateTo(`track-detail/${item.id}`)"
      >
        <div class="list-img">📦</div>
        <div class="list-info">
          <h4>{{ item.name || item.waybillNo || '运单' }}</h4>
          <div class="list-bottom">
            <span class="list-price" :style="{ color: themeColor }">{{ item.status }}</span
            ><span class="list-sales">{{ item.createdAt || '' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '', showBack: false, showTabbar: true, activeTab: 'home' });
const loading = ref(true);
const waybills = ref([]);
const categories = [
  { name: '我要寄件', icon: '📦', route: 'send' },
  { name: '运单查询', icon: '🔍', route: 'track' },
  { name: '网点查询', icon: '📍', route: 'network' },
  { name: '运费估算', icon: '💰', route: 'home' },
];
onMounted(async () => {
  waybills.value = await fetchList('waybillList');
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.grid-item-lg .grid-icon {
  font-size: 28px;
}
</style>
