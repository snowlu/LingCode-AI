<template>
  <div class="proj-project-detail">
    <div v-if="loading" class="h5-loading"><div class="skeleton-card"></div></div>
    <template v-else-if="project">
      <div class="detail-header" :style="{ background: themeColor }">
        <div class="detail-icon">📁</div>
        <div class="detail-name">{{ project.name }}</div>
        <div class="detail-status">{{ project.status }}</div>
      </div>
      <div class="detail-section">
        <div class="detail-row">
          <span class="label">负责人</span><span class="value">{{ project.manager || '—' }}</span>
        </div>
        <div class="detail-row">
          <span class="label">进度</span><span class="value">{{ project.progress || 0 }}%</span>
        </div>
        <div class="detail-row">
          <span class="label">开始日期</span
          ><span class="value">{{ project.startDate || project.createdAt || '—' }}</span>
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">项目任务</div>
        <div
          v-for="t in projectTasks"
          :key="t.id"
          class="task-item"
          @click="navigateTo(`task-detail/${t.id}`)"
        >
          <span
            :class="[
              'task-status',
              t.status === '已完成' ? 'done' : t.status === '进行中' ? 'doing' : 'todo',
            ]"
            >●</span
          >
          <span class="task-name">{{ t.name }}</span>
          <span class="task-assignee">{{ t.assignee || '' }}</span>
        </div>
      </div>
      <div class="detail-actions">
        <button
          class="action-btn"
          :style="{ background: themeColor }"
          @click="navigateTo('task-board')"
        >
          查看任务看板
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, fetchDetail, fetchList, setLayout, route } = useH5Page();
setLayout({ title: '项目详情', showBack: true, showTabbar: false });
const loading = ref(true);
const project = ref(null);
const projectTasks = ref([]);
onMounted(async () => {
  project.value = await fetchDetail('projects', route.params.id);
  projectTasks.value = await fetchList('taskBoard');
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.detail-header {
  text-align: center;
  padding: 20px;
  color: #fff;
  .detail-icon {
    font-size: 36px;
    margin-bottom: 8px;
  }
  .detail-name {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  .detail-status {
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
  .detail-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    font-size: 13px;
    border-bottom: 1px solid #f5f5f5;
    &:last-child {
      border-bottom: none;
    }
    .label {
      color: #999;
    }
    .value {
      color: #333;
    }
  }
}
.task-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
  .task-status {
    font-size: 10px;
    &.done {
      color: #67c23a;
    }
    &.doing {
      color: #e6a23c;
    }
    &.todo {
      color: #909399;
    }
  }
  .task-name {
    flex: 1;
    font-size: 13px;
    color: #333;
  }
  .task-assignee {
    font-size: 11px;
    color: #999;
  }
}
.detail-actions {
  padding: 16px 12px 80px;
  .action-btn {
    width: 100%;
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
