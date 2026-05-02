<template>
  <div class="forms-page">
    <h2 class="page-title">表单页面</h2>
    <el-tabs v-model="activeTab" type="border-card">
      <el-tab-pane label="基础表单" name="basic">
        <el-form :model="basicForm" label-width="100px" style="max-width: 600px">
          <el-form-item label="名称"
            ><el-input v-model="basicForm.name" placeholder="请输入名称"
          /></el-form-item>
          <el-form-item label="分类">
            <el-select v-model="basicForm.category" style="width: 100%">
              <el-option label="分类一" value="1" /><el-option label="分类二" value="2" /><el-option
                label="分类三"
                value="3"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="日期"
            ><el-date-picker
              v-model="basicForm.date"
              type="date"
              placeholder="选择日期"
              style="width: 100%"
          /></el-form-item>
          <el-form-item label="开关"
            ><el-switch v-model="basicForm.enabled" active-text="开启" inactive-text="关闭"
          /></el-form-item>
          <el-form-item label="备注"
            ><el-input
              v-model="basicForm.remark"
              type="textarea"
              :rows="3"
              placeholder="请输入备注"
          /></el-form-item>
          <el-form-item
            ><el-button type="primary" @click="handleSubmit('基础表单')">提交</el-button
            ><el-button @click="resetBasicForm">重置</el-button></el-form-item
          >
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="分步表单" name="step">
        <el-steps
          :active="currentStep"
          finish-status="success"
          align-center
          style="margin-bottom: 30px"
        >
          <el-step title="基本信息" /><el-step title="详细信息" /><el-step title="确认提交" />
        </el-steps>
        <div style="max-width: 600px; margin: 0 auto">
          <div v-if="currentStep === 0">
            <el-form :model="stepForm" label-width="100px">
              <el-form-item label="项目名称"
                ><el-input v-model="stepForm.projectName" placeholder="请输入项目名称"
              /></el-form-item>
              <el-form-item label="负责人"
                ><el-input v-model="stepForm.manager" placeholder="请输入负责人"
              /></el-form-item>
              <el-form-item
                ><el-button type="primary" @click="currentStep = 1">下一步</el-button></el-form-item
              >
            </el-form>
          </div>
          <div v-if="currentStep === 1">
            <el-form :model="stepForm" label-width="100px">
              <el-form-item label="项目描述"
                ><el-input
                  v-model="stepForm.description"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入项目描述"
              /></el-form-item>
              <el-form-item label="优先级">
                <el-radio-group v-model="stepForm.priority"
                  ><el-radio label="高" /><el-radio label="中" /><el-radio label="低"
                /></el-radio-group>
              </el-form-item>
              <el-form-item
                ><el-button @click="currentStep = 0">上一步</el-button
                ><el-button type="primary" @click="currentStep = 2">下一步</el-button></el-form-item
              >
            </el-form>
          </div>
          <div v-if="currentStep === 2">
            <el-descriptions title="确认信息" :column="1" border>
              <el-descriptions-item label="项目名称">{{
                stepForm.projectName
              }}</el-descriptions-item>
              <el-descriptions-item label="负责人">{{ stepForm.manager }}</el-descriptions-item>
              <el-descriptions-item label="项目描述">{{
                stepForm.description
              }}</el-descriptions-item>
              <el-descriptions-item label="优先级">{{ stepForm.priority }}</el-descriptions-item>
            </el-descriptions>
            <div style="margin-top: 20px; text-align: center">
              <el-button @click="currentStep = 1">上一步</el-button>
              <el-button type="primary" @click="handleSubmit('分步表单')">提交</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="高级表单" name="advanced">
        <el-form :model="advancedForm" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="12"
              ><el-form-item label="姓名"><el-input v-model="advancedForm.name" /></el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item label="手机号"><el-input v-model="advancedForm.phone" /></el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item label="邮箱"><el-input v-model="advancedForm.email" /></el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item label="部门"
                ><el-select v-model="advancedForm.dept" style="width: 100%"
                  ><el-option label="技术部" value="技术部" /><el-option
                    label="产品部"
                    value="产品部" /><el-option
                    label="市场部"
                    value="市场部" /></el-select></el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item label="入职日期"
                ><el-date-picker
                  v-model="advancedForm.joinDate"
                  type="date"
                  style="width: 100%" /></el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item label="职级"
                ><el-input-number
                  v-model="advancedForm.level"
                  :min="1"
                  :max="10"
                  style="width: 100%" /></el-form-item
            ></el-col>
            <el-col :span="24"
              ><el-form-item label="技能标签"
                ><el-checkbox-group v-model="advancedForm.skills"
                  ><el-checkbox label="Vue" /><el-checkbox label="React" /><el-checkbox
                    label="Node.js" /><el-checkbox label="Python" /><el-checkbox
                    label="Java" /></el-checkbox-group></el-form-item
            ></el-col>
            <el-col :span="24"
              ><el-form-item label="自我评价"
                ><el-input v-model="advancedForm.bio" type="textarea" :rows="3" /></el-form-item
            ></el-col>
          </el-row>
          <el-form-item
            ><el-button type="primary" @click="handleSubmit('高级表单')">提交</el-button
            ><el-button @click="resetAdvancedForm">重置</el-button></el-form-item
          >
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
defineProps({ config: { type: Object, required: true } });

const activeTab = ref('basic');
const currentStep = ref(0);

const basicForm = ref({ name: '', category: '', date: '', enabled: true, remark: '' });
const stepForm = ref({ projectName: '', manager: '', description: '', priority: '中' });
const advancedForm = ref({
  name: '',
  phone: '',
  email: '',
  dept: '',
  joinDate: '',
  level: 1,
  skills: [],
  bio: '',
});

const handleSubmit = type => {
  ElMessage.success(`${type}提交成功！`);
};
const resetBasicForm = () => {
  basicForm.value = { name: '', category: '', date: '', enabled: true, remark: '' };
};
const resetAdvancedForm = () => {
  advancedForm.value = {
    name: '',
    phone: '',
    email: '',
    dept: '',
    joinDate: '',
    level: 1,
    skills: [],
    bio: '',
  };
};
</script>

<style lang="scss" scoped>
.forms-page {
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
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}
:deep(.el-tabs__content) {
  padding: 20px;
}
</style>
