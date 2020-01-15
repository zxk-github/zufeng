<template>
  <div>
    <div>{{$attrs}}</div>


    <!-- 通过v-bind, 原封不动的将数据传递给子元素, v-bind的真实使用方式？？ -->
    <vueGrand v-bind="$attrs"></vueGrand>
    <vueGrand v-bind="$props"></vueGrand>
  </div>
</template>

<script>
  import vueGrand from "./3.vueAttrsGrand";
  export default {
    data() {
      return {
        a: 1
      }
    },
    components: {
      vueGrand
    }
  }
</script>

<style lang="scss" scoped>

</style>