<template>
  <div class="proj-task-board">
    <div class="board-columns">
      <div v-for="col in columns" :key="col.key" class="board-column">
        <div class="column-header" :style="{ color: themeColor }">
          {{ col.label }} ({{ getTasks(col.key).length }})
        </div>
        <div class="column-tasks">
          <div
            v-for="task in getTasks(col.key)"
            :key="task.id"
            class="task-card"
            @click="navigateTo(`task-detail/${task.id}`)"
          >
            <div class="task-name">{{ task.name }}</div>
            <div class="task-meta">
              <span :class="['priority', task.priority === '高' ? 'high' : '']">{{
                task.priority || '中'
              }}</span
              ><span class="assignee">{{ task.assignee || '' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '任务看板', showBack: false, showTabbar: true, activeTab: 'task' });
const tasks = ref([]);
const columns = [
  { key: '待开始', label: '待开始' },
  { key: '进行中', label: '进行中' },
  { key: '已完成', label: '已完成' },
];
const getTasks = status => tasks.value.filter(t => t.status === status);
onMounted(async () => {
  tasks.value = await fetchList('taskBoard');
});
</script>

<style lang="scss" scoped>
.board-columns {
  display: flex;
  gap: 8px;
  padding: 8px;
  overflow-x: auto;
  height: 100%;
}
.board-column {
  flex: 1;
  min-width: 200px;
  background: #f5f7fa;
  border-radius: 12px;
  padding: 8px;
  .column-header {
    font-size: 14px;
    font-weight: 600;
    padding: 8px;
  }
}
.task-card {
  background: #fff;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 6px;
  cursor: pointer;
  &:active {
    background: #fafafa;
  }
  .task-name {
    font-size: 13px;
    font-weight: 500;
    color: #333;
    margin-bottom: 6px;
  }
  .task-meta {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    .priority {
      color: #909399;
      &.high {
        color: #f56c6c;
      }
    }
    .assignee {
      color: #999;
    }
  }
}
</style>
