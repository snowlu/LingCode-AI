<template>
  <div class="hr-leave-apply">
    <div class="h5-form">
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>请假类型</div>
        <el-select v-model="form.type" size="small" style="width: 100%"
          ><el-option label="年假" value="年假" /><el-option label="病假" value="病假" /><el-option
            label="事假"
            value="事假" /><el-option label="调休" value="调休"
        /></el-select>
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>开始日期</div>
        <el-input v-model="form.startDate" placeholder="如 2026-05-01" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>结束日期</div>
        <el-input v-model="form.endDate" placeholder="如 2026-05-03" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>请假天数</div>
        <el-input v-model="form.days" type="number" placeholder="请输入" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>请假原因</div>
        <el-input
          v-model="form.reason"
          type="textarea"
          placeholder="请详细说明"
          :rows="3"
          size="small"
        />
      </div>
      <div class="form-actions">
        <button class="submit-btn" :style="{ background: themeColor }" @click="submitLeave">
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

const { themeColor, navigateTo, fetchList, submitData, setLayout } = useH5Page();
setLayout({ title: '请假申请', showBack: true, showTabbar: false });

const form = ref({ type: '', startDate: '', endDate: '', days: '', reason: '' });
const userName = ref('员工');

onMounted(async () => {
  const members = await fetchList('employeeArchive', { pageSize: 1 });
  if (members.length) userName.value = members[0].name || '员工';
});

const submitLeave = async () => {
  if (!form.value.type || !form.value.startDate || !form.value.endDate || !form.value.days || !form.value.reason)
    return ElMessage.warning('请填写完整信息');
  const result = await submitData('leaveApproval', {
    ...form.value,
    applicant: userName.value,
    status: '待审批',
  });
  if (result) {
    ElMessage.success('提交成功');
    navigateTo(`leave-detail/${result.id}`);
  }
};
</script>
