// 10

var data = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
}
// 值大于2的key组成的数组
console.log(Object.entries(data))

console.log(Object.keys(data).filter(function(x) { return data[x] > 2 ;}))

// 11
function obj(name) {
  if(name) {
    this.name = name;
  }
  return this;
}
obj.prototype.name = 'name2'
var a = obj('name1')
var b = new obj;
console.log(a.name, b.name)

// 19 数组去重
function unique(arr) {
  return Array.from(new Set(arr));
}




