class Animal {
    constructor(type) {
        this.type = type;
    }
    a = 1; // es7 这种就是直接申明在实例上的属性 
    eat() {
        console.log('eat', this);
    }
}
const animal = new Animal('dog');
console.log(111);
console.log(animal.hasOwnProperty('type'))
// es6 规定 如果把原型上的方法拿出来，单独执行，这时候this就是undefined
let eat = animal.eat;
eat(); // undefined
// 修正
let eat1 = animal.eat.bind(animal);
eat1()













/*
// 实现上诉报错
function Animal() {
    if(!(this instanceof Animal)) {
        throw new Error('TypeError: Class constructor Animal cannot be invoked without new')
    }
}
Animal()
*/


