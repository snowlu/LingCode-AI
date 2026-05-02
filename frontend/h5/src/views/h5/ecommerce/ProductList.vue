<template>
  <div class="ecom-product-list">
    <div class="filter-bar">
      <el-radio-group v-model="filter" size="small">
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="hot">热销</el-radio-button>
        <el-radio-button label="new">新品</el-radio-button>
      </el-radio-group>
    </div>
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 4" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="products.length" class="h5-waterfall">
      <div
        v-for="item in products"
        :key="item.id"
        class="waterfall-card"
        @click="navigateTo(`product-detail/${item.id}`)"
      >
        <div class="waterfall-img">{{ item.img || '📦' }}</div>
        <div class="waterfall-info">
          <h4>{{ item.name }}</h4>
          <div class="waterfall-bottom">
            <span class="waterfall-price" :style="{ color: themeColor }">¥{{ item.price }}</span>
            <span class="waterfall-sales">{{ item.sales ? `已售${item.sales}` : '' }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="h5-empty">
      <div class="empty-icon">📭</div>
      <div class="empty-text">暂无商品</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useH5Page } from '../useH5Page';

const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
const route = useRoute();
setLayout({ title: '商品列表', showBack: true, showTabbar: true, activeTab: 'category' });

const loading = ref(true);
const products = ref([]);
const filter = ref('all');

const loadProducts = async () => {
  loading.value = true;
  const params = {};
  const category = route.query.category;
  const keyword = route.query.keyword;
  if (category) params.category = category;
  if (keyword) params.keywords = keyword;
  products.value = await fetchList('productList', params);
  if (filter.value === 'hot') {
    products.value.sort((a, b) => (b.sales || 0) - (a.sales || 0));
  }
  loading.value = false;
};

onMounted(loadProducts);
watch(filter, loadProducts);
</script>

<style lang="scss" scoped>
.filter-bar {
  padding: 8px 12px;
  background: #fff;
  margin-bottom: 4px;
}
</style>
