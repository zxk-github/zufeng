<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      model: {
        type: Object
      },
      rules: {
        type: Object
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>