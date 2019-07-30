// 发布订阅
// 先订阅，往数组中添加函数，当事情触发的时候，会一次性执行所有函数， 一对多的关系
// 订阅的过程就是往数组中添加函数，发布就是执行所有函数
const fs = require('fs');
class Events{
    constructor() {
        this.stacks = [];
    }
    on(callback) {
        this.stacks.push(callback);
    }
    emit() {
        this.stacks.forEach(callback => callback());
    }
}

const event = new Events();
let school = {}
event.on(() => {
    console.log('读取完毕')
})
event.on(() => {
    if(Object.keys(school).length === 2) {
        console.log(school);
    }
})

fs.readFile('name.txt', 'utf8', (err, data) => {
    school.name = data;
    event.emit();
})
fs.readFile('age.txt', 'utf8', (err, data) => {
    school.age = data;
    event.emit();
})


// 观察者模式基于发布订阅模式的
// 发布和订阅 两者之间没有关系
// 观察者模式 被观察的和观察者 需要把被观察者放到被观察者中
// 例子 小宝宝(被观察者)很开心，父母(观察者)，需要将父母放到小宝宝内部，小宝宝不开心的时候，会主动的通知父母不开心


