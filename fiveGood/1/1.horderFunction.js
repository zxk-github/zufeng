// before函数
function say(who) {
  console.log(who + 'say')
}

Function.prototype.beforeSay = function(cb) {
  // 箭头函数没有this, arguments
  return (...args) => {
    cb();
    this(...args);
  }
}

let beforeSay = say.beforeSay(() => {
  console.log('开始说话');
})

beforeSay('wo');