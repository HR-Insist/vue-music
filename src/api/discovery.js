import request from '@/utils/axios'

export function getBanner() {
  return request.get('/banner?type=0')
}

export const getNewSongs = () => request.get('/personalized/newsong')

export const getHotSinger = params =>
  request.get(`/top/artists`, {
    params
  })

export const getPersonalizedMv = () => request.get(`/personalized/mv`)

export function getSongUrl(params) {
  return request.get('/song/url', {
    params
  })
}