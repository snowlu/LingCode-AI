<template>
  <div class="gov-service-category">
    <div class="category-sidebar">
      <div
        v-for="(cat, i) in categoryList"
        :key="i"
        :class="['sidebar-item', { active: activeIdx === i }]"
        :style="activeIdx === i ? { color: themeColor, borderLeftColor: themeColor } : {}"
        @click="activeIdx = i"
      >
        {{ cat.name }}
      </div>
    </div>
    <div class="category-content">
      <div class="sub-grid">
        <div
          v-for="sub in currentSubs"
          :key="sub"
          class="sub-item"
          @click="navigateTo(`item-list?category=${sub}`)"
        >
          <span class="sub-icon">📋</span><span class="sub-name">{{ sub }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, setLayout } = useH5Page();
setLayout({ title: '办事分类', showBack: false, showTabbar: true, activeTab: 'service' });
const activeIdx = ref(0);
const categoryList = [
  { name: '社保服务', subs: ['社保查询', '社保转移', '社保缴费', '社保卡办理'] },
  { name: '户政办理', subs: ['户口迁移', '居住证', '身份证', '出生登记'] },
  { name: '工商注册', subs: ['营业执照', '变更登记', '注销登记', '年报公示'] },
  { name: '税务服务', subs: ['纳税申报', '发票领用', '税收优惠', '税务咨询'] },
];
const currentSubs = computed(() => categoryList[activeIdx.value]?.subs || []);
</script>

<style lang="scss" scoped>
.gov-service-category {
  display: flex;
  height: 100%;
}
.category-sidebar {
  width: 80px;
  background: #f5f5f5;
  overflow-y: auto;
  flex-shrink: 0;
  .sidebar-item {
    padding: 14px 8px;
    font-size: 12px;
    text-align: center;
    border-left: 3px solid transparent;
    cursor: pointer;
    &.active {
      background: #fff;
      font-weight: 600;
    }
  }
}
.category-content {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  .sub-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .sub-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 12px;
    background: #fff;
    border-radius: 8px;
    cursor: pointer;
    &:active {
      background: #f5f5f5;
    }
    .sub-icon {
      font-size: 28px;
    }
    .sub-name {
      font-size: 12px;
      color: #333;
    }
  }
}
</style>
