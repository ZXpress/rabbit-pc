<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑组件 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter @filter-change="filterChange" />
      <!-- 商品面板(排序组件，列表) -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort @sort-change="sortChange" />
        <!-- 列表 -->
        <ul>
          <li v-for="goods in goodsList" :key="goods.id">
            <GoodsItem :goods="goods" />
          </li>
        </ul>
        <!-- 无限加载组件 -->
        <XtxInfiniteLoading
          @infinite="getData"
          :loading="loading"
          :finished="finished"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import { findSubCategoryGoods } from '@/api/category'
import { useRoute } from 'vue-router'
export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter,
    SubSort,
    GoodsItem
  },
  setup () {
    const route = useRoute()
    // 加载中
    const loading = ref(false)
    // 是否加载完毕
    const finished = ref(false)
    // 商品列表数据
    const goodsList = ref([])
    // 请求参数
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    const getData = () => {
      loading.value = true
      // 设置二级分类的id
      reqParams.categoryId = route.params.id
      findSubCategoryGoods(reqParams).then(({ result }) => {
        // 获取数据成功
        if (result.items.length) {
          goodsList.value.push(...result.items)
          // 把page加一
          reqParams.page++
        } else {
          // 没有数据加载完成
          finished.value = true
        }
        loading.value = false
      })
    }
    // 在更改二级分类的时候需要重新加载数据
    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && `/category/sub/${newVal}` === route.path) {
          finished.value = false
          goodsList.value = []
          reqParams = {
            page: 1,
            pageSize: 20
          }
        }
      }
    )

    // 1.更改排序组件的筛选数据，重新请求
    const sortChange = (sortParams) => {
      console.log(sortParams)
      finished.value = false
      // 合并参数，保留之前的参数
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
      goodsList.value = []
    }
    // 2.更改筛选组件的筛选数据，重新请求
    const filterChange = (filterParams) => {
      console.log(filterParams)
      finished.value = false
      // 合并参数，保留之前的参数
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      goodsList.value = []
    }

    return { getData, loading, finished, goodsList, sortChange, filterChange }
  }
}
</script>
<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
