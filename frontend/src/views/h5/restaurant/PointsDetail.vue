<template>
  <div class="res-points-detail">
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 4" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else class="points-list">
      <div v-for="item in records" :key="item.id" class="points-item">
        <div class="points-info">
          <div class="points-desc">{{ item.name || item.product || '消费' }}</div>
          <div class="points-date">{{ item.createdAt || '' }}</div>
        </div>
        <div
          :class="['points-amount', { plus: item.change > 0 }]"
          :style="{ color: item.change > 0 ? '#67c23a' : '#f56c6c' }"
        >
          {{ item.change > 0 ? '+' : '' }}{{ item.change || item.points || 0 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { fetchList, setLayout } = useH5Page();
setLayout({ title: '积分明细', showBack: true, showTabbar: false });
const loading = ref(true);
const records = ref([]);
onMounted(async () => {
  records.value = await fetchList('memberList');
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.points-list {
  padding: 8px 12px;
}
.points-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 8px;
  .points-info {
    .points-desc {
      font-size: 13px;
      color: #333;
    }
    .points-date {
      font-size: 11px;
      color: #999;
      margin-top: 2px;
    }
  }
  .points-amount {
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
