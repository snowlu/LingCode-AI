<template>
  <div class="proj-task-detail">
    <div v-if="loading" class="h5-loading"><div class="skeleton-card"></div></div>
    <template v-else-if="task">
      <div class="detail-header" :style="{ background: themeColor }">
        <div class="detail-icon">📋</div>
        <div class="detail-name">{{ task.name }}</div>
        <div class="detail-status">{{ task.status }}</div>
      </div>
      <div class="detail-section">
        <div class="detail-row">
          <span class="label">优先级</span
          ><span class="value" :style="{ color: task.priority === '高' ? '#f56c6c' : '#333' }">{{
            task.priority || '中'
          }}</span>
        </div>
        <div class="detail-row">
          <span class="label">负责人</span><span class="value">{{ task.assignee || '—' }}</span>
        </div>
        <div class="detail-row">
          <span class="label">截止日期</span
          ><span class="value">{{ task.deadline || task.dueDate || '—' }}</span>
        </div>
        <div class="detail-row">
          <span class="label">创建时间</span><span class="value">{{ task.createdAt || '—' }}</span>
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">任务描述</div>
        <div class="detail-desc">{{ task.description || '暂无描述' }}</div>
      </div>
      <div class="detail-actions">
        <button
          v-if="task.status === '待开始'"
          class="action-btn"
          :style="{ background: themeColor }"
          @click="startTask"
        >
          开始执行
        </button>
        <button
          v-if="task.status === '进行中'"
          class="action-btn"
          :style="{ background: themeColor }"
          @click="completeTask"
        >
          标记完成
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useH5Page } from '../useH5Page';
const { themeColor, fetchDetail, updateData, setLayout, route } = useH5Page();
setLayout({ title: '任务详情', showBack: true, showTabbar: false });
const loading = ref(true);
const task = ref(null);
onMounted(async () => {
  task.value = await fetchDetail('taskBoard', route.params.id);
  loading.value = false;
});
const startTask = async () => {
  await updateData('taskBoard', { id: task.value.id, status: '进行中' });
  task.value.status = '进行中';
  ElMessage.success('已开始执行');
};
const completeTask = async () => {
  await updateData('taskBoard', { id: task.value.id, status: '已完成' });
  task.value.status = '已完成';
  ElMessage.success('任务已完成');
};
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
  .detail-desc {
    font-size: 13px;
    color: #666;
    line-height: 1.6;
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
