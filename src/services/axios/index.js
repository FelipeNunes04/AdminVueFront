import axios from 'axios'
import store from 'store'
import { notification } from 'ant-design-vue'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
})

apiClient.interceptors.request.use(request => {
  const accessToken = store.get('accessToken')
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
    request.headers.AccessToken = accessToken
  }
  return request
})

apiClient.interceptors.response.use(undefined, error => {
  // Errors handling
  const { response } = error
  const { data } = response
  if (data.message) {
    notification.warning({
      message: data.message,
    })
  }
})

export default apiClient
