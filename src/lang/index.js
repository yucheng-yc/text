import Vue from 'vue'
import VueI18n from 'vue-i18n'
import cn from './cn'
const i18n = new VueI18n({
  locale: 'cn',
  messages: {
    'cn': cn
  }
})
export default i18n