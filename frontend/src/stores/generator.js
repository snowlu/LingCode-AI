import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useGeneratorStore = defineStore('generator', () => {
  const config = ref({
    industry: '',
    systemName: '',
    primaryColor: '#1890ff',
    includeAuth: true,
    includeCharts: true,
    includeI18n: false,
    customFields: [],
    customMenus: [],
  });

  const generatedCode = ref(null);
  const isGenerating = ref(false);
  const previewData = ref(null);
  const generationHistory = ref([]);

  const canGenerate = computed(() => {
    return config.value.industry && config.value.systemName;
  });

  const updateConfig = (key, value) => {
    config.value[key] = value;
  };

  const resetConfig = () => {
    config.value = {
      industry: '',
      systemName: '',
      primaryColor: '#1890ff',
      includeAuth: true,
      includeCharts: true,
      includeI18n: false,
      customFields: [],
      customMenus: [],
    };
  };

  const generateCode = async () => {
    isGenerating.value = true;

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config.value),
      });

      const data = await response.json();
      generatedCode.value = data.code;
      previewData.value = data.preview;

      generationHistory.value.unshift({
        id: Date.now(),
        ...config.value,
        timestamp: new Date().toISOString(),
        codeId: data.codeId,
      });

      return data;
    } catch (error) {
      console.error('生成失败:', error);
      throw error;
    } finally {
      isGenerating.value = false;
    }
  };

  const aiModify = async instruction => {
    try {
      const response = await fetch('/api/ai-modify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentCode: generatedCode.value,
          instruction,
        }),
      });

      const data = await response.json();
      generatedCode.value = data.modifiedCode;
      previewData.value = data.preview;

      return data;
    } catch (error) {
      console.error('AI修改失败:', error);
      throw error;
    }
  };

  return {
    config,
    generatedCode,
    isGenerating,
    previewData,
    generationHistory,
    canGenerate,
    updateConfig,
    resetConfig,
    generateCode,
    aiModify,
  };
});
