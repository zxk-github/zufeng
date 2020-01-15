const { pathToRegexp } = require("path-to-regexp");

let requestUrl = '/1/zhang/address';
let config = '/:id/:name/address';
let key = [];

console.log(pathToRegexp(config, key)) //   /^(?:\/([^\/#\?]+?))(?:\/([^\/#\?]+?))\/address[\/#\?]?$/i
console.log(key)
/**
 * 
 *  [ { name: 'id',
    prefix: '/',
    suffix: '',
    pattern: '[^\\/#\\?]+?',
    modifier: '' },
  { name: 'name',
    prefix: '/',
    suffix: '',
    pattern: '[^\\/#\\?]+?',
    modifier: '' } ] 
 * 


 ?: 匹配不通过
 +？ 尽可能少取

 */


let url = '/1/zhang/address';
let rule = '/:id/:name/address';
// let strExp = rule.replace(/:([a-z]+)/ig, function() {
//   console.log(arguments[1]);
// })
let keys = [];
let strExp = rule.replace(/:([^\/]+)/g, function() {
  console.log(arguments[1])
  keys.push(arguments[1])
  return '([^\/]+)'
})
console.log(strExp)  // /([^/]+)/([^/]+)/address
let r = url.match(new RegExp(strExp));
// console.log(r)
// [ '/1/zhang/address',
//   '1',
//   'zhang',
//   index: 0,
//   input: '/1/zhang/address',
//   groups: undefined ]
let params = {};
r = r.slice(1)
keys.forEach((key, index) => {
  params[key] = r[index];
})
console.log(params)  // { id: '1', name: 'zhang' }
 


