import Vue from 'vue'
import App from './App.vue'
import { Dialog, ButtonGroup, Button, Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import DialogDrawerFree from '../lib/index'

Vue.prototype.$ELEMENT = { size: 'small' };
Vue.use(Dialog)
Vue.use(ButtonGroup)
Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(DialogDrawerFree)

new Vue({
  el: '#app',
  render: h => h(App)
})
