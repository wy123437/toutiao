/* 用户相关api */

import request from '@/utils/request'

/* 登录/注册 */
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

/* 发送验证码 */
export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`,
  })
}

/* 获取登录用户信息 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user',
  })
}

/* 获取用户频道列表 */
export const getChannelsList = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels',
  })
}

/**
 * 关注用户
 */
export const userFollowings = (target) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data:{
      target:target
    }
  })
}

/**
 * 关注用户
 */
export const userTarget = (target) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${target}`,
  })
}

