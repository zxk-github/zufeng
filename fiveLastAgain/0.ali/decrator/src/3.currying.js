function add(a, b, c, d) {
  return a + b + c + d
}

// 函数拆解成小块便于组合

function curring(fn, args = []) {
  return function() {
    let len = fn.length;
    return (..._) => {
      args.push(..._);
      if(args.length < len) {
        return curring(fn, args)
      } else {
        return  fn(...args)
      }
    }
  }
}

const r = curring(add)(1)(2,3)(4);



// 科里化的反函数
let sum = function(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    }
  }
}
function curring1(fn) {
  return (...args) => {
    args.forEach((arg) => {
      fn = fn(arg)
    }) 
    return fn;
  }
}

console.log(curring1(sum)(1,2,3))


// 反科里化 扩大函数的使用范围
const uncurring = function(fn) {
  return (...args) => {
    return fn.call(...args);
  }
}

let checkType = uncurring(Object.prototype.toString);
console.log(checkType(1))

Function.prototype.uncurring = function(){
  return (...args) => {
    return Function.prototype.call.apply(this, args)
  }  
}





// 科里化
function curring(fn, args = []) {
  let len = fn.length;
  return (..._) => {
    args.push(..._);
    if(args.length < len) {
      return curring(fn, args);
    } else {
      return fn(...args);
    }
  }
}
function add(a, b, c, d) {
  return a + b + c + d;
}

console.log(curring(add)(1)(2,3)(4));

let add1 = a => b => c => a + b + c; 
function uncurring1() {
  
}