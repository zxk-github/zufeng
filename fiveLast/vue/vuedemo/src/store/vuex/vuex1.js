let Vue;
const forEach = (obj, cb) => {
  Object.keys(obj).forEach(key => {
    cb(key, obj[key])
  })
}

class ModuleCollection{
  constructor(options) {
    this.register([], options); // 注册模块，将模块注册成树结构
  }
  register(path, rootModule) {
    let module = { //将模块格式化
      _rawModule: rootModule,
      _children: {},
      state: rootModule.state
    }
    if(path.length === 0) {
      this.root = module;
    } else {
      // 递归都用reduce方法 // 通过_children属性进行查找
      let parent = path.slice(0, -1).reduce((root, current) => {
        return root._children[current];
      }, this.root);
      parent._children[path[path.length - 1]] = module
    }
    if(rootModule.modules) { // 如果有modules配置项，则开始重新再次注册
      forEach(rootModule.modules, (moduleName, module) => {
        // [a]
        // [b]
        this.register(path.concat(moduleName), module);
      })
    }
  }
}

class Store {
  constructor(options = {}) {
    // 将用户状态放到store中
    // this.state = options.state;
    this.s = new Vue({  // 定义响应式变化，数据更新，视图更新，用来维护全局数据的
      data(){
        return {
          state: options.state
        }
      }
    })   // 为了满足直接修改数据，视图发生变化， 尽管vuex不建议直接修改数据，但是真的修改了也没啥问题
    let getters = options.getters;
    this.getters = {};
    forEach(getters, (getterName, fn) => {
      Object.defineProperty(this.getters, getterName, {
        get:() => {
          return fn(this.state)
        }
      })
    })
    // Object.keys(getters).forEach(getterName => {
    //   Object.defineProperty(this.getters, getterName, {
    //     get() {
    //       return getters[getterName](this.state)
    //     }
    //   })
    // })
    let mutations = options.mutations;
    this.mutations = {}
    forEach(mutations, (mutationName, fn) => {
      this.mutations[mutationName] = (payload) => {
        // 内部的第一个参数是状态
        fn(this.state, payload)
      }
    })
    // Object.keys(mutations).forEach(mutationName => {
    //   this.mutations[mutationName] = (payload) => {
    //     // 内部的第一个参数是状态
    //     mutations[mutationName](this.state, payload)
    //   }
    // })
    let actions = options.actions;
    this.actions = {}
    forEach(actions, (actionName, fn) => {
      this.actions[actionName] = (payload) => {
        fn(this, payload)
      }
    })

    this._modules = new ModuleCollection(options)
  }
  // 提交更改，会在当前store上找到对应的函数
  commit = (mutationName, payload) => {  // 箭头函数保证this
    this.mutations[mutationName](payload)
  }
  dispatch = (actionName, payload) => {
    this.actions[actionName](payload)  // 源码中又一个变量控制是否是通过mutation更改的 否则报错
  }
  get state() {
    return this.s.state
  }
}

const install = (_Vue) => {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      // 拿到store 给每个组件增加$store属性
      if(this.$options && this.$options.store) {
        // 给根实例增加$store属性
        this.$store = this.$options.store;
      } else {
        // 有可能单独创建一个实例，没有父级，那就无法获取$store属性
        this.$store = this.$parent && this.$parent.$store
      }
    }
  })
}

export default {
  install,
  Store
}


// 源码中会将当前传入的数据进行格式化
/*
this.$store._modules
let root: {
  _rawModule: options,
  _children: {
    a: {
      _rawModule: {},   // a中的配置项信息
      _chidlren: {},    // 所有的子模块
      state: options.state // {a: 1}   代表当前自己的状态
    },
    b: {

    }
  },
  state: options.state,
  context: 
}
*/