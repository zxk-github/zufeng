let Vue;
const forEach = (obj, cb) => {
  Object.keys(obj).forEach(key => {
    cb(key, obj[key]);
  })
}

class Store {
  constructor(options = {}){
    // 用户状态放到store中
    this.s = new Vue({  // 核心，定义了响应式变化，数据更新，视图更新
      data() {
        return {
          state: options.state
        }
      }
    }) // 用来维护全局数据
    let getters = options.getters;

    this.getters = {};
    // 计算属性
    forEach(getters, (getterName, fn) => {
      Object.defineProperty(this.getters, getterName, {
        get: () => {
          return fn(this.state);
        }
      })
    })
    // Object.keys(getters).forEach(getterName => {
    //   Object.defineProperty(this.getters, getterName, {
    //     get: () => {
    //       return getters[getterName](this.state);
    //     }
    //   })
    // }) 

    let mutations = options.mutations; // 获取所有同步的更新操作方法
    this.mutations = {};
    forEach(mutations, (mutationName, fn) => {
      this.mutations[mutationName] = (payload) => {
        fn(this.state, payload);
      }
    })
    // Object.keys(mutations).forEach(mutationName => {
    //   this.mutations[mutationName] = (payload) => {
    //     mutations[mutationName](this.state, payload);
    //   }
    // })

    let actions = options.actions;
    this.actions = {};
    forEach(actions, (actionName, fn) => {
      this.actions[actionName] = (payload) => {
        fn(this, payload);
      }
    })
  }
  // 提交更改，会在当前store上找到对应的函数执行
  commit = (mutationName, payload) => {
    this.mutations[mutationName](payload);
  }
  dispatch = (actionName, payload) => {
    this.actions[actionName](payload);
  }
  get state() {
    return this.s.state;
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

