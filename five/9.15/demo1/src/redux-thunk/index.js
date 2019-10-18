export default function({getState, dispatch}) {
  return function(next) { // 代表下一个中间件 next
    return function(action) {
      if(typeof action === 'function') {
        return action(dispatch, getState);
      }
      next(action);
    }
  }
}