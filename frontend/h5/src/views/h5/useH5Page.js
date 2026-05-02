import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { h5Configs } from '@/config/h5Configs';
import { h5LayoutState, setH5Layout } from './h5LayoutState';
import { getList, getDetail, addItem, updateItem, deleteItem } from '@/api';

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
  const refreshing = ref(false);
  const error = ref('');

  const setLayout = options => setH5Layout(options);

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push(`/h5/${industry.value}/home`);
  };

  const navigateTo = path => router.push(`/h5/${industry.value}/${path}`);

  const fetchList = async (resource, params = {}) => {
    loading.value = true;
    error.value = '';
    try {
      const res = await getList(industry.value, resource, { pageSize: 50, ...params });
      return res.data?.list || [];
    } catch (e) {
      error.value = e.message || '加载失败';
      return [];
    } finally {
      loading.value = false;
    }
  };

  const fetchDetail = async (resource, id) => {
    loading.value = true;
    error.value = '';
    try {
      const res = await getDetail(industry.value, resource, id);
      return res.data || null;
    } catch (e) {
      error.value = e.message || '加载失败';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const submitData = async (resource, data) => {
    loading.value = true;
    error.value = '';
    try {
      const res = await addItem(industry.value, resource, data);
      return res.data;
    } catch (e) {
      ElMessage.error(e.message || '提交失败');
      error.value = e.message || '提交失败';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const updateData = async (resource, data) => {
    loading.value = true;
    error.value = '';
    try {
      const res = await updateItem(industry.value, resource, data);
      return res.data;
    } catch (e) {
      ElMessage.error(e.message || '更新失败');
      return null;
    } finally {
      loading.value = false;
    }
  };

  const removeData = async (resource, id) => {
    loading.value = true;
    try {
      await deleteItem(industry.value, resource, id);
      return true;
    } catch (e) {
      ElMessage.error(e.message || '删除失败');
      return false;
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
    refreshing,
    error,
    h5LayoutState,
    setLayout,
    goBack,
    navigateTo,
    fetchList,
    fetchDetail,
    submitData,
    updateData,
    removeData,
    adjustColor,
  };
}
