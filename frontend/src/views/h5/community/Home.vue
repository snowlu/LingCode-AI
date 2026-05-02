<template>
  <div class="com-home">
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
    <div class="h5-grid h5-grid-4">
      <div
        v-for="(cat, i) in categories"
        :key="i"
        class="grid-item grid-item-lg"
        @click="navigateTo(cat.route)"
      >
        <span class="grid-icon">{{ cat.icon }}</span
        ><span class="grid-label">{{ cat.name }}</span>
      </div>
    </div>
    <div class="h5-section"><span class="section-title">社区公告</span></div>
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else class="h5-list" style="padding-bottom: 80px">
      <div
        v-for="item in notices"
        :key="item.id"
        class="notice-card"
        @click="navigateTo(`notice-detail/${item.id}`)"
      >
        <div class="notice-badge" :style="{ background: themeColor }">
          {{ item.type || '公告' }}
        </div>
        <div class="notice-info">
          <h4>{{ item.title || item.name }}</h4>
          <span class="notice-date">{{ item.createdAt || '' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '', showBack: false, showTabbar: true, activeTab: 'home' });
const loading = ref(true);
const notices = ref([]);
const banners = [
  { title: '社区公告', subtitle: '春节放假通知', bg: 'linear-gradient(135deg, #00b42a, #23d160)' },
  {
    title: '在线报修',
    subtitle: '一键报修，快速响应',
    bg: 'linear-gradient(135deg, #23d160, #48d88a)',
  },
];
const categories = [
  { name: '在线报修', icon: '🔧', route: 'repair-apply' },
  { name: '物业缴费', icon: '💰', route: 'home' },
  { name: '活动报名', icon: '🎉', route: 'activity-list' },
  { name: '投诉建议', icon: '💬', route: 'home' },
];
onMounted(async () => {
  notices.value = await fetchList('announcement');
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.grid-item-lg .grid-icon {
  font-size: 28px;
}
.notice-card {
  display: flex;
  gap: 10px;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  align-items: center;
  .notice-badge {
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 11px;
    color: #fff;
    flex-shrink: 0;
  }
  .notice-info {
    flex: 1;
    h4 {
      font-size: 13px;
      font-weight: 500;
      color: #333;
      margin: 0 0 4px;
    }
    .notice-date {
      font-size: 11px;
      color: #999;
    }
  }
}
</style>
