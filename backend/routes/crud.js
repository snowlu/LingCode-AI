/**
 * 通用 CRUD 路由
 * 所有行业的增删改查接口
 */

import { Router } from 'express'
import { getList, getDetail, addItem, updateItem, deleteItem } from '../controllers/crud.js'

const router = Router()

router.get('/:industry/:resource/list', getList)
router.get('/:industry/:resource/detail/:id', getDetail)
router.post('/:industry/:resource/add', addItem)
router.post('/:industry/:resource/update', updateItem)
router.post('/:industry/:resource/delete', deleteItem)

export default router
