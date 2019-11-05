let originalUrl = '/sshowcase/showcase/detail'
let originalArr = originalUrl.split('/');
let serviceUrl = originalArr[1]
let urlPath = originalArr.slice(2).join('/');
console.log(serviceUrl, urlPath)
let urlReg = /^\/(sshowcase)|(sitem)\/*?$/
console.log(urlReg.test(originalUrl));

var str = 'For more information, see Chapter 3.4.5.1';
var re = /see (chapter \d+(\.\d)*)/i;
var found = str.match(re);

console.log(found);