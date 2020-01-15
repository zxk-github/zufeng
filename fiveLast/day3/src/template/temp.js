let fs = require('fs');
let path = require('path');

let str = fs.readFileSync(path.join(__dirname, './html.html'), 'utf8');
function render(str, obj) {
  return str.replace(/<%=([\s\S]+?)%>/g, function(match, p1) {
    console.log(p1)
    return obj[p1];
  })
}

console.log(render(str, {name: 1}));

// 模版引擎实现原理本质上就是拼接字符串




