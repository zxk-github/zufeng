console.log(process.memoryUsage())

/*
  { rss: 20348928,      所有内存占用，包括指令区和堆栈
  heapTotal: 6537216,   总的堆的数量(闭包，对象)
  heapUsed: 3831640,    当前使用堆的数量
  external: 8272 }
*/
