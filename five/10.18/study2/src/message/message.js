import MessageComponent from './message.vue';
import Vue from 'vue';

// 单例模式
let instance;
let getVueInstance = () => {
  instance = new Vue({
    render: h => h(MessageComponent)
  }).$mount() // 没有挂载元素，就是一个没有挂载的html元素
  document.body.appendChild(instance.$el);
}

const Message = {
  success(options) {
    // 点击弹层 需要将.vue挂载到内存中

    // 就是将这个new Vue只做一次
    // 默认如果实例不存在 我就创建一个实例
    !instance && getVueInstance();
    // 将渲染好的内容 放到页面中
    console.log(instance.$children)

    instance.$children[0].add({
      ...options, 
      type: 'success'
    })
  },
  info() {

  },
  warn() {

  }
}

export {
  Message
}



