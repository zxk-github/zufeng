import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.prototype.$dispatch = function(event, ...args) {
  let parent = this.$parent;
  while(parent) {
    parent.$emit(event,...args);
    parent = parent.$parent;
  }
}

Vue.prototype.$broadcast = function(event, ...args) {
  let children = this.$children;
  function broadcast(children) {
    if(children && children.length > 0) {
      children.forEach(child => {
        child.$emit(event, ...args);
        broadcast(child)
      });
    }
  }
  broadcast(children);

}

Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
