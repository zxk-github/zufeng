import MessageComponent from './message.vue';
import Vue from 'vue';

let instance;
let getInstance = function() {
  instance = new Vue({
    render: h=>h(MessageComponent)
  }).$mount();
  document.body.appendChild(instance.$el);
}

let Message = {
  success(options) {
    // 点击弹出层，需要将.vue文件挂载到内存中
    !instance && getInstance();
    instance.$children[0].add(options);
  }
};
export {
  Message
}
export default {
  install(_Vue) { 
    // _Vue作用1. 注册全局组件 2. 组册全局指令 3. 往原型上添加方法或者属性
    _Vue.prototype.$message = Message
  }
}