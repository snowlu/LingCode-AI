<template>
  <div class="ecom-address">
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <div v-else-if="addressList.length" class="address-list">
      <div
        v-for="addr in addressList"
        :key="addr.id"
        :class="['address-item', { default: addr.isDefault }]"
      >
        <div class="address-main" @click="goBack">
          <div class="address-name-row">
            <span class="name">{{ addr.name }}</span>
            <span class="phone">{{ addr.phone }}</span>
            <span v-if="addr.isDefault" class="default-tag" :style="{ background: themeColor }">默认</span>
          </div>
          <div class="address-detail">
            {{ addr.province }}{{ addr.city }}{{ addr.district }}{{ addr.detail }}
          </div>
        </div>
        <div class="address-actions">
          <span class="action-icon" @click.stop="editAddress(addr)">✏️</span>
          <span class="action-icon" @click.stop="deleteAddress(addr)">🗑️</span>
        </div>
      </div>
    </div>
    <div v-else class="h5-empty">
      <div class="empty-icon">📍</div>
      <div class="empty-text">暂无收货地址</div>
    </div>
    <div class="add-btn-wrap">
      <button class="add-btn" :style="{ background: themeColor }" @click="openAddForm">
        新增收货地址
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useH5Page } from '../useH5Page';
import { openH5Sheet, closeH5Sheet } from '../h5LayoutState';

const { themeColor, fetchList, submitData, updateData, removeData, setLayout, goBack } = useH5Page();
setLayout({ title: '收货地址', showBack: true, showTabbar: false });

const loading = ref(true);
const addressList = ref([]);

const addressFields = [
  { key: 'name', label: '收货人', type: 'text', placeholder: '请输入收货人' },
  { key: 'phone', label: '手机号', type: 'text', placeholder: '请输入手机号' },
  { key: 'province', label: '省份', type: 'text', placeholder: '如：广东省' },
  { key: 'city', label: '城市', type: 'text', placeholder: '如：深圳市' },
  { key: 'district', label: '区县', type: 'text', placeholder: '如：南山区' },
  { key: 'detail', label: '详细地址', type: 'textarea', placeholder: '如：科技园路100号' },
  { key: 'isDefault', label: '默认地址', type: 'switch' },
];

const emptyForm = () => ({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  detail: '',
  isDefault: false,
});

const loadAddresses = async () => {
  loading.value = true;
  addressList.value = await fetchList('address', { pageSize: 50 });
  loading.value = false;
};

onMounted(loadAddresses);

const openAddForm = () => {
  openH5Sheet('新增地址', addressFields, emptyForm(), async form => {
    if (!form.name || !form.phone || !form.detail)
      return ElMessage.warning('请填写收货人、手机号和详细地址');
    if (form.isDefault) {
      addressList.value.forEach(async a => {
        if (a.isDefault) {
          await updateData('address', { id: a.id, isDefault: false });
          a.isDefault = false;
        }
      });
    }
    await submitData('address', form);
    ElMessage.success('新增成功');
    closeH5Sheet();
    await loadAddresses();
  });
};

const editAddress = addr => {
  openH5Sheet('编辑地址', addressFields, { ...addr }, async form => {
    if (!form.name || !form.phone || !form.detail)
      return ElMessage.warning('请填写收货人、手机号和详细地址');
    if (form.isDefault) {
      addressList.value.forEach(async a => {
        if (a.isDefault && a.id !== addr.id) {
          await updateData('address', { id: a.id, isDefault: false });
          a.isDefault = false;
        }
      });
    }
    await updateData('address', { id: addr.id, ...form });
    ElMessage.success('修改成功');
    closeH5Sheet();
    await loadAddresses();
  });
};

const deleteAddress = async addr => {
  try {
    await ElMessageBox.confirm('确定要删除该地址吗？', '提示', {
      type: 'warning',
      confirmButtonText: '删除',
      cancelButtonText: '取消',
    });
  } catch {
    return;
  }
  await removeData('address', addr.id);
  ElMessage.success('已删除');
  await loadAddresses();
};
</script>

<style lang="scss" scoped>
.address-list {
  padding: 8px 12px;
}
.address-item {
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  &.default {
    border-left: 3px solid var(--theme);
  }
  .address-main {
    flex: 1;
    cursor: pointer;
    .address-name-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
      .name { font-size: 14px; font-weight: 600; color: #333; }
      .phone { font-size: 13px; color: #666; }
      .default-tag {
        font-size: 10px; color: #fff; padding: 1px 6px; border-radius: 10px;
      }
    }
    .address-detail { font-size: 12px; color: #999; line-height: 1.4; }
  }
  .address-actions {
    display: flex; flex-direction: column; gap: 6px;
    .action-icon { font-size: 14px; cursor: pointer; }
  }
}
.add-btn-wrap {
  padding: 16px 12px 80px;
  .add-btn {
    width: 100%; height: 40px; border-radius: 20px;
    border: none; color: #fff; font-size: 14px; font-weight: 600; cursor: pointer;
  }
}
</style>
