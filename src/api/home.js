// 提供首页接口api函数
import request from '@/utils/request'

/**
 * 获取品牌
 * @param {Integer} limit -- 品牌个数
 * @returns Promise
 */
export const findBrand = (limit = 6) => {
  return request('/home/brand', 'get', { limit })
}

/**
 * 请求轮播图数据
 * @returns Promise
 */
export const findBanner = () => {
  return request('/home/banner', 'get')
}

/**
 * 获取新鲜好物数据
 * @returns Promise
 */
export const findNew = () => {
  return request('/home/new', 'get')
}

/**
 * 获取人气推荐数据
 * @returns Promise
 */
export const findHot = () => {
  return request('home/hot', 'get')
}
