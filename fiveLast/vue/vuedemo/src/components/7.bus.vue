<template>
  <div>
    bus bus <button @click="change">bus bus </button>
  </div>
</template>

<script>
  export default {
    methods: {
      show() {
        alert(1);
      },
      change() {
        this.$bus.$emit('change')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>