let obj = {
  _body: 10,
  get url() {
    return this._body;
  }, 
  set url(val) {
    this._body = val;
  }
}
obj.url = 100;
console.log(obj.url);

let obj2 = {};
let other = 10;
Object.defineProperty(obj2, 'url', {
  enumerable: true, // 默认是false不可枚举的
  configurable: true, // 设置get之后，默认设置为true
  // writable: true 设置了get/set之后就不能设置writable, 这个是配合value使用的
  get() {
    return other;
  },
  set(val) {
    other = val;
  }
})
console.log(obj2.url);
console.log(obj2)




