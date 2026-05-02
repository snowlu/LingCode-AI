import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { generateAi, downloadAiCode } from '@/api';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const surnames = ['张','李','王','赵','刘','陈'];
const maleNames = ['伟','强','磊','军','明','华'];
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const genName = () => pick(surnames) + pick(maleNames);
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const today = () => new Date().toISOString().split('T')[0];

const industryPresets = {
  ecommerce: {
    name: '电商后台管理系统',
    color: '#409eff',
    menuList: [
      { key: 'dashboard', label: '工作台', icon: 'Odometer', type: 'chart', children: [] },
      { key: 'goods', label: '商品管理', icon: 'Goods', type: 'list', children: [
        { key: 'goods-list', label: '商品列表', icon: 'List', type: 'list' },
        { key: 'goods-category', label: '商品分类', icon: 'Menu', type: 'list' },
        { key: 'goods-brand', label: '品牌管理', icon: 'Stamp', type: 'list' },
      ]},
      { key: 'order', label: '订单管理', icon: 'Document', type: 'list', children: [
        { key: 'order-list', label: '订单列表', icon: 'Tickets', type: 'list' },
        { key: 'after-sale', label: '售后管理', icon: 'Service', type: 'list' },
        { key: 'refund', label: '退款管理', icon: 'Wallet', type: 'list' },
      ]},
      { key: 'user', label: '用户管理', icon: 'User', type: 'list', children: [
        { key: 'user-list', label: '会员列表', icon: 'UserFilled', type: 'list' },
        { key: 'user-level', label: '会员等级', icon: 'Medal', type: 'list' },
      ]},
      { key: 'stats', label: '数据统计', icon: 'DataAnalysis', type: 'chart', children: [
        { key: 'sales-report', label: '销售报表', icon: 'TrendCharts', type: 'chart' },
        { key: 'traffic-analysis', label: '流量分析', icon: 'PieChart', type: 'chart' },
      ]},
      { key: 'settings', label: '系统设置', icon: 'Setting', type: 'form', children: [
        { key: 'site-config', label: '站点配置', icon: 'Tools', type: 'form' },
        { key: 'admin-list', label: '管理员', icon: 'UserFilled', type: 'list' },
      ]},
    ],
    pageModules: {
      'goods-list': { title: '商品列表', columns: ['商品ID','商品名称','分类','价格','库存','状态','创建时间'], rows: makeRows(['商品ID','商品名称','分类','价格','库存','状态','创建时间'], () => ['P'+rand(1000,9999), pick(['iPhone 15 Pro','MacBook Air M3','AirPods Pro 2','iPad Mini 7','Apple Watch S9','Sony WH-1000XM5','Dyson V15']), pick(['手机数码','电脑办公','智能穿戴','家用电器']), '¥'+rand(99,9999), String(rand(10,500)), pick(['上架','下架','预售','缺货']), today()]) },
      'goods-category': { title: '商品分类', columns: ['分类ID','分类名称','上级分类','排序','状态'], rows: makeRows(['分类ID','分类名称','上级分类','排序','状态'], () => ['C'+rand(100,999), pick(['手机数码','电脑办公','服饰鞋包','食品生鲜','美妆个护']), '顶级分类', String(rand(1,99)), pick(['启用','禁用'])]) },
      'order-list': { title: '订单列表', columns: ['订单号','客户','商品','金额','状态','下单时间'], rows: makeRows(['订单号','客户','商品','金额','状态','下单时间'], () => ['ORD'+rand(100000,999999), genName(), pick(['iPhone 15 Pro','MacBook Air','AirPods Pro']), '¥'+rand(99,19999), pick(['待付款','已付款','已发货','已完成']), today()]) },
      'after-sale': { title: '售后管理', columns: ['工单号','订单号','类型','客户','状态','时间'], rows: makeRows(['工单号','订单号','类型','客户','状态','时间'], () => ['AS'+rand(100,999), 'ORD'+rand(1000,9999), pick(['退货','换货','维修']), genName(), pick(['待审核','处理中','已完成']), today()]) },
      'user-list': { title: '会员列表', columns: ['会员ID','手机号','昵称','等级','消费金额','注册时间'], rows: makeRows(['会员ID','手机号','昵称','等级','消费金额','注册时间'], () => ['M'+rand(1000,9999), '138'+rand(10000000,99999999), genName(), pick(['普通会员','银牌会员','金牌会员','钻石会员']), '¥'+rand(100,99999), today()]) },
    },
    i18n: {
      zh: { menu: { dashboard: '工作台', goods: '商品管理', 'goods-list': '商品列表', 'goods-category': '商品分类', 'goods-brand': '品牌管理', order: '订单管理', 'order-list': '订单列表', 'after-sale': '售后管理', refund: '退款管理', user: '用户管理', 'user-list': '会员列表', 'user-level': '会员等级', stats: '数据统计', 'sales-report': '销售报表', 'traffic-analysis': '流量分析', settings: '系统设置', 'site-config': '站点配置', 'admin-list': '管理员' }, button: { add: '新增', edit: '编辑', delete: '删除', export: '导出', search: '查询', actions: '操作' }, table: {}, message: {} },
      en: { menu: { dashboard: 'Dashboard', goods: 'Products', 'goods-list': 'Product List', 'goods-category': 'Categories', 'goods-brand': 'Brands', order: 'Orders', 'order-list': 'Order List', 'after-sale': 'After Sales', refund: 'Refunds', user: 'Users', 'user-list': 'Members', 'user-level': 'Member Levels', stats: 'Analytics', 'sales-report': 'Sales Report', 'traffic-analysis': 'Traffic', settings: 'Settings', 'site-config': 'Site Config', 'admin-list': 'Admins' }, button: { add: 'Add', edit: 'Edit', delete: 'Delete', export: 'Export', search: 'Search', actions: 'Actions' }, table: {}, message: {} },
    },
  },
  education: {
    name: '教育管理系统', color: '#67c23a',
    menuList: [
      { key: 'dashboard', label: '工作台', icon: 'Odometer', type: 'chart', children: [] },
      { key: 'student', label: '学员管理', icon: 'User', type: 'list', children: [
        { key: 'student-list', label: '学员档案', icon: 'List', type: 'list' },
        { key: 'attendance', label: '考勤管理', icon: 'Calendar', type: 'list' },
        { key: 'grade', label: '成绩管理', icon: 'Document', type: 'list' },
      ]},
      { key: 'course', label: '课程管理', icon: 'Reading', type: 'list', children: [
        { key: 'course-list', label: '课程列表', icon: 'List', type: 'list' },
        { key: 'schedule', label: '排课管理', icon: 'Timer', type: 'list' },
      ]},
      { key: 'exam', label: '考试管理', icon: 'EditPen', type: 'list', children: [
        { key: 'exam-list', label: '考试列表', icon: 'Tickets', type: 'list' },
        { key: 'exam-paper', label: '试卷管理', icon: 'Files', type: 'list' },
      ]},
      { key: 'stats', label: '数据统计', icon: 'DataAnalysis', type: 'chart', children: [
        { key: 'enrollment', label: '招生统计', icon: 'TrendCharts', type: 'chart' },
      ]},
      { key: 'settings', label: '系统设置', icon: 'Setting', type: 'form', children: [
        { key: 'site-config', label: '站点配置', icon: 'Tools', type: 'form' },
      ]},
    ],
    pageModules: {
      'student-list': { title: '学员档案', columns: ['学号','姓名','性别','班级','手机号','状态','入学日期'], rows: makeRows(['学号','姓名','性别','班级','手机号','状态','入学日期'], () => ['S'+rand(1000,9999), genName(), pick(['男','女']), pick(['Vue3全栈班','Python数据班','React实战班']), '139'+rand(10000000,99999999), pick(['在读','休学','毕业']), today()]) },
      'attendance': { title: '考勤管理', columns: ['考勤ID','学员','课程','状态','打卡时间'], rows: makeRows(['考勤ID','学员','课程','状态','打卡时间'], () => ['AT'+rand(100,999), genName(), pick(['Vue3全栈开发','Python数据分析','React前端实战']), pick(['出勤','迟到','缺勤','请假']), today()]) },
    },
    i18n: {
      zh: { menu: { dashboard: '工作台', student: '学员管理', 'student-list': '学员档案', attendance: '考勤管理', grade: '成绩管理', course: '课程管理', 'course-list': '课程列表', schedule: '排课管理', exam: '考试管理', 'exam-list': '考试列表', 'exam-paper': '试卷管理', stats: '数据统计', enrollment: '招生统计', settings: '系统设置', 'site-config': '站点配置' }, button: { add: '新增', edit: '编辑', delete: '删除', export: '导出', search: '查询', actions: '操作' }, table: {}, message: {} },
      en: { menu: { dashboard: 'Dashboard', student: 'Students', 'student-list': 'Student List', attendance: 'Attendance', grade: 'Grades', course: 'Courses', 'course-list': 'Course List', schedule: 'Schedule', exam: 'Exams', 'exam-list': 'Exam List', 'exam-paper': 'Papers', stats: 'Analytics', enrollment: 'Enrollment', settings: 'Settings', 'site-config': 'Site Config' }, button: { add: 'Add', edit: 'Edit', delete: 'Delete', export: 'Export', search: 'Search', actions: 'Actions' }, table: {}, message: {} },
    },
  },
}

