// 类的特点: 封装 继承 多态(类属性方法的重写)


// super在constructor中指代的是父类
// 在原型方法 getter/setter中指代的是父类的原型
// 在静态方法中指代的是父类
class Animal {
  constructor(type) {
    this.type = type;
  }
  static flag = 'animal';
  static fn() {
    console.log('fn')
  }
  eat() {// 
    console.log('eat');
  }
}


// 静态属性和静态方法继承原理 Tiger.__proto__ = Animal;
class Tiger extends Animal {
  constructor(type) {
    super(type);
  }
  eat() {
    super.eat() // 在子类中调用父类原型上的方法
    console.log('rou')
  }
  static fn() {
    super.fn();
    console.log('11');
  }
}

let tiger = new Tiger('dog')
console.log(tiger.type)
tiger.eat();
console.log(Tiger.flag);
Tiger.fn();


// 第13节最后会有实现一个class的讲解



