<template>
  <div class="edu-teacher-intro">
    <div v-if="loading" class="h5-loading"><div class="skeleton-card"></div></div>
    <template v-else-if="teacher">
      <div
        class="teacher-header"
        :style="{
          background: `linear-gradient(135deg, ${themeColor}, ${adjustColor(themeColor, 30)})`,
        }"
      >
        <div class="teacher-avatar">👨‍🏫</div>
        <div class="teacher-name">{{ teacher.name }}</div>
        <div class="teacher-title">{{ teacher.title || '高级讲师' }}</div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">讲师简介</div>
        <div class="detail-desc">
          {{ teacher.description || '资深技术专家，多年教学经验，深受学员好评。' }}
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">授课课程</div>
        <div
          v-for="c in teacherCourses"
          :key="c.id"
          class="course-item"
          @click="navigateTo(`course-detail/${c.id}`)"
        >
          <span class="course-icon">📘</span>
          <div class="course-info">
            <div class="course-name">{{ c.name }}</div>
            <div class="course-meta">{{ c.students || 0 }}人学习</div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';

const { themeColor, adjustColor, navigateTo, fetchDetail, fetchList, setLayout, route } =
  useH5Page();
setLayout({ title: '讲师介绍', showBack: true, showTabbar: false });

const loading = ref(true);
const teacher = ref(null);
const teacherCourses = ref([]);

onMounted(async () => {
  const courseId = route.params.id;
  const course = await fetchDetail('courseList', courseId);
  if (course) {
    teacher.value = {
      name: course.teacher || '讲师',
      title: '高级讲师',
      description: '资深技术专家，多年教学经验。',
    };
  }
  teacherCourses.value = await fetchList('courseList');
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.teacher-header {
  text-align: center;
  padding: 24px;
  color: #fff;
  .teacher-avatar {
    font-size: 48px;
    margin-bottom: 8px;
  }
  .teacher-name {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  .teacher-title {
    font-size: 13px;
    opacity: 0.8;
  }
}
.detail-section {
  background: #fff;
  margin: 8px 12px;
  border-radius: 12px;
  padding: 12px;
  .detail-section-title {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }
  .detail-desc {
    font-size: 13px;
    color: #666;
    line-height: 1.6;
  }
}
.course-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
  .course-icon {
    font-size: 24px;
  }
  .course-info {
    flex: 1;
    .course-name {
      font-size: 13px;
      color: #333;
    }
    .course-meta {
      font-size: 11px;
      color: #999;
    }
  }
}
</style>
