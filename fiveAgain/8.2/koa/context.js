const context =  {};

/*
context.__defineGetter__('url', function() {  // 因为this.context = Object.create(context) 所以通过this.context.url访问的时候在context对象中的this指向this.context
    return this.request.url;   // this.context.request等于this.request, this.request的原型是request对象，所以在request对象的内部this指向的是this.context.request; 因为this.context.request.req = req, 所以在request对象内部就就可以通过this.req访问到原生node模块
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


defineGetter('request', 'url');
defineGetter('request', 'path');

defineGetter('response', 'body');
defineSetter('response', 'body');

module.exports  = context;