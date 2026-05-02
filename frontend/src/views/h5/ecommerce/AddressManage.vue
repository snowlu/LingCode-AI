<template>
  <div class="ecom-address">
    <div v-if="addressList.length" class="address-list">
      <div
        v-for="addr in addressList"
        :key="addr.id"
        :class="['address-item', { default: addr.isDefault }]"
        @click="selectAddress(addr)"
      >
        <div class="address-main">
          <div class="address-name-row">
            <span class="name">{{ addr.name }}</span>
            <span class="phone">{{ addr.phone }}</span>
            <el-tag
              v-if="addr.isDefault"
              size="small"
              :style="{ background: themeColor, borderColor: themeColor, color: '#fff' }"
              >默认</el-tag
            >
          </div>
          <div class="address-detail">
            {{ addr.province }}{{ addr.city }}{{ addr.district }}{{ addr.detail }}
          </div>
        </div>
        <el-icon class="edit-icon" @click.stop="editAddress(addr)"><Edit /></el-icon>
      </div>
    </div>
    <div v-else class="h5-empty">
      <div class="empty-icon">📍</div>
      <div class="empty-text">暂无收货地址</div>
    </div>
    <div class="add-btn-wrap">
      <button class="add-btn" :style="{ background: themeColor }" @click="showAddForm = true">
        新增收货地址
      </button>
    </div>
    <el-dialog v-model="showAddForm" title="新增地址" width="90%" :close-on-click-modal="false">
      <el-form :model="newAddress" label-width="80px" size="small">
        <el-form-item label="收货人"><el-input v-model="newAddress.name" /></el-form-item>
        <el-form-item label="手机号"><el-input v-model="newAddress.phone" /></el-form-item>
        <el-form-item label="省份"><el-input v-model="newAddress.province" /></el-form-item>
        <el-form-item label="城市"><el-input v-model="newAddress.city" /></el-form-item>
        <el-form-item label="区县"><el-input v-model="newAddress.district" /></el-form-item>
        <el-form-item label="详细地址"
          ><el-input v-model="newAddress.detail" type="textarea" :rows="2"
        /></el-form-item>
        <el-form-item label="默认地址"><el-switch v-model="newAddress.isDefault" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddForm = false">取消</el-button>
        <el-button
          type="primary"
          :style="{ background: themeColor, borderColor: themeColor }"
          @click="saveAddress"
          >保存</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { Edit } from '@element-plus/icons-vue';
import { useH5Page } from '../useH5Page';

const { themeColor, fetchList, submitData, setLayout } = useH5Page();
setLayout({ title: '收货地址', showBack: true, showTabbar: false });

const addressList = ref([]);
const showAddForm = ref(false);
const newAddress = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  detail: '',
  isDefault: false,
});

onMounted(async () => {
  addressList.value = await fetchList('memberList', { pageSize: 50 });
});

const selectAddress = _addr => {
  ElMessage.success('已选择地址');
};

const editAddress = _addr => {
  ElMessage.info('编辑地址');
};

const saveAddress = async () => {
  if (!newAddress.value.name || !newAddress.value.phone || !newAddress.value.detail)
    return ElMessage.warning('请填写完整信息');
  await submitData('memberList', newAddress.value);
  addressList.value = await fetchList('memberList', { pageSize: 50 });
  showAddForm.value = false;
  newAddress.value = {
    name: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    detail: '',
    isDefault: false,
  };
  ElMessage.success('保存成功');
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
  cursor: pointer;
  &.default {
    border-left: 3px solid var(--theme);
  }
  .address-main {
    flex: 1;
    .address-name-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
      .name {
        font-size: 14px;
        font-weight: 600;
        color: #333;
      }
      .phone {
        font-size: 13px;
        color: #666;
      }
    }
    .address-detail {
      font-size: 12px;
      color: #999;
      line-height: 1.4;
    }
  }
  .edit-icon {
    color: #c0c4cc;
    cursor: pointer;
  }
}
.add-btn-wrap {
  padding: 16px 12px 80px;
  .add-btn {
    width: 100%;
    height: 40px;
    border-radius: 20px;
    border: none;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
}
</style>
