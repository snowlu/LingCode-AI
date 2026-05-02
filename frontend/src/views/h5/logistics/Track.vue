<template>
  <div class="log-track">
    <div class="search-card">
      <el-input
        v-model="waybillNo"
        placeholder="请输入运单号"
        size="large"
        @keyup.enter="handleSearch"
      />
      <button class="search-btn" :style="{ background: themeColor }" @click="handleSearch">
        查询
      </button>
    </div>
    <div v-if="loading" class="h5-loading"><div class="skeleton-card"></div></div>
    <div v-else-if="results.length" class="h5-list" style="padding-bottom: 80px">
      <div
        v-for="item in results"
        :key="item.id"
        class="list-card"
        @click="navigateTo(`track-detail/${item.id}`)"
      >
        <div class="list-img">📦</div>
        <div class="list-info">
          <h4>{{ item.name || item.waybillNo || '运单' }}</h4>
          <div class="list-bottom">
            <span class="list-price" :style="{ color: themeColor }">{{ item.status }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="searched" class="h5-empty">
      <div class="empty-icon">📦</div>
      <div class="empty-text">未找到运单</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '运单查询', showBack: false, showTabbar: true, activeTab: 'track' });
const waybillNo = ref('');
const results = ref([]);
const loading = ref(false);
const searched = ref(false);
const handleSearch = async () => {
  if (!waybillNo.value) return;
  loading.value = true;
  searched.value = true;
  results.value = await fetchList('tracking', { keywords: waybillNo.value });
  loading.value = false;
};
</script>

<style lang="scss" scoped>
.search-card {
  display: flex;
  gap: 8px;
  padding: 12px;
  background: #fff;
  margin-bottom: 8px;
  .search-btn {
    padding: 0 20px;
    border-radius: 8px;
    border: none;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    flex-shrink: 0;
  }
}
</style>
