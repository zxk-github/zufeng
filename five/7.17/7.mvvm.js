// 实现vue数据劫持

var obj = {
    name: {
        a: 1
    }
};
function update() {
    console.log('更新视图')
}

let oldArrayPrototype = Array.prototype;
let newArrayPrototype = Object.create(oldArrayPrototype);
['push', 'shift'].forEach(item => {
    newArrayPrototype[item] = function() {
        update();
        oldArrayPrototype[item].apply(this, arguments);
    }
 })

function observer(param) {
    if(Array.isArray(param)) {
        return Object.setPrototypeOf(param, newArrayPrototype);
    }
    if(typeof param !== 'object') {
        return param;
    }
    Object.keys(param).forEach(key => defineReactive(param, key, param[key]));
}

function defineReactive(obj, key, value) {
    observer(value);
    Object.defineProperty(obj, key, {
        get() {
            return value;
        },
        set(newVal) {
            if(value !== newVal) {
                value = newVal;
                observer(newVal);
                update();
            }
        }
    })
}

observer(obj);
// obj.name.a = 2;
obj.name = {b: 1};
obj.name.b = 4;

