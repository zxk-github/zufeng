const EventEmitter = require('events');
const util = require('util');

function Bell() {
    EventEmitter.call(this);
}

// 进行原型继承 继承公用

// Bell.prototype.__proto__ = EventEmitter.prototype
// Object.setPrototypeOf(Bell.prototype, EventEmitter.prototype);
util.inherits(Bell, EventEmitter);


let bell = new Bell();
bell.on('newListener', function(event, listener) {
    console.log(event, listener)  // 事件名称和事件回调函数函数
})
bell.on('lock', function() {
    console.log('学生进来了')
})
bell.on('lock', function() {
    console.log('老师进来了')
})

bell.emit('lock')

