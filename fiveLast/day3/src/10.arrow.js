//箭头函数特点 
// 1. 没有this, 然后会想上查找，按照作用域查找 
// 2. 没有arguments 
// 3. 没有prototype

var a = 1;
var obj = {
  a: 2,
  fn: function() {
    setTimeout(function() {
      console.log('0', this.a); // 1
    })
  },
  fn1:function(){
    setTimeout(() => {
      console.log('1', this.a); // 2
    })
  },
  fn2: () => {
    setTimeout(() => {
      console.log('2', this.a) // 1
    })
  }
}

obj.fn() // 1
obj.fn1() // 2 因为obj.fn1()这种方式调用的时候，fn1函数中的this指向的是obj, 所以箭头函数中的this指向obj
var fn = obj.fn1;
fn() // 1 因为fn1()函数中的this指向window，所以箭头函数中的this指向window
obj.fn2() // 1
