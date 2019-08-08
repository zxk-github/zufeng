function say(who) {
    console.log(who + '说话');
}

Function.prototype.before = function(beforeFn) {
    return (...args) => {
        beforeFn();
        this(args);
    }
}
let fn = say.before(() => {
    console.log('提前准备')
})

fn('我');
// 在不破坏原有函数的基础上 加一些其他的逻辑




