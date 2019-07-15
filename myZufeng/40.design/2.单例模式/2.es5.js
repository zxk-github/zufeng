function Window(name) {
    this.name = name;
}
Window.getInstance = (function() {
    let instance;
    return function() {
        if(!instance) {
            instance = new Window();
        }
        return instance;
    }
})()

let w1 = Window.getInstance();
let w2 = Window.getInstance();
console.log(w1 === w2);


/**
 * 
 * 单例作用是实现单一数据的共享 
 * 
 * 缺点:
 * 1. 使用者必须知道这是一个单例，并且必须主动的调用window.getInstance方法
 * 2. 不能阻止使用者创建新的Window实例(new Window())
 * 
 * 
 * 期待 直接可以new Window() 并且创建之后还是单例的   透明单例模式
 *  */