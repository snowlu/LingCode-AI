import { getDB } from '../config/db.js'
import { success, fail } from '../utils/response.js'

const flowConfigs = {
  ecommerce: {
    name: '订单售后处理流程',
    steps: [
      { title: '用户申请售后', description: '用户在订单详情页提交售后申请', action: '提交申请', statusField: 'afterSaleStatus', statusValue: '已申请' },
      { title: '客服审核', description: '客服人员审核售后申请，确认退货/换货原因', action: '审核通过', statusField: 'afterSaleStatus', statusValue: '审核通过' },
      { title: '仓库收货', description: '用户寄回商品，仓库确认签收', action: '确认收货', statusField: 'afterSaleStatus', statusValue: '已收货' },
      { title: '退款完成', description: '财务确认退款，资金原路返回', action: '确认退款', statusField: 'afterSaleStatus', statusValue: '已退款' }
    ],
    tableName: 'ecommerce_orders',
    updateData: { afterSaleStatus: '已申请', type: '退货退款' }
  },
  education: {
    name: '课程报名-考勤-成绩统计',
    steps: [
      { title: '学生报名课程', description: '学生选择课程并完成报名缴费', action: '确认报名', statusField: 'enrollStatus', statusValue: '已报名' },
      { title: '打卡考勤', description: '学生上课打卡，系统自动记录考勤', action: '签到打卡', statusField: 'enrollStatus', statusValue: '已考勤' },
      { title: '录入成绩', description: '教师录入考试成绩', action: '录入成绩', statusField: 'enrollStatus', statusValue: '已出分' },
      { title: '统计完成', description: '系统自动统计出勤率与成绩排名', action: '查看统计', statusField: 'enrollStatus', statusValue: '已完成' }
    ],
    tableName: 'education_students',
    updateData: { enrollStatus: '已报名', attendance: '0%', score: '-' }
  },
  government: {
    name: '事项申请-审批流转-办结',
    steps: [
      { title: '提交申请', description: '市民在线提交办事申请材料', action: '提交材料', statusField: 'approvalStatus', statusValue: '已提交' },
      { title: '窗口受理', description: '政务大厅窗口人员受理并初审', action: '受理通过', statusField: 'approvalStatus', statusValue: '已受理' },
      { title: '部门审批', description: '业务部门负责人审批', action: '审批通过', statusField: 'approvalStatus', statusValue: '已审批' },
      { title: '办结完成', description: '事项办结，通知申请人领取结果', action: '确认办结', statusField: 'approvalStatus', statusValue: '已办结' }
    ],
    tableName: 'government_applications',
    updateData: { approvalStatus: '已提交' }
  },
  medical: {
    name: '患者挂号-就诊-处方生成',
    steps: [
      { title: '预约挂号', description: '患者选择科室和医生预约挂号', action: '确认挂号', statusField: 'visitStatus', statusValue: '已挂号' },
      { title: '医生接诊', description: '医生查看患者信息并进行诊断', action: '开始接诊', statusField: 'visitStatus', statusValue: '就诊中' },
      { title: '生成处方', description: '医生根据诊断结果开具电子处方', action: '开具处方', statusField: 'visitStatus', statusValue: '已开处方' },
      { title: '取药完成', description: '患者凭处方到药房取药', action: '确认取药', statusField: 'visitStatus', statusValue: '已取药' }
    ],
    tableName: 'medical_appointments',
    updateData: { visitStatus: '已挂号' }
  },
  logistics: {
    name: '运单轨迹跟踪',
    steps: [
      { title: '创建运单', description: '发货方创建运单，系统分配运单号', action: '创建运单', statusField: 'trackStatus', statusValue: '已创建' },
      { title: '仓库揽收', description: '快递员上门揽收包裹', action: '确认揽收', statusField: 'trackStatus', statusValue: '已揽收' },
      { title: '运输中', description: '包裹在中转站之间运输', action: '更新轨迹', statusField: 'trackStatus', statusValue: '运输中' },
      { title: '派送签收', description: '快递员派送，收件人签收', action: '确认签收', statusField: 'trackStatus', statusValue: '已签收' }
    ],
    tableName: 'logistics_orders',
    updateData: { trackStatus: '已创建' }
  },
  hr: {
    name: '员工入职流程',
    steps: [
      { title: '录入信息', description: 'HR录入新员工基本信息', action: '录入信息', statusField: 'onboardStatus', statusValue: '信息录入' },
      { title: '生成工号', description: '系统自动生成员工工号和邮箱', action: '生成工号', statusField: 'onboardStatus', statusValue: '已分配工号' },
      { title: '创建考勤', description: '系统自动创建考勤记录和排班', action: '创建考勤', statusField: 'onboardStatus', statusValue: '考勤已设置' },
      { title: '入职完成', description: '员工正式入职，所有系统就绪', action: '确认入职', statusField: 'onboardStatus', statusValue: '已入职' }
    ],
    tableName: 'hr_employees',
    updateData: { onboardStatus: '信息录入' }
  },
  finance: {
    name: '报销审批流程',
    steps: [
      { title: '提交报销', description: '员工填写报销单并提交', action: '提交报销', statusField: 'reimburseStatus', statusValue: '已提交' },
      { title: '主管审批', description: '直属主管审核报销内容', action: '主管通过', statusField: 'reimburseStatus', statusValue: '主管已批' },
      { title: '财务审批', description: '财务部门审核金额和票据', action: '财务通过', statusField: 'reimburseStatus', statusValue: '财务已批' },
      { title: '到账通知', description: '报销款项到账，通知员工', action: '确认到账', statusField: 'reimburseStatus', statusValue: '已到账' }
    ],
    tableName: 'finance_reimbursements',
    updateData: { reimburseStatus: '已提交' }
  },
  restaurant: {
    name: '会员积分消费流程',
    steps: [
      { title: '会员消费', description: '会员在门店消费并结算', action: '确认消费', statusField: 'pointsStatus', statusValue: '已消费' },
      { title: '积分计算', description: '系统根据消费金额计算积分', action: '计算积分', statusField: 'pointsStatus', statusValue: '积分计算中' },
      { title: '积分到账', description: '积分自动充入会员账户', action: '积分到账', statusField: 'pointsStatus', statusValue: '积分已到账' },
      { title: '通知会员', description: '推送积分变动通知给会员', action: '已通知', statusField: 'pointsStatus', statusValue: '已通知' }
    ],
    tableName: 'restaurant_members',
    updateData: { pointsStatus: '已消费' }
  },
  community: {
    name: '报修处理流程',
    steps: [
      { title: '提交报修', description: '居民在线提交报修申请', action: '提交报修', statusField: 'repairFlowStatus', statusValue: '已报修' },
      { title: '物业派单', description: '物业管理人员分配维修人员', action: '派单处理', statusField: 'repairFlowStatus', statusValue: '已派单' },
      { title: '维修处理', description: '维修人员上门处理问题', action: '开始维修', statusField: 'repairFlowStatus', statusValue: '维修中' },
      { title: '报修完成', description: '维修完成，居民确认评价', action: '确认完成', statusField: 'repairFlowStatus', statusValue: '已完成' }
    ],
    tableName: 'community_repairs',
    updateData: { repairFlowStatus: '已报修' }
  },
  project: {
    name: '任务分配流程',
    steps: [
      { title: '创建任务', description: '项目经理创建任务并分配给团队成员', action: '分配任务', statusField: 'taskFlowStatus', statusValue: '已分配' },
      { title: '开始执行', description: '团队成员接收任务并开始执行', action: '开始执行', statusField: 'taskFlowStatus', statusValue: '执行中' },
      { title: '提交完成', description: '团队成员提交任务成果', action: '提交成果', statusField: 'taskFlowStatus', statusValue: '待验收' },
      { title: '验收通过', description: '项目经理验收任务并确认完成', action: '验收通过', statusField: 'taskFlowStatus', statusValue: '已完成' }
    ],
    tableName: 'project_tasks',
    updateData: { taskFlowStatus: '已分配' }
  }
}

