<template>
  <div class="edu-grade-query">
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="grades.length" class="grade-list">
      <div v-for="g in grades" :key="g.id" class="grade-card">
        <div class="grade-name">{{ g.course || g.name }}</div>
        <div class="grade-score" :style="{ color: getScoreColor(g.score || g.grade) }">
          {{ g.score || g.grade || '—' }}
        </div>
        <div class="grade-meta">{{ g.status || '' }}</div>
      </div>
    </div>
    <div v-else class="h5-empty">
      <div class="empty-icon">📊</div>
      <div class="empty-text">暂无成绩</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';

const { fetchList, setLayout } = useH5Page();
setLayout({ title: '成绩查询', showBack: true, showTabbar: false });

const loading = ref(true);
const grades = ref([]);

const getScoreColor = score => {
  const s = parseInt(score);
  if (isNaN(s)) return '#333';
  if (s >= 90) return '#67c23a';
  if (s >= 60) return '#e6a23c';
  return '#f56c6c';
};

onMounted(async () => {
  grades.value = await fetchList('studentList', { pageSize: 20 });
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.grade-list {
  padding: 8px 12px;
}
.grade-card {
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  .grade-name {
    flex: 1;
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }
  .grade-score {
    font-size: 20px;
    font-weight: 700;
  }
  .grade-meta {
    font-size: 11px;
    color: #999;
  }
}
</style>
