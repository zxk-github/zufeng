class Factory {
  constructor(name) {
    this.name = name;
  }
  init() {
    console.log('init');
  }
}


class Creator{
  create(name) {
    return new Factory(name)
  }
}

let creator = new Creator();
let factory = creator.create('fac1');
factory.init();
/**
 * 使用场景
 * jquery $('div');
 * React.createElement()
 * Vue异步组件
 *   
 */

 //jquery $('div'); 
 class jquery {
   constructor(selector) {
    this.selector = selector || '';
   }
   append() {

   }
   className() {

   }
 }

 window.$ = function(selector) {
   return new jquery(selector);
 }

 /**
  *1. 学习功能实现 
  *2. 学习设计思路
  3. 强制自己写代码
  4. 自己写出代码
  */

// React.createElement()
class Vnode {
  //
}

React.createElement = function(tag, attrs, children) {
  return new Vnode(tag, attrs, children)
}


Vue.component('name', function() {

})

/**
 * 构造函数和创建者分离 
 * 符合开放封闭原则
 */