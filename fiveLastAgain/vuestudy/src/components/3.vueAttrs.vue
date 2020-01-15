<template>
  <div>
    {{$attrs}} {{data}}
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: ['data']

  }
</script>

<style lang="scss" scoped>

</style>