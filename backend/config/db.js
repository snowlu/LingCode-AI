/**
 * lowdb 数据库初始化配置
 * 提供 db 实例的创建和获取方法
 */

import { JSONFilePreset } from 'lowdb/node'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { generateAllSeedData } from '../models/seed.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let db = null

/**
 * 初始化数据库
 * 如果 db.json 不存在或表为空，自动填充 Mock 数据
 */
export async function initDB() {
  const seedData = generateAllSeedData()
  db = await JSONFilePreset(join(__dirname, '..', 'db.json'), seedData)

  for (const [key, value] of Object.entries(seedData)) {
    if (!db.data[key] || db.data[key].length === 0) {
      db.data[key] = value
    }
  }

  await db.write()
  console.log('✅ 数据库初始化完成，已加载 Mock 数据')
}

/**
 * 获取 db 实例
 * @returns {Object} lowdb 实例
 */
export function getDB() {
  return db
}

/**
 * 获取行业资源表名
 * @param {string} industry - 行业标识
 * @param {string} resource - 资源名称
 * @returns {string} 表名，如 ecommerce_products
 */
export function getTableName(industry, resource) {
  return `${industry}_${resource}`
}
