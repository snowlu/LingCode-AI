/**
 * 模板路由
 * 模板列表、详情、健康检查
 */

import { Router } from 'express'
import { getTemplates, getTemplateDetail, healthCheck } from '../controllers/template.js'

const router = Router()

router.get('/templates', getTemplates)
router.get('/templates/:id', getTemplateDetail)
router.get('/health', healthCheck)

export default router
