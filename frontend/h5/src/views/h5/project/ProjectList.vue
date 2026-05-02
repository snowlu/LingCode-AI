<template>
  <div class="proj-project-list">
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="projects.length" class="h5-list" style="padding-bottom: 80px">
      <div
        v-for="item in projects"
        :key="item.id"
        class="project-card"
        @click="navigateTo(`project-detail/${item.id}`)"
      >
        <div
          class="project-progress"
          :style="{ '--progress': (item.progress || 0) + '%', '--color': themeColor }"
        >
          <div class="progress-bar"></div>
        </div>
        <div class="project-info">
          <h4>{{ item.name }}</h4>
          <div class="project-meta">
            <span>{{ item.manager || '' }}</span
            ><span>{{ item.status }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="h5-empty">
      <div class="empty-icon">📁</div>
      <div class="empty-text">暂无项目</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '项目列表', showBack: false, showTabbar: true, activeTab: 'project' });
const loading = ref(true);
const projects = ref([]);
onMounted(async () => {
  projects.value = await fetchList('projects');
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.project-card {
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  .project-progress {
    height: 4px;
    background: #f0f0f0;
    border-radius: 2px;
    margin-bottom: 8px;
    .progress-bar {
      height: 100%;
      width: var(--progress);
      background: var(--color);
      border-radius: 2px;
    }
  }
  .project-info {
    h4 {
      font-size: 14px;
      font-weight: 600;
      color: #333;
      margin: 0 0 4px;
    }
    .project-meta {
      font-size: 12px;
      color: #999;
      span {
        margin-right: 12px;
      }
    }
  }
}
</style>
