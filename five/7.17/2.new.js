function myNew(...args) {
    const obj = {};
    const ctr = args.shift();
    Object.setPrototypeOf(obj, ctr.prototype);
    let res = ctr.apply(obj, args);
    return res instanceof Object? res: obj;
}

function Animal(name) {
    this.name = name;
}
Animal.prototype.say = function() {
    console.log('123');
}

const animal = myNew(Animal, 1,2)
console.log(animal.constructor);