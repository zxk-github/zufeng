let name = 'zf';
let age = 10;

let str = "<ul><li>${name} ${age}</li></ul>";

// /\$\{(.+)\}/ 因为正则是贪婪的，所以他会匹配到name} ${age , 所以应该尽可能的少取
// /\$\{(.+?)\}/
// /\$\{([^}]+)\}/

let result = str.replace(/\$\{(.+?)\}/g, function() {
  // match p1 p2 offset string
  return eval(arguments[1])
})
console.log(result)




// 字符串的replace match search方法

/**
 * replace() 匹配模式可以是一个字符串或者一个正则表达式， 替换值可以是一个字符串或者一个回调函数返回的结果，替换之后会返回新的字符串，原字符串不变
 * 
 * 
 */
// replace的第一个值是字符串的时候，仅仅第一次匹配到的值会被替换掉
var str1 = '123abacadab';
console.log(str1.replace('ab', function() {
  return '123'
})) // 123123acad

//第二个参数是一个字符串的时候，会存在几个特殊的变量名
console.log(str1.replace('ab', '$$'))  // 123$acad 将匹配的值替换为$
console.log(str1.replace('ab', '$&'))  // 插入匹配到的字符串(其实感觉原来字符串没有什么变化)
console.log(str1.replace('ab', '$`')) // 123123acadab 使用当前匹配到的字符串左边的内容替换掉匹配的位置的字符串
console.log(str1.replace('ab', "$'")) // 123acadabacadab 使用当前匹配到的字符串右边的内容替换掉匹配到的字符串

console.log(str1.replace(/a.+(c).+(d)/, '$1'))  // 123cab
// 上面第一个括号匹配到的内容是c，所以他会使用c来替换正则匹配到的一段字符串

// 第二个参数是一个函数的时候
// 如果匹配规则不是全局匹配，函数只会执行一次，如果匹配规则是全局匹配，那么这个方法会被执行多次，每次匹配都会被调用

let str2 = '123abacadab123abacadab'
let newStr2 = str2.replace(/a.+(c).+(d)/g, function(match, p1, p2, offset, string) {
  // match 在本轮循环中，正则匹配到的字符串
  // p1 p2 p3 就是正则中的第几个括号中的表达式匹配到的字符串内容
  // 正则匹配到的字符串在原来字符串中的位置
  // string 原字符串
  console.log(match, p1, p2, offset, string)
})

// str.match() 如果传入的是一个字符串，会转为正则，如果没有任何参数就直接调用match，则返回一个[]

let str3 = 'accadcdaece'
// 如果正则表达式不是全局匹配
console.log(str3.match(/a./))
// [ 'ac', index: 0, input: 'accadcdaece', groups: undefined ]
// 匹配到的值 匹配位置的下标 输入的字符串

// 如果正则是全局匹配，返回正则匹配到的素有内容组成的数组
console.log(str3.match(/a(.)/g)) // [ 'ac', 'ad', 'ae' ]




