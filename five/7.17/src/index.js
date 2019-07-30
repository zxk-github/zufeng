
/*
class Animal {
    constructor(type) {
        this.type = type;
    }
    static say() {
        console.log('static')
    }  // 申明类上的静态方法
    static c = 1; // es7
    static get d() {
        return 5;
    } // es6
    a = 1; // es7 这种就是直接申明在实例上的属性 
    eat() {
        console.log('eat', this);
    }
    get b() {
        return 100;
    }// 通过属性访问器申明原型上的属性
    // set b() {

    // }  // 利用get/set操作属性
}
// 满足node支持
// 如果是公共方法可以直接写，公共属性需要get/set
// 静态方法和属性需要 get/set 


const animal = new Animal('dog');
console.log(animal.hasOwnProperty('a'))
console.log(animal.__proto__.hasOwnProperty('b'))
console.log(Animal.say())
console.log(Animal.c)
console.log(Animal.d)
// es6 规定 如果把原型上的方法拿出来，单独执行，这时候this就是undefined
let eat = animal.eat;
eat(); // undefined
// 修正
let eat1 = animal.eat.bind(animal);
eat1()

*/











/*
// 实现上诉报错
function Animal() {
    if(!(this instanceof Animal)) {
        throw new Error('TypeError: Class constructor Animal cannot be invoked without new')
    }
}
Animal()
*/


class Animal {
    constructor(type) {
        this.type = type;
    }
    static flag = 'animal'; //静态属性是可以被子类继承的 内部实现就是 Tiger.__proto__ = Animal
    static fn () {
        console.log(4)
        return 'fn'
    }
    eat() {
        console.log('eat')
    }
}

class Tiger extends Animal{ // 内部本身 call + object.create
    constructor(type) { 
        super(type)
    }
    static fn() {
        console.log(2);
        super.fn();
        return '12'
    }
    eat() {
        super.eat();
        console.log('21')
    }
}

const tiger = new Tiger('ok')
tiger.eat();
// super 在构造函数和静态方法中指的是父类， 在原型方法中指的是父类的原型


console.log(Tiger.flag)  //静态属性是可以被子类继承的
console.log(Tiger.fn())
// 类的特点 封装 继承 多态
