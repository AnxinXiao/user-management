// 封装具体的请求函数
import request from './request.js'

/**
 * 获取用户列表
 * @returns {Promise} 返回用户列表数据的Promise
 */
export function getUserListApi() {
  return request({
    url: '/users',
    method: 'GET'
  })
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error // 重新抛出错误，让调用者能够捕获
    })
}

/**
 * 添加学生
 */
export function addUserApi(data) {
  return request({
    url: '/users',
    method: 'POST',
    data
  })
}

/**
 * 根据 id 来获取用户的信息
 * @param {*} id
 * @returns
 */
export function getUserByIdApi(id) {
  return request({
    url: `/users/${id}`,
    method: 'GET'
  })
}

// 根据 id 删除用户
export function deleteUserByIdApi(id) {
  return request({
    url: `/users/${id}`,
    method: 'DELETE'
  })
}

// 根据 id 编辑用户
export function editUserByIdApi(id, data) {
  return request({
    url: `/users/${id}`,
    method: 'PATCH',
    data
  })
}
