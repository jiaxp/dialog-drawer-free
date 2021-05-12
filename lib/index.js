import DialogDrawerFree from './dialog-drawer-free'

const Component = {
  install (Vue) {
    Vue.component(DialogDrawerFree.name, DialogDrawerFree)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  Component.install(window.Vue)
}

export default Component

