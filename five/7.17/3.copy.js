 function deepClone(value, hash = new WeakMap() ) { // 弱引用 WeakMap的key值只能时候对象， 如果是Map会出现内存泄漏的问题
    if(value == null) {   // undefined null直接返回
        return value;
    }
    if(value instanceof RegExp) {  //正则
        return new RegExp(value);
    }

    if(value instanceof Date) {
        return new Date(value)
    }

    if(typeof value !== 'object') {
        return value;
    }
    
    if(hash.get(value)) {
        return hash.get(value); // 如果已经创建过直接返回 避免栈溢出
    }
    let obj = new value.constructor();
    hash.set(value, obj);
    Object.keys(value).forEach(key => {
        obj[key] = deepClone(value[key], hash)
    })
    return obj;
}

// const arr = [1,2,3] 
// let obj = {a: 1, b: {a: 1}}
// var obj1 = deepClone(obj);
// obj1.b.a = 100;
// console.log(obj1, obj);

// 循环引用
let o = {};
o.x = o;
// console.log(o) //{ x: [Circular] }
let o1 = deepClone(o);
console.log(o1);  //对于这种循环引用的情况，会出现栈溢出，每次循环都会创建一个新的对象obj，解决办法就是，如果当前这个对象被copy过，就直接返回，不进行新的对象的创建


