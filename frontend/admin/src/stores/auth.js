import { defineStore } from 'pinia';
import { ref } from 'vue';
import request from '@/utils/request';

const industryKeys = [
  'ecommerce',
  'education',
  'government',
  'medical',
  'logistics',
  'hr',
  'finance',
  'restaurant',
  'community',
  'project',
];

export const useAuthStore = defineStore('auth', () => {
  const currentIndustry = ref('');
  const token = ref('');
  const userInfo = ref(null);

  const getStorageKey = industry => `token_${industry}`;

  const loadFromStorage = industry => {
    const key = getStorageKey(industry);
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        return data;
      } catch {
        return null;
      }
    }
    return null;
  };

  const saveToStorage = (industry, data) => {
    const key = getStorageKey(industry);
    localStorage.setItem(key, JSON.stringify(data));
  };

  const login = async templateType => {
    if (!templateType || !industryKeys.includes(templateType)) {
      templateType = 'ecommerce';
    }
    currentIndustry.value = templateType;

    const stored = loadFromStorage(templateType);
    if (stored && stored.token && stored.userInfo) {
      token.value = stored.token;
      userInfo.value = stored.userInfo;
      return { token: stored.token, userInfo: stored.userInfo };
    }

    try {
      const res = await request.post('/login', { templateType });
      if (res.data) {
        token.value = res.data.token;
        userInfo.value = res.data.userInfo;
        saveToStorage(templateType, res.data);
        return res.data;
      }
    } catch (e) {
      console.error('登录失败:', e);
      const fallback = {
        token: `token_${templateType}_fallback`,
        userInfo: {
          userId: '1001',
          username: `${templateType}管理员`,
          nickname: '管理员',
          role: 'admin',
          templateType,
        },
      };
      token.value = fallback.token;
      userInfo.value = fallback.userInfo;
      saveToStorage(templateType, fallback);
      return fallback;
    }
  };

  const switchIndustry = async industry => {
    return await login(industry);
  };

  const logout = industry => {
    const key = getStorageKey(industry || currentIndustry.value);
    localStorage.removeItem(key);
    if (currentIndustry.value === industry) {
      token.value = '';
      userInfo.value = null;
    }
  };

  const isLoggedIn = industry => {
    const data = loadFromStorage(industry || currentIndustry.value);
    return !!(data && data.token);
  };

  return { currentIndustry, token, userInfo, login, switchIndustry, logout, isLoggedIn };
});
