<template>
  <div v-if="isH5Mode" class="h5-preview-page">
    <PhoneShell :status-bar-bg="h5Config.color" :dark-status-bar="true" @switch-pc="switchToPc">
      <div class="h5-app" :style="{ '--theme': h5Config.color }">
        <header class="h5-navbar" :style="{ background: h5Config.color }">
          <div class="navbar-left">
            <span v-if="currentTab !== 'home'" class="navbar-back" @click="currentTab = 'home'"
              >‹</span
            >
          </div>
          <h1 class="navbar-title">{{ currentTitle }}</h1>
          <div class="navbar-right">
            <el-icon :size="18" color="#fff"><Search /></el-icon>
          </div>
        </header>

        <div class="h5-body">
          <transition name="h5-fade" mode="out-in">
            <div :key="currentTab" class="h5-page">
              <div v-if="currentTab === 'home'" class="h5-home">
                <div v-if="homeLoading" class="h5-loading">
                  <div class="skeleton-banner"></div>
                  <div class="skeleton-grid">
                    <div v-for="i in 8" :key="i" class="skeleton-item"></div>
                  </div>
                  <div class="skeleton-list">
                    <div v-for="i in 3" :key="i" class="skeleton-card"></div>
                  </div>
                </div>
                <template v-else>
                  <div v-if="h5Config.homeLayout === 'ecommerce'" class="home-ecommerce">
                    <div
                      class="h5-search"
                      @click="currentTab = h5Config.tabs[1]?.key || 'category'"
                    >
                      <el-icon><Search /></el-icon>
                      <span>{{ h5Config.searchPlaceholder }}</span>
                    </div>
                    <div class="h5-banner">
                      <el-carousel height="120px" :interval="4000" indicator-position="outside">
                        <el-carousel-item v-for="(b, i) in portalConfig.home.banners" :key="i">
                          <div class="banner-slide" :style="{ background: b.bg }">
                            <h3>{{ b.title }}</h3>
                            <p>{{ b.subtitle }}</p>
                          </div>
                        </el-carousel-item>
                      </el-carousel>
                    </div>
                    <div class="h5-grid">
                      <div
                        v-for="(cat, i) in portalConfig.home.categories"
                        :key="i"
                        class="grid-item"
                        @click="currentTab = h5Config.tabs[1]?.key || 'category'"
                      >
                        <span class="grid-icon">{{ cat.icon }}</span>
                        <span class="grid-label">{{ cat.name }}</span>
                      </div>
                    </div>
                    <div class="h5-section">
                      <span class="section-title">{{ h5Config.sectionTitles.hot }}</span
                      ><span
                        class="section-more"
                        :style="{ color: h5Config.color }"
                        @click="currentTab = h5Config.tabs[1]?.key || 'category'"
                        >更多 ›</span
                      >
                    </div>
                    <div class="h5-waterfall">
                      <div
                        v-for="(item, i) in apiData.home"
                        :key="i"
                        class="waterfall-card"
                        @click="showItemDetail(item)"
                      >
                        <div class="waterfall-img">{{ item.img || '📦' }}</div>
                        <div class="waterfall-info">
                          <h4>{{ item.name }}</h4>
                          <div class="waterfall-bottom">
                            <span class="waterfall-price" :style="{ color: h5Config.color }">{{
                              formatPrice(item)
                            }}</span>
                            <span class="waterfall-sales">{{
                              item.sales || item.students || ''
                            }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-else-if="h5Config.homeLayout === 'education'" class="home-education">
                    <div class="h5-banner">
                      <el-carousel height="120px" :interval="4000" indicator-position="outside">
                        <el-carousel-item v-for="(b, i) in portalConfig.home.banners" :key="i">
                          <div class="banner-slide" :style="{ background: b.bg }">
                            <h3>{{ b.title }}</h3>
                            <p>{{ b.subtitle }}</p>
                          </div>
                        </el-carousel-item>
                      </el-carousel>
                    </div>
                    <div class="h5-grid">
                      <div
                        v-for="(cat, i) in portalConfig.home.categories.slice(0, 8)"
                        :key="i"
                        class="grid-item"
                        @click="currentTab = 'course'"
                      >
                        <span class="grid-icon">{{ cat.icon }}</span
                        ><span class="grid-label">{{ cat.name }}</span>
                      </div>
                    </div>
                    <div class="h5-section">
                      <span class="section-title">{{ h5Config.sectionTitles.hot }}</span>
                    </div>
                    <div class="h5-list">
                      <div
                        v-for="(item, i) in apiData.home"
                        :key="i"
                        class="list-card"
                        @click="showItemDetail(item)"
                      >
                        <div class="list-img">{{ item.img || '📘' }}</div>
                        <div class="list-info">
                          <h4>{{ item.name }}</h4>
                          <div class="list-meta">
                            <span class="list-teacher">{{ item.teacher || '' }}</span>
                          </div>
                          <div class="list-bottom">
                            <span class="list-price" :style="{ color: h5Config.color }">{{
                              formatPrice(item)
                            }}</span
                            ><span class="list-sales"
                              >{{ item.students || item.sales || '' }}人学习</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-else-if="h5Config.homeLayout === 'government'" class="home-government">
                    <div class="h5-banner">
                      <el-carousel height="100px" :interval="4000" indicator-position="outside">
                        <el-carousel-item v-for="(b, i) in portalConfig.home.banners" :key="i">
                          <div class="banner-slide" :style="{ background: b.bg }">
                            <h3>{{ b.title }}</h3>
                            <p>{{ b.subtitle }}</p>
                          </div>
                        </el-carousel-item>
                      </el-carousel>
                    </div>
                    <div class="h5-grid">
                      <div
                        v-for="(cat, i) in portalConfig.home.categories.slice(0, 8)"
                        :key="i"
                        class="grid-item"
                        @click="currentTab = 'service'"
                      >
                        <span class="grid-icon">{{ cat.icon }}</span
                        ><span class="grid-label">{{ cat.name }}</span>
                      </div>
                    </div>
                    <div class="h5-section">
                      <span class="section-title">{{ h5Config.sectionTitles.policy }}</span>
                    </div>
                    <div class="h5-list">
                      <div
                        v-for="(item, i) in apiData.notice"
                        :key="i"
                        class="notice-card"
                        @click="showItemDetail(item)"
                      >
                        <div class="notice-badge" :style="{ background: h5Config.color }">
                          {{ item.type || '公告' }}
                        </div>
                        <div class="notice-info">
                          <h4>{{ item.title || item.name }}</h4>
                          <span class="notice-date">{{ item.createdAt || '' }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="h5-section">
                      <span class="section-title">{{ h5Config.sectionTitles.hot }}</span>
                    </div>
                    <div class="h5-list">
                      <div
                        v-for="(item, i) in apiData.home"
                        :key="i"
                        class="list-card"
                        @click="showItemDetail(item)"
                      >
                        <div class="list-img">{{ item.img || '📋' }}</div>
                        <div class="list-info">
                          <h4>{{ item.name }}</h4>
                          <div class="list-bottom">
                            <span class="list-price" :style="{ color: h5Config.color }">{{
                              item.fee || '免费'
                            }}</span
                            ><span class="list-sales">{{ item.applicants || '' }}人办理</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-else-if="h5Config.homeLayout === 'medical'" class="home-medical">
                    <div class="h5-grid h5-grid-5">
                      <div
                        v-for="(cat, i) in portalConfig.home.categories.slice(0, 10)"
                        :key="i"
                        class="grid-item"
                        @click="currentTab = 'register'"
                      >
                        <span class="grid-icon">{{ cat.icon }}</span
                        ><span class="grid-label">{{ cat.name }}</span>
                      </div>
                    </div>
                    <div class="h5-section">
                      <span class="section-title">{{ h5Config.sectionTitles.hot }}</span>
                    </div>
                    <div class="h5-list">
                      <div
                        v-for="(item, i) in apiData.home"
                        :key="i"
                        class="doctor-card"
                        @click="showItemDetail(item)"
                      >
                        <div class="doctor-avatar">{{ item.img || '👨‍⚕️' }}</div>
                        <div class="doctor-info">
                          <h4>{{ item.name }}</h4>
                          <div class="doctor-meta">
                            <span class="doctor-dept">{{ item.department || '' }}</span
                            ><span class="doctor-title">{{ item.title || '' }}</span>
                          </div>
                          <div class="doctor-bottom">
                            <span class="doctor-fee" :style="{ color: h5Config.color }"
                              >¥{{ item.fee || item.price || '50' }}起</span
                            ><span class="doctor-rating">⭐ {{ item.rating || '4.8' }}</span>
                          </div>
                        </div>
                        <el-button
                          size="small"
                          :style="{
                            background: h5Config.color,
                            borderColor: h5Config.color,
                            color: '#fff',
                          }"
                          @click.stop="handleAction(item)"
                          >挂号</el-button
                        >
                      </div>
                    </div>
                  </div>

                  <div v-else-if="h5Config.homeLayout === 'logistics'" class="home-logistics">
                    <div class="h5-search" @click="currentTab = 'track'">
                      <el-icon><Search /></el-icon><span>{{ h5Config.searchPlaceholder }}</span>
                    </div>
                    <div class="h5-grid h5-grid-4">
                      <div
                        v-for="(cat, i) in portalConfig.home.categories.slice(0, 4)"
                        :key="i"
                        class="grid-item grid-item-lg"
                        @click="currentTab = 'send'"
                      >
                        <span class="grid-icon">{{ cat.icon }}</span
                        ><span class="grid-label">{{ cat.name }}</span>
                      </div>
                    </div>
                    <div class="h5-section">
                      <span class="section-title">{{ h5Config.sectionTitles.hot }}</span>
                    </div>
                    <div class="h5-list">
                      <div
                        v-for="(item, i) in portalConfig.home.hotProducts"
                        :key="i"
                        class="list-card"
                        @click="showItemDetail(item)"
                      >
                        <div class="list-img">{{ item.img }}</div>
                        <div class="list-info">
                          <h4>{{ item.name }}</h4>
                          <div class="list-bottom">
                            <span class="list-price" :style="{ color: h5Config.color }">{{
                              item.price
                            }}</span
                            ><span class="list-sales">{{ item.sales }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-else-if="h5Config.homeLayout === 'hr'" class="home-hr">
                    <div class="h5-grid h5-grid-4">
                      <div
                        v-for="(cat, i) in portalConfig.home.categories.slice(0, 8)"
                        :key="i"
                        class="grid-item grid-item-lg"
                        @click="handleQuickAction(cat)"
                      >
                        <span class="grid-icon">{{ cat.icon }}</span
                        ><span class="grid-label">{{ cat.name }}</span>
                      </div>
                    </div>
                    <div class="h5-section">
                      <span class="section-title">{{ h5Config.sectionTitles.todo }}</span>
                    </div>
                    <div class="h5-list">
                      <div
                        v-for="(item, i) in apiData.home?.slice(0, 5)"
                        :key="i"
                        class="todo-card"
                        @click="showItemDetail(item)"
                      >
                        <div class="todo-dot" :style="{ background: h5Config.color }"></div>
                        <div class="todo-info">
                          <h4>{{ item.name }} - {{ item.status }}</h4>
                          <span>{{ item.date || item.createdAt || '' }}</span>
                        </div>
                        <el-icon color="#ccc"><ArrowRight /></el-icon>
                      </div>
                    </div>
                  </div>

                  <div v-else-if="h5Config.homeLayout === 'finance'" class="home-finance">
                    <div class="h5-grid h5-grid-4">
                      <div
                        v-for="(cat, i) in portalConfig.home.categories.slice(0, 8)"
                        :key="i"
                        class="grid-item grid-item-lg"
                        @click="handleQuickAction(cat)"
                      >
                        <span class="grid-icon">{{ cat.icon }}</span
                        ><span class="grid-label">{{ cat.name }}</span>
                      </div>
                    </div>
                    <div class="h5-section">
                      <span class="section-title">{{ h5Config.sectionTitles.salary }}</span>
                    </div>
                    <div
                      class="salary-card"
                      :style="{
                        background: `linear-gradient(135deg, ${h5Config.color}, ${adjustColor(h5Config.color, 30)})`,
                      }"
                    >
                      <div class="salary-label">本月实发</div>
                      <div class="salary-amount">
                        ¥{{ apiData.personal?.[0]?.actual || '12,500' }}
                      </div>
                      <div class="salary-date">{{ apiData.personal?.[0]?.month || '2026-04' }}</div>
                    </div>
                    <div class="h5-section">
                      <span class="section-title">{{ h5Config.sectionTitles.hot }}</span>
                    </div>
                    <div class="h5-list">
                      <div
                        v-for="(item, i) in apiData.home?.slice(0, 5)"
                        :key="i"
                        class="list-card"
                        @click="showItemDetail(item)"
                      >
                        <div class="list-img">{{ item.img || '🧾' }}</div>
                        <div class="list-info">
                          <h4>{{ item.applicant || item.name }} - {{ item.type || '' }}</h4>
                          <div class="list-bottom">
                            <span class="list-price" :style="{ color: h5Config.color }"
                              >¥{{ item.amount || 0 }}</span
                            ><span class="list-sales">{{ item.status || '' }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-else-if="h5Config.homeLayout === 'restaurant'" class="home-restaurant">
                    <div class="h5-banner">
                      <el-carousel height="100px" :interval="4000" indicator-position="outside">
                        <el-carousel-item v-for="(b, i) in portalConfig.home.banners" :key="i">
                          <div class="banner-slide" :style="{ background: b.bg }">
                            <h3>{{ b.title }}</h3>
                            <p>{{ b.subtitle }}</p>
                          </div>
                        </el-carousel-item>
                      </el-carousel>
                    </div>
                    <div class="h5-grid">
                      <div
                        v-for="(cat, i) in portalConfig.home.categories.slice(0, 8)"
                        :key="i"
                        class="grid-item"
                        @click="currentTab = 'menu'"
                      >
                        <span class="grid-icon">{{ cat.icon }}</span
                        ><span class="grid-label">{{ cat.name }}</span>
                      </div>
                    </div>
                    <div
                      class="member-card"
                      :style="{
                        background: `linear-gradient(135deg, ${h5Config.color}, ${adjustColor(h5Config.color, 30)})`,
                      }"
                    >
                      <div class="member-info">
                        <span class="member-avatar">👨</span>
                        <div>
                          <div class="member-name">张先生</div>
                          <div class="member-level">金卡会员</div>
                        </div>
                      </div>
                      <div class="member-points">5,600 积分</div>
                    </div>
                    <div class="h5-section">
                      <span class="section-title">{{ h5Config.sectionTitles.hot }}</span>
                    </div>
                    <div class="h5-waterfall">
                      <div
                        v-for="(item, i) in apiData.home"
                        :key="i"
                        class="waterfall-card"
                        @click="showItemDetail(item)"
                      >
                        <div class="waterfall-img">{{ item.img || '🍽️' }}</div>
                        <div class="waterfall-info">
                          <h4>{{ item.name }}</h4>
                          <div class="waterfall-bottom">
                            <span class="waterfall-price" :style="{ color: h5Config.color }"
                              >¥{{ item.price || item.sales }}</span
                            ><span class="waterfall-sales">{{ item.sales || '' }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-else-if="h5Config.homeLayout === 'community'" class="home-community">
                    <div class="h5-banner">
                      <el-carousel height="100px" :interval="4000" indicator-position="outside">
                        <el-carousel-item v-for="(b, i) in portalConfig.home.banners" :key="i">
                          <div class="banner-slide" :style="{ background: b.bg }">
                            <h3>{{ b.title }}</h3>
                            <p>{{ b.subtitle }}</p>
                          </div>
                        </el-carousel-item>
                      </el-carousel>
                    </div>
                    <div class="h5-grid h5-grid-4">
                      <div
                        v-for="(cat, i) in portalConfig.home.categories.slice(0, 8)"
                        :key="i"
                        class="grid-item grid-item-lg"
                        @click="handleQuickAction(cat)"
                      >
                        <span class="grid-icon">{{ cat.icon }}</span
                        ><span class="grid-label">{{ cat.name }}</span>
                      </div>
                    </div>
                    <div class="h5-section">
                      <span class="section-title">{{ h5Config.sectionTitles.notice }}</span>
                    </div>
                    <div class="h5-list">
                      <div
                        v-for="(item, i) in apiData.home?.slice(0, 5)"
                        :key="i"
                        class="notice-card"
                        @click="showItemDetail(item)"
                      >
                        <div class="notice-badge" :style="{ background: h5Config.color }">
                          {{ item.type || '公告' }}
                        </div>
                        <div class="notice-info">
                          <h4>{{ item.title || item.name }}</h4>
                          <span class="notice-date">{{ item.createdAt || '' }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-else-if="h5Config.homeLayout === 'project'" class="home-project">
                    <div class="h5-grid h5-grid-4">
                      <div
                        v-for="(cat, i) in portalConfig.home.categories.slice(0, 8)"
                        :key="i"
                        class="grid-item grid-item-lg"
                        @click="handleQuickAction(cat)"
                      >
                        <span class="grid-icon">{{ cat.icon }}</span
                        ><span class="grid-label">{{ cat.name }}</span>
                      </div>
                    </div>
                    <div class="h5-section">
                      <span class="section-title">{{ h5Config.sectionTitles.todo }}</span>
                    </div>
                    <div class="h5-list">
                      <div
                        v-for="(item, i) in apiData.task?.slice(0, 5)"
                        :key="i"
                        class="todo-card"
                        @click="showItemDetail(item)"
                      >
                        <div
                          class="todo-dot"
                          :style="{
                            background: item.priority === '高' ? '#f56c6c' : h5Config.color,
                          }"
                        ></div>
                        <div class="todo-info">
                          <h4>{{ item.name }}</h4>
                          <span>{{ item.assignee || '' }} · {{ item.status }}</span>
                        </div>
                        <el-icon color="#ccc"><ArrowRight /></el-icon>
                      </div>
                    </div>
                    <div class="h5-section">
                      <span class="section-title">{{ h5Config.sectionTitles.hot }}</span>
                    </div>
                    <div class="h5-list">
                      <div
                        v-for="(item, i) in apiData.home?.slice(0, 5)"
                        :key="i"
                        class="project-card"
                        @click="showItemDetail(item)"
                      >
                        <div
                          class="project-progress"
                          :style="{
                            '--progress': (item.progress || 0) + '%',
                            '--color': h5Config.color,
                          }"
                        >
                          <div class="progress-bar"></div>
                        </div>
                        <div class="project-info">
                          <h4>{{ item.name }}</h4>
                          <span>{{ item.manager || '' }} · {{ item.status }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>

              <div v-else-if="currentTab === 'personal'" class="h5-personal">
                <div
                  class="user-card"
                  :style="{
                    background: `linear-gradient(135deg, ${h5Config.color}, ${adjustColor(h5Config.color, 30)})`,
                  }"
                >
                  <span class="user-avatar">{{ portalConfig.personal.userAvatar }}</span>
                  <div>
                    <h3>{{ portalConfig.personal.userName }}</h3>
                    <span class="user-level">{{ portalConfig.personal.userLevel }}</span>
                  </div>
                </div>
                <div class="menu-list">
                  <div v-for="(menu, i) in portalConfig.personal.menus" :key="i" class="menu-item">
                    <el-icon :color="h5Config.color"><component :is="menu.icon" /></el-icon>
                    <span>{{ menu.label }}</span>
                    <el-badge v-if="menu.count" :value="menu.count" :max="99" />
                    <el-icon class="menu-arrow"><ArrowRight /></el-icon>
                  </div>
                </div>
                <div class="h5-section">
                  <span class="section-title">{{ orderLabel }}</span>
                </div>
                <div v-if="apiData.personal?.length" class="order-list">
                  <div
                    v-for="(order, i) in apiData.personal?.slice(0, 8)"
                    :key="i"
                    class="order-item"
                  >
                    <div class="order-top">
                      <span class="order-product">{{
                        order.product || order.name || order.title
                      }}</span
                      ><el-tag :type="getOrderStatusType(order.status)" size="small">{{
                        order.status
                      }}</el-tag>
                    </div>
                    <div class="order-bottom">
                      <span class="order-id">{{ order.id || order.orderNo || '' }}</span
                      ><span
                        v-if="order.amount"
                        class="order-amount"
                        :style="{ color: h5Config.color }"
                        >{{
                          typeof order.amount === 'number' ? '¥' + order.amount : order.amount
                        }}</span
                      >
                    </div>
                  </div>
                </div>
                <H5Empty v-else type="order" :color="h5Config.color" />
              </div>

              <div v-else class="h5-business">
                <div v-if="businessLoading" class="h5-loading">
                  <div v-for="i in 4" :key="i" class="skeleton-card"></div>
                </div>
                <template v-else>
                  <div v-if="apiData[currentTab]?.length" class="h5-list">
                    <div
                      v-for="(item, i) in apiData[currentTab]"
                      :key="i"
                      class="list-card"
                      @click="showItemDetail(item)"
                    >
                      <div class="list-img">{{ item.img || getItemIcon(item) }}</div>
                      <div class="list-info">
                        <h4>{{ item.name || item.title || item.applicant }}</h4>
                        <div class="list-bottom">
                          <span class="list-price" :style="{ color: h5Config.color }">{{
                            formatPrice(item)
                          }}</span>
                          <span class="list-sales">{{ item.status || item.sales || '' }}</span>
                        </div>
                      </div>
                      <el-button
                        size="small"
                        :style="{
                          background: h5Config.color,
                          borderColor: h5Config.color,
                          color: '#fff',
                        }"
                        @click.stop="handleAction(item)"
                        >{{ actionLabel }}</el-button
                      >
                    </div>
                  </div>
                  <H5Empty v-else :type="currentTab" :color="h5Config.color" />
                </template>
              </div>
            </div>
          </transition>
        </div>

        <nav class="h5-tabbar">
          <div
            v-for="tab in h5Config.tabs"
            :key="tab.key"
            :class="['tabbar-item', { active: currentTab === tab.key }]"
            :style="currentTab === tab.key ? { color: h5Config.color } : {}"
            @click="currentTab = tab.key"
          >
            <el-icon :size="20"><component :is="tab.icon" /></el-icon>
            <span>{{ tab.label }}</span>
          </div>
        </nav>
      </div>
    </PhoneShell>
  </div>

  <div v-else class="user-portal" :style="{ '--theme-color': portalConfig.color }">
    <header class="portal-header" :style="{ background: portalConfig.color }">
      <div class="header-content">
        <div class="header-left">
          <span class="portal-logo">{{ portalConfig.name.charAt(0) }}</span>
          <div class="header-info">
            <h1>{{ portalConfig.name }}</h1>
            <p>{{ portalConfig.slogan }}</p>
          </div>
        </div>
        <div class="header-right">
          <el-button
            size="small"
            round
            :style="{
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              borderColor: 'rgba(255,255,255,0.3)',
            }"
            @click="switchToH5"
            ><el-icon><Iphone /></el-icon> H5预览</el-button
          >
          <el-button
            size="small"
            round
            :style="{
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              borderColor: 'rgba(255,255,255,0.3)',
            }"
            @click="goToBackend"
            ><el-icon><Monitor /></el-icon> 切换后台</el-button
          >
          <div class="user-avatar" @click="currentTab = 'personal'">
            {{ portalConfig.personal.userAvatar }}
          </div>
        </div>
      </div>
    </header>
    <nav class="portal-nav">
      <div class="nav-content">
        <div
          v-for="tab in pcTabs"
          :key="tab.key"
          :class="['nav-item', { active: currentTab === tab.key }]"
          @click="currentTab = tab.key"
        >
          <el-icon><component :is="tab.icon" /></el-icon>{{ tab.label }}
        </div>
      </div>
    </nav>
    <main class="portal-main">
      <transition name="fade-slide" mode="out-in">
        <div :key="currentTab">
          <div v-if="currentTab === 'home'" class="home-page">
            <div class="banner-section">
              <el-carousel height="180px" :interval="4000" indicator-position="outside"
                ><el-carousel-item v-for="(b, i) in portalConfig.home.banners" :key="i"
                  ><div class="banner-item" :style="{ background: b.bg }">
                    <h2>{{ b.title }}</h2>
                    <p>{{ b.subtitle }}</p>
                  </div></el-carousel-item
                ></el-carousel
              >
            </div>
            <div class="category-section">
              <div class="section-header"><h3>分类导航</h3></div>
              <div class="category-grid">
                <div
                  v-for="(cat, i) in portalConfig.home.categories"
                  :key="i"
                  class="category-item"
                  @click="currentTab = pcTabs[1]?.key || 'business'"
                >
                  <span class="cat-icon">{{ cat.icon }}</span
                  ><span class="cat-name">{{ cat.name }}</span>
                </div>
              </div>
            </div>
            <div class="hot-section">
              <div class="section-header">
                <h3>{{ isServiceType ? '热门服务' : '热门推荐' }}</h3>
                <el-button text type="primary" @click="currentTab = pcTabs[1]?.key || 'business'"
                  >查看更多 →</el-button
                >
              </div>
              <div class="product-grid">
                <div
                  v-for="(item, i) in portalConfig.home.hotProducts"
                  :key="i"
                  class="product-card"
                  @click="showDetail(i)"
                >
                  <div class="product-img">{{ item.img }}</div>
                  <div class="product-info">
                    <h4>{{ item.name }}</h4>
                    <div class="product-meta">
                      <span class="product-price" :style="{ color: portalConfig.color }">{{
                        item.price
                      }}</span
                      ><span v-if="item.originalPrice" class="product-original">{{
                        item.originalPrice
                      }}</span>
                    </div>
                    <div class="product-bottom">
                      <span class="product-sales"
                        >{{ item.sales }}{{ isServiceType ? '' : '人购买' }}</span
                      ><el-tag
                        v-if="item.tag"
                        size="small"
                        :style="{
                          background: portalConfig.color,
                          borderColor: portalConfig.color,
                          color: '#fff',
                        }"
                        >{{ item.tag }}</el-tag
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="currentTab === 'business'" class="business-page">
            <div class="business-header">
              <h3>{{ portalConfig.business.listTitle }}</h3>
              <div class="filter-bar">
                <el-radio-group v-model="currentFilter" size="small"
                  ><el-radio-button
                    v-for="f in portalConfig.business.filters"
                    :key="f"
                    :label="f"
                    >{{ f }}</el-radio-button
                  ></el-radio-group
                >
              </div>
              <el-select v-model="currentSort" size="small" style="width: 160px"
                ><el-option
                  v-for="s in portalConfig.business.sortOptions"
                  :key="s"
                  :label="s"
                  :value="s"
              /></el-select>
            </div>
            <div class="business-list">
              <div
                v-for="(item, i) in portalConfig.business.products"
                :key="i"
                class="business-item"
                @click="showDetail(i)"
              >
                <div class="biz-img">{{ item.img }}</div>
                <div class="biz-info">
                  <h4>{{ item.name }}</h4>
                  <div class="biz-price-row">
                    <span class="biz-price" :style="{ color: portalConfig.color }">{{
                      item.price
                    }}</span
                    ><span v-if="item.rating" class="biz-rating">⭐ {{ item.rating }}</span>
                  </div>
                  <div class="biz-meta">
                    <span>{{ item.sales }}{{ isServiceType ? '' : '人购买' }}</span>
                    <div v-if="item.specs" class="biz-specs">
                      <el-tag v-for="spec in item.specs" :key="spec" size="small" type="info">{{
                        spec
                      }}</el-tag>
                    </div>
                  </div>
                </div>
                <el-button
                  :style="{
                    background: portalConfig.color,
                    borderColor: portalConfig.color,
                    color: '#fff',
                  }"
                  size="small"
                  @click.stop="handleAction(item)"
                  >{{ isServiceType ? '立即办理' : '立即购买' }}</el-button
                >
              </div>
            </div>
            <div class="business-pagination">
              <el-pagination small layout="prev, pager, next" :total="50" :page-size="10" />
            </div>
          </div>
          <div v-else-if="currentTab === 'personal'" class="personal-page">
            <div
              class="personal-header"
              :style="{
                background: `linear-gradient(135deg, ${portalConfig.color}, ${adjustColor(portalConfig.color, 30)})`,
              }"
            >
              <div class="user-info">
                <span class="user-avatar-lg">{{ portalConfig.personal.userAvatar }}</span>
                <div>
                  <h3>{{ portalConfig.personal.userName }}</h3>
                  <el-tag
                    size="small"
                    :style="{
                      background: 'rgba(255,255,255,0.2)',
                      color: '#fff',
                      borderColor: 'transparent',
                    }"
                    >{{ portalConfig.personal.userLevel }}</el-tag
                  >
                </div>
              </div>
            </div>
            <div class="personal-menus">
              <div
                v-for="(menu, i) in portalConfig.personal.menus"
                :key="i"
                class="personal-menu-item"
                @click="currentSubPage = menu.label"
              >
                <el-icon :size="24" :color="portalConfig.color"
                  ><component :is="menu.icon" /></el-icon
                ><span>{{ menu.label }}</span
                ><el-badge
                  v-if="menu.count"
                  :value="menu.count"
                  :max="99"
                  class="menu-badge"
                /><el-icon class="arrow"><ArrowRight /></el-icon>
              </div>
            </div>
            <div class="personal-orders">
              <div class="section-header">
                <h3>{{ orderLabel }}</h3>
              </div>
              <div v-for="(order, i) in portalConfig.personal.orders" :key="i" class="order-item">
                <div class="order-main">
                  <span class="order-id">{{ order.id }}</span
                  ><span class="order-product">{{ order.product }}</span>
                </div>
                <div class="order-meta">
                  <span
                    v-if="order.amount"
                    class="order-amount"
                    :style="{ color: portalConfig.color }"
                    >{{ order.amount }}</span
                  ><el-tag :type="getOrderStatusType(order.status)" size="small">{{
                    order.status
                  }}</el-tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </main>
    <el-dialog
      v-model="showDetailDialog"
      :title="detailData.name"
      width="500px"
      :close-on-click-modal="true"
    >
      <div v-if="detailData" class="detail-dialog">
        <div class="detail-images">
          <div
            v-for="(img, i) in portalConfig.business.detailProduct.images"
            :key="i"
            class="detail-img"
          >
            {{ img }}
          </div>
        </div>
        <div class="detail-info">
          <h3>{{ portalConfig.business.detailProduct.name }}</h3>
          <div class="detail-price-row">
            <span class="detail-price" :style="{ color: portalConfig.color }">{{
              portalConfig.business.detailProduct.price
            }}</span
            ><span
              v-if="portalConfig.business.detailProduct.originalPrice"
              class="detail-original"
              >{{ portalConfig.business.detailProduct.originalPrice }}</span
            >
          </div>
          <p class="detail-desc">{{ portalConfig.business.detailProduct.description }}</p>
          <div class="detail-features">
            <el-tag
              v-for="f in portalConfig.business.detailProduct.features"
              :key="f"
              size="small"
              :style="{
                background: portalConfig.color + '15',
                color: portalConfig.color,
                borderColor: portalConfig.color + '30',
              }"
              >{{ f }}</el-tag
            >
          </div>
        </div>
      </div>
      <template #footer
        ><el-button @click="showDetailDialog = false">取消</el-button
        ><el-button
          type="primary"
          :style="{ background: portalConfig.color, borderColor: portalConfig.color }"
          @click="handleDetailAction"
          >{{ isServiceType ? '立即办理' : '加入购物车' }}</el-button
        ></template
      >
    </el-dialog>
    <div class="portal-footer">
      <p>© 2026 {{ portalConfig.name }} · 由 AI 后台模板工厂生成</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { Monitor, ArrowRight, Iphone, Search } from '@element-plus/icons-vue';
