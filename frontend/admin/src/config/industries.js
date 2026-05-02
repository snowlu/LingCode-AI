const industryConfigs = {
  ecommerce: {
    id: 1,
    name: '电商后台管理系统',
    color: '#409eff',
    category: 'ecommerce',
    industryKey: 'ecommerce',
    stats: [
      { icon: 'ShoppingCart', label: '今日订单', value: '2,345', trend: '+12.5%', up: true },
      { icon: 'Money', label: '销售总额', value: '¥128,456', trend: '+8.2%', up: true },
      { icon: 'User', label: '活跃用户', value: '8,912', trend: '+5.1%', up: true },
      { icon: 'Goods', label: '在售商品', value: '1,256', trend: '-2.3%', up: false },
    ],
    menus: [
      { key: 'dashboard', label: '工作台', icon: 'DataAnalysis' },
      {
        key: 'products',
        label: '商品管理',
        icon: 'Goods',
        children: [
          { key: 'product-list', label: '商品列表', type: 'list' },
          { key: 'category', label: '分类管理', type: 'tree' },
          { key: 'inventory', label: '库存管理', type: 'list' },
        ],
      },
      {
        key: 'orders',
        label: '订单管理',
        icon: 'List',
        children: [
          { key: 'order-list', label: '订单列表', type: 'list' },
          { key: 'after-sale', label: '售后管理', type: 'list' },
          { key: 'refund', label: '退款审核', type: 'list' },
        ],
      },
      {
        key: 'users',
        label: '用户管理',
        icon: 'User',
        children: [
          { key: 'member-list', label: '会员列表', type: 'list' },
          { key: 'level', label: '等级管理', type: 'list' },
        ],
      },
      {
        key: 'statistics',
        label: '数据统计',
        icon: 'TrendCharts',
        children: [
          { key: 'sales-report', label: '销售报表', type: 'chart' },
          { key: 'traffic', label: '流量分析', type: 'chart' },
        ],
      },
      {
        key: 'marketing',
        label: '营销活动',
        icon: 'Present',
        children: [
          { key: 'coupon', label: '优惠券', type: 'list' },
          { key: 'promotion', label: '满减活动', type: 'list' },
        ],
      },
      { key: 'flow-demo', label: '流程演示', icon: 'SetUp' },
      {
        key: 'settings',
        label: '系统设置',
        icon: 'Setting',
        children: [
          { key: 'basic-setting', label: '基本配置', type: 'form' },
          { key: 'password', label: '修改密码', type: 'form' },
        ],
      },
    ],
    listData: {
      'product-list': {
        title: '商品列表',
        columns: ['编号', '商品名称', '分类', '价格', '库存', '状态'],
        rows: [
          ['P001', 'iPhone 15 Pro', '手机', '¥8,999', '256', '在售'],
          ['P002', 'MacBook Air', '笔记本', '¥9,499', '128', '在售'],
          ['P003', 'AirPods Pro', '耳机', '¥1,899', '512', '在售'],
          ['P004', 'iPad Mini', '平板', '¥3,799', '64', '缺货'],
          ['P005', 'Apple Watch', '手表', '¥2,999', '320', '在售'],
        ],
      },
      category: { title: '分类管理' },
      inventory: {
        title: '库存管理',
        columns: ['编号', '商品名称', '仓库', '库存数量', '预警值', '状态'],
        rows: [
          ['K001', 'iPhone 15 Pro', '北京仓', '256', '50', '正常'],
          ['K002', 'MacBook Air', '上海仓', '128', '30', '正常'],
          ['K003', 'AirPods Pro', '深圳仓', '512', '100', '正常'],
          ['K004', 'iPad Mini', '广州仓', '64', '80', '预警'],
          ['K005', 'Apple Watch', '成都仓', '320', '60', '正常'],
        ],
      },
      'order-list': {
        title: '订单列表',
        columns: ['订单号', '客户', '商品', '金额', '状态', '下单时间'],
        rows: [
          ['ORD20260101', '张三', 'iPhone 15 Pro', '¥8,999', '已发货', '2026-01-15'],
          ['ORD20260102', '李四', 'MacBook Air', '¥9,499', '待发货', '2026-01-16'],
          ['ORD20260103', '王五', 'AirPods Pro', '¥1,899', '已完成', '2026-01-17'],
          ['ORD20260104', '赵六', 'iPad Mini', '¥3,799', '已取消', '2026-01-18'],
          ['ORD20260105', '钱七', 'Apple Watch', '¥2,999', '已发货', '2026-01-19'],
        ],
      },
      'after-sale': {
        title: '售后管理',
        columns: ['工单号', '订单号', '类型', '客户', '处理状态', '申请时间'],
        rows: [
          ['AS001', 'ORD20260101', '退货', '张三', '处理中', '2026-01-20'],
          ['AS002', 'ORD20260103', '换货', '王五', '已完成', '2026-01-19'],
          ['AS003', 'ORD20260105', '维修', '钱七', '待审核', '2026-01-21'],
        ],
      },
      refund: {
        title: '退款审核',
        columns: ['退款单号', '订单号', '退款金额', '原因', '状态', '申请时间'],
        rows: [
          ['RF001', 'ORD20260104', '¥3,799', '不想要了', '已退款', '2026-01-18'],
          ['RF002', 'ORD20260101', '¥8,999', '质量问题', '审核中', '2026-01-20'],
        ],
      },
      'member-list': {
        title: '会员列表',
        columns: ['会员ID', '昵称', '手机号', '等级', '积分', '注册时间'],
        rows: [
          ['M001', '张三', '138****0001', '钻石', '12,500', '2025-06-15'],
          ['M002', '李四', '138****0002', '黄金', '8,200', '2025-08-20'],
          ['M003', '王五', '138****0003', '白银', '3,100', '2025-11-01'],
          ['M004', '赵六', '138****0004', '普通', '560', '2026-01-10'],
        ],
      },
      level: {
        title: '等级管理',
        columns: ['等级ID', '等级名称', '最低积分', '折扣率', '会员数'],
        rows: [
          ['L1', '普通会员', '0', '9.5折', '1,234'],
          ['L2', '白银会员', '3,000', '9.0折', '567'],
          ['L3', '黄金会员', '8,000', '8.5折', '234'],
          ['L4', '钻石会员', '15,000', '8.0折', '89'],
        ],
      },
      coupon: {
        title: '优惠券管理',
        columns: ['券ID', '券名称', '面额', '使用条件', '已领/总量', '状态'],
        rows: [
          ['C001', '新人专享券', '¥50', '满200可用', '1,234/5,000', '进行中'],
          ['C002', '满减券', '¥100', '满500可用', '567/2,000', '进行中'],
          ['C003', '折扣券', '8折', '无门槛', '890/3,000', '已结束'],
        ],
      },
      promotion: {
        title: '满减活动',
        columns: ['活动ID', '活动名称', '满减规则', '开始时间', '结束时间', '状态'],
        rows: [
          ['PM001', '新年大促', '满300减50', '2026-01-01', '2026-01-31', '进行中'],
          ['PM002', '春节特惠', '满500减100', '2026-02-01', '2026-02-15', '未开始'],
        ],
      },
    },
  },

  education: {
    id: 2,
    name: '教育管理系统',
    color: '#67c23a',
    category: 'education',
    industryKey: 'education',
    stats: [
      { icon: 'Reading', label: '在线课程', value: '356', trend: '+15.2%', up: true },
      { icon: 'User', label: '注册学员', value: '12,678', trend: '+9.8%', up: true },
      { icon: 'Avatar', label: '授课教师', value: '128', trend: '+3.2%', up: true },
      { icon: 'Document', label: '考试场次', value: '89', trend: '-1.5%', up: false },
    ],
    menus: [
      { key: 'dashboard', label: '工作台', icon: 'DataAnalysis' },
      {
        key: 'students',
        label: '学员管理',
        icon: 'User',
        children: [
          { key: 'student-list', label: '学员列表', type: 'list' },
          { key: 'student-archive', label: '学籍档案', type: 'list' },
        ],
      },
      {
        key: 'courses',
        label: '课程管理',
        icon: 'Reading',
        children: [
          { key: 'course-list', label: '课程列表', type: 'list' },
          { key: 'course-input', label: '课程录入', type: 'form' },
        ],
      },
      {
        key: 'teachers',
        label: '教师管理',
        icon: 'Avatar',
        children: [
          { key: 'teacher-archive', label: '教师档案', type: 'list' },
          { key: 'schedule', label: '排课管理', type: 'list' },
        ],
      },
      {
        key: 'academic',
        label: '教务管理',
        icon: 'Notebook',
        children: [
          { key: 'exam', label: '考试安排', type: 'list' },
          { key: 'score', label: '成绩统计', type: 'chart' },
        ],
      },
      {
        key: 'resources',
        label: '教学资源',
        icon: 'FolderOpened',
        children: [
          { key: 'courseware', label: '课件管理', type: 'list' },
          { key: 'homework', label: '作业管理', type: 'list' },
        ],
      },
      { key: 'flow-demo', label: '流程演示', icon: 'SetUp' },
      {
        key: 'settings',
        label: '系统设置',
        icon: 'Setting',
        children: [
          { key: 'basic-setting', label: '基本配置', type: 'form' },
          { key: 'password', label: '修改密码', type: 'form' },
        ],
      },
    ],
    listData: {
      'student-list': {
        title: '学员列表',
        columns: ['学号', '姓名', '班级', '手机号', '课程数', '状态'],
        rows: [
          ['S20260001', '张小明', '三年一班', '138****0001', '5', '在读'],
          ['S20260002', '李小红', '三年二班', '138****0002', '4', '在读'],
          ['S20260003', '王小刚', '二年一班', '138****0003', '6', '在读'],
          ['S20260004', '赵小丽', '一年一班', '138****0004', '3', '休学'],
        ],
      },
      'student-archive': {
        title: '学籍档案',
        columns: ['学号', '姓名', '入学日期', '学制', '专业', '毕业状态'],
        rows: [
          ['S20260001', '张小明', '2024-09-01', '4年', '计算机', '在读'],
          ['S20260002', '李小红', '2024-09-01', '4年', '英语', '在读'],
          ['S20260003', '王小刚', '2025-09-01', '3年', '数学', '在读'],
        ],
      },
      'course-list': {
        title: '课程列表',
        columns: ['课程编号', '课程名称', '授课教师', '学时', '学分', '状态'],
        rows: [
          ['C001', 'Vue3全栈开发', '张老师', '64', '4', '已上线'],
          ['C002', 'Python数据分析', '李老师', '48', '3', '已上线'],
          ['C003', 'React进阶实战', '王老师', '64', '4', '审核中'],
          ['C004', 'Node.js微服务', '赵老师', '48', '3', '已下线'],
        ],
      },
      'teacher-archive': {
        title: '教师档案',
        columns: ['工号', '姓名', '职称', '院系', '授课数', '入职日期'],
        rows: [
          ['T001', '张老师', '副教授', '计算机学院', '3', '2020-09-01'],
          ['T002', '李老师', '讲师', '数据学院', '2', '2021-03-15'],
          ['T003', '王老师', '教授', '软件学院', '4', '2018-06-20'],
        ],
      },
      schedule: {
        title: '排课管理',
        columns: ['课程', '教师', '教室', '星期', '节次', '周次'],
        rows: [
          ['Vue3全栈', '张老师', 'A301', '周一', '1-2', '1-16周'],
          ['Python分析', '李老师', 'B205', '周三', '3-4', '1-16周'],
          ['React实战', '王老师', 'A401', '周五', '5-6', '1-12周'],
        ],
      },
      exam: {
        title: '考试安排',
        columns: ['考试编号', '课程名称', '考试日期', '考场', '监考教师', '状态'],
        rows: [
          ['E001', 'Vue3全栈', '2026-06-20', 'A301', '张老师', '未开始'],
          ['E002', 'Python分析', '2026-06-22', 'B205', '李老师', '未开始'],
          ['E003', 'React实战', '2026-06-25', 'A401', '王老师', '未开始'],
        ],
      },
      courseware: {
        title: '课件管理',
        columns: ['课件ID', '课件名称', '课程', '格式', '大小', '上传日期'],
        rows: [
          ['CW001', 'Vue3基础入门', 'Vue3全栈', 'PDF', '12MB', '2026-01-10'],
          ['CW002', 'Python数据处理', 'Python分析', 'PPT', '8MB', '2026-01-12'],
        ],
      },
      homework: {
        title: '作业管理',
        columns: ['作业ID', '作业标题', '课程', '截止日期', '提交数', '状态'],
        rows: [
          ['HW001', 'Vue3组件开发', 'Vue3全栈', '2026-01-20', '45/52', '进行中'],
          ['HW002', '数据清洗实战', 'Python分析', '2026-01-25', '38/48', '进行中'],
        ],
      },
    },
  },

  government: {
    id: 3,
    name: '政务服务平台',
    color: '#e6a23c',
    category: 'government',
    industryKey: 'government',
    stats: [
      { icon: 'OfficeBuilding', label: '今日办件', value: '456', trend: '+6.3%', up: true },
      { icon: 'Document', label: '审批事项', value: '1,234', trend: '+2.1%', up: true },
      { icon: 'User', label: '注册市民', value: '56,789', trend: '+1.8%', up: true },
      { icon: 'CircleCheck', label: '办结率', value: '96.8%', trend: '+0.5%', up: true },
    ],
    menus: [
      { key: 'dashboard', label: '工作台', icon: 'DataAnalysis' },
      {
        key: 'service-hall',
        label: '办事大厅',
        icon: 'OfficeBuilding',
        children: [
          { key: 'item-list', label: '事项列表', type: 'list' },
          { key: 'online-handle', label: '在线办理', type: 'form' },
        ],
      },
      {
        key: 'approval',
        label: '审批流程',
        icon: 'Stamp',
        children: [
          { key: 'pending', label: '待办审批', type: 'list' },
          { key: 'done', label: '已办事项', type: 'list' },
        ],
      },
      {
        key: 'info-public',
        label: '信息公开',
        icon: 'Bell',
        children: [
          { key: 'policy', label: '政策公告', type: 'list' },
          { key: 'guide', label: '办事指南', type: 'list' },
        ],
      },
      {
        key: 'personnel',
        label: '人员管理',
        icon: 'User',
        children: [
          { key: 'staff', label: '工作人员', type: 'list' },
          { key: 'perm-assign', label: '权限分配', type: 'list' },
        ],
      },
      {
        key: 'report',
        label: '统计报表',
        icon: 'TrendCharts',
        children: [
          { key: 'volume', label: '办件量', type: 'chart' },
          { key: 'satisfaction', label: '满意度', type: 'chart' },
        ],
      },
      { key: 'flow-demo', label: '流程演示', icon: 'SetUp' },
      {
        key: 'settings',
        label: '系统设置',
        icon: 'Setting',
        children: [
          { key: 'basic-setting', label: '基本配置', type: 'form' },
          { key: 'password', label: '修改密码', type: 'form' },
        ],
      },
    ],
    listData: {
      'item-list': {
        title: '事项列表',
        columns: ['事项编号', '事项名称', '部门', '办理时限', '收费标准', '状态'],
        rows: [
          ['GV001', '营业执照申请', '市场监管局', '5工作日', '免费', '可办理'],
          ['GV002', '户口迁移', '公安局', '3工作日', '免费', '可办理'],
          ['GV003', '社保转移', '人社局', '7工作日', '免费', '暂停'],
        ],
      },
      pending: {
        title: '待办审批',
        columns: ['审批号', '事项', '申请人', '提交日期', '紧急程度', '状态'],
        rows: [
          ['AP001', '营业执照申请', '张先生', '2026-01-20', '普通', '待审批'],
          ['AP002', '户口迁移', '李女士', '2026-01-19', '紧急', '待审批'],
          ['AP003', '社保转移', '王先生', '2026-01-18', '普通', '待审批'],
        ],
      },
      done: {
        title: '已办事项',
        columns: ['审批号', '事项', '申请人', '办理日期', '结果', '满意度'],
        rows: [
          ['AP004', '居住证办理', '赵先生', '2026-01-17', '已通过', '满意'],
          ['AP005', '公积金提取', '钱女士', '2026-01-16', '已通过', '非常满意'],
        ],
      },
      policy: {
        title: '政策公告',
        columns: ['公告ID', '标题', '发布部门', '发布日期', '阅读量', '状态'],
        rows: [
          ['PL001', '2026年社保缴费基数调整通知', '人社局', '2026-01-15', '2,345', '已发布'],
          ['PL002', '春节期间政务服务时间调整', '办公厅', '2026-01-18', '5,678', '已发布'],
        ],
      },
      guide: {
        title: '办事指南',
        columns: ['指南ID', '事项名称', '办理流程', '所需材料', '办理时限'],
        rows: [
          ['GD001', '营业执照申请', '在线申请→审核→领证', '身份证、场地证明', '5工作日'],
          ['GD002', '户口迁移', '申请→审核→迁移', '户口本、房产证', '3工作日'],
        ],
      },
      staff: {
        title: '工作人员',
        columns: ['工号', '姓名', '部门', '职位', '审批权限', '状态'],
        rows: [
          ['W001', '张主任', '市场监管局', '科长', '一级审批', '在岗'],
          ['W002', '李科员', '公安局', '科员', '二级审批', '在岗'],
          ['W003', '王科长', '人社局', '科长', '一级审批', '出差'],
        ],
      },
      'perm-assign': {
        title: '权限分配',
        columns: ['角色', '人员数', '审批权限', '数据权限', '状态'],
        rows: [
          ['科长', '5', '一级审批', '全部数据', '启用'],
          ['科员', '12', '二级审批', '本部门数据', '启用'],
          ['窗口人员', '8', '仅查看', '本业务数据', '启用'],
        ],
      },
    },
  },

  medical: {
    id: 4,
    name: '医疗管理系统',
    color: '#f56c6c',
    category: 'medical',
    industryKey: 'medical',
    stats: [
      { icon: 'FirstAidKit', label: '今日挂号', value: '389', trend: '+7.2%', up: true },
      { icon: 'User', label: '在院患者', value: '1,256', trend: '-3.1%', up: false },
      { icon: 'Money', label: '门诊收入', value: '¥234K', trend: '+4.5%', up: true },
      { icon: 'CircleCheck', label: '治愈率', value: '94.2%', trend: '+1.2%', up: true },
    ],
    menus: [
      { key: 'dashboard', label: '工作台', icon: 'DataAnalysis' },
      {
        key: 'patients',
        label: '患者管理',
        icon: 'User',
        children: [
          { key: 'patient-archive', label: '患者档案', type: 'list' },
          { key: 'registration', label: '挂号预约', type: 'list' },
        ],
      },
      {
        key: 'treatment',
        label: '诊疗管理',
        icon: 'FirstAidKit',
        children: [
          { key: 'visit-record', label: '就诊记录', type: 'list' },
          { key: 'prescription', label: '处方管理', type: 'list' },
        ],
      },
      {
        key: 'pharmacy',
        label: '药品管理',
        icon: 'Box',
        children: [
          { key: 'drug-stock', label: '药品库存', type: 'list' },
          { key: 'drug-io', label: '出入库', type: 'list' },
        ],
      },
      {
        key: 'doctors',
        label: '医生管理',
        icon: 'Avatar',
        children: [
          { key: 'doctor-schedule', label: '医生排班', type: 'list' },
          { key: 'performance', label: '绩效统计', type: 'chart' },
        ],
      },
      {
        key: 'report',
        label: '统计报表',
        icon: 'TrendCharts',
        children: [
          { key: 'visit-stats', label: '就诊量', type: 'chart' },
          { key: 'drug-consumption', label: '药品消耗', type: 'chart' },
        ],
      },
      { key: 'flow-demo', label: '流程演示', icon: 'SetUp' },
      {
        key: 'settings',
        label: '系统设置',
        icon: 'Setting',
        children: [
          { key: 'basic-setting', label: '基本配置', type: 'form' },
          { key: 'password', label: '修改密码', type: 'form' },
        ],
      },
    ],
    listData: {
      'patient-archive': {
        title: '患者档案',
        columns: ['档案号', '姓名', '性别', '年龄', '过敏史', '最近就诊'],
        rows: [
          ['PA001', '张三', '男', '45', '青霉素', '2026-01-15'],
          ['PA002', '李四', '女', '32', '无', '2026-01-16'],
          ['PA003', '王五', '男', '58', '磺胺类', '2026-01-17'],
        ],
      },
      registration: {
        title: '挂号预约',
        columns: ['挂号号', '患者', '科室', '医生', '日期', '状态'],
        rows: [
          ['RG001', '张三', '内科', '王主任', '2026-01-20', '已就诊'],
          ['RG002', '李四', '外科', '李医生', '2026-01-20', '候诊中'],
          ['RG003', '王五', '儿科', '赵医生', '2026-01-21', '已预约'],
        ],
      },
      'visit-record': {
        title: '就诊记录',
        columns: ['就诊号', '患者', '科室', '主诊医生', '诊断', '日期'],
        rows: [
          ['VR001', '张三', '内科', '王主任', '上呼吸道感染', '2026-01-15'],
          ['VR002', '李四', '外科', '李医生', '腰椎间盘突出', '2026-01-16'],
        ],
      },
      prescription: {
        title: '处方管理',
        columns: ['处方号', '患者', '医生', '药品', '金额', '状态'],
        rows: [
          ['RX001', '张三', '王主任', '阿莫西林+止咳糖浆', '¥56', '已取药'],
          ['RX002', '李四', '李医生', '布洛芬+膏药', '¥89', '待取药'],
        ],
      },
      'drug-stock': {
        title: '药品库存',
        columns: ['药品编码', '药品名称', '规格', '库存数量', '预警值', '状态'],
        rows: [
          ['D001', '阿莫西林胶囊', '0.5g*24', '1,200', '200', '正常'],
          ['D002', '布洛芬片', '0.2g*20', '800', '150', '正常'],
          ['D003', '止咳糖浆', '120ml', '50', '100', '预警'],
        ],
      },
      'drug-io': {
        title: '出入库记录',
        columns: ['单号', '类型', '药品', '数量', '操作人', '日期'],
        rows: [
          ['IO001', '入库', '阿莫西林胶囊', '500', '药房管理员', '2026-01-18'],
          ['IO002', '出库', '布洛芬片', '100', '李护士', '2026-01-19'],
        ],
      },
      'doctor-schedule': {
        title: '医生排班',
        columns: ['医生', '科室', '周一', '周二', '周三', '周四', '周五'],
        rows: [
          ['王主任', '内科', '上午', '上午', '—', '上午', '上午'],
          ['李医生', '外科', '—', '全天', '全天', '—', '全天'],
          ['赵医生', '儿科', '全天', '—', '全天', '全天', '—'],
        ],
      },
    },
  },

  logistics: {
    id: 5,
    name: '物流管理系统',
    color: '#909399',
    category: 'logistics',
    industryKey: 'logistics',
    stats: [
      { icon: 'Van', label: '今日运单', value: '5,678', trend: '+11.3%', up: true },
      { icon: 'Box', label: '库存总量', value: '23,456', trend: '-2.5%', up: false },
      { icon: 'User', label: '合作客户', value: '892', trend: '+4.7%', up: true },
      { icon: 'CircleCheck', label: '准时率', value: '97.3%', trend: '+0.8%', up: true },
    ],
    menus: [
      { key: 'dashboard', label: '工作台', icon: 'DataAnalysis' },
      {
        key: 'waybill',
        label: '运单管理',
        icon: 'Document',
        children: [
          { key: 'waybill-list', label: '运单列表', type: 'list' },
          { key: 'tracking', label: '轨迹跟踪', type: 'list' },
        ],
      },
      {
        key: 'vehicle',
        label: '车辆管理',
        icon: 'Van',
        children: [
          { key: 'vehicle-archive', label: '车辆档案', type: 'list' },
          { key: 'dispatch', label: '调度管理', type: 'list' },
        ],
      },
      {
        key: 'delivery',
        label: '配送管理',
        icon: 'Location',
        children: [
          { key: 'courier', label: '配送人员', type: 'list' },
          { key: 'route', label: '路线规划', type: 'list' },
        ],
      },
      {
        key: 'warehouse',
        label: '仓储管理',
        icon: 'Box',
        children: [
          { key: 'inbound', label: '入库', type: 'list' },
          { key: 'outbound', label: '出库', type: 'list' },
          { key: 'stocktake', label: '库存盘点', type: 'list' },
        ],
      },
      {
        key: 'report',
        label: '数据统计',
        icon: 'TrendCharts',
        children: [
          { key: 'delivery-time', label: '配送时效', type: 'chart' },
          { key: 'order-volume', label: '订单量', type: 'chart' },
        ],
      },
      { key: 'flow-demo', label: '流程演示', icon: 'SetUp' },
      {
        key: 'settings',
        label: '系统设置',
        icon: 'Setting',
        children: [
          { key: 'basic-setting', label: '基本配置', type: 'form' },
          { key: 'password', label: '修改密码', type: 'form' },
        ],
      },
    ],
    listData: {
      'waybill-list': {
        title: '运单列表',
        columns: ['运单号', '发货人', '收货人', '始发地', '目的地', '状态'],
        rows: [
          ['WD001', '深圳电子', '北京张三', '深圳', '北京', '运输中'],
          ['WD002', '上海服饰', '成都李四', '上海', '成都', '已签收'],
          ['WD003', '广州食品', '武汉王五', '广州', '武汉', '待取件'],
        ],
      },
      tracking: {
        title: '轨迹跟踪',
        columns: ['运单号', '当前位置', '更新时间', '预计到达', '承运车辆', '状态'],
        rows: [
          ['WD001', '郑州中转站', '2026-01-20 08:30', '2026-01-21', '京A12345', '运输中'],
          ['WD002', '成都配送站', '2026-01-19 16:00', '已送达', '川B67890', '已签收'],
        ],
      },
      'vehicle-archive': {
        title: '车辆档案',
        columns: ['车牌号', '车型', '载重', '司机', '状态', '年检到期'],
        rows: [
          ['京A12345', '重型卡车', '20吨', '刘师傅', '运行中', '2026-12-01'],
          ['川B67890', '中型货车', '10吨', '陈师傅', '维修中', '2026-06-15'],
        ],
      },
      dispatch: {
        title: '调度管理',
        columns: ['调度单号', '车辆', '司机', '出发地', '目的地', '发车时间'],
        rows: [
          ['DS001', '京A12345', '刘师傅', '深圳', '北京', '2026-01-20 06:00'],
          ['DS002', '川B67890', '陈师傅', '上海', '成都', '2026-01-21 08:00'],
        ],
      },
      courier: {
        title: '配送人员',
        columns: ['工号', '姓名', '区域', '今日配送', '本月配送', '评分'],
        rows: [
          ['C001', '小李', '朝阳区', '28', '680', '4.8'],
          ['C002', '小王', '海淀区', '22', '590', '4.6'],
          ['C003', '小张', '丰台区', '25', '620', '4.9'],
        ],
      },
      route: {
        title: '路线规划',
        columns: ['路线ID', '起点', '终点', '距离', '预计时间', '途经站点'],
        rows: [
          ['R001', '深圳仓', '北京站', '2,200km', '28小时', '3个'],
          ['R002', '上海仓', '成都站', '1,900km', '24小时', '2个'],
        ],
      },
      inbound: {
        title: '入库记录',
        columns: ['入库单号', '商品', '数量', '仓库', '操作人', '入库时间'],
        rows: [
          ['IN001', '电子产品', '500件', '深圳仓', '管理员', '2026-01-18'],
          ['IN002', '日用百货', '300件', '上海仓', '管理员', '2026-01-19'],
        ],
      },
      outbound: {
        title: '出库记录',
        columns: ['出库单号', '商品', '数量', '仓库', '操作人', '出库时间'],
        rows: [
          ['OUT001', '电子产品', '100件', '深圳仓', '管理员', '2026-01-19'],
          ['OUT002', '日用百货', '80件', '上海仓', '管理员', '2026-01-20'],
        ],
      },
      stocktake: {
        title: '库存盘点',
        columns: ['商品', '仓库', '系统库存', '实际库存', '差异', '盘点日期'],
        rows: [
          ['电子产品', '深圳仓', '500', '498', '-2', '2026-01-20'],
          ['日用百货', '上海仓', '300', '300', '0', '2026-01-20'],
        ],
      },
    },
  },

  hr: {
    id: 9,
    name: '人力资源系统',
    color: '#b195eb',
    category: 'hr',
    industryKey: 'hr',
    stats: [
      { icon: 'UserFilled', label: '在职员工', value: '1,234', trend: '+3.2%', up: true },
      { icon: 'Avatar', label: '本月入职', value: '28', trend: '+12%', up: true },
      { icon: 'Money', label: '薪资总额', value: '¥2.3M', trend: '+5.1%', up: true },
      { icon: 'CircleCheck', label: '出勤率', value: '96.5%', trend: '+0.3%', up: true },
    ],
    menus: [
      { key: 'dashboard', label: '工作台', icon: 'DataAnalysis' },
      {
        key: 'employee',
        label: '员工管理',
        icon: 'User',
        children: [
          { key: 'employee-archive', label: '员工档案', type: 'list' },
          { key: 'onboard-offboard', label: '入职离职', type: 'list' },
        ],
      },
      {
        key: 'attendance',
        label: '考勤管理',
        icon: 'Clock',
        children: [
          { key: 'punch-record', label: '打卡记录', type: 'list' },
          { key: 'leave-approval', label: '请假审批', type: 'list' },
        ],
      },
      {
        key: 'salary',
        label: '薪资管理',
        icon: 'Money',
        children: [
          { key: 'salary-calc', label: '薪资核算', type: 'list' },
          { key: 'pay-record', label: '发放记录', type: 'list' },
        ],
      },
      {
        key: 'recruit',
        label: '招聘管理',
        icon: 'Avatar',
        children: [
          { key: 'recruit-need', label: '招聘需求', type: 'list' },
          { key: 'interview', label: '面试安排', type: 'list' },
        ],
      },
      {
        key: 'training',
        label: '培训管理',
        icon: 'Reading',
        children: [
          { key: 'train-plan', label: '培训计划', type: 'list' },
          { key: 'train-course', label: '课程管理', type: 'list' },
        ],
      },
      { key: 'flow-demo', label: '流程演示', icon: 'SetUp' },
      {
        key: 'settings',
        label: '系统设置',
        icon: 'Setting',
        children: [
          { key: 'basic-setting', label: '基本配置', type: 'form' },
          { key: 'password', label: '修改密码', type: 'form' },
        ],
      },
    ],
    listData: {
      'employee-archive': {
        title: '员工档案',
        columns: ['工号', '姓名', '部门', '职位', '入职日期', '状态'],
        rows: [
          ['E001', '张三', '技术部', '高级工程师', '2022-03-15', '在职'],
          ['E002', '李四', '产品部', '产品经理', '2021-08-20', '在职'],
          ['E003', '王五', '设计部', 'UI设计师', '2023-01-10', '在职'],
          ['E004', '赵六', '市场部', '市场专员', '2025-06-01', '试用期'],
        ],
      },
      'onboard-offboard': {
        title: '入职离职',
        columns: ['工号', '姓名', '类型', '部门', '生效日期', '备注'],
        rows: [
          ['E005', '新员工A', '入职', '技术部', '2026-02-01', '校招'],
          ['E004', '赵六', '离职', '市场部', '2026-01-31', '个人原因'],
        ],
      },
      'punch-record': {
        title: '打卡记录',
        columns: ['工号', '姓名', '日期', '上班打卡', '下班打卡', '状态'],
        rows: [
          ['E001', '张三', '2026-01-20', '08:55', '18:10', '正常'],
          ['E002', '李四', '2026-01-20', '09:15', '18:00', '迟到'],
          ['E003', '王五', '2026-01-20', '08:50', '18:30', '正常'],
        ],
      },
      'leave-approval': {
        title: '请假审批',
        columns: ['申请号', '姓名', '类型', '开始日期', '天数', '状态'],
        rows: [
          ['LA001', '张三', '年假', '2026-01-25', '3', '已批准'],
          ['LA002', '李四', '病假', '2026-01-22', '1', '待审批'],
          ['LA003', '王五', '事假', '2026-01-28', '2', '待审批'],
        ],
      },
      'salary-calc': {
        title: '薪资核算',
        columns: ['工号', '姓名', '基本工资', '绩效', '补贴', '实发'],
        rows: [
          ['E001', '张三', '¥18,000', '¥3,600', '¥1,500', '¥23,100'],
          ['E002', '李四', '¥16,000', '¥2,800', '¥1,200', '¥20,000'],
          ['E003', '王五', '¥15,000', '¥2,500', '¥1,000', '¥18,500'],
        ],
      },
      'pay-record': {
        title: '发放记录',
        columns: ['批次', '月份', '人数', '总金额', '发放日期', '状态'],
        rows: [
          ['B202601', '2026年1月', '1,234', '¥2,300,000', '2026-01-31', '已发放'],
          ['B202512', '2025年12月', '1,220', '¥2,250,000', '2025-12-31', '已发放'],
        ],
      },
      'recruit-need': {
        title: '招聘需求',
        columns: ['需求号', '岗位', '部门', '人数', '紧急程度', '状态'],
        rows: [
          ['RN001', '前端工程师', '技术部', '3', '紧急', '招聘中'],
          ['RN002', '产品经理', '产品部', '1', '普通', '招聘中'],
          ['RN003', '设计师', '设计部', '2', '普通', '待审批'],
        ],
      },
      interview: {
        title: '面试安排',
        columns: ['面试号', '候选人', '岗位', '面试官', '日期', '状态'],
        rows: [
          ['IV001', '候选人A', '前端工程师', '张三', '2026-01-25', '待面试'],
          ['IV002', '候选人B', '产品经理', '李四', '2026-01-26', '待面试'],
        ],
      },
      'train-plan': {
        title: '培训计划',
        columns: ['计划号', '培训名称', '讲师', '日期', '人数', '状态'],
        rows: [
          ['TP001', 'Vue3技术培训', '张三', '2026-02-01', '30', '未开始'],
          ['TP002', '产品思维培训', '李四', '2026-02-15', '20', '未开始'],
        ],
      },
      'train-course': {
        title: '课程管理',
        columns: ['课程号', '课程名称', '类型', '时长', '讲师', '状态'],
        rows: [
          ['TC001', 'Vue3入门到精通', '技术', '32学时', '张三', '已上线'],
          ['TC002', '产品方法论', '管理', '16学时', '李四', '已上线'],
        ],
      },
    },
  },

  finance: {
    id: 8,
    name: '财务管理系统',
    color: '#2f9999',
    category: 'finance',
    industryKey: 'finance',
    stats: [
      { icon: 'Money', label: '交易总额', value: '¥5.6M', trend: '+18.2%', up: true },
      { icon: 'Warning', label: '风险预警', value: '23', trend: '-5.3%', up: true },
      { icon: 'User', label: '授信客户', value: '3,456', trend: '+7.8%', up: true },
      { icon: 'CircleCheck', label: '合规率', value: '99.2%', trend: '+0.1%', up: true },
    ],
    menus: [
      { key: 'dashboard', label: '工作台', icon: 'DataAnalysis' },
      {
        key: 'income-expense',
        label: '收支管理',
        icon: 'Money',
        children: [
          { key: 'income', label: '收入记录', type: 'list' },
          { key: 'expense', label: '支出记录', type: 'list' },
        ],
      },
      {
        key: 'invoice',
        label: '发票管理',
        icon: 'Document',
        children: [
          { key: 'invoice-input', label: '发票录入', type: 'form' },
          { key: 'reimburse', label: '报销审核', type: 'list' },
        ],
      },
      {
        key: 'budget',
        label: '预算管理',
        icon: 'DataLine',
        children: [
          { key: 'budget-plan', label: '预算编制', type: 'list' },
          { key: 'budget-track', label: '执行跟踪', type: 'chart' },
        ],
      },
      {
        key: 'report',
        label: '报表统计',
        icon: 'TrendCharts',
        children: [
          { key: 'balance-sheet', label: '资产负债表', type: 'chart' },
          { key: 'profit', label: '利润表', type: 'chart' },
        ],
      },
      {
        key: 'receivable',
        label: '应收应付',
        icon: 'Tickets',
        children: [
          { key: 'receivable-list', label: '应收账款', type: 'list' },
          { key: 'payable-list', label: '应付账款', type: 'list' },
        ],
      },
      { key: 'flow-demo', label: '流程演示', icon: 'SetUp' },
      {
        key: 'settings',
        label: '系统设置',
        icon: 'Setting',
        children: [
          { key: 'basic-setting', label: '基本配置', type: 'form' },
          { key: 'password', label: '修改密码', type: 'form' },
        ],
      },
    ],
    listData: {
      income: {
        title: '收入记录',
        columns: ['编号', '来源', '金额', '日期', '类别', '状态'],
        rows: [
          ['INC001', '客户A回款', '¥500,000', '2026-01-15', '主营业务', '已到账'],
          ['INC002', '投资收益', '¥120,000', '2026-01-18', '投资', '已到账'],
          ['INC003', '服务费', '¥35,000', '2026-01-20', '其他', '待到账'],
        ],
      },
      expense: {
        title: '支出记录',
        columns: ['编号', '用途', '金额', '日期', '类别', '审批'],
        rows: [
          ['EXP001', '办公设备采购', '¥45,000', '2026-01-16', '固定资产', '已审批'],
          ['EXP002', '员工薪资', '¥2,300,000', '2026-01-31', '人力成本', '已审批'],
          ['EXP003', '市场推广', '¥80,000', '2026-01-20', '营销费用', '待审批'],
        ],
      },
      reimburse: {
        title: '报销审核',
        columns: ['报销单号', '申请人', '金额', '类别', '日期', '状态'],
        rows: [
          ['RB001', '张三', '¥3,500', '差旅费', '2026-01-18', '已审批'],
          ['RB002', '李四', '¥1,200', '办公用品', '2026-01-19', '待审批'],
          ['RB003', '王五', '¥5,600', '招待费', '2026-01-20', '待审批'],
        ],
      },
      'budget-plan': {
        title: '预算编制',
        columns: ['科目', '预算金额', '已使用', '剩余', '使用率', '状态'],
        rows: [
          ['人力成本', '¥3,000,000', '¥2,300,000', '¥700,000', '76.7%', '执行中'],
          ['营销费用', '¥1,000,000', '¥680,000', '¥320,000', '68.0%', '执行中'],
          ['研发投入', '¥2,000,000', '¥1,200,000', '¥800,000', '60.0%', '执行中'],
        ],
      },
      'receivable-list': {
        title: '应收账款',
        columns: ['客户', '金额', '到期日', '逾期天数', '风险等级', '状态'],
        rows: [
          ['A公司', '¥500,000', '2026-02-15', '0', '低', '正常'],
          ['B公司', '¥230,000', '2026-01-10', '10', '中', '逾期'],
          ['C公司', '¥120,000', '2025-12-31', '20', '高', '逾期'],
        ],
      },
      'payable-list': {
        title: '应付账款',
        columns: ['供应商', '金额', '到期日', '逾期天数', '优先级', '状态'],
        rows: [
          ['供应商X', '¥350,000', '2026-02-01', '0', '高', '待支付'],
          ['供应商Y', '¥180,000', '2026-02-20', '0', '中', '待支付'],
          ['供应商Z', '¥90,000', '2026-01-15', '5', '低', '逾期'],
        ],
      },
    },
  },

  restaurant: {
    id: 6,
    name: '门店管理系统',
    color: '#ff9f40',
    category: 'restaurant',
    industryKey: 'restaurant',
    stats: [
      { icon: 'Bowl', label: '今日订单', value: '456', trend: '+9.3%', up: true },
      { icon: 'Money', label: '营业额', value: '¥23,456', trend: '+6.7%', up: true },
      { icon: 'User', label: '会员数', value: '2,345', trend: '+4.2%', up: true },
      { icon: 'Goods', label: '菜品数', value: '128', trend: '+2%', up: true },
    ],
    menus: [
      { key: 'dashboard', label: '工作台', icon: 'DataAnalysis' },
      {
        key: 'sales',
        label: '销售管理',
        icon: 'ShoppingCart',
        children: [
          { key: 'sales-record', label: '销售记录', type: 'list' },
          { key: 'cashier', label: '收银管理', type: 'list' },
        ],
      },
      {
        key: 'stock',
        label: '库存管理',
        icon: 'Box',
        children: [
          { key: 'goods-stock', label: '商品库存', type: 'list' },
          { key: 'stocktake', label: '盘点管理', type: 'list' },
        ],
      },
      {
        key: 'member',
        label: '会员管理',
        icon: 'User',
        children: [
          { key: 'member-list', label: '会员列表', type: 'list' },
          { key: 'points', label: '积分管理', type: 'list' },
        ],
      },
      {
        key: 'analysis',
        label: '营业分析',
        icon: 'TrendCharts',
        children: [
          { key: 'sales-report', label: '销售报表', type: 'chart' },
          { key: 'traffic', label: '客流分析', type: 'chart' },
        ],
      },
      {
        key: 'staff',
        label: '员工管理',
        icon: 'Avatar',
        children: [
          { key: 'staff-archive', label: '店员档案', type: 'list' },
          { key: 'staff-schedule', label: '排班管理', type: 'list' },
        ],
      },
      { key: 'flow-demo', label: '流程演示', icon: 'SetUp' },
      {
        key: 'settings',
        label: '系统设置',
        icon: 'Setting',
        children: [
          { key: 'basic-setting', label: '基本配置', type: 'form' },
          { key: 'password', label: '修改密码', type: 'form' },
        ],
      },
    ],
    listData: {
      'sales-record': {
        title: '销售记录',
        columns: ['订单号', '桌号', '菜品', '金额', '支付方式', '时间'],
        rows: [
          ['OD001', '1号桌', '宫保鸡丁套餐', '¥38', '微信', '12:30'],
          ['OD002', '3号桌', '红烧肉套餐', '¥42', '支付宝', '12:45'],
          ['OD003', '5号桌', '清蒸鲈鱼', '¥68', '现金', '13:10'],
        ],
      },
      cashier: {
        title: '收银管理',
        columns: ['收银员', '班次', '订单数', '收款金额', '退款金额', '交班时间'],
        rows: [
          ['小李', '午班', '56', '¥4,560', '¥120', '14:00'],
          ['小王', '晚班', '78', '¥6,230', '¥80', '22:00'],
        ],
      },
      'goods-stock': {
        title: '商品库存',
        columns: ['商品', '分类', '当前库存', '预警值', '单位', '状态'],
        rows: [
          ['鸡胸肉', '肉类', '50kg', '20kg', 'kg', '正常'],
          ['鲈鱼', '海鲜', '15条', '10条', '条', '正常'],
          ['豆腐', '素菜', '8块', '10块', '块', '预警'],
        ],
      },
      stocktake: {
        title: '盘点管理',
        columns: ['盘点单号', '盘点日期', '商品', '系统库存', '实际库存', '差异'],
        rows: [
          ['ST001', '2026-01-20', '鸡胸肉', '50kg', '49kg', '-1kg'],
          ['ST001', '2026-01-20', '鲈鱼', '15条', '15条', '0'],
        ],
      },
      'member-list': {
        title: '会员列表',
        columns: ['会员ID', '姓名', '手机号', '等级', '积分', '注册日期'],
        rows: [
          ['M001', '张先生', '138****0001', '金卡', '5,600', '2025-03-15'],
          ['M002', '李女士', '138****0002', '银卡', '2,300', '2025-06-20'],
          ['M003', '王先生', '138****0003', '普通', '800', '2025-11-01'],
        ],
      },
      points: {
        title: '积分管理',
        columns: ['规则', '消费金额', '获得积分', '兑换比例', '状态'],
        rows: [
          ['基础积分', '¥1', '1分', '100分=¥1', '启用'],
          ['双倍积分', '¥1', '2分', '100分=¥1', '仅周末启用'],
        ],
      },
      'staff-archive': {
        title: '店员档案',
        columns: ['工号', '姓名', '职位', '入职日期', '手机号', '状态'],
        rows: [
          ['S001', '小李', '收银员', '2024-05-01', '138****0010', '在职'],
          ['S002', '小王', '服务员', '2025-02-15', '138****0011', '在职'],
          ['S003', '小张', '厨师', '2023-08-20', '138****0012', '在职'],
        ],
      },
      'staff-schedule': {
        title: '排班管理',
        columns: ['姓名', '周一', '周二', '周三', '周四', '周五'],
        rows: [
          ['小李', '午班', '午班', '休息', '午班', '午班'],
          ['小王', '晚班', '休息', '晚班', '晚班', '晚班'],
          ['小张', '全天', '全天', '全天', '休息', '全天'],
        ],
      },
    },
  },

  community: {
    id: 11,
    name: '社区管理系统',
    color: '#00b42a',
    category: 'community',
    industryKey: 'community',
    stats: [
      { icon: 'House', label: '住户总数', value: '3,456', trend: '+2.1%', up: true },
      { icon: 'Warning', label: '待处理报修', value: '12', trend: '-15%', up: true },
      { icon: 'Bell', label: '本月公告', value: '8', trend: '+3', up: true },
      { icon: 'CircleCheck', label: '满意度', value: '92.3%', trend: '+1.5%', up: true },
    ],
    menus: [
      { key: 'dashboard', label: '工作台', icon: 'DataAnalysis' },
      {
        key: 'resident',
        label: '居民管理',
        icon: 'User',
        children: [
          { key: 'resident-info', label: '居民信息', type: 'list' },
          { key: 'household', label: '住户档案', type: 'list' },
        ],
      },
      {
        key: 'repair',
        label: '物业报修',
        icon: 'SetUp',
        children: [
          { key: 'repair-list', label: '报修列表', type: 'list' },
          { key: 'repair-progress', label: '处理进度', type: 'list' },
        ],
      },
      {
        key: 'notice',
        label: '活动通知',
        icon: 'Bell',
        children: [
          { key: 'announcement', label: '社区公告', type: 'list' },
          { key: 'activity', label: '活动发布', type: 'form' },
        ],
      },
      {
        key: 'complaint',
        label: '投诉建议',
        icon: 'ChatDotRound',
        children: [
          { key: 'complaint-list', label: '投诉处理', type: 'list' },
          { key: 'satisfaction', label: '满意度', type: 'chart' },
        ],
      },
      {
        key: 'facility',
        label: '设施管理',
        icon: 'OfficeBuilding',
        children: [
          { key: 'public-facility', label: '公共设施', type: 'list' },
          { key: 'maintenance', label: '维护记录', type: 'list' },
        ],
      },
      { key: 'flow-demo', label: '流程演示', icon: 'SetUp' },
      {
        key: 'settings',
        label: '系统设置',
        icon: 'Setting',
        children: [
          { key: 'basic-setting', label: '基本配置', type: 'form' },
          { key: 'password', label: '修改密码', type: 'form' },
        ],
      },
    ],
    listData: {
      'resident-info': {
        title: '居民信息',
        columns: ['住户号', '姓名', '楼栋', '房号', '手机号', '入住日期'],
        rows: [
          ['R001', '张先生', '1栋', '101', '138****0001', '2023-06-01'],
          ['R002', '李女士', '1栋', '202', '138****0002', '2023-08-15'],
          ['R003', '王先生', '2栋', '301', '138****0003', '2024-01-10'],
        ],
      },
      household: {
        title: '住户档案',
        columns: ['住户号', '户主', '家庭成员', '面积', '物业费', '状态'],
        rows: [
          ['R001', '张先生', '3人', '120㎡', '¥360/月', '正常'],
          ['R002', '李女士', '4人', '89㎡', '¥267/月', '正常'],
          ['R003', '王先生', '2人', '150㎡', '¥450/月', '欠费'],
        ],
      },
      'repair-list': {
        title: '报修列表',
        columns: ['报修号', '住户', '类型', '描述', '紧急程度', '状态'],
        rows: [
          ['RP001', '张先生', '水电', '厨房水龙头漏水', '紧急', '处理中'],
          ['RP002', '李女士', '门窗', '卧室窗户关不严', '普通', '待处理'],
          ['RP003', '王先生', '电梯', '电梯异响', '紧急', '已处理'],
        ],
      },
      'repair-progress': {
        title: '处理进度',
        columns: ['报修号', '描述', '接单人', '开始时间', '预计完成', '进度'],
        rows: [
          ['RP001', '厨房水龙头漏水', '维修工小李', '2026-01-20 09:00', '2026-01-20 12:00', '60%'],
          ['RP003', '电梯异响', '电梯维保公司', '2026-01-19 14:00', '2026-01-19 17:00', '100%'],
        ],
      },
      announcement: {
        title: '社区公告',
        columns: ['公告ID', '标题', '类型', '发布日期', '阅读量', '状态'],
        rows: [
          ['AN001', '春节放假通知', '通知', '2026-01-18', '2,345', '已发布'],
          ['AN002', '物业费调整说明', '公告', '2026-01-15', '3,456', '已发布'],
          ['AN003', '小区绿化改造', '公示', '2026-01-10', '1,890', '已发布'],
        ],
      },
      'complaint-list': {
        title: '投诉处理',
        columns: ['投诉号', '住户', '内容', '类别', '日期', '状态'],
        rows: [
          ['CP001', '张先生', '楼道灯不亮', '设施', '2026-01-18', '已处理'],
          ['CP002', '李女士', '邻居噪音扰民', '邻里', '2026-01-19', '处理中'],
          ['CP003', '王先生', '停车位被占', '物业', '2026-01-20', '待处理'],
        ],
      },
      'public-facility': {
        title: '公共设施',
        columns: ['设施ID', '名称', '位置', '状态', '上次维护', '下次维护'],
        rows: [
          ['F001', '健身房', 'A栋1层', '正常', '2026-01-15', '2026-04-15'],
          ['F002', '游泳池', 'B栋顶层', '维护中', '2026-01-10', '2026-02-10'],
          ['F003', '儿童乐园', 'C区', '正常', '2026-01-05', '2026-04-05'],
        ],
      },
      maintenance: {
        title: '维护记录',
        columns: ['记录号', '设施', '维护内容', '维护人', '费用', '日期'],
        rows: [
          ['MT001', '健身房', '跑步机维修', '张师傅', '¥800', '2026-01-15'],
          ['MT002', '游泳池', '水质处理', '专业公司', '¥2,000', '2026-01-10'],
        ],
      },
    },
  },

  project: {
    id: 10,
    name: '项目管理系统',
    color: '#13c2c2',
    category: 'project',
    industryKey: 'project',
    stats: [
      { icon: 'FolderOpened', label: '进行中项目', value: '24', trend: '+8.3%', up: true },
      { icon: 'User', label: '团队成员', value: '156', trend: '+2.1%', up: true },
      { icon: 'Document', label: '任务总数', value: '892', trend: '+15.6%', up: true },
      { icon: 'CircleCheck', label: '完成率', value: '87.3%', trend: '+3.2%', up: true },
    ],
    menus: [
      { key: 'dashboard', label: '工作台', icon: 'DataAnalysis' },
      {
        key: 'board',
        label: '项目看板',
        icon: 'Grid',
        children: [
          { key: 'task-board', label: '任务看板', type: 'list' },
          { key: 'progress', label: '进度跟踪', type: 'chart' },
        ],
      },
      {
        key: 'team',
        label: '成员管理',
        icon: 'User',
        children: [
          { key: 'team-member', label: '团队成员', type: 'list' },
          { key: 'role-assign', label: '角色分配', type: 'list' },
        ],
      },
      {
        key: 'task',
        label: '任务管理',
        icon: 'List',
        children: [
          { key: 'task-list', label: '任务列表', type: 'list' },
          { key: 'task-assign', label: '任务分配', type: 'form' },
        ],
      },
      {
        key: 'doc',
        label: '文档管理',
        icon: 'FolderOpened',
        children: [
          { key: 'project-doc', label: '项目文档', type: 'list' },
          { key: 'version', label: '版本控制', type: 'list' },
        ],
      },
      {
        key: 'risk',
        label: '风险预警',
        icon: 'Warning',
        children: [
          { key: 'risk-identify', label: '风险识别', type: 'list' },
          { key: 'risk-response', label: '应对措施', type: 'list' },
        ],
      },
      { key: 'flow-demo', label: '流程演示', icon: 'SetUp' },
      {
        key: 'settings',
        label: '系统设置',
        icon: 'Setting',
        children: [
          { key: 'basic-setting', label: '基本配置', type: 'form' },
          { key: 'password', label: '修改密码', type: 'form' },
        ],
      },
    ],
    listData: {
      'task-board': {
        title: '任务看板',
        columns: ['任务ID', '标题', '负责人', '优先级', '截止日期', '状态'],
        rows: [
          ['TSK001', '前端页面开发', '张三', '高', '2026-02-01', '进行中'],
          ['TSK002', 'API接口联调', '李四', '中', '2026-02-15', '待开始'],
          ['TSK003', '数据库设计', '王五', '高', '2026-01-25', '已完成'],
          ['TSK004', 'UI设计评审', '赵六', '低', '2026-02-10', '进行中'],
        ],
      },
      'team-member': {
        title: '团队成员',
        columns: ['工号', '姓名', '角色', '项目数', '技能', '状态'],
        rows: [
          ['TM001', '张三', '前端工程师', '3', 'Vue,React', '可用'],
          ['TM002', '李四', '后端工程师', '2', 'Node,Python', '忙碌'],
          ['TM003', '王五', 'DBA', '4', 'MySQL,MongoDB', '可用'],
        ],
      },
      'role-assign': {
        title: '角色分配',
        columns: ['角色', '人数', '权限范围', '项目数', '状态'],
        rows: [
          ['项目经理', '5', '全部权限', '8', '启用'],
          ['开发工程师', '20', '代码权限', '12', '启用'],
          ['测试工程师', '8', '测试权限', '10', '启用'],
        ],
      },
      'task-list': {
        title: '任务列表',
        columns: ['任务ID', '标题', '项目', '负责人', '优先级', '状态'],
        rows: [
          ['TSK001', '前端页面开发', '电商平台', '张三', '高', '进行中'],
          ['TSK002', 'API接口联调', '电商平台', '李四', '中', '待开始'],
          ['TSK005', '测试用例编写', '教育系统', '钱七', '中', '待开始'],
        ],
      },
      'project-doc': {
        title: '项目文档',
        columns: ['文档ID', '标题', '项目', '作者', '更新日期', '版本'],
        rows: [
          ['DOC001', '需求规格说明书', '电商平台', '张三', '2026-01-18', 'v2.1'],
          ['DOC002', '技术架构设计', '电商平台', '李四', '2026-01-15', 'v1.3'],
          ['DOC003', '测试计划', '教育系统', '钱七', '2026-01-20', 'v1.0'],
        ],
      },
      version: {
        title: '版本控制',
        columns: ['版本号', '项目', '提交人', '日期', '变更说明', '状态'],
        rows: [
          ['v2.1.0', '电商平台', '张三', '2026-01-18', '新增商品模块', '已发布'],
          ['v2.0.1', '电商平台', '李四', '2026-01-15', '修复订单Bug', '已发布'],
          ['v1.0.0', '教育系统', '王五', '2026-01-10', '初始版本', '已发布'],
        ],
      },
      'risk-identify': {
        title: '风险识别',
        columns: ['风险ID', '描述', '项目', '等级', '可能性', '状态'],
        rows: [
          ['RK001', '前端进度延迟', '电商平台', '高', '中', '监控中'],
          ['RK002', '接口性能问题', '电商平台', '中', '低', '已缓解'],
          ['RK003', '需求变更频繁', '教育系统', '高', '高', '监控中'],
        ],
      },
      'risk-response': {
        title: '应对措施',
        columns: ['措施ID', '关联风险', '措施描述', '负责人', '截止日期', '状态'],
        rows: [
          ['RS001', 'RK001', '增加前端人力', '张三', '2026-01-25', '执行中'],
          ['RS002', 'RK002', '性能压测优化', '李四', '2026-01-30', '待执行'],
          ['RS003', 'RK003', '需求冻结机制', '王五', '2026-02-01', '待执行'],
        ],
      },
    },
  },
};

export default industryConfigs;
