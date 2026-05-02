import { getDB } from '../config/db.js';
import { success, fail } from '../utils/response.js';

const industryNames = {
  ecommerce: '电商后台管理系统',
  education: '教育管理系统',
  government: '政务服务平台',
  medical: '医疗管理系统',
  logistics: '物流管理系统',
  hr: '人力资源系统',
  finance: '财务管理系统',
  restaurant: '门店管理系统',
  community: '社区管理系统',
  project: '项目管理系统',
};

const industryColors = {
  ecommerce: '#409eff',
  education: '#67c23a',
  government: '#e6a23c',
  medical: '#f56c6c',
  logistics: '#909399',
  hr: '#b195eb',
  finance: '#2f9999',
  restaurant: '#ff9f40',
  community: '#00b42a',
  project: '#13c2c2',
};

function genBackendPackageJson(name) {
  return JSON.stringify(
    {
      name: name.toLowerCase().replace(/\s+/g, '-'),
      version: '1.0.0',
      type: 'module',
      scripts: { start: 'node server.js', dev: 'node server.js' },
      dependencies: { cors: '^2.8.5', express: '^4.18.2', lowdb: '^7.0.1' },
    },
    null,
    2
  );
}

function genAdminPackageJson(name) {
  const pkgName = name.toLowerCase().replace(/\s+/g, '-');
  return JSON.stringify(
    {
      name: pkgName + '-admin',
      private: true,
      version: '1.0.0',
      type: 'module',
      description: name + ' - 后台管理系统',
      scripts: {
        dev: 'vite --port 3000',
        build: 'vite build',
        preview: 'vite preview',
      },
      dependencies: {
        '@element-plus/icons-vue': '^2.3.1',
        axios: '^1.15.2',
        'element-plus': '^2.6.3',
        pinia: '^2.1.7',
        vue: '^3.4.21',
        'vue-router': '^4.3.0',
      },
      devDependencies: {
        '@vitejs/plugin-vue': '^5.0.4',
        sass: '^1.72.0',
        vite: '^5.2.8',
      },
    },
    null,
    2
  );
}

function genH5PackageJson(name) {
  const pkgName = name.toLowerCase().replace(/\s+/g, '-');
  return JSON.stringify(
    {
      name: pkgName + '-h5',
      private: true,
      version: '1.0.0',
      type: 'module',
      description: name + ' - 移动端 H5 项目',
      scripts: {
        dev: 'vite --port 3001',
        build: 'vite build',
        preview: 'vite preview',
      },
      dependencies: {
        '@element-plus/icons-vue': '^2.3.1',
        axios: '^1.15.2',
        'element-plus': '^2.6.3',
        pinia: '^2.1.7',
        vue: '^3.4.21',
        'vue-router': '^4.3.0',
      },
      devDependencies: {
        '@vitejs/plugin-vue': '^5.0.4',
        sass: '^1.72.0',
        vite: '^5.2.8',
      },
    },
    null,
    2
  );
}

function genRootPackageJson(name) {
  const pkgName = name.toLowerCase().replace(/\s+/g, '-');
  return JSON.stringify(
    {
      name: pkgName,
      version: '1.0.0',
      description: name + ' - 企业级管理系统',
      scripts: {
        'dev:backend': 'cd backend && npm run dev',
        'dev:admin': 'cd frontend/admin && npm run dev',
        'dev:h5': 'cd frontend/h5 && npm run dev',
        dev: 'concurrently "npm run dev:backend" "npm run dev:admin" "npm run dev:h5"',
        lint: 'eslint . --ext .vue,.js,.jsx',
        'lint:fix': 'eslint . --ext .vue,.js,.jsx --fix',
        format: 'prettier --write .',
      },
      devDependencies: {
        concurrently: '^8.2.2',
        eslint: '^8.57.0',
        'eslint-config-prettier': '^9.1.0',
        'eslint-plugin-vue': '^9.26.0',
        prettier: '^3.2.5',
      },
    },
    null,
    2
  );
}

