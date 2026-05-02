<template>
  <div class="fin-invoice">
    <div class="h5-form">
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>发票类型</div>
        <el-select v-model="form.type" size="small" style="width: 100%"
          ><el-option label="增值税普通发票" value="普通" /><el-option
            label="增值税专用发票"
            value="专用"
        /></el-select>
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>发票代码</div>
        <el-input v-model="form.code" placeholder="请输入" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>发票号码</div>
        <el-input v-model="form.number" placeholder="请输入" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>开票金额</div>
        <el-input v-model="form.amount" type="number" placeholder="请输入" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label">上传发票图片</div>
        <div class="upload-area"><span>📎 点击上传</span></div>
      </div>
      <div class="form-actions">
        <button class="submit-btn" :style="{ background: themeColor }" @click="submitInvoice">
          录入发票
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useH5Page } from '../useH5Page';
const { themeColor, submitData, setLayout } = useH5Page();
setLayout({ title: '发票上传', showBack: true, showTabbar: false });
const form = ref({ type: '', code: '', number: '', amount: '' });
const submitInvoice = async () => {
  if (!form.value.type || !form.value.code || !form.value.number || !form.value.amount)
    return ElMessage.warning('请填写完整信息');
  await submitData('invoiceInput', { ...form.value, status: '已录入' });
  ElMessage.success('发票录入成功');
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
