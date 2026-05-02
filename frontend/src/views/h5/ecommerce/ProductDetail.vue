<template>
  <div class="ecom-product-detail">
    <div v-if="loading" class="h5-loading">
      <div class="skeleton-banner"></div>
      <div class="skeleton-card"></div>
    </div>
    <template v-else-if="product">
      <div class="detail-gallery">
        <div class="gallery-main">{{ product.img || '📦' }}</div>
      </div>
      <div class="detail-info-card">
        <div class="detail-price" :style="{ color: themeColor }">¥{{ product.price }}</div>
        <div class="detail-name">{{ product.name }}</div>
        <div class="detail-meta">
          <span>销量 {{ product.sales || 0 }}</span>
          <span>库存 {{ product.stock || 0 }}</span>
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">商品详情</div>
        <div class="detail-desc">{{ product.description || '精选好物，品质保障，放心购买。' }}</div>
        <div class="detail-features">
          <span
            v-for="f in features"
            :key="f"
            class="feature-tag"
            :style="{ background: themeColor + '15', color: themeColor }"
            >{{ f }}</span
          >
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">规格选择</div>
        <div class="spec-row">
          <span
            v-for="s in specs"
            :key="s"
            :class="['spec-item', { active: selectedSpec === s }]"
            :style="
              selectedSpec === s
                ? { background: themeColor, color: '#fff', borderColor: themeColor }
                : {}
            "
            @click="selectedSpec = s"
            >{{ s }}</span
          >
        </div>
      </div>
      <div class="detail-actions">
        <button class="action-btn cart-btn" :style="{ background: '#ff9f40' }" @click="addToCart">
          加入购物车
        </button>
        <button class="action-btn buy-btn" :style="{ background: themeColor }" @click="buyNow">
          立即购买
        </button>
      </div>
    </template>
    <div v-else class="h5-empty">
      <div class="empty-icon">📭</div>
      <div class="empty-text">商品不存在</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useH5Page } from '../useH5Page';

const { themeColor, navigateTo, fetchDetail, submitData, setLayout, route } = useH5Page();
setLayout({ title: '商品详情', showBack: true, showTabbar: false });

const loading = ref(true);
const product = ref(null);
const selectedSpec = ref('');
const features = ['品质保障', '七天退换', '正品行货', '极速发货'];
const specs = ['标准版', '升级版', '尊享版'];

onMounted(async () => {
  const id = route.params.id;
  product.value = await fetchDetail('productList', id);
  if (specs.length) selectedSpec.value = specs[0];
  loading.value = false;
});

const addToCart = async () => {
  if (!product.value) return;
  await submitData('orderList', {
    product: product.value.name,
    price: product.value.price,
    type: 'cart',
    status: '购物车',
  });
  ElMessage.success('已加入购物车');
};

const buyNow = () => {
  if (!product.value) return;
  navigateTo(`confirm-order/${product.value.id}`);
};
</script>

<style lang="scss" scoped>
.detail-gallery {
  background: #fff;
  text-align: center;
  padding: 24px;
  .gallery-main {
    font-size: 80px;
  }
}
.detail-info-card {
  background: #fff;
  margin: 8px 12px;
  border-radius: 12px;
  padding: 12px;
  .detail-price {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 6px;
  }
  .detail-name {
    font-size: 15px;
    font-weight: 600;
    color: #333;
    margin-bottom: 6px;
    line-height: 1.4;
  }
  .detail-meta {
    font-size: 12px;
    color: #999;
    span {
      margin-right: 12px;
    }
  }
}
.detail-section {
  background: #fff;
  margin: 8px 12px;
  border-radius: 12px;
  padding: 12px;
  .detail-section-title {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }
  .detail-desc {
    font-size: 13px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 8px;
  }
  .detail-features {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    .feature-tag {
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 11px;
    }
  }
  .spec-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    .spec-item {
      padding: 6px 14px;
      border: 1px solid #ddd;
      border-radius: 16px;
      font-size: 12px;
      cursor: pointer;
      &.active {
        border-color: var(--theme);
      }
    }
  }
}
.detail-actions {
  position: sticky;
  bottom: 0;
  display: flex;
  gap: 0;
  padding: 8px 12px 28px;
  background: #fff;
  .action-btn {
    flex: 1;
    height: 40px;
    border: none;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
  .cart-btn {
    border-radius: 20px 0 0 20px;
  }
  .buy-btn {
    border-radius: 0 20px 20px 0;
  }
}
</style>
