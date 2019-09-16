// 防抖：防止多次提交按钮，只执行最后一次提交
let debounce = (fn, ...args) => {
  let timer = null;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(null, [...args, ...arguments])
    })
  }
}

function fn() {
  console.log(1);
}
let deb = debounce(fn,1,2)
deb('a', 'b')




