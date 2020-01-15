<template>
  <div>
    vueModel: {{value}}
    <button @click="change">vueModel</button>
  </div>
</template>

<script>
  export default {
    props: ['value'],
    methods: {
      change() {
        this.$emit('input', 3)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>