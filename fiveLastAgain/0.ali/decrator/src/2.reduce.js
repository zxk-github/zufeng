Array.prototype.reduce1 = function(callback, prev) {
  if(typeof callback !== 'function') {
    throw new Error('err')
  }
  if(this.length === 1 && arguments.length === 1) {
    return this[0]
  }

  if(arguments.length === 1) {
    for(let i = 0; i < this.length; i++) {
      prev = callback(this[i], this[i+1], i, this);
      i++
    }
  } else {
    for(let i = 0; i < this.length; i++) {
      prev = callback(prev, this[i], i, this)
    }
  }
  return prev;
}

let arr = [1, 3];
let arr2 = arr.reduce1((prev, current) => {
  return prev+current
})
console.log(arr2)


Array.prototype.map1 = function(callback) {
  let result = [];
  this.reduce((prev, current, i) => {
    result.push(callback.call(this, current, i, this))
  }, null)
  return result
}
let arr3 = [1,2,3]
let arr4 = arr3.map1((item) => {
  return `${item}11`
})
console.log(arr4)