// 提供复用逻辑的函数（钩子）

import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

/**
 * 懒加载获取数据
 * @param {Object} target - Dom对象
 * @param {Function} apiFn - API函数  获取数据
 */
export const useLayzData = (apiFn) => {
  const result = ref([])
  const target = ref(null)
  // stop停止
  const { stop } = useIntersectionObserver(
    //   目标元素
    target,
    ([{ isIntersecting }], observerElement) => {
      // isIntersecting是否进入可视区
      if (isIntersecting) {
        console.log('进入可视区')
        stop()
        // 调用API函数获取数据
        apiFn().then((data) => {
          result.value = data.result
        })
      }
    },
    // 配置选项:相交的比例大于0就触发(懒加载的盒子与可视区域相交的比例)
    {
      threshold: 0
    }
  )
  return { result, target }
}
