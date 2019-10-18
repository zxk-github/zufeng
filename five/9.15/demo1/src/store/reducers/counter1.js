import * as types from '../action-types';
let initialState = {
  number: 1
}

// 这个reducer只关心Counter1的状态和action
function reducer(state = initialState, action) {
  switch(action.type) {
    case types.ADD1:
      return {number: state.number + action.payload};
    case types.MINUS1: 
      return {number: state.number - action.payload};
    default: 
      return initialState;
  }
}

export default reducer;