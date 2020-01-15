<template>
  <div id="app">
    <ChildrenParent @dispatch="dispatch"></ChildrenParent>
    VueAsync: {{data}}
    <!-- <VueAsync :data="data" @update:data="value => data=value"></VueAsync> -->
    <!-- 这种写法，子组件必须触发@update.data事件 -->
    <vue-async :data.sync="data"></vue-async>

    <!-- <vue-model :value="data" @input="value => data = value"></vue-model>  -->
    <!-- v-bind可以将属性向下传递 v-bind="attrs"-->

    <!-- 这种简写方式，自组件触发的事件必须是input事件，并且自组件内的props接受的必须是value属性 -->
    <vue-model v-model="data"></vue-model>

    <!-- 如果组件上的属性没有被props接受，就会被显示在html元素上，这时候自组件添加inheritAttrs就会不会显示出来了 -->
    <vue-attrs :my="data" :data="1"></vue-attrs>

    <!-- 组件上绑定的@click不是原生事件，只能通过@emit触发，想触发原生的@click.native -->
    <!-- 将事件向下传递 $listeners -->
    <listeners @click="dispatch" @update="dispatch" @aaa="dispatch"></listeners>

    <provideInject></provideInject>

    <!-- ref挂载在组件上，代表当前组件的实例 -->
    <ref ref="son"></ref>

    <Bus></Bus>
    <prarentSon1></prarentSon1>
    <prarentSon2></prarentSon2>

  </div>
</template>

<script>
import ChildrenParent from './components/0.childrenParent.vue';
import VueAsync from './components/1.vueAsync.vue'
import VueModel from './components/2.vueModel.vue';
import VueAttrs from './components/3.vueAttrs.vue';
import Listeners from './components/4.listeners.vue';
import provideInject from './components/5.provideInject.vue';
import ref from './components/6.ref.vue';
import Bus from './components/7.bus.vue';

import prarentSon1 from './components/8.parentSon1.vue';
import prarentSon2 from './components/8.parentSon2.vue';




export default {
  name: 'app',
  provide() {
    return {
      vm: this
    }
  },
  data() {
    return {
      data: 1
    }
  },
  components: {
    ChildrenParent,
    VueAsync,
    VueModel,
    VueAttrs,
    Listeners,
    provideInject,
    ref,
    Bus,
    prarentSon1,
    prarentSon2
  },
  mounted() {
    // this.$refs.son.show()
    this.$bus.$on('change', function(value) {
      console.log(value)
    })
  },
  methods: {
    changeData(newDate) {
      this.data = newDate;
    },
    dispatch() {
      console.log(...arguments);
    }
  }
}
</script>

