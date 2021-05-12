<template>
  <div id="app">
    <button @click="open">打开Dialog</button>
    <dialog-drawer-free v-if="visible" ref="dialog" />
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      visible: false
    }
  },
  methods: {
    open () {
      this.visible = true
    }
  }
}
</script>