import userPortalConfigs from '@/config/userPortal.js';
import { h5Configs } from '@/config/h5Configs.js';
import PhoneShell from '@/components/PhoneShell.vue';
import { getList, submitPortalOrder } from '@/api/index.js';

const H5Empty = {
  props: { type: String, color: { type: String, default: '#999' } },
  template: `<div style="padding:60px 20px;text-align:center"><div style="font-size:48px;margin-bottom:12px">📭</div><div style="color:#999;font-size:14px">{{ type === 'order' ? '暂无订单' : type === 'repair' ? '暂无报修' : '暂无数据' }}</div></div>`,
};

const route = useRoute();
const router = useRouter();
const currentTab = ref('home');
const currentFilter = ref('');
const currentSort = ref('');
const currentSubPage = ref('');
const showDetailDialog = ref(false);
const detailData = ref({});
const homeLoading = ref(true);
const businessLoading = ref(false);
const apiData = ref({});

const industryKey = computed(() => route.params.industry || 'ecommerce');
const isH5Mode = computed(() => route.query.mode === 'h5');
const portalConfig = computed(
  () => userPortalConfigs[industryKey.value] || userPortalConfigs.ecommerce
);
const h5Config = computed(() => h5Configs[industryKey.value] || h5Configs.ecommerce);
const isServiceType = computed(() =>
  ['government', 'hr', 'finance', 'community', 'project'].includes(industryKey.value)
);