function genServerJs(templateType) {
  return `import express from 'express'
import cors from 'cors'
import { JSONFilePreset } from 'lowdb/node'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()
const PORT = 8080

app.use(cors())
app.use(express.json())

let db = null

async function initDB() {
  db = await JSONFilePreset(join(__dirname, 'db.json'), { ${templateType}_items: [] })
  if (!db.data.${templateType}_items || db.data.${templateType}_items.length === 0) {
    db.data.${templateType}_items = []
    await db.write()
  }
}

app.get('/api/${templateType}/:resource/list', (req, res) => {
  const { resource } = req.params
  const { page = 1, pageSize = 10, keywords = '' } = req.query
  const tableName = '${templateType}_' + resource
  let data = db.data[tableName] || []
  if (keywords) data = data.filter(item => Object.values(item).some(v => String(v).toLowerCase().includes(keywords.toLowerCase())))
  const total = data.length
  const start = (parseInt(page) - 1) * parseInt(pageSize)
  res.json({ code: 200, data: { list: data.slice(start, start + parseInt(pageSize)), total, page: parseInt(page), pageSize: parseInt(pageSize) } })
})

app.get('/api/${templateType}/dashboard', (req, res) => {
  res.json({ code: 200, data: { stats: db.data['${templateType}_dashboard'] || [] } })
})

app.post('/api/${templateType}/:resource/add', async (req, res) => {
  const { resource } = req.params
  const tableName = '${templateType}_' + resource
  if (!db.data[tableName]) db.data[tableName] = []
  const list = db.data[tableName]
  const maxId = list.length > 0 ? Math.max(...list.map(i => i.id || 0)) : 0
  const newItem = { id: maxId + 1, ...req.body, createdAt: new Date().toISOString().split('T')[0] }
  list.push(newItem)
  await db.write()
  res.json({ code: 200, data: newItem, msg: '新增成功' })
})

app.post('/api/${templateType}/:resource/update', async (req, res) => {
  const { resource } = req.params
  const tableName = '${templateType}_' + resource
  const list = db.data[tableName] || []
  const idx = list.findIndex(i => String(i.id) === String(req.body.id))
  if (idx === -1) return res.status(404).json({ code: 404, msg: '记录不存在' })
  list[idx] = { ...list[idx], ...req.body }
  await db.write()
  res.json({ code: 200, data: list[idx], msg: '更新成功' })
})

app.post('/api/${templateType}/:resource/delete', async (req, res) => {
  const { resource } = req.params
  const tableName = '${templateType}_' + resource
  const list = db.data[tableName] || []
  const idx = list.findIndex(i => String(i.id) === String(req.body.id))
  if (idx === -1) return res.status(404).json({ code: 404, msg: '记录不存在' })
  list.splice(idx, 1)
  await db.write()
  res.json({ code: 200, msg: '删除成功' })
})

async function start() {
  await initDB()
  app.listen(PORT, () => console.log('Server running at http://localhost:' + PORT))
}
start()
`;
}

function genViteConfig(port) {
  return `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: { alias: { '@': resolve(__dirname, 'src') } },
  server: {
    port: ${port},
    proxy: { '/api': { target: 'http://localhost:8080', changeOrigin: true } }
  }
})
`;
}

function genIndexHtml(name) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${name}</title>
</head>
<body><div id="app"></div><script type="module" src="/src/main.js"></script></body>
</html>
`;
}

function genMainJs() {
  return `import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(createPinia())
app.use(router)
app.use(ElementPlus, { locale: undefined })
app.mount('#app')
`;
}

function genAppVue() {
  return `<template><router-view /></template>
`;
}

function genRequestJs() {
  return `import axios from 'axios'

const request = axios.create({ baseURL: '/api', timeout: 15000 })
request.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)
export default request
`;
}

function genApiIndexJs(templateType) {
  return `import request from '@/utils/request'
export const getList = (resource, params = {}) => request.get('/${templateType}/' + resource + '/list', { params })
export const addItem = (resource, data) => request.post('/${templateType}/' + resource + '/add', data)
export const updateItem = (resource, data) => request.post('/${templateType}/' + resource + '/update', data)
export const deleteItem = (resource, id) => request.post('/${templateType}/' + resource + '/delete', { id })
export const getDashboard = () => request.get('/${templateType}/dashboard')
`;
}

function genAdminRouterJs(templateType, name) {
  return `import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  { path: '/', redirect: '/preview' },
  { path: '/preview', name: 'Preview', component: () => import('@/views/Preview.vue') }
]
const router = createRouter({ history: createWebHistory(), routes })
router.beforeEach((to, from, next) => { document.title = '${name}'; next() })
export default router
`;
}

function genH5RouterJs(templateType) {
  return `import { createRouter, createWebHistory } from 'vue-router'

