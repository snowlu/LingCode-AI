<template>
  <div class="com-repair-apply">
    <div class="h5-form">
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>报修类型</div>
        <el-select v-model="form.type" size="small" style="width: 100%"
          ><el-option label="水电" value="水电" /><el-option label="门窗" value="门窗" /><el-option
            label="电梯"
            value="电梯" /><el-option label="其他" value="其他"
        /></el-select>
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>问题描述</div>
        <el-input
          v-model="form.description"
          type="textarea"
          placeholder="请详细描述问题"
          :rows="3"
          size="small"
        />
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>紧急程度</div>
        <el-radio-group v-model="form.urgency" size="small"
          ><el-radio-button label="普通" /><el-radio-button label="紧急"
        /></el-radio-group>
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>联系电话</div>
        <el-input v-model="form.phone" placeholder="请输入" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label">上传照片</div>
        <div class="upload-area"><span>📎 点击上传照片</span></div>
      </div>
      <div class="form-actions">
        <button class="submit-btn" :style="{ background: themeColor }" @click="submitRepair">
          提交报修
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, submitData, setLayout } = useH5Page();
setLayout({ title: '报修申请', showBack: false, showTabbar: true, activeTab: 'repair' });
const form = ref({ type: '', description: '', urgency: '普通', phone: '' });
const submitRepair = async () => {
  if (!form.value.type || !form.value.description || !form.value.phone)
    return ElMessage.warning('请填写完整信息');
  const result = await submitData('repairList', {
    ...form.value,
    resident: '张先生',
    status: '待处理',
  });
  if (result) {
    ElMessage.success('报修提交成功');
    navigateTo(`repair-progress/${result.id}`);
  }
};
</script>

<style lang="scss" scoped>
.upload-area {
  padding: 20px;
  border: 1px dashed #ddd;
  border-radius: 8px;
  text-align: center;
  color: #999;
  font-size: 13px;
  cursor: pointer;
}
</style>
