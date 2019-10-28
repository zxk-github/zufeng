let Vue;

class Store {
  constructor(options = {}){
    this.state = options.state;
  }
}


const install = (_vue) => {
  Vue = _vue;  // vue的构造函数
  Vue.mixin({
    beforeCreate() { //每个组件创建之前会被执行
      // 需要拿到store属性，每个组件都增加$store属性
      // 没有将$store直接放在原型上是因为可能会new Vue多次，在别的实例上不需要store
      if(this.$options && this.$options.store) {
        // 给根组件增加$store属性
        this.$store = this.$options.store;
      } else{
        // 有可能单独创建一个实例没有父亲，那就无法获取到$store属性
        this.$store = this.$parent && this.$parent.$store;
      }
      
    }
  })
}

export default {
  install,
  Store
}

