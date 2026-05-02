/**
 * 用户端门户路由
 * To C 用户端的数据查询和订单提交
 */

import { Router } from 'express'
import { getPortalHome, submitPortalOrder } from '../controllers/portal.js'

const router = Router()

router.get('/portal/:industry/home', getPortalHome)
router.post('/portal/:industry/submit', submitPortalOrder)

export default router
