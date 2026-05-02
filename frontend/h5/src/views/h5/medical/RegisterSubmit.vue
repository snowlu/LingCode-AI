<template>
  <div class="med-register-submit">
    <div class="h5-form">
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>患者姓名</div>
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
        <div class="form-label">症状描述</div>
        <el-input
          v-model="form.symptom"
          type="textarea"
          placeholder="选填"
          :rows="2"
          size="small"
        />
      </div>
      <div class="fee-card">
        <span>挂号费</span><span class="fee-amount" :style="{ color: themeColor }">¥{{ fee }}</span>
      </div>
      <div class="form-actions">
        <button class="submit-btn" :style="{ background: themeColor }" @click="submitRegister">
          确认挂号
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
setLayout({ title: '预约挂号', showBack: true, showTabbar: false });
const form = ref({ name: '', idCard: '', phone: '', symptom: '' });
const fee = ref(50);
onMounted(async () => {
  const doctor = await fetchDetail('doctorSchedule', route.params.id);
  if (doctor) fee.value = doctor.fee || doctor.price || 50;
});
const submitRegister = async () => {
  if (!form.value.name || !form.value.idCard || !form.value.phone)
    return ElMessage.warning('请填写完整信息');
  const result = await submitData('registration', {
    ...form.value,
    fee: fee.value,
    status: '已预约',
  });
  if (result) navigateTo(`register-success/${result.id}`);
};
</script>

<style lang="scss" scoped>
.fee-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 8px;
  font-size: 14px;
  .fee-amount {
    font-size: 20px;
    font-weight: 700;
  }
}
</style>
