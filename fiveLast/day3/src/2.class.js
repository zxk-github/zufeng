// 实例方法，实例属性
function Animal() {
  this.name = 1;
  this.age = {}
}
// 静态方法，静态属性只能通过类来调用
Animal.a = 1;
Animal.b = function(){}
// 公共方法，公共属性
Animal.prototype.home = {};
Animal.prototype.fn = function() {}

// 每个对象都有__proto__, 每个函数都有prototype
let animal = new Animal();
console.log(animal.__proto__ === Animal.prototype)
console.log(Animal.prototype.__proto__ === Object.prototype)
console.log(Object.prototype.__proto__ === null)

console.log(Object.__proto__ === Function.prototype)
console.log(Function.__proto__ === Function.prototype)
console.log(Object.__proto__ === Function.__proto__)