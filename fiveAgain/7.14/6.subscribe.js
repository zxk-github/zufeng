//发布订阅没送 i hi
// 读取完成之后,调用对应的函数
const fs = require('fs');

class Events {
    constructor() {
        this.statcks = [];
    }

    on(callback) {
        this.statcks.push(callback);
    }
    
    emit() {
        this.statcks.forEach(fn => {
            fn();
        });
    }
}

const events = new Events();
const school = {};
events.on(() => {
    console.log('读取完毕')
})
events.on(() => {
    if(Object.keys(school).length === 2) {
        console.log(school);
    }
})

fs.readFile('./name.txt', 'utf8', (err, data) => {
    school.name = data
    events.emit()
})

fs.readFile('./age.txt', 'utf8', (err, data) => {
    school.age = data
    events.emit()
})