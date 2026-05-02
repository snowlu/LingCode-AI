<template>
  <div class="proj-member-list">
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="members.length" class="h5-list" style="padding-bottom: 80px">
      <div v-for="item in members" :key="item.id" class="member-card">
        <div class="member-avatar">{{ (item.name || '👤').charAt(0) }}</div>
        <div class="member-info">
          <h4>{{ item.name }}</h4>
          <span>{{ item.role || item.position || '' }}</span>
        </div>
      </div>
    </div>
    <div v-else class="h5-empty">
      <div class="empty-icon">👥</div>
      <div class="empty-text">暂无成员</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { fetchList, setLayout } = useH5Page();
setLayout({ title: '团队成员', showBack: true, showTabbar: false });
const loading = ref(true);
const members = ref([]);
onMounted(async () => {
  members.value = await fetchList('teamMember');
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.member-card {
  display: flex;
  gap: 12px;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  align-items: center;
  .member-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f5f7fa;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    color: var(--theme);
    flex-shrink: 0;
  }
  .member-info {
    flex: 1;
    h4 {
      font-size: 14px;
      font-weight: 600;
      color: #333;
      margin: 0 0 2px;
    }
    span {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
