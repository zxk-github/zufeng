class Circle {
  draw() {
    console.log('画圆')
  }
}

class Decorator{ 
  constructor(circle) {
    this.circle = circle;
  }

  draw() {
    this.circle.draw();
    this.setRedBorder(circle);
  }
  setRedBorder(circle) {
    console.log('红色')
  }
}

let circle = new Circle();
let doc = new Decorator(circle);
doc.draw();