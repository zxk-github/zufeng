let obj = {
  a: 1,
  age: {
    n: 1
  }
}
let proxy = new Proxy(obj, {
  get(target, key) {
    // return target[key];
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    if(key === 'length') return true
    // target[key] = value;
    Reflect.set(target, key, value);
  }
})



let handler = {
  get(target, key) {
    // return target[key];
    if(typeof target[key] === 'object' && target[key] !== null) {
      return new Proxy(target[key], handler)
    }
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    if(key === 'length') return true
    // target[key] = value;
    Reflect.set(target, key, value);
    console.log('update')
  }
}
let obj1 = {
  a: 1,
  age: {
    n: 1
  }
}
let proxy1 = new Proxy(obj1, handler)
proxy1.age.n = 2
proxy1.grade = 123
