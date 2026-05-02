<template>
  <div class="res-home">
    <div class="h5-banner">
      <el-carousel height="100px" :interval="4000" indicator-position="outside"
        ><el-carousel-item v-for="(b, i) in banners" :key="i"
          ><div class="banner-slide" :style="{ background: b.bg }">
            <h3>{{ b.title }}</h3>
            <p>{{ b.subtitle }}</p>
          </div></el-carousel-item
        ></el-carousel
      >
    </div>
    <div class="h5-grid">
      <div
        v-for="(cat, i) in categories"
        :key="i"
        class="grid-item"
        @click="navigateTo('product-category')"
      >
        <span class="grid-icon">{{ cat.icon }}</span
        ><span class="grid-label">{{ cat.name }}</span>
      </div>
    </div>
    <div
      class="member-card"
      :style="{
        background: `linear-gradient(135deg, ${themeColor}, ${adjustColor(themeColor, 30)})`,
      }"
    >
      <div class="member-info">
        <span class="member-avatar">👨</span>
        <div>
          <div class="member-name">张先生</div>
          <div class="member-level">金卡会员</div>
        </div>
      </div>
      <div class="member-points">5,600 积分</div>
    </div>
    <div class="h5-section"><span class="section-title">热销菜品</span></div>
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else class="h5-waterfall" style="padding-bottom: 80px">
      <div
        v-for="item in dishes"
        :key="item.id"
        class="waterfall-card"
        @click="navigateTo(`product-detail/${item.id}`)"
      >
        <div class="waterfall-img">{{ item.img || '🍽️' }}</div>
        <div class="waterfall-info">
          <h4>{{ item.name }}</h4>
          <div class="waterfall-bottom">
            <span class="waterfall-price" :style="{ color: themeColor }"
              >¥{{ item.price || item.sales }}</span
            ><span class="waterfall-sales">{{ item.sales || '' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, adjustColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '', showBack: false, showTabbar: true, activeTab: 'home' });
const loading = ref(true);
const dishes = ref([]);
const banners = [
  { title: '会员日特惠', subtitle: '全场菜品8折', bg: 'linear-gradient(135deg, #ff9f40, #ffbe76)' },
  { title: '新品上市', subtitle: '春季限定菜品', bg: 'linear-gradient(135deg, #ffbe76, #ffe0a6)' },
];
const categories = [
  { name: '招牌菜', icon: '🍳' },
  { name: '主食', icon: '🍚' },
  { name: '小吃', icon: '🥟' },
  { name: '饮品', icon: '🧋' },
  { name: '甜品', icon: '🍰' },
  { name: '套餐', icon: '🍱' },
  { name: '会员专区', icon: '👑' },
  { name: '活动专区', icon: '🎉' },
];
onMounted(async () => {
  dishes.value = await fetchList('dishes');
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.member-card {
  margin: 0 12px 8px;
  border-radius: 12px;
  padding: 14px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .member-info {
    display: flex;
    align-items: center;
    gap: 10px;
    .member-avatar {
      font-size: 24px;
    }
    .member-name {
      font-size: 14px;
      font-weight: 600;
    }
    .member-level {
      font-size: 11px;
      opacity: 0.8;
    }
  }
  .member-points {
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
