// 类的方法内部如果含有this, 它默认指向类的实例
class Logger {
  constructor(fn) {
    fn(this.print)
  }
  printName() {
    this.print('hellow')
    
  }
  print(text) {
    console.log(this)
  }
}

const logger = new Logger(function(res) {
   res()
});
// const {printName} = logger;
// console.log(printName())

// printName方法中的this，默认指向logger的实例，但是如果将这个方法提取出来单独进行使用，this会指向该方法运行时所在的环境
// 由于class内部是严格模式，所以this指向undefined, 从而导致print方法是undefined而报错

