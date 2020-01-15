const request = {
  get url() {
    return this.req.url;
    // ctx.request.url 那么这里面的this就指向ctx.request, 所以ctx.request.req就能等价与this.req，所欲可以返回this.req.url
  },
  get path() {
    return this.req.url;
  }
};


module.exports = request;