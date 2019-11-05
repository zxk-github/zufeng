<template>
  <div>
    <level-function v-for="item of lists" :key="item" :type="item"></level-function>
  </div>
</template>

<script>
  import LevelFunction from './LevelFunction';
  export default {
    data() {
      return {
        arr: [1,2,3]
      }
    },
    components:{
       LevelFunction
    }
  }
</script>

<style lang="scss" scoped>

</style>