import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', redirect: '/index' },
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/Index.vue'),
    meta: { title: '首页' },
  },
  {
    path: '/templates',
    name: 'Templates',
    component: () => import('@/views/Templates.vue'),
    meta: { title: '模板市场' },
  },
  {
    path: '/generator',
    name: 'Generator',
    component: () => import('@/views/Generator.vue'),
    meta: { title: '在线生成器' },
  },
  {
    path: '/preview/:id',
    name: 'Preview',
    component: () => import('@/views/Preview.vue'),
    meta: { title: '预览演示' },
  },
  {
    path: '/user-portal/:industry',
    name: 'UserPortal',
    component: () => import('@/views/UserPortal.vue'),
    meta: { title: '用户端' },
  },
  {
    path: '/docs',
    name: 'Docs',
    component: () => import('@/views/Docs.vue'),
    meta: { title: '文档中心' },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: { title: '关于我们' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'AI 全栈低代码生成平台'} - AI 后台模板工厂`;
  next();
});

export default router;
