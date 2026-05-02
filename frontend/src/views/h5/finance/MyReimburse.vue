<template>
  <div class="fin-my-reimburse">
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="records.length" class="h5-list" style="padding-bottom: 80px">
      <div
        v-for="item in records"
        :key="item.id"
        class="list-card"
        @click="navigateTo(`reimburse-detail/${item.id}`)"
      >
        <div class="list-img">🧾</div>
        <div class="list-info">
          <h4>{{ item.applicant || item.name }} - {{ item.type || '' }}</h4>
          <div class="list-bottom">
            <span class="list-price" :style="{ color: themeColor }">¥{{ item.amount || 0 }}</span
            ><span class="list-sales">{{ item.status }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="h5-empty">
      <div class="empty-icon">🧾</div>
      <div class="empty-text">暂无报销记录</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '我的报销', showBack: true, showTabbar: false });
const loading = ref(true);
const records = ref([]);
onMounted(async () => {
  records.value = await fetchList('reimburse');
  loading.value = false;
});
</script>
