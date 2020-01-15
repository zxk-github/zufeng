let fs =  require('fs');
let path = require('path');

let str = fs.readFileSync(path.join(__dirname, './html.html'), 'utf8');

function render(str, obj) {
  str = str.replace(/<%=([\s\S]+?)%>/g, function() {
    return '${'+arguments[1]+'}'
  })
  let head = `let str = ''; \r\n`
  head += `with(o){ \r\n`
  let content = 'str+=`';
  content += str.replace(/<%([\s\S]+?)%>/g, function() {
    return '`\r\n'+arguments[1] + '\r\n str+=`';
  })
  // console.log(head + content);
  let tail = '`\r\n} return str';
  let scriptStr = head + content + tail;
  
  let fn = new Function('o', scriptStr);

  fs.writeFileSync(path.join(__dirname, './a.js'), scriptStr);
  return fn(obj)
  // console.log(head + content + tail);
  // const a = str.replace(/<%([\s\S]+?)%>/g, function(match, p1) {
  //   console.log(p1)
  //   return p1;
  // })
  // console.log(a);
}

const str1 = render(str, {arr: [1, 2, 3]})
console.log(str1);


// with改变上下文 
// let o = {name: 1}
// with(o) {
//   console.log(name)
// }


// eval
// new Function()