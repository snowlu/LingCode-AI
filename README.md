# AI 后台模板工厂 —— 零代码生成企业级管理系统

## 🏆 项目简介

**AI 后台模板工厂**是一个基于人工智能技术的低代码开发平台，通过集成**豆包大模型（Doubao-Seed-Code）**，能够在 **10 分钟内自动生成完整可运行的 Vue3 企业级后台系统**。

### 核心定位

- **面向对象**：开发者 / 中小企业 / 创业团队
- **核心价值**：解决"后台重复开发"痛点，降低开发门槛 90%+
- **技术驱动**：AI 智能代码生成 + 自然语言修改 + 实时预览

---

## ✨ 核心功能特性

### 🤖 AI 智能生成

- 基于豆包大模型的强大代码生成能力
- 理解业务需求，自动生成高质量 Vue3 代码
- 支持自然语言指令修改（如："把表格改成树形结构"）

### 📦 模板市场

- 提供 **10+ 行业模板**：电商、教育、政务、医疗、物流、餐饮、财务、HR、社区、项目管理
- 每个模板包含完整的后台管理系统和 H5 移动端页面
- 支持预览、一键生成

### ⚡ 在线生成器

- 左侧配置表单，右侧实时预览
- 支持：行业选择、系统命名、主题配色、功能模块定制
- AI 生成过程可视化展示

### 🎯 一键导出

- 生成完整项目（可直接 `npm install` / `npm run dev`）
- 导出 ZIP 包，包含前后端源码、配置、README 文档
- 生产级代码质量，遵循最佳实践

---

## 🛠️ 技术栈

### 前端技术

| 技术         | 版本    | 说明                                      |
| ------------ | ------- | ----------------------------------------- |
| Vue 3        | ^3.4.21 | 渐进式 JavaScript 框架（Composition API） |
| Vite         | ^5.2.8  | 下一代前端构建工具                        |
| Element Plus | ^2.6.3  | 基于 Vue 3 的组件库                       |
| Pinia        | ^2.1.7  | Vue 状态管理库                            |
| Vue Router   | ^4.3.0  | Vue.js 官方路由                           |
| SCSS         | ^1.72.0 | CSS 预处理器                              |
| Axios        | ^1.15.2 | HTTP 客户端                               |

### 后端技术

| 技术    | 版本    | 说明                  |
| ------- | ------- | --------------------- |
| Node.js | 18+     | JavaScript 运行时环境 |
| Express | ^4.18.2 | Web 应用框架          |
| lowdb   | ^7.0.1  | JSON 文件数据库       |
| CORS    | ^2.8.5  | 跨域资源共享          |

### AI 能力

| 技术                          | 说明                     |
| ----------------------------- | ------------------------ |
| 豆包大模型 (Doubao-Seed-Code) | 字节跳动出品的大语言模型 |
| Prompt Engineering            | 自然语言到代码的转换     |

---

## 📁 项目结构

```
ai-template-factory/
├── backend/                     # Node.js 后端服务（Express + lowdb）
│   ├── config/                  # 数据库配置
│   ├── controllers/             # 控制器（CRUD / AI / 下载 / 流程）
│   ├── middlewares/             # 中间件（认证）
│   ├── models/                  # 数据模型
│   ├── routes/                  # 路由定义
│   ├── utils/                   # 工具函数
│   ├── server.js                # Express 服务入口
│   └── package.json
│
├── frontend/
│   ├── admin/                   # 后台管理系统（Vue3 + Element Plus）
│   │   ├── src/
│   │   │   ├── api/             # API 接口封装
│   │   │   ├── components/      # 公共组件（Header、Footer、预览组件等）
│   │   │   ├── config/          # 业务配置（行业、流程图、H5配置）
│   │   │   ├── router/          # 路由配置
│   │   │   ├── stores/          # Pinia 状态管理
│   │   │   ├── styles/          # 全局样式
│   │   │   ├── utils/           # 工具函数（下载、请求封装）
│   │   │   ├── views/           # 页面（首页、模板市场、生成器、预览等）
│   │   │   ├── App.vue          # 根组件
│   │   │   └── main.js          # 入口文件
│   │   ├── index.html
│   │   ├── vite.config.js
│   │   └── package.json
│   │
│   └── h5/                      # 移动端 H5 项目（10 大行业）
│       ├── src/
│       │   ├── api/             # API 接口
│       │   ├── components/      # 公共组件（PhoneShell）
│       │   ├── config/          # H5 行业配置
│       │   ├── router/          # 路由配置
│       │   ├── stores/          # 状态管理
│       │   ├── styles/          # 样式文件
│       │   ├── utils/           # 工具函数
│       │   ├── views/           # 10 大行业 H5 页面
│       │   │   ├── community/   # 社区服务
│       │   │   ├── ecommerce/   # 电商零售
│       │   │   ├── education/   # 教育培训
│       │   │   ├── finance/     # 财务报销
│       │   │   ├── government/  # 政务服务
│       │   │   ├── hr/          # 人事 OA
│       │   │   ├── logistics/   # 物流快递
│       │   │   ├── medical/     # 医疗预约
│       │   │   ├── project/     # 项目管理
│       │   │   └── restaurant/  # 门店餐饮
│       │   ├── App.vue
│       │   └── main.js
│       ├── index.html
│       ├── vite.config.js
│       └── package.json
│
├── .editorconfig                # 编辑器配置
├── .eslintrc.js                 # ESLint 代码检查配置
├── .eslintignore                # ESLint 忽略配置
├── .prettierrc                  # Prettier 格式化配置
├── .gitignore                   # Git 忽略配置
├── LICENSE                      # MIT 开源协议
├── package.json                 # 根目录一键启动脚本
└── README.md
```

