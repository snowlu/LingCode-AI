<template>
  <div class="edu-course-category">
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
          @click="navigateTo(`course-list?category=${sub}`)"
        >
          <span class="sub-icon">📘</span><span class="sub-name">{{ sub }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useH5Page } from '../useH5Page';

const { themeColor, navigateTo, setLayout } = useH5Page();
setLayout({ title: '课程分类', showBack: false, showTabbar: true, activeTab: 'course' });

const activeIdx = ref(0);
const categoryList = [
  { name: '前端开发', subs: ['Vue3', 'React', 'Angular', 'TypeScript', 'CSS'] },
  { name: '后端开发', subs: ['Node.js', 'Python', 'Java', 'Go', 'PHP'] },
  { name: '人工智能', subs: ['机器学习', '深度学习', 'NLP', '计算机视觉', '大模型'] },
  { name: '产品设计', subs: ['UI设计', 'UX设计', '交互设计', '产品经理', '用户研究'] },
  { name: '数据分析', subs: ['Excel', 'SQL', 'Python分析', 'BI工具', '统计学'] },
  { name: '外语学习', subs: ['英语', '日语', '韩语', '法语', '德语'] },
];
const currentSubs = computed(() => categoryList[activeIdx.value]?.subs || []);
</script>

<style lang="scss" scoped>
.edu-course-category {
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
