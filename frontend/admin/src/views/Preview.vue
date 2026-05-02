<template>
  <div class="preview-page">
    <div class="admin-system">
      <div
        v-if="!isLoggedIn"
        class="login-container"
        :style="{
          background: `linear-gradient(135deg, ${industryConfig.color} 0%, ${adjustColor(industryConfig.color, -40)} 100%)`,
        }"
      >
        <div class="login-card">
          <div class="login-header">
            <h2>{{ industryConfig.name }}</h2>
            <p>企业级管理系统演示</p>
          </div>
          <el-form :model="loginForm" class="login-form">
            <el-form-item>
              <el-input v-model="loginForm.username" placeholder="请输入用户名" size="large">
                <template #prefix
                  ><el-icon><User /></el-icon
                ></template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                size="large"
                show-password
                @keyup.enter="handleLogin"
              >
                <template #prefix
                  ><el-icon><Lock /></el-icon
                ></template>
              </el-input>
            </el-form-item>
            <el-button
              type="primary"
              size="large"
              class="login-btn"
              :style="{ background: industryConfig.color, borderColor: industryConfig.color }"
              @click="handleLogin"
              >登 录</el-button
            >
            <div class="demo-credentials"><p>演示账号：admin / 123456（直接点击登录即可）</p></div>
          </el-form>
        </div>
      </div>

      <div v-else class="admin-layout">
        <aside :class="['sidebar', { collapsed: isSidebarCollapsed }]">
          <div
            class="sidebar-logo"
            @click="
              currentMenu = 'dashboard';
              currentSubMenu = '';
            "
          >
            <el-icon :size="20"><MagicStick /></el-icon>
            <span v-show="!isSidebarCollapsed" class="logo-text">{{ industryConfig.name }}</span>
          </div>
          <nav class="sidebar-menu">
            <div v-for="menu in industryConfig.menus" :key="menu.key">
              <div
                v-if="!menu.children"
                :class="['menu-item', { active: currentMenu === menu.key && !currentSubMenu }]"
                :style="
                  currentMenu === menu.key && !currentSubMenu
                    ? { background: industryConfig.color }
                    : {}
                "
                @click="selectMenu(menu.key, '')"
              >
                <el-icon><component :is="menu.icon" /></el-icon>
                <span v-show="!isSidebarCollapsed">{{ menu.label }}</span>
              </div>
              <div
                v-if="menu.children"
                :class="['menu-group', { expanded: expandedGroups.includes(menu.key) }]"
              >
                <div class="menu-item parent" @click="toggleGroup(menu.key)">
                  <el-icon><component :is="menu.icon" /></el-icon>
                  <span v-show="!isSidebarCollapsed">{{ menu.label }}</span>
                  <el-icon v-show="!isSidebarCollapsed" class="arrow"><ArrowRight /></el-icon>
                </div>
                <div
                  v-show="expandedGroups.includes(menu.key) && !isSidebarCollapsed"
                  class="sub-menu"
                >
                  <div
                    v-for="sub in menu.children"
                    :key="sub.key"
                    :class="['sub-menu-item', { active: currentSubMenu === sub.key }]"
                    :style="
                      currentSubMenu === sub.key
                        ? { color: industryConfig.color, background: industryConfig.color + '15' }
                        : {}
                    "
                    @click="selectMenu(menu.key, sub.key)"
                  >
                    <span>{{ sub.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <div class="sidebar-toggle" @click="isSidebarCollapsed = !isSidebarCollapsed">
            <el-icon><Fold v-if="!isSidebarCollapsed" /><Expand v-else /></el-icon>
          </div>
        </aside>

        <main class="main-content">
          <header class="top-header">
            <div class="header-left">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{ currentMenuLabel }}</el-breadcrumb-item>
                <el-breadcrumb-item v-if="currentSubMenuLabel">{{
                  currentSubMenuLabel
                }}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="header-right">
              <el-dropdown @command="goToUserPortalMode">
                <el-button size="small" type="warning">
                  <el-icon><Iphone /></el-icon>用户端
                  <el-icon class="el-icon--right"><ArrowDown /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="pc"
                      ><el-icon><Monitor /></el-icon> PC版</el-dropdown-item
                    >
                    <el-dropdown-item command="h5"
                      ><el-icon><Iphone /></el-icon> H5版</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-button size="small" @click="$router.push('/templates')"
                ><el-icon><Back /></el-icon>返回</el-button
              >
              <el-button
                size="small"
                type="success"
                :loading="isDownloading"
                @click="handleDownload"
                ><el-icon><Download /></el-icon>下载代码</el-button
              >
              <el-badge :value="3" :max="99" class="notify-badge"
                ><el-icon :size="18"><Bell /></el-icon
              ></el-badge>
              <el-dropdown>
                <div class="user-info">
                  <el-avatar :size="30" :style="{ background: industryConfig.color }">A</el-avatar
                  ><span>管理员</span>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </header>

          <div class="page-content">
            <transition name="slide-fade" mode="out-in">
              <div :key="currentSubMenu || currentMenu">
                <DashboardPage v-if="currentMenu === 'dashboard'" :config="industryConfig" />
                <FlowDemo
                  v-else-if="currentMenu === 'flow-demo'"
                  :industry="industryKey"
                  :config="industryConfig"
                />
                <ListPage
                  v-else-if="currentPageType === 'list'"
                  :config="industryConfig"
                  :page-key="currentSubMenu"
                  :page-data="currentPageData"
                />
                <ChartPage
                  v-else-if="currentPageType === 'chart'"
                  :config="industryConfig"
                  :page-key="currentSubMenu"
                  :page-data="currentPageData"
                />
                <FormPage
                  v-else-if="currentPageType === 'form'"
                  :config="industryConfig"
                  :page-key="currentSubMenu"
                  :page-data="currentPageData"
                />
                <TreePage
                  v-else-if="currentPageType === 'tree'"
                  :config="industryConfig"
                  :page-key="currentSubMenu"
                  :page-data="currentPageData"
                />
              </div>
            </transition>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  User,
  Lock,
  MagicStick,
  Bell,
  Fold,
  Expand,
  Back,
  Download,
  ArrowRight,
  Monitor,
  Iphone,
  ArrowDown,
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import industryConfigs from '@/config/industries.js';
import { useAuthStore } from '@/stores/auth.js';
import { getDownloadFiles } from '@/api';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import DashboardPage from '@/components/preview/DashboardPage.vue';
import ListPage from '@/components/preview/ListPage.vue';
import ChartPage from '@/components/preview/ChartPage.vue';
import FormPage from '@/components/preview/FormPage.vue';
import TreePage from '@/components/preview/TreePage.vue';
import FlowDemo from '@/components/preview/FlowDemo.vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const isLoggedIn = ref(false);
const isSidebarCollapsed = ref(false);
const currentMenu = ref('dashboard');
const currentSubMenu = ref('');
const expandedGroups = ref([]);
const loginForm = ref({ username: 'admin', password: '123456' });

const idToKey = {
  1: 'ecommerce',
  2: 'education',
  3: 'government',
  4: 'medical',
  5: 'logistics',
  6: 'restaurant',
  8: 'finance',
  9: 'hr',
  10: 'project',
  11: 'community',
};

const adminNames = {
  ecommerce: '电商管理员',
  education: '教育管理员',
  government: '政务管理员',
  medical: '医疗管理员',
  logistics: '物流管理员',
  hr: '人事管理员',
  finance: '财务管理员',
  restaurant: '门店管理员',
  community: '社区管理员',
  project: '项目管理员',
};

const industryConfig = computed(() => {
  const id = parseInt(route.params.id);
  const key = idToKey[id] || 'ecommerce';
  return industryConfigs[key] || industryConfigs.ecommerce;
});

const industryKey = computed(() => {
  const id = parseInt(route.params.id);
  return idToKey[id] || 'ecommerce';
});

watch(
  () => route.params.id,
  () => {
    const key = idToKey[parseInt(route.params.id)] || 'ecommerce';
    loginForm.value.username = adminNames[key] || 'admin';
  },
  { immediate: true }
);

const currentMenuLabel = computed(() => {
  const menu = industryConfig.value.menus.find(m => m.key === currentMenu.value);
  return menu ? menu.label : '工作台';
});

const currentSubMenuLabel = computed(() => {
  if (!currentSubMenu.value) return '';
  const menu = industryConfig.value.menus.find(m => m.key === currentMenu.value);
  if (!menu || !menu.children) return '';
  const sub = menu.children.find(s => s.key === currentSubMenu.value);
  return sub ? sub.label : '';
});

const currentPageType = computed(() => {
  if (!currentSubMenu.value) return '';
  const menu = industryConfig.value.menus.find(m => m.key === currentMenu.value);
  if (!menu || !menu.children) return 'list';
  const sub = menu.children.find(s => s.key === currentSubMenu.value);
  return sub ? sub.type : 'list';
});

const currentPageData = computed(() => {
  const key = currentSubMenu.value;
  if (!key || !industryConfig.value.listData) return null;
  return industryConfig.value.listData[key] || null;
});

const selectMenu = (menuKey, subKey) => {
  currentMenu.value = menuKey;
  currentSubMenu.value = subKey;
  if (subKey) {
    const menu = industryConfig.value.menus.find(m => m.key === menuKey);
    if (menu && menu.children && !expandedGroups.value.includes(menuKey)) {
      expandedGroups.value.push(menuKey);
    }
  }
};

const toggleGroup = key => {
  const idx = expandedGroups.value.indexOf(key);
  if (idx > -1) {
    expandedGroups.value.splice(idx, 1);
  } else {
    expandedGroups.value.push(key);
  }
};

const handleLogin = async () => {
  const key = idToKey[parseInt(route.params.id)] || 'ecommerce';
  await authStore.login(key);
  isLoggedIn.value = true;
  ElMessage.success(`登录成功，欢迎 ${authStore.userInfo?.nickname || '管理员'}！`);
};
const handleLogout = () => {
  isLoggedIn.value = false;
};

onMounted(async () => {
  const key = idToKey[parseInt(route.params.id)] || 'ecommerce';
  if (authStore.isLoggedIn(key)) {
    await authStore.login(key);
    isLoggedIn.value = true;
  }
});
const isDownloading = ref(false);
const handleDownload = async () => {
  if (isDownloading.value) return;
  isDownloading.value = true;
  const loadingMsg = ElMessage({ message: '正在打包代码，请稍候...', type: 'info', duration: 0 });
  try {
    const key = idToKey[parseInt(route.params.id)] || 'ecommerce';
    const res = await getDownloadFiles(key);
    if (!res.data?.files) throw new Error('获取代码包失败');
    const zip = new JSZip();
    const projectName = res.data.projectName || 'project';
    for (const [path, content] of Object.entries(res.data.files)) {
      zip.file(`${projectName}/${path}`, content);
    }
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `${projectName}.zip`);
    loadingMsg.close();
    ElMessage.success('项目代码包已下载，解压后直接 npm install && npm run dev 即可启动');
  } catch (e) {
    loadingMsg.close();
    console.error(e);
    ElMessage.error('代码包生成失败，请稍后重试');
  }
  isDownloading.value = false;
};

