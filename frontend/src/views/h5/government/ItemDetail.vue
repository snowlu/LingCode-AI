<template>
  <div class="gov-item-detail">
    <div v-if="loading" class="h5-loading"><div class="skeleton-card"></div></div>
    <template v-else-if="item">
      <div class="detail-header" :style="{ background: themeColor }">
        <div class="detail-icon">📋</div>
        <div class="detail-name">{{ item.name }}</div>
        <div class="detail-dept">{{ item.department || '' }}</div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">办理须知</div>
        <div class="detail-row">
          <span class="label">办理时限</span
          ><span class="value">{{ item.timeLimit || '5工作日' }}</span>
        </div>
        <div class="detail-row">
          <span class="label">收费标准</span><span class="value">{{ item.fee || '免费' }}</span>
        </div>
        <div class="detail-row">
          <span class="label">办理部门</span><span class="value">{{ item.department || '' }}</span>
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">所需材料</div>
        <div v-for="m in materials" :key="m" class="material-item">
          <span class="material-check">☑️</span><span>{{ m }}</span>
        </div>
      </div>
      <div class="detail-actions">
        <button
          class="action-btn"
          :style="{ background: themeColor }"
          @click="navigateTo(`apply-form/${item.id}`)"
        >
          在线申请
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, fetchDetail, setLayout, route } = useH5Page();
setLayout({ title: '事项详情', showBack: true, showTabbar: false });
const loading = ref(true);
const item = ref(null);
const materials = ['身份证原件及复印件', '申请表', '相关证明材料', '近期免冠照片'];
onMounted(async () => {
  item.value = await fetchDetail('itemList', route.params.id);
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.detail-header {
  padding: 20px;
  text-align: center;
  color: #fff;
  .detail-icon {
    font-size: 40px;
    margin-bottom: 8px;
  }
  .detail-name {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  .detail-dept {
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
    padding: 6px 0;
    font-size: 13px;
    .label {
      color: #999;
    }
    .value {
      color: #333;
    }
  }
}
.material-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  font-size: 13px;
  color: #333;
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
