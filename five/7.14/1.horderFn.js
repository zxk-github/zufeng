function say(who) {
    console.log(who + '开始说话');
}

// before函数
Function.prototype.before = function(beforeFn) {
    return (...args) => {
        beforeFn();
        this(...args);
    }
}

let beforeSay = say.before(() => {
    console.log('做好准备')
})
beforeSay('我');

// 在不破坏say函数的基础上，在say函数执行之前，加一些逻辑




