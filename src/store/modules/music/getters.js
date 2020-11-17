export default {
  getSongId(state) {
    return state.currentSong.id;
  },
  getCurrentIndex(state) {
    const {
      currentSong,
      playlist
    } = state
    return playlist.findIndex(({
      id
    }) => id === currentSong.id)
  },
  getNextSong(state, getters) {
    const {
      playlist,
      currentSong
    } = state
    const index = getters.getCurrentIndex
    if (index + 1 < playlist.length) {
      return playlist[index + 1]
    }
    return currentSong
  },
  getPrevSong(state, getters) {
    const {
      playlist,
      currentSong
    } = state
    const index = getters.getCurrentIndex
    if (index - 1 >= 0) {
      return playlist[index - 1]
    }
    return currentSong
  }
}