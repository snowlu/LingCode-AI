<template>
  <div class="edu-my-courses">
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="courses.length" class="h5-list" style="padding-bottom: 80px">
      <div
        v-for="item in courses"
        :key="item.id"
        class="list-card"
        @click="navigateTo(`study-progress/${item.id}`)"
      >
        <div class="list-img">📘</div>
        <div class="list-info">
          <h4>{{ item.course || item.name }}</h4>
          <div class="list-meta">
            <span>{{ item.status || '学习中' }}</span>
          </div>
          <div class="list-bottom">
            <span class="list-price" :style="{ color: themeColor }">{{
              item.progress || '0%'
            }}</span>
            <span class="list-sales">进度</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="h5-empty">
      <div class="empty-icon">📘</div>
      <div class="empty-text">暂无课程</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';

const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '我的课程', showBack: false, showTabbar: true, activeTab: 'study' });

const loading = ref(true);
const courses = ref([]);

onMounted(async () => {
  courses.value = await fetchList('studentList');
  loading.value = false;
});
</script>
