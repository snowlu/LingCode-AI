<template>
  <div class="ecom-cart">
    <div v-if="loading" class="h5-loading">
      <div v-for="i in 3" :key="i" class="skeleton-card"></div>
    </div>
    <template v-else>
      <div v-if="cartItems.length" class="cart-list">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="cart-check" @click="toggleCheck(item)">
            <span
              :class="['check-box', { checked: checkedIds.includes(item.id) }]"
              :style="
                checkedIds.includes(item.id)
                  ? { background: themeColor, borderColor: themeColor }
                  : {}
              "
              >✓</span
            >
          </div>
          <div class="cart-img">{{ item.img || '📦' }}</div>
          <div class="cart-info">
            <h4>{{ item.product || item.name }}</h4>
            <div class="cart-price" :style="{ color: themeColor }">
              ¥{{ item.price || item.amount || 0 }}
            </div>
          </div>
          <el-icon class="cart-delete" @click="removeItem(item)"><Delete /></el-icon>
        </div>
      </div>
      <div v-else class="h5-empty">
        <div class="empty-icon">🛒</div>
        <div class="empty-text">购物车空空如也</div>
        <el-button size="small" :style="{ background: themeColor, borderColor: themeColor, color: '#fff' }" style="margin-top: 12px" @click="navigateTo('home')">去逛逛</el-button>
      </div>
      <div v-if="cartItems.length" class="cart-footer">
        <div class="cart-total">
          合计：<span :style="{ color: themeColor }">¥{{ totalPrice }}</span>
        </div>
        <button class="checkout-btn" :style="{ background: themeColor }" @click="checkout">
          结算({{ checkedIds.length }})
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { Delete } from '@element-plus/icons-vue';
import { useH5Page } from '../useH5Page';

const { themeColor, navigateTo, fetchList, removeData, setLayout } = useH5Page();
setLayout({ title: '购物车', showBack: false, showTabbar: true, activeTab: 'cart' });

const loading = ref(true);
const cartItems = ref([]);
const checkedIds = ref([]);

const totalPrice = computed(() => {
  return cartItems.value
    .filter(i => checkedIds.value.includes(i.id))
    .reduce((sum, i) => sum + (parseFloat(i.price) || parseFloat(i.amount) || 0), 0)
    .toFixed(2);
});

const toggleCheck = item => {
  const idx = checkedIds.value.indexOf(item.id);
  if (idx > -1) checkedIds.value.splice(idx, 1);
  else checkedIds.value.push(item.id);
};

const removeItem = async item => {
  await removeData('cart', item.id);
  cartItems.value = cartItems.value.filter(i => i.id !== item.id);
  checkedIds.value = checkedIds.value.filter(id => id !== item.id);
  ElMessage.success('已移除');
};

const checkout = () => {
  if (!checkedIds.value.length) return ElMessage.warning('请选择商品');
  const selected = cartItems.value.filter(i => checkedIds.value.includes(i.id));
  const productId = selected[0]?.productId || selected[0]?.id || 0;
  navigateTo(`confirm-order/${productId}`);
};

const loadCart = async () => {
  loading.value = true;
  cartItems.value = await fetchList('cart', { pageSize: 50 });
  checkedIds.value = cartItems.value.map(i => i.id);
  loading.value = false;
};

onMounted(loadCart);
</script>

<style lang="scss" scoped>
.cart-list {
  padding: 8px 12px 120px;
}
.cart-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border-radius: 12px;
  padding: 10px;
  margin-bottom: 8px;
  .cart-check {
    .check-box {
      width: 20px;
      height: 20px;
      border: 2px solid #ddd;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #fff;
      cursor: pointer;
      &.checked {
        border-color: var(--theme);
      }
    }
  }
  .cart-img {
    width: 56px;
    height: 56px;
    background: #f5f7fa;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    flex-shrink: 0;
  }
  .cart-info {
    flex: 1;
    h4 {
      font-size: 13px;
      font-weight: 500;
      color: #333;
      margin: 0 0 4px;
    }
    .cart-price {
      font-size: 15px;
      font-weight: 700;
    }
  }
  .cart-delete {
    color: #c0c4cc;
    cursor: pointer;
  }
}
.cart-footer {
  position: sticky;
  bottom: 60px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px 20px;
  border-top: 1px solid #f0f0f0;
  .cart-total {
    font-size: 14px;
    span {
      font-size: 18px;
      font-weight: 700;
    }
  }
  .checkout-btn {
    padding: 10px 24px;
    border-radius: 20px;
    border: none;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
}
</style>
