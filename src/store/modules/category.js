// 分类模块
import { topCategory } from '@/api/constants'
import { findAllCateGory } from '@/api/category'
export default {
  namespaced: true,
  state () {
    return {
      // 分类信息
      list: topCategory.map((item) => ({ name: item }))
    }
  },
  // 修改分类函数
  mutations: {
    setList (state, payload) {
      state.list = payload
      console.log(payload)
    },
    // 显示和隐藏控制当前分类的二级分类显示和隐藏
    show (state, id) {
      // 首先找到当前分类
      const currCategory = state.list.find((item) => item.id === id)
      currCategory.open = true
    },
    hide (state, id) {
      const currCategory = state.list.find((item) => item.id === id)
      currCategory.open = false
    }
  },
  // 获取分类函数
  actions: {
    async getList (context) {
      // console.log(context.state.list);
      // 获取分类数据
      const data = await findAllCateGory()
      data.result.forEach((top) => {
        top.open = false
      })
      // 修改分类数据
      context.commit('setList', data.result)
    }
  }
}
