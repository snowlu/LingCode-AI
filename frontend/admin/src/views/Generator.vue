<template>
  <div class="generator-page">

    <div class="page-container">
      <div class="page-header">
        <h1><span class="ai-badge">AI</span> 在线生成器</h1>
        <p>选择行业模板，配置系统参数，AI 自动生成企业级后台管理系统</p>
      </div>

      <div class="generator-layout">
        <div class="config-panel">
          <div class="config-card">
            <div class="card-head">
              <div class="card-title">
                <el-icon :size="16"><Setting /></el-icon>
                系统配置
              </div>
              <el-tag v-if="store.config.useRealAI" type="danger" size="small" effect="dark">
                <el-icon :size="10"><MagicStick /></el-icon> 真实AI
              </el-tag>
              <el-tag v-else type="info" size="small" effect="dark">
                本地模式
              </el-tag>
            </div>

            <el-form :model="store.config" label-position="top" size="large">
              <el-form-item label="选择行业">
                <el-select
                  v-model="store.config.industry"
                  placeholder="请选择行业类型"
                  style="width: 100%"
                  @change="onIndustryChange"
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
                <el-input v-model="store.config.systemName" placeholder="请输入系统名称" />
              </el-form-item>

              <el-form-item label="主题配色">
                <div class="color-picker-row">
                  <div
                    v-for="color in colorOptions"
                    :key="color"
                    class="color-dot"
                    :class="{ active: store.config.primaryColor === color }"
                    :style="{ background: color }"
                    @click="store.updateConfig('primaryColor', color)"
                  />
                </div>
              </el-form-item>

              <el-form-item label="功能选项">
                <div class="feature-checks">
                  <el-checkbox v-model="store.config.includeAuth">权限管理</el-checkbox>
                  <el-checkbox v-model="store.config.includeCharts">数据图表</el-checkbox>
                  <el-checkbox v-model="store.config.includeI18n">多语言支持</el-checkbox>
                  <el-checkbox v-model="store.config.useRealAI">
                    真实AI生成
                    <el-tooltip content="勾选后每次操作都会调用豆包大模型，消耗 API Token；不勾选使用本地内置模板快速生成" placement="top">
                      <el-icon :size="12" style="margin-left:2px;color:#94a3b8;cursor:help"><QuestionFilled /></el-icon>
                    </el-tooltip>
                  </el-checkbox>
                </div>
              </el-form-item>

              <button class="btn-generate" :disabled="store.isGenerating" @click="handleGenerate">
                <span v-if="store.isGenerating" class="btn-spinner"></span>
                <el-icon v-else :size="18"><MagicStick /></el-icon>
                <span class="btn-label">
                  {{ store.isGenerating ? 'AI 正在为您搭建后台系统，请稍候...' : '立即生成后台系统' }}
                </span>
                <span v-if="!store.isGenerating" class="btn-arrow">→</span>
              </button>
            </el-form>
          </div>

          <div v-if="store.aiConfig" class="ai-chat-card">
            <div class="card-head">
              <div class="card-title">
                <el-icon :size="16"><ChatDotRound /></el-icon>
                AI 智能修改
              </div>
            </div>

            <div class="chat-body">
              <div class="chat-list" ref="chatBoxRef">
                <div v-if="store.chatHistory.length === 0" class="chat-placeholder">
                  <el-icon :size="28" color="#334155"><MagicStick /></el-icon>
                  <p>输入自然语言修改后台</p>
                </div>
                <div v-for="(msg, idx) in store.chatHistory" :key="idx" :class="['chat-msg', msg.role]">
                  <div class="msg-bubble">{{ msg.content }}</div>
                </div>
              </div>

              <div class="quick-commands">
                <span class="qc-label">快捷：</span>
                <button
                  v-for="cmd in quickCommands"
                  :key="cmd.label"
                  class="qc-btn"
                  @click="sendQuickCommand(cmd)"
                >{{ cmd.label }}</button>
              </div>

              <div class="chat-input-wrap">
                <input
                  v-model="aiInstruction"
                  class="chat-input"
                  placeholder="例如：改成深色模式、新增库存模块、改蓝色主题..."
                  :disabled="store.isModifying"
                  @keyup.enter="handleAiModify"
                />
                <button
                  class="chat-send-btn"
                  :disabled="!aiInstruction.trim() || store.isModifying"
                  @click="handleAiModify"
                >
                  <el-icon v-if="!store.isModifying" :size="16"><Promotion /></el-icon>
                  <span v-else class="btn-spinner small"></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="preview-panel">
          <div class="preview-topbar">
            <div class="preview-title">
              <el-icon :size="14"><Monitor /></el-icon>
              <span>实时预览</span>
              <el-tag v-if="store.aiConfig" :type="store.config.includeI18n ? 'success' : 'info'" size="small" effect="dark" round>
                {{ store.config.includeI18n ? '多语言' : '中文' }}
              </el-tag>
            </div>
            <div v-if="store.aiConfig" class="preview-btns">
              <el-select
                v-if="store.config.includeI18n"
                v-model="store.currentLang"
                size="small"
                style="width:90px"
                @change="store.setLang($event)"
              >
                <el-option label="中文" value="zh" />
                <el-option label="English" value="en" />
              </el-select>
              <el-button size="small" text @click="goToFullPreview">
                <el-icon :size="14"><View /></el-icon>
              </el-button>
              <el-dropdown @command="goToUserPortalMode">
                <el-button size="small" text>
                  <el-icon :size="14"><Iphone /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="pc">PC版</el-dropdown-item>
                    <el-dropdown-item command="h5">H5版</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-button size="small" text type="success" :loading="store.isDownloading" @click="handleDownload">
                <el-icon :size="14"><Download /></el-icon>
              </el-button>
            </div>
          </div>

          <div class="preview-stage">
            <div v-if="!store.aiConfig && !store.isGenerating" class="stage-empty">
              <div class="empty-icon-wrap">
                <el-icon :size="56" color="#1e293b"><Monitor /></el-icon>
              </div>
              <p class="empty-title">配置完成后点击生成按钮</p>
              <p class="empty-sub">预览区将实时渲染后台管理效果</p>
            </div>

            <div v-else-if="store.isGenerating" class="stage-loading">
              <div class="ai-ring">
                <div class="ring-outer"></div>
                <div class="ring-inner">
                  <el-icon :size="36" color="#60a5fa"><MagicStick /></el-icon>
                </div>
              </div>
              <h3>AI 正在分析需求</h3>
              <p class="loading-status">{{ store.statusMessage }}</p>
              <div class="step-row">
                <div class="step-item" :class="{ on: store.generationStep >= 1, done: store.generationStep > 1 }"><span class="step-dot"></span>分析</div>
                <div class="step-gap" :class="{ done: store.generationStep > 1 }"></div>
                <div class="step-item" :class="{ on: store.generationStep >= 2, done: store.generationStep > 2 }"><span class="step-dot"></span>生成</div>
                <div class="step-gap" :class="{ done: store.generationStep > 2 }"></div>
                <div class="step-item" :class="{ on: store.generationStep >= 3, done: store.generationStep >= 3 }"><span class="step-dot"></span>渲染</div>
              </div>
              <div class="skeleton-box">
                <div class="sk-left"><div v-for="i in 5" :key="i" class="sk-ln"></div></div>
                <div class="sk-right">
                  <div class="sk-top"></div>
                  <div class="sk-grid"><div v-for="i in 4" :key="i" class="sk-card"></div></div>
                  <div class="sk-tbl"><div v-for="i in 3" :key="i" class="sk-tr"><div v-for="j in 4" :key="j" class="sk-td"></div></div></div>
                </div>
              </div>
            </div>

            <div v-else class="stage-frame" :class="{ show: transitionReady }">
              <div class="mini-layout" :class="{ dark: store.aiConfig?.themeConfig?.darkMode }">
                <aside class="mini-sidebar">
                  <div class="mini-logo">
                    <el-icon :size="14" :color="store.themeColor"><MagicStick /></el-icon>
                    <span>{{ store.t('app.title') || store.config.systemName || '后台系统' }}</span>
                  </div>
                  <nav class="mini-nav">
                    <template v-for="menu in store.aiConfig?.menuList">
                      <div v-if="!menu.children?.length" :key="menu.key" :class="['nav-item', { active: previewMenu === menu.key }]"
                        :style="previewMenu === menu.key ? { background: store.themeColor } : {}"
                        @click="previewMenu = menu.key; previewSubMenu = ''">
                        <el-icon :size="13"><component :is="menu.icon || 'Menu'" /></el-icon>
                        <span>{{ store.t('menu.' + menu.key) || menu.label }}</span>
                      </div>
                      <div v-else :key="menu.key">
                        <div class="nav-item parent" @click="toggleGroup(menu.key)">
                          <el-icon :size="13"><component :is="menu.icon || 'FolderOpened'" /></el-icon>
                          <span>{{ store.t('menu.' + menu.key) || menu.label }}</span>
                          <el-icon :size="10" class="arw" :class="{ open: expandedGroups.includes(menu.key) }"><ArrowRight /></el-icon>
                        </div>
                        <div v-show="expandedGroups.includes(menu.key)" class="nav-sub">
                          <div v-for="sub in menu.children" :key="sub.key" class="sub-item"
                            :class="{ active: previewSubMenu === sub.key }"
                            :style="previewSubMenu === sub.key ? { color: store.themeColor, background: store.themeColor + '18' } : {}"
                            @click="previewMenu = menu.key; previewSubMenu = sub.key">
                            {{ store.t('menu.' + sub.key) || sub.label }}
                          </div>
                        </div>
                      </div>
                    </template>
                  </nav>
                </aside>

                <main class="mini-main">
                  <header class="mini-head">
                    <span class="breadcrumb">{{ currentBreadcrumb }}</span>
                    <div class="head-right">
                      <el-switch v-if="store.config.includeI18n" v-model="store.currentLang" size="small"
                        active-value="en" inactive-value="zh" active-text="EN" inactive-text="中"
                        inline-prompt @change="store.setLang($event)" />
                      <el-avatar :size="22" :style="{ background: store.themeColor }">A</el-avatar>
                    </div>
                  </header>

                  <div class="mini-body">
                    <div v-if="previewMenu === 'dashboard' && !previewSubMenu" class="dash-grid">
                      <div v-for="(s, i) in currentStats" :key="i" class="dash-card">
                        <div class="dash-val" :style="{ color: store.themeColor }">{{ s.value }}</div>
                        <div class="dash-label">{{ store.t('stats.' + s.key) || s.label }}</div>
                        <div class="dash-trend" :class="s.up ? 'up' : 'down'">{{ s.trend || '' }}</div>
                      </div>
                      <div class="dash-chart">
                        <h5>{{ store.t('chart.trend') || '趋势' }}</h5>
                        <svg viewBox="0 0 400 100"><path d="M0,80 L50,65 L100,75 L150,40 L200,55 L250,25 L300,45 L350,20 L400,35 L400,100 L0,100 Z" fill="url(#miniGrad)" /><polyline points="0,80 50,65 100,75 150,40 200,55 250,25 300,45 350,20 400,35" fill="none" :stroke="store.themeColor" stroke-width="2"/><defs><linearGradient id="miniGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" :stop-color="store.themeColor" stop-opacity=".25"/><stop offset="100%" :stop-color="store.themeColor" stop-opacity=".04"/></linearGradient></defs></svg>
                      </div>
                      <div class="dash-chart">
                        <h5>{{ store.t('chart.distribution') || '分布' }}</h5>
                        <svg viewBox="0 0 120 120" style="width:96px;height:96px;margin:0 auto;display:block"><circle cx="60" cy="60" r="40" fill="none" :stroke="store.themeColor" stroke-width="18" stroke-dasharray="63 188" transform="rotate(-90 60 60)"/><circle cx="60" cy="60" r="40" fill="none" stroke="#22c55e" stroke-width="18" stroke-dasharray="50 201" stroke-dashoffset="-63" transform="rotate(-90 60 60)"/><circle cx="60" cy="60" r="40" fill="none" stroke="#eab308" stroke-width="18" stroke-dasharray="38 213" stroke-dashoffset="-113" transform="rotate(-90 60 60)"/></svg>
                      </div>
                    </div>

                    <div v-else class="list-view">
                      <div class="list-top">
                        <h4>{{ currentPageTitle }}</h4>
                        <div class="list-top-btns">
                          <el-button size="small" :style="{ background: store.themeColor, borderColor: store.themeColor, color: '#fff' }">{{ store.t('button.add') || '新增' }}</el-button>
                          <el-button size="small" text>{{ store.t('button.export') || '导出' }}</el-button>
                        </div>
                      </div>
                      <div class="list-search">
                        <el-input size="small" placeholder="搜索..." style="width:180px" />
                        <el-button size="small" text :style="{ color: store.themeColor }">{{ store.t('button.search') || '查询' }}</el-button>
                      </div>
                      <table class="data-table">
                        <thead><tr>
                          <th v-for="col in currentColumns" :key="col">{{ store.t('table.' + col) || col }}</th>
                          <th>{{ store.t('button.actions') || '操作' }}</th>
                        </tr></thead>
                        <tbody>
                          <tr v-for="(row, ri) in currentRows" :key="ri">
                            <td v-for="(cell, ci) in row" :key="ci">
                              <el-tag v-if="isStatusCell(cell)" :type="getStatusType(cell)" size="small">{{ cell }}</el-tag>
                              <template v-else>{{ cell }}</template>
                            </td>
                            <td class="act-col">
                              <el-button size="small" text>{{ store.t('button.edit') || '编辑' }}</el-button>
                              <el-button size="small" text type="danger">{{ store.t('button.delete') || '删除' }}</el-button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="list-pager">
                        <el-pagination small layout="prev, pager, next" :total="50" :page-size="10" />
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import {
  Setting, MagicStick, Monitor, View, Download, ArrowRight,
  Iphone, ChatDotRound, Promotion, QuestionFilled, Menu, FolderOpened,
} from '@element-plus/icons-vue';
import { useGeneratorStore } from '@/stores/generator.js';
import AppFooter from '@/components/AppFooter.vue';

