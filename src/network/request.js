import axios from "axios"

export function request(config) {
  // 创建axios实例
  const axiosInstance = axios.create({
    baseURL: "http://123.207.32.32:8000",
    timeout: 5000
  })

  // axios拦截器
  axiosInstance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })

  axiosInstance.interceptors.response.use(result => {
    return result.data
  }, err => {
    console.log(err);
  })

  return axiosInstance(config)
}