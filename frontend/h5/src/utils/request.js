import axios from 'axios';

const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

request.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code === 200) {
      return res;
    }
    return Promise.reject(new Error(res.msg || '请求失败'));
  },
  error => {
    return Promise.reject(error);
  }
);

export default request;
