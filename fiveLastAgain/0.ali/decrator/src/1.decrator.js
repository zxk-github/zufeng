/**
 *  装饰器可以装饰类 但是在装饰器中直接使用到类的构造函数的时候这时候没有
 *  
 */

@add
class My {
    constructor(){

    }
}

function add(target, key, des) {
    target.type = 'my';
    setTimeout(() => {
      console.log(target === My)
    }) 
}
console.log(My.type)
