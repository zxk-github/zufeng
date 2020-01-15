let url = require('url');
const request = {
  get url() { // 属性访问器 
    return this.req.url;  // 当使用ctx.request.url获取值的时候，这时候this指向的是ctx.request，就相当于访问ctx.request.req.url，然后就能获取到url的值了
  },
  get path() {
    return url.parse(this.req.url).pathname;
  }

}

module.exports = request;