const orderLabel = computed(() => {
  const labels = {
    ecommerce: '最近订单',
    education: '学习记录',
    government: '我的办件',
    medical: '预约记录',
    logistics: '物流订单',
    hr: '审批记录',
    finance: '报销记录',
    restaurant: '消费记录',
    community: '服务记录',
    project: '任务记录',
  };
  return labels[industryKey.value] || '最近记录';
});

const currentTitle = computed(() => {
  const tab = h5Config.value.tabs.find(t => t.key === currentTab.value);
  return tab?.label === '首页' ? h5Config.value.appName : tab?.label || h5Config.value.appName;
});

const actionLabel = computed(() => (isServiceType.value ? '办理' : '购买'));

const pcTabs = computed(() => [
  { key: 'home', label: '首页', icon: 'HomeFilled' },
  { key: 'business', label: isServiceType.value ? '业务办理' : '商品列表', icon: 'Goods' },
  { key: 'personal', label: '个人中心', icon: 'User' },
]);

const formatPrice = item => {
  if (item.fee) return item.fee;
  if (item.price !== undefined)
    return typeof item.price === 'number' ? `¥${item.price}` : item.price;
  if (item.amount !== undefined)
    return typeof item.amount === 'number' ? `¥${item.amount}` : item.amount;
  return '';
};