const route = useRoute();
const router = useRouter();
const store = useGeneratorStore();

const aiInstruction = ref('');
const previewMenu = ref('dashboard');
const previewSubMenu = ref('');
const expandedGroups = ref([]);
const transitionReady = ref(false);
const chatBoxRef = ref(null);

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

const colorOptions = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399', '#b195eb', '#2f9999', '#ff9f40', '#00b42a', '#13c2c2'];

const quickCommands = [
  { label: '深色模式', action: '切换为深色模式' },
  { label: '加趋势图', action: '在仪表盘新增销售趋势折线图' },
  { label: '批量导出', action: '表格增加批量选择和导出功能' },
  { label: '新增库存', action: '新增库存管理模块，包含入库出库和盘点' },
  { label: '改蓝色', action: '把主题色改为蓝色' },
  { label: '加审批', action: '新增审批流程管理功能' },
];

const currentBreadcrumb = computed(() => {
  if (!store.aiConfig?.menuList) return '工作台';
  let key = previewMenu.value;
  if (previewSubMenu.value) key = previewSubMenu.value;
  for (const m of store.aiConfig.menuList) {
    if (m.key === key) return store.t('menu.' + key) || m.label;
    const child = m.children?.find(c => c.key === key);
    if (child) {
      return (store.t('menu.' + m.key) || m.label) + ' / ' + (store.t('menu.' + key) || child.label);
    }
  }
  return store.t('menu.' + key) || key;
});

