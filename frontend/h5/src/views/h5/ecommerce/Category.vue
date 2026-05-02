<template>
  <div class="ecom-category">
    <div class="h5-search">
      <el-icon><Search /></el-icon>
      <el-input v-model="keyword" placeholder="搜索商品" size="small" @keyup.enter="handleSearch" />
    </div>
    <div v-if="loading" class="h5-loading">
      <div class="skeleton-grid"><div v-for="i in 6" :key="i" class="skeleton-item"></div></div>
    </div>
    <div v-else-if="categoryList.length" class="category-grid">
      <div
        v-for="cat in categoryList"
        :key="cat.id"
        class="category-card"
        @click="navigateTo(`product-list?category=${cat.name}`)"
      >
        <div class="cat-icon">{{ catIcons[cat.id % catIcons.length] }}</div>
        <div class="cat-info">
          <div class="cat-name">{{ cat.name }}</div>
          <div class="cat-count" :style="{ color: themeColor }">{{ cat.productCount || 0 }}件商品</div>
        </div>
        <el-icon class="cat-arrow"><ArrowRight /></el-icon>
      </div>
    </div>
    <div v-else class="h5-empty">
      <div class="empty-icon">📂</div>
      <div class="empty-text">暂无分类</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Search, ArrowRight } from '@element-plus/icons-vue';
import { useH5Page } from '../useH5Page';

const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '分类', showBack: false, showTabbar: true, activeTab: 'category' });

const keyword = ref('');
const loading = ref(true);
const categoryList = ref([]);
const catIcons = ['📱', '💻', '🏠', '👔', '💄', '🍎', '📚', '⚽', '🧸', '🚗'];

const handleSearch = () => {
  if (keyword.value) navigateTo(`product-list?keyword=${keyword.value}`);
};

onMounted(async () => {
  categoryList.value = await fetchList('category', { pageSize: 50 });
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.category-grid {
  padding: 8px 12px 80px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.category-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border-radius: 12px;
  padding: 14px;
  cursor: pointer;
  &:active { background: #fafafa; }
  .cat-icon { font-size: 32px; width: 44px; text-align: center; }
  .cat-info {
    flex: 1;
    .cat-name { font-size: 14px; font-weight: 600; color: #333; }
    .cat-count { font-size: 12px; margin-top: 2px; }
  }
  .cat-arrow { color: #ccc; font-size: 14px; }
}
</style>
