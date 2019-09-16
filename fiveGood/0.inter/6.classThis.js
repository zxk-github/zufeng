const map = new Map();
map.set('key', function() {console.log(1)})
map.set('key', function () {console.log(2)})

console.log(map)

class Person {
  constructor(excutor) {
    function fn() {
      console.log(this)
    }
    fn();
    // this.excutor()()
    
  }
  excutor() {
    return function() {
      console.log(this)
      // this.fn1()
    }
    // function fn() {
    //   console.log(this)
    // }
    // fn();
    
  }

  fn1() {
    console.log(this);
  }
}

const person = new Person(function(fn) {
  fn()
})
