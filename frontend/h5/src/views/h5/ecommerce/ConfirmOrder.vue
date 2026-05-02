<template>
  <div class="ecom-confirm-order">
    <div class="h5-form">
      <div class="form-group">
        <div class="form-label">收货地址</div>
        <div v-if="addressList.length" class="address-list-mini">
          <div
            v-for="addr in addressList"
            :key="addr.id"
            :class="['address-mini-item', { selected: selectedAddressId === addr.id }]"
            @click="selectedAddressId = addr.id"
          >
            <div class="address-mini-name">{{ addr.name }} {{ addr.phone }}</div>
            <div class="address-mini-detail">{{ addr.province }}{{ addr.city }}{{ addr.district }}{{ addr.detail }}</div>
          </div>
        </div>
        <div v-else class="address-card" @click="navigateTo('address')">
          <div class="address-empty">请先添加收货地址 ›</div>
        </div>
      </div>
      <div class="form-group">
        <div class="form-label">商品信息</div>
        <div class="order-product">
          <span class="product-icon">📦</span>
          <div class="product-info">
            <div class="product-name">{{ productName }}</div>
            <div class="product-price" :style="{ color: themeColor }">¥{{ productPrice }}</div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="form-label">备注</div>
        <el-input v-model="form.remark" type="textarea" placeholder="选填" :rows="2" size="small" />
      </div>
      <div class="order-summary">
        <div class="summary-row">
          <span>商品金额</span><span>¥{{ productPrice }}</span>
        </div>
        <div class="summary-row"><span>运费</span><span>¥0.00</span></div>
        <div class="summary-total">
          <span>合计</span><span :style="{ color: themeColor }">¥{{ productPrice }}</span>
        </div>
      </div>
      <div class="form-actions">
        <button class="submit-btn" :style="{ background: themeColor }" @click="submitOrder">
          提交订单
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useH5Page } from '../useH5Page';

const { themeColor, navigateTo, fetchDetail, fetchList, submitData, setLayout, route } = useH5Page();
setLayout({ title: '确认订单', showBack: true, showTabbar: false });

const form = ref({ remark: '' });
const addressList = ref([]);
const selectedAddressId = ref(null);
const productName = ref('商品');
const productPrice = ref(0);

const selectedAddress = computed(() => addressList.value.find(a => a.id === selectedAddressId.value));

onMounted(async () => {
  const id = route.params.id;
  if (id && id !== '0') {
    const product = await fetchDetail('productList', id);
    if (product) {
      productName.value = product.name;
      productPrice.value = product.price;
    }
  }
  addressList.value = await fetchList('address', { pageSize: 50 });
  if (addressList.value.length) {
    const defaultAddr = addressList.value.find(a => a.isDefault);
    selectedAddressId.value = defaultAddr ? defaultAddr.id : addressList.value[0].id;
  }
});

const submitOrder = async () => {
  if (!selectedAddress.value) return ElMessage.warning('请选择收货地址');
  const addr = selectedAddress.value;
  const order = {
    product: productName.value,
    amount: productPrice.value,
    customer: addr.name,
    phone: addr.phone,
    address: `${addr.province}${addr.city}${addr.district}${addr.detail}`,
    remark: form.value.remark,
    status: '待支付',
  };
  const result = await submitData('orderList', order);
  if (result) navigateTo(`pay/${result.id}`);
  else ElMessage.error('提交失败');
};
</script>

<style lang="scss" scoped>
.address-list-mini {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.address-mini-item {
  padding: 8px 10px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  &.selected {
    border-color: var(--theme);
    background: #ecf5ff;
  }
  .address-mini-name {
    font-size: 13px;
    font-weight: 600;
    color: #333;
  }
  .address-mini-detail {
    font-size: 11px;
    color: #999;
    margin-top: 2px;
  }
}
.address-card {
  padding: 8px 0;
  cursor: pointer;
  .address-empty {
    font-size: 13px;
    color: #999;
  }
}
.order-product {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 8px 0;
  .product-icon {
    font-size: 32px;
  }
  .product-info {
    flex: 1;
    .product-name {
      font-size: 13px;
      color: #333;
    }
    .product-price {
      font-size: 16px;
      font-weight: 700;
    }
  }
}
.order-summary {
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  margin: 8px 0;
  .summary-row {
    display: flex;
    justify-content: space-between;
    padding: 4px 0;
    font-size: 13px;
    color: #666;
  }
  .summary-total {
    display: flex;
    justify-content: space-between;
    padding: 8px 0 0;
    font-size: 15px;
    font-weight: 700;
    color: #333;
    border-top: 1px solid #f0f0f0;
    margin-top: 4px;
  }
}
</style>
