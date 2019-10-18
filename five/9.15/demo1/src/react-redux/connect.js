import React from 'react';
import Context from './Context';
import { bindActionCreators } from '../redux';

export default function(mapStateToProps, mapDispatchToProps) {
  return function(InnerComponent) {
    return class extends React.Component {
      static contextType = Context;  // this.context = {store}
      constructor(props, context) {
        super(props);
        this.state = this.mapState = mapStateToProps(context.store.getState())
        if(typeof mapDispatchToProps === 'function') {
          this.actions = mapDispatchToProps(context.store.dispatch);
        } else if(typeof mapDispatchToProps === 'object') {
          this.actions = bindActionCreators(mapDispatchToProps, context.store.dispatch)
        }
      }
      componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(() => {
          let nextState = mapStateToProps(this.context.store.getState())
          if(nextState != this.mapState) {
            this.mapState = nextState;
            this.setState(nextState)
          }
        })
      }
      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        // let actions = mapDispatchToProps(this.context.store.dispatch)
        return (
          <InnerComponent {...this.props} {...this.state} {...this.actions}/>
        )
      }
    }
  }
}

