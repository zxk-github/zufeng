// 因为存在变量提升，但是class没有，所以装饰器只能用来修饰类和类的属性和方法

@add
class My {
    @enumerable 
    @readonly 
    PI = 3.14;
    
    @beforeSay 
    say() {
        console.log('say')
    }
}

function add(target) {
    target.type = 'my';
}

function readonly(target, key, descriptor) {
    // console.log(target, key, descriptor.initializer())
    // console.log(My.prototype === target);  // 因为在进行修饰PI调用修饰器的时候，这时候直接使用，会出现错误提示
    descriptor.writable = false;
    setTimeout(() => {
        // console.log(My.prototype === target) // true
    })
}

function enumerable(target, key, descriptor) {
    descriptor.enumerable = false;
}


function beforeSay(target, key, descriptor) {
    let oldSay = descriptor.value;
    descriptor.value = function() {
        console.log(this);
        console.log('before say');
        oldSay.call(this);
    }
} 

let my = new My();
// my.PI = '12';
console.log(my); // 3.14 修改之后依旧是3.14
// console.log(My.type)
for(name in my) {
    console.log(name)
}

my.say()


// 多个装饰器执行顺序 洋葱模型
// 如果装饰器是函数 会直接执行 内部装饰类的时候会从内部一次传递到外部去

@logger2()
@logger1()
class Logger{ 

}

function logger1() {
    console.log(2);
    return function() {
        console.log('1')
    }
}
function logger2() {
    console.log(3);
    return function() {
        console.log('4')
    }
}
// 应用 mixin

 
