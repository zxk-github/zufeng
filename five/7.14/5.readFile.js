const fs = require('fs');

const school = {};
function out() {
    if(Object.keys(school).length === 2) {
        console.log(school);
    }
}
fs.readFile('name.txt', 'utf8', (err, data) => {
    school.name = data;
    out();
})
fs.readFile('age.txt', 'utf8', (err, data) => {
    school.age = data;
    out();
})

// 上面代码存在问题
// 1. school是一个本模块全局变量
// 2. 以后每次增加一个读取情况都需要改变out中的length判断长度
const fs = require('fs');
function res(times, callback) {
    let school = {}
    return function(key, value) {
        school[key] = value;
        if(--times === 0) {
            callback(school);
        }
    }
}
var out = res(2, (school) => {
    console.log(school)
})

fs.readFile('name.txt', 'utf8', (err, data) => {
    out('name', data);
})
fs.readFile('age.txt', 'utf8', (err, data) => {
    out('age', data);
})

// 但是上面的after只能绑定一个callback, 如果向绑定多个，可以使用发布订阅模式