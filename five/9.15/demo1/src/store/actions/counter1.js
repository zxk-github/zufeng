import * as types from '../action-types';

function add(payload) {
  return {type: types.ADD1, payload};
}
function minus(payload) {
  return {type: types.MINUS1, payload}
}

export default {
  add,
  minus
}
