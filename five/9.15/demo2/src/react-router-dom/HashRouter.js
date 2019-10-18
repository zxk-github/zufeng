import React from 'react';
import Context from './context';

export default class HashRouter extends React.Component {
  state = {
    location: {
      pathname: window.location.hash.slice(1) || '/',
      state: null
    }
  }

  componentDidMount() {
    // 组件加载完毕，默认跳转首页，如果有采用默认的
    window.location.hash = window.location.hash.slice(1) || '/';
    window.addEventListener('hashchange', () => {
      this.setState({
        location: {
          ...this.state.location,
          pathname: window.location.hash.slice(1),
          // 只有跳转的时候才会有state，如果用户刷新页面就会丢失
          state: this.locationState // 路径更新之后，顺便把存起来的状态付上去 
        }
      })
    })
  }
  locationState = null;
  render() {
    let value = {
      location: this.state.location,
      history: {
        push: (to) => {
          if(typeof to === 'object') {
            let {pathname, state} = to;
            window.location.hash = pathname;
            this.locationState = state;
          } else {
            // 跳转路径其实就是更改hash值
            window.location.hash = to;
          }
        }
      }
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }
}