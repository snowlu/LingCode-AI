<template>
  <div class="med-prescription-detail">
    <div v-if="loading" class="h5-loading"><div class="skeleton-card"></div></div>
    <template v-else-if="prescription">
      <div class="prescription-header" :style="{ background: themeColor }">
        <div class="prescription-icon">💊</div>
        <div class="prescription-title">电子处方</div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">处方信息</div>
        <div class="detail-row">
          <span class="label">处方号</span
          ><span class="value">{{ prescription.orderNo || `RX${prescription.id}` }}</span>
        </div>
        <div class="detail-row">
          <span class="label">患者</span
          ><span class="value">{{ prescription.patient || prescription.name }}</span>
        </div>
        <div class="detail-row">
          <span class="label">医生</span><span class="value">{{ prescription.doctor || '' }}</span>
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">药品列表</div>
        <div v-for="drug in drugs" :key="drug" class="drug-item">
          <span class="drug-icon">💊</span><span class="drug-name">{{ drug }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, fetchDetail, setLayout, route } = useH5Page();
setLayout({ title: '处方详情', showBack: true, showTabbar: false });
const loading = ref(true);
const prescription = ref(null);
const drugs = ['阿莫西林胶囊 0.5g*24', '止咳糖浆 120ml', '布洛芬片 0.2g*20'];
onMounted(async () => {
  prescription.value = await fetchDetail('prescription', route.params.id);
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.prescription-header {
  text-align: center;
  padding: 20px;
  color: #fff;
  .prescription-icon {
    font-size: 36px;
    margin-bottom: 8px;
  }
  .prescription-title {
    font-size: 16px;
    font-weight: 600;
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
    padding: 6px 0;
    font-size: 13px;
    .label {
      color: #999;
    }
    .value {
      color: #333;
    }
  }
}
.drug-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #f5f5f5;
  .drug-icon {
    font-size: 18px;
  }
  .drug-name {
    font-size: 13px;
    color: #333;
  }
}
</style>