---

## 🚀 快速开始

### 环境要求

- **Node.js**: 16.0 或更高版本
- **npm**: 7.0 或更高版本

### 一键启动（推荐）

```bash
# 1. 克隆项目
git clone https://github.com/ai-template-factory/ai-template-factory.git
cd ai-template-factory

# 2. 安装根目录依赖（concurrently）
npm install

# 3. 安装各子项目依赖
cd backend && npm install && cd ..
cd frontend/admin && npm install && cd ../..
cd frontend/h5 && npm install && cd ../..

# 4. 一键启动前后端
npm run dev
```

### 分别启动

```bash
# 终端 1: 启动后端（端口 8080）
npm run dev:backend

# 终端 2: 启动后台管理系统（端口 3000）
npm run dev:admin

# 终端 3: 启动 H5 移动端（端口 3001）
npm run dev:h5
```

### 访问应用

| 应用         | 地址                  |
| ------------ | --------------------- |
| 后台管理系统 | http://localhost:3000 |
| H5 移动端    | http://localhost:3001 |
| 后端 API     | http://localhost:8080 |

---

## 📱 页面功能说明

### 后台管理系统 (Admin)

| 页面       | 路径                     | 功能                                 |
| ---------- | ------------------------ | ------------------------------------ |
| 首页       | `/index`                 | 平台介绍、核心功能展示、快速上手指南 |
| 模板市场   | `/templates`             | 10+ 行业模板展示、分类筛选、搜索     |
| 在线生成器 | `/generator`             | AI 配置生成、实时预览、一键下载      |
| 预览演示   | `/preview/:id`           | 生成后的完整后台交互演示             |
| 用户端     | `/user-portal/:industry` | 行业用户端页面展示                   |
| 文档中心   | `/docs`                  | 使用教程、API 说明、常见问题         |
| 关于我们   | `/about`                 | 项目简介、技术架构、团队介绍         |

### H5 移动端 (H5)

| 行业     | 路径             | 说明                               |
| -------- | ---------------- | ---------------------------------- |
| 电商零售 | `/h5/ecommerce`  | 商品浏览、购物车、订单、支付       |
| 教育培训 | `/h5/education`  | 课程列表、选课、学习进度、成绩查询 |
| 政务服务 | `/h5/government` | 办事指南、在线申请、进度查询       |
| 医疗预约 | `/h5/medical`    | 科室选择、医生预约、挂号缴费       |
| 物流快递 | `/h5/logistics`  | 快递下单、物流追踪、网点查询       |
| 人事 OA  | `/h5/hr`         | 考勤打卡、请假申请、审批流程       |
| 财务报销 | `/h5/finance`    | 报销申请、发票管理、工资查询       |
| 门店餐饮 | `/h5/restaurant` | 菜单浏览、会员中心、积分兑换       |
| 社区服务 | `/h5/community`  | 物业报修、社区活动、通知公告       |
| 项目管理 | `/h5/project`    | 项目列表、任务看板、团队协作       |

---

## 📦 下载包结构

点击"下载代码"后，生成的 ZIP 包结构如下：

```
project-name/
├── backend/                    # Node.js 后端服务
│   ├── server.js               # Express 服务入口
│   ├── db.json                 # lowdb 数据库文件
│   └── package.json
├── frontend/
│   ├── admin/                  # 后台管理系统
│   │   ├── src/
│   │   │   ├── views/
│   │   │   ├── components/
│   │   │   ├── api/
│   │   │   ├── router/
│   │   │   └── config/
│   │   ├── index.html
│   │   ├── vite.config.js
│   │   └── package.json
│   └── h5/                     # H5 移动端
│       ├── src/
│       │   ├── views/h5/
│       │   ├── components/
│       │   ├── api/
│       │   └── router/
│       ├── index.html
│       ├── vite.config.js
│       └── package.json
├── .editorconfig
├── .eslintrc.js
├── .eslintignore
├── .prettierrc
├── .gitignore
├── LICENSE
├── package.json
└── README.md
```

---

## 🔧 开发规范

### 代码检查与格式化

```bash
# 代码检查
npm run lint

# 自动修复
npm run lint:fix

# 代码格式化
npm run format
```

### 工程化配置

- **ESLint**：Vue3 推荐规范 + Prettier 兼容
- **Prettier**：2 空格缩进 / 单引号 / 分号 / 100 字符换行
- **EditorConfig**：统一编辑器缩进、换行符配置
- **Git 忽略**：node_modules、dist、.env、.DS_Store 等

### Git 提交规范

```
feat: 新功能
fix: 修复问题
docs: 文档更新
style: 代码格式调整
refactor: 重构代码
chore: 构建/工具链
```

---

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

---

<div align="center">

**🚀 由 AI 驱动 · 零代码生成企业级管理系统**

**© 2025 AI 后台模板工厂**

</div>
