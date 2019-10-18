function bindActionCreator(actionCreator, dispatch) {
  return function(...args) {
    dispatch(actionCreator(...args))
  }
}

export default function(actionCreators, dispatch) {
  if(typeof actionCreator === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }
  const boundActionCreators = {};
  for(const key in actionCreators) {
    boundActionCreators[key] = bindActionCreator(actionCreators[key], dispatch)
  }
  return boundActionCreators;
}