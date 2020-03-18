

function update() {
  console.log('数据更新了')
}

let oldProto = Array.prototype;
let newProto = Object.create(oldProto);
['push', 'pop', 'shift'].forEach((prop) => {
  newProto[prop] = function() {
    update();
    oldProto[prop].call(this, ...arguments)
  }
})

function observer(data) {
  if(typeof data !== 'object' || data == null ) {
    return data;
  }

  if(Array.isArray(data)) {
    Object.setPrototypeOf(data, newProto)
    data.forEach(item => {
      observer(item)
    });
    return ;
  } else {
    Object.keys(data).forEach(key => {
      defineObserver(data, key, data[key]) 
    });
  }
}

function defineObserver(obj, key, value) {
  observer(value)
  Object.defineProperty(obj, key, {
    get() {
      return value;
    },
    set(newValue) {
      if(newValue !== value) {
        value = newValue;
        observer(newValue)
        update()
      }
    }
  })
}

let obj = {
  a: 1,
  b: {
    c: 1
  },
  c: [1],
  d: [{a :[{a: 1}]}]
}
observer(obj)
// obj.c.push(2)
obj.d[0].a[0].a = 2



let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let data = {
  name: '姓名',
  age: 18
}
render(template, data); // 我是姓名，年龄18，性别undefined

function render(template, data) {
	let result = template.replace(/\{\{\(\w+)\}\}/g, function(match, p1) {
    	  
    })
}
