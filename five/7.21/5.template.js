// 模版字符串
let name = 'zhang';
let age = 10;
let str = "<ul><li>${name} ${age}</li></ul>"

let result = str.replace(/\$\{([^}]+)\}/g, function() {
    return eval(arguments[1]);
})
console.log(result);

// with 可以改变上下文

with({name: 1}) {
    console.log(name) // 作用域内 this指向当前这个对象
}

// eval的缺陷
// let fn = new Function('obj', scriptStr);
// fn()




