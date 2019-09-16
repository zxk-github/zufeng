let arr1 = new Array();
arr1[10] = 1;
console.log(arr1.length)

let arr2 = new Array(3);
console.log(arr2);
console.log(Array.of(2))
arr2.push(1,2,3)
console.log(arr2);
arr2.unshift(1,2,3)
console.log(arr2);
console.log(arr2.slice(1,1))
console.log(arr2)
console.log("====")
console.log(arr2.splice(1,0, 'a'))
console.log(arr2);

function fn(a, b, c ) {
  console.log(fn.length)
} 
fn(1,2,3,4,5,6)


// abs ceil floor round

// push 
// unshift
// pop
// shift
// slice(start, end)
// splice(start, length, arg1)

str.length
charAt
charCodeAt
String.fromCharCode()

indexOf
lastIndexOf

let str = '123456789'
let str1 = str.substr(1, 3);
console.log(str1, str)

let str2 = str.substring(1, 3);
console.log(str2)

let str3 = str.slice(1, 3)
console.log(str3)

// 正则表达式
// | 或 [] 或  a|b|c|d [abcd]  [^ab] 除了a或b以外的都匹配到

console.log(/[^ab]/.test('a'))

// 字符串支持正则的四个方法 search split match replace
// search split match replace
// str.split(/[a-z]/)  以任意字符串进行拆解,不全局匹配也会默认进行全局匹配
let str5 = '1a222222b3c4d'
console.log(str5.split('1'))

console.log(str5.search(/[a-z]/))  //只会找到第一个符合条件的下标

console.log(str5.match(/[a-z]/)) // 加g 会进行全局匹配 找到符合条件的字符串组成的数组, 不全局匹配会返回第一个匹配到的一些对应的描述

console.log(str5.replace(/[a-z]/, 'l'))

console.log(str5);

let str5 = '1a11111211b3c4d'
const str6 = str5.replace(/(a.*12)|(3c)/g, function(match, p1, p2, offset, str) {
  console.log(match, p1, p2, offset, str)
  return '匹配到'
})
console.log(str6)
// match 当前匹配到的正则片段，p1...匹配到的正则片段返回的字符串 offer偏移量 str原字符串

// /^a|a$/ 以a开头 或者以a结尾
// [^ab]
// + {1, } .{0,} ? {0,1}
// {n, m} {n}  {n, }

// \w[a-zA-Z0-9_] \W [^a-zA-Z0-9_]
// \b[0-9] \B[^0-9]
// \s 空格
// str.replace(/^\s*|\s*$/) 

