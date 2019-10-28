let Vue;
const forEach = (obj, cb) => {
  Object.keys(obj).forEach(key => {
    cb(key, obj[key]);
  })
}

class ModuleCollection {  // 格式化
  constructor(options) {
    // 注册模块，将模块注册称树结构
    this.register([], options);
  }
  register(path, rootModule) {
    let module = {// 将模块格式化
      _rawModule: rootModule,
      _children: {},
      state: rootModule.state
    }
    if(path.length == 0) {
      this.root = module; // 如果是根模块， 将这个模块挂载在根节点上
    } else {
      // 递归都用reduce方法 通过_children属性进行查找
      let parent = path.slice(0, -1).reduce((root, current) => {
        return root._children[current];
      }, this.root)
      parent._children[path[path.length - 1]] = module;
      // this.root._children[path[path.length - 1]] = module;
    }

    // 查看当前模块是否有modules
    if(rootModule.modules) { //如果modules开始重新注册
      forEach(rootModule.modules, (moduleName, module) => {
        this.register(path.concat(moduleName), module);
      })
    }
  }
}

const installModule = (store, rootState, path, rootModule) => {

  if(path.length > 0) {
    let parent = path.slice(0, -1).reduce((root, current) => {
      return root[current];
    }, rootState)
    
    Vue.set(parent, path[path.length - 1], rootModule.state)
    // 直接按照这种方式添加数据，当数据变化的时候视图是不会更新的
    // parent[path[path.length - 1]] = rootModule.state;
  }


  let getters = rootModule._rawModule.getters;
  if(getters) {
    forEach(getters, (getterName, getterFn) => {
      Object.defineProperty(store.getters, getterName, {
        get() {
          // 让getter传入的是当前自己的状态
          return getterFn(rootModule.state)
        }
      })
    })
  }

  // mutation都挂载根store上，当模块中的mutation名称相同时，一旦触发都会执行
  let mutations = rootModule._rawModule.mutations;
  if(mutations) {
    forEach(mutations, (mutationName, mutationfn) => {
      let mutations = store.mutations[mutationName] || [];
      mutations.push((payload) => {
        mutationfn(rootModule.state, payload)
        store.subscribe.forEach(fn => fn({type: mutationName, payload}, rootState))
      })
      store.mutations[mutationName] = mutations;
    })
  }

  let actions = rootModule._rawModule.actions;
  if(actions) {
    forEach(actions, (actionName, actionFn) => {
      let actions = store.actions[actionName] || [];
      actions.push((payload) => {
        actionFn(store, payload);
      })
      store.actions[actionName] = actions;
    })
  }

  forEach(rootModule._children, (moduleName, module) => {
    installModule(store, rootState, path.concat(moduleName), module)
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

    this.getters = {};
    this.mutations = {};
    this.actions = {};
     // 将数据格式化成一个想要的树形数据结构
    this._modules = new ModuleCollection(options);

    // 递归将结果进行分类

    /**
     * this 整个store
     * this.state 当前store的根状态
     * [] 为递归来创建的
     * this._modules.root 从根模块开始安装
     */
    installModule(this, this.state, [], this._modules.root);

    this._subscribes = [];
    options.plugins.forEach(plugin => plugin(this))
  }
  subscribe(fn) {
    this._subscribes.push(fn)
  }

  // 提交更改，会在当前store上找到对应的函数执行
  commit = (mutationName, payload) => {
    this.mutations[mutationName].forEach((mutationfn) => {
      mutationfn(payload)
    })
    // this.mutations[mutationName](payload);
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

// 当前用户传入进来的内容进行格式化
/*

let root = {
  _rawModule: options,
  _children: {
    a: {
      _rawModule: options.a,
      _children: {

      },
      state: options.state.a
    },
    b: {}
  },
  state: options.state
}
*/