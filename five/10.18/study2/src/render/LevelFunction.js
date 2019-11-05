export default {
  props: {
    type: {
      type: String
    }
  },
  data() {
    return {
      val: 'hello'
    }
  },
  render(h) {
    return h(`h{this.type}`, {}, ['hello']) 
  }
}