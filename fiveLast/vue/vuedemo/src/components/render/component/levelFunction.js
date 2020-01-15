// 对于函数组件，到处一个对象，对象代表的就是一个组件，里面可以写组件的各种配置项

export default {
  props: ['type'],
  render(h){ // h 就相当于createElement h(标签名称，标签属性， 标签子级)
    // return h('h'+this.type, {}, this.$slots.default)
    return h('h'+this.type, {}, [h('span', {
      attrs: {
        a: 1
      },
      on: {
        click() {
          alert(1)
        }
      }
    }, 'hello word')])
  }
}