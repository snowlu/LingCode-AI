<template>
  <div class="roles-page">
    <div class="page-header">
      <h2 class="page-title">角色权限</h2>
      <el-button type="primary" @click="openRoleDialog()"
        ><el-icon><Plus /></el-icon>新增角色</el-button
      >
    </div>
    <el-table
      :data="roles"
      stripe
      border
      :header-cell-style="{ background: '#fafafa', color: '#333', fontWeight: 600 }"
    >
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="角色名称" width="160" />
      <el-table-column prop="code" label="角色编码" width="160" />
      <el-table-column prop="description" label="描述" min-width="200" />
      <el-table-column prop="userCount" label="用户数" width="100" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }"
          ><el-tag :type="row.status ? 'success' : 'info'" size="small">{{
            row.status ? '启用' : '禁用'
          }}</el-tag></template
        >
      </el-table-column>
      <el-table-column label="操作" width="220" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link size="small" @click="openPermissionDialog(row)"
            >权限配置</el-button
          >
          <el-button type="primary" link size="small" @click="openRoleDialog(row)">编辑</el-button>
          <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="roleDialogVisible"
      :title="editingRole ? '编辑角色' : '新增角色'"
      width="500px"
      destroy-on-close
    >
      <el-form :model="roleForm" label-width="90px">
        <el-form-item label="角色名称"
          ><el-input v-model="roleForm.name" placeholder="请输入角色名称"
        /></el-form-item>
        <el-form-item label="角色编码"
          ><el-input v-model="roleForm.code" placeholder="请输入角色编码"
        /></el-form-item>
        <el-form-item label="描述"
          ><el-input
            v-model="roleForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入描述"
        /></el-form-item>
        <el-form-item label="状态"
          ><el-switch v-model="roleForm.status" active-text="启用" inactive-text="禁用"
        /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="roleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSaveRole">确定</el-button>
      </template>
    </el-dialog>
    <el-dialog v-model="permDialogVisible" title="权限配置" width="500px" destroy-on-close>
      <div class="perm-info">
        角色：<strong>{{ currentRole?.name }}</strong>
      </div>
      <el-tree
        ref="permTree"
        :data="permissions"
        show-checkbox
        node-key="id"
        :default-checked-keys="currentRole?.permissions || []"
        :props="{ label: 'name', children: 'children' }"
      />
      <template #footer>
        <el-button @click="permDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSavePermissions">保存权限</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
defineProps({ config: { type: Object, required: true } });

const roleDialogVisible = ref(false);
const permDialogVisible = ref(false);
const editingRole = ref(null);
const currentRole = ref(null);
const permTree = ref(null);
const roleForm = ref({ name: '', code: '', description: '', status: true });

const roles = ref([
  {
    id: 1,
    name: '超级管理员',
    code: 'super_admin',
    description: '拥有系统所有权限',
    userCount: 1,
    status: true,
    permissions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 2,
    name: '管理员',
    code: 'admin',
    description: '拥有大部分管理权限',
    userCount: 3,
    status: true,
    permissions: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 3,
    name: '编辑',
    code: 'editor',
    description: '拥有内容编辑权限',
    userCount: 5,
    status: true,
    permissions: [1, 2, 5, 6],
  },
  {
    id: 4,
    name: '普通用户',
    code: 'user',
    description: '基础查看权限',
    userCount: 12,
    status: true,
    permissions: [1, 2],
  },
  {
    id: 5,
    name: '访客',
    code: 'guest',
    description: '仅可查看公开内容',
    userCount: 0,
    status: false,
    permissions: [1],
  },
]);

const permissions = ref([
  {
    id: 1,
    name: '工作台',
    children: [
      { id: 2, name: '数据查看' },
      { id: 3, name: '数据导出' },
    ],
  },
  {
    id: 4,
    name: '系统管理',
    children: [
      { id: 5, name: '用户管理' },
      { id: 6, name: '菜单管理' },
      { id: 7, name: '角色权限' },
    ],
  },
  {
    id: 8,
    name: '数据管理',
    children: [
      { id: 9, name: '数据表格' },
      { id: 10, name: '表单页面' },
    ],
  },
  { id: 11, name: '图表展示' },
  { id: 12, name: '系统设置' },
]);

const openRoleDialog = row => {
  if (row) {
    editingRole.value = row;
    roleForm.value = { ...row };
  } else {
    editingRole.value = null;
    roleForm.value = { name: '', code: '', description: '', status: true };
  }
  roleDialogVisible.value = true;
};

const openPermissionDialog = row => {
  currentRole.value = row;
  permDialogVisible.value = true;
};

const handleSaveRole = () => {
  if (editingRole.value) {
    Object.assign(editingRole.value, roleForm.value);
    ElMessage.success('修改成功');
  } else {
    roles.value.push({ id: Date.now(), ...roleForm.value, userCount: 0, permissions: [] });
    ElMessage.success('新增成功');
  }
  roleDialogVisible.value = false;
};

const handleSavePermissions = () => {
  if (permTree.value && currentRole.value) {
    currentRole.value.permissions = permTree.value.getCheckedKeys();
    ElMessage.success('权限保存成功');
  }
  permDialogVisible.value = false;
};

const handleDelete = row => {
  ElMessageBox.confirm('确定删除该角色吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      const idx = roles.value.findIndex(r => r.id === row.id);
      if (idx > -1) roles.value.splice(idx, 1);
      ElMessage.success('删除成功');
    })
    .catch(() => {});
};
</script>

<style lang="scss" scoped>
.roles-page {
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
.perm-info {
  margin-bottom: 16px;
  padding: 12px;
  background: #f0f9ff;
  border-radius: 6px;
  color: #1890ff;
}
</style>
