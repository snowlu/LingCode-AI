<template>
  <div class="com-activity-enroll">
    <div class="h5-form">
      <div class="activity-header">
        <span class="activity-icon">🎉</span>
        <div class="activity-name">{{ activityName }}</div>
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>参与人姓名</div>
        <el-input v-model="form.name" placeholder="请输入" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>联系电话</div>
        <el-input v-model="form.phone" placeholder="请输入" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label">参与人数</div>
        <el-input v-model="form.count" type="number" placeholder="1" size="small" />
      </div>
      <div class="form-actions">
        <button class="submit-btn" :style="{ background: themeColor }" @click="submitEnroll">
          确认报名
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useH5Page } from '../useH5Page';
const { themeColor, fetchDetail, submitData, setLayout, route } = useH5Page();
setLayout({ title: '活动报名', showBack: true, showTabbar: false });
const form = ref({ name: '', phone: '', count: '1' });
const activityName = ref('社区活动');
onMounted(async () => {
  const item = await fetchDetail('publicFacility', route.params.id);
  if (item) activityName.value = item.name || '社区活动';
});
const submitEnroll = async () => {
  if (!form.value.name || !form.value.phone) return ElMessage.warning('请填写完整信息');
  await submitData('repairList', {
    ...form.value,
    type: '活动报名',
    activity: activityName.value,
    status: '已报名',
  });
  ElMessage.success('报名成功');
};
</script>

<style lang="scss" scoped>
.activity-header {
  display: flex;
  gap: 10px;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 8px;
  .activity-icon {
    font-size: 32px;
  }
  .activity-name {
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }
}
</style>
