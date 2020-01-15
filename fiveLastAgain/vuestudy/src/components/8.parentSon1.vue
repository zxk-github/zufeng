<template>
  <div>
    parentSon1: 
    <button @click="click"></button>
  </div>
</template>

<script>
  export default {
    methods: {
      click() {
        this.$parent.$emit('mua', 'mua')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>