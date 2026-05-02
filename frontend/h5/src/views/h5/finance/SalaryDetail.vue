<template>
  <div class="fin-salary-detail">
    <div v-if="loading" class="h5-loading"><div class="skeleton-card"></div></div>
    <template v-else-if="salary">
      <div
        class="salary-header"
        :style="{
          background: `linear-gradient(135deg, ${themeColor}, ${adjustColor(themeColor, 30)})`,
        }"
      >
        <div class="salary-label">实发工资</div>
        <div class="salary-amount">¥{{ salary.actual || salary.amount || 0 }}</div>
        <div class="salary-month">{{ salary.month || '2026-04' }}</div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">收入明细</div>
        <div class="detail-row">
          <span class="label">基本工资</span
          ><span class="value">¥{{ salary.base || '18,000' }}</span>
        </div>
        <div class="detail-row">
          <span class="label">绩效奖金</span
          ><span class="value">¥{{ salary.bonus || '3,600' }}</span>
        </div>
        <div class="detail-row">
          <span class="label">补贴</span
          ><span class="value">¥{{ salary.allowance || '1,500' }}</span>
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">扣除明细</div>
        <div class="detail-row">
          <span class="label">社保</span><span class="value">-¥{{ salary.social || '2,100' }}</span>
        </div>
        <div class="detail-row">
          <span class="label">公积金</span><span class="value">-¥{{ salary.fund || '1,800' }}</span>
        </div>
        <div class="detail-row">
          <span class="label">个税</span><span class="value">-¥{{ salary.tax || '790' }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, adjustColor, fetchDetail, setLayout, route } = useH5Page();
setLayout({ title: '工资详情', showBack: true, showTabbar: false });
const loading = ref(true);
const salary = ref(null);
onMounted(async () => {
  salary.value = await fetchDetail('salaryCalc', route.params.id);
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.salary-header {
  text-align: center;
  padding: 24px;
  color: #fff;
  .salary-label {
    font-size: 13px;
    opacity: 0.8;
  }
  .salary-amount {
    font-size: 32px;
    font-weight: 700;
    margin: 4px 0;
  }
  .salary-month {
    font-size: 13px;
    opacity: 0.7;
  }
}
.detail-section {
  background: #fff;
  margin: 8px 12px;
  border-radius: 12px;
  padding: 12px;
  .detail-section-title {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }
  .detail-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    font-size: 13px;
    border-bottom: 1px solid #f5f5f5;
    &:last-child {
      border-bottom: none;
    }
    .label {
      color: #999;
    }
    .value {
      color: #333;
    }
  }
}
</style>
