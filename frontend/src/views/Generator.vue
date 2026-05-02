<template>
  <div class="generator-page">
    <div class="page-hero">
      <div class="hero-glow"></div>
      <span class="page-label">在线生成器</span>
      <h1>系统配置与生成<span class="accent">.</span></h1>
      <p>选择行业模板，配置系统参数，AI 自动生成企业级后台管理系统</p>
    </div>

    <div class="generator-layout">
      <div class="config-panel">
        <div class="panel-card">
          <div class="card-head">
            <el-icon><Setting /></el-icon>
            <span>系统配置</span>
          </div>
          <div class="card-body">
            <el-form :model="formConfig" label-position="top" size="large" class="dark-form">
              <el-form-item label="选择行业">
                <el-select
                  v-model="formConfig.industry"
                  placeholder="请选择行业类型"
                  style="width: 100%"
                  @change="onIndustryChange"
                  popper-class="dark-select-popper"
                >
                  <el-option
                    v-for="item in industries"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="系统名称">
                <el-input v-model="formConfig.systemName" placeholder="请输入系统名称" />
              </el-form-item>

              <el-form-item label="主题配色">
                <div class="color-picker">
                  <div
                    v-for="color in colorOptions"
                    :key="color"
                    class="color-item"
                    :class="{ active: formConfig.primaryColor === color }"
                    :style="{ background: color }"
                    @click="formConfig.primaryColor = color"
                  >
                    <svg v-if="formConfig.primaryColor === color" viewBox="0 0 12 12" class="check-icon"><path d="M2 6L5 9L10 3" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
                  </div>
                </div>
              </el-form-item>

              <el-divider>功能模块</el-divider>

              <el-form-item label="功能选项">
                <div class="feature-options">
                  <el-checkbox v-model="formConfig.includeAuth">权限管理</el-checkbox>
                  <el-checkbox v-model="formConfig.includeCharts">数据图表</el-checkbox>
                  <el-checkbox v-model="formConfig.includeI18n">多语言支持</el-checkbox>
                </div>
              </el-form-item>

              <button
                class="gen-btn"
                :disabled="isGenerating"
                @click="handleGenerate"
              >
                <span v-if="isGenerating" class="gen-spinner"></span>
                <el-icon v-else><MagicStick /></el-icon>
                {{ isGenerating ? 'AI 正在为您搭建后台系统...' : '立即生成后台系统' }}
              </button>
            </el-form>
          </div>
        </div>

        <div v-if="isGenerated" class="panel-card">
          <div class="card-head">
            <el-icon><EditPen /></el-icon>
            <span>AI 智能修改</span>
          </div>
          <div class="card-body">
            <div class="ai-input-section">
              <el-input
                v-model="aiInstruction"
                type="textarea"
                :rows="2"
                placeholder="输入指令修改后台，例如：把电商后台改成深色模式，加上销售趋势图"
              />

              <div class="quick-examples">
                <span class="example-label">快捷指令：</span>
                <button
                  v-for="cmd in quickCommands"
                  :key="cmd.label"
                  class="quick-btn"
                  :class="{ active: cmd.active }"
                  @click="executeQuickCommand(cmd)"
                >
                  {{ cmd.label }}
                </button>
              </div>

              <button
                class="modify-btn"
                :disabled="isModifying"
                @click="handleAiModify"
              >
                <span v-if="isModifying" class="gen-spinner"></span>
                <el-icon v-else><MagicStick /></el-icon>
                {{ isModifying ? 'AI 正在执行修改...' : 'AI 执行修改' }}
              </button>

              <div v-if="aiResponse" class="ai-response">
                <div class="ai-response-header">
                  <svg viewBox="0 0 16 16" fill="none" class="resp-check"><circle cx="8" cy="8" r="6" stroke="#3b82f6" stroke-width="1.5"/><path d="M5 8L7 10L11 6" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  AI 修改结果
                </div>
                <p>{{ aiResponse }}</p>
              </div>

              <div v-if="aiCodeSnippet" class="ai-code-section">
                <div class="ai-code-header">生成代码片段</div>
                <pre class="ai-code-content"><code>{{ aiCodeSnippet }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="preview-panel">
        <div class="preview-topbar">
          <div class="preview-topbar-title">
            <svg viewBox="0 0 16 16" fill="none" class="tb-icon"><rect x="2" y="2" width="12" height="10" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M5 16H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 12V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            AI 实时渲染预览
          </div>
          <div v-if="isGenerated" class="preview-topbar-actions">
            <el-button size="small" @click="goToFullPreview">
              <el-icon><View /></el-icon>后台预览
            </el-button>
            <el-dropdown @command="goToUserPortalMode" popper-class="dark-dropdown">
              <el-button size="small" type="warning">
                <el-icon><Iphone /></el-icon>用户端
                <el-icon class="el-icon--right"><ArrowDown /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="pc"><el-icon><Monitor /></el-icon> PC 版预览</el-dropdown-item>
                  <el-dropdown-item command="h5"><el-icon><Iphone /></el-icon> H5 版预览</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-button size="small" type="success" :loading="isDownloading" @click="handleDownload">
              <el-icon><Download /></el-icon>下载代码
            </el-button>
          </div>
        </div>

        <div class="preview-content">
          <div v-if="!isGenerated && !isGenerating" class="empty-preview">
            <svg viewBox="0 0 48 48" fill="none" class="empty-icon">
              <rect x="4" y="4" width="40" height="32" rx="3" stroke="currentColor" stroke-width="1.5"/>
              <path d="M14 42H34" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M24 34V42" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <p>配置完成后点击生成按钮</p>
            <p class="sub-text">AI 将为您实时渲染后台预览效果</p>
          </div>

          <div v-else-if="isGenerating" class="generating-state">
            <div class="gen-loading">
              <div class="gen-ring"></div>
            </div>
            <h3>AI 正在为您搭建后台系统...</h3>
            <p>正在分析需求 · 生成页面组件 · 配置路由状态</p>
            <div class="progress-steps">
              <div class="pstep" :class="{ done: generateStep >= 1 }">
                <span class="pstep-num">1</span>分析配置
              </div>
              <div class="pstep-line" :class="{ done: generateStep >= 2 }"></div>
              <div class="pstep" :class="{ done: generateStep >= 2 }">
                <span class="pstep-num">2</span>生成代码
              </div>
              <div class="pstep-line" :class="{ done: generateStep >= 3 }"></div>
              <div class="pstep" :class="{ done: generateStep >= 3 }">
                <span class="pstep-num">3</span>渲染预览
              </div>
            </div>
          </div>

          <div v-else class="preview-frame">
            <div class="mini-admin" :class="{ 'dark-mode': isDarkMode }">
              <aside
                class="mini-sidebar"
                :style="{ background: isDarkMode ? '#0f0f23' : '#060612' }"
              >
                <div class="mini-logo">
                  <el-icon :size="16" :color="formConfig.primaryColor"><MagicStick /></el-icon>
                  <span>{{ formConfig.systemName || '管理系统' }}</span>
                </div>
                <nav class="mini-menu">
                  <div v-for="menu in currentConfig.menus" :key="menu.key">
                    <div
                      v-if="!menu.children"
                      :class="['mini-menu-item', { active: previewMenu === menu.key }]"
                      :style="previewMenu === menu.key ? { background: formConfig.primaryColor + '22', color: formConfig.primaryColor } : {}"
                      @click="previewMenu = menu.key; previewSubMenu = ''"
                    >
                      <el-icon :size="14"><component :is="menu.icon" /></el-icon>
                      <span>{{ menu.label }}</span>
                    </div>
                    <div v-if="menu.children" :class="['mini-menu-group', { expanded: expandedPreviewGroups.includes(menu.key) }]">
                      <div class="mini-menu-item parent" @click="togglePreviewGroup(menu.key)">
                        <el-icon :size="14"><component :is="menu.icon" /></el-icon>
                        <span>{{ menu.label }}</span>
                        <el-icon :size="10" class="arrow"><ArrowRight /></el-icon>
                      </div>
                      <div v-show="expandedPreviewGroups.includes(menu.key)" class="mini-sub-menu">
                        <div
                          v-for="sub in menu.children"
                          :key="sub.key"
                          :class="['mini-sub-item', { active: previewSubMenu === sub.key }]"
                          :style="previewSubMenu === sub.key ? { color: formConfig.primaryColor, background: formConfig.primaryColor + '15' } : {}"
                          @click="previewMenu = menu.key; previewSubMenu = sub.key"
                        >{{ sub.label }}</div>
                      </div>
                    </div>
                  </div>
                </nav>
              </aside>
              <main class="mini-main" :style="{ background: isDarkMode ? '#0a0a1a' : '#0f0f23' }">
                <header class="mini-header">
                  <span class="mini-breadcrumb">{{ currentPreviewMenuLabel }}</span>
                  <div class="mini-user">
                    <el-avatar :size="24" :style="{ background: formConfig.primaryColor }">A</el-avatar>
                    <span>管理员</span>
                  </div>
                </header>
                <div class="mini-body">
                  <div v-if="previewMenu === 'dashboard' && !previewSubMenu" class="mini-dashboard">
                    <div class="mini-stats">
                      <div v-for="(stat, i) in currentConfig.stats" :key="i" class="mini-stat-card" :style="{ borderLeftColor: formConfig.primaryColor }">
                        <div class="mini-stat-val" :style="{ color: formConfig.primaryColor }">{{ stat.value }}</div>
                        <div class="mini-stat-label">{{ stat.label }}</div>
                        <div class="mini-stat-trend" :class="stat.up ? 'up' : 'down'">{{ stat.trend }}</div>
                      </div>
                    </div>
                    <div class="mini-charts">
                      <div class="mini-chart-card">
                        <h4>趋势分析</h4>
                        <svg viewBox="0 0 300 120" style="width:100%;height:120px">
                          <defs>
                            <linearGradient id="pg2" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" :style="`stop-color:${formConfig.primaryColor};stop-opacity:0.3`"/>
                              <stop offset="100%" :style="`stop-color:${formConfig.primaryColor};stop-opacity:0.03`"/>
                            </linearGradient>
                          </defs>
                          <path d="M0,90 L40,70 L80,85 L120,45 L160,60 L200,30 L240,50 L280,25 L300,40 L300,120 L0,120 Z" fill="url(#pg2)"/>
                          <polyline points="0,90 40,70 80,85 120,45 160,60 200,30 240,50 280,25 300,40" fill="none" :stroke="formConfig.primaryColor" stroke-width="2"/>
                        </svg>
                      </div>
                      <div class="mini-chart-card">
                        <h4>数据分布</h4>
                        <svg viewBox="0 0 200 200" style="width:120px;height:120px;margin:0 auto;display:block">
                          <circle cx="100" cy="100" r="60" fill="none" :stroke="formConfig.primaryColor" stroke-width="25" stroke-dasharray="94 283" stroke-dashoffset="0" transform="rotate(-90 100 100)"/>
                          <circle cx="100" cy="100" r="60" fill="none" stroke="#10b981" stroke-width="25" stroke-dasharray="75 302" stroke-dashoffset="-94" transform="rotate(-90 100 100)"/>
                          <circle cx="100" cy="100" r="60" fill="none" stroke="#f59e0b" stroke-width="25" stroke-dasharray="57 320" stroke-dashoffset="-169" transform="rotate(-90 100 100)"/>
                        </svg>
                      </div>
                    </div>
                    <div v-if="hasExtraChart" class="mini-chart-card extra-chart">
                      <h4>销售趋势</h4>
                      <svg viewBox="0 0 400 150" style="width:100%;height:150px">
                        <defs>
                          <linearGradient id="eg2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" :style="`stop-color:${formConfig.primaryColor};stop-opacity:0.2`"/>
                            <stop offset="100%" :style="`stop-color:${formConfig.primaryColor};stop-opacity:0.02`"/>
                          </linearGradient>
                        </defs>
                        <path d="M0,120 L33,100 L66,110 L99,70 L132,85 L165,50 L198,65 L231,40 L264,55 L297,30 L330,45 L363,25 L400,35 L400,150 L0,150 Z" fill="url(#eg2)"/>
                        <polyline points="0,120 33,100 66,110 99,70 132,85 165,50 198,65 231,40 264,55 297,30 330,45 363,25 400,35" fill="none" :stroke="formConfig.primaryColor" stroke-width="2.5"/>
                        <text v-for="(m, i) in ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']" :key="i" :x="i*33+16" y="145" font-size="9" fill="#64748b" text-anchor="middle">{{ m }}</text>
                      </svg>
                    </div>
                  </div>
                  <div v-else class="mini-list-page">
                    <div class="mini-page-header">
                      <h3>{{ currentPreviewPageTitle }}</h3>
                      <div class="mini-actions">
                        <el-button size="small" :style="{ background: formConfig.primaryColor, borderColor: formConfig.primaryColor, color: '#fff' }">新增</el-button>
                        <el-button v-if="hasExportBtn" size="small">导出</el-button>
                      </div>
                    </div>
                    <div class="mini-search-bar">
                      <el-input size="small" placeholder="搜索..." style="width:200px"/>
                      <el-button size="small" :style="{ borderColor: formConfig.primaryColor, color: formConfig.primaryColor }">查询</el-button>
                    </div>
                    <table class="mini-table">
                      <thead>
                        <tr>
                          <th v-if="hasExportBtn" class="mini-th"><el-checkbox size="small"/></th>
                          <th v-for="col in currentPreviewColumns" :key="col" class="mini-th">{{ col }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(row, ri) in currentPreviewRows" :key="ri">
                          <td v-if="hasExportBtn" class="mini-td"><el-checkbox size="small"/></td>
                          <td v-for="(cell, ci) in row" :key="ci" class="mini-td">
                            <template v-if="isStatusCell(cell)"><el-tag :type="getStatusType(cell)" size="small">{{ cell }}</el-tag></template>
                            <template v-else>{{ cell }}</template>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="mini-pagination">
                      <el-pagination small layout="prev, pager, next" :total="50" :page-size="10"/>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import {
  Setting,
  MagicStick,
  EditPen,
  Monitor,
  View,
  Download,
  ArrowRight,
  CircleCheck,
  Iphone,
  ArrowDown,
} from '@element-plus/icons-vue';
import industryConfigs from '@/config/industries.js';
import AppFooter from '@/components/AppFooter.vue';
import { useAiMenuStore } from '@/stores/aiMenu.js';
import { getDownloadFiles } from '@/api';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const route = useRoute();
const router = useRouter();
const aiMenuStore = useAiMenuStore();

const formConfig = reactive({
  industry: 'ecommerce',
  systemName: '电商后台管理系统',
  primaryColor: '#409eff',
  includeAuth: true,
  includeCharts: true,
  includeI18n: false,
});

const isGenerating = ref(false);
const isGenerated = ref(false);
const generateStep = ref(0);
const isModifying = ref(false);
const isDarkMode = ref(false);
const hasExtraChart = ref(false);
const hasExportBtn = ref(false);
const aiInstruction = ref('');
const aiResponse = ref('');
const aiCodeSnippet = ref('');

const previewMenu = ref('dashboard');
const previewSubMenu = ref('');
const expandedPreviewGroups = ref([]);

const industries = [
  { value: 'ecommerce', label: '电商零售', color: '#409eff' },
  { value: 'education', label: '教育培训', color: '#67c23a' },
  { value: 'government', label: '政务服务', color: '#e6a23c' },
  { value: 'medical', label: '医疗健康', color: '#f56c6c' },
  { value: 'logistics', label: '物流仓储', color: '#909399' },
  { value: 'hr', label: '人力资源', color: '#b195eb' },
  { value: 'finance', label: '财务金融', color: '#2f9999' },
  { value: 'restaurant', label: '门店管理', color: '#ff9f40' },
  { value: 'community', label: '社区物业', color: '#00b42a' },
  { value: 'project', label: '项目管理', color: '#13c2c2' },
];

const colorOptions = [
  '#409eff',
  '#67c23a',
  '#e6a23c',
  '#f56c6c',
  '#909399',
  '#b195eb',
  '#2f9999',
  '#ff9f40',
  '#00b42a',
  '#13c2c2',
];

const quickCommands = ref([
  { label: '切换深色模式', action: 'dark-mode', active: false },
  { label: '新增销售趋势图', action: 'add-chart', active: false },
  { label: '表格加批量导出', action: 'add-export', active: false },
]);

const currentConfig = computed(() => {
  return industryConfigs[formConfig.industry] || industryConfigs.ecommerce;
});

const currentPreviewMenuLabel = computed(() => {
  if (!previewSubMenu.value) {
    const menu = currentConfig.value.menus.find(m => m.key === previewMenu.value);
    return menu ? menu.label : '工作台';
  }
  const parent = currentConfig.value.menus.find(m => m.key === previewMenu.value);
  const child = parent?.children?.find(s => s.key === previewSubMenu.value);
  return `${parent?.label || ''} / ${child?.label || ''}`;
});

const currentPreviewPageTitle = computed(() => {
  if (previewSubMenu.value && currentConfig.value.listData?.[previewSubMenu.value]) {
    return currentConfig.value.listData[previewSubMenu.value].title;
  }
  const parent = currentConfig.value.menus.find(m => m.key === previewMenu.value);
  const child = parent?.children?.find(s => s.key === previewSubMenu.value);
  return child?.label || '数据列表';
});

const currentPreviewColumns = computed(() => {
  if (previewSubMenu.value && currentConfig.value.listData?.[previewSubMenu.value]) {
    return currentConfig.value.listData[previewSubMenu.value].columns || [];
  }
  return ['编号', '名称', '状态', '操作'];
});

const currentPreviewRows = computed(() => {
  if (previewSubMenu.value && currentConfig.value.listData?.[previewSubMenu.value]) {
    return currentConfig.value.listData[previewSubMenu.value].rows || [];
  }
  return [['001', '示例数据', '正常', '编辑']];
});

const statusKeywords = [
  '在售',
  '已完成',
  '已发货',
  '已通过',
  '已到账',
  '已发布',
  '正常',
  '启用',
  '在职',
  '已上线',
  '已签收',
  '已审批',
  '在岗',
  '可办理',
  '在读',
  '已就诊',
  '已取药',
  '运行中',
  '可用',
  '进行中',
];
const dangerKeywords = [
  '缺货',
  '已取消',
  '逾期',
  '预警',
  '禁用',
  '休学',
  '欠费',
  '待处理',
  '待审批',
  '出差',
  '暂停',
  '维修中',
  '已下线',
];

const isStatusCell = cell => {
  if (typeof cell !== 'string') return false;
  return statusKeywords.concat(dangerKeywords).some(k => cell.includes(k));
};

const getStatusType = cell => {
  if (dangerKeywords.some(k => cell.includes(k))) return 'danger';
  if (statusKeywords.some(k => cell.includes(k))) return 'success';
  return 'info';
};

const onIndustryChange = val => {
  const ind = industries.find(i => i.value === val);
  if (ind) {
    formConfig.primaryColor = ind.color;
    formConfig.systemName = currentConfig.value.name;
  }
  previewMenu.value = 'dashboard';
  previewSubMenu.value = '';
  expandedPreviewGroups.value = [];
};

const togglePreviewGroup = key => {
  const idx = expandedPreviewGroups.value.indexOf(key);
  if (idx > -1) expandedPreviewGroups.value.splice(idx, 1);
  else expandedPreviewGroups.value.push(key);
};

const handleGenerate = async () => {
  isGenerating.value = true;
  generateStep.value = 0;
  for (let i = 1; i <= 3; i++) {
    await new Promise(r => setTimeout(r, 800));
    generateStep.value = i;
  }
  isGenerating.value = false;
  isGenerated.value = true;
  ElMessage.success('后台系统生成完成！');
};

const goToFullPreview = () => {
  const idMap = {
    ecommerce: 1,
    education: 2,
    government: 3,
    medical: 4,
    logistics: 5,
    restaurant: 6,
    finance: 8,
    hr: 9,
    project: 10,
    community: 11,
  };
  const id = idMap[formConfig.industry] || 1;
  router.push(`/preview/${id}`);
};

const goToUserPortalMode = mode => {
  router.push(`/user-portal/${formConfig.industry}?mode=${mode}`);
};

const isDownloading = ref(false);

const handleDownload = async () => {
  if (isDownloading.value) return;
  isDownloading.value = true;
  const loadingMsg = ElMessage({ message: '正在打包代码，请稍候...', type: 'info', duration: 0 });
  try {
    const res = await getDownloadFiles(formConfig.industry);
    if (!res.data?.files) throw new Error('获取代码包失败');
    const zip = new JSZip();
    const projectName = res.data.projectName || 'project';
    for (const [path, content] of Object.entries(res.data.files)) {
      zip.file(`${projectName}/${path}`, content);
    }
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `${projectName}.zip`);
    loadingMsg.close();
    ElMessage.success('项目代码包已下载，解压后直接 npm install && npm run dev 即可启动');
  } catch (e) {
    loadingMsg.close();
    console.error(e);
    ElMessage.error('代码包生成失败，请稍后重试');
  }
  isDownloading.value = false;
};

const executeQuickCommand = cmd => {
  if (cmd.action === 'dark-mode') {
    isDarkMode.value = !isDarkMode.value;
    cmd.active = isDarkMode.value;
    cmd.label = isDarkMode.value ? '切换浅色模式' : '切换深色模式';
    aiResponse.value = isDarkMode.value
      ? '已为您完成修改，后台已更新为深色模式'
      : '已为您完成修改，后台已恢复为浅色模式';
    aiCodeSnippet.value = isDarkMode.value
      ? `html {\n  --el-bg-color: #1a1a2e;\n  --el-text-color-primary: #ccc;\n}`
      : '';
  } else if (cmd.action === 'add-chart') {
    hasExtraChart.value = !hasExtraChart.value;
    cmd.active = hasExtraChart.value;
    aiResponse.value = hasExtraChart.value
      ? '已为您新增销售趋势折线图，展示近12个月数据变化'
      : '已移除销售趋势图';
    aiCodeSnippet.value = hasExtraChart.value
      ? `const chartOption = {\n  title: { text: '销售趋势' },\n  xAxis: { data: months },\n  yAxis: {},\n  series: [{ type: 'line', data: sales }]\n}`
      : '';
  } else if (cmd.action === 'add-export') {
    hasExportBtn.value = !hasExportBtn.value;
    cmd.active = hasExportBtn.value;
    aiResponse.value = hasExportBtn.value ? '已为表格添加批量选择和导出功能' : '已移除批量导出功能';
    aiCodeSnippet.value = hasExportBtn.value
      ? `<el-table-column type="selection" />\n<el-button @click="handleExport">\n  导出选中数据\n</el-button>`
      : '';
  }
};

const handleAiModify = async () => {
  if (!aiInstruction.value.trim()) return;
  isModifying.value = true;
  aiResponse.value = '';
  aiCodeSnippet.value = '';
  await new Promise(r => setTimeout(r, 1500));

  const inst = aiInstruction.value.toLowerCase();
  if (inst.includes('深色') || inst.includes('暗色') || inst.includes('dark')) {
    isDarkMode.value = true;
    quickCommands.value[0].active = true;
    quickCommands.value[0].label = '切换浅色模式';
    aiResponse.value = '已为您完成修改，后台已更新为深色模式';
    aiCodeSnippet.value = `html { \n  --el-bg-color: #1a1a2e;\n  --el-text-color-primary: #ccc;\n}`;
  } else if (inst.includes('趋势') || inst.includes('折线') || inst.includes('图表')) {
    hasExtraChart.value = true;
    quickCommands.value[1].active = true;
    aiResponse.value = '已为您新增销售趋势折线图，展示近12个月数据变化';
    aiCodeSnippet.value = `const chartOption = {\n  title: { text: '销售趋势' },\n  xAxis: { data: months },\n  yAxis: {},\n  series: [{ type: 'line', data: sales }]\n}`;
  } else if (inst.includes('导出') || inst.includes('批量')) {
    hasExportBtn.value = true;
    quickCommands.value[2].active = true;
    aiResponse.value = '已为表格添加批量选择和导出功能';
    aiCodeSnippet.value = `<el-table-column type="selection" />\n<el-button @click="handleExport">\n  导出选中数据\n</el-button>`;
  } else if (inst.includes('树形')) {
    aiResponse.value = '已将普通表格修改为树形结构，支持层级展开和折叠';
    aiCodeSnippet.value = `<el-table :data="treeData" row-key="id"\n  :tree-props="{ children: 'children' }">\n  <el-table-column prop="name" />\n</el-table>`;
  } else if (inst.includes('蓝') || inst.includes('颜色')) {
    formConfig.primaryColor = '#409eff';
    aiResponse.value = '已将主题色修改为蓝色';
    aiCodeSnippet.value = `:root { --primary-color: #409eff; }`;
  } else {
    aiResponse.value = '已根据您的指令完成修改，预览区已实时更新';
    aiCodeSnippet.value = `// AI 生成的修改代码\n// 根据指令：${aiInstruction.value}`;
  }

  isModifying.value = false;
  aiInstruction.value = '';
};

onMounted(() => {
  if (route.query.fromAi === 'true') {
    formConfig.industry = aiMenuStore.selectedIndustry;
    formConfig.systemName = aiMenuStore.getCurrentSystemName();
    formConfig.primaryColor = aiMenuStore.getCurrentThemeColor();
    isGenerated.value = true;
  } else if (route.query.templateId) {
    const idToKey = {
      1: 'ecommerce',
      2: 'education',
      3: 'government',
      4: 'medical',
      5: 'logistics',
      6: 'restaurant',
      8: 'finance',
      9: 'hr',
      10: 'project',
      11: 'community',
    };
    const key = idToKey[parseInt(route.query.templateId)];
    if (key) {
      formConfig.industry = key;
      formConfig.systemName = industryConfigs[key]?.name || '';
      formConfig.primaryColor = industryConfigs[key]?.color || '#409eff';
    }
  }
});

watch(
  () => formConfig.industry,
  () => {
    previewMenu.value = 'dashboard';
    previewSubMenu.value = '';
    expandedPreviewGroups.value = [];
  }
);
</script>

<style lang="scss" scoped>
$bg: #0a0a1a;
$surface: #13132a;
$surface2: #1a1a35;
$primary: #3b82f6;
$text-primary: #f1f5f9;
$text-secondary: #94a3b8;
$text-muted: #64748b;
$border: rgba(255,255,255,0.06);
$border-hover: rgba(99,161,247,0.25);
$radius: 14px;
$radius-sm: 8px;

.generator-page {
  min-height: 100vh;
  background: $bg;
}

// ===== Page Hero =====
.page-hero {
  text-align: center;
  padding: 48px 32px 40px;
  position: relative;

  .hero-glow {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    height: 180px;
    background: radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
}

.page-label {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: $primary;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 16px;
  background: rgba(59,130,246,0.1);
  border: 1px solid rgba(59,130,246,0.15);
  padding: 5px 14px;
  border-radius: 4px;
  position: relative;
  z-index: 1;
}

.page-hero h1 {
  font-size: 42px;
  font-weight: 800;
  color: $text-primary;
  letter-spacing: -0.03em;
  margin-bottom: 14px;
  position: relative;
  z-index: 1;

  .accent { color: $primary; }
}

.page-hero p {
  font-size: 16px;
  color: $text-secondary;
  position: relative;
  z-index: 1;
}

// ===== Layout =====
.generator-layout {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 28px;
  padding: 0 32px 80px;
  max-width: 1440px;
  margin: 0 auto;
}

.config-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

// ===== Panel Card =====
.panel-card {
  background: $surface;
  border: 1px solid $border;
  border-radius: $radius;
  overflow: hidden;
}

.card-head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 24px;
  font-size: 16px;
  font-weight: 600;
  color: $text-primary;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: rgba(255,255,255,0.01);

  .el-icon { color: $primary; }
}

.card-body {
  padding: 24px;
}

// ===== Dark Form overrides =====
.dark-form {
  :deep(.el-form-item__label) {
    color: $text-secondary;
    font-weight: 500;
    font-size: 13px;
  }

  :deep(.el-input__wrapper),
  :deep(.el-textarea__inner) {
    background: rgba(0,0,0,0.25) !important;
    border-color: rgba(255,255,255,0.08) !important;
    box-shadow: none !important;
    border-radius: $radius-sm;

    &:hover { border-color: rgba(255,255,255,0.15) !important; }
  }

  :deep(.el-input__inner),
  :deep(.el-textarea__inner) {
    color: $text-primary !important;
    &::placeholder { color: $text-muted; }
  }

  :deep(.el-select .el-input__wrapper) {
    background: rgba(0,0,0,0.25) !important;
  }

  :deep(.el-divider) {
    border-color: rgba(255,255,255,0.06);
  }

  :deep(.el-divider__text) {
    background: $surface;
    color: $text-muted;
    font-size: 12px;
    font-weight: 600;
  }

  :deep(.el-checkbox__label) {
    color: $text-secondary;
    font-size: 14px;
  }

  :deep(.el-checkbox__inner) {
    background: rgba(0,0,0,0.25);
    border-color: rgba(255,255,255,0.15);
  }
}

// ===== Color Picker =====
.color-picker {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.color-item {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.25s;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover { transform: scale(1.12); }

  &.active {
    border-color: #fff;
    box-shadow: 0 0 0 2px $surface, 0 0 0 4px currentColor;
  }
}

.check-icon {
  width: 12px;
  height: 12px;
}

// ===== Feature Options =====
.feature-options {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

// ===== Generate Button =====
.gen-btn {
  width: 100%;
  margin-top: 8px;
  padding: 16px 24px;
  background: linear-gradient(135deg, $primary, #1d4ed8);
  color: #fff;
  border: none;
  border-radius: $radius-sm;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  font-family: inherit;
  position: relative;
  box-shadow: 0 0 20px rgba(59,130,246,0.2);

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 0 32px rgba(59,130,246,0.35);
  }

  &:disabled {
    opacity: 0.8;
    cursor: wait;
  }
}

.gen-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

.modify-btn {
  width: 100%;
  margin-top: 14px;
  padding: 12px 24px;
  background: rgba(59,130,246,0.12);
  color: $primary;
  border: 1px solid rgba(59,130,246,0.25);
  border-radius: $radius-sm;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover:not(:disabled) {
    background: rgba(59,130,246,0.18);
    border-color: rgba(59,130,246,0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }
}

// ===== Quick Commands =====
.quick-examples {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.example-label {
  font-size: 12px;
  color: $text-muted;
  font-weight: 500;
}

.quick-btn {
  padding: 5px 14px;
  font-size: 12px;
  font-weight: 500;
  background: rgba(255,255,255,0.04);
  color: $text-secondary;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.25s;
  font-family: inherit;

  &:hover { border-color: rgba(255,255,255,0.15); color: $text-primary; }

  &.active {
    background: rgba(59,130,246,0.15);
    border-color: rgba(59,130,246,0.3);
    color: $primary;
  }
}

// ===== AI Response =====
.ai-response {
  margin-top: 14px;
  padding: 14px 16px;
  background: rgba(59,130,246,0.06);
  border: 1px solid rgba(59,130,246,0.12);
  border-radius: $radius-sm;
}

.ai-response-header {
  display: flex;
  align-items: center;
  gap: 7px;
  font-weight: 600;
  color: $primary;
  margin-bottom: 8px;
  font-size: 13px;
}

.resp-check {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.ai-response p {
  font-size: 13px;
  color: $text-secondary;
  line-height: 1.6;
  margin: 0;
}

// ===== AI Code Section =====
.ai-code-section {
  margin-top: 14px;
  border-radius: $radius-sm;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.06);
}

.ai-code-header {
  padding: 9px 14px;
  background: #16162a;
  color: $text-muted;
  font-size: 12px;
  font-weight: 600;
}

.ai-code-content {
  padding: 14px;
  background: #0e0e20;
  margin: 0;
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 12px;
  line-height: 1.7;
  color: #94a3b8;
  overflow-x: auto;

  code { font-family: inherit; }
}

// ===== Preview Panel =====
.preview-panel {
  background: $surface;
  border: 1px solid $border;
  border-radius: $radius;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 260px);
  position: sticky;
  top: 0;
  overflow: hidden;
}

.preview-topbar {
  padding: 16px 22px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  background: rgba(255,255,255,0.01);
}

.preview-topbar-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: $text-primary;

  .tb-icon { width: 16px; height: 16px; color: $primary; }
}

.preview-topbar-actions {
  display: flex;
  gap: 8px;
}

.preview-content {
  flex: 1;
  position: relative;
  overflow: hidden;
}

// ===== Empty State =====
.empty-preview {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  .empty-icon {
    width: 80px;
    height: 80px;
    color: rgba(148,163,184,0.15);
    margin-bottom: 20px;
  }

  p {
    font-size: 15px;
    color: $text-muted;
    margin-bottom: 8px;
  }

  .sub-text {
    font-size: 13px;
    color: rgba(148,163,184,0.4);
    margin-top: 6px;
  }
}

// ===== Generating State =====
.generating-state {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  h3 {
    font-size: 18px;
    color: $text-primary;
    margin: 24px 0 12px;
  }

  p {
    color: $text-secondary;
    font-size: 14px;
    margin-bottom: 36px;
  }
}

.gen-loading {
  margin-bottom: 4px;
}

.gen-ring {
  width: 56px;
  height: 56px;
  border: 3px solid rgba(59,130,246,0.1);
  border-top-color: $primary;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto;
}

.progress-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
}

.pstep {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(255,255,255,0.03);
  border-radius: 24px;
  font-size: 13px;
  color: $text-muted;
  transition: all 0.4s;

  &.done {
    background: rgba(59,130,246,0.1);
    color: $primary;
    font-weight: 600;
  }
}

.pstep-num {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(255,255,255,0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;

  .done & {
    background: $primary;
    color: #fff;
  }
}

.pstep-line {
  width: 28px;
  height: 2px;
  background: rgba(255,255,255,0.06);
  transition: background 0.4s;

  &.done { background: rgba(59,130,246,0.4); }
}

// ===== Preview Frame (Mini Admin) =====
.preview-frame {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.mini-admin {
  display: flex;
  height: 100%;
  font-size: 12px;
}

.mini-sidebar {
  width: 180px;
  color: #94a3b8;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
  border-right: 1px solid rgba(255,255,255,0.04);
}

.mini-logo {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 700;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  white-space: nowrap;
  overflow: hidden;
  color: #e2e8f0;
}

.mini-menu {
  flex: 1;
  padding: 6px 0;
  overflow-y: auto;
}

.mini-menu-item {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 9px 14px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  font-size: 12px;
  color: #94a3b8;
  border-radius: 6px;
  margin: 1px 8px;

  &:hover { background: rgba(255,255,255,0.04); color: #e2e8f0; }

  &.parent .arrow {
    margin-left: auto;
    transition: transform 0.25s;
    font-size: 10px;
  }
}

.mini-menu-group.expanded .mini-menu-item.parent .arrow { transform: rotate(90deg); }

.mini-sub-menu {
  background: rgba(0,0,0,0.2);
  margin: 0 8px;
  border-radius: 6px;
  overflow: hidden;

  .mini-sub-item {
    padding: 8px 14px 8px 32px;
    font-size: 11px;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
    color: #64748b;

    &:hover { color: #94a3b8; background: rgba(255,255,255,0.03); }
  }
}

.mini-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.mini-header {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  flex-shrink: 0;
  background: rgba(255,255,255,0.01);

  .mini-breadcrumb {
    font-size: 13px;
    font-weight: 500;
    color: $text-secondary;
  }

  .mini-user {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: $text-muted;
  }
}

.mini-body {
  flex: 1;
  padding: 14px;
  overflow-y: auto;
}

.mini-dashboard { animation: fadeIn 0.3s ease; }

.mini-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 14px;
}

.mini-stat-card {
  padding: 12px 10px;
  background: $surface2;
  border-radius: $radius-sm;
  border: 1px solid rgba(255,255,255,0.04);
  border-left: 3px solid $primary;
  transition: all 0.3s;

  .mini-stat-val { font-size: 20px; font-weight: 800; }
  .mini-stat-label { font-size: 11px; color: $text-muted; margin-top: 4px; }
  .mini-stat-trend { font-size: 11px; font-weight: 600; margin-top: 4px; }
}

.mini-stat-trend {
  &.up { color: #10b981; }
  &.down { color: #ef4444; }
}

.mini-charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 14px;
}

.mini-chart-card {
  padding: 14px;
  background: $surface2;
  border-radius: $radius-sm;
  border: 1px solid rgba(255,255,255,0.04);

  h4 {
    font-size: 13px;
    font-weight: 600;
    color: #e2e8f0;
    margin-bottom: 10px;
  }
}

.extra-chart { animation: fadeIn 0.5s ease; }

.mini-list-page { animation: fadeIn 0.3s ease; }

.mini-page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  h3 {
    font-size: 15px;
    font-weight: 600;
    color: $text-primary;
  }

  .mini-actions { display: flex; gap: 6px; }
}

.mini-search-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.mini-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: $radius-sm;
  overflow: hidden;
  background: $surface2;
  border: 1px solid rgba(255,255,255,0.04);
}

.mini-th {
  padding: 9px 12px;
  text-align: left;
  font-weight: 600;
  font-size: 11px;
  white-space: nowrap;
  background: rgba(0,0,0,0.2);
  color: $text-muted;
}

.mini-td {
  padding: 8px 12px;
  font-size: 11px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  white-space: nowrap;
  color: $text-secondary;
}

.mini-pagination {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
}

// ===== Animations =====
@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

// ===== Responsive =====
@media (max-width: 1200px) {
  .generator-layout { grid-template-columns: 1fr; }
  .preview-panel { height: 600px; position: static; }
}

@media (max-width: 640px) {
   .page-hero { padding: 90px 16px 30px; }
   .page-hero h1 { font-size: 28px; }
   .generator-layout { padding: 0 16px 60px; }
   .preview-topbar { flex-direction: column; gap: 10px; align-items: flex-start; }
 }
</style>

<style lang="scss">
.dark-select-popper,
.dark-dropdown {
  background: #13132a !important;
  border: 1px solid rgba(255,255,255,0.08) !important;

  .el-select-dropdown__item,
  .el-dropdown-menu__item {
    color: #94a3b8 !important;

    &:hover,
    &.is-hovering { background: rgba(59,130,246,0.1) !important; color: #e2e8f0 !important; }
    &.is-selected { color: #3b82f6 !important; font-weight: 600; }
  }

  .el-popper__arrow::before {
    background: #13132a !important;
    border-color: rgba(255,255,255,0.08) !important;
  }
}
</style>
