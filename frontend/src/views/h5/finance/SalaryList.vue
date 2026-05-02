<template>
  <div class="fin-salary-list">
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="salaries.length" class="h5-list" style="padding-bottom: 80px">
      <div
        v-for="item in salaries"
        :key="item.id"
        class="salary-item"
        @click="navigateTo(`salary-detail/${item.id}`)"
      >
        <div class="salary-month">{{ item.month || '2026-04' }}</div>
        <div class="salary-amount" :style="{ color: themeColor }">
          ¥{{ item.actual || item.amount || 0 }}
        </div>
        <div class="salary-status">{{ item.status || '已发放' }}</div>
      </div>
    </div>
    <div v-else class="h5-empty">
      <div class="empty-icon">💰</div>
      <div class="empty-text">暂无工资记录</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '工资条', showBack: true, showTabbar: false });
const loading = ref(true);
const salaries = ref([]);
onMounted(async () => {
  salaries.value = await fetchList('salaryCalc');
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.salary-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  .salary-month {
    flex: 1;
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }
  .salary-amount {
    font-size: 18px;
    font-weight: 700;
  }
  .salary-status {
    font-size: 12px;
    color: #67c23a;
  }
}
</style>
