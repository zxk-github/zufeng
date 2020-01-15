const context = {};

context.__defineGetter__('url', function(){
  return this.request.url;
})

function defineGetter(name, key) {
  context.__defineGetter__(key, function() {
    return this[name][key];
  })
}

context.__defineSetter__('body', function(value) {
  console.log(value)
  this.response.body = value
})

defineGetter('response', 'body')
function defineSetter() {

}

defineGetter('request', 'path')

module.exports = context;