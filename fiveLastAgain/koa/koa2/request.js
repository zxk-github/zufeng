let request = {
  get path() {
    return this.req.path
  }
};

module.exports = request;


let obj = {}

let request = {
  get path() {
    console.log(this === obj.oRequest)  // true
    // return this.path;
  }
};
let oRequest = Object.create(request);
obj.oRequest = oRequest;
obj.oRequest.path;