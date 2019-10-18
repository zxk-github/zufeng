const UPDATE_TITLE_COLOR = 'updateTitleColor';
const UPDATE_TITLE_TEXT = 'updateTitleText';
const UPDATE_CONTENT_COLOR = 'updateContentColor';
const UPDATE_CONTENT_TEXT = 'updateContentText';

let initialState = {
  title: {
    color: 'red', 
    text: '标题'
  },
  content: {
    color: 'green',
    text: '内容'
  }
}
function reducer(state = initialState, action) { // 接收一个状态，返回一个新状态
  switch(action.type) { 
    case UPDATE_TITLE_COLOR:
      return {...state, title: {...state.title, color: action.payload}}
    case UPDATE_TITLE_TEXT:
      return {...state, title: {...state.title, text: action.payload}}
    case UPDATE_CONTENT_COLOR:
      return {...state, content: {...state.content, color: action.payload}}
    case UPDATE_CONTENT_TEXT:
      return {...state, content: {...state.content, text: action.payload}}
    default:
      return state;
  }
}

// redux的仓库到底是什么？ createStore函数，将state包装成私有变量，暴露出getState和dispatch方法。利用闭包的方式在函数外可以修改到state的值 
function createStore(reducer) {
  let state;
  function getState() {
    return state
  }
  function dispatch(action) {  // 接收一个action, 返回新状态
    state = reducer(state, action)
  }
  dispatch({type: '@@REDUX/INIT'})
  return {
    getState,
    dispatch
  }
}

let store = createStore(reducer);


function renderApp(appState) {
  renderTitle(appState.title);
  renderContent(appState.content);
}

function renderTitle(state) {
  let element = document.getElementById('title');
  element.style.color = state.color;
  element.innerHTML = state.text;
}

function renderContent(state) {
  let element = document.getElementById('content');
  element.style.color = state.color;
  element.innerHTML = state.text;
}


/**
appState.content = null
1.为了解决这种状态可以随意修改的问题看，我们引入了管理员的概念
现在规定不能直接操作appState，要想改状态，只能通过派发发动作action的方式来改
2. action是有格式要求的
  1.必须是一个纯对象(通过new Object() 或者 {}形式直接创建的对象)
  2.action一个有两个属性，type: 当前action名称  payload: 需要传递的数据
*/



renderApp(store.getState());
setTimeout(() => {
  store.dispatch({type: UPDATE_CONTENT_TEXT, payload: '新内容'})
  renderApp(store.getState())
},1000)






