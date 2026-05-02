import { createRouter, createWebHistory } from 'vue-router';

const h5 = (path, loader) => ({ path, component: loader });

const routes = [
  { path: '/', redirect: '/index' },
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/Index.vue'),
    meta: { title: '首页' },
  },
  {
    path: '/templates',
    name: 'Templates',
    component: () => import('@/views/Templates.vue'),
    meta: { title: '模板市场' },
  },
  {
    path: '/generator',
    name: 'Generator',
    component: () => import('@/views/Generator.vue'),
    meta: { title: '在线生成器' },
  },
  {
    path: '/preview/:id',
    name: 'Preview',
    component: () => import('@/views/Preview.vue'),
    meta: { title: '预览演示' },
  },
  {
    path: '/user-portal/:industry',
    name: 'UserPortal',
    component: () => import('@/views/UserPortal.vue'),
    meta: { title: '用户端' },
  },
  {
    path: '/docs',
    name: 'Docs',
    component: () => import('@/views/Docs.vue'),
    meta: { title: '文档中心' },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: { title: '关于我们' },
  },

  // ===== H5 电商 =====
  {
    path: '/h5/ecommerce',
    component: () => import('@/views/h5/H5Layout.vue'),
    meta: { title: 'H5预览' },
    children: [
      { path: '', redirect: '/h5/ecommerce/home' },
      h5('home', () => import('@/views/h5/ecommerce/Home.vue')),
      h5('category', () => import('@/views/h5/ecommerce/Category.vue')),
      h5('product-list', () => import('@/views/h5/ecommerce/ProductList.vue')),
      h5('product-detail/:id', () => import('@/views/h5/ecommerce/ProductDetail.vue')),
      h5('cart', () => import('@/views/h5/ecommerce/Cart.vue')),
      h5('confirm-order/:id', () => import('@/views/h5/ecommerce/ConfirmOrder.vue')),
      h5('pay/:id', () => import('@/views/h5/ecommerce/Pay.vue')),
      h5('pay-success/:id', () => import('@/views/h5/ecommerce/PaySuccess.vue')),
      h5('order-list', () => import('@/views/h5/ecommerce/OrderList.vue')),
      h5('order-detail/:id', () => import('@/views/h5/ecommerce/OrderDetail.vue')),
      h5('address', () => import('@/views/h5/ecommerce/AddressManage.vue')),
      h5('favorites', () => import('@/views/h5/ecommerce/MyFavorites.vue')),
      h5('personal', () => import('@/views/h5/ecommerce/PersonalCenter.vue')),
    ],
  },

  // ===== H5 教育 =====
  {
    path: '/h5/education',
    component: () => import('@/views/h5/H5Layout.vue'),
    meta: { title: 'H5预览' },
    children: [
      { path: '', redirect: '/h5/education/home' },
      h5('home', () => import('@/views/h5/education/Home.vue')),
      h5('course', () => import('@/views/h5/education/CourseList.vue')),
      h5('course-category', () => import('@/views/h5/education/CourseCategory.vue')),
      h5('course-list', () => import('@/views/h5/education/CourseList.vue')),
      h5('course-detail/:id', () => import('@/views/h5/education/CourseDetail.vue')),
      h5('course-enroll/:id', () => import('@/views/h5/education/Enroll.vue')),
      h5('enroll-success/:id', () => import('@/views/h5/education/EnrollSuccess.vue')),
      h5('teacher-intro/:id', () => import('@/views/h5/education/TeacherIntro.vue')),
      h5('study', () => import('@/views/h5/education/MyCourses.vue')),
      h5('my-courses', () => import('@/views/h5/education/MyCourses.vue')),
      h5('study-progress/:id', () => import('@/views/h5/education/StudyProgress.vue')),
      h5('attendance', () => import('@/views/h5/education/Attendance.vue')),
      h5('grade-query', () => import('@/views/h5/education/GradeQuery.vue')),
      h5('personal', () => import('@/views/h5/education/PersonalCenter.vue')),
    ],
  },

  // ===== H5 政务服务 =====
  {
    path: '/h5/government',
    component: () => import('@/views/h5/H5Layout.vue'),
    meta: { title: 'H5预览' },
    children: [
      { path: '', redirect: '/h5/government/home' },
      h5('home', () => import('@/views/h5/government/Home.vue')),
      h5('service', () => import('@/views/h5/government/ServiceCategory.vue')),
      h5('service-category', () => import('@/views/h5/government/ServiceCategory.vue')),
      h5('item-list', () => import('@/views/h5/government/ItemList.vue')),
      h5('item-detail/:id', () => import('@/views/h5/government/ItemDetail.vue')),
      h5('apply-form/:id', () => import('@/views/h5/government/ApplyForm.vue')),
      h5('apply-success/:id', () => import('@/views/h5/government/ApplySuccess.vue')),
      h5('my-applications', () => import('@/views/h5/government/MyApplications.vue')),
      h5('application-detail/:id', () => import('@/views/h5/government/ApplicationDetail.vue')),
      h5('notice', () => import('@/views/h5/government/NoticeList.vue')),
      h5('notice-list', () => import('@/views/h5/government/NoticeList.vue')),
      h5('notice-detail/:id', () => import('@/views/h5/government/NoticeDetail.vue')),
      h5('personal', () => import('@/views/h5/government/PersonalCenter.vue')),
    ],
  },

  // ===== H5 医疗预约 =====
  {
    path: '/h5/medical',
    component: () => import('@/views/h5/H5Layout.vue'),
    meta: { title: 'H5预览' },
    children: [
      { path: '', redirect: '/h5/medical/home' },
      h5('home', () => import('@/views/h5/medical/Home.vue')),
      h5('register', () => import('@/views/h5/medical/DepartmentList.vue')),
      h5('department-list', () => import('@/views/h5/medical/DepartmentList.vue')),
      h5('doctor-list', () => import('@/views/h5/medical/DoctorList.vue')),
      h5('doctor-detail/:id', () => import('@/views/h5/medical/DoctorDetail.vue')),
      h5('register-time/:id', () => import('@/views/h5/medical/RegisterTime.vue')),
      h5('register-submit/:id', () => import('@/views/h5/medical/RegisterSubmit.vue')),
      h5('register-success/:id', () => import('@/views/h5/medical/RegisterSuccess.vue')),
      h5('record', () => import('@/views/h5/medical/MyAppointments.vue')),
      h5('my-appointments', () => import('@/views/h5/medical/MyAppointments.vue')),
      h5('appointment-detail/:id', () => import('@/views/h5/medical/AppointmentDetail.vue')),
      h5('visit-record', () => import('@/views/h5/medical/VisitRecord.vue')),
      h5('prescription-detail/:id', () => import('@/views/h5/medical/PrescriptionDetail.vue')),
      h5('personal', () => import('@/views/h5/medical/PersonalCenter.vue')),
    ],
  },

  // ===== H5 物流快递 =====
  {
    path: '/h5/logistics',
    component: () => import('@/views/h5/H5Layout.vue'),
    meta: { title: 'H5预览' },
    children: [
      { path: '', redirect: '/h5/logistics/home' },
      h5('home', () => import('@/views/h5/logistics/Home.vue')),
      h5('track', () => import('@/views/h5/logistics/Track.vue')),
      h5('track-detail/:id', () => import('@/views/h5/logistics/TrackDetail.vue')),
      h5('send', () => import('@/views/h5/logistics/Send.vue')),
      h5('send-success/:id', () => import('@/views/h5/logistics/SendSuccess.vue')),
      h5('network-list', () => import('@/views/h5/logistics/NetworkList.vue')),
      h5('network-detail/:id', () => import('@/views/h5/logistics/NetworkDetail.vue')),
      h5('personal', () => import('@/views/h5/logistics/MyRecords.vue')),
      h5('my-records', () => import('@/views/h5/logistics/MyRecords.vue')),
    ],
  },

  // ===== H5 人事OA =====
  {
    path: '/h5/hr',
    component: () => import('@/views/h5/H5Layout.vue'),
    meta: { title: 'H5预览' },
    children: [
      { path: '', redirect: '/h5/hr/home' },
      h5('home', () => import('@/views/h5/hr/Home.vue')),
      h5('attendance', () => import('@/views/h5/hr/Attendance.vue')),
      h5('leave-apply', () => import('@/views/h5/hr/LeaveApply.vue')),
      h5('leave-detail/:id', () => import('@/views/h5/hr/LeaveDetail.vue')),
      h5('approval', () => import('@/views/h5/hr/Approval.vue')),
      h5('contacts', () => import('@/views/h5/hr/Contacts.vue')),
      h5('personal', () => import('@/views/h5/hr/PersonalCenter.vue')),
    ],
  },

  // ===== H5 财务报销 =====
  {
    path: '/h5/finance',
    component: () => import('@/views/h5/H5Layout.vue'),
    meta: { title: 'H5预览' },
    children: [
      { path: '', redirect: '/h5/finance/home' },
      h5('home', () => import('@/views/h5/finance/Home.vue')),
      h5('reimburse', () => import('@/views/h5/finance/ReimburseApply.vue')),
      h5('reimburse-apply', () => import('@/views/h5/finance/ReimburseApply.vue')),
      h5('invoice', () => import('@/views/h5/finance/Invoice.vue')),
      h5('reimburse-detail/:id', () => import('@/views/h5/finance/ReimburseDetail.vue')),
      h5('my-reimburse', () => import('@/views/h5/finance/MyReimburse.vue')),
      h5('salary-list', () => import('@/views/h5/finance/SalaryList.vue')),
      h5('salary-detail/:id', () => import('@/views/h5/finance/SalaryDetail.vue')),
      h5('personal', () => import('@/views/h5/finance/MyReimburse.vue')),
    ],
  },

  // ===== H5 线下门店 =====
  {
    path: '/h5/restaurant',
    component: () => import('@/views/h5/H5Layout.vue'),
    meta: { title: 'H5预览' },
    children: [
      { path: '', redirect: '/h5/restaurant/home' },
      h5('home', () => import('@/views/h5/restaurant/Home.vue')),
      h5('menu', () => import('@/views/h5/restaurant/ProductCategory.vue')),
      h5('product-category', () => import('@/views/h5/restaurant/ProductCategory.vue')),
      h5('product-list', () => import('@/views/h5/restaurant/ProductList.vue')),
      h5('product-detail/:id', () => import('@/views/h5/restaurant/ProductDetail.vue')),
      h5('member', () => import('@/views/h5/restaurant/MemberCenter.vue')),
      h5('member-center', () => import('@/views/h5/restaurant/MemberCenter.vue')),
      h5('points-detail', () => import('@/views/h5/restaurant/PointsDetail.vue')),
      h5('coupon-list', () => import('@/views/h5/restaurant/CouponList.vue')),
      h5('consume-record', () => import('@/views/h5/restaurant/ConsumeRecord.vue')),
      h5('personal', () => import('@/views/h5/restaurant/MemberCenter.vue')),
    ],
  },

  // ===== H5 社区服务 =====
  {
    path: '/h5/community',
    component: () => import('@/views/h5/H5Layout.vue'),
    meta: { title: 'H5预览' },
    children: [
      { path: '', redirect: '/h5/community/home' },
      h5('home', () => import('@/views/h5/community/Home.vue')),
      h5('repair', () => import('@/views/h5/community/RepairApply.vue')),
      h5('repair-apply', () => import('@/views/h5/community/RepairApply.vue')),
      h5('repair-progress/:id', () => import('@/views/h5/community/RepairProgress.vue')),
      h5('activity', () => import('@/views/h5/community/ActivityList.vue')),
      h5('activity-list', () => import('@/views/h5/community/ActivityList.vue')),
      h5('activity-enroll/:id', () => import('@/views/h5/community/ActivityEnroll.vue')),
      h5('notice-list', () => import('@/views/h5/community/NoticeList.vue')),
      h5('notice-detail/:id', () => import('@/views/h5/community/NoticeDetail.vue')),
      h5('my-repairs', () => import('@/views/h5/community/MyRepairs.vue')),
      h5('personal', () => import('@/views/h5/community/MyRepairs.vue')),
    ],
  },

  // ===== H5 项目管理 =====
  {
    path: '/h5/project',
    component: () => import('@/views/h5/H5Layout.vue'),
    meta: { title: 'H5预览' },
    children: [
      { path: '', redirect: '/h5/project/home' },
      h5('home', () => import('@/views/h5/project/Home.vue')),
      h5('project', () => import('@/views/h5/project/ProjectList.vue')),
      h5('project-list', () => import('@/views/h5/project/ProjectList.vue')),
      h5('project-detail/:id', () => import('@/views/h5/project/ProjectDetail.vue')),
      h5('task', () => import('@/views/h5/project/TaskBoard.vue')),
      h5('task-board', () => import('@/views/h5/project/TaskBoard.vue')),
      h5('todo-tasks', () => import('@/views/h5/project/TodoTasks.vue')),
      h5('task-detail/:id', () => import('@/views/h5/project/TaskDetail.vue')),
      h5('member-list', () => import('@/views/h5/project/MemberList.vue')),
      h5('personal', () => import('@/views/h5/project/PersonalCenter.vue')),
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'H5预览'} - AI 全栈低代码生成平台`;
  next();
});

export default router;
