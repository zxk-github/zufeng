<template>
  <div>
    parentSon2: 
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$parent.$on('mua', function(value) {
        console.log(value)
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>