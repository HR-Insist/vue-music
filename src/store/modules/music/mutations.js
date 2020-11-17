export default {
  // setMusicUrl(state, payload) {
  //   state.musicUrl = payload
  // }
  setCurrentSong(state, payload) {
    state.currentSong = payload;
  },
  setCurrentTime(state, payload) {
    state.currentTime = payload
  },
  setPlayingState(state, payload) {
    state.playing = payload;
  },
  setPlayerShow(state, payload) {
    state.isPlayerShow = payload
  },
  setPlayList(state, payload) {
    state.playlist = payload
  },
  setPlaylistShow(state, payload) {
    state.isPlaylistShow = payload
  },
  setPlayHistory(state, payload) {
    const index = state.playHistory.findIndex(item => item.id === payload.id)
    // const res = state.playHistory.some(item => item.id === payload.id)
    if (index !== -1) {
      state.playHistory.splice(index, 1)
    }
    state.playHistory.unshift(payload)
  },
  setShowAudio(state, payload) {
    state.isShowAudio = payload
  }
}