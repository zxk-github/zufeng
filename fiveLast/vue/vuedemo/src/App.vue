<template>
  <div id="app" class="app">
    <div class="left"></div>
    <div class="right">
      <div class="header"></div>
      <div class="containt">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
}
.left {
  flex: 1 0 300px;
  height: 200px;
  background: #000;
}
.right {
  flex: 1 1 100%;
  padding: 30px;
  overflow: hidden;
  display: flex;
}
.header {

}
.containt {

}
</style>

<script>
import childrenParent from './components/0.childrenParent.vue';
import vueAsync from './components/1.vueAsync.vue'
import vueModel from './components/2.vueModel.vue'
import vueAttrs from './components/3.vueAttrs.vue'
import Listeners from './components/4.listeners.vue'
import Listeners2 from './components/4.listeners2.vue'
import provideInject from './components/5.provideInject.vue'
import ref from './components/6.ref.vue';
import Bus from './components/7.bus.vue';
import ParentSon1 from './components/8.parentSon1.vue';
import ParentSon2 from './components/8.parentSon2.vue'
// import { Message } from './components/message/message.js';
import Vue from 'vue';
import ZFUI from './components/message/message.js'
Vue.use(ZFUI)

import Level from './components/render/index.vue'

import VuexComponent from './components/vuex/index.vue'

import useslot from './components/slot/index.vue'

import KInput from './components/form/KInput.vue'
import KFormItem from './components/form/KFormItem.vue'


export default {
  name: 'app',
  provide() {  // provide的值如果是{dong:'aaa'}, 值是对象，必须返回一个新的对象，一般用于组件库的开发，尽量不要用于应用的开发
    return {
      vm: this
    }
  },
  mounted() {
    console.log(this.$store._modules)
    this.$bus.$on('change', () => {
      alert('busbus')
    })
    // this.$refs.son.show();
  },
  data() {
    return {
      count: 1,
      count2: 2,
      count3: 3,
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
    }
  },
  components: {
    childrenParent,
    vueAsync,
    vueModel,
    vueAttrs,
    Listeners,
    Listeners2,
    provideInject,
    ref,
    Bus,
    ParentSon1,
    ParentSon2,
    Level,
    VuexComponent,
    useslot,
    KInput,
    KFormItem
  },
  methods: {
    broadcast() {
      this.$broadcast('eat')
    },
    show() {
      alert(1)
    },
    show1() {
      
    },
    change() {
      this.show()
    },
    msg() {
      // Message.success({message: 'aaa', duration: 3000});
      this.$message.success({message: 'aaa', duration: 3000})
    }
  }
}
</script>
