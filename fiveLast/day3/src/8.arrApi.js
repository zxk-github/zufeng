// reduce 收敛 将很多结果收敛在一起
let arr1 = [1, 2, 3, 4]
let total1 = arr1.reduce((prev, current, index, arr) => {
  return prev + current
})
console.log(total1)

let arr2 = [{p:1, n: 10}, {p: 2, n: 2}, {p: 3, n: 4}];
let total2 = arr2.reduce((prev, current, index, arr) => {
  return prev + current.p * current.n
}, 0)
console.log(total2)

let arg1 = [1, 2, 3, 4].reduce((prev, current, index, arr) => {
  if(index === arr.length -1) {
    return (prev + current)/arr.length
  }
  return prev + current;
})
console.log(arg1)

// compose 组合， 将多个函数进行组合，组成新的功能
function sun(a, b, c) {
  return a + b + c + '';
}
function len(str) {
  return str.length;
}
function addTag(val) {
  return '$' + val;
}

// 这种调用模式复杂
let r = addTag(len(sun(1,2,3)))
console.log(r)

compose(addTag, len, sun)(1,2,3)

// reduceRight
function compose(...fns) {
  return function(...args) {
    let lastFn = fns.pop();
    return fns.reduceRight((prev, current) => {
      return current(prev);
    }, lastFn(...args));
  }
}

// reduce 
function compose1(...fns) {
  return fns.reduce((prev, current) => {
    return function(...args) {
      return prev(current(...args))
    }
  })
}
let r1 = compose1(addTag, len, sun)(1,2,3)
console.log(r1)


// [].reduce reduce方法不能是一个空数组
// [1].reduce 一个元素不会执行函数，直接就返回第一项


// 自定义reduce

Array.prototype.reduce = function(callback, prev) {
  for(let i = 0; i < this.length; i++) {
    if(typeof prev === 'undefined') {
      prev = callback(this[i], this[i+1], i+1, this);
      i++;
    } else {
      prev = callback(prev, this[i], i, this);
    }
  }
  return prev;
}

// map映射数组的每一项，返回一个新的数组
let arr3 = [1, 2, 3].map((item) => {
  return item + 'a'
}) 
console.log(arr3) //[ '1a', '2a', '3a' ]


// filter 过滤，过滤出返回true的项
let arr4 = [1, 2, 3].filter((item) => {
  return item % 2 === 0
})
console.log(arr4)// [ 2 ]

// some 数组中只要有符合条件的，就返回true，并且中断循环
let bool1 = [1, 2, 3, 4].some((item) => {
  return item % 2 === 0;
})
console.log(bool1) // true

// every 只要存在一个不符合条件的就返回false，并且不会向下执行
let bool2 = [1, 2, 3, 4].every((item) => {
  return item % 2 === 0;
})
console.log(bool2) // false


// find 返回第一个符合条件的元素, 找不到返回undefined
let find = [1, 2, 3, 4].find((item) => {
  return item % 2 === 0;
})
console.log(find) // 2

// findIndex 返回第一个符合条件的元素的下标, 找不到返回-1
let findIndex = [1, 2, 3, 4].findIndex((item) => {
  return item % 10 === 0;
})
console.log(findIndex) // -1

// 存在返回true，是绝对相等，并且可以判断NaN
console.log([1, 2, 3, NaN].includes(NaN))  // true



