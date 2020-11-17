import Vue from 'vue'
import App from './App.vue'
import router from "./routes"
import store from './store/index'
import VueLazyload from "vue-lazyload"
import VueMeta from 'vue-meta';

import './assets/style/index.scss'
import './assets/font/iconfont.css'
import "@/utils/element"

import * as utils from "@/utils"

Vue.config.productionTip = false

Vue.prototype.$utils = utils

Vue.use(VueLazyload)
Vue.use(VueMeta)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')