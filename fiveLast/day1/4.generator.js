// generator 生成器，用来生成迭代器iterator
function* read() {
  try{
    console.log(1);
    yield 1;
    console.log(2);
    yield 2;
    console.log(3);
  } catch(e) {
    console.log(e);
  }
  
}

const it1 = read();
console.log(it1.next());
it1.throw('出错了')  // 触发错误


function* read2(arg) {
  console.log(arg)
  let a = yield 1;
  console.log('a', a);
  let b = yield 2;
  console.log('b', b);
  return b;
}

let it2 = read2('hello');
it2.next('word');
it2.next('zf');
it2.next('end');


let fs = require('fs').promises;
function* read3() {
  try {
    let content = yield fs.readFile('./content.txt', 'utf8');
    let age = yield fs.readFile(content, 'utf8');
    return age;
  } catch(e) {
    console.log(e);
  }
}

let it3 = read3();
let {value, done} = it3.next();
value.then(function(data) {
  let {value, done} = it3.next(data);
  value.then((data) => {
    let {value, done} = it3.next(data);
    console.log(value)
  }, (err) => {
    it3.throw (err);
  })
}, function(err) {
  it3.throw(err);
})

// co 库可以解决上面的无限嵌套问题
function co(it) {
  return new Promise((resolve, reject) => {
    function next(data) {
      let {value, done} = it.next(data);
      if(!done) { 
        Promise.resolve(value).then((data) => {
          next(data);
        }, reject) 
      } else {
        resolve(value);
      }
    }
    next();
  })
}
co(read()).then(function(data) {
  console.log(data);
}).catch(function(err) {
  console.log(err);
})


// async + await  就是genetator+co
// async函数如何自己实现 generator的如何简单实现



