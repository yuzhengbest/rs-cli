import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { useErrorStore } from '@/store/error'
import { getUrlKey } from '@/utils/common'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

// 设置全局的请求次数，请求的间隙
// axios.defaults.retry = 3
// axios.defaults.retryDelay = 1000

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    /**
     * 请求头 token 设置
     */
    // const sysStore = useSysStore()
    // const token = sysStore.token
    // // 请求前处理
    // // 请求增加随机数，避免缓存
    // if (config.method === 'post' && (config.url || '').indexOf('?') > -1) {
    //   config.url += '&_=' + new Date().getTime()
    // } else {
    //   config.url += '?_=' + new Date().getTime()
    // }
    // config.headers['Access-Token'] = token
    return config
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  async (response) => {
    // const sysStore = useSysStore()
    const errorStore = useErrorStore()
    // 请求成功：2xx 范围内的状态码都会触发该函数
    const data = response.data
    // 处理接口无权限的情况
    if (data?.code === '2') {
      errorStore.setError({
        flag: true,
        message: data?.message || '无权限，即将跳转到登录页'
      })
    }
    return response
  },
  (err) => {
    // 请求失败
    console.log('axios请求出错：', err)
  }
)

/**
 * @description get请求方法
 * @return Promise
 */
export function get<T> (url: string, params: any = {}): Promise<T> {
  const urlList = url.split('?')
  if (urlList.length > 1) {
    Object.assign(params, getUrlKey(url))
  }
  return new Promise((resolve, reject) => {
    axios
      .get(urlList[0], {
        params: params
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

/**
 * @description post请求方法
 * @return Promise
 */
export function post<T> (url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * @description 文件上传的方法
 * @return Promise
 */
export function uploadFile<T> (url: string, params?: any): Promise<T> {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * @description 文件下载
 * @return Promise
 */
export function downloadFile (url: string, params: any) {
  const paramArray: any[] = []
  Object.getOwnPropertyNames(params).forEach(key => {
    paramArray.push(`${key}=${params[key]}`)
  })
  const downloadElement = document.createElement('a')
  downloadElement.href = `${url}?${paramArray.join('&')}`
  console.log(downloadElement.href)
  downloadElement.download = ''
  document.body.appendChild(downloadElement)
  downloadElement.click()
  document.body.removeChild(downloadElement)
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams (baseUrl: string, obj: any): string {
  let parameters = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters
}

export default axios
