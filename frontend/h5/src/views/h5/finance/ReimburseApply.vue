<template>
  <div class="fin-reimburse-apply">
    <div class="h5-form">
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>报销类型</div>
        <el-select v-model="form.type" size="small" style="width: 100%"
          ><el-option label="差旅费" value="差旅费" /><el-option
            label="办公用品"
            value="办公用品" /><el-option label="招待费" value="招待费" /><el-option
            label="培训费"
            value="培训费"
        /></el-select>
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>报销金额</div>
        <el-input v-model="form.amount" type="number" placeholder="请输入金额" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>报销说明</div>
        <el-input
          v-model="form.description"
          type="textarea"
          placeholder="请详细说明"
          :rows="3"
          size="small"
        />
      </div>
      <div class="form-group">
        <div class="form-label">上传发票</div>
        <div class="upload-area"><span>📎 点击上传发票</span></div>
      </div>
      <div class="form-actions">
        <button class="submit-btn" :style="{ background: themeColor }" @click="submitReimburse">
          提交报销
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
setLayout({ title: '报销申请', showBack: true, showTabbar: false });
const form = ref({ type: '', amount: '', description: '' });
const submitReimburse = async () => {
  if (!form.value.type || !form.value.amount || !form.value.description)
    return ElMessage.warning('请填写完整信息');
  const result = await submitData('reimburse', {
    ...form.value,
    applicant: '张三',
    status: '待审批',
  });
  if (result) {
    ElMessage.success('提交成功');
    navigateTo(`reimburse-detail/${result.id}`);
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