const currentPageTitle = computed(() => {
  const key = previewSubMenu.value || previewMenu.value;
  return store.t('menu.' + key) || store.aiConfig?.menuList?.find(m => m.key === key)?.label || '数据管理';
});

const currentModule = computed(() => {
  const key = previewSubMenu.value;
  return key ? (store.pageModules[key] || { columns: ['id','name','status'], rows: [] }) : { columns: ['id','name','status'], rows: [] };
});

const currentColumns = computed(() => currentModule.value.columns || ['id','name','status']);
const currentRows = computed(() => currentModule.value.rows?.length ? currentModule.value.rows : [['001','示例','正常'],['002','示例','正常']]);

const currentStats = computed(() => [
  { key: 'today', label: store.t('stats.today') || '今日数据', value: '1,234', trend: '+8.2%', up: true },
  { key: 'total', label: store.t('stats.total') || '总记录', value: '12,345', trend: '+12.5%', up: true },
  { key: 'active', label: store.t('stats.active') || '活跃', value: '567', trend: '-2.3%', up: false },
  { key: 'rate', label: store.t('stats.rate') || '完成率', value: '87.3%', trend: '+3.1%', up: true },
]);

const statusKeywords = ['在售','已完成','已发货','已通过','正常','启用','在职','已上线','运行中','进行中','Active','Completed','Normal'];
const dangerKeywords = ['缺货','已取消','逾期','预警','禁用','休学','欠费','待处理','待审批','暂停','维修中','Pending','Warning','Danger'];