function makeBasePreset(key) {
  return {
    name: key + '管理系统', color: '#409eff',
    menuList: [
      { key: 'dashboard', label: '工作台', icon: 'Odometer', type: 'chart', children: [] },
      { key: 'data-mgr', label: '数据管理', icon: 'List', type: 'list', children: [
        { key: 'data-list', label: '数据列表', icon: 'Tickets', type: 'list' },
        { key: 'data-category', label: '分类管理', icon: 'Menu', type: 'list' },
      ]},
      { key: 'stats', label: '数据统计', icon: 'DataAnalysis', type: 'chart', children: [
        { key: 'stats-report', label: '统计报表', icon: 'TrendCharts', type: 'chart' },
      ]},
      { key: 'settings', label: '系统设置', icon: 'Setting', type: 'form', children: [
        { key: 'site-config', label: '站点配置', icon: 'Tools', type: 'form' },
      ]},
    ],
    pageModules: {
      'data-list': { title: '数据列表', columns: ['编号','名称','描述','状态','创建时间'], rows: makeRows(['编号','名称','描述','状态','创建时间'], () => ['D'+rand(100,999), '数据记录'+rand(1,999), '这是一条示例数据描述', pick(['正常','禁用','待审核']), today()]) },
    },
    i18n: {
      zh: { menu: { dashboard: '工作台', 'data-mgr': '数据管理', 'data-list': '数据列表', 'data-category': '分类管理', stats: '数据统计', 'stats-report': '统计报表', settings: '系统设置', 'site-config': '站点配置' }, button: { add: '新增', edit: '编辑', delete: '删除', export: '导出', search: '查询', actions: '操作' }, table: {}, message: {} },
      en: { menu: { dashboard: 'Dashboard', 'data-mgr': 'Data', 'data-list': 'Data List', 'data-category': 'Categories', stats: 'Stats', 'stats-report': 'Reports', settings: 'Settings', 'site-config': 'Config' }, button: { add: 'Add', edit: 'Edit', delete: 'Delete', export: 'Export', search: 'Search', actions: 'Actions' }, table: {}, message: {} },
    },
  }
}

