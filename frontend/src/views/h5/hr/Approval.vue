<template>
  <div class="hr-approval">
    <div class="tab-bar">
      <div
        :class="['tab-item', { active: tab === 'pending' }]"
        :style="tab === 'pending' ? { color: themeColor } : {}"
        @click="tab = 'pending'"
      >
        待办审批
      </div>
      <div
        :class="['tab-item', { active: tab === 'done' }]"
        :style="tab === 'done' ? { color: themeColor } : {}"
        @click="tab = 'done'"
      >
        已办审批
      </div>
    </div>
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="currentList.length" class="h5-list" style="padding-bottom: 80px">
      <div
        v-for="item in currentList"
        :key="item.id"
        class="list-card"
        @click="navigateTo(`leave-detail/${item.id}`)"
      >
        <div class="list-img">📋</div>
        <div class="list-info">
          <h4>{{ item.applicant || item.name }} - {{ item.type || '请假' }}</h4>
          <div class="list-bottom">
            <span class="list-price" :style="{ color: themeColor }">{{ item.status }}</span
            ><span class="list-sales">{{ item.days || '' }}天</span>
          </div>
        </div>
        <button
          v-if="tab === 'pending'"
          class="approve-btn"
          :style="{ background: themeColor }"
          @click.stop="approveItem(item)"
        >
          审批
        </button>
      </div>
    </div>
    <div v-else class="h5-empty">
      <div class="empty-icon">📋</div>
      <div class="empty-text">暂无审批</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, fetchList, updateData, setLayout } = useH5Page();
setLayout({ title: '审批中心', showBack: false, showTabbar: true, activeTab: 'approval' });
const loading = ref(true);
const tab = ref('pending');
const items = ref([]);
const currentList = computed(() =>
  tab.value === 'pending'
    ? items.value.filter(i => i.status === '待审批')
    : items.value.filter(i => i.status !== '待审批')
);
onMounted(async () => {
  items.value = await fetchList('leaveApproval');
  loading.value = false;
});
const approveItem = async item => {
  await updateData('leaveApproval', { id: item.id, status: '已批准' });
  item.status = '已批准';
  ElMessage.success('已审批通过');
};
</script>

<style lang="scss" scoped>
.tab-bar {
  display: flex;
  background: #fff;
  .tab-item {
    flex: 1;
    text-align: center;
    padding: 12px 0;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    &.active {
      font-weight: 600;
      border-bottom-color: var(--theme);
    }
  }
}
.approve-btn {
  padding: 4px 12px;
  border-radius: 12px;
  border: none;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
}
</style>
