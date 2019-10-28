import Vue from 'vue'
import App from './App.vue'
import store from './store';
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store   // 将store会在所有组件中申明一个$store
}).$mount('#app')

// 在组件进行渲染的时候，最先渲染的是new Vue, 然后才是App