<template>
  <div class="edu-course-detail">
    <div v-if="loading" class="h5-loading">
      <div class="skeleton-banner"></div>
      <div class="skeleton-card"></div>
    </div>
    <template v-else-if="course">
      <div class="detail-gallery">{{ course.img || '📘' }}</div>
      <div class="detail-info-card">
        <div class="detail-price" :style="{ color: themeColor }">¥{{ course.price }}</div>
        <div class="detail-name">{{ course.name }}</div>
        <div class="detail-meta">
          <span>{{ course.teacher || '' }}</span
          ><span>{{ course.students || 0 }}人学习</span>
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">课程简介</div>
        <div class="detail-desc">
          {{ course.description || '系统化学习路径，从入门到精通，项目实战驱动教学。' }}
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">课程大纲</div>
        <div v-for="(ch, i) in chapters" :key="i" class="chapter-item">
          <span class="chapter-num">0{{ i + 1 }}</span>
          <span class="chapter-name">{{ ch }}</span>
        </div>
      </div>
      <div class="detail-actions">
        <button
          class="action-btn"
          style="background: #ff9f40"
          @click="navigateTo(`course-enroll/${course.id}`)"
        >
          立即报名
        </button>
        <button
          class="action-btn"
          :style="{ background: themeColor }"
          @click="navigateTo(`teacher-intro/${course.id}`)"
        >
          讲师介绍
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';

const { themeColor, navigateTo, fetchDetail, setLayout, route } = useH5Page();
setLayout({ title: '课程详情', showBack: true, showTabbar: false });

const loading = ref(true);
const course = ref(null);
const chapters = [
  '课程导学与环境搭建',
  '核心概念与基础语法',
  '进阶特性与最佳实践',
  '项目实战与部署上线',
];

onMounted(async () => {
  course.value = await fetchDetail('courseList', route.params.id);
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.detail-gallery {
  background: #fff;
  text-align: center;
  padding: 32px;
  font-size: 80px;
}
.detail-info-card {
  background: #fff;
  margin: 8px 12px;
  border-radius: 12px;
  padding: 12px;
  .detail-price {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 6px;
  }
  .detail-name {
    font-size: 15px;
    font-weight: 600;
    color: #333;
    margin-bottom: 6px;
  }
  .detail-meta {
    font-size: 12px;
    color: #999;
    span {
      margin-right: 12px;
    }
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
.chapter-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #f5f5f5;
  .chapter-num {
    font-size: 12px;
    color: #999;
    font-weight: 600;
  }
  .chapter-name {
    font-size: 13px;
    color: #333;
  }
}
.detail-actions {
  position: sticky;
  bottom: 0;
  display: flex;
  gap: 8px;
  padding: 8px 12px 28px;
  background: #fff;
  .action-btn {
    flex: 1;
    height: 40px;
    border-radius: 20px;
    border: none;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
}
</style>
