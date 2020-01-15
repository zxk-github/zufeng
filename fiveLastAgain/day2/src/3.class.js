class Animal {
  constructor(type){
    this.type = type; // 声明一个实例属性
  }
  a = 1; // es7 在实例上添加一个属性

  eat() { // 原型上添加一个方法

  }
  get b() { // 通过getter的方式在原型上添加一个属性
    return 'get b'
  }

  static get c() { // 类上添加一个静态属性
    return 'static c'
  }

  static d() { // 类上添加静态方法
    return 'static d'
  }
  static e = 1; // es7增加一个静态属性
}

let animal = new Animal('dog');
console.log(animal);

console.log(animal.eat())  // es6规定，如果把类上的方法拿出来单独执行，这时候方法内的this是undefined
console.log(animal.__proto__.hasOwnProperty('b'))
