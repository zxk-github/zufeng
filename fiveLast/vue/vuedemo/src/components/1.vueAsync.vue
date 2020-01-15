<template>
  <div>
    <div>{{count}} <button @click="change">click</button></div>
  </div>
</template>

<script>
  export default {
    props: {
      count: Number
    },
    methods: {
      change() {
        this.$emit('update:count', 2)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>