function Window(name) {
    this.name = name;
}
Window.prototype.getName = function() {

}

let createSingle = function(constructor) {
    let instance;
    let singleConstructor = function() {
        if(!instance) {
            constructor.apply(this, arguments);
            singleConstructor.prototype = Object.assign(constructor.prototype);
            instance = this;
        }
        return instance;
    }
    return singleConstructor;
}

const singleConst = createSingle(Window);
const w1 = new singleConst('zhang')
const w2 = new singleConst('zhang')
console.log(w1 === w2);