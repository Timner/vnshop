// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'

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
    preLoad: 1.3,
    error: 'static/img/error.svg',
    loading: 'static/img/loading-spinning-bubbles.svg',
    attempt: 1
})