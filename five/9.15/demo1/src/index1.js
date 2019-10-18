import { createStore } from 'redux';

const content = document.getElementById('content');
const add = document.getElementById('add');
const minus = document.getElementById('minus');

const ADD = 'add';
const MINUS = 'minus';
const initialState = {number: 0}
function reducer(state, action) {
  switch(action.type) {
    case ADD:
      return {number: state.number + 1};
    case MINUS: 
      return {number: state.number - 1};
    default: 
      return initialState;
  }
}

const store = createStore(reducer);

function render() {
  content.innerHTML = store.getState().number;
}
render()
store.subscribe(render);
add.addEventListener('click', function() {
  console.log(ADD)
  store.dispatch({type: ADD})
}, false)


minus.addEventListener('click', function() {
  store.dispatch({type: MINUS})
}, false)

