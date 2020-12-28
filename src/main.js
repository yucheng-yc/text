import Vue from 'vue'
import App from './App'
import VueI18n from 'vue-i18n'
import parser from "@/components/jyf-parser/jyf-parser";
import loadingBottom from '@/components/loading/bottom';
import loadingCenter from '@/components/loading/center';
import skeleton from '@/components/skeleton';
import mixinsGlobal from '@/mixins/global';
import cn from './lang/cn'
import store from './store';
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'cn',
  messages: {
    'cn': cn
  }
})
// 注册全局组件
Vue.component('jyf-parser', parser)
Vue.component('loading-center', loadingCenter)
Vue.component('loading-bottom', loadingBottom)
Vue.component('skeleton', skeleton)
Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype._i18n = i18n

Vue.mixin(mixinsGlobal)
App.mpType = 'app'

const app = new Vue({
  i18n,
  ...App,
  store
})
app.$mount()
