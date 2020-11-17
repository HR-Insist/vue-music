import request from '@/utils/axios'
import requestWithoutLoading from '@/utils/axios'

export const phoneLogin = params => requestWithoutLoading.get('/login/cellphone', {
  params
})

export const refreshLogin = () => request.get('/login/refresh')

export const getLoginStatus = () => request.get('/login/status')

export const getUserDetail = uid => requestWithoutLoading.get(`/user/detail?uid=${uid}`)

export const loginOut = () => requestWithoutLoading.get('/logout')