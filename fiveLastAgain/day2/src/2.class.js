function Animal() {
  this.name = 1;
  this.age = {}
}

// 静态方法，静态方法只能通过类来调用
Animal.a = 1;
Animal.b = function() {};

Animal.prototype.home = function(){}
Animal.prototype.fn = function() {}

let animal = new Animal();

console.log(animal.__proto__ === Animal.prototype)
console.log(Animal.prototype.__proto__ === Object.prototype)


console.log(Animal.__proto__ === Function.prototype)


function Tiger() {

}

// Tiger.prototype = Object.create(Animal.prototype);
// Tiger.prototype.constructor = Tiger;

Object.setPrototypeOf(Tiger.prototype, Animal.prototype)
const t1 = new Tiger();


console.log(t1.constructor === Tiger)
console.log(t1 instanceof Animal)