const getItemIcon = _item => {
  const icons = {
    ecommerce: '📦',
    education: '📘',
    government: '📋',
    medical: '🏥',
    logistics: '📦',
    hr: '📋',
    finance: '🧾',
    restaurant: '🍽️',
    community: '🏠',
    project: '📋',
  };
  return icons[industryKey.value] || '📦';
};

const fetchApiData = async tabKey => {
  const resource = h5Config.value.apiResources[tabKey];
  if (!resource) return;
  try {
    const res = await getList(industryKey.value, resource, { pageSize: 20 });
    apiData.value[tabKey] = res.data?.list || [];
  } catch (e) {
    console.error('API请求失败:', e);
    apiData.value[tabKey] = [];
  }
};

const loadHomeData = async () => {
  homeLoading.value = true;
  await Promise.all([
    fetchApiData('home'),
    fetchApiData('personal'),
    h5Config.value.apiResources.notice ? fetchApiData('notice') : Promise.resolve(),
    h5Config.value.apiResources.task ? fetchApiData('task') : Promise.resolve(),
  ]);
  homeLoading.value = false;
};

watch(currentTab, async val => {
  if (val !== 'home' && val !== 'personal' && !apiData.value[val]?.length) {
    businessLoading.value = true;
    await fetchApiData(val);
    businessLoading.value = false;
  }
});

