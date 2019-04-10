function EventEmit() {
    this.events = {};
}
// 给指定事件绑定事件处理函数 1 参数类型，2 事件监听函数
EventEmit.prototype.on = EventEmit.prototype.addListener = function(type, listener) {
    if(this.events[type]) {
        this.events[type].push(listener);
    } else {
        this.events[type] = [listener];
    }
}

// 移除某个事件所有监听函数
EventEmit.prototype.once

EventEmit.prototype.once = function(type, listener) {
    // 用完立即销毁
    let  wrapper = (...rest) => {
        listener.apply(this, rest);
        this.removeListener(type, wrapper);
    }   
    this.on(type, wrapper);
}

EventEmit.prototype.emit = function(type, ...rest) {
    this.events[type] && this.events[type].forEach(listener => listener.apply(this, rest));
}

EventEmit.prototype.removeListener = function(type, listener) {
    if(this.events[type] && this.events[type].length > 0) {
        this.events[type] = this.events[type].filter(l => l != listener);
    }
}

module.exports = EventEmit;


