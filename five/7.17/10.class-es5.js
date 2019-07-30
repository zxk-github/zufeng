function myNew(...args) {
    let fn =  args.shift();
    let obj = Object.create(fn.prototype);
    let res = fn.apply(obj, args);
    return typeof res instanceof Object ? res: obj;
}

function Animal(name) {
    this.name = name;  //实例上的属性 
}
Animal.prototype.getName = function() {  
    return this.name;
}
const animal = myNew(Animal, 'aa');
console.log(animal.getName ());
console.log(animal.constructor);
// new 的实现

// 类是一类事务 具体的是一个实例
// 私有属性 外面获取不到的
// 实例上的属性
// 共有属性
// 静态方法 只能通过类访问


const animal2 = new Animal();
console.log(animal2.__proto__ === Animal.prototype);
console.log(Animal.prototype.__proto__ === Object.prototype)
console.log(Object.prototype__proto__ == null)   // true
console.log(Object.prototype__proto__ === null)  // false
console.log(Object.prototype.__proto__);  // null

console.log(Object.__proto__ === Function.prototype)
console.log(Function.__proto__ === Function.prototype);

// 类是无法获取到类中的实例属性的，但是可以获取到静态属性和方法



