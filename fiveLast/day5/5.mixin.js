// 写一个mixin

const mixin = function(superClass) {
  return class extends superClass {
    beforeCreate() {
      console.log('mixin')
      super.beforeCreate()
    }
  }
}
class Parent {
  beforeCreate() {
    console.log('parent')
  }
}

class Child extends mixin(Parent) {
  beforeCreate() {
    super.beforeCreate();
    console.log('chidrent')
  }
}
let child = new Child();
child.beforeCreate()
