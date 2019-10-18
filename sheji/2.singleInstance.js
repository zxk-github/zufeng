class SingleObject{
  login() {
    console.log('login');
  }
}

SingleObject.getInstance = (function() {
  let instance;
  return function() {
    if(!instance) {
      instance = new SingleObject();
    }
    return instance;
  }
})()

let obj1 = SingleObject.getInstance();
let obj2 = SingleObject.getInstance();
console.log(obj1 === obj2)


class LoginForm {
  constructor() {
    this.state = 'hide';
  }

  show() {
    this.state = 'show';
  }

  hide() {
    this.state = 'hide';
  }
}

LoginForm.getInstance = (function() {
  let instance;
  return function() {
    if(!instance) {
      instance = new LoginForm();
    }
    return instance;
  }
})()