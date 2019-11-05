<template>
  <div id="app">
      {{$store.state.a.a}}
      <!-- {{$store.getters.ga}} -->
      <button @click="mutation">同步</button>
      <button @click="action">异步</button>
      <button @click="print">展示</button>
      <hello-word v-if="show"></hello-word>
      <button @click="mes">谈</button>
  </div>
</template>

<script>
  import HelloWord from './components/HelloWorld'
  import {Message} from './message/message'
  export default {
    data() {
      return {
        a: 1,
        show: true
      }
    },
    beforeCreate() {
      // console.log(this);
    },  
    created() {
      console.log('000');
    },
    beforeMount() {
      console.log(111)
    },
    mounted() {
      console.log(222);
      // debugger;
      // setInterval(() => {
      //   this.$store.getters.ga = 12
      // })
      console.log(this.$store._modules)
    },
    beforeUpdate() {
      console.log(999)
    },
    updated() {
      console.log(1010);
    },
    components: {
      HelloWord
    },
    methods: {
      print() {
        this.show = !this.show;
      },
      action() {
        this.$store.dispatch('async', 1)
      },
      mutation() {
        this.$store.commit('addA', 1);
      },
      mes() {
        Message.success({
          message: '11111',
          duration: 1000
        })
      }
    }
  }
</script>
