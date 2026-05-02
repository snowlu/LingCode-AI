<template>
  <div class="hr-attendance">
    <div
      class="clock-card"
      :style="{
        background: `linear-gradient(135deg, ${themeColor}, ${adjustColor(themeColor, 30)})`,
      }"
    >
      <div class="clock-time">{{ currentTime }}</div>
      <div class="clock-date">{{ currentDate }}</div>
      <button class="clock-btn" @click="handlePunch">
        {{ punchedIn ? '签退打卡' : '签到打卡' }}
      </button>
      <div class="clock-status">{{ punchStatus }}</div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">今日打卡</div>
      <div class="punch-record">
        <span>上班签到</span><span>{{ punchInTime || '未签到' }}</span>
      </div>
      <div class="punch-record">
        <span>下班签退</span><span>{{ punchOutTime || '未签退' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useH5Page } from '../useH5Page';
const { themeColor, adjustColor, submitData, setLayout } = useH5Page();
setLayout({ title: '考勤打卡', showBack: false, showTabbar: true, activeTab: 'attendance' });
const currentTime = ref('');
const currentDate = ref('');
const punchedIn = ref(false);
const punchInTime = ref('');
const punchOutTime = ref('');
const punchStatus = ref('未打卡');
const updateTime = () => {
  const now = new Date();
  currentTime.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  currentDate.value = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
};
let _timer = null;
onMounted(() => {
  updateTime();
  _timer = setInterval(updateTime, 1000);
});
const handlePunch = async () => {
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  if (!punchedIn.value) {
    punchInTime.value = timeStr;
    punchedIn.value = true;
    punchStatus.value = '已签到';
    await submitData('punchRecord', {
      name: '张三',
      date: currentDate.value,
      punchIn: timeStr,
      status: '正常',
    });
    ElMessage.success('签到成功');
  } else {
    punchOutTime.value = timeStr;
    punchStatus.value = '已签退';
    ElMessage.success('签退成功');
  }
};
</script>

<style lang="scss" scoped>
.clock-card {
  margin: 12px;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  color: #fff;
  .clock-time {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  .clock-date {
    font-size: 13px;
    opacity: 0.8;
    margin-bottom: 16px;
  }
  .clock-btn {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 12px;
  }
  .clock-status {
    font-size: 13px;
    opacity: 0.8;
  }
}
.detail-section {
  background: #fff;
  margin: 8px 12px;
  border-radius: 12px;
  padding: 12px;
  .detail-section-title {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }
}
.punch-record {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 13px;
  border-bottom: 1px solid #f5f5f5;
}
</style>
