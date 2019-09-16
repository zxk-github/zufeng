let obj = {
  a: 1
}

let proxy = new Proxy(obj, {
  get(target, key) {
    // console.log('get')
    // return target[key];
    // return Reflect.get(target, key);
    // return 100;
  },
  set(target, key, value) {
    console.log('set');
    Reflect.set(target, key, value);
  }
})

console.log(proxy.a);
proxy.a = 2;
proxy.b = 2;

// 
