<template>
  <div class="med-dept-list">
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 4" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else class="dept-grid">
      <div
        v-for="dept in departments"
        :key="dept.name"
        class="dept-item"
        @click="navigateTo(`doctor-list?dept=${dept.name}`)"
      >
        <span class="dept-icon">{{ dept.icon }}</span
        ><span class="dept-name">{{ dept.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useH5Page } from '../useH5Page';
const { navigateTo, setLayout } = useH5Page();
setLayout({ title: '科室列表', showBack: true, showTabbar: false });
const loading = ref(false);
const departments = [
  { name: '内科', icon: '🫀' },
  { name: '外科', icon: '🦴' },
  { name: '儿科', icon: '👶' },
  { name: '妇科', icon: '👩‍⚕️' },
  { name: '眼科', icon: '👁️' },
  { name: '口腔科', icon: '🦷' },
  { name: '中医科', icon: '🌿' },
  { name: '皮肤科', icon: '🧴' },
  { name: '骨科', icon: '🦴' },
  { name: '神经科', icon: '🧠' },
  { name: '心内科', icon: '❤️' },
  { name: '消化科', icon: '🫁' },
];
</script>

<style lang="scss" scoped>
.dept-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 12px;
  .dept-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px;
    background: #fff;
    border-radius: 12px;
    cursor: pointer;
    &:active {
      background: #f5f5f5;
    }
    .dept-icon {
      font-size: 32px;
    }
    .dept-name {
      font-size: 13px;
      color: #333;
      font-weight: 500;
    }
  }
}
</style>
