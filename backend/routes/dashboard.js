/**
 * 仪表盘路由
 * 各行业数据统计接口
 */

import { Router } from 'express'
import { getDashboard } from '../controllers/dashboard.js'

const router = Router()

router.get('/:industry/dashboard', getDashboard)

export default router
