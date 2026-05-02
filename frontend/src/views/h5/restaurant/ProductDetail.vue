<template>
  <div class="res-product-detail">
    <div v-if="loading" class="h5-loading">
      <div class="skeleton-banner"></div>
      <div class="skeleton-card"></div>
    </div>
    <template v-else-if="product">
      <div class="detail-gallery">{{ product.img || '🍽️' }}</div>
      <div class="detail-info-card">
        <div class="detail-price" :style="{ color: themeColor }">¥{{ product.price }}</div>
        <div class="detail-name">{{ product.name }}</div>
        <div class="detail-meta">
          <span>销量 {{ product.sales || 0 }}</span>
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">菜品详情</div>
        <div class="detail-desc">
          {{ product.description || '精选食材，现炒现做，搭配米饭和时蔬。' }}
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, fetchDetail, setLayout, route } = useH5Page();
setLayout({ title: '商品详情', showBack: true, showTabbar: false });
const loading = ref(true);
const product = ref(null);
onMounted(async () => {
  product.value = await fetchDetail('dishes', route.params.id);
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.detail-gallery {
  background: #fff;
  text-align: center;
  padding: 32px;
  font-size: 80px;
}
.detail-info-card {
  background: #fff;
  margin: 8px 12px;
  border-radius: 12px;
  padding: 12px;
  .detail-price {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 6px;
  }
  .detail-name {
    font-size: 15px;
    font-weight: 600;
    color: #333;
    margin-bottom: 6px;
  }
  .detail-meta {
    font-size: 12px;
    color: #999;
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
  .detail-desc {
    font-size: 13px;
    color: #666;
    line-height: 1.6;
  }
}
</style>
