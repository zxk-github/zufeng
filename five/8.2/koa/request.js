let url = require('url');

const request = {
    get url() {  // 访问器
        return this.req.url; // this指向ctx.request  ctx.request.req可以获取原生对象
    },

    get path() {
        return url.parse(this.req.url).pathname; // 通过这种方式添加一些原生不具备的属性
    }
}

module.exports = request;