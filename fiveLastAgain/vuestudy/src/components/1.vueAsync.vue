<template>
  <div>
    <button @click="vueSync">vueSync</button>
  </div>
</template>

<script>
  export default {
    methods: {
      vueSync() {
        this.$emit('update:data', 2)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>