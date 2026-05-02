<template>
  <div class="log-send">
    <div class="h5-form">
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>寄件人姓名</div>
        <el-input v-model="form.senderName" placeholder="请输入" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>寄件人电话</div>
        <el-input v-model="form.senderPhone" placeholder="请输入" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>寄件地址</div>
        <el-input v-model="form.senderAddress" placeholder="请输入" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>收件人姓名</div>
        <el-input v-model="form.receiverName" placeholder="请输入" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>收件人电话</div>
        <el-input v-model="form.receiverPhone" placeholder="请输入" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>收件地址</div>
        <el-input v-model="form.receiverAddress" placeholder="请输入" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label">物品类型</div>
        <el-select v-model="form.itemType" size="small" style="width: 100%"
          ><el-option label="普通物品" value="普通" /><el-option
            label="易碎品"
            value="易碎" /><el-option label="文件" value="文件"
        /></el-select>
      </div>
      <div class="form-group">
        <div class="form-label">备注</div>
        <el-input v-model="form.remark" type="textarea" placeholder="选填" :rows="2" size="small" />
      </div>
      <div class="form-actions">
        <button class="submit-btn" :style="{ background: themeColor }" @click="submitSend">
          提交寄件
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
setLayout({ title: '我要寄件', showBack: false, showTabbar: true, activeTab: 'send' });
const form = ref({
  senderName: '',
  senderPhone: '',
  senderAddress: '',
  receiverName: '',
  receiverPhone: '',
  receiverAddress: '',
  itemType: '普通',
  remark: '',
});
const submitSend = async () => {
  if (
    !form.value.senderName ||
    !form.value.senderPhone ||
    !form.value.senderAddress ||
    !form.value.receiverName ||
    !form.value.receiverPhone ||
    !form.value.receiverAddress
  )
    return ElMessage.warning('请填写完整信息');
  const result = await submitData('waybillList', { ...form.value, status: '待取件' });
  if (result) navigateTo(`send-success/${result.id}`);
};
</script>
