/**
 * 认证路由
 * 登录相关接口
 */

import { Router } from 'express'
import { login } from '../controllers/auth.js'

const router = Router()

router.post('/login', login)

export default router
