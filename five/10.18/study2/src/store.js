import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

let store = new Vuex.Store({
  modules: {
    a: {
      // modules: {
      //   c: {
      //     state: 1
      //   }
      // },
      state: {
        a: 1
      },
      mutations: {
        addA() {
          console.log('aaa')
        }
      }
    },
    b: {
      state: {
        a: 1
      }
    }
  },
  state: {
    a: 1
  },
  getters: {
    ga(state) {
      return state.a + 10
    }
  },
  mutations: {
    addA(state, payload) {
      state.a += payload
    }
  },
  actions: {
    async({commit}, payload) {
      setTimeout(() => {
        commit('addA', 10)
      }, 1000)
    }
  }
})

export default store;