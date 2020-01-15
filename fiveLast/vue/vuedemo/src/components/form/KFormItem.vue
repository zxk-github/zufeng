<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="errorMessage">{{errorMessage}}</p>
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        default: ''
      },
      errorMessage: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>