
console.log(Object.prototype.toString.call(1))    
console.log(Object.prototype.toString.call('a'))
console.log(Object.prototype.toString.call(null))
console.log(Object.prototype.toString.call(undefined))
console.log(Object.prototype.toString.call(function fn(){}))
console.log(Object.prototype.toString.call([]))
console.log(Object.prototype.toString.call({a:1}))
console.log(Object.prototype.toString.call(new Date()))
console.log(Object.prototype.toString.call(new Error()))
console.log(Object.prototype.toString.call(/a/))

// [object Number]
// [object String]
// [object Null]
// [object Undefined]
// [object Function]
// [object Array]
// [object Object]
// [object Date]
// [object Error]
// [object RegExp]



function update() {
  console.log('视图更新')
}

function isType(value, type) {
  return Object.prototype.toString.call(value) === `[object ${type}]`
}

let unNeedCopytypes = ['number', 'string', 'null', 'undefined', 'function', 'error', 'date', 'regexp', 'symbol']
function observer(value, hashes = new WeakMap()) {
  let type = Object.prototype.toString.call(value).match(/\[object\s(.+)\]/)[1].toLowerCase();
  if(unNeedCopytypes.includes(type)) {
    return value;
  }
  let hash = hashes.get(value);
  if(hash) {
    return hash;
  }
  const newValue = new value.constructor();
  hashes.set(value, newValue)
  Object.keys(value).forEach((key) => {
    newValue[key] = observer(value[key], hashes);
  })
  return newValue;
}

let obj = [{a: 1}, {b: {c: 1}}, [1,2], function() {}];
let obj2 = observer(obj)
obj2[0].a = 1000
obj2[2][0] = 10
console.log(obj2, obj)

var obj3 = {}
obj3.a = obj3
console.log(obj3)

let obj4 = observer(obj3);
console.log(obj4)

const a = Object.prototype.toString.call('1').match(/\[object\s(.+)\]/)[1].toLowerCase()
console.log(a);


/**
 * 
 *  str.match(regexp)
 *   regexp 
 *  
 * 
 * 
 */


let str = 'abcccacdddad'
const match = str.match(/a./);
console.log(match) // [ 'ab', index: 0, input: 'abcccacdddad', groups: undefined ]
const match1 = str.match(/a./g);
console.log(match1)  // 所有符合规则的字符串组成的数组
str.replace(/a(.)/,(match, p1, offset, str) => {
  console.log(match, p1, offset, str)  // ab b 0 abcccacdddad
})
str.replace(/a(.)/g, function(match, p1, offset, str) {
  console.log(match, p1, offset, str) // 匹配所有 每次匹配到都执行一次函数
})











/**
 *  JSON.parse(JSON.stringify())  问题
  *  undefined 和 函数会丢失
  *  正则 和 错误会转换为{}
  *  时间转换为 字符串
  *  数组中有元素的值是undefined，会被转换成null
 */

console.log(JSON.parse(JSON.stringify({
  a: 1,
  b: '2',
  c: null,
  d: undefined,
  e: function() {},
  f: /a/,
  g: new Date(),
  h: new Error('a'),
  i: [1, undefined, {a: 1}, null],
  j: {a: 1}

})))
/**
 *  
 { a: 1,
  b: '2',
  c: null,
  f: {},
  g: '2019-12-27T07:57:24.779Z',
  h: {},
  i: [ 1, null, { a: 1 }, null ],
  j: { a: 1 } } 
 */