export function getFlowConfig(req, res) {
  try {
    const { industry } = req.params
    const config = flowConfigs[industry]
    if (!config) return res.status(404).json(fail('未找到该行业的流程配置', 404))
    res.json(success(config))
  } catch (err) {
    res.status(500).json(fail('获取流程配置失败', 500))
  }
}

export async function advanceFlow(req, res) {
  try {
    const { industry } = req.params
    const { stepIndex, recordId } = req.body
    const config = flowConfigs[industry]
    if (!config) return res.status(404).json(fail('未找到该行业的流程配置', 404))
    if (stepIndex < 0 || stepIndex >= config.steps.length) return res.status(400).json(fail('无效的步骤索引', 400))

    const step = config.steps[stepIndex]
    const db = getDB()
    const tableName = config.tableName
    if (!db.data[tableName]) db.data[tableName] = []
    const list = db.data[tableName]

    if (recordId) {
      const idx = list.findIndex(i => String(i.id) === String(recordId))
      if (idx > -1) {
        list[idx][step.statusField] = step.statusValue
        await db.write()
        return res.json(success({ record: list[idx], step, stepIndex }, '流程推进成功'))
      }
    }

    const targetRecord = list.find(i => !i[step.statusField] || i[step.statusField] !== config.steps[config.steps.length - 1].statusValue)
    if (targetRecord) {
      targetRecord[step.statusField] = step.statusValue
      await db.write()
      return res.json(success({ record: targetRecord, step, stepIndex }, '流程推进成功'))
    }

    const maxId = list.length > 0 ? Math.max(...list.map(i => i.id || 0)) : 0
    const newRecord = { id: maxId + 1, ...config.updateData, [step.statusField]: step.statusValue, createdAt: new Date().toISOString().split('T')[0] }
    list.push(newRecord)
    await db.write()
    res.json(success({ record: newRecord, step, stepIndex }, '流程推进成功'))
  } catch (err) {
    console.error('流程推进错误:', err)
    res.status(500).json(fail('流程推进失败', 500))
  }
}

export { flowConfigs }
