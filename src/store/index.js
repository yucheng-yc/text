import Vue from 'vue'
import Vuex from 'vuex'
import common from './module/common'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
    },
    mutations: {
    },
    modules: {
      common
    },
    actions: {}
})
export default store