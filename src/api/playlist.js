import request from '@/utils/axios'

export const getCatList = () => request.get('/playlist/catlist')

// 获取歌单
export const getPlaylists = (params) => request.get('/top/playlist', {
  params
})
// 精品歌单
export const getTopPlaylists = (params) => request.get('/top/playlist/highquality', {
  params
})
// 获取相似歌单
export const getSimiPlaylists = (id, option) => request.get(`/simi/playlist?id=${id}`, option)

// 获取歌单详情
export const getListDetail = params =>
  request.get('/playlist/detail', {
    params
  })