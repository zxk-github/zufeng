<template>
  <div id="app">
    <button @click="broadcast">broadcast</button>
    <children-parent @change="change"></children-parent>

    <!-- @change本质上调用的是vm.$on('change', show) vm指代的是vue-async组件 -->
    <!-- <vue-async @change="show"></vue-async> -->


    <!-- <vue-async :count="count" @update:count="newValue => count = newValue"></vue-async> -->
    <!-- 这个写法是上面方法的简写，自组件中必须触发@update:count事件 -->
    <vue-async :count.sync="count"></vue-async>

    <!-- <vue-model :value="count2" @input="newValue => count2=newValue"></vue-model> -->
    <!-- 这个是上面方法的简写，自组件props必须接受value,并且自组件触发的事件必须是input事件 -->
    <vue-model v-model="count2" :count3="count3" @changeCount3="newValue => count3=newValue"></vue-model>
    <!-- v-model传递的属性必须是value才能使用v-model -->
  

    <!-- 如果给子组件传递的属性，子组件没有props配置项，就会直接作为html属性，添加在组件最外层元素上，子组件可以通过this.$attrs获取到所有的html属性-->
    <!-- 如果不希望html元素上显示，但是依然希望this.$attrs可以获取的到，可以在子组件设置inheritAttrs: false -->
    <vue-attrs :my="count"></vue-attrs>

    <!-- @click不能是原生事件，只能通过$emit触发，@click.native是原生事件 -->
    <!-- 这是一个自定义事件，@click仅仅是和原生名字一样而已 -->
    <!-- 同时将n个事件向下传递，子组件可以通过$listeners接受，然后各自使用 -->
    <Listeners @click="show" @mouseup="show"></Listeners>
    <!-- 这个原生的click事件，会添加在listener2组件最外层元素上 -->
    <Listeners2 @click.native="show"></Listeners2>

    <!-- provide想注册一个全局的属性，可以在任意下级组件中通过inject接收, inject进行查找的时候，就近原则，找到就停止  -->
    <provide-inject></provide-inject>

    <!-- ref添加在html元素上，代表当前的html元素，添加在组件标签上，代表当前组件的实例，可以直接在父组件中获取到子组件中属性和方法。this.$refs.son.show()  -->
    <ref ref="son"></ref>

    <bus></bus>

    <!-- $emit, $on兄弟组件通信，在父组件上挂载事件，然后触发，发送数据 -->
    <parent-son1></parent-son1>
    <parent-son2></parent-son2>

    <div>message : <button @click="msg">click</button></div>

    <Level></Level>

    <VuexComponent></VuexComponent>

    <useslot></useslot>

    
    <KFormItem label="用户名">
      <KInput></KInput>
    </KFormItem>
    <KFormItem label="密码">
      <KInput></KInput>
    </KFormItem>

    <template>
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
  </template>
  </div>
</template>

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
