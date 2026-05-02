<template>
  <div class="com-notice-detail">
    <div v-if="loading" class="h5-loading"><div class="skeleton-card"></div></div>
    <template v-else-if="notice">
      <div class="notice-header">
        <div class="notice-title">{{ notice.title || notice.name }}</div>
        <div class="notice-meta">
          <span>{{ notice.createdAt || '' }}</span>
        </div>
      </div>
      <div class="notice-content">
        <p>
          {{
            notice.content ||
            notice.description ||
            '根据社区管理规定，现就有关事项通知如下：请各位住户注意安全，遵守社区规章制度。'
          }}
        </p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';
const { fetchDetail, setLayout, route } = useH5Page();
setLayout({ title: '公告详情', showBack: true, showTabbar: false });
const loading = ref(true);
const notice = ref(null);
onMounted(async () => {
  notice.value = await fetchDetail('announcement', route.params.id);
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.notice-header {
  background: #fff;
  padding: 16px 12px;
  .notice-title {
    font-size: 16px;
    font-weight: 700;
    color: #333;
    margin-bottom: 8px;
    line-height: 1.4;
  }
  .notice-meta {
    font-size: 12px;
    color: #999;
  }
}
.notice-content {
  background: #fff;
  margin: 8px 12px;
  border-radius: 12px;
  padding: 12px;
  p {
    font-size: 14px;
    color: #333;
    line-height: 1.8;
  }
}
</style>
