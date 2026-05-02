<template>
  <div class="proj-home">
    <div class="h5-grid h5-grid-4">
      <div v-for="(cat, i) in categories" :key="i" class="grid-item grid-item-lg" @click="navigateTo(cat.route)">
        <span class="grid-icon">{{ cat.icon }}</span><span class="grid-label">{{ cat.name }}</span>
      </div>
    </div>
    <div class="h5-section"><span class="section-title">待办任务</span></div>
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="tasks.length" class="h5-list">
      <div v-for="item in tasks" :key="item.id" class="todo-card" @click="navigateTo(`task-detail/${item.id}`)">
        <div class="todo-dot" :style="{ background: item.priority === '高' ? '#f56c6c' : themeColor }"></div>
        <div class="todo-info"><h4>{{ item.name }}</h4><span>{{ item.assignee || '' }} · {{ item.status }}</span></div>
        <el-icon color="#ccc"><ArrowRight /></el-icon>
      </div>
    </div>
    <div v-else class="h5-empty" style="padding: 20px 0"><div class="empty-text" style="font-size:12px">暂无待办</div></div>
    <div class="h5-section"><span class="section-title">项目概览</span></div>
    <div class="h5-list" style="padding-bottom: 80px">
      <div v-for="item in projects" :key="item.id" class="project-card" @click="navigateTo(`project-detail/${item.id}`)">
        <div class="project-progress" :style="{ '--progress': (item.progress || 0) + '%', '--color': themeColor }">
          <div class="progress-bar"></div>
        </div>
        <div class="project-info"><h4>{{ item.name }}</h4><span>{{ item.manager || '' }} · {{ item.status }}</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue';
import { useH5Page } from '../useH5Page';

const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '', showBack: false, showTabbar: true, activeTab: 'home' });

const loading = ref(true);
const tasks = ref([]);
const projects = ref([]);
const categories = [
  { name: '任务看板', icon: '📋', route: 'task-board' },
  { name: '项目列表', icon: '📁', route: 'project-list' },
  { name: '团队成员', icon: '👥', route: 'member-list' },
  { name: '我的任务', icon: '✅', route: 'todo-tasks' },
];

onMounted(async () => {
  tasks.value = await fetchList('taskBoard');
  projects.value = await fetchList('projects');
  loading.value = false;
});
</script>
