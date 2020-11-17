import {
  requestWithoutLoading
} from '@/utils/axios'

export const checkPhone = phone => requestWithoutLoading.get(`/cellphone/existence/check?phone=${phone}`)

export const sendCaptcha = phone => requestWithoutLoading.get(`/captcha/sent?phone=${phone}`)

export const verifyCaptcha = params => requestWithoutLoading.get('/captcha/verify', {
  params
})