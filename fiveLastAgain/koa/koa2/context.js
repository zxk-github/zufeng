let context = {};


context.__defineGetter__('path', function() {
  return this.request.path;
})

context.__defineSetter__('body', function(value) {
  return this.response.body = value;
})

function defineGetter(property, key) {
  context.__defineGetter__(key, function() {
    return this[property][key]
  })
}

function defineSetter(property, key) {
  context.__defineSetter__(key, function(value) {
    this[property][key] = value;
  })
}

module.exports = context;