// 对象的循环引用
let o = {};
o.x = o;
console.log(o);

// deepCopy

function deepCopy(value, hash = new WeakMap()) {
    if(value == undefined) {
        return value;
    }
    if(value instanceof RegExp) {
        return new RegExp(value);
    }
    if(value instanceof Date) {
        return new Date(value)
    }
    if(typeof value !== 'object') {
        return value;
    }
    if(hash.has(value)) {
        return hash.get(value);
    }

    let obj = new value.constructor();
    hash.set(value, obj);
    Object.keys(value).forEach((key) => {
        obj[key] = deepCopy(value[key], hash);
    })
    return obj;
}

var obj  = {
    a: 1,
    b: {
        c: [1,2]
    }
}

var obj2 = deepCopy(o)  // 对于循环引用来说 
console.log(obj2, obj)

