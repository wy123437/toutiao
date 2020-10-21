/**
 * 获取文章评论接口
 */
import request from '@/utils/request'

/**
 * 获取评论或评论回复
 */
export const getComments = (params) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}

/**
 * 对文章点赞
 */
export const Commentslikings = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data
  })
}

/**
 * 取消文章点赞
 */
export const closeCommentslikings = (target) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${target}`,
  })
}

/**
 * 添加评论或评论回复
 */
export const addcomments = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}