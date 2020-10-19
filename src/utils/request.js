import axios from 'axios'
import jsonBig from 'json-bigint'


const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }]
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  if (window.sessionStorage.getItem('user'))
    config.headers.Authorization = 'Bearer ' + JSON.parse(window.sessionStorage.getItem('user')).token
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (window.sessionStorage.getItem('user'))
    return response.data.data;
  else
    return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
export default request