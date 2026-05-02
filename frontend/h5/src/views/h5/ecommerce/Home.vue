<template>
  <div class="ecom-home">
    <div v-if="loading" class="h5-loading">
      <div class="skeleton-banner"></div>
      <div class="skeleton-grid"><div v-for="i in 8" :key="i" class="skeleton-item"></div></div>
    </div>
    <template v-else>
      <div class="h5-search" @click="navigateTo('category')">
        <el-icon><Search /></el-icon>
        <span>搜索商品</span>
      </div>
      <div class="h5-banner">
        <el-carousel height="120px" :interval="4000" indicator-position="outside">
          <el-carousel-item v-for="(b, i) in banners" :key="i">
            <div class="banner-slide" :style="{ background: b.bg }">
              <h3>{{ b.title }}</h3>
              <p>{{ b.subtitle }}</p>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="h5-grid">
        <div
          v-for="cat in displayCategories"
          :key="cat.id || cat.name"
          class="grid-item"
          @click="navigateTo(`product-list?category=${cat.name}`)"
        >
          <span class="grid-icon">{{ cat.icon || '📦' }}</span>
          <span class="grid-label">{{ cat.name }}</span>
        </div>
      </div>
      <div class="h5-section">
        <span class="section-title">爆款推荐</span>
        <span
          class="section-more"
          :style="{ color: themeColor }"
          @click="navigateTo('product-list')"
          >更多 ›</span
        >
      </div>
      <div v-if="products.length" class="h5-waterfall">
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
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { useH5Page } from '../useH5Page';

const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();

setLayout({ title: '', showBack: false, showTabbar: true, activeTab: 'home' });

const loading = ref(true);
const products = ref([]);
const categoryList = ref([]);
const banners = [
  { title: '新年大促', subtitle: '全场满300减50', bg: 'linear-gradient(135deg, #409eff, #667eea)' },
  { title: '新品首发', subtitle: 'iPhone 15 Pro 火热预售', bg: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { title: '会员专享', subtitle: '钻石会员8折起', bg: 'linear-gradient(135deg, #f093fb, #f5576c)' },
];
const defaultCategoryIcons = ['📱', '💻', '🏠', '👔', '💄', '🍎', '📚', '⚽'];

const displayCategories = ref([]);

onMounted(async () => {
  const cats = await fetchList('category');
  if (cats.length) {
    categoryList.value = cats;
    displayCategories.value = cats.slice(0, 8).map((c, i) => ({ ...c, icon: c.icon || defaultCategoryIcons[i] || '📦' }));
  } else {
    displayCategories.value = [
      { name: '手机数码', icon: '📱' }, { name: '电脑办公', icon: '💻' },
      { name: '家用电器', icon: '🏠' }, { name: '服饰鞋包', icon: '👔' },
      { name: '美妆护肤', icon: '💄' }, { name: '食品生鲜', icon: '🍎' },
      { name: '图书文具', icon: '📚' }, { name: '运动户外', icon: '⚽' },
    ];
  }
  products.value = await fetchList('productList');
  loading.value = false;
});
</script>
