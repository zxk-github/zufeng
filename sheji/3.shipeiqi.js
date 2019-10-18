class Adaptee {
  specilficRequest() {
    rerurn '旧的'
  }
}

class Target {
  constructor() {
    this.adaptee = new Adaptee();
  }
  request() {
    let info = this.adaptee.specilficRequest();
    return `${info} -- 新的`
  }
}

let target = new Target();
let res = target.request();
console.log(res.request());