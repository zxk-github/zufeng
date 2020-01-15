// 装饰器 AOP

// 1. 只能装饰类，装饰类中的属性，类中的方法

@add
class My{
  @readOnly PI = 3.14;
  @beforeSay
  say() {
    console.log('say');
  }
}
function add(target) {
  // 第一个参数指向类
  target.type = 'my';
}
function readOnly(proto, key, descriptor) {
  // proto 第一个参数指向类的原型
  // key 第二个参数指的是修饰的属性
  // descriptor 属性描述器
  setTimeout(() => {
    console.log(proto, key, descriptor)
    console.log(My.prototype === proto)  // true
    console.log(descriptor.initializer()) // 3.14
    descriptor.writable = false; 
  })
}

function beforeSay(proto, key, descriptor) {
  let oldSay = descriptor.value;
  setTimeout(() => {
    console.log(My.prototype === proto, proto)
  }) 
  descriptor.value = function() {
    console.log('before say');
    oldSay();
  }
}

console.log(My.type)

let my = new My();
my.PI = 12
console.log(my.PI);

console.log(my.say())




