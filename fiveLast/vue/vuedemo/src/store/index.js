import Vue from 'vue';
// import Vuex from 'vuex';
import Vuex from './vuex/vuex.js'

Vue.use(Vuex)
const persits = (store) => {   // 插件默认传入store
  store.subscribe((mutation, state) => {  // 当commit的时候会触发这个订阅
    // console.log(mutation, state)
    localStorage.setItem('vuex2', JSON.stringify(state))
  })
}

export default new Vuex.Store({
  plugins: [  // vuex插件
    persits
  ], 
  modules: {
    a: {
      state: {
        a: 1    // 取值this.$store.state.a.a
      },
      modules: {
        c: {
          state: {
            c: 1
          },
          getters: {  // 所有的getters都会定义在根上，但是state是当前c模块的state， 访问的时候$store.getters.computedC
            computedC(state) { 
              console.log(1111);
              return state.c + 100
            }
          },
          mutations: {
            // 多个模块之间有同名的mutation, commit的时候都会执行
            syncAdd(state, payload) {
              console.log(1111);
            }
          }
        }
      }
    },
    b: {
      state: {
        b: 1
      }
    }
  },
  state: {
    age: 10
  },
  getters: {
    getAge(state) {
      return state.age + 1;
    }
  },
  mutations: {
    syncAdd(state, payload) {
      state.age += payload
    },
    asyasyncM(state, paylod) {
      state.age -= paylod;
    }
  },
  actions: {  // 异步提交更改
    asyncM({commit}, payload) { // action 异步获取完之后，提交到mutation中, 第一个参数是store
      setTimeout(() => {
        commit('asyasyncM', payload)
      }, 10)
    }
  }
})