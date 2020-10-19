/* 文章相关请求api */

import request from '@/utils/request'

export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

/**
 * 获取新闻文章详情
 */
export const getArticlesContent = (article_id) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${article_id}`,
  })
}

/**
 * 收藏文章
 */
export const startCollections = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data
  })
}

/**
 * 取消收藏文章
 */
export const closeCollections = (target) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`,
  })
}

/**
 * 点赞文章
 */
export const startlikings = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data
  })
}

/**
 * 取消点赞文章
 */
export const closelikings = (target) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${target}`,
  })
}