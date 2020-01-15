<template>
  <div>
    <!-- $attrs保存的是props之外的东西 -->
    <input @input="onInput" :value="inputValue" v-bind="$attrs"/>
  </div>
</template>

<script>
  export default {
    inheritAttrs: false, // 避免顶层的容器继承父级元素属性
    props: {
      inputValue: String,
      default: ''
    },
    methods: {
      onInput(e) {
        this.$emit('input', e.target.value)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>