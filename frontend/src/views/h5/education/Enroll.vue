<template>
  <div class="edu-enroll">
    <div class="h5-form">
      <div class="enroll-header">
        <span class="enroll-icon">📘</span>
        <div class="enroll-info">
          <div class="enroll-name">{{ courseName }}</div>
          <div class="enroll-price" :style="{ color: themeColor }">¥{{ coursePrice }}</div>
        </div>
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>学员姓名</div>
        <el-input v-model="form.name" placeholder="请输入姓名" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>手机号码</div>
        <el-input v-model="form.phone" placeholder="请输入手机号" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>电子邮箱</div>
        <el-input v-model="form.email" placeholder="请输入邮箱" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label">学习目标</div>
        <el-input v-model="form.goal" type="textarea" placeholder="选填" :rows="2" size="small" />
      </div>
      <div class="form-actions">
        <button class="submit-btn" :style="{ background: themeColor }" @click="submitEnroll">
          确认报名 ¥{{ coursePrice }}
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
setLayout({ title: '课程报名', showBack: true, showTabbar: false });

const form = ref({ name: '', phone: '', email: '', goal: '' });
const courseName = ref('');
const coursePrice = ref(0);

onMounted(async () => {
  const course = await fetchDetail('courseList', route.params.id);
  if (course) {
    courseName.value = course.name;
    coursePrice.value = course.price;
  }
});

const submitEnroll = async () => {
  if (!form.value.name) return ElMessage.warning('请输入姓名');
  if (!form.value.phone) return ElMessage.warning('请输入手机号');
  if (!form.value.email) return ElMessage.warning('请输入邮箱');
  const result = await submitData('studentList', {
    name: form.value.name,
    phone: form.value.phone,
    email: form.value.email,
    course: courseName.value,
    amount: coursePrice.value,
    status: '已报名',
  });
  if (result) navigateTo(`enroll-success/${result.id}`);
  else ElMessage.error('报名失败');
};
</script>

<style lang="scss" scoped>
.enroll-header {
  display: flex;
  gap: 10px;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 8px;
  .enroll-icon {
    font-size: 36px;
  }
  .enroll-info {
    .enroll-name {
      font-size: 14px;
      font-weight: 600;
      color: #333;
    }
    .enroll-price {
      font-size: 18px;
      font-weight: 700;
    }
  }
}
</style>
