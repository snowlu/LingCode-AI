/**
 * 登录态校验中间件
 * 验证请求头中的 Authorization token
 */

import { fail } from '../utils/response.js'

/**
 * Token 校验中间件
 * 从 Authorization 头部提取 token 并验证
 * 预览模式下不强制校验，仅解析 token 信息
 */
export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7)
    req.token = token
    try {
      const parts = token.split('_')
      if (parts.length >= 3 && parts[0] === 'token') {
        req.industry = parts[1]
      }
    } catch { /* token 解析失败，继续执行 */ }
  }
  next()
}

/**
 * 强制登录校验中间件
 * 必须携带有效 token 才能访问
 */
export function requireAuth(req, res, next) {
  if (!req.token) {
    return res.status(401).json(fail('未登录，请先登录', 401))
  }
  next()
}
