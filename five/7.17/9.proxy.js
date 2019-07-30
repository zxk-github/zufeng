// Object.defineProperty 不能监听数组的变化

// Proxy 可以完整的代理一个对象，只要对对象进行了set/get操作 都会监听到, 但是只会代理一层对象

// proxy代理

let obj = {
    a: 1,
    name: {
        b: 1
    }
}

let handler = {
    get(target, key) {
        if(typeof target[key] === 'object') {
            return new Proxy(target[key], handler)
        }
        return Reflect.get(target, key);
    },
    set(target, key, value) {
        // target[key] = value
        console.log('update')
        return Reflect.set(target, key, value);
    }
}

let proxy = new Proxy(obj, handler);
proxy.name.b = 2