<template>
  <div>
    listeners: {{$listeners}}
  </div>
</template>

<script>
  export default {
    mounted() {
      console.log(this.$listeners)
    }
  }
</script>

<style lang="scss" scoped>

</style>