<template>
  <el-dialog
    ref="dialog"
    :title="title"
    :width="width"
    :modal="false"
    custom-class="el-dialog-drawer"
    class="el-dialog-drawer__free"
    :visible.sync="visibleStatus"
    :append-to-body="appendToBody"
    :style="styleCss"
  >
    <slot slot="title" name="title" />
    <slot />
    <template slot="footer">
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogDrawerFree',
  props: {
    title: {
      type: String,
      default: '详情'
    },
    width: {
      type: String
    },
    visible: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visibleStatus: false,
      styleCss: {},
      waiting: false,
      timer: null
    }
  },
  watch: {
    visibleStatus () {
      this.$emit('update:visible', this.visibleStatus)
      this.waiting = false
    },
    visible () {
      if (this.waiting) {
        if (this.visible) {
          this.waiting = false
          this.visibleStatus = this.visible
          clearTimeout(this.timer)
        }
        return false
      }
      this.visibleStatus = this.visible
      this.$nextTick(() => {
        let dialog = this.$refs.dialog ? this.$refs.dialog.$el.querySelector('.el-dialog-drawer') : null
        this.styleCss = {
          width: (dialog ? dialog.clientWidth : 0) + 'px',
          height: '100%'
        }
      })
      if (this.visibleStatus) {
        window.addEventListener('mouseup', this.mouseEvent)
      } else {
        window.removeEventListener('mouseup', this.mouseEvent)
      }
    }
  },
  methods: {
    mouseEvent (e) {
      // 排除全局组件的影响
      let isExtra = false
      let eles = document.body.querySelectorAll('.el-popper,.el-tooltip__popper,.el-message,.el-message-box__wrapper,.el-notification,.el-message-box__wrapper')
      eles.forEach(ele => {
        if (ele.parentElement === document.body && ele.contains(e.target)) {
          isExtra = true
        }
      })
      if (this.$refs.dialog && !this.$refs.dialog.$el.querySelector('.el-dialog-drawer').contains(e.target) && !isExtra) {
        this.waiting = true
        this.$emit('update:visible', false)
        this.timer = setTimeout(() => {
          this.visibleStatus = false
        }, 50)
      }
    }
  }
}
</script>
