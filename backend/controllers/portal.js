/**
 * 用户端门户控制器
 * 处理 To C 用户端的数据查询和订单提交
 */

import { getDB, getTableName } from '../config/db.js'
import { success, fail } from '../utils/response.js'

/**
 * 获取用户端首页数据
 * GET /api/portal/:industry/home
 * @param {string} req.params.industry - 行业标识
 * @returns {{ products: Array }} 首页商品/服务列表
 */
export function getPortalHome(req, res) {
  try {
    const { industry } = req.params
    const db = getDB()
    const all = db.data['portal_products'] || []
    const products = all.filter(p => p.industry === industry)
    res.json(success({ products }))
  } catch (err) {
    res.status(500).json(fail('获取首页数据失败', 500))
  }
}

/**
 * 用户端提交订单/申请
 * POST /api/portal/:industry/submit
 * @param {string} req.params.industry - 行业标识
 * @param {Object} req.body - 提交数据
 * @returns {Object} 新建的订单记录
 */
export async function submitPortalOrder(req, res) {
  try {
    const { industry } = req.params
    const db = getDB()
    const tableName = getTableName(industry, 'orders')
    if (!db.data[tableName]) db.data[tableName] = []
    const list = db.data[tableName]
    const maxId = list.length > 0 ? Math.max(...list.map(i => (typeof i.id === 'number' ? i.id : parseInt(i.id) || 0))) : 0
    const newItem = { id: maxId + 1, ...req.body, status: '待处理', createdAt: new Date().toISOString().split('T')[0] }
    list.push(newItem)
    await db.write()
    res.json(success(newItem, '提交成功'))
  } catch (err) {
    res.status(500).json(fail('提交失败', 500))
  }
}
