<template>
  <div class="proj-todo-tasks">
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="tasks.length" class="h5-list" style="padding-bottom: 80px">
      <div
        v-for="item in tasks"
        :key="item.id"
        class="list-card"
        @click="navigateTo(`task-detail/${item.id}`)"
      >
        <div class="list-img">📋</div>
        <div class="list-info">
          <h4>{{ item.name }}</h4>
          <div class="list-bottom">
            <span
              class="list-price"
              :style="{ color: item.priority === '高' ? '#f56c6c' : themeColor }"
              >{{ item.priority || '中' }}</span
            ><span class="list-sales">{{ item.assignee || '' }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="h5-empty">
      <div class="empty-icon">📋</div>
      <div class="empty-text">暂无待办</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '待办任务', showBack: true, showTabbar: false });
const loading = ref(true);
const tasks = ref([]);
onMounted(async () => {
  tasks.value = await fetchList('taskBoard');
  loading.value = false;
});
</script>
