let Window = (function() {
    let window ;
    let Window = function(name) {
        if(window) {
            return window;
        } else {
            this.name = name;
            return (window = this);
        }
    }   
    return Window;
})()

/**
 * new 的过程
 * 创建一个对象，构造函数内部this指向这个对象，如果构造函数没有返回值或者返回值是简单数据类型，那么实例就是当前的对象，如果不是，实例就是返回值
 * 
 *  */

let w1 = new Window();
let w2 = new Window();
console.log(w1 === w2);

/**
 * 这个写法违反了 单一职责原则：构造函数和返回单例逻辑在一起了
 *
 *  */