const h5 = (path, loader) => ({ path, component: loader })

const routes = [
  { path: '/', redirect: '/h5/${templateType}' },
  {
    path: '/h5/${templateType}',
    component: () => import('@/views/h5/H5Layout.vue'),
    children: [
      { path: '', redirect: '/h5/${templateType}/home' },
      h5('home', () => import('@/views/h5/${templateType}/Home.vue')),
      h5('personal', () => import('@/views/h5/${templateType}/PersonalCenter.vue'))
    ]
  }
]

const router = createRouter({ history: createWebHistory(), routes })
router.beforeEach((to, from, next) => { document.title = 'H5 移动端'; next() })
export default router
`;
}

function genPreviewVue(templateType, name, color) {
  return `<template>
  <div style="min-height:100vh;background:#f0f4ff">
    <div v-if="!isLoggedIn" style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:linear-gradient(135deg,${color} 0%,${color}cc 100%)">
      <div style="width:400px;padding:40px;background:white;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.3);text-align:center">
        <h2 style="margin-bottom:8px">${name}</h2>
        <p style="color:#999;margin-bottom:24px">企业级管理系统</p>
        <el-button type="primary" size="large" style="width:100%" @click="isLoggedIn=true">登 录</el-button>
      </div>
    </div>
    <div v-else style="display:flex;height:100vh">
      <aside style="width:220px;background:#001529;color:white;display:flex;flex-direction:column">
        <div style="height:56px;display:flex;align-items:center;justify-content:center;font-weight:bold;border-bottom:1px solid rgba(255,255,255,0.1)">${name}</div>
        <nav style="flex:1;padding:8px 0;overflow-y:auto">
          <div v-for="menu in menus" :key="menu.key" :style="{background:currentMenu===menu.key?'${color}':'',padding:'11px 20px',cursor:'pointer',fontSize:'14px'}" @click="currentMenu=menu.key">
            {{ menu.label }}
          </div>
        </nav>
      </aside>
      <main style="flex:1;display:flex;flex-direction:column;overflow:hidden">
        <header style="height:52px;background:white;border-bottom:1px solid #e5e6eb;display:flex;align-items:center;padding:0 20px">
          <span style="font-weight:500">{{ currentLabel }}</span>
        </header>
        <div style="flex:1;padding:20px;overflow-y:auto">
          <DashboardPage v-if="currentMenu==='dashboard'" />
          <ListPage v-else :resource="currentMenu" />
        </div>
      </main>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import DashboardPage from '@/components/preview/DashboardPage.vue'
import ListPage from '@/components/preview/ListPage.vue'
const isLoggedIn = ref(false)
const currentMenu = ref('dashboard')
const menus = [
  { key: 'dashboard', label: '工作台' },
  { key: 'items', label: '数据管理' }
]
const currentLabel = computed(() => menus.find(m => m.key === currentMenu.value)?.label || '工作台')
</script>
`;
}

function genDashboardPage() {
  return `<template>
  <div>
    <el-row :gutter="16" style="margin-bottom:20px">
      <el-col :span="6" v-for="(stat, i) in stats" :key="i">
        <el-card shadow="hover"><div style="font-size:24px;font-weight:700;color:#409eff">{{ stat.value }}</div><div style="color:#999;font-size:13px;margin-top:4px">{{ stat.label }}</div></el-card>
      </el-col>
    </el-row>
    <el-card><h3>数据趋势</h3><p style="color:#999">图表区域 - 可集成 ECharts 等图表库</p></el-card>
  </div>
</template>
<script setup>
const stats = [
  { label: '今日数据', value: '1,234' },
  { label: '总记录', value: '12,345' },
  { label: '活跃用户', value: '567' },
  { label: '完成率', value: '89.5%' }
]
</script>
`;
}

function genListPage() {
  return `<template>
  <div>
    <div style="display:flex;justify-content:space-between;margin-bottom:16px">
      <el-input v-model="keywords" placeholder="搜索..." style="width:240px" @keyup.enter="loadData" />
      <el-button type="primary" @click="handleAdd">新增</el-button>
    </div>
    <el-table :data="tableData" border stripe style="width:100%">
      <el-table-column v-for="col in columns" :key="col.prop" :prop="col.prop" :label="col.label" />
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top:16px;justify-content:flex-end" :total="total" :page-size="pageSize" @current-change="page=>$event=page" layout="prev, pager, next" />
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { getList, addItem, updateItem, deleteItem } from '@/api'
const props = defineProps({ resource: String })
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)
const keywords = ref('')
const columns = ref([{ prop: 'id', label: 'ID' }, { prop: 'name', label: '名称' }, { prop: 'status', label: '状态' }])

