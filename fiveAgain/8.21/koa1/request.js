const url = require('url');
// 利用各种工具函数 对参数进行处理
const request = {
    get url() {
        return this.req.url;  // this指向的是 this.request ctx.request.req获取的是原生对象
    },

    get path() {
        return url.parse(this.req.url).pathname;
    }


}

module.exports = request; 