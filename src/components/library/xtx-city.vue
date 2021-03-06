<template>
  <!-- 城市组件 -->
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{ active: visible }">
      <span v-if="!fullLocation" class="placeholder">请选择配送地址</span>
      <span v-else class="value">{{ fullLocation }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show="visible">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span
          class="ellipsis"
          @click="changeItem(item)"
          v-for="item in currList"
          :key="item.code"
          >{{ item.name }}</span
        >
      </template>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
export default {
  name: 'XtxCity',
  props: {
    fullLocation: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    // 控制显示隐藏
    const visible = ref(false)

    // 所有城市数据
    const allCityData = ref([])
    // 是否正在加载城市数据
    const loading = ref(false)

    // 打开和关闭的方法
    const open = () => {
      visible.value = true
      // 获取城市数据
      loading.value = true
      getCityData().then((data) => {
        allCityData.value = data
        loading.value = false
      })
      // 清空之前的选择
      for (const key in changeResult) {
        changeResult[key] = ''
      }
    }
    const close = () => {
      visible.value = false
    }
    // 提供切换函数给select使用
    const toggle = () => {
      visible.value ? close() : open()
    }
    // 点击组件外部关闭对话框
    const target = ref(null)
    onClickOutside(target, () => {
      // 参数：监听的元素，点击元素之外触发的回调函数
      close()
    })

    // 实现计算属性：获取当前显示的地区列表数组
    const currList = computed(() => {
      // 默认显示省一级
      let list = allCityData.value
      // 市一级
      if (changeResult.provinceCode && changeResult.provinceName) {
        list = list.find((p) => p.code === changeResult.provinceCode).areaList
      }
      // 县地区一级
      if (changeResult.cityCode && changeResult.cityName) {
        list = list.find((c) => c.code === changeResult.cityCode).areaList
      }
      return list
    })

    // 定义选择的省市区数据
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''
    })
    // 当点击城市后记录
    const changeItem = (item) => {
      if (item.level === 0) {
        // 省级
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
      }
      if (item.level === 1) {
        // 市级
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      }
      if (item.level === 2) {
        // 地区
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
        // 拼接完整名字
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
        // 最后一级选完了，关闭对话框，数据通知给父组件
        close()
        emit('change', changeResult)
      }
    }

    return { visible, toggle, target, loading, currList, changeItem }
  }
}
// 获取城市数据函数
const getCityData = () => {
  // 数据：https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
  // 1. 当本地没有缓存，发请求获取数据
  // 2. 当本地缓存，取出本地数据
  // 返回promise在then获取数据，这里可能是异步操作可能是同步操作
  return new Promise((resolve, reject) => {
    // 约定：数据存储在window上的cityData字段
    if (window.cityData) {
      resolve(window.cityData)
    } else {
      const url =
        'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then((res) => {
        // 缓存
        window.cityData = res.data
        resolve(res.data)
      })
    }
  })
}
</script>

<style lang="less" scoped>
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    // 省略...
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
