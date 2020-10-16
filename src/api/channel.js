/**
 * 频道列表接口
 */

import request from '@/utils/request'

/**
 * 获取所有频道列表
 */
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels',
  })
}

/**
 * 批量修改用户频道列表（重置式）
 */
export const addUserChannels = (data) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data
  })
}
/**
 * 删除指定用户频道
 */
export const DeletUserChannels = (id) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${id}`,
  })
}