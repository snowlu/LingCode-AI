<template>
  <div class="edu-study-progress">
    <div v-if="loading" class="h5-loading"><div class="skeleton-card"></div></div>
    <template v-else-if="course">
      <div
        class="progress-header"
        :style="{
          background: `linear-gradient(135deg, ${themeColor}, ${adjustColor(themeColor, 30)})`,
        }"
      >
        <div class="progress-name">{{ course.course || course.name }}</div>
        <div class="progress-bar-wrap">
          <div class="progress-bar" :style="{ width: progress + '%' }"></div>
        </div>
        <div class="progress-text">学习进度 {{ progress }}%</div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">课程章节</div>
        <div
          v-for="(ch, i) in chapters"
          :key="i"
          :class="['chapter-item', { done: i < completedChapters }]"
        >
          <span class="chapter-check">{{ i < completedChapters ? '✅' : '⬜' }}</span>
          <span class="chapter-name">{{ ch }}</span>
        </div>
      </div>
      <div class="form-actions" style="padding: 16px 12px 80px">
        <button class="submit-btn" :style="{ background: themeColor }" @click="continueStudy">
          继续学习
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useH5Page } from '../useH5Page';

const { themeColor, adjustColor, fetchDetail, updateData, setLayout, route } = useH5Page();
setLayout({ title: '学习进度', showBack: true, showTabbar: false });

const loading = ref(true);
const course = ref(null);
const progress = ref(35);
const completedChapters = ref(2);
const chapters = [
  '课程导学与环境搭建',
  '核心概念与基础语法',
  '进阶特性与最佳实践',
  '项目实战与部署上线',
  '课程总结与面试指导',
];

onMounted(async () => {
  course.value = await fetchDetail('studentList', route.params.id);
  loading.value = false;
});

const continueStudy = async () => {
  if (completedChapters.value < chapters.length) {
    completedChapters.value++;
    progress.value = Math.round((completedChapters.value / chapters.length) * 100);
    await updateData('studentList', {
      id: parseInt(route.params.id),
      progress: progress.value + '%',
    });
    ElMessage.success('已完成一个章节');
  } else {
    ElMessage.info('课程已全部完成');
  }
};
</script>

<style lang="scss" scoped>
.progress-header {
  padding: 20px;
  color: #fff;
  .progress-name {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
  }
  .progress-bar-wrap {
    height: 8px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    margin-bottom: 8px;
    .progress-bar {
      height: 100%;
      background: #fff;
      border-radius: 4px;
      transition: width 0.3s;
    }
  }
  .progress-text {
    font-size: 12px;
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
}
.chapter-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
  .chapter-check {
    font-size: 16px;
  }
  .chapter-name {
    font-size: 13px;
    color: #333;
  }
  &.done .chapter-name {
    color: #67c23a;
  }
}
</style>
