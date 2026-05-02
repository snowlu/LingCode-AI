export const flowConfigs = {
  ecommerce: {
    name: '订单售后处理流程',
    description: '订单申请售后 → 客服审核 → 仓库收货 → 退款完成',
    icon: 'Service',
    steps: [
      {
        title: '用户申请售后',
        desc: '用户在订单详情页提交售后申请，选择退货/换货原因',
        action: '提交申请',
        color: '#409eff',
      },
      {
        title: '客服审核',
        desc: '客服人员审核售后申请，确认退货/换货原因是否合理',
        action: '审核通过',
        color: '#e6a23c',
      },
      {
        title: '仓库收货',
        desc: '用户寄回商品，仓库确认签收并检查商品状态',
        action: '确认收货',
        color: '#67c23a',
      },
      {
        title: '退款完成',
        desc: '财务确认退款金额，资金原路返回用户账户',
        action: '确认退款',
        color: '#f56c6c',
      },
    ],
  },
  education: {
    name: '课程报名-考勤-成绩统计',
    description: '学生报名课程 → 打卡考勤 → 录入成绩 → 统计完成',
    icon: 'Calendar',
    steps: [
      {
        title: '学生报名课程',
        desc: '学生选择课程并完成报名缴费',
        action: '确认报名',
        color: '#67c23a',
      },
      {
        title: '打卡考勤',
        desc: '学生上课打卡，系统自动记录考勤数据',
        action: '签到打卡',
        color: '#409eff',
      },
      {
        title: '录入成绩',
        desc: '教师录入考试成绩，系统自动计算加权分',
        action: '录入成绩',
        color: '#e6a23c',
      },
      {
        title: '统计完成',
        desc: '系统自动统计出勤率与成绩排名，生成报表',
        action: '查看统计',
        color: '#f56c6c',
      },
    ],
  },
  government: {
    name: '事项申请-审批流转-办结',
    description: '用户提交申请 → 窗口受理 → 部门审批 → 办结完成',
    icon: 'Stamp',
    steps: [
      {
        title: '提交申请',
        desc: '市民在线提交办事申请材料，上传附件',
        action: '提交材料',
        color: '#e6a23c',
      },
      {
        title: '窗口受理',
        desc: '政务大厅窗口人员受理并初审材料',
        action: '受理通过',
        color: '#409eff',
      },
      {
        title: '部门审批',
        desc: '业务部门负责人审批，多级流转',
        action: '审批通过',
        color: '#67c23a',
      },
      {
        title: '办结完成',
        desc: '事项办结，通知申请人领取结果',
        action: '确认办结',
        color: '#f56c6c',
      },
    ],
  },
  medical: {
    name: '患者挂号-就诊-处方生成',
    description: '患者预约挂号 → 医生接诊 → 生成处方 → 取药完成',
    icon: 'FirstAidKit',
    steps: [
      {
        title: '预约挂号',
        desc: '患者选择科室和医生，预约挂号',
        action: '确认挂号',
        color: '#f56c6c',
      },
      {
        title: '医生接诊',
        desc: '医生查看患者信息，进行问诊和检查',
        action: '开始接诊',
        color: '#e6a23c',
      },
      {
        title: '生成处方',
        desc: '医生根据诊断结果开具电子处方',
        action: '开具处方',
        color: '#409eff',
      },
      { title: '取药完成', desc: '患者凭处方到药房取药', action: '确认取药', color: '#67c23a' },
    ],
  },
  logistics: {
    name: '运单轨迹跟踪',
    description: '创建运单 → 仓库揽收 → 运输中 → 派送签收',
    icon: 'Van',
    steps: [
      {
        title: '创建运单',
        desc: '发货方创建运单，系统分配运单号',
        action: '创建运单',
        color: '#909399',
      },
      {
        title: '仓库揽收',
        desc: '快递员上门揽收包裹，称重计费',
        action: '确认揽收',
        color: '#409eff',
      },
      {
        title: '运输中',
        desc: '包裹在中转站之间运输，实时更新轨迹',
        action: '更新轨迹',
        color: '#e6a23c',
      },
      {
        title: '派送签收',
        desc: '快递员派送，收件人签收确认',
        action: '确认签收',
        color: '#67c23a',
      },
    ],
  },
  hr: {
    name: '员工入职流程',
    description: '录入信息 → 生成工号 → 创建考勤 → 入职完成',
    icon: 'UserFilled',
    steps: [
      {
        title: '录入信息',
        desc: 'HR录入新员工基本信息、合同信息',
        action: '录入信息',
        color: '#b195eb',
      },
      {
        title: '生成工号',
        desc: '系统自动生成员工工号、邮箱账号',
        action: '生成工号',
        color: '#409eff',
      },
      {
        title: '创建考勤',
        desc: '系统自动创建考勤记录和排班信息',
        action: '创建考勤',
        color: '#e6a23c',
      },
      {
        title: '入职完成',
        desc: '员工正式入职，所有系统就绪',
        action: '确认入职',
        color: '#67c23a',
      },
    ],
  },
  finance: {
    name: '报销审批流程',
    description: '提交报销 → 主管审批 → 财务审批 → 到账通知',
    icon: 'Money',
    steps: [
      { title: '提交报销', desc: '员工填写报销单并上传票据', action: '提交报销', color: '#2f9999' },
      {
        title: '主管审批',
        desc: '直属主管审核报销内容和金额',
        action: '主管通过',
        color: '#409eff',
      },
      {
        title: '财务审批',
        desc: '财务部门审核金额和票据合规性',
        action: '财务通过',
        color: '#e6a23c',
      },
      {
        title: '到账通知',
        desc: '报销款项到账，推送通知给员工',
        action: '确认到账',
        color: '#67c23a',
      },
    ],
  },
  restaurant: {
    name: '会员积分消费流程',
    description: '会员消费 → 积分计算 → 积分到账 → 通知会员',
    icon: 'Bowl',
    steps: [
      { title: '会员消费', desc: '会员在门店消费并结算付款', action: '确认消费', color: '#ff9f40' },
      {
        title: '积分计算',
        desc: '系统根据消费金额和会员等级计算积分',
        action: '计算积分',
        color: '#409eff',
      },
      { title: '积分到账', desc: '积分自动充入会员账户', action: '积分到账', color: '#67c23a' },
      { title: '通知会员', desc: '推送积分变动通知给会员', action: '已通知', color: '#e6a23c' },
    ],
  },
  community: {
    name: '报修处理流程',
    description: '提交报修 → 物业派单 → 维修处理 → 报修完成',
    icon: 'SetUp',
    steps: [
      {
        title: '提交报修',
        desc: '居民在线提交报修申请，描述问题',
        action: '提交报修',
        color: '#00b42a',
      },
      { title: '物业派单', desc: '物业管理人员分配维修人员', action: '派单处理', color: '#409eff' },
      { title: '维修处理', desc: '维修人员上门处理问题', action: '开始维修', color: '#e6a23c' },
      { title: '报修完成', desc: '维修完成，居民确认评价', action: '确认完成', color: '#67c23a' },
    ],
  },
  project: {
    name: '任务分配流程',
    description: '创建任务 → 开始执行 → 提交成果 → 验收通过',
    icon: 'Grid',
    steps: [
      {
        title: '创建任务',
        desc: '项目经理创建任务并分配给团队成员',
        action: '分配任务',
        color: '#13c2c2',
      },
      {
        title: '开始执行',
        desc: '团队成员接收任务并开始执行',
        action: '开始执行',
        color: '#409eff',
      },
      { title: '提交成果', desc: '团队成员提交任务成果', action: '提交成果', color: '#e6a23c' },
      {
        title: '验收通过',
        desc: '项目经理验收任务并确认完成',
        action: '验收通过',
        color: '#67c23a',
      },
    ],
  },
};
