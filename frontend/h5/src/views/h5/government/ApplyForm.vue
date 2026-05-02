<template>
  <div class="gov-apply-form">
    <div class="h5-form">
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>申请人姓名</div>
        <el-input v-model="form.name" placeholder="请输入" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>身份证号</div>
        <el-input v-model="form.idCard" placeholder="请输入" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>联系电话</div>
        <el-input v-model="form.phone" placeholder="请输入" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>办理事项</div>
        <el-input v-model="form.itemName" disabled size="small" />
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>申请原因</div>
        <el-input
          v-model="form.reason"
          type="textarea"
          placeholder="请详细说明"
          :rows="3"
          size="small"
        />
      </div>
      <div class="form-group">
        <div class="form-label">上传材料</div>
        <div class="upload-area"><span>📎 点击上传附件</span></div>
      </div>
      <div class="form-actions">
        <button class="submit-btn" :style="{ background: themeColor }" @click="submitApply">
          提交申请
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, fetchDetail, submitData, setLayout, route } = useH5Page();
setLayout({ title: '在线申请', showBack: true, showTabbar: false });
const form = ref({ name: '', idCard: '', phone: '', itemName: '', reason: '' });
onMounted(async () => {
  const item = await fetchDetail('itemList', route.params.id);
  if (item) form.value.itemName = item.name;
});
const submitApply = async () => {
  if (!form.value.name || !form.value.idCard || !form.value.phone || !form.value.reason)
    return ElMessage.warning('请填写完整信息');
  const result = await submitData('pending', { ...form.value, status: '待审批' });
  if (result) navigateTo(`apply-success/${result.id}`);
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
