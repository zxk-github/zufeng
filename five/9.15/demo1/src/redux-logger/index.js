// getState 获取仓库的状态
// dispatch用来重新派发动作(dispatch就是改造后的最终的dispatch)

export default function({getState, dispatch}) {
  return function(next) { // 代表下一个中间件next
    return function (action) {
      console.log(getState()); // 处理前的数据
      next(action);
      console.log(getState)  // 处理之后的数据
    }
  }
}