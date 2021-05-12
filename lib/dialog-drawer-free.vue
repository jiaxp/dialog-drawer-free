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
import { Dialog } from 'element-ui'

export default {
  name: 'DialogDrawerFree',
  components: {
    Dialog
  },
  props: {
    title: {
      type: String,
      default: ''
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

<style lang="scss" scoped>
  .el-dialog-drawer__free {
    bottom: auto !important;
    left: auto !important;

    .el-dialog-drawer {
      &.dialog-drawer-fade-in {
        animation: dialog-drawer-fade-in 0.3s !important;
      }

      &.dialog-drawer-fade-out {
        animation: dialog-drawer-fade-out 0.3s !important;
      }
    }

    /deep/ .el-dialog {
      transform: none;
      left: 0;
      position: relative;
      margin: 0 auto;

      /** dialog居中全局样式修改 */
      .el-form-item__content {
        .el-input,
        .el-input-number,
        .el-select,
        .el-cascader {
          width: 100%;
        }
      }

      .el-dialog__body {
        margin-top: 10px;
        padding-bottom: 0;
      }

      .el-dialog__footer {
        text-align: center;
        height: 80px;
        line-height: 80px;
        padding-top: 0;
        padding-bottom: 0;
        margin-bottom: 0;

        .el-button {
          min-width: 90px;
          font-weight: bold;
          font-size: 13px;

          &.el-button--default {
            color: #909399;
            border-color: #C0C4CC;
            background-color: #fff;

            &:not(.is-disabled):hover, &:not(.is-disabled):focus {
              color: #3E8DDD;
              border-color: #3E8DDD;
            }
          }
        }
      }

      /** dialog居中全局样式修改 end */

      &.el-dialog-drawer {
        margin: 0 !important;
        width: 600px;
        position: fixed;
        height: 100%;
        top: 50%;
        left: 100% !important;
        transform: translate(-100%, -50%);
        display: flex;
        flex-direction: column;

        &.el-dialog-drawer__small {
          width: 450px;
        }

        &.el-dialog-drawer__large {
          width: 800px;
        }

        .el-dialog__header {
          .el-button-group {
            float: right;
            margin-right: 50px;
            margin-top: -2px;

            .el-button.el-button--primary {
              background-color: #F0F4FB;
              border-color: #F0F4FB;
              color: #3E8DDD;
              font-weight: bold;

              &.el-button__more {
                padding: 7px;

                > .el-icon-more {
                  transform: rotate(90deg);
                }
              }

              &:not(:first-child):not(:last-child) {
                border-left-color: #DCDFE6;
                border-right-color: #DCDFE6;
                z-index: 5;
              }

              &:hover {
                background-color: #E5F2FF;
              }
            }
          }
        }

        .el-dialog__body {
          padding-top: 0;
          overflow-y: auto;
          flex: 1;

          .dialog-body__sub__title {
            height: 40px;
            line-height: 40px;
            font-size: 13px;
            font-weight: bold;
            color: #303133;
          }
        }
      }
    }
  }
</style>
