function combineReducers(reducers) {
  // 从老状态和action中得到新状态
  return function(state = {}, action) {
    let nextState = {};
    let hasChanged = false;
    for(let key in reducers) {
      let reducer = reducers[key];
      let previousStateForKey = state[key];
      let nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey != previousStateForKey;
    }
    return hasChanged? nextState : state;
  }
}

export default combineReducers;