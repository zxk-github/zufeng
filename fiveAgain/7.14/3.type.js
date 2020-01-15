// 判断数据类型 typeof constructor instanceof Object.prototype.toString.call
/**
 * typeof 不能判断对象 null, 不能判断对象是谁的实例
 * 对象 和原始数据类型需要加()才能使用constructor 进行类型的判断
 * constructor 可能会受到原型链的影响
 * instanceof 容易受到祖类的干扰 instanceof 不能用于简单数据类型的判断 1 instanceof Number // false
 * Object.prototype.toString.call 可以区分类型但是不能区分谁的实例
 *  */

function isType(type) {
    return (content) => {
        return Object.prototype.toString.call(content) === `[object ${type}]`;        
    }    
}
const isString = isType('String');

console.log(isString('a'));


// 实现函数的科里化 
function add(a, b, c, d) {
    return a + b + c + d;
}

function curring(fn, args = []) {
    let len = fn.length;
    return (..._) => {
        args.push(..._);
        if(args.length < len) {
            return curring(fn, args);
        }
        return fn(...args);
    }
}

var c = curring(add)(1,3)(2);
console.log(c(1));




