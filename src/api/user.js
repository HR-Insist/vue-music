import requestWithoutLoading from '@/utils/axios'

export const getUserInfo = uid => requestWithoutLoading.get(`/user/subcount?uid=${uid}`)

const PLAYLIST_LIMIT = 1000
export const getUserPlaylist = (uid) => requestWithoutLoading.get("/user/playlist", {
  params: {
    uid,
    limit: PLAYLIST_LIMIT
  }
})