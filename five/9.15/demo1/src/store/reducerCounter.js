import * as types from './action-types';
let initialState = {
  number: 1
}
function reducer(state, action) {
  switch(action.type) {
    case types.ADD:
      return {number: state.number + action.payload};
    case types.MINUS: 
      return {number: state.number - action.payload};
    default: 
      return initialState;
  }
}

export default reducer;