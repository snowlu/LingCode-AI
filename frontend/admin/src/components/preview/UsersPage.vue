<template>
  <div class="users-page">
    <div class="page-header">
      <h2 class="page-title">用户管理</h2>
      <el-button type="primary" @click="openDialog()"
        ><el-icon><Plus /></el-icon>新增用户</el-button
      >
    </div>
    <div class="search-bar">
      <el-input
        v-model="keyword"
        placeholder="搜索用户名、邮箱..."
        clearable
        style="width: 280px"
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
        <el-option label="正常" value="正常" /><el-option label="禁用" value="禁用" />
      </el-select>
    </div>
    <el-table
      :data="pagedData"
      stripe
      border
      style="width: 100%"
      row-key="id"
      :header-cell-style="{ background: '#fafafa', color: '#333', fontWeight: 600 }"
    >
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="username" label="用户名" width="120" />
      <el-table-column prop="email" label="邮箱" min-width="200" />
      <el-table-column prop="role" label="角色" width="120">
        <template #default="{ row }"
          ><el-tag
            :type="row.role === '管理员' ? 'danger' : row.role === '编辑' ? 'warning' : 'info'"
            size="small"
            >{{ row.role }}</el-tag
          ></template
        >
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }"
          ><el-switch
            v-model="row.status"
            active-text="正常"
            inactive-text="禁用"
            :active-value="true"
            :inactive-value="false"
        /></template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="170" />
      <el-table-column label="操作" width="160" fixed="right">
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
        :total="filteredData.length"
        :page-sizes="[5, 10, 20]"
        layout="total, sizes, prev, pager, next"
        @current-change="v => (currentPage = v)"
        @size-change="
          v => {
            pageSize = v;
            currentPage = 1;
          }
        "
      />
    </div>
    <el-dialog
      v-model="dialogVisible"
      :title="editingUser ? '编辑用户' : '新增用户'"
      width="480px"
      destroy-on-close
    >
      <el-form :model="userForm" label-width="80px">
        <el-form-item label="用户名"
          ><el-input v-model="userForm.username" placeholder="请输入用户名"
        /></el-form-item>
        <el-form-item label="邮箱"
          ><el-input v-model="userForm.email" placeholder="请输入邮箱"
        /></el-form-item>
        <el-form-item label="角色">
          <el-select v-model="userForm.role" style="width: 100%">
            <el-option label="管理员" value="管理员" /><el-option
              label="编辑"
              value="编辑"
            /><el-option label="普通用户" value="普通用户" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态"
          ><el-switch v-model="userForm.status" active-text="正常" inactive-text="禁用"
        /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Plus, Search } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
defineProps({ config: { type: Object, required: true } });

const keyword = ref('');
const statusFilter = ref('');
const currentPage = ref(1);
const pageSize = ref(5);
const dialogVisible = ref(false);
const editingUser = ref(null);
const userForm = ref({ username: '', email: '', role: '普通用户', status: true });

const allUsers = ref([
  {
    id: 1001,
    username: '张三',
    email: 'zhangsan@example.com',
    role: '管理员',
    status: true,
    createTime: '2026-01-15 14:30',
  },
  {
    id: 1002,
    username: '李四',
    email: 'lisi@example.com',
    role: '编辑',
    status: true,
    createTime: '2026-01-16 09:20',
  },
  {
    id: 1003,
    username: '王五',
    email: 'wangwu@example.com',
    role: '普通用户',
    status: true,
    createTime: '2026-01-17 16:45',
  },
  {
    id: 1004,
    username: '赵六',
    email: 'zhaoliu@example.com',
    role: '普通用户',
    status: false,
    createTime: '2026-01-18 11:15',
  },
  {
    id: 1005,
    username: '钱七',
    email: 'qianqi@example.com',
    role: '编辑',
    status: true,
    createTime: '2026-01-19 08:30',
  },
  {
    id: 1006,
    username: '孙八',
    email: 'sunba@example.com',
    role: '普通用户',
    status: true,
    createTime: '2026-01-20 13:40',
  },
  {
    id: 1007,
    username: '周九',
    email: 'zhoujiu@example.com',
    role: '管理员',
    status: true,
    createTime: '2026-01-21 10:25',
  },
  {
    id: 1008,
    username: '吴十',
    email: 'wushi@example.com',
    role: '编辑',
    status: false,
    createTime: '2026-01-22 15:55',
  },
]);

const filteredData = computed(() => {
  let result = allUsers.value;
  if (keyword.value.trim()) {
    const k = keyword.value.toLowerCase();
    result = result.filter(
      u => u.username.toLowerCase().includes(k) || u.email.toLowerCase().includes(k)
    );
  }
  if (statusFilter.value) {
    result = result.filter(u => (statusFilter.value === '正常' ? u.status : !u.status));
  }
  return result;
});

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredData.value.slice(start, start + pageSize.value);
});

const handleSearch = () => {
  currentPage.value = 1;
};

const openDialog = row => {
  if (row) {
    editingUser.value = row;
    userForm.value = { ...row };
  } else {
    editingUser.value = null;
    userForm.value = { username: '', email: '', role: '普通用户', status: true };
  }
  dialogVisible.value = true;
};

const handleSave = () => {
  if (editingUser.value) {
    Object.assign(editingUser.value, userForm.value);
    ElMessage.success('修改成功');
  } else {
    allUsers.value.unshift({
      id: Date.now(),
      ...userForm.value,
      createTime: new Date().toLocaleString('zh-CN').slice(0, -3),
    });
    ElMessage.success('新增成功');
  }
  dialogVisible.value = false;
};

const handleDelete = row => {
  ElMessageBox.confirm('确定删除该用户吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      const idx = allUsers.value.findIndex(u => u.id === row.id);
      if (idx > -1) allUsers.value.splice(idx, 1);
      ElMessage.success('删除成功');
    })
    .catch(() => {});
};
</script>

<style lang="scss" scoped>
.users-page {
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
  font-size: 20px;
  font-weight: 600;
  color: #333;
}
.search-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}
.pagination-wrapper {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>
