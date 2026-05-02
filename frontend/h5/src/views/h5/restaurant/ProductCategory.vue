<template>
  <div class="res-product-category">
    <div class="category-sidebar">
      <div
        v-for="(cat, i) in categoryList"
        :key="cat.id || i"
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
          :key="sub.id || sub"
          class="sub-item"
          @click="navigateTo(`product-list?category=${typeof sub === 'string' ? sub : sub.name}`)"
        >
          <span class="sub-icon">🍽️</span><span class="sub-name">{{ typeof sub === 'string' ? sub : sub.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useH5Page } from '../useH5Page';

const { themeColor, navigateTo, fetchList, setLayout } = useH5Page();
setLayout({ title: '商品分类', showBack: false, showTabbar: true, activeTab: 'menu' });

const activeIdx = ref(0);
const categoryList = ref([]);

const currentSubs = computed(() => categoryList.value[activeIdx.value]?.subs || []);

onMounted(async () => {
  const data = await fetchList('category');
  if (data.length) {
    categoryList.value = data;
  } else {
    categoryList.value = [
      { name: '招牌菜', subs: [{ name: '宫保鸡丁' }, { name: '红烧肉' }, { name: '酸菜鱼' }, { name: '清蒸鲈鱼' }] },
      { name: '主食', subs: [{ name: '蛋炒饭' }, { name: '面条' }, { name: '水饺' }, { name: '包子' }] },
      { name: '小吃', subs: [{ name: '春卷' }, { name: '煎饺' }, { name: '小笼包' }, { name: '烤串' }] },
      { name: '饮品', subs: [{ name: '奶茶' }, { name: '果汁' }, { name: '咖啡' }, { name: '茶' }] },
    ];
  }
});
</script>

<style lang="scss" scoped>
.res-product-category {
  display: flex; height: 100%;
}
.category-sidebar {
  width: 80px; background: #f5f5f5; overflow-y: auto; flex-shrink: 0;
  .sidebar-item {
    padding: 14px 8px; font-size: 12px; text-align: center;
    border-left: 3px solid transparent; cursor: pointer;
    &.active { background: #fff; font-weight: 600; }
  }
}
.category-content {
  flex: 1; padding: 12px; overflow-y: auto;
  .sub-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .sub-item { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 12px; background: #fff; border-radius: 8px; cursor: pointer;
    &:active { background: #f5f5f5; }
    .sub-icon { font-size: 28px; }
    .sub-name { font-size: 12px; color: #333; }
  }
}
</style>
