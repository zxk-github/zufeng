import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$dispatch = function(eventName, value) {
  let parent = this.$parent;
  while(parent) {
    parent.$emit(eventName, value);  // 这个位置如果触发之后停止 或者如何知道 有没有触发事件
    parent = parent.$parent;
  }
}

Vue.prototype.$broadcast = function(eventName, value) {
  let children = this.$children;
  function broad(children) {
    children.forEach(child => {
      child.$emit(eventName, value)
      if(child.$children) {
        broad(child.$children)
      }
    })
  }
  broad(children)
}

// 创建一个全局的发布订阅，任何组件都可以在$bus上绑定事件，任何组件也都可以触发$bus上绑定的事件
// 数据流很乱
Vue.prototype.$bus = new Vue();



Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  store,  // 注入到vue实例中，会在所有的组件中申明一个$store属性
  render: h => h(App),
}).$mount('#app')
