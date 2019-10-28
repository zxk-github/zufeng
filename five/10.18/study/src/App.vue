<template>
  <div id="app">
    {{$store.state.a}}
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted() {
    console.log(this.$store._modules)
  }
}
</script>

<style>

</style>
