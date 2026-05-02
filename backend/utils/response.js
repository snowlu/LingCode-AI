/**
 * 统一响应格式封装
 * 所有接口返回数据统一使用此模块的 success / fail 方法
 */

export function success(data = null, msg = 'success') {
  return { code: 200, msg, data }
}

export function fail(msg = '操作失败', code = 400) {
  return { code, msg, data: null }
}
