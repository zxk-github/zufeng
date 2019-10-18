import counter1 from './counter1'
import counter2 from './counter2'

import { combineReducers } from '../../redux';

// 两个reducer合并成了一个reducer
// 合并完成之后，状态树就发生了变化

// function combineReducers(reducers) {
//   // 从老状态和action中得到新状态
//   return function(state = {}, action) {
//     let nextState = {};
//     for(let key in reducers) {
//       console.log(state)
//       nextState[key] = reducers[key](state[key], action)
//     }
//     return nextState;
//   }
// }


let reducer = combineReducers({
  counter1,
  counter2
})

export default reducer;
