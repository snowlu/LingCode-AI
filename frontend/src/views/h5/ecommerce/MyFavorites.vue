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
        @click="navigateTo(`product-detail/${item.id}`)"
      >
        <div class="waterfall-img">{{ item.img || '📦' }}</div>
        <div class="waterfall-info">
          <h4>{{ item.name }}</h4>
          <div class="waterfall-bottom">
            <span class="waterfall-price" :style="{ color: themeColor }">¥{{ item.price }}</span>
            <span class="waterfall-sales">{{ item.sales || '' }}</span>
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
import { useH5Page } from '../useH5Page';

const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '我的收藏', showBack: true, showTabbar: false });

const loading = ref(true);
const favorites = ref([]);

onMounted(async () => {
  favorites.value = await fetchList('productList', { pageSize: 10 });
  loading.value = false;
});
</script>
