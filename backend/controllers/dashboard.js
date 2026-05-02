/**
 * 仪表盘控制器
 * 处理各行业的数据统计和图表接口
 */

import { success } from '../utils/response.js'

const dashboards = {
  ecommerce: { totalUsers: 12345, totalOrders: 8976, totalRevenue: 1289340, todayOrders: 234, userGrowth: '+12.5%', orderGrowth: '+8.3%', revenueGrowth: '+15.2%' },
  education: { totalStudents: 8654, totalCourses: 128, totalRevenue: 534200, todayEnroll: 67, studentGrowth: '+18.3%', courseGrowth: '+5.6%' },
  government: { totalItems: 256, totalApplications: 34567, completedRate: '94.5%', todayApplications: 123, avgDuration: '3.2天' },
  medical: { totalDoctors: 86, totalAppointments: 12450, todayAppointments: 78, completedRate: '96.2%', avgWait: '15分钟' },
  logistics: { totalOrders: 45678, inTransit: 2345, delivered: 41234, todayOrders: 567, avgDelivery: '2.3天' },
  hr: { totalEmployees: 256, onLeave: 12, pendingApproval: 5, todayAttendance: '97.5%', openPositions: 8 },
  finance: { totalReimburse: 234, pendingAmount: 56000, approvedAmount: 234500, avgProcessTime: '1.5天', monthlyBudget: 500000 },
  restaurant: { totalDishes: 68, todayOrders: 156, todayRevenue: 12450, avgOrder: 79.8, memberCount: 1234 },
  community: { totalResidents: 856, pendingRepairs: 3, todayNotices: 2, completedRate: '92.3%', avgRepairTime: '1.2天' },
  project: { totalProjects: 12, activeProjects: 4, totalTasks: 89, completedTasks: 56, completionRate: '62.9%' }
}

/**
 * 获取行业仪表盘数据
 * GET /api/:industry/dashboard
 * @param {string} req.params.industry - 行业标识
 * @returns {Object} 仪表盘统计数据
 */
export function getDashboard(req, res) {
  try {
    const { industry } = req.params
    res.json(success(dashboards[industry] || {}))
  } catch (err) {
    res.status(500).json({ code: 500, msg: '获取仪表盘数据失败', data: null })
  }
}
