// 商品相关api函数
import request from '@/utils/request'

/**
 * 获取商品详情
 * @param {String} id 商品id
 */
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}

/**
 *  获取相关推荐||猜你喜欢
 * @param {string} id 商品id，传入相关推荐，不传猜你喜欢
 * @param {Integer} limit 商品数量
 * @returns
 */
export const findRelevantGoods = ({ id, limit = 16 }) => {
  return request('/goods/relevant', 'get', { id, limit })
}

/**
 * 获取热销榜数据
 * @param {*} id 商品id
 * @param {*} limit 商品数量
 * @param {*} type 热销类型
 * @returns
 */
export const findGoodsHot = ({ id, limit = 3, type = 1 }) => {
  return request('/goods/hot', 'get', { id, limit, type })
}

/**
 * 查询商品评价
 * @param {String} id
 * @returns
 */
export const findGoodsCommentInfo = (id) => {
  // return request(`/goods/${id}/evaluate`, 'get')
  // mock地址
  // axios 遇见 http https 开头的地址，不会加上基准地址
  return request(
    `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`,
    'get'
  )
}

/**
 * 查询商品评价列表
 * @param {String} id - 商品ID
 * @param {Object} params - 商品ID
 * @returns
 */
export const findGoodsCommentList = (id, params) => {
  return request(
    `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`,
    'get',
    params
  )
}
