<template>
  <div class="list-page">
    <div class="page-header">
      <h2 class="page-title">{{ pageData?.title || '数据列表' }}</h2>
      <div class="header-actions">
        <el-button type="primary" size="small" @click="openDialog()"
          ><el-icon><Plus /></el-icon>新增</el-button
        >
        <el-button size="small" @click="fetchData"
          ><el-icon><Refresh /></el-icon>刷新</el-button
        >
      </div>
    </div>
    <div class="search-bar">
      <el-input
        v-model="keyword"
        placeholder="搜索关键词..."
        clearable
        style="width: 240px"
        :prefix-icon="Search"
        @input="handleSearch"
      />
      <el-select
        v-model="statusFilter"
        placeholder="状态筛选"
        clearable
        style="width: 140px"
        @change="handleSearch"
      >
        <el-option v-for="s in statusOptions" :key="s" :label="s" :value="s" />
      </el-select>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      border
      size="default"
      :header-cell-style="{
        background: '#fafafa',
        color: '#333',
        fontWeight: 600,
        fontSize: '13px',
      }"
      style="width: 100%"
    >
      <el-table-column type="index" label="#" width="50" />
      <el-table-column
        v-for="col in displayColumns"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :min-width="col.width || 120"
      >
        <template #default="{ row }">
          <span v-if="col.prop === 'status'" :class="getStatusClass(row[col.prop])">{{
            row[col.prop]
          }}</span>
          <span v-else-if="col.prop === 'img'" style="font-size: 24px">{{ row[col.prop] }}</span>
          <span
            v-else-if="col.prop === 'price' || col.prop === 'amount' || col.prop === 'fee'"
            style="color: #f56c6c; font-weight: 600"
          >
            {{
              typeof row[col.prop] === 'number'
                ? '¥' + row[col.prop].toLocaleString()
                : row[col.prop]
            }}
          </span>
          <span v-else>{{ row[col.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link size="small" @click="openDialog(row)">编辑</el-button>
          <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        :page-sizes="[5, 10, 20]"
        layout="total, sizes, prev, pager, next"
        @current-change="
          v => {
            currentPage = v;
            fetchData();
          }
        "
        @size-change="
          v => {
            pageSize = v;
            currentPage = 1;
            fetchData();
          }
        "
      />
    </div>
    <el-dialog
      v-model="dialogVisible"
      :title="editingRow ? '编辑记录' : '新增记录'"
      width="480px"
      destroy-on-close
    >
      <el-form label-width="90px">
        <el-form-item v-for="col in formColumns" :key="col.prop" :label="col.label">
          <el-input
            v-if="col.type !== 'select'"
            v-model="formData[col.prop]"
            :placeholder="'请输入' + col.label"
          />
          <el-select v-else v-model="formData[col.prop]" :placeholder="'请选择' + col.label">
            <el-option v-for="opt in col.options" :key="opt" :label="opt" :value="opt" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitting" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { Plus, Refresh, Search } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getList, addItem, updateItem, deleteItem } from '@/api/index.js';

const props = defineProps({
  config: { type: Object, default: () => ({}) },
  pageKey: { type: String, default: '' },
  pageData: { type: Object, default: () => ({}) },
});

const keyword = ref('');
const statusFilter = ref('');
const currentPage = ref(1);
const pageSize = ref(10);
const dialogVisible = ref(false);
const loading = ref(false);
const submitting = ref(false);
const tableData = ref([]);
const total = ref(0);
const editingRow = ref(null);
const formData = ref({});

const industry = computed(() => props.config?.industryKey || 'ecommerce');

const resourceMap = {
  'product-list': 'productList',
  category: 'category',
  inventory: 'inventory',
  'order-list': 'orderList',
  'after-sale': 'afterSale',
  refund: 'refund',
  'member-list': 'memberList',
  level: 'level',
  coupon: 'coupon',
  promotion: 'promotion',
  'student-list': 'studentList',
  'student-archive': 'studentArchive',
  'course-list': 'courseList',
  'teacher-archive': 'teacherArchive',
  schedule: 'schedule',
  exam: 'exam',
  courseware: 'courseware',
  homework: 'homework',
  'item-list': 'itemList',
  pending: 'pending',
  done: 'done',
  policy: 'policy',
  guide: 'guide',
  staff: 'staff',
  'perm-assign': 'permAssign',
  'patient-archive': 'patientArchive',
  registration: 'registration',
  'visit-record': 'visitRecord',
  prescription: 'prescription',
  'drug-stock': 'drugStock',
  'drug-io': 'drugIo',
  'doctor-schedule': 'doctorSchedule',
  'waybill-list': 'waybillList',
  tracking: 'tracking',
  'vehicle-archive': 'vehicleArchive',
  dispatch: 'dispatch',
  courier: 'courier',
  route: 'route',
  inbound: 'inbound',
  outbound: 'outbound',
  stocktake: 'stocktake',
  'employee-archive': 'employeeArchive',
  'onboard-offboard': 'onboardOffboard',
  'punch-record': 'punchRecord',
  'leave-approval': 'leaveApproval',
  'salary-calc': 'salaryCalc',
  'pay-record': 'payRecord',
  'recruit-need': 'recruitNeed',
  interview: 'interview',
  'train-plan': 'trainPlan',
  'train-course': 'trainCourse',
  income: 'income',
  expense: 'expense',
  reimburse: 'reimburse',
  'invoice-input': 'invoiceInput',
  'budget-plan': 'budgetPlan',
  'receivable-list': 'receivableList',
  'payable-list': 'payableList',
  'sales-record': 'salesRecord',
  cashier: 'cashier',
  'goods-stock': 'goodsStock',
  points: 'points',
  'staff-archive': 'staffArchive',
  'staff-schedule': 'staffSchedule',
  'resident-info': 'residentInfo',
  household: 'household',
  'repair-list': 'repairList',
  'repair-progress': 'repairProgress',
  announcement: 'announcement',
  'complaint-list': 'complaintList',
  'public-facility': 'publicFacility',
  maintenance: 'maintenance',
  'task-board': 'taskBoard',
  'team-member': 'teamMember',
  'role-assign': 'roleAssign',
  'task-list': 'taskList',
  'project-doc': 'projectDoc',
  version: 'version',
  'risk-identify': 'riskIdentify',
  'risk-response': 'riskResponse',
  products: 'productList',
  orders: 'orderList',
  users: 'memberList',
  courses: 'courseList',
  students: 'studentList',
  items: 'itemList',
  applications: 'registration',
  doctors: 'doctorSchedule',
  appointments: 'registration',
  dishes: 'dishes',
  repairs: 'repairList',
  notices: 'announcement',
  projects: 'projects',
  tasks: 'taskBoard',
};

const resource = computed(() => resourceMap[props.pageKey] || props.pageKey || 'products');

const columnMap = {
  productList: [
    { prop: 'name', label: '名称' },
    { prop: 'price', label: '价格', width: 100 },
    { prop: 'category', label: '分类', width: 100 },
    { prop: 'sales', label: '销量', width: 80 },
    { prop: 'stock', label: '库存', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  category: [
    { prop: 'name', label: '分类名' },
    { prop: 'productCount', label: '商品数', width: 80 },
    { prop: 'sort', label: '排序', width: 60 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  inventory: [
    { prop: 'name', label: '商品' },
    { prop: 'warehouse', label: '仓库', width: 100 },
    { prop: 'stock', label: '库存', width: 80 },
    { prop: 'alertValue', label: '预警值', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  orderList: [
    { prop: 'id', label: '订单号', width: 100 },
    { prop: 'product', label: '商品' },
    { prop: 'customer', label: '客户', width: 80 },
    { prop: 'amount', label: '金额', width: 100 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  afterSale: [
    { prop: 'orderNo', label: '订单号', width: 120 },
    { prop: 'type', label: '类型', width: 80 },
    { prop: 'customer', label: '客户', width: 80 },
    { prop: 'reason', label: '原因' },
    { prop: 'amount', label: '金额', width: 100 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  refund: [
    { prop: 'orderNo', label: '订单号', width: 120 },
    { prop: 'amount', label: '金额', width: 100 },
    { prop: 'reason', label: '原因' },
    { prop: 'status', label: '状态', width: 80 },
  ],
  memberList: [
    { prop: 'username', label: '用户名' },
    { prop: 'email', label: '邮箱' },
    { prop: 'role', label: '角色', width: 100 },
    { prop: 'phone', label: '手机', width: 120 },
    { prop: 'points', label: '积分', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  level: [
    { prop: 'name', label: '等级' },
    { prop: 'minPoints', label: '所需积分', width: 100 },
    { prop: 'discount', label: '折扣', width: 80 },
    { prop: 'members', label: '会员数', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  coupon: [
    { prop: 'name', label: '券名' },
    { prop: 'amount', label: '面额', width: 80 },
    { prop: 'condition', label: '使用条件', width: 120 },
    { prop: 'claimed', label: '已领', width: 80 },
    { prop: 'total', label: '总量', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  promotion: [
    { prop: 'name', label: '活动名' },
    { prop: 'rule', label: '规则' },
    { prop: 'startDate', label: '开始', width: 100 },
    { prop: 'endDate', label: '结束', width: 100 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  courseList: [
    { prop: 'name', label: '课程名' },
    { prop: 'price', label: '价格', width: 80 },
    { prop: 'category', label: '分类', width: 80 },
    { prop: 'teacher', label: '讲师', width: 80 },
    { prop: 'students', label: '学员数', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  studentList: [
    { prop: 'name', label: '姓名' },
    { prop: 'email', label: '邮箱' },
    { prop: 'course', label: '课程', width: 120 },
    { prop: 'progress', label: '进度', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  studentArchive: [
    { prop: 'name', label: '姓名' },
    { prop: 'enrollDate', label: '入学日期', width: 100 },
    { prop: 'duration', label: '学制', width: 80 },
    { prop: 'major', label: '专业', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  teacherArchive: [
    { prop: 'name', label: '姓名' },
    { prop: 'title', label: '职称', width: 100 },
    { prop: 'specialty', label: '专长' },
    { prop: 'rating', label: '评分', width: 80 },
    { prop: 'students', label: '学员数', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  schedule: [
    { prop: 'course', label: '课程' },
    { prop: 'teacher', label: '教师', width: 80 },
    { prop: 'classroom', label: '教室', width: 80 },
    { prop: 'weekday', label: '星期', width: 80 },
    { prop: 'period', label: '节次', width: 80 },
  ],
  exam: [
    { prop: 'course', label: '课程' },
    { prop: 'date', label: '日期', width: 100 },
    { prop: 'classroom', label: '考场', width: 80 },
    { prop: 'supervisor', label: '监考', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  courseware: [
    { prop: 'name', label: '课件名' },
    { prop: 'course', label: '课程' },
    { prop: 'format', label: '格式', width: 80 },
    { prop: 'size', label: '大小', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  homework: [
    { prop: 'title', label: '作业' },
    { prop: 'course', label: '课程' },
    { prop: 'deadline', label: '截止日期', width: 100 },
    { prop: 'submitted', label: '已交', width: 60 },
    { prop: 'total', label: '总数', width: 60 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  itemList: [
    { prop: 'name', label: '事项' },
    { prop: 'category', label: '分类', width: 80 },
    { prop: 'department', label: '部门', width: 100 },
    { prop: 'duration', label: '时限', width: 80 },
    { prop: 'applicants', label: '办理量', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  pending: [
    { prop: 'applicant', label: '申请人', width: 80 },
    { prop: 'item', label: '事项' },
    { prop: 'urgency', label: '紧急度', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  done: [
    { prop: 'applicant', label: '申请人', width: 80 },
    { prop: 'item', label: '事项' },
    { prop: 'result', label: '结果', width: 80 },
    { prop: 'satisfaction', label: '满意度', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  policy: [
    { prop: 'title', label: '标题' },
    { prop: 'department', label: '部门', width: 100 },
    { prop: 'type', label: '类型', width: 80 },
    { prop: 'views', label: '浏览量', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  guide: [
    { prop: 'name', label: '事项' },
    { prop: 'process', label: '流程' },
    { prop: 'materials', label: '所需材料' },
    { prop: 'duration', label: '时限', width: 80 },
  ],
  staff: [
    { prop: 'name', label: '姓名' },
    { prop: 'department', label: '部门', width: 100 },
    { prop: 'position', label: '职位', width: 100 },
    { prop: 'approvalLevel', label: '审批权限', width: 100 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  permAssign: [
    { prop: 'role', label: '角色' },
    { prop: 'count', label: '人数', width: 80 },
    { prop: 'approval', label: '审批权限', width: 100 },
    { prop: 'dataScope', label: '数据范围', width: 100 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  patientArchive: [
    { prop: 'name', label: '姓名' },
    { prop: 'gender', label: '性别', width: 60 },
    { prop: 'age', label: '年龄', width: 60 },
    { prop: 'department', label: '科室', width: 80 },
    { prop: 'diagnosis', label: '诊断' },
    { prop: 'status', label: '状态', width: 80 },
  ],
  registration: [
    { prop: 'patient', label: '患者', width: 80 },
    { prop: 'doctor', label: '医生', width: 80 },
    { prop: 'department', label: '科室', width: 80 },
    { prop: 'date', label: '日期', width: 100 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  visitRecord: [
    { prop: 'patient', label: '患者', width: 80 },
    { prop: 'department', label: '科室', width: 80 },
    { prop: 'doctor', label: '医生', width: 80 },
    { prop: 'diagnosis', label: '诊断' },
    { prop: 'status', label: '状态', width: 80 },
  ],
  prescription: [
    { prop: 'patient', label: '患者', width: 80 },
    { prop: 'doctor', label: '医生', width: 80 },
    { prop: 'medicine', label: '药品' },
    { prop: 'amount', label: '金额', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  drugStock: [
    { prop: 'name', label: '药品' },
    { prop: 'category', label: '分类', width: 80 },
    { prop: 'price', label: '价格', width: 80 },
    { prop: 'stock', label: '库存', width: 80 },
    { prop: 'manufacturer', label: '厂家' },
    { prop: 'status', label: '状态', width: 80 },
  ],
  drugIo: [
    { prop: 'type', label: '类型', width: 80 },
    { prop: 'medicine', label: '药品' },
    { prop: 'quantity', label: '数量', width: 80 },
    { prop: 'operator', label: '操作人', width: 80 },
    { prop: 'date', label: '日期', width: 100 },
  ],
  doctorSchedule: [
    { prop: 'name', label: '姓名' },
    { prop: 'department', label: '科室', width: 80 },
    { prop: 'title', label: '职称', width: 100 },
    { prop: 'fee', label: '挂号费', width: 80 },
    { prop: 'rating', label: '评分', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  waybillList: [
    { prop: 'id', label: '运单号', width: 120 },
    { prop: 'sender', label: '发件地', width: 80 },
    { prop: 'receiver', label: '收件地', width: 80 },
    { prop: 'type', label: '类型', width: 80 },
    { prop: 'fee', label: '运费', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  tracking: [
    { prop: 'waybillId', label: '运单号', width: 120 },
    { prop: 'location', label: '当前位置' },
    { prop: 'vehicle', label: '车辆', width: 100 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  vehicleArchive: [
    { prop: 'plateNumber', label: '车牌号', width: 100 },
    { prop: 'type', label: '类型', width: 80 },
    { prop: 'capacity', label: '载重', width: 80 },
    { prop: 'driver', label: '司机', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  dispatch: [
    { prop: 'id', label: '调度单号', width: 120 },
    { prop: 'driver', label: '司机', width: 80 },
    { prop: 'from', label: '出发地', width: 80 },
    { prop: 'to', label: '目的地', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  courier: [
    { prop: 'name', label: '姓名' },
    { prop: 'area', label: '区域', width: 80 },
    { prop: 'todayDeliveries', label: '今日派送', width: 80 },
    { prop: 'monthDeliveries', label: '本月派送', width: 80 },
    { prop: 'rating', label: '评分', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  route: [
    { prop: 'from', label: '出发地' },
    { prop: 'to', label: '目的地' },
    { prop: 'distance', label: '距离', width: 80 },
    { prop: 'estimatedTime', label: '预计时间', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  inbound: [
    { prop: 'id', label: '入库单号', width: 120 },
    { prop: 'product', label: '商品' },
    { prop: 'quantity', label: '数量', width: 80 },
    { prop: 'warehouse', label: '仓库', width: 80 },
    { prop: 'operator', label: '操作人', width: 80 },
  ],
  outbound: [
    { prop: 'id', label: '出库单号', width: 120 },
    { prop: 'product', label: '商品' },
    { prop: 'quantity', label: '数量', width: 80 },
    { prop: 'warehouse', label: '仓库', width: 80 },
    { prop: 'operator', label: '操作人', width: 80 },
  ],
  stocktake: [
    { prop: 'product', label: '商品' },
    { prop: 'warehouse', label: '仓库', width: 80 },
    { prop: 'systemStock', label: '系统库存', width: 80 },
    { prop: 'actualStock', label: '实际库存', width: 80 },
    { prop: 'difference', label: '差异', width: 80 },
  ],
  employeeArchive: [
    { prop: 'name', label: '姓名' },
    { prop: 'department', label: '部门', width: 80 },
    { prop: 'position', label: '职位', width: 100 },
    { prop: 'phone', label: '手机', width: 120 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  onboardOffboard: [
    { prop: 'name', label: '姓名' },
    { prop: 'type', label: '类型', width: 80 },
    { prop: 'department', label: '部门', width: 80 },
    { prop: 'effectiveDate', label: '生效日期', width: 100 },
    { prop: 'remark', label: '备注' },
  ],
  punchRecord: [
    { prop: 'name', label: '姓名' },
    { prop: 'department', label: '部门', width: 80 },
    { prop: 'date', label: '日期', width: 100 },
    { prop: 'checkIn', label: '签到', width: 80 },
    { prop: 'checkOut', label: '签退', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  leaveApproval: [
    { prop: 'applicant', label: '申请人', width: 80 },
    { prop: 'type', label: '类型', width: 80 },
    { prop: 'days', label: '天数', width: 60 },
    { prop: 'reason', label: '原因' },
    { prop: 'status', label: '状态', width: 80 },
  ],
  salaryCalc: [
    { prop: 'name', label: '姓名' },
    { prop: 'department', label: '部门', width: 80 },
    { prop: 'baseSalary', label: '基本工资', width: 100 },
    { prop: 'bonus', label: '奖金', width: 80 },
    { prop: 'actual', label: '实发', width: 100 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  payRecord: [
    { prop: 'batch', label: '批次' },
    { prop: 'month', label: '月份', width: 100 },
    { prop: 'count', label: '人数', width: 80 },
    { prop: 'totalAmount', label: '总额', width: 120 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  recruitNeed: [
    { prop: 'position', label: '岗位' },
    { prop: 'department', label: '部门', width: 80 },
    { prop: 'count', label: '人数', width: 60 },
    { prop: 'urgency', label: '紧急度', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  interview: [
    { prop: 'candidate', label: '候选人' },
    { prop: 'position', label: '岗位', width: 100 },
    { prop: 'interviewer', label: '面试官', width: 80 },
    { prop: 'date', label: '日期', width: 100 },
    { prop: 'result', label: '结果', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  trainPlan: [
    { prop: 'name', label: '培训名称' },
    { prop: 'trainer', label: '讲师', width: 80 },
    { prop: 'date', label: '日期', width: 100 },
    { prop: 'participants', label: '参与人数', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  trainCourse: [
    { prop: 'name', label: '课程名' },
    { prop: 'type', label: '类型', width: 80 },
    { prop: 'hours', label: '课时', width: 60 },
    { prop: 'trainer', label: '讲师', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  income: [
    { prop: 'source', label: '来源' },
    { prop: 'amount', label: '金额', width: 100 },
    { prop: 'category', label: '分类', width: 80 },
    { prop: 'date', label: '日期', width: 100 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  expense: [
    { prop: 'purpose', label: '用途' },
    { prop: 'amount', label: '金额', width: 100 },
    { prop: 'category', label: '分类', width: 80 },
    { prop: 'approval', label: '审批', width: 80 },
    { prop: 'date', label: '日期', width: 100 },
  ],
  reimburse: [
    { prop: 'applicant', label: '申请人', width: 80 },
    { prop: 'type', label: '类型', width: 80 },
    { prop: 'amount', label: '金额', width: 100 },
    { prop: 'description', label: '说明' },
    { prop: 'status', label: '状态', width: 80 },
  ],
  invoiceInput: [
    { prop: 'number', label: '发票号', width: 120 },
    { prop: 'type', label: '类型' },
    { prop: 'amount', label: '金额', width: 100 },
    { prop: 'client', label: '客户' },
    { prop: 'status', label: '状态', width: 80 },
  ],
  budgetPlan: [
    { prop: 'subject', label: '科目' },
    { prop: 'budgetAmount', label: '预算', width: 100 },
    { prop: 'usedAmount', label: '已用', width: 100 },
    { prop: 'usageRate', label: '使用率', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  receivableList: [
    { prop: 'client', label: '客户' },
    { prop: 'amount', label: '金额', width: 100 },
    { prop: 'dueDate', label: '到期日', width: 100 },
    { prop: 'riskLevel', label: '风险', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  payableList: [
    { prop: 'supplier', label: '供应商' },
    { prop: 'amount', label: '金额', width: 100 },
    { prop: 'dueDate', label: '到期日', width: 100 },
    { prop: 'priority', label: '优先级', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  salesRecord: [
    { prop: 'table', label: '桌号', width: 80 },
    { prop: 'dishes', label: '菜品' },
    { prop: 'amount', label: '金额', width: 80 },
    { prop: 'payMethod', label: '支付方式', width: 80 },
    { prop: 'customer', label: '客户', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  cashier: [
    { prop: 'cashier', label: '收银员' },
    { prop: 'shift', label: '班次', width: 80 },
    { prop: 'orderCount', label: '订单数', width: 80 },
    { prop: 'totalAmount', label: '总金额', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  goodsStock: [
    { prop: 'name', label: '食材' },
    { prop: 'category', label: '分类', width: 80 },
    { prop: 'stock', label: '库存', width: 80 },
    { prop: 'unit', label: '单位', width: 60 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  dishes: [
    { prop: 'name', label: '菜品' },
    { prop: 'price', label: '价格', width: 80 },
    { prop: 'category', label: '分类', width: 80 },
    { prop: 'sales', label: '销量', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  points: [
    { prop: 'rule', label: '规则' },
    { prop: 'consumeAmount', label: '消费金额', width: 100 },
    { prop: 'earnPoints', label: '获得积分', width: 100 },
    { prop: 'exchangeRate', label: '兑换比例', width: 100 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  staffArchive: [
    { prop: 'name', label: '姓名' },
    { prop: 'position', label: '职位', width: 80 },
    { prop: 'joinDate', label: '入职日期', width: 100 },
    { prop: 'phone', label: '手机', width: 120 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  staffSchedule: [
    { prop: 'name', label: '姓名' },
    { prop: 'mon', label: '周一', width: 60 },
    { prop: 'tue', label: '周二', width: 60 },
    { prop: 'wed', label: '周三', width: 60 },
    { prop: 'thu', label: '周四', width: 60 },
    { prop: 'fri', label: '周五', width: 60 },
  ],
  residentInfo: [
    { prop: 'name', label: '姓名' },
    { prop: 'building', label: '楼栋', width: 80 },
    { prop: 'room', label: '房号', width: 80 },
    { prop: 'phone', label: '手机', width: 120 },
    { prop: 'type', label: '类型', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  household: [
    { prop: 'owner', label: '户主' },
    { prop: 'familyMembers', label: '家庭人数', width: 80 },
    { prop: 'area', label: '面积', width: 80 },
    { prop: 'propertyFee', label: '物业费', width: 100 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  repairList: [
    { prop: 'resident', label: '住户', width: 80 },
    { prop: 'building', label: '楼栋', width: 80 },
    { prop: 'type', label: '类型', width: 80 },
    { prop: 'description', label: '描述' },
    { prop: 'status', label: '状态', width: 80 },
  ],
  repairProgress: [
    { prop: 'repairId', label: '报修ID', width: 80 },
    { prop: 'description', label: '描述' },
    { prop: 'assignee', label: '处理人', width: 80 },
    { prop: 'progress', label: '进度', width: 80 },
    { prop: 'estimatedEnd', label: '预计完成', width: 100 },
  ],
  announcement: [
    { prop: 'title', label: '标题' },
    { prop: 'type', label: '类型', width: 80 },
    { prop: 'views', label: '浏览量', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  complaintList: [
    { prop: 'resident', label: '住户', width: 80 },
    { prop: 'content', label: '内容' },
    { prop: 'category', label: '类别', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  publicFacility: [
    { prop: 'name', label: '设施' },
    { prop: 'location', label: '位置', width: 100 },
    { prop: 'status', label: '状态', width: 80 },
    { prop: 'nextMaintenance', label: '下次维护', width: 100 },
  ],
  maintenance: [
    { prop: 'facility', label: '设施' },
    { prop: 'content', label: '内容' },
    { prop: 'maintainer', label: '维护方', width: 80 },
    { prop: 'cost', label: '费用', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  taskBoard: [
    { prop: 'name', label: '任务' },
    { prop: 'project', label: '项目', width: 100 },
    { prop: 'assignee', label: '负责人', width: 80 },
    { prop: 'priority', label: '优先级', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  teamMember: [
    { prop: 'name', label: '姓名' },
    { prop: 'role', label: '角色', width: 100 },
    { prop: 'department', label: '部门', width: 80 },
    { prop: 'projects', label: '项目数', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  roleAssign: [
    { prop: 'role', label: '角色' },
    { prop: 'count', label: '人数', width: 80 },
    { prop: 'permission', label: '权限' },
    { prop: 'projectCount', label: '项目数', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  taskList: [
    { prop: 'name', label: '任务' },
    { prop: 'project', label: '项目', width: 100 },
    { prop: 'assignee', label: '负责人', width: 80 },
    { prop: 'deadline', label: '截止日期', width: 100 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  projectDoc: [
    { prop: 'title', label: '文档' },
    { prop: 'project', label: '项目' },
    { prop: 'author', label: '作者', width: 80 },
    { prop: 'version', label: '版本', width: 80 },
    { prop: 'updatedAt', label: '更新日期', width: 100 },
  ],
  version: [
    { prop: 'version', label: '版本号', width: 80 },
    { prop: 'project', label: '项目' },
    { prop: 'committer', label: '提交人', width: 80 },
    { prop: 'changeLog', label: '变更说明' },
    { prop: 'status', label: '状态', width: 80 },
  ],
  riskIdentify: [
    { prop: 'description', label: '风险' },
    { prop: 'project', label: '项目' },
    { prop: 'level', label: '等级', width: 80 },
    { prop: 'possibility', label: '可能性', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  riskResponse: [
    { prop: 'measure', label: '措施' },
    { prop: 'riskId', label: '关联风险', width: 80 },
    { prop: 'assignee', label: '负责人', width: 80 },
    { prop: 'deadline', label: '截止日期', width: 100 },
    { prop: 'status', label: '状态', width: 80 },
  ],
  projects: [
    { prop: 'name', label: '项目' },
    { prop: 'manager', label: '负责人', width: 80 },
    { prop: 'progress', label: '进度', width: 80 },
    { prop: 'priority', label: '优先级', width: 80 },
    { prop: 'status', label: '状态', width: 80 },
  ],
};

const displayColumns = computed(
  () =>
    columnMap[resource.value] || [
      { prop: 'name', label: '名称' },
      { prop: 'status', label: '状态', width: 80 },
    ]
);

const formColumns = computed(() =>
  displayColumns.value
    .filter(c => c.prop !== 'id' && c.prop !== 'createdAt')
    .map(c => {
      if (c.prop === 'status') {
        return {
          ...c,
          type: 'select',
          options: statusOptions.value.length ? statusOptions.value : ['在售', '下架'],
        };
      }
      if (c.prop === 'category') {
        return {
          ...c,
          type: 'select',
          options: [
            '手机数码',
            '电脑办公',
            '家用电器',
            '前端开发',
            '数据分析',
            '招牌菜',
            '家常菜',
            '工商注册',
            '户政办理',
            '社保服务',
          ],
        };
      }
      return { ...c, type: 'input' };
    })
);

const statusOptions = computed(() => {
  if (!tableData.value.length) return [];
  return [...new Set(tableData.value.map(r => r.status).filter(Boolean))];
});

const fetchData = async () => {
  loading.value = true;
  try {
    const params = { page: currentPage.value, pageSize: pageSize.value };
    if (keyword.value.trim()) params.keywords = keyword.value.trim();
    if (statusFilter.value) params.status = statusFilter.value;
    const res = await getList(industry.value, resource.value, params);
    tableData.value = res.data?.list || [];
    total.value = res.data?.total || 0;
  } catch (e) {
    console.error('获取数据失败:', e);
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  currentPage.value = 1;
  fetchData();
};

const openDialog = (row = null) => {
  editingRow.value = row;
  if (row) {
    formData.value = { ...row };
  } else {
    formData.value = {};
    displayColumns.value.forEach(c => {
      if (c.prop !== 'id' && c.prop !== 'createdAt') formData.value[c.prop] = '';
    });
  }
  dialogVisible.value = true;
};

const handleSubmit = async () => {
  submitting.value = true;
  try {
    if (editingRow.value) {
      await updateItem(industry.value, resource.value, formData.value);
      ElMessage.success('更新成功');
    } else {
      await addItem(industry.value, resource.value, formData.value);
      ElMessage.success('新增成功');
    }
    dialogVisible.value = false;
    fetchData();
  } catch (e) {
    console.error('提交失败:', e);
  } finally {
    submitting.value = false;
  }
};

const handleDelete = async row => {
  try {
    await ElMessageBox.confirm('确定删除该记录吗？', '提示', { type: 'warning' });
    await deleteItem(industry.value, resource.value, row.id);
    ElMessage.success('删除成功');
    fetchData();
  } catch (e) {
    /* cancelled */
  }
};

const getStatusClass = val => {
  const v = String(val);
  if (
    [
      '在售',
      '已上线',
      '正常',
      '在职',
      '可用',
      '已到账',
      '已审批',
      '已发布',
      '启用',
      '已签收',
      '已处理',
      '已完成',
      '已发货',
      '已就诊',
      '已通过',
      '已退款',
      '已办结',
      '在读',
      '已取药',
      '运行中',
      '出诊',
      '上架',
      '可办理',
    ].some(s => v.includes(s))
  )
    return 'status-success';
  if (
    [
      '缺货',
      '预警',
      '逾期',
      '欠费',
      '维修中',
      '维护中',
      '忙碌',
      '待审批',
      '待处理',
      '待审核',
      '审核中',
      '处理中',
      '候诊中',
      '待取药',
      '待发货',
      '待开始',
      '待面试',
      '未开始',
      '待支付',
      '待执行',
      '进行中',
      '办理中',
      '运输中',
      '招聘中',
      '监控中',
      '执行中',
      '审批中',
      '待取餐',
    ].some(s => v.includes(s))
  )
    return 'status-warning';
  if (['已取消', '已拒绝', '已离职', '已下线', '暂停', '已结束'].some(s => v.includes(s)))
    return 'status-danger';
  return 'status-info';
};

watch(
  () => props.pageKey,
  () => {
    currentPage.value = 1;
    keyword.value = '';
    statusFilter.value = '';
    fetchData();
  }
);

onMounted(() => {
  fetchData();
});
</script>

<style lang="scss" scoped>
.list-page {
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}
.header-actions {
  display: flex;
  gap: 8px;
}
.search-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.pagination-wrapper {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
.status-success {
  color: #67c23a;
  font-weight: 500;
}
.status-warning {
  color: #e6a23c;
  font-weight: 500;
}
.status-danger {
  color: #f56c6c;
  font-weight: 500;
}
.status-info {
  color: #909399;
}
</style>
