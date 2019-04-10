let EventEmitter = require('events');
// let EventEmitter = require('./6.events')
let util = require('util');

function Bell() {
    EventEmitter.call(this);
}

// 进行原型继承 继承公有方法
// Object.setPrototypeOf(ctor.prototype, superCtor.prototype)
// ctor.prototype.__proto__ = superCtor.prototype
util.inherits(Bell, EventEmitter);

let bell = new Bell();

function stu(room, things) {
    console.log(`stu come in ${room} ${things}`)
} 

function tea(room, things) {
    console.log(`tea come in ${room} ${things}`);
}

function tou(room, things) {
    console.log(`tou come in ${room} ${things}`);
}


bell.on('time', stu);
bell.on('time', tea);
bell.once('time', tou)

bell.emit('time', '301', 'book');
bell.emit('time', '301', 'book');

