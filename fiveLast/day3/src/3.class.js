function Animal() {

}

function Tiger() {

}

// Tiger.prototype = Object.create(Animal.prototype);
Object.setPrototypeOf(Tiger.prototype, Animal.prototype)

let tiger = new Tiger();

console.log(tiger.constructor === Tiger)
console.log(tiger.constructor === Animal)
