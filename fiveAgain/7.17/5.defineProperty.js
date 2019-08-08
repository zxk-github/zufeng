// 访问器
let obj  = {
    _body: '',
    get url () {
        return this._body;
    },
    set url(val) {
        this._body = val;
    }
}

obj.url = '12'
console.log(obj.url);

Object.defineProperty(obj, 'name', {
    value: 112,
    configurable: false,
    writable: true
})
obj.name = 123
console.log(obj.name)