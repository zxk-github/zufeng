// 判断数据类型 typeof constructor instanceof Obeject.prototype.toString.call
/**
 * typeof 不能区分数组和对象
 * constructor 只有类上存在，并且可能会收到原型链的影响
 * instanceof 不能直接区分父类和祖类那一个的实例
 * Obeject.prototype.toString.call 能显示出来具体的类型，但是不能区别当前属于谁的实例(可以用来判断是数组还是对象)
 *  */

function isType(type) {
    return function(content) {
        return Object.prototype.toString.call(content) === `[object ${type}]`
    }
}

let types = ['String', 'Number', 'Array', 'Object', 'Boolean'];
let util = {};
types.forEach(type => {
    util['is' + type] = isType(type);  //预设置参数 和bind类似
})
let flag = util.isString('aa');
console.log(flag);

// 如何实现科里化函数
function fn(a, b, c) {
    return a + b + c;
}
function fn(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        }
    }
}
// 偏函数
function fn(a, b) {
    return function(c) {
        return a + b + c;
    }
}


