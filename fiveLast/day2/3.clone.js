let obj = {
  a: '',
  b: 0,
  c: null,
  d: undefined,
  e: function() {},
  f: /a/,
  g: new Date(),
  h: new Error('a')
}
console.log(JSON.parse(JSON.stringify(obj)))
/*
{ a: '',
  b: 0,
  c: null,
  f: {},
  g: '2019-11-24T02:43:43.717Z',
  h: {} }
*/

function deepClone(value, hash = new WeakMap()) {
  if(value == null) {
    return value;
  }
  if(value instanceof RegExp) {
    return new RegExp(value);
  }
  if(value instanceof Date) {
    return new Date(value)
  }
  if(value instanceof Error) {
    return new Error(value);
  }
  if(typeof value !== 'object') {
    return value;
  }
  if(hash.get(value)) {
    return hash.get(value)
  }
  let newValue = new value.constructor();
  hash.set(value, newValue)
  Object.keys(value).forEach((key) => {
    newValue[key] = deepClone(value[key], hash);
  })
  return newValue;
}
// 函数咋办？ 
let obj3 = {a: 1, b: {a: 1}}
let obj4 = deepClone(obj3)
obj3.b.a = 'a'
console.log(obj4)

let o = {}
o.x = o;
let o1 = deepClone(o);
console.log(o1)
