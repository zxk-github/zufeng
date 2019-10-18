export default function ({getState, dispatch}) {
  return function(next) { // 代表下一个中间件next
    return function(action) { // 动作action 
      if(action.then && typeof action.then === 'function') {
        return action.then(dispatch);
      }
      next(action);
    }
  }
}