const loadData = async () => {
  try {
    const res = await getList(props.resource, { page: page.value, pageSize: pageSize.value, keywords: keywords.value })
    if (res.data) { tableData.value = res.data.list; total.value = res.data.total }
  } catch (e) { console.error(e) }
}

const handleAdd = () => { addItem(props.resource, { name: '新记录', status: '正常' }).then(() => loadData()) }
const handleEdit = (row) => { updateItem(props.resource, { ...row, name: row.name + '(已编辑)' }).then(() => loadData()) }
const handleDelete = (row) => { deleteItem(props.resource, row.id).then(() => loadData()) }

onMounted(loadData)
watch(() => props.resource, loadData)
</script>
`;
}

function genH5LayoutVue(templateType, color) {
  return `<template>
  <div class="h5-app">
    <header class="h5-header" :style="{ background: '${color}' }">
      <span class="h5-title">{{ layout.title }}</span>
    </header>
    <main class="h5-main">
      <router-view />
    </main>
    <footer class="h5-tabbar">
      <div
        v-for="tab in layout.tabs"
        :key="tab.key"
        class="tab-item"
        :class="{ active: currentTab === tab.key }"
        :style="{ color: currentTab === tab.key ? '${color}' : '#999' }"
        @click="switchTab(tab.key)"
      >
        <span>{{ tab.icon }}</span>
        <span>{{ tab.label }}</span>
      </div>
    </footer>
  </div>
