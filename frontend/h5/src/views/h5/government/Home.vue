<template>
  <div class="gov-home">
    <div v-if="loading" class="h5-loading">
      <div class="skeleton-banner"></div>
      <div class="skeleton-grid"><div v-for="i in 8" :key="i" class="skeleton-item"></div></div>
    </div>
    <template v-else>
      <div class="h5-banner">
        <el-carousel height="100px" :interval="4000" indicator-position="outside">
          <el-carousel-item v-for="(b, i) in banners" :key="i"
            ><div class="banner-slide" :style="{ background: b.bg }"><h3>{{ b.title }}</h3><p>{{ b.subtitle }}</p></div></el-carousel-item>
        </el-carousel>
      </div>
      <div class="h5-grid">
        <div v-for="cat in displayCategories" :key="cat.id || cat.name" class="grid-item" @click="navigateTo(`item-list?category=${cat.name}`)">
          <span class="grid-icon">{{ cat.icon }}</span><span class="grid-label">{{ cat.name }}</span>
        </div>
      </div>
      <div class="h5-section"><span class="section-title">政策公告</span></div>
      <div class="h5-list">
        <div v-for="item in notices" :key="item.id" class="notice-card" @click="navigateTo(`notice-detail/${item.id}`)">
          <div class="notice-badge" :style="{ background: themeColor }">{{ item.type || '公告' }}</div>
          <div class="notice-info"><h4>{{ item.title || item.name }}</h4><span class="notice-date">{{ item.createdAt || '' }}</span></div>
        </div>
      </div>
      <div class="h5-section">
        <span class="section-title">热门事项</span><span class="section-more" :style="{ color: themeColor }" @click="navigateTo('item-list')">更多 ›</span>
      </div>
      <div class="h5-list" style="padding-bottom: 80px">
        <div v-for="item in items" :key="item.id" class="list-card" @click="navigateTo(`item-detail/${item.id}`)">
          <div class="list-img">📋</div>
          <div class="list-info"><h4>{{ item.name }}</h4>
            <div class="list-bottom"><span class="list-price" :style="{ color: themeColor }">{{ item.fee || '免费' }}</span><span class="list-sales">{{ item.applicants || '' }}人办理</span></div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';

const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '', showBack: false, showTabbar: true, activeTab: 'home' });

const loading = ref(true);
const items = ref([]);
const notices = ref([]);
const banners = [
  { title: '一网通办', subtitle: '足不出户办理各类事项', bg: 'linear-gradient(135deg, #e6a23c, #f5c842)' },
  { title: '政策发布', subtitle: '最新政策第一时间了解', bg: 'linear-gradient(135deg, #f5c842, #f0d78c)' },
];
const defaultCategoryIcons = ['🛡️', '🏠', '🏢', '💰', '🏦', '🚗', '🏥', '🎓'];
const displayCategories = ref([]);

onMounted(async () => {
  const cats = await fetchList('category');
  if (cats.length) {
    displayCategories.value = cats.slice(0, 8).map((c, i) => ({ ...c, icon: c.icon || defaultCategoryIcons[i] || '📋' }));
  } else {
    displayCategories.value = [
      { name: '社保服务', icon: '🛡️' }, { name: '户政办理', icon: '🏠' },
      { name: '工商注册', icon: '🏢' }, { name: '税务服务', icon: '💰' },
      { name: '公积金', icon: '🏦' }, { name: '交通出行', icon: '🚗' },
      { name: '医疗卫生', icon: '🏥' }, { name: '教育服务', icon: '🎓' },
    ];
  }
  items.value = await fetchList('itemList');
  notices.value = await fetchList('policy');
  loading.value = false;
});
</script>
