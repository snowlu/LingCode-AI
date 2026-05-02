<template>
  <div class="res-product-category">
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
          @click="navigateTo(`product-list?category=${sub}`)"
        >
          <span class="sub-icon">🍽️</span><span class="sub-name">{{ sub }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useH5Page } from '../useH5Page';
const { themeColor, navigateTo, setLayout } = useH5Page();
setLayout({ title: '商品分类', showBack: false, showTabbar: true, activeTab: 'menu' });
const activeIdx = ref(0);
const categoryList = [
  { name: '招牌菜', subs: ['宫保鸡丁', '红烧肉', '酸菜鱼', '清蒸鲈鱼'] },
  { name: '主食', subs: ['蛋炒饭', '面条', '水饺', '包子'] },
  { name: '小吃', subs: ['春卷', '煎饺', '小笼包', '烤串'] },
  { name: '饮品', subs: ['奶茶', '果汁', '咖啡', '茶'] },
];
const currentSubs = computed(() => categoryList[activeIdx.value]?.subs || []);
</script>

<style lang="scss" scoped>
.res-product-category {
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
