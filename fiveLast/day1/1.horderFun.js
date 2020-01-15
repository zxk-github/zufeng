function say(who) {
  console.log(who + 'say')
}

Function.prototype.beforeSay = function(beforeFun) {
  // 箭头函数中没有this 和arguments
  return (...args) => {
    beforeFun();
    this(...args);
  }
}

let beforeSay = say.beforeSay(() => {
  console.log('提前一步执行')
})
beforeSay('我')

//react中的事务
class Transaction {
  perform(anyMethod, wrappers) {
    wrappers.forEach(wrap => wrap.initialize());
    anyMethod();
    wrappers.forEach(wrap => wrap.close());
  }
}
let transaction = new Transaction();
let oldFn = () => {
  console.log('原有逻辑')
}

transaction.perform(oldFn, [{
  initialize() {
    console.log('初始化1')
  },
  close() {
    console.log('结束1')
  }
},{
  initialize() {
    console.log('初始化2')
  },
  close() {
    console.log('结束2')
  }
}])



