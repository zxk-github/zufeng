let Vue;

let forEach = function(obj, fn) {
  Object.keys(obj).forEach((key) => {
    fn(key, obj[key])
  })
}


let install = (_vue) => {
  Vue = _vue;
  Vue.mixin({
    beforeCreate() {
      if(this.$options && this.$options.store) {
        this.$store = this.$options.store;
      } else {
        this.$store = this.$parent && this.$parent.$store;
      }
    }
  })
}

class Store {
  constructor(options) {
    this.s = new Vue({
      data() {
        return {
          state: options.state
        }
      }
    })

    this.getters = {};
    let getters = options.getters;

    forEach(getters, (getterName, gettterFn) => {
      Object.defineProperty(this.getters, getterName, {
        get: () => {
          return gettterFn(this.state);
        }
      })
    })


    this.mutations = {}
    let mutations = options.mutations;
    forEach(mutations, (mutationName, mutationFn) => {
      this.mutations[mutationName] = (payload) => {
        mutationFn(this.state, payload);
      }
    })

    this.actions = {};
    let actions = options.actions;
    forEach(actions, (actionName, actionFn) => {
      this.actions[actionName] = (payload) => {
        actionFn(this, payload)
      }
    })
  }

  commit = (mutationName, payload) => {
    this.mutations[mutationName](payload);
  }

  dispatch = (actionName, payload) => {
    this.actions[actionName](payload)
  }


  get state() {
    return this.s.state
  }
}


export default {
  install,
  Store
}

/*

$store.modules数据结构

_rawModule 当前等级所有的配置
state 当前等级所有的数据状态
_children 所有的子模块

let root = {
  _rawModule: options,
  state: options.state,  //整合之后的数据结构
  _children: {
    a: {
      state: options.a.state,
      _children: {},
      _rawModule: options.a
    },
    b: {
    }
  }
}
*/