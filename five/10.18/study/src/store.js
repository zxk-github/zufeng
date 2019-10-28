import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const persits = (store) => {
  store.subscribe((mutation, state) => {   // commit的时候会触发这个订阅
    localStorage.setItem('vuex', JSON.stringify(state));
  })
}
export default new Vuex.Store({
  plugins: [
    persits
  ],
  modules: {
    a: {
      state: {
        a: 1
      },
      modules: {
        c: {
          getters: {
            comput(state) { //所有的getters都会定义在根模块上 $store.getters.comput
              // console.log(state)
            } 
          },
          mutations: {
            syncAdd(state, payload) { //同名的mutations 在被触发的时候，都会执行
              // console.log(state, payload)
            }
          }
        }
      }
    }
  },
  state: {
    a: 1
  },
  mutations: { // 用来更改状态
    syncAdd(state, payload) { // $store.commit('syncAdd', 10)
      state.a += payload
    },
    syncMinus(state, payload) {
      state.a -= payload;
    }
  },
  actions: {
    // 异步获取完之后 提交到mutation
    asyncMinus({commit}, payload) { // $store.dispatch('asyncMinus, payload)
      setTimeout(() => {
        commit('syncMinus', payload)
      })
    }
  }

})