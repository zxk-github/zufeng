const http = require("http");
const context = require('./context');
const request = require('./request');
const response = require('./response');

class Koa {
  constructor() {
    this.context = Object.create(context); //利用原型链，防止操作context引起原文的变化
    this.request = Object.create(request); 
    this.response = Object.create(response);
  }

  // 创建执行上下文 
  createContext(req, res) {
    let ctx = this.context;
    ctx.request = this.request; // 将封装的request放到ctx上，也是为了满足ctx.request.url
    ctx.request.req = req; // 为了满足ctx.request.req.url
    ctx.req = req; // 为了满足ctx.req.url
    // ctx.url --> this.context.url --> context.url
    // 
  }

  handleRequest(req, res) {
    let ctx = this.createContext(req, res);
  }

  listen() {
    http.createServer(this.handleRequest.bind(this)).listen(...arguments)
  }
}

module.exports = Koa;