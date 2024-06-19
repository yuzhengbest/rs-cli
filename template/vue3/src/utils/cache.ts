import jsCookie from 'js-cookie'

/**
 * @description 设置缓存
 * @param key 键
 * @param value 值
 */
export function setCache(key: string, value: string) {
  switch (window.config?.cacheMode) {
    case 'sessionCookie':
      jsCookie.set(key, value)
      break
    case 'localStorage':
      localStorage.setItem(key, value)
      break
    case 'sessionStorage':
    default:
      sessionStorage.setItem(key, value)
      break
  }
}

/**
 * @description 获取缓存
 * @param key 键
 */
export function getCache(key: string) {
  let value = undefined
  switch (window.config?.cacheMode) {
    case 'sessionCookie':
      value = jsCookie.get(key)
      break
    case 'localStorage':
      value = localStorage.getItem(key)
      break
    case 'sessionStorage':
    default:
      value = sessionStorage.getItem(key)
      break
  }
  return value
}

/**
 * @description 删除缓存
 * @param key 键
 */
export function removeCache(key: string) {
  switch (window.config?.cacheMode) {
    case 'sessionCookie':
      jsCookie.remove(key)
      break
    case 'localStorage':
      localStorage.removeItem(key)
      break
    case 'sessionStorage':
    default:
      sessionStorage.removeItem(key)
      break
  }
}
