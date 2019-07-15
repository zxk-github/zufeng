function Window(name) {
    this.name = name;
}
Window.prototype.getName = function() {

}

var createSingle = (function() {
    let instance;
    return function() {
        if(!instance) {
            instance = new Window();
        }
        return instance;
    }
})()

const w1 = createSingle();
const w2 = createSingle();
console.log(w1 === w2);

// 现在构造函数和单例逻辑进行了分离，但是单例创建函数不能进行通用

