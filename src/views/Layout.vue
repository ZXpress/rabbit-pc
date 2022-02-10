<template>
  <div class="container">
    <nav>顶部</nav>
    <header>头部</header>
    <div class="main">
      <!-- 二级路由 -->
      <!-- <RouterView /> -->
      <router-view />
    </div>
    <footer>底部</footer>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>