function makeRows(columns, rowGen) {
  const rows = []
  for (let i = 0; i < 8; i++) {
    rows.push(rowGen())
  }
  return rows
}

function generateLocalConfig(industry, primaryColor, needI18n, systemName) {
  let preset = industryPresets[industry]
  if (!preset) preset = makeBasePreset(industry)

  const config = {
    menuList: JSON.parse(JSON.stringify(preset.menuList)),
    routeConfig: {},
    pageModules: JSON.parse(JSON.stringify(preset.pageModules || {})),
    i18n: needI18n ? JSON.parse(JSON.stringify(preset.i18n)) : { zh: JSON.parse(JSON.stringify(preset.i18n?.zh || {})), en: {} },
    mockSchema: {},
    themeConfig: {
      primaryColor: primaryColor || preset.color || '#409eff',
      layout: 'side',
      darkMode: false,
    },
    _meta: {
      industry: industry,
      industryName: systemName || preset.name || '管理系统',
      generatedAt: new Date().toISOString(),
      needI18n: !!needI18n,
    },
  }

  return config
}

function modifyLocalConfig(currentConfig, instruction) {
  const lower = instruction.toLowerCase()
  const newConfig = JSON.parse(JSON.stringify(currentConfig))

  if (lower.includes('深色') || lower.includes('暗色') || lower.includes('dark')) {
    newConfig.themeConfig.darkMode = true
  } else if (lower.includes('浅色') || lower.includes('浅色模式') || lower.includes('light')) {
    newConfig.themeConfig.darkMode = false
  }

  if (lower.includes('蓝色')) newConfig.themeConfig.primaryColor = '#409eff'
  else if (lower.includes('绿色')) newConfig.themeConfig.primaryColor = '#67c23a'
  else if (lower.includes('橙色')) newConfig.themeConfig.primaryColor = '#e6a23c'
  else if (lower.includes('红色')) newConfig.themeConfig.primaryColor = '#f56c6c'
  else if (lower.includes('紫色')) newConfig.themeConfig.primaryColor = '#b195eb'

  const cmdKeywords = [
    { keys: ['新增', '添加', '加个', '加上', '添加一个', '增加'], moduleName: true },
    { keys: ['删除', '去掉', '移除', '删除掉'], deleteModule: true },
    { keys: ['布局', '改为顶部', '顶部导航', 'top'], layout: 'top' },
    { keys: ['混合布局', 'mix'], layout: 'mix' },
    { keys: ['侧边栏布局', 'side'], layout: 'side' },
  ]

  newConfig._meta = newConfig._meta || {}
  newConfig._meta.lastModified = new Date().toISOString()

  return newConfig
}

