<template>
  <div class="form-page">
    <h2 class="page-title">{{ pageData?.title || '信息录入' }}</h2>
    <div class="form-card">
      <el-form :model="form" label-width="100px" style="max-width: 600px">
        <el-form-item label="名称"
          ><el-input v-model="form.name" placeholder="请输入名称"
        /></el-form-item>
        <el-form-item label="编号"
          ><el-input v-model="form.code" placeholder="请输入编号"
        /></el-form-item>
        <el-form-item label="分类">
          <el-select v-model="form.category" style="width: 100%" placeholder="请选择分类">
            <el-option label="分类一" value="1" /><el-option label="分类二" value="2" /><el-option
              label="分类三"
              value="3"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="日期"
          ><el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
        /></el-form-item>
        <el-form-item label="优先级">
          <el-radio-group v-model="form.priority"
            ><el-radio label="高" /><el-radio label="中" /><el-radio label="低"
          /></el-radio-group>
        </el-form-item>
        <el-form-item label="启用"
          ><el-switch v-model="form.enabled" active-text="是" inactive-text="否"
        /></el-form-item>
        <el-form-item label="备注"
          ><el-input v-model="form.remark" type="textarea" :rows="3" placeholder="请输入备注信息"
        /></el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleSubmit">{{
            loading ? '提交中...' : '提交'
          }}</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
defineProps({
  config: { type: Object, default: () => ({}) },
  pageKey: { type: String, default: '' },
  pageData: { type: Object, default: () => ({}) },
});

const loading = ref(false);
const form = ref({
  name: '',
  code: '',
  category: '',
  date: '',
  priority: '中',
  enabled: true,
  remark: '',
});

const handleSubmit = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    ElMessage.success('提交成功');
  }, 800);
};
const handleReset = () => {
  form.value = {
    name: '',
    code: '',
    category: '',
    date: '',
    priority: '中',
    enabled: true,
    remark: '',
  };
};
</script>

<style lang="scss" scoped>
.form-page {
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}
.form-card {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
</style>
