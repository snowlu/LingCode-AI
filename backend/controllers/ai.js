import { getDB, getTableName } from '../config/db.js'
import { success, fail } from '../utils/response.js'
import { callDoubao, extractJson } from '../utils/doubao.js'

const surnames = ['张','李','王','赵','刘','陈','杨','黄','周','吴','徐','孙','马','朱','胡','郭','林','何','高','罗']
const maleNames = ['伟','强','磊','军','勇','杰','涛','明','超','华','飞','刚','平','辉','鹏','志','浩','宇','博','文']
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const genName = () => pick(surnames) + pick(maleNames)

const industryLabels = {
  ecommerce: '电商零售',
  education: '教育培训',
  government: '政务服务',
  medical: '医疗健康',
  logistics: '物流仓储',
  hr: '人力资源',
  finance: '财务金融',
  restaurant: '门店管理',
  community: '社区物业',
  project: '项目管理',
}

const SYSTEM_PROMPT = `你是专业低代码后台系统生成引擎，严格遵守以下规则：
1. 只返回纯标准JSON字符串，不要任何解释、不要markdown、不要多余文字、不要换行描述。
2. 根据传入行业类型、用户修改指令、是否开启多语言，生成完整后台配置。
3. 输出JSON固定包含以下字段：
- menuList 侧边栏菜单数组（包含菜单名、路由path、图标、子菜单）
  每个菜单项格式: { "key": "唯一key", "label": "中文名", "icon": "ElementPlus图标名", "type": "list|chart|form|tree", "children": [] }
- routeConfig 路由配置（基于menuList生成对应路由）
- pageModules 页面功能模块配置，每个模块包含title、columns(表头数组)、rows(示例数据二维数组)
- i18n 多语言对象 包含 zh、en 全套文案（菜单名、按钮、表格表头、提示语）
  格式: { "zh": { "menu": { "key": "中文" }, "button": { "add": "新增", "edit": "编辑", "delete": "删除", "export": "导出" }, "table": {}, "message": {} }, "en": { ... } }
- mockSchema 对应模块的mock数据结构说明
- themeConfig 主题色、布局配置 { "primaryColor": "#色值", "layout": "side|top|mix", "darkMode": false }
4. 菜单和模块要贴合对应行业真实业务，合理专业，不重复、不空洞。至少4个一级菜单（含工作台），每个菜单下至少2个子菜单。
5. 开启needI18n时，必须完整生成中英文双语；未开启只返回中文即可，i18n.en为空对象。
6. 严格JSON格式，键名固定，无语法错误，可直接被前端JSON.parse解析使用。
7. pageModules中的示例数据要真实合理，每列5行数据。`

function buildUserPrompt(templateType, userPrompt, themeColor, needI18n) {
  const industryName = industryLabels[templateType] || templateType
  return `行业类型: ${industryName} (${templateType})
用户额外指令: ${userPrompt || '无'}
主题色: ${themeColor || '#409eff'}
需要多语言: ${needI18n ? '是' : '否'}

请生成完整的后台配置JSON。${needI18n ? '必须包含完整中英文(i18n.zh和i18n.en)。' : '只需要中文(i18n.en为空对象)。'}`
}

function validateAiConfig(config, needI18n) {
  const required = ['menuList', 'routeConfig', 'pageModules', 'i18n', 'mockSchema', 'themeConfig']
  const missing = required.filter(f => !(f in config))
  if (missing.length > 0) {
    throw new Error(`AI返回配置缺少必要字段: ${missing.join(', ')}`)
  }
  if (!Array.isArray(config.menuList) || config.menuList.length === 0) {
    throw new Error('AI返回的menuList为空或不是数组')
  }
  if (needI18n && (!config.i18n?.zh || !config.i18n?.en)) {
    throw new Error('AI返回的i18n缺少中英文翻译')
  }
  if (!config.themeConfig?.primaryColor) {
    config.themeConfig = config.themeConfig || {}
    config.themeConfig.primaryColor = '#409eff'
  }
  return config
}

