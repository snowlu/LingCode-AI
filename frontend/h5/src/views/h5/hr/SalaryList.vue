<template>
  <div class="hr-salary-list">
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="salaryList.length" class="salary-list">
      <div
        v-for="item in salaryList"
        :key="item.id"
        class="salary-card"
      >
        <div class="salary-header">
          <span class="salary-month">{{ item.month || '本月' }}</span>
          <span class="salary-amount" :style="{ color: themeColor }">¥{{ item.total || 0 }}</span>
        </div>
        <div class="salary-detail-row">
          <span>基本工资</span><span>¥{{ item.base || 0 }}</span>
        </div>
        <div class="salary-detail-row">
          <span>奖金</span><span>¥{{ item.bonus || 0 }}</span>
        </div>
        <div class="salary-detail-row">
          <span>扣款</span><span>¥{{ item.deduction || 0 }}</span>
        </div>
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

const { themeColor, fetchList, setLayout } = useH5Page();
setLayout({ title: '工资查询', showBack: true, showTabbar: false });

const loading = ref(true);
const salaryList = ref([]);

onMounted(async () => {
  salaryList.value = await fetchList('salaryList', { pageSize: 12 });
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.salary-list {
  padding: 8px 12px 80px;
}
.salary-card {
  background: #fff;
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 8px;
  .salary-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid #f5f5f5;
    .salary-month { font-size: 14px; font-weight: 600; color: #333; }
    .salary-amount { font-size: 20px; font-weight: 700; }
  }
  .salary-detail-row {
    display: flex;
    justify-content: space-between;
    padding: 4px 0;
    font-size: 12px;
    color: #666;
  }
}
</style>
