/**
 * 路由入口
 * 统一注册所有模块路由
 */

import { Router } from 'express'
import authRoutes from './auth.js'
import crudRoutes from './crud.js'
import dashboardRoutes from './dashboard.js'
import portalRoutes from './portal.js'
import templateRoutes from './template.js'
import downloadRoutes from './download.js'
import flowRoutes from './flow.js'
import aiRoutes from './ai.js'

const router = Router()

router.use(authRoutes)
router.use(templateRoutes)
router.use(portalRoutes)
router.use(dashboardRoutes)
router.use(flowRoutes)
router.use(aiRoutes)
router.use(downloadRoutes)
router.use(crudRoutes)

export default router
