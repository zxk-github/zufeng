<template>
  <div>
    Bus: <button @click="click">bus</button>
  </div>
</template>

<script>
  export default {
    methods: {
      click() {
        this.$bus.$emit('change', 12)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>