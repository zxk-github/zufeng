// it.next 就是迭代器

//深度克隆
function deepClone(parent, child = {}) {
    for(let key in parent) {
        if(parent.hasOwnProperty(key)) {
            if(typeof parent[key] === 'object') {
                child[key] = Array.isArray(parent[key]) ? [] : {}
                deepClone(parent[key], child[key])
            } else {
                child[key] = parent[key]
            }
        }
    }
    return child;
}

function deep(data) {
    let child = Array.isArray(data) ? [] : {};
    let keys = Object.keys(data);
    for(key of keys) {
        child[key] = typeof data[key] === 'object'? deep(data[key]) : child[key] = data[key];
    }
    return child;
}

var obj = {
    c: {
        a: 1, 
        b: [1,2,3]
    }
}

var obj2 = 
console.log(deep(obj))

