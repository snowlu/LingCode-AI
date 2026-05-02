<template>
  <div class="fin-home">
    <div class="h5-grid h5-grid-4">
      <div v-for="(cat, i) in categories" :key="i" class="grid-item grid-item-lg" @click="navigateTo(cat.route)">
        <span class="grid-icon">{{ cat.icon }}</span><span class="grid-label">{{ cat.name }}</span>
      </div>
    </div>
    <div class="salary-card" :style="{ background: `linear-gradient(135deg, ${themeColor}, ${adjustColor(themeColor, 30)})` }" @click="navigateTo('salary-list')">
      <div class="salary-label">本月实发</div>
      <div class="salary-amount">¥{{ latestSalary.amount || '0' }}</div>
      <div class="salary-date">{{ latestSalary.month || '暂无' }}</div>
    </div>
    <div class="h5-section"><span class="section-title">报销记录</span></div>
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="records.length" class="h5-list" style="padding-bottom: 80px">
      <div v-for="item in records" :key="item.id" class="list-card" @click="navigateTo(`reimburse-detail/${item.id}`)">
        <div class="list-img">🧾</div>
        <div class="list-info">
          <h4>{{ item.applicant || item.name }} - {{ item.type || '' }}</h4>
          <div class="list-bottom">
            <span class="list-price" :style="{ color: themeColor }">¥{{ item.amount || 0 }}</span
            ><span class="list-sales">{{ item.status }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="h5-empty" style="padding-bottom: 80px">
      <div class="empty-icon">🧾</div>
      <div class="empty-text">暂无报销</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';

const { themeColor, adjustColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '', showBack: false, showTabbar: true, activeTab: 'home' });

const loading = ref(true);
const records = ref([]);
const latestSalary = ref({ amount: '0', month: '暂无' });
const categories = [
  { name: '报销申请', icon: '🧾', route: 'reimburse-apply' },
  { name: '工资查询', icon: '💰', route: 'salary-list' },
  { name: '发票管理', icon: '📄', route: 'invoice' },
  { name: '我的报销', icon: '📋', route: 'my-reimburse' },
];

onMounted(async () => {
  records.value = await fetchList('reimburse', { pageSize: 5 });
  const salaries = await fetchList('salaryList', { pageSize: 1 });
  if (salaries.length) {
    latestSalary.value = { amount: salaries[0].total || '0', month: salaries[0].month || '暂无' };
  }
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.grid-item-lg .grid-icon { font-size: 28px; }
.salary-card {
  margin: 0 12px 8px;
  border-radius: 12px;
  padding: 16px;
  color: #fff;
  cursor: pointer;
  .salary-label { font-size: 12px; opacity: 0.8; }
  .salary-amount { font-size: 28px; font-weight: 700; margin: 4px 0; }
  .salary-date { font-size: 12px; opacity: 0.7; }
}
</style>
