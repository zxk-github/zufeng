import * as types from '../action-types';


// createActions
function add(payload) {
  return {type: types.ADD2, payload};
}
function minus(payload) {
  return {type: types.MINUS2, payload}
}

export default {
  add,
  minus
}