<template>
  <div class="edu-course-list">
    <div class="filter-bar">
      <el-radio-group v-model="filter" size="small">
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="hot">热门</el-radio-button>
        <el-radio-button label="free">免费</el-radio-button>
      </el-radio-group>
    </div>
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="courses.length" class="h5-list" style="padding-bottom: 80px">
      <div
        v-for="item in courses"
        :key="item.id"
        class="list-card"
        @click="navigateTo(`course-detail/${item.id}`)"
      >
        <div class="list-img">{{ item.img || '📘' }}</div>
        <div class="list-info">
          <h4>{{ item.name }}</h4>
          <div class="list-meta">
            <span>{{ item.teacher || '' }}</span>
          </div>
          <div class="list-bottom">
            <span class="list-price" :style="{ color: themeColor }">¥{{ item.price }}</span>
            <span class="list-sales">{{ item.students || '' }}人学习</span>
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
setLayout({ title: '课程列表', showBack: true, showTabbar: true, activeTab: 'course' });

const loading = ref(true);
const courses = ref([]);
const filter = ref('all');

onMounted(async () => {
  courses.value = await fetchList('courseList');
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.filter-bar {
  padding: 8px 12px;
  background: #fff;
  margin-bottom: 4px;
}
</style>
