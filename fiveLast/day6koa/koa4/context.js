const context = {}

context.__defineGetter__('path', function() {
  return this.request.path
})

function defineGetter(property, key) {
  context.__defineGetter__(key, function() {
    return this[property][key]
  })
}

defineGetter('request', 'url')
defineGetter('response', 'body')

function defineSetter(property, key) {
  context.__defineSetter__(key, function(value) {
    this[property][key] = value;
  }) 
}

defineGetter('response', 'body');
defineSetter('response', 'body') // ctx.body = 123  ==> ctx.response.body = 123


/**
 *  context = {
 *    get path() {
 *      return this.request.path 这种当时不行吗？
 *    }
 *  }
 *   
 */



module.exports = context;