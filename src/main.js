import Vue from 'vue'
import App from './App.vue'
import { Dialog } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import DialogDrawerFree from '../lib/index'

Vue.use(Dialog)
Vue.use(DialogDrawerFree)

new Vue({
  el: '#app',
  render: h => h(App)
})
