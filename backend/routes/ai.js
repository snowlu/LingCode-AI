import { Router } from 'express'
import { generateAiConfig, applyAiModule, getAiModuleTemplates } from '../controllers/ai.js'
import { downloadAiCode } from '../controllers/download.js'

const router = Router()
router.post('/ai/generate', generateAiConfig)
router.post('/ai/download', downloadAiCode)
router.post('/ai/apply', applyAiModule)
router.get('/ai/templates/:industry', getAiModuleTemplates)

export default router
