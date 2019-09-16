
let obj = Object.create(arg)
// 创建一个对象，对象的原型指向 arg
function create(proto) {
  function F() {};
  F.prototype = proto;
  return new F();
}



// 超找出现最多的字符
let str = "abcabcabcbbccccc";
let num = 0;
let char = '';

str = str.split('').sort().join('');

let reg = /(\w)\1+/g
str.replace(reg, (match, p) => {
  console.log(match, p)
  if(num < match.length) {
    num = match.length;
    char = p;
  }
})



// 字符串查找，找到一段字符串在另一段中出现的位置
// a='34';b='1234567'; // 返回 2
// a='35';b='1234567'; // 返回 -1
// a='355';b='12354355'; // 返回 5

function fn(a, b) {
  for(let i in b) {
    if(a[0] === b[i]) {
      let temp = true;
      for(let j in a) {
        if(a[j] !== b[Number(i)+ Number(j)]) {
          temp = false;
        }
      } 
      if(temp) {
        return i;
      }
    }
  }
  return -1;
}

console.log(fn('23', '12323'))


