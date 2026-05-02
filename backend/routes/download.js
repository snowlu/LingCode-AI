import { Router } from 'express'
import { getDownloadFiles } from '../controllers/download.js'

const router = Router()
router.get('/download/:templateType', getDownloadFiles)

export default router