watch(
  () => route.params.industry,
  () => {
    currentTab.value = 'home';
    apiData.value = {};
    currentFilter.value = portalConfig.value.business.filters[0] || '';
    currentSort.value = portalConfig.value.business.sortOptions[0] || '';
    loadHomeData();
  }
);

const showDetail = idx => {
  detailData.value = portalConfig.value.business.products[idx] || {};
  showDetailDialog.value = true;
};
const showItemDetail = item => {
  detailData.value = item;
  ElMessage.info(`查看「${item.name || item.title}」详情`);
};

const handleAction = async item => {
  try {
    await submitPortalOrder(industryKey.value, {
      product: item.name || item.title,
      amount: item.price || item.amount || 0,
      customer: portalConfig.value.personal.userName,
    });
  } catch (e) {
    /* */
  }
  ElMessage.success(
    isServiceType.value
      ? `已提交「${item.name || item.title}」申请`
      : `已将「${item.name || item.title}」加入购物车`
  );
};

const handleDetailAction = async () => {
  showDetailDialog.value = false;
  try {
    await submitPortalOrder(industryKey.value, {
      product: portalConfig.value.business.detailProduct.name,
      amount: portalConfig.value.business.detailProduct.price,
    });
  } catch (e) {
    /* */
  }
  ElMessage.success(isServiceType.value ? '提交成功' : '已加入购物车');
};

