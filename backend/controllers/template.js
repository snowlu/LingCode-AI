/**
 * 模板控制器
 * 处理模板列表和模板详情查询
 */

import { success, fail } from '../utils/response.js'

const templates = [
  { id: 1, name: '电商后台管理系统', category: 'ecommerce', description: '完整的电商管理解决方案', icon: 'ShoppingCart', color: '#409eff' },
  { id: 2, name: '教育管理系统', category: 'education', description: '面向教育机构的综合管理平台', icon: 'Reading', color: '#67c23a' },
  { id: 3, name: '政务服务平台', category: 'government', description: '政府机构数字化办公平台', icon: 'OfficeBuilding', color: '#e6a23c' },
  { id: 4, name: '医疗健康系统', category: 'medical', description: '医疗机构信息化管理', icon: 'FirstAidKit', color: '#f56c6c' },
  { id: 5, name: '物流仓储系统', category: 'logistics', description: '物流企业全流程管理', icon: 'Van', color: '#909399' },
  { id: 6, name: '餐饮管理系统', category: 'restaurant', description: '餐厅数字化运营工具', icon: 'Bowl', color: '#ff9f40' },
  { id: 8, name: '金融风控系统', category: 'finance', description: '金融机构风险管控平台', icon: 'Money', color: '#2f9999' },
  { id: 9, name: '人力资源系统', category: 'hr', description: '企业HR全生命周期管理', icon: 'UserFilled', color: '#b195eb' },
  { id: 10, name: '项目管理系统', category: 'project', description: '团队协作与项目管理工具', icon: 'FolderOpened', color: '#13c2c2' },
  { id: 11, name: '社区服务系统', category: 'community', description: '智慧社区管理平台', icon: 'House', color: '#00b42a' }
]

const templateMap = {}
templates.forEach(t => { templateMap[t.id] = { category: t.category } })

/**
 * 获取模板列表
 * GET /api/templates
 * @returns {Array} 模板列表
 */
export function getTemplates(req, res) {
  try {
    res.json(success(templates))
  } catch (err) {
    res.status(500).json(fail('获取模板列表失败', 500))
  }
}

/**
 * 获取模板详情
 * GET /api/templates/:id
 * @param {string} req.params.id - 模板ID
 * @returns {Object} 模板详情
 */
export function getTemplateDetail(req, res) {
  try {
    const t = templateMap[req.params.id]
    if (t) res.json(success(t))
    else res.status(404).json(fail('模板不存在', 404))
  } catch (err) {
    res.status(500).json(fail('获取模板详情失败', 500))
  }
}

/**
 * 健康检查
 * GET /api/health
 * @returns {Object} 服务状态信息
 */
export function healthCheck(req, res) {
  res.json(success({ timestamp: new Date().toISOString(), version: '2.0.0' }, '服务运行正常'))
}
