<template>
  <div class="log-network-detail">
    <div v-if="loading" class="h5-loading"><div class="skeleton-card"></div></div>
    <template v-else-if="network">
      <div class="detail-header" :style="{ background: themeColor }">
        <div class="detail-icon">📍</div>
        <div class="detail-name">{{ network.name || '网点' }}</div>
      </div>
      <div class="detail-section">
        <div class="detail-row">
          <span class="label">地址</span><span class="value">{{ network.address || '—' }}</span>
        </div>
        <div class="detail-row">
          <span class="label">营业时间</span><span class="value">08:00-20:00</span>
        </div>
        <div class="detail-row">
          <span class="label">联系电话</span><span class="value">400-000-0000</span>
        </div>
        <div class="detail-row">
          <span class="label">服务范围</span><span class="value">标准快递、特快专递</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, fetchDetail, setLayout, route } = useH5Page();
setLayout({ title: '网点详情', showBack: true, showTabbar: false });
const loading = ref(true);
const network = ref(null);
onMounted(async () => {
  network.value = await fetchDetail('courier', route.params.id);
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.detail-header {
  text-align: center;
  padding: 20px;
  color: #fff;
  .detail-icon {
    font-size: 36px;
    margin-bottom: 8px;
  }
  .detail-name {
    font-size: 16px;
    font-weight: 700;
  }
}
.detail-section {
  background: #fff;
  margin: 8px 12px;
  border-radius: 12px;
  padding: 12px;
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
