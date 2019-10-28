<template>
  <div class="hello">
    hello word
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  beforeCreate() {
    console.log(333);
  },
  created() {
    console.log(444);
  },
  beforeMount() {
    console.log(555)
  },
  mounted() {
    console.log(666);
  },
  beforeDestroy() {
    console.log(777);
  },
  destroyed() {
    console.log(888);
  }

}
</script>

<style scoped>
</style>
