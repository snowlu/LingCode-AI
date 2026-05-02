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
    <div class="detail-section" style="margin-top: 8px">
      <div class="detail-section-title">最近打卡记录</div>
      <div v-if="recentRecords.length" class="recent-list">
        <div v-for="r in recentRecords" :key="r.id" class="recent-item">
          <span>{{ r.date }}</span><span>{{ r.punchIn || r.checkIn || '—' }} ~ {{ r.checkOut || '—' }}</span
          ><el-tag :type="r.status === '正常' ? 'success' : 'danger'" size="small">{{ r.status }}</el-tag>
        </div>
      </div>
      <div v-else class="h5-empty" style="padding: 20px 0">
        <div class="empty-text" style="font-size: 12px">暂无记录</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useH5Page } from '../useH5Page';

const { themeColor, adjustColor, fetchList, submitData, setLayout } = useH5Page();
setLayout({ title: '考勤打卡', showBack: false, showTabbar: true, activeTab: 'attendance' });

const currentTime = ref('');
const currentDate = ref('');
const punchedIn = ref(false);
const punchInTime = ref('');
const punchOutTime = ref('');
const punchStatus = ref('未打卡');
const recentRecords = ref([]);
const userName = ref('员工');

const updateTime = () => {
  const now = new Date();
  currentTime.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  currentDate.value = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
};

let _timer = null;

onMounted(async () => {
  updateTime();
  _timer = setInterval(updateTime, 1000);
  const members = await fetchList('employeeArchive', { pageSize: 1 });
  if (members.length) userName.value = members[0].name || '员工';
  recentRecords.value = await fetchList('punchRecord', { pageSize: 5 });
});

onUnmounted(() => {
  if (_timer) clearInterval(_timer);
});

const handlePunch = async () => {
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  if (!punchedIn.value) {
    punchInTime.value = timeStr;
    punchedIn.value = true;
    punchStatus.value = '已签到';
    await submitData('punchRecord', {
      name: userName.value,
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
  recentRecords.value = await fetchList('punchRecord', { pageSize: 5 });
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
  margin: 0 12px 8px;
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
.recent-list {
  .recent-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
    font-size: 12px;
    border-bottom: 1px solid #f5f5f5;
    &:last-child { border-bottom: none; }
    span { color: #666; }
  }
}
</style>
