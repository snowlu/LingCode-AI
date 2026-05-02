<template>
  <div class="ecom-favorites">
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="favorites.length" class="h5-waterfall">
      <div
        v-for="item in favorites"
        :key="item.id"
        class="waterfall-card"
        @click="navigateTo(`product-detail/${item.productId}`)"
      >
        <div class="waterfall-img">{{ item.img || '📦' }}</div>
        <div class="waterfall-info">
          <h4>{{ item.name || item.productName }}</h4>
          <div class="waterfall-bottom">
            <span class="waterfall-price" :style="{ color: themeColor }">¥{{ item.price }}</span>
            <el-icon class="unfavorite-btn" @click.stop="removeFavorite(item)"><StarFilled /></el-icon>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="h5-empty">
      <div class="empty-icon">⭐</div>
      <div class="empty-text">暂无收藏</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { StarFilled } from '@element-plus/icons-vue';
import { useH5Page } from '../useH5Page';

const { themeColor, navigateTo, fetchList, removeData, setLayout } = useH5Page();
setLayout({ title: '我的收藏', showBack: true, showTabbar: false });

const loading = ref(true);
const favorites = ref([]);

const loadFavorites = async () => {
  loading.value = true;
  favorites.value = await fetchList('favorites', { pageSize: 50 });
  loading.value = false;
};

onMounted(loadFavorites);

const removeFavorite = async item => {
  await removeData('favorites', item.id);
  ElMessage.success('已取消收藏');
  await loadFavorites();
};
</script>
