/**
 * 通用 CRUD 控制器
 * 处理所有行业的列表查询、详情、新增、编辑、删除操作
 */

import { getDB, getTableName } from '../config/db.js'
import { success, fail } from '../utils/response.js'

/**
 * 列表查询（分页、搜索、筛选）
 * GET /api/:industry/:resource/list
 * @param {string} req.params.industry - 行业标识
 * @param {string} req.params.resource - 资源名称
 * @param {number} req.query.page - 页码，默认1
 * @param {number} req.query.pageSize - 每页条数，默认10
 * @param {string} req.query.keywords - 搜索关键词
 * @param {string} req.query.status - 状态筛选
 * @param {string} req.query.category - 分类筛选
 * @returns {{ list: Array, total: number, page: number, pageSize: number }}
 */
export function getList(req, res) {
  try {
    const { industry, resource } = req.params
    const { page = 1, pageSize = 10, keywords = '', status = '', category = '' } = req.query
    const db = getDB()
    const tableName = getTableName(industry, resource)
    let data = db.data[tableName] || []

    if (keywords) {
      data = data.filter(item =>
        Object.values(item).some(v => String(v).toLowerCase().includes(keywords.toLowerCase()))
      )
    }
    if (status) data = data.filter(item => item.status === status)
    if (category) data = data.filter(item => item.category === category)

    const total = data.length
    const start = (parseInt(page) - 1) * parseInt(pageSize)
    const list = data.slice(start, start + parseInt(pageSize))

    res.json(success({ list, total, page: parseInt(page), pageSize: parseInt(pageSize) }))
  } catch (err) {
    res.status(500).json(fail('查询失败', 500))
  }
}

/**
 * 详情查询
 * GET /api/:industry/:resource/detail/:id
 * @param {string} req.params.industry - 行业标识
 * @param {string} req.params.resource - 资源名称
 * @param {string} req.params.id - 记录ID
 * @returns {Object} 记录详情
 */
export function getDetail(req, res) {
  try {
    const { industry, resource, id } = req.params
    const db = getDB()
    const tableName = getTableName(industry, resource)
    const data = db.data[tableName] || []
    const item = data.find(i => String(i.id) === String(id))
    if (item) res.json(success(item))
    else res.status(404).json(fail('记录不存在', 404))
  } catch (err) {
    res.status(500).json(fail('查询失败', 500))
  }
}

/**
 * 新增记录
 * POST /api/:industry/:resource/add
 * @param {string} req.params.industry - 行业标识
 * @param {string} req.params.resource - 资源名称
 * @param {Object} req.body - 新增数据
 * @returns {Object} 新增的记录
 */
export async function addItem(req, res) {
  try {
    const { industry, resource } = req.params
    const db = getDB()
    const tableName = getTableName(industry, resource)
    if (!db.data[tableName]) db.data[tableName] = []
    const list = db.data[tableName]
    const maxId = list.length > 0 ? Math.max(...list.map(i => (typeof i.id === 'number' ? i.id : parseInt(i.id) || 0))) : 0
    const newItem = { id: maxId + 1, ...req.body, createdAt: new Date().toISOString().split('T')[0] }
    list.push(newItem)
    await db.write()
    res.json(success(newItem, '新增成功'))
  } catch (err) {
    res.status(500).json(fail('新增失败', 500))
  }
}

/**
 * 更新记录
 * POST /api/:industry/:resource/update
 * @param {string} req.params.industry - 行业标识
 * @param {string} req.params.resource - 资源名称
 * @param {Object} req.body - 更新数据（必须包含 id）
 * @returns {Object} 更新后的记录
 */
export async function updateItem(req, res) {
  try {
    const { industry, resource } = req.params
    const db = getDB()
    const tableName = getTableName(industry, resource)
    const list = db.data[tableName] || []
    const idx = list.findIndex(i => String(i.id) === String(req.body.id))
    if (idx === -1) return res.status(404).json(fail('记录不存在', 404))
    list[idx] = { ...list[idx], ...req.body }
    await db.write()
    res.json(success(list[idx], '更新成功'))
  } catch (err) {
    res.status(500).json(fail('更新失败', 500))
  }
}

/**
 * 删除记录
 * POST /api/:industry/:resource/delete
 * @param {string} req.params.industry - 行业标识
 * @param {string} req.params.resource - 资源名称
 * @param {string|number} req.body.id - 要删除的记录ID
 * @returns {null}
 */
export async function deleteItem(req, res) {
  try {
    const { industry, resource } = req.params
    const db = getDB()
    const tableName = getTableName(industry, resource)
    const list = db.data[tableName] || []
    const idx = list.findIndex(i => String(i.id) === String(req.body.id))
    if (idx === -1) return res.status(404).json(fail('记录不存在', 404))
    list.splice(idx, 1)
    await db.write()
    res.json(success(null, '删除成功'))
  } catch (err) {
    res.status(500).json(fail('删除失败', 500))
  }
}
