import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const downloadZip = async (code, projectName) => {
  const zip = new JSZip();

  zip.file('package.json', generatePackageJson(projectName));
  zip.file('vite.config.js', generateViteConfig());
  zip.file('index.html', generateIndexHtml(projectName));
  zip.file('README.md', generateReadme(projectName));

  const srcFolder = zip.folder('src');
  srcFolder.file('main.js', code.mainJs);
  srcFolder.file('App.vue', code.appVue);

  const routerFolder = srcFolder.folder('router');
  routerFolder.file('index.js', code.router);

  const storesFolder = srcFolder.folder('stores');
  storesFolder.file('user.js', code.userStore);

  const viewsFolder = srcFolder.folder('views');
  Object.entries(code.views).forEach(([name, content]) => {
    viewsFolder.file(`${name}.vue`, content);
  });

  const componentsFolder = srcFolder.folder('components');
  componentsFolder.file('Layout.vue', code.layout);
  componentsFolder.file('Sidebar.vue', code.sidebar);
  componentsFolder.file('Header.vue', code.header);

  const stylesFolder = srcFolder.folder('styles');
  stylesFolder.file('global.scss', code.globalStyle);

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `${projectName}.zip`);
};

const generatePackageJson = name => `{
  "name": "${name}",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.4.21",
    "vue-router": "^4.3.0",
    "pinia": "^2.1.7",
    "element-plus": "^2.6.3",
    "@element-plus/icons-vue": "^2.3.1",
    "axios": "^1.6.8",
    "echarts": "^5.5.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.4",
    "vite": "^5.2.8",
    "sass": "^1.72.0"
  }
}`;

const generateViteConfig = () => `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})`;

const generateIndexHtml = name => `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${name}</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>`;

const generateReadme = name => `# ${name}

## 项目简介
基于 AI 后台模板工厂生成的企业级管理系统

## 技术栈
- Vue3 + Vite
- Element Plus UI 组件库
- Pinia 状态管理
- Vue Router 路由管理
- ECharts 数据可视化
- Axios HTTP 客户端

## 快速开始

### 安装依赖
\`\`\`bash
npm install
\`\`\`

### 启动开发服务器
\`\`\`bash
npm run dev
\`\`\`

### 构建生产版本
\`\`\`bash
npm run build
\`\`\`

### 预览生产构建
\`\`\`bash
npm run preview
\`\`\`

## 功能特性
✅ 用户管理与权限控制
✅ 数据表格与CRUD操作
✅ 数据可视化图表
✅ 响应式布局设计
✅ 完整的路由与状态管理

## 目录结构
\`\`\`
src/
├── api/          # API 接口
├── assets/       # 静态资源
├── components/   # 公共组件
├── router/       # 路由配置
├── stores/       # 状态管理
├── styles/       # 全局样式
└── views/        # 页面组件
\`\`\`
`;

export const formatDate = date => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const debounce = (fn, delay = 300) => {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
