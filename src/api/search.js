/**
 * 搜索内容接口
 */

import request from '@/utils/request'
/**
 * 
 * @param {获取联想建议（自动补全）} data 
 */
export const getSuggestion = (params) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params
  })
}

/**
 * 
 * @param 获取搜索结果
 */
export const getSuggestResult = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}

/**
 * 
 * @param 获取用户搜索历史数据
 */
export const getSuggestHistories = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories',
  })
}