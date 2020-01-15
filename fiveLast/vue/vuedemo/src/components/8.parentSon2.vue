<template>
  <div>
    parentSon2: <button @click="mua">click1</button>
  </div>
</template>

<script>
  export default {
    methods: {
      mua() {
        this.$parent.$emit('mua', 1)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>