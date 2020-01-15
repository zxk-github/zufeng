
<template>
  <div>
    1111: {{$store.state.age}}   {{$store.getters.computedC}} {{$store.state.a.a}}
    <button @click="asyncMunis">vuex按钮</button>
  </div>
</template>

<script>
  export default {
    mounted() {
      setInterval(() => {
        this.$store.commit('syncAdd', 10)
      }, 1000)
      console.log(JSON.stringify(this.$store.state))
    },
    methods: {
      asyncMunis() {
        this.$store.dispatch('asyncM', 5)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>