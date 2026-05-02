<template>
  <div class="phone-shell-wrapper">
    <div class="phone-shell" :class="{ landscape: isLandscape }">
      <div class="phone-frame">
        <div v-if="!isLandscape" class="phone-notch">
          <div class="notch-camera"></div>
          <div class="notch-speaker"></div>
        </div>
        <div v-if="isLandscape" class="phone-notch-landscape">
          <div class="notch-camera"></div>
        </div>
        <div class="phone-screen">
          <div class="status-bar" :style="{ background: statusBarBg }">
            <span class="status-time">{{ currentTime }}</span>
            <div class="status-icons">
              <svg width="16" height="12" viewBox="0 0 16 12">
                <path d="M1 8h2v4H1zM5 5h2v7H5zM9 3h2v9H9zM13 0h2v12h-2z" :fill="statusBarColor" />
              </svg>
              <svg width="16" height="12" viewBox="0 0 16 12">
                <path
                  d="M8 2C5.5 2 3.2 3 1.5 4.7L3 6.2C4.2 5 6 4.2 8 4.2s3.8.8 5 2l1.5-1.5C12.8 3 10.5 2 8 2zm0 4c-1.4 0-2.6.5-3.5 1.5L6 9c.5-.5 1.2-.8 2-.8s1.5.3 2 .8l1.5-1.5C10.6 6.5 9.4 6 8 6zm0 4l1.5-1.5C9 8.2 8.5 8 8 8s-1 .2-1.5.5L8 10z"
                  :fill="statusBarColor"
                />
              </svg>
              <svg width="24" height="12" viewBox="0 0 24 12">
                <rect
                  x="0"
                  y="1"
                  width="20"
                  height="10"
                  rx="2"
                  stroke-width="1"
                  :stroke="statusBarColor"
                  fill="none"
                />
                <rect x="21" y="4" width="2" height="4" rx="1" :fill="statusBarColor" />
                <rect x="2" y="3" width="14" height="6" rx="1" :fill="statusBarColor" />
              </svg>
            </div>
          </div>
          <div ref="screenContent" class="screen-content">
            <slot></slot>
          </div>
          <div class="home-indicator" :style="{ borderColor: homeIndicatorColor }"></div>
        </div>
      </div>
    </div>
    <div class="phone-controls">
      <el-button-group>
        <el-button :type="!isLandscape ? 'primary' : ''" size="small" @click="isLandscape = false">
          <el-icon><Iphone /></el-icon> 竖屏
        </el-button>
        <el-button :type="isLandscape ? 'primary' : ''" size="small" @click="isLandscape = true">
          <el-icon><Monitor /></el-icon> 横屏
        </el-button>
      </el-button-group>
      <el-button size="small" type="warning" @click="$emit('switchPc')">
        <el-icon><Monitor /></el-icon> 切换PC版
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Iphone, Monitor } from '@element-plus/icons-vue';

const props = defineProps({
  statusBarBg: { type: String, default: 'transparent' },
  darkStatusBar: { type: Boolean, default: false },
});

defineEmits(['switchPc']);

const isLandscape = ref(false);
const screenContent = ref(null);
const currentTime = ref('09:41');

const statusBarColor = computed(() => (props.darkStatusBar ? '#fff' : '#333'));
const homeIndicatorColor = computed(() =>
  props.darkStatusBar ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'
);

let timeInterval = null;
onMounted(() => {
  const now = new Date();
  currentTime.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  timeInterval = setInterval(() => {
    const n = new Date();
    currentTime.value = `${String(n.getHours()).padStart(2, '0')}:${String(n.getMinutes()).padStart(2, '0')}`;
  }, 60000);
});
onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval);
});
</script>

<style lang="scss" scoped>
.phone-shell-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px 20px;
  min-height: 100vh;
  background: #1a1a2e;
}

.phone-shell {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  &.landscape {
    .phone-frame {
      width: 850px;
      height: 420px;
      border-radius: 24px;
    }
    .phone-screen {
      width: 812px;
      height: 375px;
      border-radius: 16px;
    }
    .phone-notch-landscape {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 12px;
      height: 80px;
      background: #1a1a1a;
      border-radius: 0 6px 6px 0;
      z-index: 10;
      .notch-camera {
        position: absolute;
        top: 50%;
        right: 3px;
        transform: translateY(-50%);
        width: 6px;
        height: 6px;
        background: #2a2a3a;
        border-radius: 50%;
      }
    }
  }
}

.phone-frame {
  width: 420px;
  height: 850px;
  background: #1a1a1a;
  border-radius: 54px;
  padding: 12px;
  box-shadow:
    0 0 0 2px #333,
    0 0 0 4px #1a1a1a,
    0 20px 60px rgba(0, 0, 0, 0.5),
    inset 0 0 2px rgba(255, 255, 255, 0.05);
  position: relative;
  display: flex;
  flex-direction: column;
}

.phone-notch {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 160px;
  height: 34px;
  background: #1a1a1a;
  border-radius: 0 0 20px 20px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  .notch-speaker {
    width: 50px;
    height: 6px;
    background: #2a2a3a;
    border-radius: 3px;
  }
  .notch-camera {
    width: 12px;
    height: 12px;
    background: #2a2a3a;
    border-radius: 50%;
    box-shadow:
      inset 0 0 2px rgba(0, 0, 0, 0.5),
      0 0 2px rgba(50, 50, 100, 0.3);
  }
}

.phone-screen {
  width: 375px;
  height: 667px;
  background: #fff;
  border-radius: 42px;
  overflow: hidden;
  position: relative;
  margin: auto;
  display: flex;
  flex-direction: column;
}

.status-bar {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  flex-shrink: 0;
  z-index: 5;
  .status-time {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
  .status-icons {
    display: flex;
    align-items: center;
    gap: 5px;
  }
}

.screen-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    width: 0;
  }
}

.home-indicator {
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  &::after {
    content: '';
    width: 134px;
    height: 5px;
    border-radius: 3px;
    background: currentColor;
    opacity: 0.2;
  }
}

.phone-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>
