

function update() {
  console.log('视图更新了~~')
}

let oldPrototype = Array.prototype;
let proto = Object.create(oldPrototype);
['push', 'pop'].forEach((item) => {
  proto[item] = function() {
    oldPrototype[item].apply(this, arguments);
    update();
  }
})

function observer(value) {
  if(typeof value !== 'object') {
    return value;
  }
  if(Array.isArray(value)) {
    // return value.__proto__ = proto;
    return Object.setPrototypeOf(value, proto);
  }

  Object.keys(value).forEach((key) => {
    defineProperty(value, key, value[key]);
  }) 
}

function defineProperty(obj, key, value) {
  observer(value);
  Object.defineProperty(obj, key, {
    get() {
      return value;
    },
    set(newValue) {
      if(value !== newValue) {
        observer(newValue);
        value = newValue;
        update();
      }
    }
  })
}

const obj = {a: 1, b: {a: 1}};
observer(obj);
obj.a = [1,2,4];
obj.a.push(2);
obj.a.push(3);

