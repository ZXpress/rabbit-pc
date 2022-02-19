<script>
import { h } from 'vue'
export default {
  name: 'XtxBread',
  // 但文件中template标签去掉
  // render返回值就是组件内容
  // vue2.0的h函数传参进来的，vue3.0的h函数数导入进来的
  // h第一个参数标签名  第二个参数标签的属性对象  第三个参数子节点
  // 需求：
  // 获取默认插槽内容
  // 去除xtx-bread-item组件的i标签，应该由render函数创建
  // 遍历插槽中item，得到动态创建的节点，最后一个item不加i标签
  // 把动态创建的节点渲染在子节点位置
  render () {
    const items = this.$slots.default()
    const dymanicItems = []
    items.forEach((item, i) => {
      dymanicItems.push(item)
      if (i < items.length - 1) {
        dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    // h第一个参数标签名  第二个参数标签的属性对象  第三个参数子节点
    return h('div', { class: 'xtx-bread' }, dymanicItems)
  }
}
</script>

<style lang="less">
// 去除scoped属性，目的让样式作用于item组件
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