const moduleTemplates = {
  '售后管理': { key: 'after-sale-mgmt', icon: 'Service', type: 'list', columns: ['工单号','订单号','类型','客户','处理状态','申请时间'], sampleRows: () => [['AS'+randInt(100,999),'ORD'+randInt(1000,9999),pick(['退货','换货','维修']),genName(),pick(['待审核','处理中','已完成']),new Date().toISOString().split('T')[0]]] },
  '库存预警': { key: 'inventory-alert', icon: 'Warning', type: 'list', columns: ['预警ID','商品名称','当前库存','预警阈值','状态','预警时间'], sampleRows: () => [['IA'+randInt(100,999),pick(['iPhone 15','MacBook Air','AirPods Pro','iPad Mini']),String(randInt(5,30)),String(randInt(50,100)),pick(['待处理','已处理']),new Date().toISOString().split('T')[0]]] },
  '学员考勤': { key: 'student-attendance', icon: 'Calendar', type: 'list', columns: ['考勤ID','学员','课程','出勤状态','打卡时间','备注'], sampleRows: () => [['AT'+randInt(100,999),genName(),pick(['Vue3全栈','Python分析','React实战']),pick(['出勤','迟到','缺勤']),new Date().toISOString().split('T')[0],'']] },
  '审批流程': { key: 'approval-flow', icon: 'Stamp', type: 'list', columns: ['审批号','事项','申请人','当前节点','状态','提交时间'], sampleRows: () => [['AP'+randInt(100,999),pick(['营业执照','户口迁移','社保转移']),genName(),pick(['初审','复审','终审']),pick(['待审批','审批中','已通过']),new Date().toISOString().split('T')[0]]] },
  '数据看板': { key: 'data-board', icon: 'DataAnalysis', type: 'chart', columns: [], sampleRows: () => [] },
  '会员分析': { key: 'member-analysis', icon: 'TrendCharts', type: 'chart', columns: [], sampleRows: () => [] },
  '配送调度': { key: 'dispatch-mgmt', icon: 'Van', type: 'list', columns: ['调度单号','配送员','区域','订单数','状态','时间'], sampleRows: () => [['DS'+randInt(100,999),genName(),pick(['朝阳区','海淀区','浦东新区']),String(randInt(10,50)),pick(['待出发','配送中','已完成']),new Date().toISOString().split('T')[0]]] },
  '薪资核算': { key: 'salary-calc', icon: 'Money', type: 'list', columns: ['工号','姓名','基本工资','绩效','实发','状态'], sampleRows: () => [['E'+randInt(1,99),genName(),'¥'+randInt(8000,25000),'¥'+randInt(1000,8000),'¥'+randInt(10000,30000),pick(['待发放','已发放'])]] },
  '发票管理': { key: 'invoice-mgmt', icon: 'Document', type: 'list', columns: ['发票号','类型','金额','客户','状态','日期'], sampleRows: () => [['INV'+randInt(10000,99999),pick(['增值税专用','增值税普通','电子发票']),'¥'+randInt(1000,50000),pick(['腾讯','阿里','字节','百度']),pick(['已开具','待开具']),new Date().toISOString().split('T')[0]]] },
  '菜品评价': { key: 'dish-review', icon: 'ChatDotRound', type: 'list', columns: ['评价ID','菜品','评分','评价人','内容','时间'], sampleRows: () => [['RV'+randInt(100,999),pick(['宫保鸡丁','红烧肉','清蒸鲈鱼']),String((3+Math.random()*2).toFixed(1)),genName(),pick(['非常好吃','味道不错','一般般']),new Date().toISOString().split('T')[0]]] },
  '投诉处理': { key: 'complaint-handle', icon: 'Warning', type: 'list', columns: ['投诉号','住户','内容','类别','状态','时间'], sampleRows: () => [['CP'+randInt(100,999),genName(),pick(['噪音扰民','停车问题','设施损坏']),pick(['物业','邻里','设施']),pick(['待处理','处理中','已处理']),new Date().toISOString().split('T')[0]]] },
  '里程碑管理': { key: 'milestone', icon: 'Flag', type: 'list', columns: ['里程碑ID','名称','项目','计划日期','状态','负责人'], sampleRows: () => [['MS'+randInt(100,999),pick(['需求评审','开发完成','测试通过','上线发布']),pick(['电商平台','教育系统','内部OA']),new Date().toISOString().split('T')[0],pick(['未开始','进行中','已完成']),genName()]] }
}

function matchModule(instruction) {
  const lower = instruction.toLowerCase()
  for (const [key, tmpl] of Object.entries(moduleTemplates)) {
    if (lower.includes(key.toLowerCase()) || lower.includes(key.replace('管理','').toLowerCase())) return { name: key, ...tmpl }
  }
  if (lower.includes('售后') || lower.includes('退换')) return { name: '售后管理', ...moduleTemplates['售后管理'] }
  if (lower.includes('库存') || lower.includes('预警')) return { name: '库存预警', ...moduleTemplates['库存预警'] }
  if (lower.includes('考勤') || lower.includes('签到')) return { name: '学员考勤', ...moduleTemplates['学员考勤'] }
  if (lower.includes('审批') || lower.includes('流程')) return { name: '审批流程', ...moduleTemplates['审批流程'] }
  if (lower.includes('看板') || lower.includes('图表')) return { name: '数据看板', ...moduleTemplates['数据看板'] }
  if (lower.includes('会员') || lower.includes('分析')) return { name: '会员分析', ...moduleTemplates['会员分析'] }
  if (lower.includes('配送') || lower.includes('调度')) return { name: '配送调度', ...moduleTemplates['配送调度'] }
  if (lower.includes('薪资') || lower.includes('工资')) return { name: '薪资核算', ...moduleTemplates['薪资核算'] }
  if (lower.includes('发票')) return { name: '发票管理', ...moduleTemplates['发票管理'] }
  if (lower.includes('评价') || lower.includes('评分')) return { name: '菜品评价', ...moduleTemplates['菜品评价'] }
  if (lower.includes('投诉')) return { name: '投诉处理', ...moduleTemplates['投诉处理'] }
  if (lower.includes('里程碑')) return { name: '里程碑管理', ...moduleTemplates['里程碑管理'] }
  return { name: '自定义模块', key: 'custom-module-' + Date.now(), icon: 'Setting', type: 'list', columns: ['编号','名称','状态','创建时间'], sampleRows: () => [['C'+randInt(100,999),'示例数据','正常',new Date().toISOString().split('T')[0]]] }
}