const isStatusCell = c => typeof c === 'string' && [...statusKeywords, ...dangerKeywords].some(k => c.includes(k));
const getStatusType = c => dangerKeywords.some(k => c.includes(k)) ? 'danger' : 'success';

const onIndustryChange = val => {
  const ind = industries.find(i => i.value === val);
  if (ind) {
    store.updateConfig('primaryColor', ind.color);
    const names = { ecommerce:'电商后台管理系统', education:'教育管理系统', government:'政务服务平台', medical:'医疗管理系统', logistics:'物流管理系统', hr:'人力资源系统', finance:'财务管理系统', restaurant:'门店管理系统', community:'社区管理系统', project:'项目管理系统' };
    store.updateConfig('systemName', names[val] || '管理系统');
  }
  previewMenu.value = 'dashboard';
  previewSubMenu.value = '';
  expandedGroups.value = [];
};

const toggleGroup = key => {
  const idx = expandedGroups.value.indexOf(key);
  idx > -1 ? expandedGroups.value.splice(idx, 1) : expandedGroups.value.push(key);
};

const handleGenerate = async () => {
  try {
    await store.generate();
    transitionReady.value = false;
    await nextTick();
    setTimeout(() => { transitionReady.value = true; }, 50);
    previewMenu.value = 'dashboard';
    ElMessage.success(store.config.useRealAI ? 'AI 后台系统生成完成！' : '后台系统生成完成！');
  } catch (err) {
    ElMessage.error(store.generationError || '生成失败，请检查网络或API配置');
  }
};

