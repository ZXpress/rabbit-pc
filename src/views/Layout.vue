<template>
  <div>
    <!-- 顶部通栏 -->
    <AppNavbar />
    <!-- 头部组件 -->
    <AppHeader />
    <div class="app-body">
      <!-- 二级路由 -->
      <!-- <RouterView /> -->
      <router-view />
    </div>
    <!-- 底部组件 -->
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from '@/components/app-navbar'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
export default {
  name: 'Layout',
  components: {
    AppNavbar,
    AppHeader,
    AppFooter
  }
}
</script>
<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>
