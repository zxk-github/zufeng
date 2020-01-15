let obj = {
  a: 1
}

let proxy = new Proxy(obj, {
  get(target, key) {
    console.log(111)
    return Reflect.get(target, key)
  },
  set(target, key, value) {
    console.log(2)
    return Reflect.set(target, key, value);
  }
})
console.log(obj.a)
obj.a = 3

