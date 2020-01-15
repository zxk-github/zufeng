<template>
  <div>
    childrenParentGrand:
    <button @click="dispatch">childrenParentGrand</button>
  </div>
</template>

<script>
  export default {
    methods: {
      dispatch() {
        this.$dispatch('dispatch', 1,2)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>