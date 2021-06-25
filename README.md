# dialog-drawer-free

> 基于element-ui的无阻Dialog

### Install

``` bash
npm install dialog-drawer-free-cs --save
```

### Usage
``` bash
import DialogDrawerFree from 'dialog-drawer-free-cs'

Vue.use(DialogDrawerFree);

<dialog-drawer-free />
```

### Props
``` bash
字段名称                类型           说明                             默认值
title                  String        标题                             -
width                  String        宽度                             -
visible                Boolean       是否显示Dialog                   false
append-to-body         Boolean       Dialog 自身是否插入至 body 元素上  false
```

### Extend 
##### 内置了 el-dialog__title、dialog-body__sub__title、el-button-group
``` bash
  <dialog-drawer-free
    title="这是无阻详情弹框"
    width="600px"
    :visible.sync="visible"
  >
    <template slot="title">
      <span class="el-dialog__title">这是无阻详情弹框-自定义title</span>
      <el-button-group>
        <el-button type="primary" size="mini">调拨</el-button>
        <el-button type="primary" size="mini">打印</el-button>
        <el-button type="primary" size="mini">修改</el-button>
        <el-dropdown>
          <el-button type="primary" size="mini" icon="el-icon-more" class="el-button__more" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>按钮1</el-dropdown-item>
            <el-dropdown-item>按钮2</el-dropdown-item>
            <el-dropdown-item>按钮3</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-button-group>
    </template>
    <div class="dialog-body__sub__title">这是title</div>
    <template slot="footer">
      <el-button @click="visible = false">关闭</el-button>
      <el-button type="primary">保存</el-button>
    </template>
  </dialog-drawer-free>
```
