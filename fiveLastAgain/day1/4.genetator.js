// generator生成器，用来生成迭代器
function* read() {
  yield 1;
  yield 2
  return 3
}
let it1 = read();
console.log(it1.next());
console.log(it1.next());
console.log(it1.next());

function* read2(arg) {
  console.log('arg', arg)
  let a = yield 1;
  console.log('a', a);
  let b = yield 2;
  console.log('b', b);
  return 3;
}
let it2 = read2('arg');
console.log(it2.next('自动忽略'))
console.log(it2.next('b'))
console.log(it2.next('c'))

function* read3() {
  try{
    yield 1;
    yield 2;
  } catch(e) {
    console.log(e);
  }
}
const it3 = read3();
it3.next()
it3.throw('321')







let fs = require('fs').promises;
function* read4() {
  try{
    let content = yield fs.readFile('./context.txt', 'utf8');
    let mvvm = yield fs.readFile(content, 'utf8');
    return mvvm;
  } catch(e) {
    console.log(e);
  }
}
let it4 = read4();
let {value, done} = it4.next();

value.then((data) => {
  let {value, done} = it4.next(data);
  value.then((data) => {
    let {value, done} = it4.next(data);
    console.log(value);
  }, (err) => {
    it4.throw(err)
  })  
}, (err) => {
  it4.throw(err)
})


// co库可以解决这种无限嵌套问题
function co(it) {
  return new Promise((resolve, reject) => {
    function next(data) {
      let {value, done} = it.next(data);
      if(!done) {
        Promise.resolve(value).then((data) => {
          next(data);
        }, (err) => {
          reject(err)
        })
      } else {
        resolve(value)
      }
    }
    next()
  })
}

co(read4()).then((data) => {
  console.log(data)
}, (err) => {
  console.log(err)
})












