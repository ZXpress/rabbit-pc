// 定义分类相关的api接口
import request from '@/utils/request'

// 获取所有分类 return Promise
export const findAllCateGory = () => {
  return request('/home/category/head', 'get')
}

/**
 * 获取顶级类目信息（children属性：各个子分类）
 * @param {String} id  顶级类目id
 * @returns Promise
 */
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}
