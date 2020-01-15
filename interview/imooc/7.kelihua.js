//  柯里化 currying 把接受多个参数的函数变成接受一个单一参数的函数，并且返回接受余下参数而且返回结果的新函数的技术

// 普通函数
function add(x, y) {
    return x + y;
}

function curryAdd(x) {
    return function(y) {
        return x + y;
    }
}

add(1, 2);
carryAdd(1)(2);

// 科里化(currying)好处

// 1.参数复用
function check(reg, txt) {
    return reg.test(txt);
}

check(/\d+/g, 'test') //false
check(/\w/g, 'test')  // true
 
function curryCheck(reg) {
    return function(txt) {
        return reg.test(txt)
    }
}

const regNum = curryCheck(/\d+/g);
console.log(regNum('123')) // true

// 2. 提前确认
var on = function(element, event, handler) {
    if(document.addEventListener) {
        if(element && event && handler) {
            element.addEventListener(event, handler, false);
        }
    } else {
        if(element && event && handler) {
            element.attachEvent('on'+event, handler)
        }
    }
}

var on = (function() {
    if(window.addEventListener) {
        return function(element, event, handler) {
            if(element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        }
    } else {
        return function(element, event, handler) {
            if(element && event && handler) {
                element.attchEvent(`on${event}`, handler);
            }
        }
    }
})()

// 避免了每次执行on函数都进行一次判断

// 3. 延时执行
Function.prototype.bind = function(context) {
    const _this= this;
    const arg = Array.prototype.slice.call(arguments, 1);
    return function() {
        return this.apply(context, args);
    }
}


// currying为实现多参函数提供了一个递归降解的实现思路--把接受多个参数的函数变成接受一个单一参数(最初函数的第一参数)的函数，并且返回接受余下的参数的新函数

// curring 只传递给函数一部分参数来调用它，让他返回一个函数去处理剩下的参数
function add(x, y) {
    return x + y;
}

function curriedAdd(x) {
    return function(y) {
        return x + y;
    }
}

// 因为上面的方式重写了函数，所以不通用，因为不能通过重写函数本身来实现科里化

// 但是这个currying的实现表明了实现currying的一个基础---curring延迟求值的特性需要用到js的作用域
// 说的更加通俗一些就是我们需要作用域来保存上一次


// js函数编程
// curry的概念 只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数
var add = function(x) {
    return function(y) {
        return x + y;
    }
}

var addTen = add(1);
console.log(addTen(2))
// 定义了一个add函数，它接受一个参数并返回一个新的函数，调用add之后，返回的函数就通过闭包的方式记住了add的第一个参数
// 一次性的调用它实在是优点猥琐，好在我们可以使用一个特殊的curry帮助函数(help function)使这类函数的定义和调用更加容易











