export default {
  setLoginStatus(state, payload) {
    state.isLogin = payload
  },
  setUserId(state, payload) {
    window.sessionStorage.setItem('_music_uid_', payload)
    state.userId = payload
  },
  setToken(state, payload) {
    state.token = payload
  },
  setUserImgUrl(state, payload) {
    state.userImgUrl = payload
  },
  setNickname(state, payload) {
    state.nickname = payload
  },
  setPlaylist(state, payload) {
    state.userPlaylist = payload
  }
}