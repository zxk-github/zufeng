console.log(process.argv)
//  [ '/usr/local/bin/node',   // 执行程序所在位置
//   '/Users/zhangxk/demo/zufeng/fiveLast/day5/2.process.js', // 当前执行的文件
//   '--config', 
//   'a',
//   '--port',
//   '200' ]

let argv = process.argv.slice(2).reduce((prev, current, index, arr) => {
  if(current.includes('--')) {
    prev[current.slice(2)] = arr[index + 1];
  }
  return prev
}, {})  

console.log(argv)

// commander 配置命令快捷键， 监听用户输入
let program = require('commander');
program.version('1.0.0')
  .option('-p, --port <value>', 'config port')
  .option('-c, --config <value>', 'config file')

console.log(program.port)  // 直接获取到对应的端口值

program
  .command('rm <dir>')
  .option('-r, -remove', 'remove dir')
  .action(function(dir, cmd) {
    console.log('执行命令')
  })

program.parse(process.argv)


// process.env 环境变量
// console.log(process.env)

// 设置环境变量 在命令行中输入export NODE_ENV=production
console.log(process.env.NODE_ENV) // 获取命令行中获取到的环境变量值
// 连写 export NODE_ENV=production && node 2.process.js 

// process.cwd()  执行命令的位置是谁，返回的值就是对应所在的那个文件夹
console.log(process.cwd())
// node 2.process.js ---> /Users/zhangxk/demo/zufeng/fiveLast/day5
// node day5/2.process.js  -----> /Users/zhangxk/demo/zufeng/fiveLast


// process.chdir('6.node') 修改process.cwd的返回值