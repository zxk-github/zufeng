function after(times, callback) {
  return function() {
    if(--times === 0) {
      callback()
    }
  }
}

let fn = after(3, () => {
  console.log('执行完成');
})
fn();
fn();
fn();


function readAfter(times, callback) {
  let school = {};
  return (name, data) => {
    school[name] = data
    if(--times == 0) {
      callback(school)
    }
  }
}

let out = readAfter(2, (school) => {
  console.log(school);
})

let fs = require('fs');
fs.readFile('./2.type.js', 'utf8', (err, data) => {
  out('type', data)
})
fs.readFile('./3.after.js', 'utf8', (err, data) => {
  out('after', data)
})

// 发布订阅
class Events {
  constructor() {
    this.stack = [];
  }
  emit() {
    this.stack.forEach(callback => callback())
  }
  on(callback) {
    this.stack.push(callback)
  }
}

let events = new Events();
let school = {};
events.on(function() {
  if(Object.keys(school).length === 2) {
    console.log(school);
  }
})

event.on(function (){
  console.log('读取完毕')
})

let fs = require('fs');
fs.readFile('./2.type.js', 'utf8', (err, data) => {
  events.emit();
})

class Subject {
  constructor() {
    this.stack = [];
    this.state = '开心'
  }

  attach(observer) {
    this.stack.push(observer)
  }
  setState(newState) {
    this.state = newState;
    this.stack.forEach(o => o.update(newState));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  update(newState) {
    console.log(this.name + 'baby' + newState)
  }
}
let o1 = new Observer('fa');
let sub = new Subject();
sub.attach(o1);
sub.setState('no')




try {
  console.log(1)
  throw new Error(11111);
} catch(e) {
  console.log('11', e)
}