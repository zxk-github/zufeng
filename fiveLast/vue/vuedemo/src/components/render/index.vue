<template>
  <div>
    <Level :type="1">aaa</Level>
    <Level :type="2">aaa</Level>
    <Level :type="3">aaa</Level>
    <Level :type="4">aaa</Level>
    <Level :type="5">aaa</Level>
    <LevelFunction :type="1">aaaa</LevelFunction>
  </div>
</template>

<script>
  import Level from './component/level.vue'
  import LevelFunction from './component/levelFunction.js';
  export default {
    data() {
      return {
        type: 1
      }
    },
    components: {
      Level,
      LevelFunction
    }
  }
</script>

<style lang="scss" scoped>

</style>