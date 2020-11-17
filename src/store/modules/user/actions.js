import {
  getUserPlaylist
} from '@/api/user'
export default {
  async getUserPlaylist(context, uid) {
    const {
      playlist
    } = await getUserPlaylist(uid)
    context.commit('setPlaylist', playlist)
  }
}