function Window(name) {
    this.name = name;
}

Window.prototype.getName = function() {

}

const createSingle = function(constructor) {
    let instance;
    return function(name) {
        if(!instance) {
            constructor.apply(this, arguments);
            Object.setPrototypeOf(this, constructor.prototype);
            instance = this;
        }
        return instance;
    }
}

const createWindow = createSingle(Window);
const w1 = new createWindow('Window');
const w2 = new createWindow('Window');
console.log(w1 === w2);