</template>
<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const layout = {
  title: '${industryNames[templateType] || '行业模板'}',
  tabs: [
    { key: 'home', icon: '🏠', label: '首页' },
    { key: 'personal', icon: '👤', label: '我的' }
  ]
}
const currentTab = computed(() => route.path.split('/').pop() === '${templateType}' ? 'home' : route.path.split('/').pop())
const switchTab = (key) => router.push('/h5/${templateType}/' + key)
</script>
<style scoped>
.h5-app { display:flex; flex-direction:column; height:100vh; max-width:450px; margin:0 auto; background:#fff; }
.h5-header { padding:12px 16px; color:#fff; font-size:18px; font-weight:600; text-align:center; }
.h5-main { flex:1; overflow-y:auto; }
.h5-tabbar { display:flex; border-top:1px solid #eee; background:#fff; }
.tab-item { flex:1; display:flex; flex-direction:column; align-items:center; padding:6px 0; font-size:12px; cursor:pointer; }
.tab-item.active { font-weight:600; }
</style>
`;
}

function genH5HomeVue() {
  return `<template>
  <div class="home-page">
    <div class="banner"><h2>欢迎使用</h2><p>企业级移动端解决方案</p></div>
    <div class="grid-menu">
      <div v-for="item in menus" :key="item.key" class="menu-card" @click="item.action">
        <span class="menu-icon">{{ item.icon }}</span>
        <span class="menu-label">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
const menus = [
  { key: '1', icon: '📋', label: '功能一', action: () => {} },
  { key: '2', icon: '📊', label: '功能二', action: () => {} },
  { key: '3', icon: '🔔', label: '功能三', action: () => {} },
  { key: '4', icon: '⚙️', label: '功能四', action: () => {} }
]
</script>
<style scoped>
.home-page { padding:16px; }
.banner { background:linear-gradient(135deg,#667eea,#764ba2); color:#fff; padding:24px; border-radius:12px; margin-bottom:16px; }
.banner h2 { font-size:20px; margin-bottom:4px; }
.banner p { font-size:13px; opacity:0.85; }
.grid-menu { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.menu-card { background:#f8f9fa; border-radius:12px; padding:20px; text-align:center; cursor:pointer; }
.menu-card:hover { background:#e9ecef; }
.menu-icon { font-size:28px; display:block; margin-bottom:6px; }
.menu-label { font-size:14px; color:#333; }
</style>
`;
}

function genH5PersonalVue() {
  return `<template>
  <div class="personal-page">
    <div class="user-header">
      <div class="avatar">👤</div>
      <div class="user-info">
        <h3>用户</h3>
        <p>手机号：138****8888</p>
      </div>
    </div>
    <div class="menu-list">
      <div v-for="item in menus" :key="item.key" class="menu-item" @click="item.action">
        <span>{{ item.icon }} {{ item.label }}</span>
        <span class="arrow">›</span>
      </div>
    </div>
  </div>
</template>
<script setup>
const menus = [
  { key: '1', icon: '📝', label: '我的订单', action: () => {} },
  { key: '2', icon: '⭐', label: '我的收藏', action: () => {} },
  { key: '3', icon: '📍', label: '地址管理', action: () => {} },
  { key: '4', icon: '⚙️', label: '设置', action: () => {} }
]
</script>
<style scoped>
.personal-page { padding:16px; }
.user-header { display:flex; align-items:center; padding:20px; background:#fff; border-radius:12px; margin-bottom:16px; box-shadow:0 1px 4px rgba(0,0,0,0.06); }
.avatar { width:56px; height:56px; border-radius:50%; background:#e9ecef; display:flex; align-items:center; justify-content:center; font-size:28px; margin-right:16px; }
.user-info h3 { font-size:18px; margin-bottom:4px; }
.user-info p { font-size:13px; color:#999; }
.menu-list { background:#fff; border-radius:12px; box-shadow:0 1px 4px rgba(0,0,0,0.06); overflow:hidden; }
.menu-item { display:flex; justify-content:space-between; align-items:center; padding:14px 16px; border-bottom:1px solid #f5f5f5; font-size:14px; cursor:pointer; }
.menu-item:last-child { border-bottom:none; }
.arrow { color:#ccc; font-size:20px; }
</style>
`;
}

function genGitignore() {
  return `node_modules
dist
.env
.env.local
.vscode
.idea
*.log
db.json
tmp
package-lock.json
yarn.lock
.DS_Store
`;
}

function genEslintrc() {
  return `module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'no-undef': 'error',
    'no-console': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'off',
  },
};
`;
}

function genEslintignore() {
  return `node_modules
dist
public
backend
`;
}

function genPrettierrc() {
  return `{
  "tabWidth": 2,
  "singleQuote": true,
  "semi": true,
  "printWidth": 100,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
`;
}

function genEditorconfig() {
  return `root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
`;
}

function genLicense() {
  return `MIT License

Copyright (c) 2025 AI Template Factory

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;
}

function genReadme(name, templateType) {
  return `# ${name}

基于 AI 后台模板工厂生成的企业级管理系统，前后端一体，开箱即用。

## 技术栈

- **后台管理**: Vue 3 + Element Plus + Pinia + Vue Router + Vite
- **移动端 H5**: Vue 3 + Element Plus + Vue Router + Vite
- **后端**: Node.js + Express + lowdb
- **数据库**: lowdb (JSON 文件数据库，无需安装)

## 快速启动

\`\`\`bash
# 1. 安装根目录依赖
npm install

# 2. 安装后端依赖
cd backend && npm install && cd ..

# 3. 安装前端依赖
cd frontend/admin && npm install && cd ../..
cd frontend/h5 && npm install && cd ../..

# 4. 一键启动所有服务
npm run dev
\`\`\`

后台管理系统: http://localhost:3000
移动端 H5: http://localhost:3001
后端 API: http://localhost:8080

## 项目结构

\`\`\`
├── backend/              # Node.js 后端服务
│   ├── server.js         # Express 服务入口
│   ├── db.json           # lowdb 数据库文件
│   └── package.json
├── frontend/
│   ├── admin/            # 后台管理系统
│   │   ├── src/
│   │   │   ├── views/    # 页面组件
│   │   │   ├── components/ # 通用组件
│   │   │   ├── api/      # API 接口
│   │   │   └── router/   # 路由配置
│   │   └── package.json
│   └── h5/               # 移动端 H5 项目
│       ├── src/
│       │   ├── views/h5/ # 移动端页面
│       │   ├── api/      # API 接口
│       │   └── router/   # 路由配置
│       └── package.json
├── .editorconfig         # 编辑器配置
├── .eslintrc.js          # ESLint 配置
├── .prettierrc           # Prettier 配置
├── .gitignore            # Git 忽略配置
├── LICENSE               # 开源协议
├── package.json          # 根目录启动脚本
└── README.md
\`\`\`

## 功能说明

- 工作台仪表盘：数据统计概览
- 数据管理：增删改查完整 CRUD
- 移动端 H5：响应式移动端页面
- 动态接口：所有页面接入真实 API

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET  | /api/${templateType}/dashboard | 仪表盘数据 |
| GET  | /api/${templateType}/:resource/list | 列表查询 |
| POST | /api/${templateType}/:resource/add | 新增记录 |
| POST | /api/${templateType}/:resource/update | 更新记录 |
| POST | /api/${templateType}/:resource/delete | 删除记录 |

## 工程化配置

- ESLint: Vue 3 推荐规范
- Prettier: 统一代码格式化
- EditorConfig: 编辑器配置统一

\`\`\`bash
# 代码检查
npm run lint

# 自动修复
npm run lint:fix

# 代码格式化
npm run format
\`\`\`

## 开源协议

本项目采用 MIT License 开源协议。

---
> 由 AI 后台模板工厂自动生成
`;
}

export function getDownloadFiles(req, res) {
  try {
    const { templateType } = req.params;
    if (!industryNames[templateType]) {
      return res.status(400).json(fail('无效的模板类型', 400));
    }

    const name = industryNames[templateType];
    const color = industryColors[templateType] || '#409eff';
    const db = getDB();
    const templateData = {};
    for (const [key, value] of Object.entries(db.data)) {
      if (key.startsWith(templateType + '_')) {
        templateData[key] = value;
      }
    }

    const files = {
      'README.md': genReadme(name, templateType),
      'LICENSE': genLicense(),
      '.editorconfig': genEditorconfig(),
      '.eslintrc.js': genEslintrc(),
      '.eslintignore': genEslintignore(),
      '.prettierrc': genPrettierrc(),
      '.gitignore': genGitignore(),
      'package.json': genRootPackageJson(name),

      'backend/package.json': genBackendPackageJson(name),
      'backend/server.js': genServerJs(templateType),
      'backend/db.json': JSON.stringify(templateData, null, 2),

      'frontend/admin/package.json': genAdminPackageJson(name),
      'frontend/admin/vite.config.js': genViteConfig(3000),
      'frontend/admin/index.html': genIndexHtml(name + ' - 后台管理'),
      'frontend/admin/src/main.js': genMainJs(),
      'frontend/admin/src/App.vue': genAppVue(),
      'frontend/admin/src/utils/request.js': genRequestJs(),
      'frontend/admin/src/api/index.js': genApiIndexJs(templateType),
      'frontend/admin/src/router/index.js': genAdminRouterJs(templateType, name),
      'frontend/admin/src/views/Preview.vue': genPreviewVue(templateType, name, color),
      'frontend/admin/src/components/preview/DashboardPage.vue': genDashboardPage(),
      'frontend/admin/src/components/preview/ListPage.vue': genListPage(),

      'frontend/h5/package.json': genH5PackageJson(name),
      'frontend/h5/vite.config.js': genViteConfig(3001),
      'frontend/h5/index.html': genIndexHtml(name + ' - 移动端 H5'),
      'frontend/h5/src/main.js': genMainJs(),
      'frontend/h5/src/App.vue': genAppVue(),
      'frontend/h5/src/utils/request.js': genRequestJs(),
      'frontend/h5/src/api/index.js': genApiIndexJs(templateType),
      'frontend/h5/src/router/index.js': genH5RouterJs(templateType),
      'frontend/h5/src/views/h5/H5Layout.vue': genH5LayoutVue(templateType, color),
      [`frontend/h5/src/views/h5/${templateType}/Home.vue`]: genH5HomeVue(),
      [`frontend/h5/src/views/h5/${templateType}/PersonalCenter.vue`]: genH5PersonalVue(),
    };

    res.json(success({ files, projectName: name }));
  } catch (err) {
    console.error('下载接口错误:', err);
    res.status(500).json(fail('生成代码包失败', 500));
  }
}

function genDynamicPreviewVue(name, color, aiConfig) {
  const i18nJson = JSON.stringify(aiConfig.i18n || {}, null, 2)
  const menuListJson = JSON.stringify(aiConfig.menuList || [], null, 2)
  const pageModulesJson = JSON.stringify(aiConfig.pageModules || {}, null, 2)
  return `<template>
  <div style="min-height:100vh;background:#f0f4ff">
    <div v-if="!isLoggedIn" style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:linear-gradient(135deg,${color} 0%,${color}cc 100%)">
      <div style="width:400px;padding:40px;background:white;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.3);text-align:center">
        <h2 style="margin-bottom:8px">{{ $t('app.title') }}</h2>
        <p style="color:#999;margin-bottom:24px">{{ $t('app.subtitle') }}</p>
        <el-button type="primary" size="large" style="width:100%" @click="isLoggedIn=true">{{ $t('button.login') }}</el-button>
      </div>
    </div>
    <div v-else style="display:flex;height:100vh">
      <aside style="width:220px;background:#001529;color:white;display:flex;flex-direction:column">
        <div style="height:56px;display:flex;align-items:center;justify-content:center;font-weight:bold;border-bottom:1px solid rgba(255,255,255,0.1)">{{ $t('app.title') }}</div>
        <nav style="flex:1;padding:8px 0;overflow-y:auto">
          <template v-for="menu in menus" :key="menu.key">
            <div v-if="!menu.children" :style="{background:currentMenu===menu.key?'${color}':'',padding:'11px 20px',cursor:'pointer',fontSize:'14px'}" @click="currentMenu=menu.key">
              {{ $t('menu.' + menu.key) || menu.label }}
            </div>
            <div v-else>
              <div style="padding:11px 20px;cursor:pointer;fontSize:14px" @click="toggleGroup(menu.key)">
                {{ $t('menu.' + menu.key) || menu.label }}
              </div>
              <div v-show="expandedGroups.includes(menu.key)">
                <div v-for="sub in menu.children" :key="sub.key" :style="{background:currentSubMenu===sub.key?'${color}':'',padding:'9px 20px 9px 36px',cursor:'pointer',fontSize:'13px'}" @click="currentMenu=menu.key;currentSubMenu=sub.key">
                  {{ $t('menu.' + sub.key) || sub.label }}
                </div>
              </div>
            </div>
          </template>
        </nav>
      </aside>
      <main style="flex:1;display:flex;flex-direction:column;overflow:hidden">
        <header style="height:52px;background:white;border-bottom:1px solid #e5e6eb;display:flex;align-items:center;justify-content:space-between;padding:0 20px">
          <span style="font-weight:500">{{ currentLabel }}</span>
          <div style="display:flex;align-items:center;gap:12px">
            <el-select v-model="currentLang" size="small" style="width:100px" @change="switchLang">
              <el-option label="中文" value="zh" />
              <el-option label="English" value="en" />
            </el-select>
            <el-avatar :size="28" style="background:${color}">A</el-avatar>
          </div>
        </header>
        <div style="flex:1;padding:20px;overflow-y:auto">
          <div v-if="currentMenu==='dashboard'" style="animation:fadeIn 0.3s ease">
            <el-row :gutter="16" style="margin-bottom:20px">
              <el-col :span="6" v-for="(stat, i) in stats" :key="i">
                <el-card shadow="hover"><div style="font-size:24px;font-weight:700;color:${color}">{{ stat.value }}</div><div style="color:#999;font-size:13px;margin-top:4px">{{ $t('stats.' + stat.key) || stat.label }}</div></el-card>
              </el-col>
            </el-row>
            <el-card><h3>{{ $t('chart.trend') }}</h3><p style="color:#999">{{ $t('chart.placeholder') }}</p></el-card>
          </div>
          <div v-else style="animation:fadeIn 0.3s ease">
            <div style="display:flex;justify-content:space-between;margin-bottom:16px">
              <el-input v-model="keywords" placeholder="Search..." style="width:240px" />
              <el-button type="primary" :style="{background:${color},borderColor:${color}}">{{ $t('button.add') }}</el-button>
            </div>
            <el-table :data="currentRows" border stripe style="width:100%">
              <el-table-column v-for="col in currentColumns" :key="col" :prop="col" :label="$t('table.' + col) || col" />
              <el-table-column :label="$t('button.actions')" width="150">
                <template #default>
                  <el-button size="small">{{ $t('button.edit') }}</el-button>
                  <el-button size="small" type="danger">{{ $t('button.delete') }}</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination style="margin-top:16px;justify-content:flex-end" :total="50" :page-size="10" layout="prev, pager, next" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
const isLoggedIn = ref(false)
const currentMenu = ref('dashboard')
const currentSubMenu = ref('')
const currentLang = ref('zh')
const keywords = ref('')
const expandedGroups = ref([])

const menus = ${menuListJson}
const pageModules = ${pageModulesJson}
const i18n = ${i18nJson}

const stats = [{ key: 'today', label: '今日数据', value: '1,234' },{ key: 'total', label: '总记录', value: '12,345' },{ key: 'active', label: '活跃用户', value: '567' },{ key: 'rate', label: '完成率', value: '89.5%' }]

const currentLabel = computed(() => {
  let key = currentMenu.value
  if (currentSubMenu.value) key = currentSubMenu.value
  return currentLang.value === 'en' ? (i18n.en?.menu?.[key] || key) : (i18n.zh?.menu?.[key] || key)
})

const currentModule = computed(() => {
  const key = currentSubMenu.value || currentMenu.value
  return pageModules[key] || { columns: ['id','name','status'], rows: [] }
})
const currentColumns = computed(() => currentModule.value.columns || [])
const currentRows = computed(() => currentModule.value.rows || [])

const $t = (path) => {
  const keys = path.split('.')
  let val = currentLang.value === 'en' ? i18n.en : i18n.zh
  for (const k of keys) { if (val && typeof val === 'object') val = val[k] }
  return val || path.split('.').pop()
}
const toggleGroup = (key) => {
  const idx = expandedGroups.value.indexOf(key)
  idx > -1 ? expandedGroups.value.splice(idx, 1) : expandedGroups.value.push(key)
}
</script>
<style>
@keyframes fadeIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
</style>
`
}

function genI18nJs(aiConfig) {
  return `const messages = ${JSON.stringify(aiConfig.i18n || {}, null, 2)}
let current = 'zh'
function $t(path) { const keys = path.split('.'); let val = messages[current] || {}; for (const k of keys) { if (val) val = val[k] } return val || path }
function setLang(lang) { current = lang }
export { $t, setLang, messages }
`
}

export function downloadAiCode(req, res) {
  try {
    const { aiConfig } = req.body
    if (!aiConfig) {
      return res.status(400).json(fail('缺少AI配置', 400))
    }

    const name = aiConfig._meta?.industryName || 'AI管理后台'
    const color = aiConfig.themeConfig?.primaryColor || '#409eff'
    const templateType = aiConfig._meta?.industry || 'ai-project'

    const files = {
      'README.md': genReadme(name, templateType),
      'LICENSE': genLicense(),
      '.editorconfig': genEditorconfig(),
      '.eslintrc.js': genEslintrc(),
      '.eslintignore': genEslintignore(),
      '.prettierrc': genPrettierrc(),
      '.gitignore': genGitignore(),
      'package.json': genRootPackageJson(name),

      'backend/package.json': genBackendPackageJson(name),
      'backend/server.js': genServerJs(templateType),
      'backend/db.json': JSON.stringify({}, null, 2),

      'frontend/admin/package.json': genAdminPackageJson(name),
      'frontend/admin/vite.config.js': genViteConfig(3000),
      'frontend/admin/index.html': genIndexHtml(name + ' - 后台管理'),
      'frontend/admin/src/main.js': genMainJs(),
      'frontend/admin/src/App.vue': genAppVue(),
      'frontend/admin/src/utils/request.js': genRequestJs(),
      'frontend/admin/src/api/index.js': genApiIndexJs(templateType),
      'frontend/admin/src/i18n/index.js': genI18nJs(aiConfig),
      'frontend/admin/src/router/index.js': genAdminRouterJs(templateType, name),
      'frontend/admin/src/views/Preview.vue': genDynamicPreviewVue(name, color, aiConfig),

      'frontend/h5/package.json': genH5PackageJson(name),
      'frontend/h5/vite.config.js': genViteConfig(3001),
      'frontend/h5/index.html': genIndexHtml(name + ' - 移动端 H5'),
      'frontend/h5/src/main.js': genMainJs(),
      'frontend/h5/src/App.vue': genAppVue(),
      'frontend/h5/src/utils/request.js': genRequestJs(),
      'frontend/h5/src/api/index.js': genApiIndexJs(templateType),
      'frontend/h5/src/router/index.js': genH5RouterJs(templateType),
      'frontend/h5/src/views/h5/H5Layout.vue': genH5LayoutVue(templateType, color),
      [`frontend/h5/src/views/h5/${templateType}/Home.vue`]: genH5HomeVue(),
      [`frontend/h5/src/views/h5/${templateType}/PersonalCenter.vue`]: genH5PersonalVue(),
    }

    res.json(success({ files, projectName: name }))
  } catch (err) {
    console.error('AI代码下载错误:', err)
    res.status(500).json(fail('AI代码生成失败', 500))
  }
}
