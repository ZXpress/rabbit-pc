<template>
  <div class="home-banner">
    <XtxCarousel :sliders="sliders" autoPlay />
  </div>
</template>

<script>
import { findBanner } from '@/api/home'
import { ref } from 'vue'
export default {
  name: 'HomeBanner',
  setup () {
    const sliders = ref([])
    findBanner()
      .then((data) => {
        sliders.value = data.result
      })
      .catch((err) => {
        console.log(err)
      })
    return { sliders }
  }
}
</script>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}

// 覆盖原来轮播图样式
.xtx-carousel {
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>
