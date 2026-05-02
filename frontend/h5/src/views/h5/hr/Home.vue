<template>
  <div class="hr-home">
    <div class="h5-grid h5-grid-4">
      <div
        v-for="(cat, i) in categories"
        :key="i"
        class="grid-item grid-item-lg"
        @click="navigateTo(cat.route)"
      >
        <span class="grid-icon">{{ cat.icon }}</span
        ><span class="grid-label">{{ cat.name }}</span>
      </div>
    </div>
    <div class="h5-section"><span class="section-title">待办事项</span></div>
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else class="h5-list" style="padding-bottom: 80px">
      <div
        v-for="item in todos"
        :key="item.id"
        class="todo-card"
        @click="navigateTo(`leave-detail/${item.id}`)"
      >
        <div class="todo-dot" :style="{ background: themeColor }"></div>
        <div class="todo-info">
          <h4>{{ item.name }} - {{ item.status }}</h4>
          <span>{{ item.date || item.createdAt || '' }}</span>
        </div>
        <el-icon color="#ccc"><ArrowRight /></el-icon>
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
const todos = ref([]);
const categories = [
  { name: '考勤打卡', icon: '⏰', route: 'attendance' },
  { name: '请假申请', icon: '📝', route: 'leave-apply' },
  { name: '审批中心', icon: '✅', route: 'approval' },
  { name: '通讯录', icon: '📇', route: 'contacts' },
];
onMounted(async () => {
  todos.value = await fetchList('punchRecord');
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.grid-item-lg .grid-icon {
  font-size: 28px;
}
.todo-card {
  display: flex;
  gap: 10px;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  align-items: center;
  .todo-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 4px;
  }
  .todo-info {
    flex: 1;
    h4 {
      font-size: 13px;
      font-weight: 500;
      color: #333;
      margin: 0 0 2px;
    }
    span {
      font-size: 11px;
      color: #999;
    }
  }
}
</style>
