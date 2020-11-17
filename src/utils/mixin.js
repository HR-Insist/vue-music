import store from '@/store'

export const hideMenuMixin = {
  beforeCreate() {
    store.commit('global/setMenuShow', false)
    store.commit('music/setShowAudio', false)
    store.commit('music/setPlayingState', false)
  },
  beforeDestroy() {
    store.commit('global/setMenuShow', true)
    if (store.state.music.currentSong.id) {
      store.commit('music/setShowAudio', true)
    }
  },
}