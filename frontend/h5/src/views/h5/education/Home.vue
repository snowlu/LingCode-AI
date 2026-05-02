<template>
  <div class="edu-home">
    <div v-if="loading" class="h5-loading">
      <div class="skeleton-banner"></div>
      <div class="skeleton-grid"><div v-for="i in 8" :key="i" class="skeleton-item"></div></div>
    </div>
    <template v-else>
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
        <div v-for="cat in displayCategories" :key="cat.id || cat.name" class="grid-item" @click="navigateTo(`course-list?category=${cat.name}`)">
          <span class="grid-icon">{{ cat.icon }}</span><span class="grid-label">{{ cat.name }}</span>
        </div>
      </div>
      <div class="h5-section"><span class="section-title">热门课程</span></div>
      <div class="h5-list" style="padding-bottom: 80px">
        <div v-for="item in courses" :key="item.id" class="list-card" @click="navigateTo(`course-detail/${item.id}`)">
          <div class="list-img">{{ item.img || '📘' }}</div>
          <div class="list-info">
            <h4>{{ item.name }}</h4>
            <div class="list-meta"><span>{{ item.teacher || '' }}</span></div>
            <div class="list-bottom">
              <span class="list-price" :style="{ color: themeColor }">¥{{ item.price }}</span>
              <span class="list-sales">{{ item.students || item.sales || '' }}人学习</span>
            </div>
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
const courses = ref([]);
const banners = [
  { title: '春季课程上新', subtitle: '全场课程8折起', bg: 'linear-gradient(135deg, #67c23a, #43e97b)' },
  { title: '名师直播', subtitle: '每晚8点，名师在线答疑', bg: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
];
const defaultCategoryIcons = ['💻', '⚙️', '🤖', '🎨', '📊', '🌍', '📝', '🎵'];
const displayCategories = ref([]);

onMounted(async () => {
  const cats = await fetchList('category');
  if (cats.length) {
    displayCategories.value = cats.slice(0, 8).map((c, i) => ({ ...c, icon: c.icon || defaultCategoryIcons[i] || '📘' }));
  } else {
    displayCategories.value = [
      { name: '前端开发', icon: '💻' }, { name: '后端开发', icon: '⚙️' },
      { name: '人工智能', icon: '🤖' }, { name: '产品设计', icon: '🎨' },
      { name: '数据分析', icon: '📊' }, { name: '外语学习', icon: '🌍' },
      { name: '职业考试', icon: '📝' }, { name: '兴趣生活', icon: '🎵' },
    ];
  }
  courses.value = await fetchList('courseList');
  loading.value = false;
});
</script>
