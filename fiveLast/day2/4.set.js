// 
let s = new Set([1,2,3]);
s.add(4)
s.has(2)
s.entries()

// 1. 数组去重 取交集 取并集 取差级(我有的你没有就是差级，可能因为对比对象不同结果不同)
let arr1 = [1, 2, 3, 4];
let arr2 = [2, 3, 4, 5]

function union() {
  let s = new Set([...arr1, ...arr2]);
  return [...s];
}

function intersection() {
  let s1 = new Set(arr1);
  let s2 = new Set(arr2);
  return [...s1].filter((item) => {
    return s2.has(item);
  })
}

function intersection() {
  let s1 = new Set(arr1);
  let s2 = new Set(arr2);
  return [...s1].filter((item) => {
    return !s2.has(item);
  })
}


// Map 也不能放重复的，当key值一样时， 会被替换掉 key可以设置为任何值，key改为null之后 还不会回收
let map = new Map(['name', 2]);
map.set('name', '123')
map.get('name')

// weakMap 弱引用  key只能放对象 key设置为null之后，会被清空


