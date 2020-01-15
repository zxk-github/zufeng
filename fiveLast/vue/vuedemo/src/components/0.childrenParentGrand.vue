<template>
  <div>
    childParentGrand: <button @click="change"></button>
  </div>
</template>

<script>
  export default {
    methods: {
      change() {
        // this.$parent.$emit('change')
        this.$dispatch('change') //逐级向上查找各个父级，有change事件 就触发
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>