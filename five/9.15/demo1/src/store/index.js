import { createStore } from '../redux';
import reducer from './reducers';

// let store = createStore(reducer);
// let oldDispatch = store.dispatch; // 保存老得dispatch
// store.dispatch = function(action) { // 覆盖store.dispatch
//   console.log(store.getState(), action);
//   oldDispatch(action)
//   console.log(store.getState())
// }

function logger({getState, dispatch}) {
  return function(next) { // 代表下一个中间件next
    return function (action) {
      console.log(getState()); // 处理前的数据
      next(action);
      console.log(getState)  // 处理之后的数据
    }
  }
}
function applyMiddleware(middleware) {
  return function(createStore) {
    return function(reducer) {
      let store = createStore(reducer);
      let dispatch;
      let middlewareApi = {
        getState: store.getState,
        dispatch: (...args) => dispatch(...args)
      }
      middleware = middleware(middlewareApi);
      dispatch = middlewareApi(store.dispatch);
      return {
        ...store,
        dispatch
      }
    }
  }
}

let store = applyMiddleware(logger)(createStore)(reducer);

export default store;