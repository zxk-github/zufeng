const context = {}
// 因为使用了this.context = Object.create(context) 所以当前函数内部this指向的并不是当前context变量，而是this.context 


/*
context.__defineGetter('url', function() {
    return this.request.url;
})
context.__defineGetter('path', function() {
    return this.request.path;
})
*/
function defineGetter(property, key) {
    context.__defineGetter__(key, function() {
        return this[property][key];
    })
}

function defineSetter(property, key) {
    context.__defineSetter__(key, function(val) {
        this[property][key] = val;
    })
}


defineGetter('request', 'url')
defineGetter('request', 'path')

defineGetter('response', 'body');
defineSetter('response', 'body')





module.exports = context;

/*
let obj = {
    a: 1,
    fn() {
        console.log(this.name)        
    }
}

let o = Object.create(obj);
o.name = 123;
o.fn()
*/
