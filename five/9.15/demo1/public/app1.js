const UPDATE_TITLE_COLOR = 'updateTitleColor';
const UPDATE_TITLE_TEXT = 'updateTitleText';
const UPDATE_CONTENT_COLOR = 'updateContentColor';
const UPDATE_CONTENT_TEXT = 'updateContentText';


let appState = {
  title: {
    color: 'red', 
    text: '标题'
  },
  content: {
    color: 'green',
    text: '内容'
  }
}

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

function dispatch(action) {
  switch(action.type) {
    case UPDATE_TITLE_COLOR:
      appState.title.color = action.payload;
      break;
    case UPDATE_TITLE_TEXT:
        appState.title.text = action.payload;
        break;
    case UPDATE_CONTENT_COLOR:
      appState.content.color = action.payload;
      break;
    case UPDATE_CONTENT_TEXT:
      appState.content.text = action.payload;
      break;
  }
}

renderApp(appState);
setTimeout(() => {
  console.log(2222);
  dispatch({type: UPDATE_CONTENT_TEXT, payload: '新内容'})
  renderApp(appState)
},1000)