const goToFullPreview = () => {
  const idMap = { ecommerce:1, education:2, government:3, medical:4, logistics:5, restaurant:6, finance:8, hr:9, project:10, community:11 };
  router.push(`/preview/${idMap[store.config.industry] || 1}`);
};

const goToUserPortalMode = mode => {
  router.push(`/user-portal/${store.config.industry}?mode=${mode}`);
};

const handleDownload = async () => {
  const msg = ElMessage({ message: '正在打包代码，请稍候...', type: 'info', duration: 0 });
  try {
    const name = await store.download();
    msg.close();
    ElMessage.success(`项目 ${name}.zip 已下载`);
  } catch (err) {
    msg.close();
    ElMessage.error('下载失败: ' + (err.message || ''));
  }
};

const sendQuickCommand = cmd => {
  aiInstruction.value = cmd.action;
  handleAiModify();
};

const handleAiModify = async () => {
  const t = aiInstruction.value.trim();
  if (!t || store.isModifying) return;
  aiInstruction.value = '';
  try {
    const result = await store.aiModify(t);
    transitionReady.value = false;
    await nextTick();
    setTimeout(() => { transitionReady.value = true; }, 50);
    ElMessage.success(result || '修改完成');
    await nextTick();
    if (chatBoxRef.value) chatBoxRef.value.scrollTop = chatBoxRef.value.scrollHeight;
  } catch (err) {
    ElMessage.error('修改失败: ' + (err.message || ''));
  }
};

onMounted(() => {
  if (route.query.templateId) {
    const idMap = { 1:'ecommerce', 2:'education', 3:'government', 4:'medical', 5:'logistics', 6:'restaurant', 8:'finance', 9:'hr', 10:'project', 11:'community' };
    const key = idMap[+route.query.templateId];
    if (key) {
      store.updateConfig('industry', key);
      const names = { ecommerce:'电商后台管理系统', education:'教育管理系统', government:'政务服务平台', medical:'医疗管理系统', logistics:'物流管理系统', hr:'人力资源系统', finance:'财务管理系统', restaurant:'门店管理系统', community:'社区管理系统', project:'项目管理系统' };
      store.updateConfig('systemName', names[key] || '');
      const colors = { ecommerce:'#409eff', education:'#67c23a', government:'#e6a23c', medical:'#f56c6c', logistics:'#909399', hr:'#b195eb', finance:'#2f9999', restaurant:'#ff9f40', community:'#00b42a', project:'#13c2c2' };
      store.updateConfig('primaryColor', colors[key] || '#409eff');
    }
  }
});
</script>

<style lang="scss" scoped>
$bg: #0a0a1a;
$surface: #13132a;
$surface2: #1a1a35;
$border: rgba(255,255,255,0.06);
$border-hover: rgba(99,161,247,0.25);
$primary: #3b82f6;
$text: #e2e8f0;
$text2: #94a3b8;
$text3: #64748b;

.generator-page { min-height:100vh; background:$bg; color:$text; }

