function EventEmitter() {
    this.events = {};  // 会把所有的事件监听函数保存在这里
    this._maxListener = 10 // 设置最大监听函数数量
}

// 添加事件监听函数
EventEmitter.prototype.on = function(type, listener) {
    if(this.events[type]) {
        this.events[type].push(listener);
        if(this._maxListener != 0 &&  this.events[type].length > this._maxListener) {
            console.error('超出限制')
        }
    } else {   
        this.events[type] = [listener];
    }
}

EventEmitter.prototype.emit = function(type, ...rest) {
    if(this.events[type]) {
        this.events[type].forEach(listener => {
            listener.apply(this, rest)
        });
    }
}

EventEmitter.prototype.once = function(type, listener) {
    let wapper = (...rest) => {
        listener.apply(this, rest);
        this.removeListener(type, wapper);
    }
    this.on(type, wapper);
}

EventEmitter.prototype.removeListener = function(type) {
    if(this.events[type]) {
        this.events[type] = this.events[type].filter(l => l !== listener);
    }
}

EventEmitter.prototype.removeAllListeners = function(type) {
    delete this.events[type];
}

EventEmitter.prototype.listeners = function(type) {
    return this.events[types]; //返回指定事件的所有监听函数 
}