export const useGeneratorStore = defineStore('generator', () => {
  const config = ref({
    industry: 'ecommerce',
    systemName: '电商后台管理系统',
    primaryColor: '#409eff',
    includeAuth: true,
    includeCharts: true,
    includeI18n: false,
    useRealAI: true,
  });

  const aiConfig = ref(null);
  const isGenerating = ref(false);
  const isModifying = ref(false);
  const isDownloading = ref(false);
  const currentLang = ref('zh');
  const generationStep = ref(0);
  const statusMessage = ref('');
  const generationError = ref('');
  const chatHistory = ref([]);

  const themeColor = computed(() => aiConfig.value?.themeConfig?.primaryColor || config.value.primaryColor);

  const menuList = computed(() => {
    if (!aiConfig.value?.menuList) return [];
    return flattenMenus(aiConfig.value.menuList);
  });

  const pageModules = computed(() => aiConfig.value?.pageModules || {});

  const i18n = computed(() => aiConfig.value?.i18n || { zh: {}, en: {} });

  function t(path) {
    const keys = path.split('.');
    let val = currentLang.value === 'en' ? (i18n.value.en || {}) : (i18n.value.zh || {});
    for (const k of keys) {
      if (val == null || typeof val !== 'object') return path;
      val = val[k];
    }
    return val || path;
  }

  function flattenMenus(menus) {
    const result = [];
    for (const m of menus) {
      result.push({ ...m, _isParent: !!(m.children && m.children.length) });
      if (m.children) {
        for (const sub of m.children) {
          result.push({ ...sub, _parentKey: m.key, _isChild: true });
        }
      }
    }
    return result;
  }

  const updateConfig = (key, value) => {
    config.value[key] = value;
  };

  const setLang = (lang) => {
    currentLang.value = lang;
  };

  async function generate() {
    isGenerating.value = true;
    generationError.value = '';
    generationStep.value = 0;
    statusMessage.value = 'AI 正在分析需求...';
    generationStep.value = 1;

    const messages = ['生成页面组件...', '配置路由状态...', '渲染预览中...'];
    const msgInterval = setInterval(() => {
      const idx = Math.min(generationStep.value - 1, messages.length - 1);
      if (idx >= 0) statusMessage.value = messages[idx];
    }, 1200);

    try {
      if (config.value.useRealAI) {
        const res = await generateAi({
          templateType: config.value.industry,
          userPrompt: '',
          themeColor: config.value.primaryColor,
          needI18n: config.value.includeI18n,
        });

        generationStep.value = 2;
        statusMessage.value = '配置路由状态...';
        await new Promise(r => setTimeout(r, 300));

        generationStep.value = 3;
        statusMessage.value = '渲染预览中...';

        aiConfig.value = res.data;
      } else {
        await new Promise(r => setTimeout(r, 600 + Math.random() * 1000));

        generationStep.value = 2;
        statusMessage.value = '配置路由状态...';
        await new Promise(r => setTimeout(r, 400));

        generationStep.value = 3;
        statusMessage.value = '渲染预览中...';

        aiConfig.value = generateLocalConfig(
          config.value.industry,
          config.value.primaryColor,
          config.value.includeI18n,
          config.value.systemName
        );
      }

      currentLang.value = 'zh';
    } catch (err) {
      generationError.value = err.message || '生成失败';
      throw err;
    } finally {
      clearInterval(msgInterval);
      isGenerating.value = false;
    }
  }

  async function aiModify(instruction) {
    if (!aiConfig.value) return null;
    isModifying.value = true;
    generationError.value = '';
    chatHistory.value.push({
      role: 'user',
      content: instruction,
      time: Date.now(),
    });

    try {
      if (config.value.useRealAI) {
        const res = await generateAi({
          templateType: config.value.industry,
          userPrompt: instruction,
          themeColor: config.value.primaryColor,
          needI18n: config.value.includeI18n,
          currentConfig: cleanConfigForApi(aiConfig.value),
        });

        const oldConfig = aiConfig.value;
        aiConfig.value = res.data;

        const diffMsg = describeChanges(oldConfig, res.data);
        chatHistory.value.push({
          role: 'ai',
          content: diffMsg,
          time: Date.now(),
        });

        return diffMsg;
      } else {
        await new Promise(r => setTimeout(r, 500 + Math.random() * 800));

        const oldConfig = aiConfig.value;
        aiConfig.value = modifyLocalConfig(aiConfig.value, instruction);

        const msg = describeLocalChanges(instruction, oldConfig, aiConfig.value);
        chatHistory.value.push({
          role: 'ai',
          content: msg,
          time: Date.now(),
        });

        return msg;
      }
    } catch (err) {
      generationError.value = err.message || '修改失败';
      chatHistory.value.push({
        role: 'ai',
        content: `抱歉，修改失败：${err.message}`,
        time: Date.now(),
      });
      throw err;
    } finally {
      isModifying.value = false;
    }
  }

  function describeLocalChanges(instruction, oldCfg, newCfg) {
    const lower = instruction.toLowerCase();
    const changes = [];

    if (oldCfg.themeConfig?.darkMode !== newCfg.themeConfig?.darkMode) {
      changes.push(newCfg.themeConfig?.darkMode ? '已切换为深色模式' : '已恢复为浅色模式');
    }
    if (oldCfg.themeConfig?.primaryColor !== newCfg.themeConfig?.primaryColor) {
      changes.push(`主题色已调整为 ${newCfg.themeConfig?.primaryColor}`);
    }

    if (lower.includes('新增') || lower.includes('添加')) {
      changes.push('已根据您的需求新增功能模块，预览区已实时更新');
    } else if (lower.includes('删除') || lower.includes('去掉')) {
      changes.push('已移除相应功能模块，预览区已实时更新');
    }

    return changes.length ? changes.join('；') : '已根据您的指令完成修改，预览区已实时更新';
  }

  function cleanConfigForApi(cfg) {
    const { _meta, ...rest } = cfg;
    return rest;
  }

  function describeChanges(oldConfig, newConfig) {
    const changes = [];
    if (oldConfig.menuList?.length !== newConfig.menuList?.length) {
      changes.push('菜单结构已更新');
    }
    if (oldConfig.themeConfig?.primaryColor !== newConfig.themeConfig?.primaryColor) {
      changes.push(`主题色已调整为 ${newConfig.themeConfig?.primaryColor}`);
    }
    if (oldConfig.themeConfig?.darkMode !== newConfig.themeConfig?.darkMode) {
      changes.push(newConfig.themeConfig?.darkMode ? '已切换为深色模式' : '已恢复为浅色模式');
    }
    return changes.length ? changes.join('；') : '已根据您的指令完成修改，预览区已实时更新';
  }

  async function download() {
    if (!aiConfig.value) return;
    isDownloading.value = true;
    try {
      const res = await downloadAiCode(aiConfig.value);
      if (!res.data?.files) throw new Error('获取代码包失败');
      const zip = new JSZip();
      const projectName = res.data.projectName || 'ai-project';
      for (const [path, content] of Object.entries(res.data.files)) {
        zip.file(`${projectName}/${path}`, content);
      }
      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, `${projectName}.zip`);
      return projectName;
    } finally {
      isDownloading.value = false;
    }
  }

  return {
    config,
    aiConfig,
    isGenerating,
    isModifying,
    isDownloading,
    currentLang,
    generationStep,
    statusMessage,
    generationError,
    chatHistory,
    themeColor,
    menuList,
    pageModules,
    i18n,
    t,
    updateConfig,
    setLang,
    generate,
    aiModify,
    download,
  };
});
