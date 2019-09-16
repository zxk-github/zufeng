let context = {};  //context 就做了一件事，代理response和request上的属性

context.__definGetter__('request', function() {
  return this.request.url;
})

module.exports = context;


