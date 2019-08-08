const fs = require('fs');

// 读取完成之后,调用对应的函数

const school = {}
function out() {
    if(Object.keys(school).length === 2) {
        console.log('读取完成');
    }
}

const fs = require('fs');
fs.readFile('./name.txt', 'utf8', (err, data) => {
    school.name = data
    out();
})

fs.readFile('./age.txt', 'utf8', (err, data) => {
    school.age = data
    out();
})

// school全局 如果增加新的读取 需要修改之前的源码

// 修改 
function contr(len,cb) {
    const school = {}
    return (key, value) => {
        school[key] = value;
        if(Object.keys(school) === len) {
            cb(school);
        }
    }
}

var out = contr(2, (school) => {
    console.log('读取完成', school);
})

const fs = require('fs');
fs.readFile('./name.txt', 'utf8', (err, data) => {
    // school.name = data
    out('name', data);
})

var fs = require('fs')
fs.readFile('./age.txt', 'utf8', (err, data) => {
    // school.age = data
    console.log(data);
    // out('age', data);
})


