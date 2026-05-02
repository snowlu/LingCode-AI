import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { h5Configs } from '@/config/h5Configs';
import { h5LayoutState, setH5Layout } from './h5LayoutState';
import { getList, getDetail, addItem, updateItem } from '@/api';

export function useH5Page() {
  const route = useRoute();
  const router = useRouter();
  const industry = computed(() => {
    const match = route.path.match(/^\/h5\/(\w+)/);
    return match ? match[1] : 'ecommerce';
  });
  const config = computed(() => h5Configs[industry.value] || h5Configs.ecommerce);
  const themeColor = computed(() => config.value?.color || '#409eff');

  const loading = ref(false);

  const setLayout = options => setH5Layout(options);

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push(`/h5/${industry.value}/home`);
  };

  const navigateTo = path => router.push(`/h5/${industry.value}/${path}`);

  const fetchList = async (resource, params = {}) => {
    loading.value = true;
    try {
      const res = await getList(industry.value, resource, { pageSize: 50, ...params });
      return res.data?.list || [];
    } catch (e) {
      return [];
    } finally {
      loading.value = false;
    }
  };

  const fetchDetail = async (resource, id) => {
    loading.value = true;
    try {
      const res = await getDetail(industry.value, resource, id);
      return res.data || null;
    } catch (e) {
      return null;
    } finally {
      loading.value = false;
    }
  };

  const submitData = async (resource, data) => {
    loading.value = true;
    try {
      const res = await addItem(industry.value, resource, data);
      return res.data;
    } catch (e) {
      return null;
    } finally {
      loading.value = false;
    }
  };

  const updateData = async (resource, data) => {
    loading.value = true;
    try {
      const res = await updateItem(industry.value, resource, data);
      return res.data;
    } finally {
      loading.value = false;
    }
  };

  const adjustColor = (color, amount) => {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  return {
    route,
    router,
    industry,
    config,
    themeColor,
    loading,
    h5LayoutState,
    setLayout,
    goBack,
    navigateTo,
    fetchList,
    fetchDetail,
    submitData,
    updateData,
    adjustColor,
  };
}
