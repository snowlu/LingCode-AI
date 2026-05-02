import { defineStore } from 'pinia';
import { ref } from 'vue';
import request from '@/utils/request';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref('');

  const login = async (industry, credentials) => {
    const res = await request.post(`/${industry}/auth/login`, credentials);
    if (res.data) {
      token.value = res.data.token;
      user.value = res.data.user;
    }
  };

  const logout = () => {
    token.value = '';
    user.value = null;
  };

  return { user, token, login, logout };
});
