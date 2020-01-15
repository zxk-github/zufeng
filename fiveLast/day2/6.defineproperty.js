// defineProperty 定义属性 
// getter setter 属性访问器


let obj1 = {
  _body: '',
  get url() {
    return this._body;
  },
  set url(value) {
    this._body = value;
  }
}

Object.defineProperty(obj1, 'name', {
  get() {

  },
  set() {

  }
})


// mvvm
function updateView() {
  console.log('更新视图')
} 

// vue 变异方法 push shift splice pop unshift


let oldProto = Array.prototype;
let proto = Object.create(oldProto);
['push', 'shift', 'pop'].forEach(item => {
  proto[item] = function(){
    updateView();
    oldProto[item].apply(this, arguments);
  }
})


function observer(data) {
  if(Array.isArray(data)) {
    // 重写数组的方法
    data.__proto__ = proto;
    return;
  } 

  if(typeof data !== 'object' || data == null) {
    return data
  }
  Object.keys(data).forEach((key) => {
    defineReactive(data, key, data[key]);
  })
}

function defineReactive(obj, key, value) {
  observer(value); // 如果值是对象继续增加getter setter
  Object.defineProperty(obj, key , {
    get() {
      return value;
    },
    set(newValue) {
      if(newValue !== value) {
        observer(newValue)  // 设置的时候如果是getter setter 也需要添加一次
        value = newValue;
        updateView();
      }
    }

  })
}

let o1 = {a: {b: 1}}
observer(o1);
// o1.a.b = 2

let arr = [1,2]
observer(arr);
arr.push(1);








