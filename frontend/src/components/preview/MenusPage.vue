<template>
  <div class="menus-page">
    <div class="page-header">
      <h2 class="page-title">菜单管理</h2>
      <el-button type="primary" @click="openMenuDialog()"
        ><el-icon><Plus /></el-icon>新增菜单</el-button
      >
    </div>
    <div class="tree-container">
      <el-table
        :data="menuTree"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children' }"
        :header-cell-style="{ background: '#fafafa', color: '#333', fontWeight: 600 }"
      >
        <el-table-column prop="name" label="菜单名称" min-width="200" />
        <el-table-column prop="icon" label="图标" width="100">
          <template #default="{ row }"
            ><el-icon v-if="row.icon"><component :is="row.icon" /></el-icon
          ></template>
        </el-table-column>
        <el-table-column prop="path" label="路由路径" width="180" />
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }"
            ><el-tag :type="row.status ? 'success' : 'info'" size="small">{{
              row.status ? '启用' : '禁用'
            }}</el-tag></template
          >
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="openMenuDialog(row)"
              >编辑</el-button
            >
            <el-button type="primary" link size="small" @click="addChildMenu(row)"
              >新增子菜单</el-button
            >
            <el-button type="danger" link size="small" @click="handleDeleteMenu(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-model="dialogVisible"
      :title="editingMenu ? '编辑菜单' : '新增菜单'"
      width="500px"
      destroy-on-close
    >
      <el-form :model="menuForm" label-width="90px">
        <el-form-item label="上级菜单"
          ><el-input v-model="menuForm.parentName" disabled
        /></el-form-item>
        <el-form-item label="菜单名称"
          ><el-input v-model="menuForm.name" placeholder="请输入菜单名称"
        /></el-form-item>
        <el-form-item label="路由路径"
          ><el-input v-model="menuForm.path" placeholder="请输入路由路径"
        /></el-form-item>
        <el-form-item label="图标"
          ><el-input v-model="menuForm.icon" placeholder="请输入图标名称"
        /></el-form-item>
        <el-form-item label="排序"
          ><el-input-number v-model="menuForm.sort" :min="0" :max="999"
        /></el-form-item>
        <el-form-item label="状态"
          ><el-switch v-model="menuForm.status" active-text="启用" inactive-text="禁用"
        /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSaveMenu">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
defineProps({ config: { type: Object, required: true } });

const dialogVisible = ref(false);
const editingMenu = ref(null);
const menuForm = ref({
  name: '',
  path: '',
  icon: '',
  sort: 0,
  status: true,
  parentName: '根目录',
  parentId: null,
});

const menuTree = ref([
  { id: 1, name: '工作台', icon: 'DataAnalysis', path: '/dashboard', sort: 1, status: true },
  {
    id: 2,
    name: '系统管理',
    icon: 'Setting',
    path: '/system',
    sort: 2,
    status: true,
    children: [
      { id: 21, name: '用户管理', icon: 'User', path: '/users', sort: 1, status: true },
      { id: 22, name: '菜单管理', icon: 'Menu', path: '/menus', sort: 2, status: true },
      { id: 23, name: '角色权限', icon: 'Lock', path: '/roles', sort: 3, status: true },
    ],
  },
  {
    id: 3,
    name: '数据管理',
    icon: 'Grid',
    path: '/data',
    sort: 3,
    status: true,
    children: [
      { id: 31, name: '数据表格', icon: 'Grid', path: '/tables', sort: 1, status: true },
      { id: 32, name: '表单页面', icon: 'Document', path: '/forms', sort: 2, status: true },
    ],
  },
  { id: 4, name: '图表展示', icon: 'TrendCharts', path: '/charts', sort: 4, status: true },
  { id: 5, name: '系统设置', icon: 'Tools', path: '/settings', sort: 5, status: true },
]);

const openMenuDialog = row => {
  if (row) {
    editingMenu.value = row;
    menuForm.value = { ...row, parentName: '根目录', parentId: null };
  } else {
    editingMenu.value = null;
    menuForm.value = {
      name: '',
      path: '',
      icon: '',
      sort: 0,
      status: true,
      parentName: '根目录',
      parentId: null,
    };
  }
  dialogVisible.value = true;
};

const addChildMenu = row => {
  editingMenu.value = null;
  menuForm.value = {
    name: '',
    path: '',
    icon: '',
    sort: 0,
    status: true,
    parentName: row.name,
    parentId: row.id,
  };
  dialogVisible.value = true;
};

const handleSaveMenu = () => {
  if (editingMenu.value) {
    Object.assign(editingMenu.value, {
      name: menuForm.value.name,
      path: menuForm.value.path,
      icon: menuForm.value.icon,
      sort: menuForm.value.sort,
      status: menuForm.value.status,
    });
    ElMessage.success('修改成功');
  } else {
    const newMenu = {
      id: Date.now(),
      name: menuForm.value.name,
      path: menuForm.value.path,
      icon: menuForm.value.icon,
      sort: menuForm.value.sort,
      status: menuForm.value.status,
    };
    if (menuForm.value.parentId) {
      const parent = menuTree.value.find(m => m.id === menuForm.value.parentId);
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(newMenu);
      }
    } else {
      menuTree.value.push(newMenu);
    }
    ElMessage.success('新增成功');
  }
  dialogVisible.value = false;
};

const handleDeleteMenu = row => {
  ElMessageBox.confirm('确定删除该菜单吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      const deleteFromList = list => {
        const idx = list.findIndex(m => m.id === row.id);
        if (idx > -1) {
          list.splice(idx, 1);
          return true;
        }
        for (const m of list) {
          if (m.children && deleteFromList(m.children)) return true;
        }
        return false;
      };
      deleteFromList(menuTree.value);
      ElMessage.success('删除成功');
    })
    .catch(() => {});
};
</script>

<style lang="scss" scoped>
.menus-page {
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
.tree-container {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
</style>