const _goToUserPortal = () => {
  const id = parseInt(route.params.id);
  const key = idToKey[id] || 'ecommerce';
  router.push(`/user-portal/${key}`);
};

const goToUserPortalMode = mode => {
  const id = parseInt(route.params.id);
  const key = idToKey[id] || 'ecommerce';
  if (mode === 'h5') {
    router.push(`/h5/${key}/home`);
  } else {
    router.push(`/user-portal/${key}`);
  }
};

const adjustColor = (color, amount) => {
  const hex = color.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

watch(
  () => route.params.id,
  () => {
    currentMenu.value = 'dashboard';
    currentSubMenu.value = '';
    expandedGroups.value = [];
  }
);
</script>

<style lang="scss" scoped>
.preview-page {
  min-height: 100vh;
  background: #f0f4ff;
}
.admin-system {
  min-height: 100vh;
}

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
.login-card {
  width: 440px;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  .login-header {
    text-align: center;
    margin-bottom: 32px;
    h2 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 8px;
      color: #333;
    }
    p {
      color: #999;
      font-size: 14px;
    }
  }
  .login-btn {
    width: 100%;
    height: 44px;
    font-size: 16px;
    border-radius: 8px;
  }
  .demo-credentials {
    margin-top: 20px;
    padding: 14px;
    background: #f0f9ff;
    border-radius: 8px;
    text-align: center;
    p {
      font-size: 13px;
      color: #1890ff;
      line-height: 1.6;
    }
  }
}

