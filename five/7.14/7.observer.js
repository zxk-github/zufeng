class Subject { // 被观察者
    constructor() {
        this.stack = [];
        this.state = '开心';
    }
    attach(observer) {
        this.stack.push(observer);
    }
    setState(newState) {
        this.state = newState;
        this.stack.forEach(o => o.update(newState));
    }
}

class Observer { //观察者
    constructor(name) {
        this.name = name;
    }
    update(newState) {
        console.log(this.name + newState);
    }
}

let o1 = new Observer('爸爸')
let o2 = new Observer('mama')

let s = new Subject();
s.attach(o1)
s.attach(o2)
s.setState('不开心');

var a = {a: 1, b : 1} 

for(let name of a) {
    console.log(name)
}

var ob1 = {a: 1}

console.log({...ob1});
