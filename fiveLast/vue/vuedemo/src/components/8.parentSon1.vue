<template>
  <div>
    parentSon1: <button>click1</button>
  </div>
</template>

<script>
  export default {

    created() {
      this.$parent.$on('mua', function() {
        alert('mua')
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>