.admin-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 240px;
  background: #001529;
  color: white;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  overflow: hidden;
  &.collapsed {
    width: 64px;
  }
  .sidebar-logo {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 15px;
    font-weight: bold;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .sidebar-menu {
    flex: 1;
    padding: 8px 0;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .menu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 20px;
    cursor: pointer;
    transition: all 0.25s;
    white-space: nowrap;
    font-size: 14px;
    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }
    &.active {
      color: white;
    }
    &.parent {
      .arrow {
        margin-left: auto;
        transition: transform 0.3s;
        font-size: 12px;
      }
    }
  }
  .menu-group.expanded .menu-item.parent .arrow {
    transform: rotate(90deg);
  }
  .sub-menu {
    background: rgba(0, 0, 0, 0.2);
    .sub-menu-item {
      padding: 10px 20px 10px 48px;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
      &:hover {
        background: rgba(255, 255, 255, 0.08);
        color: #fff;
      }
    }
  }
  .sidebar-toggle {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    flex-shrink: 0;
    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }
  }
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.top-header {
  height: 52px;
  background: white;
  border-bottom: 1px solid #e5e6eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  flex-shrink: 0;
  .header-right {
    display: flex;
    align-items: center;
    gap: 14px;
    .notify-badge {
      cursor: pointer;
    }
    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
  }
}
.page-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f0f4ff;
}

.slide-fade-enter-active {
  transition: all 0.25s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.15s ease-in;
}
.slide-fade-enter-from {
  transform: translateX(16px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-16px);
  opacity: 0;
}
</style>
