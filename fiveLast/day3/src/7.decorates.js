@logger2
@logger1
class Logger1 {

}

function logger1() {
  console.log('logger1')
}

function logger2() {
  console.log('logger2')
}

// 执行流程相当于 logger2(logger1(Logger))



@logger4()
@logger3()
class Logger {

}

function logger3() {
  console.log('out logger3')
  return function() {
    console.log('logger3')
  }
}

function logger4() {
  console.log('out logger4')
  return function() {
    console.log('logger4')
  }
}

// 装饰器是函数执行，先按照顺序执行装饰器函数，然后再反向执行
