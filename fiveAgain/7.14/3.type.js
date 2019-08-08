// 判断数据类型 typeof constructor instanceof Object.prototype.toString.call
/**
 * typeof 不能判断数据 对象 null
 * 对象{} 数字 字符串 不能用constructor instanceof进行类型的判断
 * constructor 只能用来判断类直接new出来的对象,和数组的字面量，并且可能会受到原型链的影响
 * instanceof 容易收到祖类的干扰 
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
