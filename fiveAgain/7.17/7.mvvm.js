function update() {
    console.log('更新了');
}

const oldArrayPrototype = Array.prototype;
const newArrayPrototype = Object.create(oldArrayPrototype);
['push', 'shift'].forEach(item => {
    newArrayPrototype[item] = function() {
        update();
        oldArrayPrototype[item].apply(this, arguments);
    }
})

function observer(obj) {
    if(Array.isArray(obj)) {
        return Object.setPrototypeOf(obj, newArrayPrototype);
    }
    if(typeof obj !== 'object') {
        return obj;
    }
    Object.keys(obj).forEach(key => {
        defineReative(obj, key, obj[key]);
    })
}

function defineReative(obj, key, value) {
    observer(value);
    Object.defineProperty(obj, key, {
        get() {
            return value;
        },
        set(newValue) {
            if(value !== newValue) {
                observer(newValue);
                value = newValue;
                update();
            }
        }
    })
}

var obj = {
    a : 1,
    b: 2,
    c: [1,2,3]
}
observer(obj);
// obj.a = 3;
// console.log(obj.a);
obj.c.push(4);
