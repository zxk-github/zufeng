// defineProperty 定义属性

// 简写
// getter setter 属性访问器
let obj = {
    _body: '',
    get url () {
        return this._body;
    },
    set url(value) {
        this._body = value;
    }
}
obj.url = 20;
console.log(obj.url);
console.log(obj);

let other;
Object.defineProperty(obj, 'name', {
    get() {
        return other;
    }, 
    set(value) {
        other = value;
    },
    enumerable: true,
    configurable: true
    // writable: true 设置完get/set之后，就不能使用writable， 这个东西和value一起使用
})
console.log(obj); //{ _body: 20, url: [Getter/Setter] } 说明通过defineProperty定义的变量默认是不可枚举的







