<template>
  <div class="h5-preview-page">
    <PhoneShell :status-bar-bg="themeColor" :dark-status-bar="true" @switch-pc="switchToPc" @switch-admin="switchToAdmin">
      <div class="h5-app" :style="{ '--theme': themeColor }">
        <header class="h5-navbar" :style="{ background: themeColor }">
          <div class="navbar-left">
            <span v-if="h5LayoutState.showBack" class="navbar-back" @click="goBack">‹</span>
          </div>
          <h1 class="navbar-title">{{ h5LayoutState.title || appName }}</h1>
          <div class="navbar-right">
            <slot name="navbar-right"></slot>
          </div>
        </header>
        <div class="h5-body">
          <router-view v-slot="{ Component }">
            <transition name="h5-fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
        <nav v-if="h5LayoutState.showTabbar" class="h5-tabbar">
          <div
            v-for="tab in tabs"
            :key="tab.key"
            :class="['tabbar-item', { active: h5LayoutState.activeTab === tab.key }]"
            :style="h5LayoutState.activeTab === tab.key ? { color: themeColor } : {}"
            @click="switchTab(tab)"
          >
            <el-icon :size="20"><component :is="tab.icon" /></el-icon>
            <span>{{ tab.label }}</span>
          </div>
        </nav>

        <transition name="sheet-slide">
          <div v-if="h5LayoutState.sheetVisible" class="h5-sheet-overlay" @click.self="closeH5Sheet">
            <div class="h5-sheet-panel">
              <div class="sheet-header">
                <span class="sheet-cancel" @click="closeH5Sheet">取消</span>
                <span class="sheet-title">{{ h5LayoutState.sheetTitle }}</span>
                <span class="sheet-confirm" :style="{ color: themeColor }" @click="onSheetSave">保存</span>
              </div>
              <div class="sheet-body">
                <div v-for="field in h5LayoutState.sheetFields" :key="field.key" class="sheet-field">
                  <div class="sheet-field-label">{{ field.label }}</div>
                  <el-input
                    v-if="field.type === 'text' || !field.type"
                    :model-value="sheetFormData[field.key] || ''"
                    :placeholder="field.placeholder || ''"
                    size="large"
                    @update:model-value="val => onSheetFieldChange(field.key, val)"
                  />
                  <el-input
                    v-else-if="field.type === 'textarea'"
                    :model-value="sheetFormData[field.key] || ''"
                    type="textarea"
                    :rows="2"
                    :placeholder="field.placeholder || ''"
                    size="large"
                    @update:model-value="val => onSheetFieldChange(field.key, val)"
                  />
                  <el-input
                    v-else-if="field.type === 'number'"
                    :model-value="sheetFormData[field.key] || ''"
                    type="number"
                    :placeholder="field.placeholder || ''"
                    size="large"
                    @update:model-value="val => onSheetFieldChange(field.key, val)"
                  />
                </div>
                <div v-if="h5LayoutState.sheetFields.some(f => f.key === 'isDefault')" class="sheet-switch-row">
                  <span>设为默认地址</span>
                  <span
                    class="h5-switch"
                    :class="{ on: sheetFormData.isDefault }"
                    :style="sheetFormData.isDefault ? { background: themeColor } : {}"
                    @click="onSheetFieldChange('isDefault', !sheetFormData.isDefault)"
                  >
                    <span class="h5-switch-dot"></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </PhoneShell>
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { h5Configs } from '@/config/h5Configs';
import { h5LayoutState, setH5Layout, closeH5Sheet, submitH5Sheet } from './h5LayoutState';
import PhoneShell from '@/components/PhoneShell.vue';

const sheetFormData = ref({});

function onSheetFieldChange(key, value) {
  sheetFormData.value = { ...sheetFormData.value, [key]: value };
}

async function onSheetSave() {
  if (h5LayoutState.sheetLoading) return;
  await submitH5Sheet(sheetFormData.value);
}

const route = useRoute();
const router = useRouter();

const industry = computed(() => {
  const match = route.path.match(/^\/h5\/(\w+)/);
  return match ? match[1] : 'ecommerce';
});
const config = computed(() => h5Configs[industry.value] || h5Configs.ecommerce);
const themeColor = computed(() => config.value?.color || '#409eff');
const appName = computed(() => config.value?.appName || '');
const tabs = computed(() => config.value?.tabs || []);

const goBack = () => {
  if (window.history.length > 1) router.back();
  else router.push(`/h5/${industry.value}/home`);
};

const switchTab = tab => {
  router.push(`/h5/${industry.value}/${tab.key}`);
};

const switchToPc = () => {
  router.push(`/user-portal/${industry.value}`);
};

const switchToAdmin = () => {
  const keyToId = {
    ecommerce: 1,
    education: 2,
    government: 3,
    medical: 4,
    logistics: 5,
    restaurant: 6,
    finance: 8,
    hr: 9,
    project: 10,
    community: 11,
  };
  router.push(`/preview/${keyToId[industry.value] || 1}`);
};

watch(
  industry,
  () => {
    setH5Layout({ title: '', showBack: false, showTabbar: true, activeTab: 'home' });
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.h5-preview-page {
  background: #1a1a2e;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
}
</style>

<style lang="scss">
@import '@/styles/h5-common.scss';
</style>
