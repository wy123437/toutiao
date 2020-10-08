import axios from 'axios'


const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
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