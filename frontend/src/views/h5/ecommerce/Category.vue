<template>
  <div class="ecom-category">
    <div class="h5-search">
      <el-icon><Search /></el-icon>
      <el-input v-model="keyword" placeholder="搜索商品" size="small" @keyup.enter="handleSearch" />
    </div>
    <div class="category-layout">
      <div class="category-sidebar">
        <div
          v-for="(cat, i) in categoryList"
          :key="i"
          :class="['sidebar-item', { active: activeCategory === i }]"
          :style="activeCategory === i ? { color: themeColor, borderLeftColor: themeColor } : {}"
          @click="activeCategory = i"
        >
          {{ cat.name }}
        </div>
      </div>
      <div class="category-content">
        <div class="sub-grid">
          <div
            v-for="sub in currentSubCategories"
            :key="sub"
            class="sub-item"
            @click="navigateTo(`product-list?category=${sub}`)"
          >
            <span class="sub-icon">📦</span>
            <span class="sub-name">{{ sub }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { useH5Page } from '../useH5Page';

const { themeColor, navigateTo, setLayout } = useH5Page();
setLayout({ title: '分类', showBack: false, showTabbar: true, activeTab: 'category' });

const keyword = ref('');
const activeCategory = ref(0);
const categoryList = [
  { name: '手机数码', subs: ['手机', '耳机', '充电器', '手机壳', '数据线'] },
  { name: '电脑办公', subs: ['笔记本', '台式机', '显示器', '键盘鼠标', '打印机'] },
  { name: '家用电器', subs: ['空调', '洗衣机', '冰箱', '电视', '微波炉'] },
  { name: '服饰鞋包', subs: ['男装', '女装', '运动鞋', '箱包', '配饰'] },
  { name: '美妆护肤', subs: ['面膜', '精华', '口红', '防晒', '洁面'] },
  { name: '食品生鲜', subs: ['水果', '蔬菜', '肉类', '零食', '饮料'] },
  { name: '图书文具', subs: ['小说', '教材', '文具', '办公用品', '礼品'] },
  { name: '运动户外', subs: ['跑步鞋', '瑜伽', '露营', '骑行', '游泳'] },
];
const currentSubCategories = computed(() => categoryList[activeCategory.value]?.subs || []);
const handleSearch = () => {
  if (keyword.value) navigateTo(`product-list?keyword=${keyword.value}`);
};
</script>

<style lang="scss" scoped>
.category-layout {
  display: flex;
  height: calc(100% - 52px);
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
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  .sub-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 10px;
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
      font-size: 11px;
      color: #333;
    }
  }
}
</style>
