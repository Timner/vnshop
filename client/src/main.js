// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import apiConfig from '../config/api.config'

import Axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, Axios)
Axios.defaults.baseURL = apiConfig.baseUrl

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)


import '../static/css/index.css'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})



Vue.use(VueLazyload, {
    // preLoad: 1.3,
    // error: 'static/img/error.svg',
    loading: 'static/img/loading-spinning-bubbles.svg',
    // attempt: 1
})