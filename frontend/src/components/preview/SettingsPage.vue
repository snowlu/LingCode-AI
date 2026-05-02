<template>
  <div class="settings-page">
    <h2 class="page-title">系统设置</h2>
    <el-tabs v-model="activeTab" type="border-card">
      <el-tab-pane label="个人中心" name="profile">
        <div class="profile-section">
          <div class="avatar-section">
            <el-avatar :size="80" :style="{ background: config.color, fontSize: '32px' }"
              >A</el-avatar
            >
            <el-button size="small" style="margin-top: 12px">更换头像</el-button>
          </div>
          <el-form :model="profileForm" label-width="100px" style="flex: 1; max-width: 500px">
            <el-form-item label="用户名"><el-input v-model="profileForm.username" /></el-form-item>
            <el-form-item label="昵称"><el-input v-model="profileForm.nickname" /></el-form-item>
            <el-form-item label="邮箱"><el-input v-model="profileForm.email" /></el-form-item>
            <el-form-item label="手机号"><el-input v-model="profileForm.phone" /></el-form-item>
            <el-form-item label="个人简介"
              ><el-input v-model="profileForm.bio" type="textarea" :rows="3"
            /></el-form-item>
            <el-form-item
              ><el-button type="primary" @click="handleSave('个人资料')"
                >保存修改</el-button
              ></el-form-item
            >
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="password">
        <el-form :model="passwordForm" label-width="100px" style="max-width: 500px">
          <el-form-item label="当前密码"
            ><el-input
              v-model="passwordForm.oldPassword"
              type="password"
              show-password
              placeholder="请输入当前密码"
          /></el-form-item>
          <el-form-item label="新密码"
            ><el-input
              v-model="passwordForm.newPassword"
              type="password"
              show-password
              placeholder="请输入新密码"
          /></el-form-item>
          <el-form-item label="确认密码"
            ><el-input
              v-model="passwordForm.confirmPassword"
              type="password"
              show-password
              placeholder="请再次输入新密码"
          /></el-form-item>
          <el-form-item>
            <div class="password-tips">
              <p>密码要求：</p>
              <ul>
                <li>长度为 8-20 个字符</li>
                <li>必须包含字母和数字</li>
                <li>不能与旧密码相同</li>
              </ul>
            </div>
          </el-form-item>
          <el-form-item
            ><el-button type="primary" @click="handleChangePassword"
              >修改密码</el-button
            ></el-form-item
          >
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="系统配置" name="system">
        <el-form :model="systemForm" label-width="120px" style="max-width: 600px">
          <el-divider content-position="left">基本配置</el-divider>
          <el-form-item label="系统名称"><el-input v-model="systemForm.systemName" /></el-form-item>
          <el-form-item label="系统Logo"
            ><el-input v-model="systemForm.logo" placeholder="输入Logo URL"
          /></el-form-item>
          <el-form-item label="主题色">
            <div class="color-options">
              <div
                v-for="color in ['#1890ff', '#52c41a', '#faad14', '#ff4d4f', '#722ed1', '#13c2c2']"
                :key="color"
                class="color-item"
                :class="{ active: systemForm.primaryColor === color }"
                :style="{ background: color }"
                @click="systemForm.primaryColor = color"
              ></div>
            </div>
          </el-form-item>
          <el-divider content-position="left">功能配置</el-divider>
          <el-form-item label="开启注册"
            ><el-switch v-model="systemForm.allowRegister"
          /></el-form-item>
          <el-form-item label="数据缓存"
            ><el-switch v-model="systemForm.enableCache"
          /></el-form-item>
          <el-form-item label="操作日志"><el-switch v-model="systemForm.enableLog" /></el-form-item>
          <el-form-item label="每页条数">
            <el-select v-model="systemForm.pageSize" style="width: 200px">
              <el-option :label="10" :value="10" /><el-option :label="20" :value="20" /><el-option
                :label="50"
                :value="50"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            ><el-button type="primary" @click="handleSave('系统配置')">保存配置</el-button
            ><el-button @click="resetSystemForm">恢复默认</el-button></el-form-item
          >
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
const props = defineProps({ config: { type: Object, required: true } });

const activeTab = ref('profile');

const profileForm = ref({
  username: 'admin',
  nickname: '管理员',
  email: 'admin@example.com',
  phone: '13800138000',
  bio: '系统超级管理员，负责平台日常运维管理。',
});
const passwordForm = ref({ oldPassword: '', newPassword: '', confirmPassword: '' });
const systemForm = ref({
  systemName: props.config.name || '管理系统',
  logo: '',
  primaryColor: props.config.color || '#1890ff',
  allowRegister: true,
  enableCache: true,
  enableLog: true,
  pageSize: 10,
});

const handleSave = type => {
  ElMessage.success(`${type}保存成功`);
};

const handleChangePassword = () => {
  if (!passwordForm.value.oldPassword || !passwordForm.value.newPassword) {
    ElMessage.warning('请填写完整密码信息');
    return;
  }
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    ElMessage.error('两次输入的密码不一致');
    return;
  }
  ElMessage.success('密码修改成功');
  passwordForm.value = { oldPassword: '', newPassword: '', confirmPassword: '' };
};

const resetSystemForm = () => {
  systemForm.value = {
    systemName: props.config.name || '管理系统',
    logo: '',
    primaryColor: props.config.color || '#1890ff',
    allowRegister: true,
    enableCache: true,
    enableLog: true,
    pageSize: 10,
  };
  ElMessage.info('已恢复默认配置');
};
</script>

<style lang="scss" scoped>
.settings-page {
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
.profile-section {
  display: flex;
  gap: 30px;
  padding: 10px;
}
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.password-tips {
  background: #f5f7fa;
  padding: 12px 16px;
  border-radius: 6px;
  p {
    font-weight: 600;
    margin-bottom: 6px;
    color: #333;
  }
  ul {
    padding-left: 18px;
    li {
      line-height: 2;
      color: #666;
      font-size: 13px;
    }
  }
}
.color-options {
  display: flex;
  gap: 10px;
  .color-item {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s;
    border: 3px solid transparent;
    &:hover {
      transform: scale(1.15);
    }
    &.active {
      border-color: #333;
      box-shadow:
        0 0 0 2px white,
        0 0 0 4px #333;
    }
  }
}
:deep(.el-tabs__content) {
  padding: 20px;
}
</style>