const handleQuickAction = cat => {
  const tabMap = {
    考勤打卡: 'attendance',
    请假申请: 'approval',
    审批中心: 'approval',
    在线报修: 'repair',
    物业缴费: 'repair',
    活动报名: 'activity',
    任务看板: 'task',
    项目列表: 'project',
    报销申请: 'reimburse',
    工资查询: 'personal',
    发票管理: 'invoice',
  };
  const target = tabMap[cat.name];
  if (target) currentTab.value = target;
  else ElMessage.info(`「${cat.name}」功能开发中`);
};

const goToBackend = () => {
  const keyToId = {
    ecommerce: 1,
    education: 2,
    government: 3,
    medical: 4,
    logistics: 5,
    restaurant: 6,
    finance: 8,
    hr: 9,
    project: 10,
    community: 11,
  };
  router.push(`/preview/${keyToId[industryKey.value] || 1}`);
};
const switchToH5 = () => router.push(`/h5/${industryKey.value}/home`);
const switchToPc = () => router.push(`/user-portal/${industryKey.value}`);

const getOrderStatusType = status => {
  if (!status) return 'info';
  if (
    [
      '已完成',
      '已签收',
      '已就诊',
      '已批准',
      '已审批',
      '已办结',
      '已处理',
      '已退款',
      '已取药',
      '已入职',
      '已到账',
      '已发放',
    ].some(k => status.includes(k))
  )
    return 'success';
  if (
    [
      '运输中',
      '待发货',
      '已预约',
      '审批中',
      '办理中',
      '处理中',
      '进行中',
      '候诊中',
      '待取餐',
      '已挂号',
      '执行中',
      '已申请',
    ].some(k => status.includes(k))
  )
    return 'warning';
  if (['已取消', '逾期', '已拒绝', '已驳回', '缺勤'].some(k => status.includes(k))) return 'danger';
  return 'info';
};

const adjustColor = (color, amount) => {
  const hex = color.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

currentFilter.value = portalConfig.value.business.filters[0] || '';
currentSort.value = portalConfig.value.business.sortOptions[0] || '';
onMounted(() => loadHomeData());
</script>

<style lang="scss" scoped>
.h5-preview-page {
  background: #1a1a2e;
  min-height: 100vh;
}

.h5-app {
  --theme: #409eff;
  background: #f5f7fa;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 13px;
  overflow: hidden;
  width: 375px;
}

.h5-navbar {
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  flex-shrink: 0;
  z-index: 10;
  .navbar-left,
  .navbar-right {
    width: 40px;
    display: flex;
    align-items: center;
  }
  .navbar-right {
    justify-content: flex-end;
  }
  .navbar-back {
    font-size: 22px;
    color: #fff;
    cursor: pointer;
    font-weight: 300;
  }
  .navbar-title {
    flex: 1;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    margin: 0;
  }
}

.h5-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    width: 0;
  }
}

