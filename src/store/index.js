import Vue from 'vue'
import Vuex from 'vuex'
import musicModule from './modules/music'
import globalModule from './modules/global'
import artistsModule from './modules/artists'
import userModule from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    music: musicModule,
    global: globalModule,
    artists: artistsModule,
    user: userModule
  }
})

export default store