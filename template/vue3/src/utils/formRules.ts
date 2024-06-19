export const patterns = {
  email: /^[a-zA-Z\d_.-]+@[a-zA-Z\d-]+(\.[a-zA-Z\d-]+)*\.[a-zA-Z\d]{2,6}$/, // 邮箱
  phone: /^1\d{10}$/, // 手机
  identityCard: /^(\w{15}|\w{18})$/, // 身份证（先按不严格模式来）
  dm: /^[a-zA-Z0-9]+$/, // 不可为中文
  int: /^[1-9][0-9]*$///, // 正整数
}

/**
 * @description 校验手机号码
 * @date 2023-07-27 16:24:42
 * @author 2028
 */
export const validatePhone = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入手机号码'))
  } else if (!patterns.phone.test(value)) {
    callback(new Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}

/**
 * @description 校验邮箱
 * @date 2023-07-27 16:24:42
 * @author 2028
 */
export const validateEmail = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入电子邮箱'))
  } else if (!patterns.email.test(value)) {
    callback(new Error('请输入正确的电子邮箱'))
  } else {
    callback()
  }
}

/**
 * @description 校验身份证
 * @date 2023-09-25 18:01:42
 * @author 2028
 */
export const validateIdentityCard = (rule: any, value: any, callback: any) => {
  if (value === '') { // 为空时，默认校验通过，如果需要必填，请在rules中自行添加
    callback(new Error('请输入身份证号码'))
  } else if (!patterns.identityCard.test(value)) {
    callback(new Error('请输入正确的身份证号码'))
  } else {
    callback()
  }
}

/**
 * @description 校验手机号码或者邮箱
 * @date 2023-07-27 16:24:42
 * @author 2028
 */
export const validatePhoneOrEmail = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入手机号码或者电子邮箱'))
  } else if (!(patterns.phone.test(value) || patterns.email.test(value))) {
    callback(new Error('请输入正确的手机号码或者电子邮箱'))
  } else {
    callback()
  }
}

// 获取字符串强度，即含有 数字、大写字母、小写字母、特殊字符中的几种
export const getPasswordStrongLength = (password: string) => {
  let modes = 0
  for (let i = 0; i < password.length; i++) {
    //测试每一个字符的类别并统计一共有多少种模式.
    modes |= charMode(password.charCodeAt(i))
  }
  return bitTotal(modes)
}

// 判断字符类型
const charMode = (iN: number) => {
  if (iN >= 48 && iN <= 57)
    // 数字
    return 1
  if (iN >= 65 && iN <= 90)
    // 大写字母
    return 2
  if (iN >= 97 && iN <= 122)
    // 小写字母
    return 4
  else return 8 // 特殊字符
}

// 统计字符类型
const bitTotal = (num: number) => {
  let modes = 0
  for (let i = 0; i < 4; i++) {
    if (num & 1) modes++
    num >>>= 1
  }
  return modes
}
