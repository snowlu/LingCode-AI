import { Router } from 'express'
import { getFlowConfig, advanceFlow } from '../controllers/flow.js'

const router = Router()
router.get('/flow/:industry', getFlowConfig)
router.post('/flow/:industry/advance', advanceFlow)

export default router
