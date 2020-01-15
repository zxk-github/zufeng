// 数组的展平
let arr = [[1], [[2]]].flat();
console.log(arr);


Array.prototype.myFlat = function(n = 1) {
  console.log(n)
  if(n === 0) {
    return this;
  }
  return this.reduce((a, b) => {
    if(Array.isArray(b)) { //只要是数组就递归展开
      return a.concat(b.myFlat(--n))
    } else {
      return [...a, b]
    }
  }, [])

}
let arr1 = [1, [2, [1, [2, [3]]]], [2, [1, [2, [3]]]]].myFlat(1);
// let arr1 = [[1], [[2], [1, [2, [3]]]]].myFlat(1);
console.log(arr1)


