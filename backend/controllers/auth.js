/**
 * 认证控制器
 * 处理登录、token 生成、用户信息返回
 */

import crypto from 'crypto'
import { success, fail } from '../utils/response.js'

const templateUsers = {
  ecommerce: { userId: '1001', username: '电商管理员', nickname: '超级管理员', role: 'admin', templateType: 'ecommerce' },
  education: { userId: '1002', username: '教育管理员', nickname: '教学主管', role: 'admin', templateType: 'education' },
  government: { userId: '1003', username: '政务管理员', nickname: '系统管理员', role: 'admin', templateType: 'government' },
  medical: { userId: '1004', username: '医疗管理员', nickname: '医院主管', role: 'admin', templateType: 'medical' },
  logistics: { userId: '1005', username: '物流管理员', nickname: '运营主管', role: 'admin', templateType: 'logistics' },
  hr: { userId: '1006', username: '人事管理员', nickname: 'HR主管', role: 'admin', templateType: 'hr' },
  finance: { userId: '1007', username: '财务管理员', nickname: '财务主管', role: 'admin', templateType: 'finance' },
  restaurant: { userId: '1008', username: '门店管理员', nickname: '店长', role: 'admin', templateType: 'restaurant' },
  community: { userId: '1009', username: '社区管理员', nickname: '物业主管', role: 'admin', templateType: 'community' },
  project: { userId: '1010', username: '项目管理员', nickname: '项目总监', role: 'admin', templateType: 'project' }
}

/**
 * 登录接口
 * POST /api/login
 * @param {string} req.body.templateType - 行业模板类型
 * @returns {{ token: string, userInfo: Object }} 登录凭证和用户信息
 */
export function login(req, res) {
  try {
    const { templateType } = req.body
    if (!templateType || !templateUsers[templateType]) {
      return res.json(fail('无效的模板类型', 400))
    }
    const userInfo = templateUsers[templateType]
    const token = `token_${templateType}_${crypto.randomBytes(16).toString('hex')}`
    res.json(success({ token, userInfo }, '登录成功'))
  } catch (err) {
    res.status(500).json(fail('登录失败', 500))
  }
}
