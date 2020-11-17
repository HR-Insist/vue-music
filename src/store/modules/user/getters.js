export default {

  userMenus(state) {
    const menus = []
    const userCreateList = []
    const userCollectList = []
    state.userPlaylist.forEach(item => {
      if (item.userId === state.userId) userCreateList.push(item)
      else userCollectList.push(item)
    });

    const getPlaylist = playlist =>
      playlist.map(({
        id,
        name
      }) => ({
        id,
        path: `/playlist/${id}`,
        name,
        icon: "playlist-menu"

      }))

    if (userCreateList.length) {
      menus.push({
        title: "创建的歌单",
        playlist: getPlaylist(userCreateList)
      })
    }
    if (userCollectList.length) {
      menus.push({
        title: "收藏的歌单",
        playlist: getPlaylist(userCollectList)
      })
    }

    return menus
  }
}