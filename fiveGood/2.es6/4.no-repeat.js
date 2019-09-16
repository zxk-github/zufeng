// 数组去重
function noRepeat(...args) {
  const arr = Array.prototype.concat.apply([], args);
  console.log(arr);
  return [...new Set(arr)];
}

const arr1 = [1,2,4,1,2];
const arr2 = [2,3,1,9];
console.log(noRepeat(arr1, arr2));

// 取交集
function intersection(...args) {  
  let setArr = args.map(arr => new Set(arr));
  return setArr.reduce((prev, current) => {
    return [...prev].filter((it) => {
      return current.has(it)
    })
  })
} 
console.log(intersection(arr1, arr2));