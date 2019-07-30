function Animal() {
    
}
function Tiger() {
    Animal.call(this);
}
// Object.setPrototypeOf(Tiger.prototype, Animal.prototype);

Tiger.prototype = Object.create(Animal.prototype); // 自身没有 空对象没有 找到Animal
Tiger.prototype.constructor = Animal;

// Tiger.prototype = Object.create(Animal.prototype, {constructor: {value: Tiger}});

const tiger = new Tiger();
console.log(tiger.constructor ===  Tiger);
 
// Tiger.prototype = new Animal() 1. 父类有对象，会出现统一对象的引用 2. 不能给父类传参



// 实现Object.create()
function create(pObj) {
    const fn = function(){};
    fn.prototype = pObj;
    return new fn();
}
obj = {a: 1};
let obj1 = Object.create(obj);
console.log(obj1.constructor); 