.h5-tabbar {
  display: flex;
  background: #fff;
  border-top: 0.5px solid #eee;
  padding: 4px 0 20px;
  flex-shrink: 0;
  z-index: 10;
  .tabbar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    font-size: 10px;
    color: #999;
    cursor: pointer;
    transition: color 0.2s;
    &.active {
      font-weight: 600;
    }
  }
}

.h5-fade-enter-active {
  transition: opacity 0.2s ease;
}
.h5-fade-leave-active {
  transition: opacity 0.1s ease;
}
.h5-fade-enter-from,
.h5-fade-leave-to {
  opacity: 0;
}

.h5-search {
  margin: 8px 12px;
  padding: 8px 12px;
  background: #fff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #999;
  font-size: 13px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  cursor: pointer;
}

.h5-banner {
  margin: 0 12px 8px;
  border-radius: 12px;
  overflow: hidden;
  .banner-slide {
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    h3 {
      font-size: 18px;
      font-weight: 700;
      margin: 0 0 4px;
    }
    p {
      font-size: 12px;
      margin: 0;
      opacity: 0.9;
    }
  }
}

.h5-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
  padding: 8px 12px;
  background: #fff;
  margin: 0 12px 8px;
  border-radius: 12px;
  &.h5-grid-5 {
    grid-template-columns: repeat(5, 1fr);
  }
  &.h5-grid-4 {
    grid-template-columns: repeat(4, 1fr);
  }
  .grid-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px 4px;
    cursor: pointer;
    border-radius: 8px;
    transition: background 0.2s;
    &:active {
      background: #f5f5f5;
    }
    .grid-icon {
      font-size: 24px;
    }
    .grid-label {
      font-size: 11px;
      color: #333;
    }
    &.grid-item-lg .grid-icon {
      font-size: 28px;
    }
  }
}

.h5-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 12px 8px;
  .section-title {
    font-size: 15px;
    font-weight: 700;
    color: #333;
  }
  .section-more {
    font-size: 12px;
    cursor: pointer;
  }
}

