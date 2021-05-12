<template>
  <div id="app">
    <button @click="open">打开Dialog</button>
    <dialog-drawer-free-demo v-if="visible" ref="dialog" />
  </div>
</template>

<script>
import DialogDrawerFreeDemo from './dialog-drawer-free-demo'

export default {
  name: 'app',
  components: {
    DialogDrawerFreeDemo
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    open () {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dialog.init()
      })
    }
  }
}
</script>

