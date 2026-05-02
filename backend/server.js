/**
 * AI 后台模板工厂 - 后端服务入口
 * 只保留 Express 实例创建、中间件挂载、路由注册和端口监听
 * 所有业务逻辑已迁移到 controllers 目录
 */

import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '.env') })

import express from 'express'
import cors from 'cors'
import { initDB } from './config/db.js'
import { authMiddleware } from './middlewares/auth.js'
import routes from './routes/index.js'

const app = express()
const PORT = 8080

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  console.log(`${new Date().toLocaleString()} - ${req.method} ${req.url}`)
  next()
})

app.use(authMiddleware)

app.use('/api', routes)

app.use((err, req, res, next) => {
  console.error('服务器错误:', err)
  res.status(500).json({ code: 500, msg: '服务器内部错误', data: null })
})

async function start() {
  await initDB()
  app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║                                        ║
║   🚀 AI 后台模板工厂 - 后端服务 v2.0  ║
║                                        ║
║   服务地址: http://localhost:${PORT}     ║
║   API 地址: http://localhost:${PORT}/api  ║
║   数据库: lowdb (db.json)              ║
║                                        ║
╚════════════════════════════════════════╝
`)
  })
}

start()
