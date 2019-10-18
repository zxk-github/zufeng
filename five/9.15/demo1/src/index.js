import React from 'react';
import ReactDOM from 'react-dom';

import Counter from './component/counter';
import Counter1 from './component/counter1';
import Counter2 from './component/counter2';

import { Provider } from './react-redux';
import store from './store'

ReactDOM.render(<Provider store={store}>
  <Counter1 />
  <hr/>
  {/* <Counter2 /> */}
</Provider>, document.getElementById('root'));