export async function generateAiConfig(req, res) {
  try {
    const { templateType, userPrompt, themeColor, needI18n, currentConfig } = req.body

    if (!templateType) {
      return res.status(400).json(fail('缺少行业类型参数', 400))
    }

    const isModify = !!currentConfig
    let systemPrompt = SYSTEM_PROMPT
    let userMessage

    if (isModify) {
      systemPrompt += '\n\n用户正在修改已有的后台配置，以下是当前配置JSON。请根据用户的自然语言指令修改配置并返回完整的更新后JSON。'
      userMessage = `当前完整配置:\n${JSON.stringify(currentConfig, null, 2)}\n\n用户修改指令: ${userPrompt || '无'}\n\n请返回修改后的完整配置JSON。如果是新增模块/删除菜单/改配色/加图表/调整布局等操作，请直接修改当前配置并返回。`
    } else {
      userMessage = buildUserPrompt(templateType, userPrompt, themeColor, needI18n)
    }

    console.log('调用豆包API生成配置...')
    const rawResponse = await callDoubao(systemPrompt, userMessage)
    console.log('豆包API返回成功，解析JSON...')

    const config = extractJson(rawResponse)
    validateAiConfig(config, needI18n)

    const industryName = industryLabels[templateType] || templateType
    config._meta = {
      industry: templateType,
      industryName,
      generatedAt: new Date().toISOString(),
      needI18n: !!needI18n,
    }

    res.json(success(config, 'AI生成成功'))
  } catch (err) {
    console.error('AI生成失败:', err.message)
    if (err.message.includes('豆包API')) {
      return res.status(502).json(fail(`AI服务调用失败: ${err.message}`, 502))
    }
    if (err.message.includes('JSON')) {
      return res.status(422).json(fail(`AI返回数据格式异常: ${err.message}`, 422))
    }
    res.status(500).json(fail(`AI生成失败: ${err.message}`, 500))
  }
}

export async function applyAiModule(req, res) {
  try {
    const { industry, instruction, moduleName } = req.body
    if (!industry) return res.status(400).json(fail('缺少行业参数', 400))

    const moduleInfo = moduleName ? { name: moduleName, ...(moduleTemplates[moduleName] || { key: moduleName.toLowerCase().replace(/\s+/g, '-'), icon: 'Setting', type: 'list', columns: ['编号','名称','状态','创建时间'], sampleRows: () => [['C001','示例数据','正常',new Date().toISOString().split('T')[0]]] }) } : matchModule(instruction || '')

    const db = getDB()
    const tableName = getTableName(industry, moduleInfo.key)

    if (!db.data[tableName]) {
      db.data[tableName] = []
    }
    if (db.data[tableName].length === 0) {
      const rows = []
      for (let i = 0; i < 15; i++) {
        const sampleRow = moduleInfo.sampleRows()
        if (sampleRow.length > 0) {
          const row = { id: i + 1 }
          moduleInfo.columns.forEach((col, ci) => {
            row[col] = sampleRow[0] ? sampleRow[0][ci] || '' : ''
          })
          rows.push(row)
        }
      }
      db.data[tableName] = rows
    }

    await db.write()

    const newMenuItem = {
      key: moduleInfo.key,
      label: moduleInfo.name,
      icon: moduleInfo.icon,
      type: moduleInfo.type
    }

    const listDataKey = moduleInfo.key
    const listDataValue = {
      title: moduleInfo.name,
      columns: moduleInfo.columns,
      rows: db.data[tableName].slice(0, 5).map(row => moduleInfo.columns.map(col => row[col] || ''))
    }

    res.json(success({
      menu: newMenuItem,
      tableName,
      listDataKey,
      listDataValue,
      dataCount: db.data[tableName].length,
      message: `已成功创建「${moduleInfo.name}」模块，包含 ${db.data[tableName].length} 条模拟数据`
    }))
  } catch (err) {
    console.error('AI应用错误:', err)
    res.status(500).json(fail('AI应用失败', 500))
  }
}

export function getAiModuleTemplates(req, res) {
  try {
    const { industry } = req.params
    const industryModules = {
      ecommerce: ['售后管理', '库存预警', '会员分析'],
      education: ['学员考勤', '数据看板'],
      government: ['审批流程', '数据看板'],
      medical: ['审批流程', '数据看板'],
      logistics: ['配送调度', '库存预警'],
      hr: ['薪资核算', '学员考勤'],
      finance: ['发票管理', '审批流程'],
      restaurant: ['菜品评价', '会员分析'],
      community: ['投诉处理', '数据看板'],
      project: ['里程碑管理', '数据看板']
    }
    const modules = (industryModules[industry] || ['数据看板']).map(name => ({
      name,
      ...moduleTemplates[name]
    }))
    res.json(success(modules))
  } catch (err) {
    res.status(500).json(fail('获取模块模板失败', 500))
  }
}
