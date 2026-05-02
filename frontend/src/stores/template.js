import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTemplateStore = defineStore('template', () => {
  const templates = ref([
    {
      id: 1,
      name: '电商后台管理系统',
      category: 'ecommerce',
      description: '完整的电商管理解决方案，包含商品、订单、用户、营销等模块',
      icon: 'ShoppingCart',
      techStack: ['Vue3', 'Element Plus', 'Pinia', 'Vue Router'],
      features: ['商品管理', '订单处理', '用户中心', '数据统计', '营销活动'],
      color: '#409eff',
      image: '/templates/ecommerce.png',
    },
    {
      id: 2,
      name: '教育管理系统',
      category: 'education',
      description: '面向教育机构的综合管理平台，支持课程、学员、教师管理',
      icon: 'Reading',
      techStack: ['Vue3', 'Element Plus', 'Pinia', 'ECharts'],
      features: ['课程管理', '学员档案', '教师管理', '在线考试', '学习进度'],
      color: '#67c23a',
      image: '/templates/education.png',
    },
    {
      id: 3,
      name: '政务服务平台',
      category: 'government',
      description: '政府机构数字化办公平台，提升政务服务效率',
      icon: 'OfficeBuilding',
      techStack: ['Vue3', 'Element Plus', 'Pinia', 'Axios'],
      features: ['办事大厅', '审批流程', '信息公开', '民意调查', '数据大屏'],
      color: '#e6a23c',
      image: '/templates/government.png',
    },
    {
      id: 4,
      name: '医疗健康系统',
      category: 'medical',
      description: '医疗机构信息化管理，涵盖门诊、住院、药房等业务',
      icon: 'FirstAidKit',
      techStack: ['Vue3', 'Element Plus', 'Pinia', 'WebSocket'],
      features: ['挂号预约', '电子病历', '药房管理', '费用结算', '健康档案'],
      color: '#f56c6c',
      image: '/templates/medical.png',
    },
    {
      id: 5,
      name: '物流仓储系统',
      category: 'logistics',
      description: '物流企业全流程管理，从仓储到配送一站式解决',
      icon: 'Van',
      techStack: ['Vue3', 'Element Plus', 'Pinia', '地图API'],
      features: ['仓库管理', '运单追踪', '车辆调度', '客户管理', '数据分析'],
      color: '#909399',
      image: '/templates/logistics.png',
    },
    {
      id: 6,
      name: '门店管理系统',
      category: 'restaurant',
      description: '门店数字化运营工具，销售、收银、库存一体化',
      icon: 'Bowl',
      techStack: ['Vue3', 'Element Plus', 'Pinia', '打印SDK'],
      features: ['销售管理', '收银管理', '库存预警', '会员体系', '报表分析'],
      color: '#ff9f40',
      image: '/templates/restaurant.png',
    },
    {
      id: 7,
      name: '酒店管理系统',
      category: 'hotel',
      description: '酒店全流程管理，从前台接待到客房服务全覆盖',
      icon: 'House',
      techStack: ['Vue3', 'Element Plus', 'Pinia', '支付接口'],
      features: ['客房预订', '入住登记', '账单管理', '清洁排班', '客户CRM'],
      color: '#13c2c2',
      image: '/templates/hotel.png',
    },
    {
      id: 8,
      name: '财务管理系统',
      category: 'finance',
      description: '企业财务综合管理平台，收支、发票、预算、报表全覆盖',
      icon: 'Money',
      techStack: ['Vue3', 'Element Plus', 'Pinia', 'AI算法'],
      features: ['收支管理', '发票管理', '预算编制', '报表统计', '应收应付'],
      color: '#2f9999',
      image: '/templates/finance.png',
    },
    {
      id: 9,
      name: '人力资源系统',
      category: 'hr',
      description: '企业HR全生命周期管理，从招聘到离职全流程覆盖',
      icon: 'UserFilled',
      techStack: ['Vue3', 'Element Plus', 'Pinia', '工作流'],
      features: ['员工档案', '考勤打卡', '薪资核算', '招聘管理', '培训管理'],
      color: '#b195eb',
      image: '/templates/hr.png',
    },
    {
      id: 10,
      name: '项目管理系统',
      category: 'project',
      description: '团队协作与项目管理工具，提升团队效率',
      icon: 'FolderOpened',
      techStack: ['Vue3', 'Element Plus', 'Pinia', '甘特图'],
      features: ['任务看板', '进度跟踪', '成员管理', '文档协作', '风险预警'],
      color: '#13c2c2',
      image: '/templates/project.png',
    },
    {
      id: 11,
      name: '社区管理系统',
      category: 'community',
      description: '社区物业管理平台，居民、报修、活动、投诉全覆盖',
      icon: 'House',
      techStack: ['Vue3', 'Element Plus', 'Pinia', '富文本'],
      features: ['居民管理', '物业报修', '活动通知', '投诉建议', '设施管理'],
      color: '#00b42a',
      image: '/templates/community.png',
    },
    {
      id: 12,
      name: '物联网监控平台',
      category: 'iot',
      description: 'IoT设备管理与数据可视化平台',
      icon: 'Monitor',
      techStack: ['Vue3', 'Element Plus', 'Pinia', '实时数据'],
      features: ['设备接入', '实时监控', '告警通知', '数据分析', '远程控制'],
      color: '#faad14',
      image: '/templates/iot.png',
    },
  ]);

  const favorites = ref([]);
  const history = ref([]);

  const getTemplateById = id => {
    return templates.value.find(t => t.id === parseInt(id));
  };

  const getTemplatesByCategory = category => {
    if (!category || category === 'all') return templates.value;
    return templates.value.filter(t => t.category === category);
  };

  const toggleFavorite = id => {
    const index = favorites.value.indexOf(id);
    if (index > -1) {
      favorites.value.splice(index, 1);
    } else {
      favorites.value.push(id);
    }
  };

  const isFavorite = id => {
    return favorites.value.includes(id);
  };

  const addToHistory = template => {
    const existingIndex = history.value.findIndex(h => h.id === template.id);
    if (existingIndex > -1) {
      history.value.splice(existingIndex, 1);
    }
    history.value.unshift(template);
    if (history.value.length > 20) {
      history.value.pop();
    }
  };

  return {
    templates,
    favorites,
    history,
    getTemplateById,
    getTemplatesByCategory,
    toggleFavorite,
    isFavorite,
    addToHistory,
  };
});