.h5-waterfall {
  padding: 0 12px 80px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  .waterfall-card {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
    &:active {
      transform: scale(0.98);
    }
    .waterfall-img {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      background: #fafafa;
    }
    .waterfall-info {
      padding: 8px;
      h4 {
        font-size: 12px;
        font-weight: 600;
        color: #333;
        margin: 0 0 4px;
        line-height: 1.3;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .waterfall-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .waterfall-price {
        font-size: 14px;
        font-weight: 700;
      }
      .waterfall-sales {
        font-size: 10px;
        color: #999;
      }
    }
  }
}

.h5-list {
  padding: 0 12px 80px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.list-card {
  display: flex;
  gap: 10px;
  background: #fff;
  border-radius: 12px;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  align-items: center;
  &:active {
    background: #fafafa;
  }
  .list-img {
    width: 56px;
    height: 56px;
    background: #f5f7fa;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    flex-shrink: 0;
  }
  .list-info {
    flex: 1;
    min-width: 0;
    h4 {
      font-size: 13px;
      font-weight: 600;
      color: #333;
      margin: 0 0 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .list-meta {
      font-size: 11px;
      color: #999;
      margin-bottom: 4px;
    }
    .list-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .list-price {
      font-size: 15px;
      font-weight: 700;
    }
    .list-sales {
      font-size: 11px;
      color: #999;
    }
  }
}

.doctor-card {
  display: flex;
  gap: 10px;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  align-items: center;
  &:active {
    background: #fafafa;
  }
  .doctor-avatar {
    width: 48px;
    height: 48px;
    background: #f5f7fa;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    flex-shrink: 0;
  }
  .doctor-info {
    flex: 1;
    h4 {
      font-size: 14px;
      font-weight: 600;
      color: #333;
      margin: 0 0 4px;
    }
    .doctor-meta {
      font-size: 11px;
      color: #999;
      margin-bottom: 4px;
      span {
        margin-right: 8px;
      }
    }
    .doctor-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .doctor-fee {
      font-size: 15px;
      font-weight: 700;
    }
    .doctor-rating {
      font-size: 12px;
      color: #999;
    }
  }
}

.notice-card {
  display: flex;
  gap: 10px;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  align-items: center;
  &:active {
    background: #fafafa;
  }
  .notice-badge {
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 11px;
    color: #fff;
    flex-shrink: 0;
  }
  .notice-info {
    flex: 1;
    h4 {
      font-size: 13px;
      font-weight: 500;
      color: #333;
      margin: 0 0 4px;
    }
    .notice-date {
      font-size: 11px;
      color: #999;
    }
  }
}

.todo-card {
  display: flex;
  gap: 10px;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  align-items: center;
  &:active {
    background: #fafafa;
  }
  .todo-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 4px;
  }
  .todo-info {
    flex: 1;
    h4 {
      font-size: 13px;
      font-weight: 500;
      color: #333;
      margin: 0 0 2px;
    }
    span {
      font-size: 11px;
      color: #999;
    }
  }
}

.project-card {
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  &:active {
    background: #fafafa;
  }
  .project-progress {
    height: 4px;
    background: #f0f0f0;
    border-radius: 2px;
    margin-bottom: 8px;
    .progress-bar {
      height: 100%;
      width: var(--progress);
      background: var(--color);
      border-radius: 2px;
    }
  }
  .project-info {
    h4 {
      font-size: 13px;
      font-weight: 600;
      color: #333;
      margin: 0 0 2px;
    }
    span {
      font-size: 11px;
      color: #999;
    }
  }
}

.salary-card {
  margin: 0 12px 8px;
  border-radius: 12px;
  padding: 16px;
  color: #fff;
  .salary-label {
    font-size: 12px;
    opacity: 0.8;
  }
  .salary-amount {
    font-size: 28px;
    font-weight: 700;
    margin: 4px 0;
  }
  .salary-date {
    font-size: 12px;
    opacity: 0.7;
  }
}

.member-card {
  margin: 0 12px 8px;
  border-radius: 12px;
  padding: 14px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .member-info {
    display: flex;
    align-items: center;
    gap: 10px;
    .member-avatar {
      font-size: 24px;
    }
    .member-name {
      font-size: 14px;
      font-weight: 600;
    }
    .member-level {
      font-size: 11px;
      opacity: 0.8;
    }
  }
  .member-points {
    font-size: 16px;
    font-weight: 700;
  }
}

.h5-personal {
  .user-card {
    margin: 8px 12px;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: #fff;
    .user-avatar {
      width: 44px;
      height: 44px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }
    h3 {
      font-size: 16px;
      font-weight: 700;
      margin: 0 0 2px;
    }
    .user-level {
      font-size: 11px;
      opacity: 0.8;
    }
  }
  .menu-list {
    background: #fff;
    margin: 0 12px 8px;
    border-radius: 12px;
    overflow: hidden;
    .menu-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      border-bottom: 0.5px solid #f5f5f5;
      cursor: pointer;
      &:last-child {
        border-bottom: none;
      }
      span {
        flex: 1;
        font-size: 14px;
        color: #333;
      }
      .menu-arrow {
        color: #ccc;
        font-size: 12px;
      }
    }
  }
  .order-list {
    padding: 0 12px 80px;
  }
  .order-item {
    background: #fff;
    border-radius: 12px;
    padding: 10px 12px;
    margin-bottom: 6px;
    .order-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
      .order-product {
        font-size: 13px;
        font-weight: 500;
        color: #333;
      }
    }
    .order-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .order-id {
        font-size: 11px;
        color: #999;
      }
      .order-amount {
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
}

.h5-loading {
  padding: 12px;
  .skeleton-banner {
    height: 120px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 12px;
    margin-bottom: 8px;
  }
  .skeleton-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-bottom: 12px;
    .skeleton-item {
      height: 60px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 8px;
    }
  }
  .skeleton-card {
    height: 72px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 12px;
    margin-bottom: 8px;
  }
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.user-portal {
  min-height: 100vh;
  background: #f5f7fa;
  --theme-color: #409eff;
}
.portal-header {
  padding: 0 20px;
  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .portal-logo {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
  }
  .header-info {
    h1 {
      font-size: 20px;
      font-weight: 700;
      color: #fff;
      margin: 0;
    }
    p {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .user-avatar {
    width: 36px;
    height: 36px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
  }
}
.portal-nav {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  .nav-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
  }
  .nav-item {
    padding: 14px 28px;
    font-size: 15px;
    font-weight: 500;
    color: #666;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    border-bottom: 3px solid transparent;
    &.active {
      color: var(--theme-color);
      border-bottom-color: var(--theme-color);
      font-weight: 600;
    }
  }
}
.portal-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: calc(100vh - 200px);
}
.fade-slide-enter-active {
  transition: all 0.25s ease-out;
}
.fade-slide-leave-active {
  transition: all 0.15s ease-in;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.fade-slide-leave-to {
  opacity: 0;
}
.banner-section {
  margin-bottom: 24px;
  border-radius: 12px;
  overflow: hidden;
  .banner-item {
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    h2 {
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 8px;
    }
    p {
      font-size: 16px;
      margin: 0;
      opacity: 0.9;
    }
  }
}
.category-section {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  .category-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 12px;
  }
  .category-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 12px 8px;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background: #f5f7fa;
    }
    .cat-icon {
      font-size: 32px;
    }
    .cat-name {
      font-size: 13px;
      color: #333;
    }
  }
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }
}
.hot-section {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  .product-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .product-card {
    border: 1px solid #f0f0f0;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    &:hover {
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    }
    .product-img {
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 56px;
      background: #fafafa;
    }
    .product-info {
      padding: 12px 16px;
      h4 {
        font-size: 14px;
        font-weight: 600;
        margin: 0 0 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .product-meta {
        display: flex;
        align-items: baseline;
        gap: 8px;
        margin-bottom: 6px;
        .product-price {
          font-size: 18px;
          font-weight: 700;
        }
        .product-original {
          font-size: 12px;
          color: #999;
          text-decoration: line-through;
        }
      }
      .product-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .product-sales {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
.business-page {
  .business-header {
    background: #fff;
    border-radius: 12px;
    padding: 16px 20px;
    margin-bottom: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    h3 {
      font-size: 18px;
      font-weight: 600;
      margin: 0;
    }
  }
  .business-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .business-item {
    background: #fff;
    border-radius: 10px;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    .biz-img {
      width: 64px;
      height: 64px;
      background: #f5f7fa;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      flex-shrink: 0;
    }
    .biz-info {
      flex: 1;
      h4 {
        font-size: 15px;
        font-weight: 600;
        margin: 0 0 6px;
      }
      .biz-price-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 6px;
        .biz-price {
          font-size: 18px;
          font-weight: 700;
        }
      }
      .biz-meta {
        font-size: 13px;
        color: #999;
      }
    }
  }
  .business-pagination {
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }
}
.personal-page {
  .personal-header {
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 16px;
    .user-info {
      display: flex;
      align-items: center;
      gap: 16px;
      .user-avatar-lg {
        width: 60px;
        height: 60px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
      }
      h3 {
        font-size: 20px;
        font-weight: 700;
        color: #fff;
        margin: 0 0 4px;
      }
    }
  }
  .personal-menus {
    background: #fff;
    border-radius: 12px;
    padding: 8px 0;
    margin-bottom: 16px;
  }
  .personal-menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    cursor: pointer;
    span {
      flex: 1;
      font-size: 15px;
      color: #333;
    }
    .arrow {
      color: #ccc;
    }
  }
  .personal-orders {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
  }
  .order-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f5f5f5;
    &:last-child {
      border-bottom: none;
    }
    .order-main {
      display: flex;
      align-items: center;
      gap: 12px;
      .order-id {
        font-size: 12px;
        color: #999;
      }
      .order-product {
        font-size: 14px;
        color: #333;
      }
    }
    .order-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      .order-amount {
        font-size: 15px;
        font-weight: 600;
      }
    }
  }
}
.detail-dialog {
  .detail-images {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    .detail-img {
      flex: 1;
      height: 120px;
      background: #f5f7fa;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
    }
  }
  .detail-info {
    h3 {
      font-size: 18px;
      font-weight: 700;
      margin: 0 0 10px;
    }
    .detail-price-row {
      display: flex;
      align-items: baseline;
      gap: 10px;
      margin-bottom: 12px;
      .detail-price {
        font-size: 24px;
        font-weight: 700;
      }
      .detail-original {
        font-size: 14px;
        color: #999;
        text-decoration: line-through;
      }
    }
    .detail-desc {
      font-size: 14px;
      color: #666;
      line-height: 1.6;
      margin-bottom: 12px;
    }
    .detail-features {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  }
}
.portal-footer {
  text-align: center;
  padding: 24px;
  color: #999;
  font-size: 13px;
  border-top: 1px solid #f0f0f0;
  background: #fff;
}
@media (max-width: 768px) {
  .category-grid {
    grid-template-columns: repeat(4, 1fr) !important;
  }
  .product-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
</style>
