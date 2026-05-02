<template>
  <div class="tree-page">
    <div class="page-header">
      <h2 class="page-title">{{ pageData?.title || '分类管理' }}</h2>
      <el-button type="primary" size="small" @click="openDialog()"
        ><el-icon><Plus /></el-icon>新增分类</el-button
      >
    </div>
    <div class="tree-card">
      <el-table
        :data="treeData"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children' }"
        :header-cell-style="{ background: '#fafafa', color: '#333', fontWeight: 600 }"
      >
        <el-table-column prop="name" label="分类名称" min-width="200" />
        <el-table-column prop="code" label="编码" width="140" />
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }"
            ><el-tag :type="row.status ? 'success' : 'info'" size="small">{{
              row.status ? '启用' : '禁用'
            }}</el-tag></template
          >
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="openDialog(row)">编辑</el-button>
            <el-button type="primary" link size="small" @click="addChild(row)">新增子级</el-button>
            <el-button type="danger" link size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-model="dialogVisible"
      :title="editing ? '编辑分类' : '新增分类'"
      width="480px"
      destroy-on-close
    >
      <el-form :model="formData" label-width="80px">
        <el-form-item label="分类名称"
          ><el-input v-model="formData.name" placeholder="请输入分类名称"
        /></el-form-item>
        <el-form-item label="编码"
          ><el-input v-model="formData.code" placeholder="请输入编码"
        /></el-form-item>
        <el-form-item label="排序"
          ><el-input-number v-model="formData.sort" :min="0" :max="999"
        /></el-form-item>
        <el-form-item label="状态"
          ><el-switch v-model="formData.status" active-text="启用" inactive-text="禁用"
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
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
defineProps({
  config: { type: Object, default: () => ({}) },
  pageKey: { type: String, default: '' },
  pageData: { type: Object, default: () => ({}) },
});

const dialogVisible = ref(false);
const editing = ref(null);
const formData = ref({ name: '', code: '', sort: 0, status: true });

const treeData = ref([
  {
    id: 1,
    name: '电子产品',
    code: 'electronics',
    sort: 1,
    status: true,
    children: [
      { id: 11, name: '手机', code: 'phone', sort: 1, status: true },
      { id: 12, name: '电脑', code: 'computer', sort: 2, status: true },
      { id: 13, name: '配件', code: 'accessory', sort: 3, status: true },
    ],
  },
  {
    id: 2,
    name: '服装鞋帽',
    code: 'clothing',
    sort: 2,
    status: true,
    children: [
      { id: 21, name: '男装', code: 'men', sort: 1, status: true },
      { id: 22, name: '女装', code: 'women', sort: 2, status: true },
    ],
  },
  {
    id: 3,
    name: '食品饮料',
    code: 'food',
    sort: 3,
    status: true,
    children: [
      { id: 31, name: '零食', code: 'snack', sort: 1, status: true },
      { id: 32, name: '饮料', code: 'drink', sort: 2, status: false },
    ],
  },
]);

const openDialog = row => {
  if (row) {
    editing.value = row;
    formData.value = { ...row };
  } else {
    editing.value = null;
    formData.value = { name: '', code: '', sort: 0, status: true };
  }
  dialogVisible.value = true;
};

const addChild = row => {
  editing.value = null;
  formData.value = { name: '', code: '', sort: 0, status: true, parentId: row.id };
  dialogVisible.value = true;
};

const handleSave = () => {
  if (editing.value) {
    Object.assign(editing.value, formData.value);
    ElMessage.success('修改成功');
  } else {
    const newItem = { id: Date.now(), ...formData.value };
    if (formData.value.parentId) {
      const findAndAdd = list => {
        for (const item of list) {
          if (item.id === formData.value.parentId) {
            if (!item.children) item.children = [];
            item.children.push(newItem);
            return true;
          }
          if (item.children && findAndAdd(item.children)) return true;
        }
        return false;
      };
      findAndAdd(treeData.value);
    } else {
      treeData.value.push(newItem);
    }
    ElMessage.success('新增成功');
  }
  dialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
.tree-page {
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
.tree-card {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
</style>
