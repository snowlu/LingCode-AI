<template>
  <div class="tables-page">
    <div class="page-header">
      <h2 class="page-title">
        {{ config.menus.find(m => m.key === 'tables')?.label || '数据表格' }}
      </h2>
      <div class="header-actions">
        <el-button type="primary" @click="openDialog()"
          ><el-icon><Plus /></el-icon>新增</el-button
        >
        <el-button type="danger" :disabled="!selectedRows.length" @click="handleBatchDelete"
          ><el-icon><Delete /></el-icon>批量删除</el-button
        >
        <el-button @click="handleExport"
          ><el-icon><Download /></el-icon>导出</el-button
        >
      </div>
    </div>
    <div class="search-bar">
      <el-input
        v-model="keyword"
        placeholder="搜索..."
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
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="width: 260px"
        @change="handleSearch"
      />
    </div>
    <el-table
      :data="pagedData"
      stripe
      border
      :header-cell-style="{ background: '#fafafa', color: '#333', fontWeight: 600 }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" />
      <el-table-column prop="id" label="编号" width="140" />
      <el-table-column prop="name" label="名称" min-width="160" />
      <el-table-column prop="customer" label="关联人/部门" width="120" />
      <el-table-column prop="amount" label="金额/级别" width="120" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="statusTypeMap[row.status] || 'info'" size="small">{{ row.status }}</el-tag>
        </template>
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
      :title="editingRow ? '编辑' : '新增'"
      width="500px"
      destroy-on-close
    >
      <el-form :model="formData" label-width="90px">
        <el-form-item label="名称"
          ><el-input v-model="formData.name" placeholder="请输入名称"
        /></el-form-item>
        <el-form-item label="关联人"
          ><el-input v-model="formData.customer" placeholder="请输入关联人"
        /></el-form-item>
        <el-form-item label="金额"
          ><el-input v-model="formData.amount" placeholder="请输入金额"
        /></el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formData.status" style="width: 100%">
            <el-option v-for="s in statusOptions" :key="s" :label="s" :value="s" />
          </el-select>
        </el-form-item>
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
import { Plus, Delete, Download, Search } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
const props = defineProps({ config: { type: Object, required: true } });

const keyword = ref('');
const statusFilter = ref('');
const dateRange = ref(null);
const currentPage = ref(1);
const pageSize = ref(5);
const dialogVisible = ref(false);
const editingRow = ref(null);
const selectedRows = ref([]);
const formData = ref({ name: '', customer: '', amount: '', status: '' });

const statusTypeMap = {
  已发货: 'primary',
  待发货: 'warning',
  已完成: 'success',
  已取消: 'danger',
  已上线: 'success',
  审核中: 'warning',
  已下线: 'info',
  已办结: 'success',
  办理中: 'primary',
  待审核: 'warning',
  已就诊: 'success',
  候诊中: 'warning',
  运输中: 'primary',
  已签收: 'success',
  待取件: 'warning',
  正常: 'success',
  试用期: 'warning',
  已离职: 'danger',
  已审批: 'success',
  已放款: 'success',
  已拒绝: 'danger',
  制作中: 'warning',
  待制作: 'info',
  进行中: 'primary',
  待开始: 'info',
};

const tableData = ref(
  [...(props.config.tableData || [])].map(r => ({
    ...r,
    createTime:
      '2026-01-' +
      (10 + Math.floor(Math.random() * 20)) +
      ' ' +
      (8 + Math.floor(Math.random() * 12)) +
      ':' +
      String(Math.floor(Math.random() * 60)).padStart(2, '0'),
  }))
);

const statusOptions = computed(() => [...new Set(tableData.value.map(r => r.status))]);

const filteredData = computed(() => {
  let result = tableData.value;
  if (keyword.value.trim()) {
    const k = keyword.value.toLowerCase();
    result = result.filter(
      r =>
        r.name.toLowerCase().includes(k) ||
        r.customer.toLowerCase().includes(k) ||
        r.id.toLowerCase().includes(k)
    );
  }
  if (statusFilter.value) {
    result = result.filter(r => r.status === statusFilter.value);
  }
  return result;
});

const pagedData = computed(() => {
  const s = (currentPage.value - 1) * pageSize.value;
  return filteredData.value.slice(s, s + pageSize.value);
});

const handleSearch = () => {
  currentPage.value = 1;
};
const handleSelectionChange = rows => {
  selectedRows.value = rows;
};

const openDialog = row => {
  if (row) {
    editingRow.value = row;
    formData.value = { ...row };
  } else {
    editingRow.value = null;
    formData.value = { name: '', customer: '', amount: '', status: statusOptions.value[0] || '' };
  }
  dialogVisible.value = true;
};

const handleSave = () => {
  if (editingRow.value) {
    Object.assign(editingRow.value, formData.value);
    ElMessage.success('修改成功');
  } else {
    tableData.value.unshift({
      id: 'NEW' + Date.now(),
      ...formData.value,
      createTime: new Date().toLocaleString('zh-CN').slice(0, -3),
    });
    ElMessage.success('新增成功');
  }
  dialogVisible.value = false;
};

const handleDelete = row => {
  ElMessageBox.confirm('确定删除该记录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      const idx = tableData.value.findIndex(r => r.id === row.id);
      if (idx > -1) tableData.value.splice(idx, 1);
      ElMessage.success('删除成功');
    })
    .catch(() => {});
};

const handleBatchDelete = () => {
  ElMessageBox.confirm(`确定删除选中的 ${selectedRows.value.length} 条记录吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      selectedRows.value.forEach(r => {
        const idx = tableData.value.findIndex(t => t.id === r.id);
        if (idx > -1) tableData.value.splice(idx, 1);
      });
      ElMessage.success('批量删除成功');
    })
    .catch(() => {});
};

const handleExport = () => {
  ElMessage.success('数据导出成功');
};
</script>

<style lang="scss" scoped>
.tables-page {
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
</style>
