<template>
  <div class="ecom-confirm-order">
    <div class="h5-form">
      <div class="form-group">
        <div class="form-label">收货地址</div>
        <div class="address-card" @click="navigateTo('address')">
          <template v-if="address">
            <div class="address-name">{{ address.name }} {{ address.phone }}</div>
            <div class="address-detail">{{ address.detail }}</div>
          </template>
          <div v-else class="address-empty">请选择收货地址 ›</div>
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
        <div class="form-label"><span class="required">*</span>收货人姓名</div>
        <el-input v-model="form.name" placeholder="请输入收货人" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>手机号码</div>
        <el-input v-model="form.phone" placeholder="请输入手机号" size="small" />
      </div>
      <div class="form-group">
        <div class="form-label"><span class="required">*</span>收货地址</div>
        <el-input v-model="form.address" placeholder="请输入详细地址" size="small" />
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
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useH5Page } from '../useH5Page';

const { themeColor, navigateTo, fetchDetail, submitData, setLayout, route } = useH5Page();
setLayout({ title: '确认订单', showBack: true, showTabbar: false });

const form = ref({ name: '', phone: '', address: '', remark: '' });
const address = ref(null);
const productName = ref('商品');
const productPrice = ref(0);
const productId = ref(0);

onMounted(async () => {
  const id = route.params.id;
  if (id && id !== '0') {
    const product = await fetchDetail('productList', id);
    if (product) {
      productName.value = product.name;
      productPrice.value = product.price;
      productId.value = product.id;
    }
  }
});

const submitOrder = async () => {
  if (!form.value.name) return ElMessage.warning('请输入收货人');
  if (!form.value.phone) return ElMessage.warning('请输入手机号');
  if (!form.value.address) return ElMessage.warning('请输入收货地址');
  const order = {
    product: productName.value,
    amount: productPrice.value,
    customer: form.value.name,
    phone: form.value.phone,
    address: form.value.address,
    remark: form.value.remark,
    status: '待支付',
  };
  const result = await submitData('orderList', order);
  if (result) navigateTo(`pay/${result.id}`);
  else ElMessage.error('提交失败');
};
</script>

<style lang="scss" scoped>
.address-card {
  padding: 8px 0;
  cursor: pointer;
  .address-name {
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }
  .address-detail {
    font-size: 12px;
    color: #999;
    margin-top: 2px;
  }
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
