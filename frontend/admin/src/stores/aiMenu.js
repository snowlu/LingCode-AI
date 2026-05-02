import { defineStore } from 'pinia';
import { ref } from 'vue';
import industryConfigs from '@/config/industries.js';

export const useAiMenuStore = defineStore('aiMenu', () => {
  const selectedIndustry = ref('ecommerce');
  const customMenus = ref(null);
  const customThemeColor = ref(null);
  const customSystemName = ref(null);
  const aiGeneratedModules = ref([]);

  const setIndustry = industryKey => {
    if (industryConfigs[industryKey]) {
      selectedIndustry.value = industryKey;
      customMenus.value = industryConfigs[industryKey].menus;
      customThemeColor.value = industryConfigs[industryKey].color;
      customSystemName.value = industryConfigs[industryKey].name;
    }
  };

  const setCustomMenus = menus => {
    customMenus.value = menus;
  };

  const setCustomThemeColor = color => {
    customThemeColor.value = color;
  };

  const setCustomSystemName = name => {
    customSystemName.value = name;
  };

  const addAiModule = moduleInfo => {
    const exists = aiGeneratedModules.value.find(m => m.key === moduleInfo.key);
    if (!exists) {
      aiGeneratedModules.value.push(moduleInfo);
    }
  };

  const reset = () => {
    selectedIndustry.value = 'ecommerce';
    customMenus.value = null;
    customThemeColor.value = null;
    customSystemName.value = null;
    aiGeneratedModules.value = [];
  };

  const getCurrentMenus = () => {
    if (customMenus.value) {
      return customMenus.value;
    }
    return industryConfigs[selectedIndustry.value]?.menus || industryConfigs.ecommerce.menus;
  };

  const getCurrentThemeColor = () => {
    if (customThemeColor.value) {
      return customThemeColor.value;
    }
    return industryConfigs[selectedIndustry.value]?.color || '#409eff';
  };

  const getCurrentSystemName = () => {
    if (customSystemName.value) {
      return customSystemName.value;
    }
    return industryConfigs[selectedIndustry.value]?.name || '电商后台管理系统';
  };

  return {
    selectedIndustry,
    customMenus,
    customThemeColor,
    customSystemName,
    aiGeneratedModules,
    setIndustry,
    setCustomMenus,
    setCustomThemeColor,
    setCustomSystemName,
    addAiModule,
    reset,
    getCurrentMenus,
    getCurrentThemeColor,
    getCurrentSystemName,
  };
});
