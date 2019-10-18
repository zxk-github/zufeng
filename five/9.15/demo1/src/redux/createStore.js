function createStore(reducer) {
  let state;
  let listeners = [];
  function getState() {
    return state
  }
  function dispatch(action) {  // 接收一个action, 返回新状态
    if(Object.getPrototypeOf(action) != Object.prototype) {
      throw new Error('action 必须是一个纯对象')
    }
    state = reducer(state, action)
    listeners.forEach(l => l());
  }
  function subscribe(listener) {
    listeners.push(listener); // 监听函数添加到数组中
    return function() {
      listeners = listeners.filter(item => item != listener) //把自己这个监听函数从数组中删除
    }
  }
  dispatch({type: '@@REDUX/INIT'})
  return {
    getState,
    dispatch,
    subscribe
  }
}

export default createStore;