.page-header {
  text-align:center; padding:56px 20px 40px;
  h1 { font-size:36px; font-weight:800; margin-bottom:12px; letter-spacing:-0.02em;
    .ai-badge { display:inline-block; background:linear-gradient(135deg,#667eea,#764ba2); color:#fff; font-size:13px; padding:2px 10px; border-radius:10px; margin-right:8px; vertical-align:middle; }
  }
  p { font-size:15px; color:$text2; }
}

.generator-layout {
  display:grid; grid-template-columns:380px 1fr; gap:24px; padding:0 20px 60px; max-width:1380px; margin:0 auto;
}

.config-panel { display:flex; flex-direction:column; gap:20px; }

.config-card, .ai-chat-card {
  background:$surface; border:1px solid $border; border-radius:16px; padding:28px 24px;
  .card-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; }
  .card-title { display:flex; align-items:center; gap:8px; font-size:15px; font-weight:700; color:$text; }
}

.feature-checks {
  display:flex; flex-direction:column; gap:12px;
  :deep(.el-checkbox__label) { color:$text2; font-size:13px; }
  :deep(.el-checkbox__inner) { background:transparent; border-color:$text3; }
  :deep(.el-checkbox.is-checked .el-checkbox__inner) { background:$primary; border-color:$primary; }
}

.color-picker-row { display:flex; gap:10px; flex-wrap:wrap;
  .color-dot { width:28px; height:28px; border-radius:50%; cursor:pointer; transition:all 0.25s; border:2px solid transparent;
    &:hover { transform:scale(1.15); }
    &.active { border-color:#fff; box-shadow:0 0 0 2px $bg, 0 0 0 4px #fff; }
  }
}

.btn-generate {
  display:inline-flex; align-items:center; gap:10px; width:100%; padding:15px 28px;
  background:linear-gradient(135deg,#2563eb,#1d4ed8); color:#fff; border:none;
  border-radius:10px; font-size:16px; font-weight:600; cursor:pointer; transition:all 0.3s;
  font-family:inherit; justify-content:center; margin-top:4px;
  box-shadow:0 0 24px rgba(37,99,235,0.3);
  &:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 4px 32px rgba(37,99,235,0.45); }
  &:disabled { opacity:0.7; cursor:not-allowed; }
  .btn-arrow { font-size:20px; transition:transform 0.3s; }
  &:hover:not(:disabled) .btn-arrow { transform:translateX(4px); }
}

.btn-spinner { width:18px; height:18px; border:2px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:spin 0.8s linear infinite;
  &.small { width:14px; height:14px; }
}

.chat-body {
  .chat-list { max-height:180px; overflow-y:auto; margin-bottom:14px;
    &::-webkit-scrollbar { width:3px; } &::-webkit-scrollbar-thumb { background:#334155; border-radius:3px; }
  }
  .chat-placeholder { text-align:center; padding:20px; p { color:$text3; font-size:12px; margin-top:8px; } }
  .chat-msg { margin-bottom:10px; animation:fadeUp 0.3s ease;
    .msg-bubble { padding:8px 14px; border-radius:10px; font-size:13px; line-height:1.5; max-width:88%; }
    &.user { text-align:right; .msg-bubble { background:$primary; color:#fff; display:inline-block; } }
    &.ai { .msg-bubble { background:$surface2; color:$text; } }
  }
}

.quick-commands { display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin-bottom:12px;
  .qc-label { font-size:11px; color:$text3; }
  .qc-btn { background:$surface2; color:$text2; border:1px solid $border; border-radius:6px; padding:4px 10px; font-size:11px; cursor:pointer; transition:all 0.2s; font-family:inherit;
    &:hover { border-color:$border-hover; color:$text; }
  }
}

.chat-input-wrap { display:flex; gap:8px;
  .chat-input { flex:1; background:$surface2; border:1px solid $border; border-radius:8px; padding:10px 14px; color:$text; font-size:13px; font-family:inherit; outline:none; transition:border-color 0.2s;
    &:focus { border-color:$border-hover; }
    &::placeholder { color:$text3; }
  }
  .chat-send-btn { display:flex; align-items:center; justify-content:center; width:42px; background:$primary; color:#fff; border:none; border-radius:8px; cursor:pointer; transition:all 0.2s;
    &:hover:not(:disabled) { background:#2563eb; }
    &:disabled { opacity:0.4; cursor:not-allowed; }
  }
}

.preview-panel {
  background:$surface; border:1px solid $border; border-radius:16px; display:flex; flex-direction:column;
  height:calc(100vh - 220px); position:sticky; top:20px; overflow:hidden;
}

.preview-topbar {
  padding:14px 20px; border-bottom:1px solid $border; display:flex; justify-content:space-between; align-items:center; flex-shrink:0;
  .preview-title { display:flex; align-items:center; gap:8px; font-size:14px; font-weight:600; color:$text; }
  .preview-btns { display:flex; gap:6px; align-items:center; }
}

.preview-stage { flex:1; position:relative; overflow:hidden; }

.stage-empty {
  position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center;
  .empty-icon-wrap { margin-bottom:16px; }
  .empty-title { font-size:15px; color:$text2; }
  .empty-sub { font-size:13px; color:$text3; margin-top:6px; }
}

.stage-loading {
  position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center; width:88%;
  .ai-ring { position:relative; display:inline-block; margin-bottom:18px;
    .ring-outer { width:80px; height:80px; border:2px solid rgba(59,130,246,0.2); border-radius:50%; animation:pulse 2s ease-out infinite; }
    .ring-inner { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); }
  }
  h3 { font-size:18px; color:$text; margin-bottom:10px; }
  .loading-status { color:$primary; font-size:13px; font-weight:500; margin-bottom:20px; }
  .step-row { display:flex; align-items:center; justify-content:center; margin-bottom:20px;
    .step-item { font-size:11px; color:$text3; display:flex; flex-direction:column; align-items:center; gap:4px; transition:all 0.3s;
      .step-dot { width:8px; height:8px; border-radius:50%; background:#334155; transition:all 0.3s; }
      &.on { color:$primary; .step-dot { background:$primary; box-shadow:0 0 8px rgba(59,130,246,0.5); } }
      &.done { color:$primary; .step-dot { background:$primary; } }
    }
    .step-gap { width:36px; height:2px; background:#1e293b; margin:0 8px 16px; transition:all 0.3s;
      &.done { background:$primary; }
    }
  }
  .skeleton-box { display:flex; gap:12px; height:160px; text-align:left;
    .sk-left { width:120px; background:$surface2; border-radius:8px; padding:12px 10px; display:flex; flex-direction:column; gap:8px;
      .sk-ln { height:10px; background:#1e293b; border-radius:4px; animation:shimmer 1.5s infinite; &:nth-child(1){width:80%} &:nth-child(2){width:60%} &:nth-child(3){width:90%} &:nth-child(4){width:50%} &:nth-child(5){width:70%} }
    }
    .sk-right { flex:1; background:$surface2; border-radius:8px; padding:12px;
      .sk-top { height:10px; width:35%; background:#1e293b; border-radius:4px; margin-bottom:10px; animation:shimmer 1.5s infinite; }
      .sk-grid { display:flex; gap:8px; margin-bottom:10px;
        .sk-card { flex:1; height:36px; background:#1e293b; border-radius:4px; animation:shimmer 1.5s infinite; }
      }
      .sk-tbl { .sk-tr { display:flex; gap:8px; margin-bottom:5px;
        .sk-td { flex:1; height:7px; background:#1e293b; border-radius:3px; animation:shimmer 1.5s infinite; }
      }}
    }
  }
}

.stage-frame { width:100%; height:100%; overflow:hidden; opacity:0; transition:opacity 0.5s;
  &.show { opacity:1; }
}

.mini-layout { display:flex; height:100%; font-size:12px; transition:all 0.3s;
  &.dark { --mbg:#0f172a; --mcard:#1e293b; --mtext:#cbd5e1; --mtext2:#64748b; --mborder:#1e293b;
    .mini-sidebar { background:#0f172a; }
    .mini-main { background:#0f172a; }
    .mini-head { background:#1e293b; border-bottom-color:#1e293b; }
    .dash-card { background:#1e293b; }
    .dash-chart { background:#1e293b; }
    .data-table { background:#1e293b;
      th { background:#1e293b; color:#94a3b8; }
      td { border-bottom-color:#1e293b; }
    }
  }
}

.mini-sidebar { width:170px; color:#cbd5e1; display:flex; flex-direction:column; overflow:hidden; flex-shrink:0; background:#0f172a; }
.mini-logo { height:40px; display:flex; align-items:center; justify-content:center; gap:6px; font-size:11px; font-weight:700; border-bottom:1px solid rgba(255,255,255,0.06); white-space:nowrap; overflow:hidden; }
.mini-nav { flex:1; padding:4px 0; overflow-y:auto; }

.nav-item { display:flex; align-items:center; gap:6px; padding:7px 12px; cursor:pointer; transition:all 0.2s; font-size:11px; white-space:nowrap;
  &:hover { background:rgba(255,255,255,0.05); }
  &.parent .arw { margin-left:auto; transition:transform 0.2s; font-size:10px; &.open { transform:rotate(90deg); } }
}
.nav-sub { background:rgba(0,0,0,0.2);
  .sub-item { padding:6px 12px 6px 28px; font-size:11px; cursor:pointer; transition:all 0.2s; white-space:nowrap;
    &:hover { background:rgba(255,255,255,0.05); }
  }
}

.mini-main { flex:1; display:flex; flex-direction:column; overflow:hidden; background:#0a0a1a; }
.mini-head { height:38px; display:flex; align-items:center; justify-content:space-between; padding:0 14px; flex-shrink:0; background:$surface; border-bottom:1px solid $border;
  .breadcrumb { font-size:12px; font-weight:500; color:$text2; }
  .head-right { display:flex; align-items:center; gap:10px; }
}
.mini-body { flex:1; padding:10px; overflow-y:auto; }

.dash-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; animation:fadeUp 0.3s; }
.dash-card { padding:10px; border-radius:8px; background:$surface2; border-left:3px solid $primary;
  .dash-val { font-size:17px; font-weight:700; }
  .dash-label { font-size:10px; color:$text3; margin-top:2px; }
  .dash-trend { font-size:10px; font-weight:600; margin-top:3px; &.up{color:#22c55e} &.down{color:#ef4444} }
}
.dash-chart { grid-column:span 2; padding:10px; border-radius:8px; background:$surface2;
  h5 { font-size:12px; font-weight:600; color:$text2; margin-bottom:6px; }
}

.list-view { animation:fadeUp 0.3s; }
.list-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;
  h4 { font-size:14px; font-weight:600; color:$text; }
  .list-top-btns { display:flex; gap:6px; }
}
.list-search { display:flex; gap:6px; margin-bottom:8px; }

.data-table { width:100%; border-collapse:collapse; border-radius:8px; overflow:hidden; background:$surface2;
  th { padding:7px 8px; text-align:left; font-weight:600; font-size:10px; color:$text2; background:#1a1a35; white-space:nowrap; }
  td { padding:5px 8px; font-size:10px; color:$text2; border-bottom:1px solid rgba(255,255,255,0.04); white-space:nowrap; }
  .act-col { display:flex; gap:2px; }
}
.list-pager { margin-top:8px; display:flex; justify-content:flex-end; }

:deep(.el-select), :deep(.el-input__wrapper) { background:$surface2 !important; border-color:$border !important; box-shadow:none !important; }
:deep(.el-input__inner) { color:$text !important; }
:deep(.el-select-dropdown) { background:$surface2; border-color:$border; }
:deep(.el-select-dropdown__item) { color:$text2; &.is-selected,&:hover { background:rgba(59,130,246,0.15); color:$primary; } }
:deep(.el-form-item__label) { color:$text3 !important; font-size:12px; }
:deep(.el-divider) { border-color:$border; margin:20px 0 16px; }
:deep(.el-checkbox) { --el-checkbox-checked-bg-color:#3b82f6; --el-checkbox-checked-border-color:#3b82f6; }
:deep(.el-pagination button), :deep(.el-pager li) { background:transparent; color:$text2; }
:deep(.el-pager li.is-active) { background:$primary; color:#fff; }
:deep(.el-button.is-text) { color:$text2; &:hover { color:$text; } }
:deep(.el-tag--dark) { border-color:transparent; }
:deep(.el-avatar) { font-size:11px; }
:deep(.el-switch__label) { color:$text3 !important; font-size:10px; }

@keyframes spin { to { transform:rotate(360deg); } }
@keyframes pulse { 0% { transform:scale(1); opacity:1; } 100% { transform:scale(2.5); opacity:0; } }
@keyframes shimmer { 0%,100% { opacity:0.4; } 50% { opacity:1; } }
@keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }

@media(max-width:1100px) {
  .generator-layout { grid-template-columns:1fr; }
  .preview-panel { height:600px; position:static; }
}
</style>
