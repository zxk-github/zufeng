// 模拟babel编译之后class不是new调用出现的错误提示
function Animal1() {
  if(!this instanceof Animal1) {
    throw new Error('without new ')
  }
}


class Animal {
  constructor(type) {
    this.type = type;  // 实例属性
  }
  a = 1; // es7语法 实例上的属性

  eat() {
    console.log('eat', this)
  }
  get b() {  // es6 通过这种getter/setter的方式，可以直接在原型上直接申明一个属性
    return 100
  };
  // set b() {  这个位置会报错

  // };
  static c = 1; // es7 在类上申明一个静态属性
  static say() { // 申明一个静态方法

  }
  static get d() { // es6申明一个静态属性
    return 'hello'
  }
}

let animal = new Animal ('dog');
let eat = animal.eat;
eat()  // undefined 在es6中规定，如果把类原型上的方法拿出来单独执行，那么方法内部的this指向undefined 
console.log(animal.hasOwnProperty('a')) // true
console.log(animal.__proto__.hasOwnProperty('b'))