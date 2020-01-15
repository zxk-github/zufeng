function add(a, b, c, d) {
    return a + b + c + d;
}

// 把函数拆解成小的部分，方便组合
function curring(fn, args = []) {
    // console.log(fn.length);  fn.length可以获取到函数参数的个数
    let len = fn.length;
    return (..._) => {  // 原则就是把每次参数保存在一个数组中，最后一次性传入到fn中
        args.push(..._);
        if(args.length < len) {
            return curring(fn, args);
        }
        return fn(...args);
    }
    
}
const r = curring(add)(1)(2,3)(4);
console.log(r);
// 先保存每次调用后的参数

const fn = curring(add)(1)(2,3);
console.log(fn(4));   // 可以把参数分布进行传入

// 使用
const isType = (type, content) => {
    return Object.prototype.toString.call(content) === `[object ${type}]`;
}
const isString = curring(isType)('String');
console.log(isString([]));

// 科里化的反函数
let sum = a => b => c => d => {
    return a + b + c + d;
}

function uncrring(fn) {
    return (...args) => {
        args.forEach(arg => {
            fn = fn(arg);
        })
        return fn;
    }
}

let ur = uncrring(sum)(1,2,3,4);
console.log(ur);

// 反科里化 放大函数的使用范围，别人的东西我可以直接拿过来使用
const uncrrings = function(fn) {
    return (...args) => {
        return fn.call(...args);
    }
}
let checkType = uncrrings(Object.prototype.toString);
let re = checkType(1);
console.log(re);


Function.prototype.uncrring = function() {
    return (...args) => {
        // Function.prototype.call获取到call方法
        // call/apply作用 1.改变函数的this, 2. 让函数执行
        // let callFn = Function.prototype.call
        // callFn函数中的this指向Object.prototype.toString
        // Object.prototype.toString.call(1)
        return Function.prototype.call.apply(this, args);
        // return this.call(...args);
    }
}

let checkType = Object.prototype.toString.uncrring();
console.log(checkType(1));






function throttle(fn, timeout = 30) {
	let sys = true;
  	if(sys) {
      	setTimeout(() => {
    	  fn()
    	}, timeout)
    }
}

throttle(fn, 200) 